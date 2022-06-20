import { derive } from 'valtio/utils'
import SealCredStore from 'stores/SealCredStore'

export default derive({
  originalCount: async (get) => {
    const state = get(SealCredStore)
    const original: { [address: string]: number } = {}
    for (const address in state.originalContractsCount) {
      original[address] = Object.values(
        (await state.originalContractsCount[address]) ?? {}
      ).reduce((total, value) => total + value, 0)
    }
    return original
  },
  derivativeCount: async (get) => {
    const state = get(SealCredStore)
    const derivative: { [address: string]: number } = {}
    for (const address in state.derivativeContractsCount) {
      derivative[address] = Object.values(
        (await state.derivativeContractsCount[address]) ?? {}
      ).reduce((total, value) => total + value, 0)
    }
    return derivative
  },
  originalCountByBatch: async (get) => {
    const state = get(SealCredStore)
    const original: { [address: string]: { [batchNumber: string]: number } } =
      {}
    for (const address in state.originalContractsCount) {
      original[address] = await state.originalContractsCount[address]
    }
    return original
  },
  derivativeCountByBatch: async (get) => {
    const state = get(SealCredStore)
    const derivative: { [address: string]: { [batchNumber: string]: number } } =
      {}
    for (const address in state.derivativeContractsCount) {
      derivative[address] = await state.derivativeContractsCount[address]
    }
    return derivative
  },
})
