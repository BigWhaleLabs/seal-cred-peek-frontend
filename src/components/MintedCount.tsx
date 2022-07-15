import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'
import SuspenseWithError from 'components/SuspenseWithError'
import formatNumber from 'helpers/formatNumber'
import mintedBefore from 'helpers/mintedBefore'

function ContractCount() {
  const { externalERC721Ledger, eRC721Ledger, emailLedger } =
    useSnapshot(SealCredStore)
  return (
    <>
      <BodyText>
        Total contracts:{' '}
        {Object.keys(externalERC721Ledger).length +
          Object.keys(eRC721Ledger || {}).length +
          Object.keys(emailLedger || {}).length}
      </BodyText>
    </>
  )
}

function MintedCount() {
  const { externalERC721Ledger, eRC721Ledger, emailLedger } =
    useSnapshot(SealCredStore)
  const { contractsToCount } = useSnapshot(SealCredStore)
  let erc721Count = 0
  for (const {
    derivativeContract: { address },
  } of [...Object.values(externalERC721Ledger || {})]) {
    erc721Count += contractsToCount[address]?.toNumber() || 0
  }
  let externalErc721Count = 0
  for (const {
    derivativeContract: { address },
  } of [...Object.values(eRC721Ledger || {})]) {
    externalErc721Count += contractsToCount[address]?.toNumber() || 0
  }
  let emailCount = 0
  for (const {
    derivativeContract: { address },
  } of [...Object.values(emailLedger || {})]) {
    emailCount += contractsToCount[address]?.toNumber() || 0
  }
  const totalCount = erc721Count + emailCount + externalErc721Count
  const mintedBeforeCount = mintedBefore['v0.1'] + mintedBefore['v0.2']
  return totalCount === 0 ? (
    <Loading text="Loading count..." />
  ) : (
    <>
      <BodyText>Total: {formatNumber(totalCount)}</BodyText>
      <BodyText>
        Total Mainnet ERC721: {formatNumber(externalErc721Count)}
      </BodyText>
      <BodyText>Total Goerli ERC721: {formatNumber(erc721Count)}</BodyText>
      <BodyText>Total email: {formatNumber(emailCount)}</BodyText>
      <BodyText>
        Total previous versions: {formatNumber(mintedBeforeCount)}
      </BodyText>
      <BodyText>
        Total all time and all versions:{' '}
        {formatNumber(totalCount + mintedBeforeCount)}
      </BodyText>
    </>
  )
}

export default function () {
  return (
    <div>
      <SuspenseWithError
        fallback={<Loading text="Loading contract count..." />}
        error="Error loading contract count"
      >
        <ContractCount />
      </SuspenseWithError>
      <SuspenseWithError
        fallback={<Loading text="Loading minted count..." />}
        error="Error loading minted count"
      >
        <MintedCount />
      </SuspenseWithError>
    </div>
  )
}
