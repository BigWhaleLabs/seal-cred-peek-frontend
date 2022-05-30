import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import { getAddressesToMerkleRoot } from '@big-whale-labs/frontend-utils'
import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (sealCredLedger: SealCredLedger) {
  const addressToMerkleRoot = await getAddressesToMerkleRoot(sealCredLedger)

  const ledger = {} as Ledger

  for (const tokenAddress in addressToMerkleRoot) {
    ledger[tokenAddress] = await getLedgerRecord(
      sealCredLedger,
      tokenAddress,
      addressToMerkleRoot[tokenAddress]
    )
  }
  return ledger
}
