import { getBatchKey, getCountOfOwners } from 'helpers/getCountOfOwners'
import { proxyWithComputed } from 'valtio/utils'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  blockNumber: number
  originalContractsCount: {
    [contractAddress: string]: Promise<{ [batchNumber: string]: number }>
  }
  derivativeContractsCount: {
    [contractAddress: string]: Promise<{ [batchNumber: string]: number }>
  }
  fetchContractsToOwnerMaps: (ledger: Ledger) => void
}

interface SealCredStoreTypeComputed {
  reverseLedger: Ledger
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  SealCredStoreTypeComputed
>(
  {
    blockNumber: 0,
    ledger: getLedger(sealCred).then((ledger) => {
      SealCredStore.fetchContractsToOwnerMaps(ledger)
      for (const record of Object.values(ledger)) {
        addListenersToLedgerRecord(record)
      }
      console.log('ledger', Object.keys(ledger).length)
      return ledger
    }),
    originalContractsCount: {},
    derivativeContractsCount: {},
    fetchContractsToOwnerMaps(ledger: Ledger) {
      for (const { originalContract, derivativeContract } of Object.values(
        ledger
      )) {
        SealCredStore.originalContractsCount[originalContract.address] =
          getCountOfOwners(originalContract)
        SealCredStore.derivativeContractsCount[derivativeContract.address] =
          getCountOfOwners(derivativeContract)
      }
      SealCredStore.originalContractsCount = {
        ...SealCredStore.originalContractsCount,
      }
      SealCredStore.derivativeContractsCount = {
        ...SealCredStore.derivativeContractsCount,
      }
    },
  },
  {
    reverseLedger: (state) =>
      Object.values(state.ledger).reduce(
        (prev, { originalContract, derivativeContract }) => ({
          ...prev,
          [derivativeContract.address]: {
            originalContract,
            derivativeContract,
          },
        }),
        {}
      ),
  }
)

function addListenersToLedgerRecord({
  originalContract,
  derivativeContract,
}: LedgerRecord) {
  originalContract.on(
    originalContract.filters.Transfer(),
    async (from, to, tokenId, { blockNumber }) => {
      if (from === '0x0000000000000000000000000000000000000000') {
        console.log(
          'Transfer (original)',
          originalContract.address,
          to,
          tokenId
        )
        const currentCount =
          (await SealCredStore.originalContractsCount[
            originalContract.address
          ]) || {}
        SealCredStore.originalContractsCount[originalContract.address] =
          Promise.resolve({
            ...currentCount,
            [getBatchKey(blockNumber)]:
              (currentCount[getBatchKey(blockNumber)] ?? 0) + 1,
          })
      }
    }
  )
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    async (from, to, tokenId, { blockNumber }) => {
      if (from === '0x0000000000000000000000000000000000000000') {
        console.log(
          'Transfer (derivative)',
          derivativeContract.address,
          to,
          tokenId
        )
        const currentCount =
          (await SealCredStore.derivativeContractsCount[
            derivativeContract.address
          ]) || {}
        SealCredStore.derivativeContractsCount[derivativeContract.address] =
          Promise.resolve({
            ...currentCount,
            [getBatchKey(blockNumber)]:
              (currentCount[getBatchKey(blockNumber)] ?? 0) + 1,
          })
      }
    }
  )
}

defaultProvider.on(
  'block',
  (blockNumber) => (SealCredStore.blockNumber = blockNumber)
)

sealCred.on(
  sealCred.filters.CreateDerivativeContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.ledger
    if (!ledger[originalContract]) {
      const record = await getLedgerRecord(sealCred, originalContract)
      ledger[originalContract] = record
      addListenersToLedgerRecord(record)
    }
  }
)
sealCred.on(
  sealCred.filters.DeleteOriginalContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.ledger
    ledger[originalContract]?.originalContract.removeAllListeners()
    ledger[originalContract]?.derivativeContract.removeAllListeners()
    delete ledger[originalContract]
  }
)

export default SealCredStore
