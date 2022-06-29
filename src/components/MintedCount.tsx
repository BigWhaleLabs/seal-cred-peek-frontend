import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'

function ContractCount() {
  const { reverseSCERC721Ledger } = useSnapshot(SealCredStore)
  const { reverseSCEmailLedger } = useSnapshot(SealCredStore)
  return (
    <>
      <BodyText>
        Total contracts:{' '}
        {Object.keys(reverseSCERC721Ledger || {}).length +
          Object.keys(reverseSCEmailLedger || {}).length}
      </BodyText>
    </>
  )
}

function MintedCount() {
  const { reverseSCERC721Ledger } = useSnapshot(SealCredStore)
  const { reverseSCEmailLedger } = useSnapshot(SealCredStore)
  const { contractsToCount } = useSnapshot(SealCredStore)
  let totalCount = 0
  for (const contract of [
    ...Object.keys(reverseSCERC721Ledger || {}),
    ...Object.keys(reverseSCEmailLedger || {}),
  ]) {
    console.log(contract, contractsToCount[contract]?.toNumber() || 0)
    totalCount += contractsToCount[contract]?.toNumber() || 0
  }
  return (
    <>
      <BodyText>Total minted derivatives: {totalCount}</BodyText>
    </>
  )
}

export default function () {
  return (
    <div>
      <Suspense fallback={<Loading text="Loading contract count..." />}>
        <ContractCount />
      </Suspense>
      <Suspense fallback={<Loading text="Loading count..." />}>
        <MintedCount />
      </Suspense>
    </div>
  )
}
