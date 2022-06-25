import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { latestBlockKeys } from 'helpers/getCountOfOwners'
import { useSnapshot } from 'valtio'
import ContractNamesStore from 'stores/ContractNamesStore'
import Loading from 'components/Loading'
import SealCredStore from 'stores/SealCredStore'
import StatsStore from 'stores/StatsStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  animation: {
    duration: 0,
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

function useData() {
  const { contractNames } = useSnapshot(ContractNamesStore)
  const { blockNumber, ledger } = useSnapshot(SealCredStore)
  const { derivativeCountByBatch, derivativeCount } = useSnapshot(StatsStore)

  const loadedContracts = Object.keys(derivativeCount).length
  const totalCount = Object.keys(ledger).length

  if (loadedContracts < totalCount) return null

  const mostMinted = Object.entries(derivativeCount)
    .sort((leftCount, rightCount) => rightCount[1] - leftCount[1])
    .slice(0, 9)
    .map(([key]) => key)

  const blockIds = Array.from(latestBlockKeys(blockNumber, 200))
  const backgroundColors = [
    '#d7a1f8',
    '#cd8cf8',
    '#c575f6',
    '#bc61f6',
    '#b24af3',
    '#a01ff1',
    '#9316e0',
    '#880ed3',
    '#7821b1',
  ]

  const names = {
    ...contractNames,
  }

  return {
    labels: blockIds,
    datasets: Object.entries(derivativeCountByBatch)
      .filter(([key]) => mostMinted.includes(key))
      .map(([address, block], index) => ({
        label: names[address] || address,
        data: blockIds.map((blockId) => block[blockId]),
        backgroundColor: backgroundColors[index],
      })),
  }
}

export default function Stats() {
  const data = useData()
  if (!data) return <Loading />
  return <Bar options={options} data={data} />
}
