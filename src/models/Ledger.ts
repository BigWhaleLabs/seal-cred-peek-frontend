import { SCERC721LedgerRecord, SCEmailLedgerRecord } from 'models/LedgerRecord'

export interface SCERC721LedgerModel {
  [address: string]: SCERC721LedgerRecord
}

export interface SCEmailLedgerModel {
  [address: string]: SCEmailLedgerRecord
}
