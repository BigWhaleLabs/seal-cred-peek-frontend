import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

function ContractNameOrAddress({ address }: { address: string }) {
  const { contractNames } = useSnapshot(SealCredStore)
  return <>{contractNames[address] || address}</>
}

export default function ({ address }: { address: string }) {
  return (
    <Suspense fallback={<>{address}</>}>
      <ContractNameOrAddress address={address} />
    </Suspense>
  )
}
