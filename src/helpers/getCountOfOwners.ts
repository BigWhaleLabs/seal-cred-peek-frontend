import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'

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

const transferEventInterface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
])

const sig = 'Transfer(address,address,uint256)'

async function getResult(
  contract: ERC721 | SCERC721Derivative,
  from: number,
  to: number,
  result: { [blockNumber: string]: number }
) {
  const events = await defaultProvider.getLogs({
    address: contract.address,
    fromBlock: from,
    toBlock: to,
    topics: [utils.id(sig), null],
  })
  return events
    .map(({ data, topics, blockNumber }) => {
      return {
        ...transferEventInterface.parseLog({ data, topics }),
        blockNumber,
      }
    })
    .reduce((total, { args: { from }, blockNumber }) => {
      return from === '0x0000000000000000000000000000000000000000'
        ? {
            ...total,
            [getBatchKey(blockNumber)]:
              (total[getBatchKey(blockNumber)] ?? 0) + 1,
          }
        : total
    }, result)
}

async function optimizedLoad(
  contract: ERC721 | SCERC721Derivative,
  from: number,
  to: number,
  result: { [blockNumber: string]: number }
) {
  try {
    result = await getResult(contract, from, to, result)
  } catch (e) {
    console.log('requet error', e, from, to, contract.address)
    const half = from + Math.floor((to - from) / 2)
    result = await optimizedLoad(contract, from, half, result)
    result = await optimizedLoad(contract, half + 1, to, result)
  }
  return result
}

export function getCountOfOwners(
  contract: ERC721 | SCERC721Derivative,
  blockNumber: number
) {
  return optimizedLoad(contract, 0, blockNumber, {})
}
