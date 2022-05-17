import LedgerRecord from 'models/LedgerRecord'

export default interface Leger {
  [address: string]: LedgerRecord
}
