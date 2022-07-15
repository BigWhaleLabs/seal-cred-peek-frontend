import { memo } from 'react'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import ContractNamesStore from 'stores/ContractNamesStore'
import Network from 'models/Network'
import SuspenseWithError from 'components/SuspenseWithError'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')

interface ContractNameProps {
  address: string
  truncate?: boolean
  network: Network
}

function ContractNameSuspended({
  address,
  truncate,
  network,
}: ContractNameProps) {
  const { contractNames } = useSnapshot(ContractNamesStore)
  const contractName = contractNames[address]
  if (!contractNames[address])
    ContractNamesStore.fetchContractName(address, network)

  return (
    <span className={contractName ? undefined : addressText}>
      {truncate
        ? truncateMiddleIfNeeded(contractName || address, 17)
        : contractName || address}
    </span>
  )
}

export default memo<ContractNameProps>(({ address, truncate, network }) => (
  <SuspenseWithError
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
    error={`Error loading contract name for ${address}`}
  >
    <ContractNameSuspended
      address={address}
      truncate={truncate}
      network={network}
    />
  </SuspenseWithError>
))
