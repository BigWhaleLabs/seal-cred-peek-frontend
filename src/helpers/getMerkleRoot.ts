import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { utils } from 'ethers'
import poseidon from 'poseidon/poseidon.js'

export default function (addresses: string[]) {
  const tree = new IncrementalMerkleTree(poseidon, 20, BigInt(0), 2)
  for (const address of addresses) {
    tree.insert(BigInt(address))
  }
  return utils.hexZeroPad(`0x${tree.root.toString(16)}`, 32)
}
