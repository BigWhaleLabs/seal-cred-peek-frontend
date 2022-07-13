import { BodyText, Link } from 'components/Text'
import env from 'helpers/env'

export default function () {
  const externalSCERC721Address =
    env.VITE_EXTERNAL_SC_ERC721_LEDGER_CONTRACT_ADDRESS
  const erc721Address = env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS
  const emailAddress = env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS
  return (
    <>
      <BodyText>
        Mainnet ERC721 Contract address:{' '}
        <Link
          url={`https://goerli.etherscan.io/address/${externalSCERC721Address}`}
        >
          {externalSCERC721Address}
        </Link>
      </BodyText>
      <BodyText>
        Goerli ERC721 Contract address:{' '}
        <Link url={`https://goerli.etherscan.io/address/${erc721Address}`}>
          {erc721Address}
        </Link>
      </BodyText>
      <BodyText>
        Email Contract address:{' '}
        <Link url={`https://goerli.etherscan.io/address/${emailAddress}`}>
          {emailAddress}
        </Link>
      </BodyText>
    </>
  )
}
