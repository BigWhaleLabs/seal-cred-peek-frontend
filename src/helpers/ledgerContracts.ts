import {
  getExternalSCERC721LedgerCondract,
  getSCERC721LedgerCondract,
  getSCEmailLedgerContract,
} from 'helpers/getLedgerContracts'
import { goerliProvider } from 'helpers/providers'

export const sCERC721Ledger = getSCERC721LedgerCondract(goerliProvider)
export const externalSCERC721Ledger =
  getExternalSCERC721LedgerCondract(goerliProvider)
export const sCEmailLedger = getSCEmailLedgerContract(goerliProvider)
