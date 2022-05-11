import { BodyText, Link } from 'components/Text'
import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { margin } from 'classnames/tailwind'
import { useEffect, useState } from 'react'
import MerkleRoots from 'components/MerkleRoots'
import defaultProvider from 'helpers/defaultProvider'

const container = margin('mb-4')

export default function Contract({
  originalAddress,
  derivativeAddress,
}: {
  originalAddress: string
  derivativeAddress: string
}) {
  const [name, setName] = useState<string>()
  useEffect(() => {
    async function fetchName() {
      const contract = ERC721__factory.connect(originalAddress, defaultProvider)
      try {
        const name = await contract.name()
        setName(name)
      } catch (error) {
        console.error(error)
      }
    }

    void fetchName()
  }, [originalAddress])
  return (
    <div className={container}>
      <BodyText>
        {!!name && `${name}: `}
        <Link url={`https://rinkeby.etherscan.io/address/${originalAddress}`}>
          {originalAddress}
        </Link>
      </BodyText>
      <BodyText>
        Derivative:{' '}
        <Link url={`https://rinkeby.etherscan.io/address/${derivativeAddress}`}>
          {derivativeAddress}
        </Link>
      </BodyText>
      <MerkleRoots address={originalAddress} />
    </div>
  )
}
