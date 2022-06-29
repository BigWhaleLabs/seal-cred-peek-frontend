import { BodyText, HeaderText, Link, SubheaderText } from 'components/Text'
import ContractAddress from 'components/ContractAddress'
import Ledger from 'components/Ledger'
import MintedCount from 'components/MintedCount'
import SuspenseWithError from 'components/SuspenseWithError'

export default function () {
  return (
    <>
      <HeaderText>SealCred state</HeaderText>
      <ContractAddress />
      <SubheaderText>Total minted:</SubheaderText>
      <MintedCount />
      <SuspenseWithError error="Error fetching ledger!">
        <Ledger />
      </SuspenseWithError>
      <SubheaderText>Previous versions snapshots:</SubheaderText>
      <BodyText>
        <Link url="https://goerli.etherscan.io/address/0xEB0cB50a5C12B376aaf555E72FE06a6ECA154292">
          SealCredLedger (v0.1)
        </Link>{' '}
        — minted 18,591 derivative tokens
      </BodyText>
    </>
  )
}
