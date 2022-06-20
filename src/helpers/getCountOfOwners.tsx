import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default async function (contract: ERC721 | SCERC721Derivative) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter)
  return events.reduce(
    (total, { args: { from } }) =>
      from === '0x0000000000000000000000000000000000000000' ? total + 1 : total,
    0
  )
}
