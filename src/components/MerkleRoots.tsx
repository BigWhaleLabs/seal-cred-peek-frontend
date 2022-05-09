import { BodyText } from 'components/Text'
import { useEffect, useState } from 'react'
import { wordBreak } from 'classnames/tailwind'
import getMerkleRoot from 'helpers/getMerkleRoot'
import getOwners from 'helpers/getOwners'
import sealCred from 'helpers/sealCred'

const root = wordBreak('break-all')

export default function MerkleRoots({ address }: { address: string }) {
  const [ledgerLoading, setLedgerLoading] = useState(true)
  const [ledgerRoot, setLedgerRoot] = useState<string | undefined>()
  const [ledgerError, setLedgerError] = useState<Error | undefined>()

  const [realLoading, setRealLoading] = useState(true)
  const [realRoot, setRealRoot] = useState<string | undefined>()
  const [realError, setRealError] = useState<Error | undefined>()

  useEffect(() => {
    async function fetchLedgerRoot() {
      setLedgerLoading(true)
      try {
        const merkleRoot = await sealCred.getRoot(address)
        setLedgerRoot(merkleRoot)
      } catch (error) {
        if (error instanceof Error) {
          setLedgerError(error)
        }
        console.error(error)
      } finally {
        setLedgerLoading(false)
      }
    }

    async function fetchRealRoot() {
      setRealLoading(true)
      try {
        const owners = await getOwners(address)
        if (!owners.length) {
          setRealRoot('No owners found')
        } else {
          setRealRoot(getMerkleRoot(owners))
        }
      } catch (error) {
        if (error instanceof Error) {
          setRealError(error)
        }
        console.error(error)
      } finally {
        setRealLoading(false)
      }
    }

    void fetchLedgerRoot()
    void fetchRealRoot()
  }, [address])

  return (
    <>
      <BodyText>
        Ledger merkle root:{' '}
        <span className={root}>
          {ledgerLoading
            ? 'Loading...'
            : ledgerError
            ? ledgerError.message
            : ledgerRoot}
        </span>
      </BodyText>
      <BodyText>
        {!!ledgerRoot && !!realRoot && (ledgerRoot === realRoot ? '✅' : '❌')}{' '}
        Real merkle root:{' '}
        <span className={root}>
          {realLoading
            ? 'Loading...'
            : realError
            ? realError.message
            : realRoot}
        </span>
      </BodyText>
    </>
  )
}
