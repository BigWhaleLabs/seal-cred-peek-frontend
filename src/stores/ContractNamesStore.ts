import { ContractNamesStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

export default proxy(
  new ContractNamesStore(['requestedNames', 'contractNames'])
).makePersistent(true)
