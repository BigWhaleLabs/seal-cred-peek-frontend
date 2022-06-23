import { getBatchKey, getCountOfOwners } from 'helpers/getCountOfOwners'
import { proxyWithComputed } from 'valtio/utils'
import ContractNamesStore from 'stores/ContractNamesStore'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  specialContracts: string[]
  ledger: Promise<Ledger>
  blockNumber: number
  originalContractsCount: {
    [contractAddress: string]: { [batchNumber: string]: number }
  }
  derivativeContractsCount: {
    [contractAddress: string]: { [batchNumber: string]: number }
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
    specialContracts: [
      '0x508C58996E46B10b093F9F4EaD6ab3416e73f3a1',
      '0x690Ea2D4E784E856A754bFE1F55C241e9e99D906',
      '0x08a38f2410FEf065384647205dB9801481f4F8E8',
      '0x529B8349A9b1d6122ccFFb2aD16D8c3C746d0193',
      '0xf58898F874dbB445E5E31615f8DB78411DE390a0',
      '0x6BDed8326a319A79772501B7931E96a054469B64',
      '0xEEa2d31B66a736eA987Ba06f3bD257168de4DD70',
    ],
    blockNumber: 0,
    ledger: getLedger(sealCred).then(async (ledger) => {
      for (const { originalContract, derivativeContract } of Object.values(
        ledger
      )) {
        await ContractNamesStore.fetchContractName(originalContract.address)
        SealCredStore.originalContractsCount[originalContract.address] = {}
        await ContractNamesStore.fetchContractName(derivativeContract.address)
        SealCredStore.derivativeContractsCount[derivativeContract.address] = {}
      }
      SealCredStore.blockNumber = await defaultProvider.getBlockNumber()
      SealCredStore.fetchContractsToOwnerMaps(ledger)
      console.log('ledger', Object.keys(ledger).length)
      return ledger
    }),
    originalContractsCount: {},
    derivativeContractsCount: {},
    async fetchContractsToOwnerMaps(ledger: Ledger) {
      for (const record of Object.values(ledger)) {
        try {
          const { originalContract, derivativeContract } = record
          if (
            SealCredStore.specialContracts.includes(originalContract.address)
          ) {
            console.log(
              'Load original',
              ContractNamesStore.contractNames[originalContract.address]
            )
            SealCredStore.originalContractsCount[originalContract.address] =
              await getCountOfOwners(
                originalContract,
                SealCredStore.blockNumber
              )
          }
          console.log(
            'Load derivative',
            ContractNamesStore.contractNames[derivativeContract.address]
          )
          SealCredStore.derivativeContractsCount[derivativeContract.address] =
            await getCountOfOwners(
              derivativeContract,
              SealCredStore.blockNumber
            )
          SealCredStore.originalContractsCount = {
            ...SealCredStore.originalContractsCount,
          }
          SealCredStore.derivativeContractsCount = {
            ...SealCredStore.derivativeContractsCount,
          }
          addListenersToLedgerRecord(record)
        } catch (e) {
          console.log(e)
        }
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
    (from, to, tokenId, { blockNumber }) => {
      if (from === '0x0000000000000000000000000000000000000000') {
        console.log(
          'Transfer (original)',
          originalContract.address,
          to,
          tokenId
        )
        const currentCount =
          SealCredStore.originalContractsCount[originalContract.address] || {}
        SealCredStore.originalContractsCount[originalContract.address] = {
          ...currentCount,
          [getBatchKey(blockNumber)]:
            (currentCount[getBatchKey(blockNumber)] ?? 0) + 1,
        }
      }
    }
  )
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    (from, to, tokenId, { blockNumber }) => {
      if (from === '0x0000000000000000000000000000000000000000') {
        console.log(
          'Transfer (derivative)',
          derivativeContract.address,
          to,
          tokenId
        )
        const currentCount =
          SealCredStore.derivativeContractsCount[derivativeContract.address] ||
          {}
        SealCredStore.derivativeContractsCount[derivativeContract.address] = {
          ...currentCount,
          [getBatchKey(blockNumber)]:
            (currentCount[getBatchKey(blockNumber)] ?? 0) + 1,
        }
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
