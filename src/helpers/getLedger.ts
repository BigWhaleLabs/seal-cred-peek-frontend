import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (sealCredLedger: SealCredLedger) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as Ledger
  const originalToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const { originalContract, derivativeContract } = event.args
    originalToDerivative[originalContract] = derivativeContract
  }

  for (const originalContract in originalToDerivative) {
    ledger[originalContract] = await getLedgerRecord(
      sealCredLedger,
      originalContract
    )
  }
  return ledger
}
