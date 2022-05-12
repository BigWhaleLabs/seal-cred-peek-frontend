import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import defaultProvider from 'helpers/defaultProvider'
import queryBlockLimit from 'helpers/queryBlockLimit'

export default async function getOwners(address: string) {
  const contract = ERC721__factory.connect(address, defaultProvider)
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter, queryBlockLimit)
  const ownerMap = new Map<number, string>()
  for (const event of events) {
    if (!event.args) {
      continue
    }
    const { to, tokenId } = event.args
    if (to) {
      ownerMap.set(tokenId.toNumber(), to)
    }
  }
  return Array.from(new Set(ownerMap.values()))
}
