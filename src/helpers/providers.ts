import { providers } from 'ethers'
import env from 'helpers/env'

export const goerliProvider = new providers.JsonRpcProvider(
  env.VITE_ETH_RPC,
  env.VITE_ETH_NETWORK
)

export const mainnetProvider = new providers.JsonRpcProvider(
  env.VITE_ETH_RPC_MAINNET,
  'mainnet'
)
