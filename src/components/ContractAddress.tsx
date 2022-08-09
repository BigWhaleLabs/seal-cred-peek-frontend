import { BodyText, Link } from 'components/Text'
import ledgerContracts from 'helpers/data/ledgerContracts'

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
    </>
  )
}
