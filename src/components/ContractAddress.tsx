import { BodyText, Link } from 'components/Text'
import ledgerContracts from 'helpers/data/ledgerContracts'
import postStorageContracts from 'helpers/data/postStorageContracts'

export default function () {
  return (
    <>
      {Object.entries(ledgerContracts).map(([name, { contract }]) => (
        <div key={name}>
          <BodyText>
            {name}:{' '}
            <Link
              url={`https://goerli.etherscan.io/address/${contract.address}`}
            >
              {contract.address}
            </Link>
          </BodyText>
        </div>
      ))}
      {Object.entries(postStorageContracts).map(([name, { contract }]) => (
        <div key={name}>
          <BodyText>
            {postStorageContracts[name].name}:{' '}
            <Link
              url={`https://goerli.etherscan.io/address/${contract.address}`}
            >
              {contract.address}
            </Link>
          </BodyText>
        </div>
      ))}
    </>
  )
}
