import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

const rounder = 50

export function getBatchKey(blockNumber: number) {
  return blockNumber - (blockNumber % rounder)
}

export function* latestBlockKeys(blockNumber: number, n: number) {
  let start = getBatchKey(blockNumber - n * rounder)
  for (let i = 0; i < n; i += 1) {
    yield start
    start += rounder
  }
}

export async function getCountOfOwners(contract: ERC721 | SCERC721Derivative) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter)
  return events.reduce(
    (total, { args: { from }, blockNumber }) =>
      from === '0x0000000000000000000000000000000000000000'
        ? {
            ...total,
            [getBatchKey(blockNumber)]:
              (total[getBatchKey(blockNumber)] ?? 0) + 1,
          }
        : total,
    {} as { [blockNumber: string]: number }
  )
}
