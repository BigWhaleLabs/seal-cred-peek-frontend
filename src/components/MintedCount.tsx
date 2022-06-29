import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'

function MintedCount() {
  const { contractsToCount } = useSnapshot(SealCredStore)
  const totalCount = Object.values(contractsToCount).reduce(
    (acc, count) => acc + count.toNumber(),
    0
  )

  return (
    <>
      <BodyText>
        Total contracts: {Object.keys(contractsToCount).length}
      </BodyText>
      <BodyText>Total minted derivatives: {totalCount}</BodyText>
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<Loading text="Loading count..." />}>
      <MintedCount />
    </Suspense>
  )
}
