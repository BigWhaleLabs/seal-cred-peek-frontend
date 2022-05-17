import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Contract from 'components/Contract'
import SealCredStore from 'stores/SealCredStore'

export default function Ledger() {
  const { ledger } = useSnapshot(SealCredStore)
  const contracts = Object.keys(ledger)
  return !contracts.length ? (
    <BodyText>No contracts added yet</BodyText>
  ) : (
    <>
      {contracts.map((contract) => (
        <Contract
          originalAddress={contract}
          derivativeAddress={ledger[contract].derivativeContract.address}
          key={contract}
        />
      ))}
    </>
  )
}
