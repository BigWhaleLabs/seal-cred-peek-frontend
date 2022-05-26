import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getAllEvents from 'helpers/getAllEvents'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (sealCredLedger: SealCredLedger) {
  const { events, deleteTopic } = await getAllEvents(sealCredLedger)

  const ledger = {} as Ledger
  const addressToMerkle: { [address: string]: string } = {}

  for (const event of events) {
    const {
      args: { tokenAddress, merkleRoot },
      topic,
    } = event

    if (topic === deleteTopic) {
      delete addressToMerkle[tokenAddress]
      continue
    }
    addressToMerkle[tokenAddress] = merkleRoot
  }

  for (const tokenAddress in addressToMerkle) {
    ledger[tokenAddress] = await getLedgerRecord(
      sealCredLedger,
      tokenAddress,
      addressToMerkle[tokenAddress]
    )
  }
  return ledger
}
