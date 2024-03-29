import { BodyText, Link } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import Network from 'models/Network'
import SealCredStore from 'stores/SealCredStore'
import SuspenseWithError from 'components/SuspenseWithError'
import isEthereumAddress from 'helpers/isEthereumAddress'

function MintedCount({ address }: { address: string }) {
  const { addressToCount } = useSnapshot(SealCredStore)
  const count = addressToCount[address]
  const message =
    count !== undefined ? `(minted: ${count})` : '(loading minted count...)'
  return <>{message}</>
}

const container = margin('mb-1')
export default function ({
  derivativeAddress,
  network,
  originalAddressOrEmail,
}: {
  originalAddressOrEmail: string
  derivativeAddress: string
  network: Network
}) {
  const isEmail = !isEthereumAddress(originalAddressOrEmail)
  return (
    <div className={container}>
      <BodyText>
        <Link
          url={
            isEmail
              ? `https://${originalAddressOrEmail}`
              : `https://${
                  network === Network.Mainnet ? '' : 'goerli.'
                }etherscan.io/address/${originalAddressOrEmail}`
          }
        >
          {isEmail ? (
            <>{originalAddressOrEmail}</>
          ) : (
            <ContractName address={originalAddressOrEmail} network={network} />
          )}
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
        <SuspenseWithError
          error="(error loading minted count)"
          fallback={<span> (loading minted count...)</span>}
        >
          <MintedCount address={derivativeAddress} />
        </SuspenseWithError>
      </BodyText>
    </div>
  )
}
