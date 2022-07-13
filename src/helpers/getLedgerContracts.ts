import {
  ExternalSCERC721Ledger__factory,
  SCERC721Ledger__factory,
  SCEmailLedger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export function getSCEmailLedgerContract(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCEmailLedger__factory.connect(
    env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}

export function getSCERC721LedgerCondract(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SCERC721Ledger__factory.connect(
    env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}

export function getExternalSCERC721LedgerCondract(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return ExternalSCERC721Ledger__factory.connect(
    env.VITE_EXTERNAL_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}
