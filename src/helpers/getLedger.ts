import { SCERC721Ledger, SCEmailLedger } from 'models/Ledger'
import {
  SealCredERC721Ledger,
  SealCredEmailLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import {
  getERC721LedgerRecord,
  getEmailLedgerRecord,
} from 'helpers/getLedgerRecord'

export async function getERC721Ledger(sealCredLedger: SealCredERC721Ledger) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as SCERC721Ledger
  const originalToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const { originalContract, derivativeContract } = event.args
    originalToDerivative[originalContract] = derivativeContract
  }

  for (const originalContract in originalToDerivative) {
    ledger[originalContract] = await getERC721LedgerRecord(
      sealCredLedger,
      originalContract
    )
  }
  return ledger
}

export async function getEmailLedger(sealCredLedger: SealCredEmailLedger) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as SCEmailLedger
  const originalToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const { email, derivativeContract } = event.args
    originalToDerivative[email] = derivativeContract
  }

  for (const email in originalToDerivative) {
    ledger[email] = await getEmailLedgerRecord(sealCredLedger, email)
  }
  return ledger
}
