import { BodyText, Link } from 'components/Text'
import { Suspense } from 'react'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import SealCredStore from 'stores/SealCredStore'

function MintedCount({ address }: { address: string }) {
  const { contractsToCount } = useSnapshot(SealCredStore)
  const count = contractsToCount[address]?.toNumber()
  const message =
    count !== undefined ? `(minted: ${count})` : '(loading minted count...)'
  return <>{message}</>
}

const container = margin('mb-1')
export default function ({
  originalAddress,
  derivativeAddress,
  email,
}: {
  originalAddress: string
  derivativeAddress: string
  email?: boolean
}) {
  return (
    <div className={container}>
      <BodyText>
        <Link
          url={
            email
              ? `https://${originalAddress}`
              : `https://goerli.etherscan.io/address/${originalAddress}`
          }
        >
          <ContractName address={originalAddress} />
        </Link>{' '}
      </BodyText>
      <BodyText>
        Derivative:{' '}
        <Link url={`https://goerli.etherscan.io/address/${derivativeAddress}`}>
          <ContractName address={derivativeAddress} />
        </Link>{' '}
        <Suspense fallback={<span> (loading minted count...)</span>}>
          <MintedCount address={derivativeAddress} />
        </Suspense>
      </BodyText>
    </div>
  )
}
