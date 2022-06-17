import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractNamesStore from 'stores/ContractNamesStore'

function ContractNameOrAddress({ address }: { address: string }) {
  const { contractNames } = useSnapshot(ContractNamesStore)
  const contractName = contractNames[address]
  console.log(address, contractName)
  if (!contractName) ContractNamesStore.fetchContractName(address)
  return <>{contractName || address}</>
}

export default function ({ address }: { address: string }) {
  return (
    <Suspense fallback={<>{address}</>}>
      <ContractNameOrAddress address={address} />
    </Suspense>
  )
}
