import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SealCredLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'types/Ledger'
import defaultProvider from 'helpers/defaultProvider'
import queryBlockLimit from 'helpers/queryBlockLimit'

export async function getLedgerRecord(
  sealCredLedger: SealCredLedger,
  tokenAddress: string,
  merkleRoot: string
) {
  return {
    merkleRoot,
    originalContract: ERC721__factory.connect(tokenAddress, defaultProvider),
    derivativeContract: SCERC721Derivative__factory.connect(
      await sealCredLedger.getDerivativeAddress(tokenAddress),
      defaultProvider
    ),
  }
}

export default async function getLedger(sealCredLedger: SealCredLedger) {
  const eventsFilter = sealCredLedger.filters.SetMerkleRoot()
  const events = await sealCredLedger.queryFilter(eventsFilter, queryBlockLimit)
  const ledger = {} as Ledger
  for (const event of events) {
    const { tokenAddress } = event.args
    const merkleRoot = event.args.merkleRoot
    ledger[tokenAddress] = await getLedgerRecord(
      sealCredLedger,
      tokenAddress,
      merkleRoot
    )
  }
  return ledger
}
