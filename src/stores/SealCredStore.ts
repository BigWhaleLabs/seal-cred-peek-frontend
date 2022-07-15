import { BigNumber, utils } from 'ethers'
import {
  SCERC721Derivative,
  SCEmailDerivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

import { derive } from 'valtio/utils'
import {
  externalSCERC721LedgerContract,
  sCERC721LedgerContract,
  sCEmailLedgerContract,
} from 'helpers/ledgerContracts'
import { goerliProvider } from 'helpers/providers'
import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import getContractCount from 'helpers/getContractCount'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'

interface SealCredStoreType {
  externalERC721Ledger: Promise<Ledger>
  eRC721Ledger: Promise<Ledger>
  emailLedger: Promise<Ledger>
  contractsToCount: { [contract: string]: Promise<BigNumber> | undefined }
}
interface ReverseSealCredStoreType {
  reverseExternalERC721Ledger: Promise<Ledger>
  reverseERC721Ledger: Promise<Ledger>
  reverseEmailLedger: Promise<Ledger>
}

async function fetchContractCountAtLedger(ledgerPromise: Promise<Ledger>) {
  const ledger = await ledgerPromise
  for (const { derivativeContract } of Object.values(ledger)) {
    fetchContractCount(derivativeContract)
    addDerivativeListener(derivativeContract)
  }
  return ledger
}

const SealCredStore = proxy<SealCredStoreType>({
  externalERC721Ledger: fetchContractCountAtLedger(
    getLedger(externalSCERC721LedgerContract)
  ),
  eRC721Ledger: fetchContractCountAtLedger(getLedger(sCERC721LedgerContract)),
  emailLedger: fetchContractCountAtLedger(getLedger(sCEmailLedgerContract)),
  contractsToCount: {},
})
const ReversedSealCredStore = derive<
  SealCredStoreType,
  ReverseSealCredStoreType
>({
  reverseExternalERC721Ledger: async (get) => {
    const ledger = await get(SealCredStore).externalERC721Ledger
    return !ledger
      ? {}
      : Object.values(ledger).reduce(
          (p, c) => ({
            ...p,
            [c.derivativeContract.address]: c,
          }),
          {} as Ledger
        )
  },
  reverseERC721Ledger: async (get) => {
    const ledger = await get(SealCredStore).eRC721Ledger
    return !ledger
      ? {}
      : Object.values(ledger).reduce(
          (p, c) => ({
            ...p,
            [c.derivativeContract.address]: c,
          }),
          {} as Ledger
        )
  },
  reverseEmailLedger: async (get) => {
    const ledger = await get(SealCredStore).emailLedger
    return !ledger
      ? {}
      : Object.values(ledger).reduce(
          (p, c) => ({
            ...p,
            [c.derivativeContract.address]: c,
          }),
          {} as Ledger
        )
  },
})

function fetchContractCount(contract: SCERC721Derivative | SCEmailDerivative) {
  SealCredStore.contractsToCount[contract.address] = getContractCount(contract)
}

function addDerivativeListener(
  derivativeContract: SCERC721Derivative | SCEmailDerivative
) {
  if (!derivativeContract.filters.Transfer().topics) {
    throw new Error(
      `No topics for derivative contract ${derivativeContract.address}`
    )
  }
}

goerliProvider.on(
  {
    topics: [utils.id('Transfer(address,address,uint256)')],
  },
  async (event) => {
    const { address } = event
    const externalERC721Ledger =
      await ReversedSealCredStore.reverseExternalERC721Ledger
    const eRC721Ledger = await ReversedSealCredStore.reverseERC721Ledger
    const emailLedger = await ReversedSealCredStore.reverseEmailLedger
    const derivative =
      externalERC721Ledger[address] ||
      eRC721Ledger[address] ||
      emailLedger[address]
    if (derivative) {
      SealCredStore.contractsToCount[address] = getContractCount(
        derivative.derivativeContract
      )
    }
  }
)

// Setup ledger listeners
sCERC721LedgerContract.on(
  sCERC721LedgerContract.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    const ledger = await SealCredStore.eRC721Ledger
    const record = getLedgerRecord(originalContract, derivativeContract)
    ledger[originalContract] = record
    fetchContractCount(record.derivativeContract)
    addDerivativeListener(record.derivativeContract)
  }
)
sCERC721LedgerContract.on(
  sCERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.eRC721Ledger
    const record = ledger[originalContract]
    if (record) {
      delete ledger[originalContract]
      delete SealCredStore.contractsToCount[record.derivativeContract.address]
    }
  }
)
externalSCERC721LedgerContract.on(
  externalSCERC721LedgerContract.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    const ledger = await SealCredStore.eRC721Ledger
    const record = getLedgerRecord(originalContract, derivativeContract)
    ledger[originalContract] = record
    fetchContractCount(record.derivativeContract)
    addDerivativeListener(record.derivativeContract)
  }
)
externalSCERC721LedgerContract.on(
  externalSCERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.eRC721Ledger
    const record = ledger[originalContract]
    if (record) {
      delete ledger[originalContract]
      delete SealCredStore.contractsToCount[record.derivativeContract.address]
    }
  }
)
sCEmailLedgerContract.on(
  sCEmailLedgerContract.filters.CreateDerivativeContract(),
  async (email, derivativeContract) => {
    const ledger = await SealCredStore.emailLedger
    const record = await getLedgerRecord(email, derivativeContract)
    ledger[email] = record
    fetchContractCount(record.derivativeContract)
    addDerivativeListener(record.derivativeContract)
  }
)
sCEmailLedgerContract.on(
  sCEmailLedgerContract.filters.DeleteEmail(),
  async (email) => {
    const ledger = await SealCredStore.emailLedger
    const record = ledger[email]
    if (record) {
      delete ledger[email]
      delete SealCredStore.contractsToCount[record.derivativeContract.address]
    }
  }
)

export default SealCredStore
