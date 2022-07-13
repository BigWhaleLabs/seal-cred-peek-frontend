import { BodyText, Link } from 'components/Text'
import { Suspense } from 'react'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import Network from 'models/Network'
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
  network,
}: {
  originalAddress: string
  derivativeAddress: string
  email?: boolean
  network: Network
}) {
  return (
    <div className={container}>
      <BodyText>
        <Link
          url={
            email
              ? `https://${originalAddress}`
              : `https://${
                  network === Network.Mainnet ? '' : 'goerli.'
                }etherscan.io/address/${originalAddress}`
          }
        >
          <ContractName address={originalAddress} network={network} />
        </Link>{' '}
      </BodyText>
      <BodyText>
        Derivative:{' '}
        <Link
          url={`https://${
            network === Network.Mainnet ? '' : 'goerli.'
          }etherscan.io/address/${derivativeAddress}`}
        >
          <ContractName address={derivativeAddress} network={Network.Goerli} />
        </Link>{' '}
        <Suspense fallback={<span> (loading minted count...)</span>}>
          <MintedCount address={derivativeAddress} />
        </Suspense>
      </BodyText>
    </div>
  )
}
