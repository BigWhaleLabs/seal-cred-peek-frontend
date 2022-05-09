import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Contract from 'components/Contract'
import data from 'helpers/data'

export default function Ledger() {
  const { ledger } = useSnapshot(data)
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
