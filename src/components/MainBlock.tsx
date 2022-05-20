import { HeaderText, SubheaderText } from 'components/Text'
import AddAddresses from 'components/AddAddresses'
import ContractAddress from 'components/ContractAddress'
import DeleteAddresses from 'components/DeleteAddresses'
import Ledger from 'components/Ledger'
import MintedCount from 'components/MintedCount'
import SuspenseWithError from 'components/SuspenseWithError'

export default function () {
  return (
    <>
      <HeaderText>SealCred admin panel</HeaderText>
      <SuspenseWithError error="Error fetching contract address!">
        <ContractAddress />
      </SuspenseWithError>
      <AddAddresses />
      <DeleteAddresses />
      <SubheaderText>Ledger:</SubheaderText>
      <SuspenseWithError error="Error fetching ledger!">
        <Ledger />
      </SuspenseWithError>
      <SubheaderText>Total minted:</SubheaderText>
      <MintedCount />
    </>
  )
}
