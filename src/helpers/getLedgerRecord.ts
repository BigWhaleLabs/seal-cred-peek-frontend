import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SCEmailDerivative__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { SCERC721LedgerRecord, SCEmailLedgerRecord } from 'models/LedgerRecord'
import { goerliProvider } from 'helpers/providers'
import isEthereumAddress from 'helpers/isEthereumAddress'

export default function (
  originalContractOrEmail: string,
  derivativeContractAddress: string
) {
  return isEthereumAddress(originalContractOrEmail)
    ? ({
        originalContract: ERC721__factory.connect(
          originalContractOrEmail,
          goerliProvider
        ),
        derivativeContract: SCERC721Derivative__factory.connect(
          derivativeContractAddress,
          goerliProvider
        ),
      } as SCERC721LedgerRecord)
    : ({
        originalEmail: originalContractOrEmail,
        derivativeContract: SCEmailDerivative__factory.connect(
          derivativeContractAddress,
          goerliProvider
        ),
      } as SCEmailLedgerRecord)
}
