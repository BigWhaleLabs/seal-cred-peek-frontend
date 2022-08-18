import { BigNumber } from 'ethers'
import { proxy } from 'valtio'
import postStorageContracts from 'helpers/data/postStorageContracts'

export default proxy({
  postStorages: Object.entries(postStorageContracts).reduce(
    (prev, [key, { contract }]) => {
      return {
        ...prev,
        [key]: contract.currentPostId(),
      }
    },
    {} as { [key: string]: Promise<BigNumber> }
  ),
})
