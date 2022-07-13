import {
  ExternalSCERC721Ledger,
  SCERC721Ledger,
  SCEmailLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { SCERC721LedgerModel, SCEmailLedgerModel } from 'models/Ledger'
import {
  getERC721LedgerRecord,
  getEmailLedgerRecord,
} from 'helpers/getLedgerRecord'

export async function getERC721Ledger(sealCredLedger: SCERC721Ledger) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as SCERC721LedgerModel
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

export async function getExternalERC721Ledger(
  sealCredLedger: ExternalSCERC721Ledger
) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as SCERC721LedgerModel
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

export async function getEmailLedger(sealCredLedger: SCEmailLedger) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as SCEmailLedgerModel
  const originalToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const { domain, derivativeContract } = event.args
    originalToDerivative[domain] = derivativeContract
  }

  for (const domain in originalToDerivative) {
    ledger[domain] = await getEmailLedgerRecord(sealCredLedger, domain)
  }
  return ledger
}
