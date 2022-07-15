import {
  ExternalSCERC721Ledger__factory,
  SCERC721Ledger__factory,
  SCEmailLedger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliProvider } from 'helpers/providers'
import { providers } from 'ethers'
import env from 'helpers/env'

function getExternalSCERC721LedgerContract(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return ExternalSCERC721Ledger__factory.connect(
    env.VITE_EXTERNAL_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}

function getSCERC721LedgerContract(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCERC721Ledger__factory.connect(
    env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}

function getSCEmailLedgerContract(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCEmailLedger__factory.connect(
    env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}

export const externalSCERC721LedgerContract =
  getExternalSCERC721LedgerContract(goerliProvider)
export const sCERC721LedgerContract = getSCERC721LedgerContract(goerliProvider)
export const sCEmailLedgerContract = getSCEmailLedgerContract(goerliProvider)
