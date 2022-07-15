import { SCERC721LedgerRecord, SCEmailLedgerRecord } from 'models/LedgerRecord'

export default interface Ledger {
  [address: string]: SCERC721LedgerRecord | SCEmailLedgerRecord
}
