import { BodyText, Link, SubheaderText } from 'components/Text'
import ContractAddress from 'components/ContractAddress'
import Ledger from 'components/Ledger'
import MintedCount from 'components/MintedCount'
import PageTitle from 'components/PageTitle'
import SuspenseWithError from 'components/SuspenseWithError'
import formatNumber from 'helpers/formatNumber'
import previousData from 'helpers/data/previousData'

export default function () {
  return (
    <>
      <PageTitle title="SealCred state" />
      <ContractAddress />
      <SubheaderText>Total counts:</SubheaderText>
      <MintedCount />
      <SuspenseWithError error="Error fetching ledger">
        <Ledger />
      </SuspenseWithError>
      <SubheaderText>Previous versions snapshots:</SubheaderText>
      {previousData.map(({ version, count, ledgers }) => (
        <BodyText key={version}>
          v{version} (
          {Object.entries(ledgers).map(([ledgerName, address], i) => (
            <span key={address}>
              {i > 0 ? ', ' : ''}
              <Link url={`https://goerli.etherscan.io/address/${address}`}>
                {ledgerName}
              </Link>
            </span>
          ))}
          ) — minted {formatNumber(count)} derivative tokens
        </BodyText>
      ))}
    </>
  )
}
