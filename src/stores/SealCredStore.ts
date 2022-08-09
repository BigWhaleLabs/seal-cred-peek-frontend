import { Derivative } from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliProvider } from 'helpers/providers'
import { proxy } from 'valtio'
import { utils } from 'ethers'
import Ledger from 'models/Ledger'
import getContractCount from 'helpers/getContractCount'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import ledgerContracts from 'helpers/data/ledgerContracts'

interface SealCredStoreType {
  ledgers: {
    [name: string]: Promise<Ledger>
  }
  addressToCount: { [address: string]: Promise<number | undefined> }
}

async function fetchContractCountAtLedger(ledgerPromise: Promise<Ledger>) {
  const ledger = await ledgerPromise
  for (const { derivativeContract } of Object.values(ledger)) {
    fetchContractCount(derivativeContract)
  }
  return ledger
}

const SealCredStore = proxy<SealCredStoreType>({
  ledgers: Object.entries(ledgerContracts).reduce(
    (prev, [name, { contract: ledgerContract }]) => {
      return {
        ...prev,
        [name]: fetchContractCountAtLedger(getLedger(ledgerContract)),
      }
    },
    {}
  ),
  addressToCount: {},
})

function fetchContractCount(contract: Derivative) {
  SealCredStore.addressToCount[contract.address] = getContractCount(contract)
}

const derivativeToOriginal = {} as { [address: string]: string }
const wrongAddresses = {} as { [address: string]: boolean }
function getOriginalFromDerivative(derivative: string, ledger: Ledger = {}) {
  if (derivativeToOriginal[derivative]) return derivativeToOriginal[derivative]
  for (const { original, derivativeContract } of Object.values(ledger)) {
    if (derivativeContract.address === derivative) {
      derivativeToOriginal[derivative] = original
      return original
    }
  }
}
goerliProvider.on(
  {
    topics: [utils.id('Transfer(address,address,uint256)')],
  },
  async (event) => {
    const { address } = event
    if (wrongAddresses[address]) return
    for (const name of Object.keys(ledgerContracts)) {
      const ledger = await SealCredStore.ledgers[name]
      const original = getOriginalFromDerivative(address, ledger)
      if (!original) {
        continue
      }
      const record = ledger[original]
      if (record) {
        fetchContractCount(record.derivativeContract)
      }
      return
    }
    wrongAddresses[address] = true
  }
)

for (const [name, { contract: ledgerContract }] of Object.entries(
  ledgerContracts
)) {
  ledgerContract.on(
    ledgerContract.filters.CreateDerivative(),
    async (original, derivative) => {
      const ledger = await SealCredStore.ledgers[name]
      const record = getLedgerRecord(original, derivative)
      ledger[original] = record
      fetchContractCount(record.derivativeContract)
    }
  )
  ledgerContract.on(
    ledgerContract.filters.DeleteOriginal(),
    async (original) => {
      const ledger = await SealCredStore.ledgers[name]
      const record = ledger[original]
      if (record) {
        delete ledger[original]
        delete SealCredStore.addressToCount[record.derivativeContract.address]
      }
    }
  )
}

export default SealCredStore
