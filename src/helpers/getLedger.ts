import {
  ExternalSCERC721Ledger,
  SCERC721Ledger,
  SCEmailLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function getLedger(
  ledgerContract: SCERC721Ledger | ExternalSCERC721Ledger | SCEmailLedger
) {
  const eventsFilter = ledgerContract.filters.CreateDerivativeContract()
  const events = await ledgerContract.queryFilter(eventsFilter)
  const ledger = {} as Ledger
  const originalToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const [originalContractOrEmail, derivativeContract] = event.args
    originalToDerivative[originalContractOrEmail] = derivativeContract
  }

  for (const originalContractOrEmail in originalToDerivative) {
    ledger[originalContractOrEmail] = await getLedgerRecord(
      originalContractOrEmail,
      originalToDerivative[originalContractOrEmail]
    )
  }
  return ledger
}
