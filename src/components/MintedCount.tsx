import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'
import formatNumber from 'helpers/formatNumber'
import mintedBefore from 'helpers/mintedBefore'

function ContractCount() {
  const { reverseSCERC721Ledger } = useSnapshot(SealCredStore)
  const { reverseSCEmailLedger } = useSnapshot(SealCredStore)
  return (
    <>
      <BodyText>
        Total contracts:{' '}
        {Object.keys(reverseSCERC721Ledger || {}).length +
          Object.keys(reverseSCEmailLedger || {}).length}
      </BodyText>
    </>
  )
}

function MintedCount() {
  const {
    reverseSCERC721Ledger,
    reverseExternalSCERC721Ledger,
    reverseSCEmailLedger,
  } = useSnapshot(SealCredStore)
  const { contractsToCount } = useSnapshot(SealCredStore)
  let erc721Count = 0
  for (const contract of [...Object.keys(reverseSCERC721Ledger || {})]) {
    erc721Count += contractsToCount[contract]?.toNumber() || 0
  }
  let externalErc721Count = 0
  for (const contract of [
    ...Object.keys(reverseExternalSCERC721Ledger || {}),
  ]) {
    externalErc721Count += contractsToCount[contract]?.toNumber() || 0
  }
  let emailCount = 0
  for (const contract of [...Object.keys(reverseSCEmailLedger || {})]) {
    emailCount += contractsToCount[contract]?.toNumber() || 0
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
      <Suspense fallback={<Loading text="Loading contract count..." />}>
        <ContractCount />
      </Suspense>
      <Suspense fallback={<Loading text="Loading count..." />}>
        <MintedCount />
      </Suspense>
    </div>
  )
}
