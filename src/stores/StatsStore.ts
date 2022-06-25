import { derive } from 'valtio/utils'
import SealCredStore from 'stores/SealCredStore'

export default derive({
  originalCount: (get) => {
    const originalContractsCount = get(SealCredStore).originalContractsCount
    const original: { [address: string]: number } = {}
    for (const address in originalContractsCount) {
      original[address] = Object.values(
        originalContractsCount[address] ?? {}
      ).reduce((total, value) => total + value, 0)
    }
    return original
  },
  derivativeCount: (get) => {
    const derivativeContractsCount = get(SealCredStore).derivativeContractsCount
    const derivative: { [address: string]: number } = {}
    for (const address in derivativeContractsCount) {
      derivative[address] = Object.values(
        derivativeContractsCount[address] ?? {}
      ).reduce((total, value) => total + value, 0)
    }
    return derivative
  },
  originalCountByBatch: (get) => {
    const originalContractsCount = get(SealCredStore).originalContractsCount
    const original: { [address: string]: { [batchNumber: string]: number } } =
      {}
    for (const address in originalContractsCount) {
      original[address] = originalContractsCount[address]
    }
    return original
  },
  derivativeCountByBatch: (get) => {
    const derivativeContractsCount = get(SealCredStore).derivativeContractsCount
    const derivative: { [address: string]: { [batchNumber: string]: number } } =
      {}
    for (const address in derivativeContractsCount) {
      derivative[address] = derivativeContractsCount[address]
    }
    return derivative
  },
})
