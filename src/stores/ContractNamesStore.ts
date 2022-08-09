import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { RESERVED_CONTRACT_METADATA } from '@big-whale-labs/constants'
import { goerliProvider, mainnetProvider } from 'helpers/providers'
import { proxy } from 'valtio'
import Network from 'models/Network'
import PersistableStore from 'stores/persistence/PersistableStore'
import networkPick from 'helpers/networkPick'

class ContractNamesStore extends PersistableStore {
  savedContractNames = {} as {
    [contractAddress: string]: string | undefined
  }

  requestedNames = {} as {
    [contractAddress: string]: Promise<string | undefined> | undefined
  }

  get contractNames() {
    return {
      ...this.savedContractNames,
      ...this.requestedNames,
    }
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['requestedNames', 'contractNames']
    return disallowList.includes(key) ? undefined : value
  }

  fetchContractName(addressAnycase: string, network: Network) {
    const address = addressAnycase.toLowerCase()
    if (this.contractNames[address]) return
    if (RESERVED_CONTRACT_METADATA[address]) {
      this.savedContractNames[address] =
        RESERVED_CONTRACT_METADATA[address].name
      return
    }
    this.requestedNames[address] = ERC721__factory.connect(
      address,
      networkPick(network, goerliProvider, mainnetProvider)
    )
      .name()
      .then((result) => {
        this.savedContractNames[address] = result
        return result || address
      })
      .catch(() => {
        this.savedContractNames[address] = address
        return address
      })
  }
}

export default proxy(new ContractNamesStore()).makePersistent(true)
