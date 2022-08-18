import {
  SCPostStorage,
  SCPostStorage__factory,
} from '@big-whale-labs/seal-cred-posts-contract'
import { goerliProvider } from 'helpers/providers'
import env from 'helpers/env'

function getPostStorageContract(address: string) {
  return SCPostStorage__factory.connect(address, goerliProvider)
}

export default {
  SCEmailLedger: {
    name: 'Email posts',
    contract: getPostStorageContract(env.VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS),
  },
  SCERC721Ledger: {
    name: 'Goerly ERC721 posts',
    contract: getPostStorageContract(env.VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS),
  },
  SCExternalERC721Ledger: {
    name: 'Mainnet ERC721 posts',
    contract: getPostStorageContract(
      env.VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS
    ),
  },
} as {
  [key: string]: {
    name: string
    contract: SCPostStorage
  }
}
