import LedgerRecord from 'models/LedgerRecord'

export default interface Ledger {
  [address: string]: LedgerRecord
}
