import { derive } from 'valtio/utils'
import SealCredStore from 'stores/SealCredStore'

export default derive({
  originalCount: async (get) => {
    const state = get(SealCredStore)

    const original: { [address: string]: number } = {}

    for (const address in state.originalContractsToOwnersMaps) {
      original[address] = Object.keys(
        await state.originalContractsToOwnersMaps[address]
      ).length
    }

    return original
  },
  derivativeCount: async (get) => {
    const state = get(SealCredStore)

    const derivative: { [address: string]: number } = {}

    for (const address in state.derivativeContractsToOwnersMaps) {
      derivative[address] = Object.keys(
        await state.derivativeContractsToOwnersMaps[address]
      ).length
    }

    return derivative
  },
})
