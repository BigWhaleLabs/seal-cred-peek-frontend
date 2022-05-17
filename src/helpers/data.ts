import { getContractAddress } from 'helpers/api'
import { proxy } from 'valtio'

type DataType = {
  contractAddress: Promise<{ address: string }>
}

export default proxy<DataType>({
  contractAddress: getContractAddress(),
})
