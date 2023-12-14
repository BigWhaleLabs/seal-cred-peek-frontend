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
  SCERC721Ledger: {
    contract: getPostStorageContract(env.VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS),
    name: 'Goerly ERC721 posts',
  },
  SCEmailLedger: {
    contract: getPostStorageContract(env.VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS),
    name: 'Email posts',
  },
  SCExternalERC721Ledger: {
    contract: getPostStorageContract(
      env.VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS
    ),
    name: 'Mainnet ERC721 posts',
  },
} as {
  [key: string]: {
    name: string
    contract: SCPostStorage
  }
}
