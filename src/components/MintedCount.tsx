import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'

function MintedCount() {
  const { reverseSCERC721Ledger } = useSnapshot(SealCredStore)
  const { reverseSCEmailLedger } = useSnapshot(SealCredStore)
  const { contractsToCount } = useSnapshot(SealCredStore)
  let totalCount = 0
  for (const contract of [
    ...Object.keys(reverseSCERC721Ledger || {}),
    ...Object.keys(reverseSCEmailLedger || {}),
  ]) {
    totalCount += contractsToCount[contract]?.toNumber() || 0
  }
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
