import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Contract from 'components/Contract'
import SealCredStore from 'stores/SealCredStore'
import StatsStore from 'stores/StatsStore'

export default function () {
  const { derivativeCount } = useSnapshot(StatsStore)
  const { reverseLedger } = useSnapshot(SealCredStore)

  return !Object.keys(derivativeCount).length ? (
    <BodyText>No contracts added yet</BodyText>
  ) : (
    <>
      {Object.entries(derivativeCount)
        .sort(([keyA, countA], [keyB, countB]) => countB - countA)
        .map(([contract]) => (
          <Contract
            originalAddress={reverseLedger[contract].originalContract.address}
            derivativeAddress={contract}
            key={contract}
          />
        ))}
    </>
  )
}
