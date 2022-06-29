import defaultProvider from 'helpers/defaultProvider'
import getSCERC721Ledger from 'helpers/getSCERC721Ledger'
import getSCEmailLedger from 'helpers/getSCEmailLedger'

export const sCERC721Ledger = getSCERC721Ledger(defaultProvider)
export const sCEmailLedger = getSCEmailLedger(defaultProvider)
