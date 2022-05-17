import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'

function MintedCount() {
  const { ledger } = useSnapshot(SealCredStore)
  // const originalContractsMintedCount = Object.values(ledger)
  //   .map(
  //     (record) =>
  //       SealCredStore.originalContractsToOwnersMaps[
  //         record.originalContract.address
  //       ] || {}
  //   )
  //   .reduce((acc, curr) => acc + Object.keys(curr).length, 0)
  // const derivativeContractsMintedCount = Object.values(ledger)
  //   .map(
  //     (record) =>
  //       SealCredStore.derivativeContractsToOwnersMaps[
  //         record.derivativeContract.address
  //       ] || {}
  //   )
  //   .reduce((acc, curr) => acc + Object.keys(curr).length, 0)
  return (
    <>
      <BodyText>Total contracts: {Object.keys(ledger).length}</BodyText>
      {/* <BodyText>
        Original: {originalContractsMintedCount || 'Loading...'}
      </BodyText>
      <BodyText>
        Derivative: {derivativeContractsMintedCount || 'Loading...'}
      </BodyText>
      <BodyText>
        Total:{' '}
        {originalContractsMintedCount + derivativeContractsMintedCount ||
          'Loading...'}
      </BodyText> */}
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<Loading />}>
      <MintedCount />
    </Suspense>
  )
}
