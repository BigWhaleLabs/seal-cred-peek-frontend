import { derive } from 'valtio/utils'
import SealCredStore from 'stores/SealCredStore'

export default derive({
  originalCount: async (get) => {
    const state = get(SealCredStore)
    const original: { [address: string]: number } = {}
    for (const address in state.originalContractsToOwnersMaps) {
      const originalContractsToOwnersOfAddress = await state
        .originalContractsToOwnersMaps[address]

      original[address] = originalContractsToOwnersOfAddress
        ? Object.keys(originalContractsToOwnersOfAddress).length
        : 0
    }
    return original
  },
  derivativeCount: async (get) => {
    const state = get(SealCredStore)
    const derivative: { [address: string]: number } = {}
    for (const address in state.derivativeContractsToOwnersMaps) {
      const derivativeContractsToOwnersOfAddress = await state
        .derivativeContractsToOwnersMaps[address]

      derivative[address] = derivativeContractsToOwnersOfAddress
        ? Object.keys(derivativeContractsToOwnersOfAddress).length
        : 0
    }
    return derivative
  },
})
