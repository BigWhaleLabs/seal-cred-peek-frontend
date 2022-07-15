import {
  ERC721,
  SCERC721Derivative,
  SCEmailDerivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export interface SCERC721LedgerRecord {
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}

export interface SCEmailLedgerRecord {
  originalEmail: string
  derivativeContract: SCEmailDerivative
}
