import { BodyText, Link, SubheaderText } from 'components/Text'
import env from 'helpers/env'

export default function () {
  const address = env.VITE_SCLEDGER_CONTRACT_ADDRESS
  return (
    <>
      <SubheaderText>Contract address:</SubheaderText>
      <BodyText>
        <Link url={`https://goerli.etherscan.io/address/${address}`}>
          {address}
        </Link>
      </BodyText>
    </>
  )
}
