import {
  ETH_NETWORK,
  ETH_RPC,
  SCLEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'

export default {
  VITE_APP_BACKEND_URL: import.meta.env.VITE_APP_BACKEND_URL,
  VITE_ETH_NETWORK: (import.meta.env.VITE_ETH_NETWORK as string) || ETH_NETWORK,
  VITE_ETH_RPC: (import.meta.env.VITE_ETH_RPC as string) || ETH_RPC,
  VITE_SCLEDGER_CONTRACT_ADDRESS:
    (import.meta.env.VITE_SCLEDGER_CONTRACT_ADDRESS as string) ||
    SCLEDGER_CONTRACT_ADDRESS,
}
