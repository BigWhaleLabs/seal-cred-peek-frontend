import {
  ERC721,
  ERC721__factory,
  SCERC721Derivative,
  SCERC721Derivative__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { getContractAddress } from 'helpers/api'
import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import defaultProvider from 'helpers/defaultProvider'
import getLedger from 'helpers/ledger'
import sealCred from 'helpers/sealCred'

type DataType = {
  contractAddress: Promise<{ address: string }>
  ledger: Promise<Ledger>
}

const data = proxy<DataType>({
  contractAddress: getContractAddress(),
  ledger: getLedger(sealCred).then((ledger) => {
    Object.values(ledger).forEach(
      ({ derivativeContract, originalContract }) => {
        setupERC721Listener(originalContract)
        setupSCERC721DerivativeListener(derivativeContract)
      }
    )
    return ledger
  }),
})

function setupERC721Listener(contract: ERC721) {
  // TODO: we need to recalculate the root here
}

function setupSCERC721DerivativeListener(contract: SCERC721Derivative) {
  // TODO: we need to recalculate the root here
}

sealCred.on(
  sealCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await data.ledger
    if (!ledger[tokenAddress]) {
      const originalContract = ERC721__factory.connect(
        tokenAddress,
        defaultProvider
      )
      const derivativeContract = SCERC721Derivative__factory.connect(
        await sealCred.getDerivativeAddress(tokenAddress),
        defaultProvider
      )
      ledger[tokenAddress] = {
        merkleRoot,
        originalContract,
        derivativeContract,
      }
      setupERC721Listener(originalContract)
      setupSCERC721DerivativeListener(derivativeContract)
    } else {
      ledger[tokenAddress].merkleRoot = merkleRoot
    }
  }
)
sealCred.on(sealCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await data.ledger
  ledger[tokenAddress].originalContract.removeAllListeners()
  ledger[tokenAddress].derivativeContract.removeAllListeners()
  delete ledger[tokenAddress]
})

export default data
