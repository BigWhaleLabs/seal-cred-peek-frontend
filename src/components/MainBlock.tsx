import { HeaderText, SubheaderText } from 'components/Text'
import ContractAddress from 'components/ContractAddress'
import Ledger from 'components/Ledger'
import MintedCount from 'components/MintedCount'
import SuspenseWithError from 'components/SuspenseWithError'

export default function () {
  return (
    <>
      <HeaderText>SealCred admin panel</HeaderText>
      <ContractAddress />
      <SubheaderText>Ledger:</SubheaderText>
      <SuspenseWithError error="Error fetching ledger!">
        <Ledger />
      </SuspenseWithError>
      <SubheaderText>Total minted:</SubheaderText>
      <MintedCount />
    </>
  )
}
