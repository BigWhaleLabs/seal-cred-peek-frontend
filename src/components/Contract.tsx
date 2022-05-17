import { BodyText, Link } from 'components/Text'
import { Suspense } from 'react'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import MerkleRoots from 'components/MerkleRoots'
import SealCredStore from 'stores/SealCredStore'

function MintedCount({ address }: { address: string }) {
  const { originalContractsToOwnersMaps, derivativeContractsToOwnersMaps } =
    useSnapshot(SealCredStore)
  return (
    <>
      (minted:{' '}
      {
        Object.keys(
          originalContractsToOwnersMaps[address] ||
            derivativeContractsToOwnersMaps[address]
        ).length
      }
      )
    </>
  )
}

const container = margin('mb-4')
export default function Contract({
  originalAddress,
  derivativeAddress,
}: {
  originalAddress: string
  derivativeAddress: string
}) {
  return (
    <div className={container}>
      <BodyText>
        <Link url={`https://rinkeby.etherscan.io/address/${originalAddress}`}>
          <ContractName address={originalAddress} />
        </Link>{' '}
        <Suspense fallback={<span> (loading minted count...)</span>}>
          <MintedCount address={originalAddress} />
        </Suspense>
      </BodyText>
      <BodyText>
        Derivative:{' '}
        <Link url={`https://rinkeby.etherscan.io/address/${derivativeAddress}`}>
          <ContractName address={derivativeAddress} />
        </Link>{' '}
        <Suspense fallback={<span> (loading minted count...)</span>}>
          <MintedCount address={derivativeAddress} />
        </Suspense>
      </BodyText>
      <Suspense fallback={<BodyText>Loading Merkle roots...</BodyText>}>
        <MerkleRoots address={originalAddress} />
      </Suspense>
    </div>
  )
}
