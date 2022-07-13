import { BigNumber } from 'ethers'
import { SCERC721LedgerModel, SCEmailLedgerModel } from 'models/Ledger'
import { SCERC721LedgerRecord, SCEmailLedgerRecord } from 'models/LedgerRecord'
import {
  externalSCERC721Ledger,
  sCERC721Ledger,
  sCEmailLedger,
} from 'helpers/ledgerContracts'
import {
  getERC721Ledger,
  getEmailLedger,
  getExternalERC721Ledger,
} from 'helpers/getLedger'
import {
  getERC721LedgerRecord,
  getEmailLedgerRecord,
} from 'helpers/getLedgerRecord'
import { proxy } from 'valtio'
import getContractCount from 'helpers/getContractCount'

interface SealCredStoreType {
  externalSCERC721Ledger: Promise<SCERC721LedgerModel>
  sCERC721Ledger: Promise<SCERC721LedgerModel>
  sCEmailLedger: Promise<SCEmailLedgerModel>
  contractsToCount: { [contract: string]: Promise<BigNumber> }
}

const SealCredStore = proxy<SealCredStoreType>({
  externalSCERC721Ledger: getExternalERC721Ledger(externalSCERC721Ledger).then(
    (ledger) => {
      Object.values(ledger).forEach((record) => {
        SealCredStore.contractsToCount[record.derivativeContract.address] =
          getContractCount(record.derivativeContract)
        addListenersToERC721LedgerRecord(record)
      })
      return ledger
    }
  ),
  sCERC721Ledger: getERC721Ledger(sCERC721Ledger).then((ledger) => {
    Object.values(ledger).forEach((record) => {
      SealCredStore.contractsToCount[record.derivativeContract.address] =
        getContractCount(record.derivativeContract)
      addListenersToERC721LedgerRecord(record)
    })
    return ledger
  }),
  sCEmailLedger: getEmailLedger(sCEmailLedger).then((ledger) => {
    Object.values(ledger).forEach((record) => {
      SealCredStore.contractsToCount[record.derivativeContract.address] =
        getContractCount(record.derivativeContract)
      addListenersToEmailLedgerRecord(record)
    })
    return ledger
  }),
  contractsToCount: {},
})

function addListenersToERC721LedgerRecord({
  derivativeContract,
}: SCERC721LedgerRecord) {
  derivativeContract.on(derivativeContract.filters.Transfer(), () => {
    SealCredStore.contractsToCount[derivativeContract.address] =
      getContractCount(derivativeContract)
  })
}

function addListenersToEmailLedgerRecord({
  derivativeContract,
}: SCEmailLedgerRecord) {
  derivativeContract.on(derivativeContract.filters.Transfer(), () => {
    SealCredStore.contractsToCount[derivativeContract.address] =
      getContractCount(derivativeContract)
  })
}

sCERC721Ledger.on(
  sCERC721Ledger.filters.CreateDerivativeContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.sCERC721Ledger
    if (!ledger[originalContract]) {
      const record = await getERC721LedgerRecord(
        sCERC721Ledger,
        originalContract
      )
      ledger[originalContract] = record
      addListenersToERC721LedgerRecord(record)
    }
  }
)
sCEmailLedger.on(sCEmailLedger.filters.DeleteEmail(), async (email) => {
  const ledger = await SealCredStore.sCEmailLedger
  ledger[email]?.originalContract.removeAllListeners()
  ledger[email]?.derivativeContract.removeAllListeners()
  delete ledger[email]
})
sCEmailLedger.on(
  sCERC721Ledger.filters.CreateDerivativeContract(),
  async (email) => {
    const ledger = await SealCredStore.sCEmailLedger
    if (!ledger[email]) {
      const record = await getEmailLedgerRecord(sCEmailLedger, email)
      ledger[email] = record
      addListenersToEmailLedgerRecord(record)
    }
  }
)
sCEmailLedger.on(sCEmailLedger.filters.DeleteEmail(), async (email) => {
  const ledger = await SealCredStore.sCERC721Ledger
  ledger[email]?.originalContract.removeAllListeners()
  ledger[email]?.derivativeContract.removeAllListeners()
  delete ledger[email]
})

export default SealCredStore
