import { BodyText, SubheaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Contract from 'components/Contract'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { reverseSCERC721Ledger } = useSnapshot(SealCredStore)
  const { reverseSCEmailLedger } = useSnapshot(SealCredStore)

  return (
    <>
      <SubheaderText>ERC721 Ledger:</SubheaderText>
      {reverseSCERC721Ledger ? (
        Object.keys(reverseSCERC721Ledger).length ? (
          Object.keys(reverseSCERC721Ledger).map((contract) => (
            <Contract
              originalAddress={
                reverseSCERC721Ledger[contract]?.originalContract.address
              }
              derivativeAddress={contract}
              key={contract}
            />
          ))
        ) : (
          <BodyText>No contracts added yet</BodyText>
        )
      ) : (
        <Loading />
      )}
      <SubheaderText>Email Ledger:</SubheaderText>
      {reverseSCEmailLedger ? (
        Object.keys(reverseSCEmailLedger).length ? (
          Object.keys(reverseSCEmailLedger).map((contract) => (
            <Contract
              email
              originalAddress={
                reverseSCEmailLedger[contract]?.originalContract.address
              }
              derivativeAddress={contract}
              key={contract}
            />
          ))
        ) : (
          <BodyText>No contracts added yet</BodyText>
        )
      ) : (
        <Loading />
      )}
    </>
  )
}
