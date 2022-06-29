import { HeaderText, SubheaderText } from 'components/Text'
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
    </>
  )
}
