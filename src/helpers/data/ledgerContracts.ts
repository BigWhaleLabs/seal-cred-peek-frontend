import {
  Ledger,
  Ledger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliProvider } from 'helpers/providers'
import Network from 'models/Network'
import env from 'helpers/env'

function getLedgerContract(address: string) {
  return Ledger__factory.connect(address, goerliProvider)
}

export default {
  SCERC721Ledger: {
    contract: getLedgerContract(env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS),
    name: 'Goerli ERC721 Ledger',
    network: Network.Goerli,
  },
  SCEmailLedger: {
    contract: getLedgerContract(env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS),
    name: 'Email Ledger',
    network: Network.Goerli,
  },
  SCExternalERC721Ledger: {
    contract: getLedgerContract(
      env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS
    ),
    name: 'Mainnet ERC721 Ledger',
    network: Network.Mainnet,
  },
} as {
  [key: string]: {
    network: Network
    name: string
    contract: Ledger
  }
}
