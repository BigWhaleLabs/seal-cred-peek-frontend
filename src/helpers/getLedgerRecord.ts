import {
  ERC721__factory,
  ExternalSCERC721Ledger,
  SCERC721Derivative__factory,
  SCERC721Ledger,
  SCEmailDerivative__factory,
  SCEmailLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliProvider } from 'helpers/providers'

export async function getERC721LedgerRecord(
  ledgerContract: SCERC721Ledger | ExternalSCERC721Ledger,
  originalContract: string
) {
  return {
    originalContract: ERC721__factory.connect(originalContract, goerliProvider),
    derivativeContract: SCERC721Derivative__factory.connect(
      await ledgerContract.getDerivativeContract(originalContract),
      goerliProvider
    ),
  }
}

export async function getEmailLedgerRecord(
  ledgerContract: SCEmailLedger,
  originalContract: string
) {
  return {
    originalContract: ERC721__factory.connect(originalContract, goerliProvider),
    derivativeContract: SCEmailDerivative__factory.connect(
      await ledgerContract.getDerivativeContract(originalContract),
      goerliProvider
    ),
  }
}
