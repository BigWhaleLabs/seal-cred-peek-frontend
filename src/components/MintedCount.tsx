import { BodyText } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'
import SuspenseWithError from 'components/SuspenseWithError'
import formatNumber from 'helpers/formatNumber'
import ledgerContracts from 'helpers/data/ledgerContracts'
import previousData from 'helpers/data/previousData'

function ContractCount() {
  const { ledgers } = useSnapshot(SealCredStore)
  let count = 0
  for (const name of Object.keys(ledgerContracts)) {
    count += Object.keys(ledgers[name]).length
  }
  return (
    <>
      <BodyText>Contracts: {count}</BodyText>
    </>
  )
}

function MintedCount() {
  const { ledgers, addressToCount } = useSnapshot(SealCredStore)
  const counts = {} as { [name: string]: number }
  for (const name of Object.keys(ledgerContracts)) {
    const ledger = ledgers[name]
    counts[name] = Object.values(ledger).reduce(
      (acc, { derivativeContract }) =>
        // eslint-disable-next-line valtio/state-snapshot-rule
        acc + (addressToCount[derivativeContract.address] || 0),
      0
    )
  }
  const totalCount = Object.values(counts).reduce(
    (acc, count) => acc + count,
    0
  )
  const mintedBeforeCount = previousData.reduce(
    (acc, { count }) => acc + count,
    0
  )
  return (
    <>
      <div className={margin('my-2')}>
        <BodyText>Minted derivatives:</BodyText>
        <BodyText>
          Total for current version: {formatNumber(totalCount)}
        </BodyText>
        {Object.entries(counts).map(([name, count]) => (
          <div key={name}>
            <BodyText>
              {ledgerContracts[name].name}: {formatNumber(count)}
            </BodyText>
          </div>
        ))}
        <BodyText>
          Previous versions: {formatNumber(mintedBeforeCount)}
        </BodyText>
        <BodyText>
          All time and all versions:{' '}
          {formatNumber(totalCount + mintedBeforeCount)}
        </BodyText>
      </div>
    </>
  )
}

export default function () {
  return (
    <div>
      <SuspenseWithError
        fallback={<Loading text="Loading contract count..." />}
        error="Error loading contract count"
      >
        <ContractCount />
      </SuspenseWithError>
      <SuspenseWithError
        fallback={<Loading text="Loading minted count..." />}
        error="Error loading minted count"
      >
        <MintedCount />
      </SuspenseWithError>
    </div>
  )
}
