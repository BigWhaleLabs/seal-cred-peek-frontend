import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'
import StatsStore from 'stores/StatsStore'

function MintedCount() {
  const { ledger } = useSnapshot(SealCredStore)
  const { originalCount, derivativeCount } = useSnapshot(StatsStore)

  const loadedContracts = Object.keys(derivativeCount).length
  const totalCount = Object.keys(ledger).length

  return (
    <>
      <BodyText>
        {loadedContracts !== totalCount
          ? `Loading contracts: ${loadedContracts} / ${totalCount}`
          : `Total contracts: ${totalCount}`}
      </BodyText>
      <BodyText>
        Total minted original:{' '}
        {Object.values(originalCount).reduce((sum, count) => sum + count, 0)}
      </BodyText>
      <BodyText>
        Total minted derivative:{' '}
        {Object.values(derivativeCount).reduce((sum, count) => sum + count, 0)}
      </BodyText>
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<Loading />}>
      <MintedCount />
    </Suspense>
  )
}
