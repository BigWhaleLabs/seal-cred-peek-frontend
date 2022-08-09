import { BodyText, SubheaderText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Contract from 'components/Contract'
import Loading from 'components/Loading'
import Network from 'models/Network'
import SealCredStore from 'stores/SealCredStore'
import ledgerContracts from 'helpers/data/ledgerContracts'

function LedgerComponent({
  variableName,
  network,
}: {
  variableName: string
  network: Network
}) {
  const ledger = useSnapshot(SealCredStore.ledgers)[variableName]
  const [showing, setShowing] = useState(false)

  return (
    <>
      <BodyText>Contract count: {Object.keys(ledger).length}</BodyText>

      <BodyText>
        <Button
          onClick={() => {
            setShowing(!showing)
          }}
        >
          {showing ? 'Hide the list' : 'Show the list (can be slow)'}
        </Button>
      </BodyText>
      {showing &&
        Object.keys(ledger).map((contractOrEmail) => (
          <Contract
            originalAddressOrEmail={contractOrEmail}
            derivativeAddress={
              ledger[contractOrEmail].derivativeContract.address
            }
            key={contractOrEmail}
            network={network}
          />
        ))}
    </>
  )
}

function LedgerSuspender({
  variableName,
  network,
}: {
  variableName: string
  network: Network
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LedgerComponent variableName={variableName} network={network} />
      </Suspense>
    </>
  )
}

export default function () {
  return (
    <>
      {Object.entries(ledgerContracts).map(
        ([variableName, { name, network }]) => (
          <>
            <SubheaderText>{name}</SubheaderText>
            <LedgerSuspender variableName={variableName} network={network} />
          </>
        )
      )}
    </>
  )
}
