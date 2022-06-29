import { BodyText, Link, SubheaderText } from 'components/Text'
import env from 'helpers/env'

export default function () {
  const erc721Address = env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS
  const emailAddress = env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS
  return (
    <>
      <SubheaderText>ERC721 Contract address:</SubheaderText>
      <BodyText>
        <Link url={`https://goerli.etherscan.io/address/${erc721Address}`}>
          {erc721Address}
        </Link>
      </BodyText>
      <SubheaderText>Email Contract address:</SubheaderText>
      <BodyText>
        <Link url={`https://goerli.etherscan.io/address/${emailAddress}`}>
          {emailAddress}
        </Link>
      </BodyText>
    </>
  )
}
