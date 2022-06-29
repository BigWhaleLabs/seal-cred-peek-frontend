import { SCERC721LedgerRecord, SCEmailLedgerRecord } from 'models/LedgerRecord'

export interface SCERC721Ledger {
  [address: string]: SCERC721LedgerRecord
}

export interface SCEmailLedger {
  [address: string]: SCEmailLedgerRecord
}
