import { BodyText, SubheaderText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Contract from 'components/Contract'
import Ledger from 'models/Ledger'
import Loading from 'components/Loading'
import Network from 'models/Network'
import SealCredStore from 'stores/SealCredStore'

enum LedgerType {
  SCERC721 = 'SCERC721',
  ExternalSCERC721 = 'ExternalSCERC721',
  SCEmail = 'SCEmail',
}

function LedgerComponent({
  type,
  network,
}: {
  type: LedgerType
  network: Network
}) {
  let ledger: Ledger
  switch (type) {
    case LedgerType.SCERC721: {
      const { eRC721Ledger } = useSnapshot(SealCredStore)
      ledger = eRC721Ledger as unknown as Ledger
      break
    }
    case LedgerType.ExternalSCERC721: {
      const { externalERC721Ledger } = useSnapshot(SealCredStore)
      ledger = externalERC721Ledger as unknown as Ledger
      break
    }
    case LedgerType.SCEmail: {
      const { emailLedger } = useSnapshot(SealCredStore)
      ledger = emailLedger as unknown as Ledger
      break
    }
  }
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
  type,
  network,
}: {
  type: LedgerType
  network: Network
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LedgerComponent type={type} network={network} />
      </Suspense>
    </>
  )
}

export default function () {
  return (
    <>
      <SubheaderText>Mainnet ERC721 Ledger:</SubheaderText>
      <LedgerSuspender
        type={LedgerType.ExternalSCERC721}
        network={Network.Mainnet}
      />
      <SubheaderText>Goerli ERC721 Ledger:</SubheaderText>
      <LedgerSuspender type={LedgerType.SCERC721} network={Network.Goerli} />
      <SubheaderText>Email Ledger:</SubheaderText>
      <LedgerSuspender type={LedgerType.SCEmail} network={Network.Goerli} />
    </>
  )
}
