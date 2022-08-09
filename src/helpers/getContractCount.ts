import { Derivative } from '@big-whale-labs/seal-cred-ledger-contract'

export default async function getContractCount(contract: Derivative) {
  return (await contract.currentTokenId()).toNumber()
}
