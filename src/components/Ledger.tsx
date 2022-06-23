import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Contract from 'components/Contract'
import SealCredStore from 'stores/SealCredStore'
import StatsStore from 'stores/StatsStore'

export default function () {
  const { derivativeCount } = useSnapshot(StatsStore)
  const { reverseLedger } = useSnapshot(SealCredStore)

  return !reverseLedger || !Object.keys(derivativeCount).length ? (
    <BodyText>No contracts added yet</BodyText>
  ) : (
    <>
      {Object.entries(derivativeCount)
        .sort((leftCount, rightCount) => rightCount[1] - leftCount[1])
        .map(([contract]) => (
          <Contract
            originalAddress={
              reverseLedger &&
              reverseLedger[contract] &&
              reverseLedger[contract].originalContract.address
            }
            derivativeAddress={contract}
            key={contract}
          />
        ))}
    </>
  )
}
