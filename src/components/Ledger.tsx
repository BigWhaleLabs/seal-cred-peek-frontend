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
  network,
  variableName,
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
            key={contractOrEmail}
            network={network}
            originalAddressOrEmail={contractOrEmail}
            derivativeAddress={
              ledger[contractOrEmail].derivativeContract.address
            }
          />
        ))}
    </>
  )
}

function LedgerSuspender({
  network,
  variableName,
}: {
  variableName: string
  network: Network
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LedgerComponent network={network} variableName={variableName} />
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
            <LedgerSuspender network={network} variableName={variableName} />
          </>
        )
      )}
    </>
  )
}
