import { Derivative } from '@big-whale-labs/seal-cred-ledger-contract'

export default interface LedgerRecord {
  original: string
  derivativeContract: Derivative
}
