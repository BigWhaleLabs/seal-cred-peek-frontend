import { BodyText, Link } from 'components/Text'
// import { Suspense } from 'react'
import { margin } from 'classnames/tailwind'
// import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
// import StatsStore from 'stores/StatsStore'

// function MintedCount({ address }: { address: string }) {
//   const { originalCount, derivativeCount } = useSnapshot(StatsStore)

//   return <>(minted: {originalCount[address] ?? derivativeCount[address]})</>
// }

const container = margin('mb-4')
export default function ({
  originalAddress,
  derivativeAddress,
}: {
  originalAddress: string
  derivativeAddress: string
}) {
  return (
    <div className={container}>
      <BodyText>
        <Link url={`https://goerli.etherscan.io/address/${originalAddress}`}>
          <ContractName address={originalAddress} />
        </Link>{' '}
        {/* <Suspense fallback={<span> (loading minted count...)</span>}>
          <MintedCount address={originalAddress} />
        </Suspense> */}
      </BodyText>
      <BodyText>
        Derivative:{' '}
        <Link url={`https://goerli.etherscan.io/address/${derivativeAddress}`}>
          <ContractName address={derivativeAddress} />
        </Link>{' '}
        {/* <Suspense fallback={<span> (loading minted count...)</span>}>
          <MintedCount address={derivativeAddress} />
        </Suspense> */}
      </BodyText>
    </div>
  )
}
