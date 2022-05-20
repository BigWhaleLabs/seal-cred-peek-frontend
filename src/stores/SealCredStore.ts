import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import getMapOfOwners from 'helpers/getTokenIdToOwnerMap'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  originalContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  derivativeContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }

  fetchContractNames: (ledger: Ledger) => void
  fetchContractsToOwnerMaps: (ledger: Ledger) => void
}

const SealCredStore = proxy<SealCredStoreType>({
  ledger: getLedger(sealCred).then((ledger) => {
    SealCredStore.fetchContractNames(ledger)
    SealCredStore.fetchContractsToOwnerMaps(ledger)
    for (const record of Object.values(ledger)) {
      addListenersToLedgerRecord(record)
    }
    return ledger
  }),
  contractNames: {},
  originalContractsToOwnersMaps: {},
  derivativeContractsToOwnersMaps: {},

  fetchContractNames(ledger: Ledger) {
    for (const { originalContract, derivativeContract } of Object.values(
      ledger
    )) {
      SealCredStore.contractNames[originalContract.address] =
        originalContract.name()
      SealCredStore.contractNames[derivativeContract.address] =
        derivativeContract.name()
    }
  },
  fetchContractsToOwnerMaps(ledger: Ledger) {
    for (const { originalContract, derivativeContract } of Object.values(
      ledger
    )) {
      SealCredStore.originalContractsToOwnersMaps[originalContract.address] =
        getMapOfOwners(originalContract)
      SealCredStore.derivativeContractsToOwnersMaps[
        derivativeContract.address
      ] = getMapOfOwners(derivativeContract)
    }
    SealCredStore.originalContractsToOwnersMaps = {
      ...SealCredStore.originalContractsToOwnersMaps,
    }
    SealCredStore.derivativeContractsToOwnersMaps = {
      ...SealCredStore.derivativeContractsToOwnersMaps,
    }
  },
})

function addListenersToLedgerRecord({
  originalContract,
  derivativeContract,
}: LedgerRecord) {
  originalContract.on(
    originalContract.filters.Transfer(),
    async (_, to, tokenId) => {
      console.log('Transfer (original)', originalContract.address, to, tokenId)
      const originalContractToOwnerMap = await SealCredStore
        .originalContractsToOwnersMaps[originalContract.address]

      const newOriginalContractToOwnerMap = {
        ...originalContractToOwnerMap,
        [tokenId.toNumber()]: to,
      }

      SealCredStore.originalContractsToOwnersMaps[originalContract.address] =
        Promise.resolve(newOriginalContractToOwnerMap)
    }
  )
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    async (_, to, tokenId) => {
      console.log(
        'Transfer (derivative)',
        derivativeContract.address,
        to,
        tokenId
      )
      const derivativeContractToOwnerMap = await SealCredStore
        .derivativeContractsToOwnersMaps[derivativeContract.address]

      const newDerivativeContractToOwnerMap = {
        ...derivativeContractToOwnerMap,
        [tokenId.toNumber()]: to,
      }

      SealCredStore.derivativeContractsToOwnersMaps[
        derivativeContract.address
      ] = Promise.resolve(newDerivativeContractToOwnerMap)
    }
  )
}

sealCred.on(
  sealCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await SealCredStore.ledger
    if (!ledger[tokenAddress]) {
      const record = await getLedgerRecord(sealCred, tokenAddress, merkleRoot)
      ledger[tokenAddress] = record
      addListenersToLedgerRecord(record)
      SealCredStore.contractNames[record.originalContract.address] =
        record.originalContract.name()
      SealCredStore.contractNames[record.derivativeContract.address] =
        record.derivativeContract.name()
    } else {
      ledger[tokenAddress].merkleRoot = merkleRoot
    }
  }
)
sealCred.on(sealCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await SealCredStore.ledger
  ledger[tokenAddress]?.originalContract.removeAllListeners()
  delete ledger[tokenAddress]
})

export default SealCredStore