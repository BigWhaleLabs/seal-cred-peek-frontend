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
  SCEmailLedger: {
    network: Network.Goerli,
    name: 'Email Ledger',
    contract: getLedgerContract(env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS),
  },
  SCERC721Ledger: {
    network: Network.Goerli,
    name: 'Goerli ERC721 Ledger',
    contract: getLedgerContract(env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS),
  },
  SCExternalERC721Ledger: {
    network: Network.Mainnet,
    name: 'Mainnet ERC721 Ledger',
    contract: getLedgerContract(
      env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS
    ),
  },
} as {
  [key: string]: {
    network: Network
    name: string
    contract: Ledger
  }
}
