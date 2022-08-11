import { ContractMetadataStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'

export default proxy(new ContractMetadataStore()).makePersistent()
