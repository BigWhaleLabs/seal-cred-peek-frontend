import { BodyText, Link, SubheaderText } from 'components/Text'
import ContractAddress from 'components/ContractAddress'
import Ledger from 'components/Ledger'
import MintedCount from 'components/MintedCount'
import PageTitle from 'components/PageTitle'
import SuspenseWithError from 'components/SuspenseWithError'
import formatNumber from 'helpers/formatNumber'
import mintedBefore from 'helpers/mintedBefore'

export default function () {
  return (
    <>
      <PageTitle title="SealCred state" />
      <ContractAddress />
      <SubheaderText>Total minted derivatives:</SubheaderText>
      <MintedCount />
      <SuspenseWithError error="Error fetching ledger!">
        <Ledger />
      </SuspenseWithError>
      <SubheaderText>Previous versions snapshots:</SubheaderText>
      <BodyText>
        <Link url="https://goerli.etherscan.io/address/0xEB0cB50a5C12B376aaf555E72FE06a6ECA154292">
          SealCredLedger (v0.1)
        </Link>{' '}
        — minted {formatNumber(mintedBefore['v0.1'])} derivative tokens
      </BodyText>
      <BodyText>
        SealCredLedger (v0.2) (
        <Link url="https://goerli.etherscan.io/address/0x5AA6b79A8ea7c240c8DE59a83765AC984912A8f3">
          email
        </Link>
        ,{' '}
        <Link url="https://goerli.etherscan.io/address/0x23D23D705F00580852075add1149BF2db059512f">
          ERC721
        </Link>
        ) — minted {formatNumber(mintedBefore['v0.2'])} derivative tokens
      </BodyText>
    </>
  )
}
