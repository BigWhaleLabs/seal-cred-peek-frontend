import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SCEmailDerivative__factory,
  SealCredERC721Ledger,
  SealCredEmailLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import defaultProvider from 'helpers/defaultProvider'

export async function getERC721LedgerRecord(
  ledgerContract: SealCredERC721Ledger,
  originalContract: string
) {
  return {
    originalContract: ERC721__factory.connect(
      originalContract,
      defaultProvider
    ),
    derivativeContract: SCERC721Derivative__factory.connect(
      await ledgerContract.getDerivativeContract(originalContract),
      defaultProvider
    ),
  }
}

export async function getEmailLedgerRecord(
  ledgerContract: SealCredEmailLedger,
  originalContract: string
) {
  return {
    originalContract: ERC721__factory.connect(
      originalContract,
      defaultProvider
    ),
    derivativeContract: SCEmailDerivative__factory.connect(
      await ledgerContract.getDerivativeContract(originalContract),
      defaultProvider
    ),
  }
}
