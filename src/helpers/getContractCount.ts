import {
  SCERC721Derivative,
  SCEmailDerivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default function getContractCount(
  contract: SCERC721Derivative | SCEmailDerivative
) {
  return contract.currentTokenId()
}
