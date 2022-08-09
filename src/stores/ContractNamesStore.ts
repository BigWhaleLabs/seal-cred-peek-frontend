import { ContractNamesStore } from '@big-whale-labs/store-utils'
import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { RESERVED_CONTRACT_METADATA } from '@big-whale-labs/constants'
import { goerliProvider, mainnetProvider } from 'helpers/providers'
import { proxy } from 'valtio'
import Network from 'models/Network'
import networkPick from 'helpers/networkPick'

export default proxy(
  new ContractNamesStore(['requestedNames', 'contractNames'])
).makePersistent(true)
