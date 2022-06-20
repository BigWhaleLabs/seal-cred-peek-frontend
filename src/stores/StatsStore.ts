import { derive } from 'valtio/utils'
import SealCredStore from 'stores/SealCredStore'

export default derive({
  originalCount: async (get) => {
    const state = get(SealCredStore)
    const original: { [address: string]: number } = {}
    for (const address in state.originalContractsCount) {
      original[address] = (await state.originalContractsCount[address]) ?? 0
    }
    return original
  },
  derivativeCount: async (get) => {
    const state = get(SealCredStore)
    const derivative: { [address: string]: number } = {}
    for (const address in state.derivativeContractsCount) {
      derivative[address] = (await state.derivativeContractsCount[address]) ?? 0
    }
    return derivative
  },
})
