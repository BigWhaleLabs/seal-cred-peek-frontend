import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import SealCredStore from 'stores/SealCredStore'
import getMerkleRoot from 'helpers/getMerkleRoot'

const root = wordBreak('break-all')

export default function ({ address }: { address: string }) {
  const { ledger, originalContractsToOwnersMaps } = useSnapshot(SealCredStore)

  const tokenToOwnerMap = originalContractsToOwnersMaps[address]
  const ledgerMerkleRoot = ledger[address].merkleRoot
  const realMerkleRoot = getMerkleRoot(
    Array.from(new Set(Object.values(tokenToOwnerMap)))
  )

  return (
    <span className={root}>
      <BodyText>Ledger merkle root: {ledgerMerkleRoot}</BodyText>
      <BodyText>
        {!!ledgerMerkleRoot &&
          !!realMerkleRoot &&
          (ledgerMerkleRoot === realMerkleRoot ? '✅' : '❌')}{' '}
        Real merkle root: {realMerkleRoot}
      </BodyText>
    </span>
  )
}
