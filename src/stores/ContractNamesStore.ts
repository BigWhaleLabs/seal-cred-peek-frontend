import { ContractNamesStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

export default proxy(new ContractNamesStore()).makePersistent(true)
