import { SCERC721LedgerModel, SCEmailLedgerModel } from 'models/Ledger'
import { useSnapshot } from 'valtio'
import SealCredStoreDerive from 'stores/SealCredStore'

interface SealCredStoreTypeComputed {
  reverseExternalSCERC721Ledger: SCERC721LedgerModel
  reverseSCERC721Ledger: SCERC721LedgerModel
  reverseSCEmailLedger: SCEmailLedgerModel
}

export default function (): SealCredStoreTypeComputed {
  const { externalSCERC721Ledger, sCERC721Ledger, sCEmailLedger } =
    useSnapshot(SealCredStoreDerive)

  return {
    reverseExternalSCERC721Ledger: Object.values(externalSCERC721Ledger).reduce(
      (prev, { originalContract, derivativeContract }) => ({
        ...prev,
        [derivativeContract.address]: {
          originalContract,
          derivativeContract,
        },
      }),
      {}
    ),
    reverseSCERC721Ledger: Object.values(sCERC721Ledger).reduce(
      (prev, { originalContract, derivativeContract }) => ({
        ...prev,
        [derivativeContract.address]: {
          originalContract,
          derivativeContract,
        },
      }),
      {}
    ),
    reverseSCEmailLedger: Object.values(sCEmailLedger).reduce(
      (prev, { originalContract, derivativeContract }) => ({
        ...prev,
        [derivativeContract.address]: {
          originalContract,
          derivativeContract,
        },
      }),
      {}
    ),
  }
}
