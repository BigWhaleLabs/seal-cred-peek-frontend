import { goerliProvider, mainnetProvider } from 'helpers/providers'
import { memo } from 'react'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import Network from 'models/Network'
import SuspenseWithError from 'components/SuspenseWithError'
import networkPick from 'helpers/networkPick'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')

interface ContractNameProps {
  address: string
  truncate?: boolean
  network: Network
}

function ContractNameSuspended({
  address,
  network,
  truncate,
}: ContractNameProps) {
  const { contractNames } = useSnapshot(ContractMetadataStore)
  const contractName = contractNames[address]
  if (!contractNames[address])
    ContractMetadataStore.fetchContractName(
      address,
      networkPick(network, goerliProvider, mainnetProvider)
    )

  return (
    <span className={contractName ? undefined : addressText}>
      {truncate
        ? truncateMiddleIfNeeded(contractName || address, 17)
        : contractName || address}
    </span>
  )
}

export default memo<ContractNameProps>(({ address, network, truncate }) => (
  <SuspenseWithError
    error={`Error loading contract name for ${address}`}
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
  >
    <ContractNameSuspended
      address={address}
      network={network}
      truncate={truncate}
    />
  </SuspenseWithError>
))
