import { BodyText, SubheaderText } from 'components/Text'
import { addAddresses } from 'helpers/api'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Button from 'components/Button'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexGrow,
  justifyContent,
  margin,
  padding,
} from 'classnames/tailwind'

const form = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch')
)
const textField = classnames(padding('p-2'), flexGrow('grow'), margin('my-2'))
export default function () {
  const [addresses, setAddresses] = useState('')
  const [password, setPassword] = useState('')
  const [addressIsValid, setAddressIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  useEffect(() => {
    setAddressIsValid(
      /^(0x[a-fA-F0-9]{40})(,0x[a-fA-F0-9]{40})*$/.test(addresses) && !!password
    )
  }, [addresses, password])
  return (
    <>
      <SubheaderText>Add addresses</SubheaderText>
      <BodyText>(comma-separated)</BodyText>
      <div className={form}>
        <input
          className={textField}
          type="text"
          placeholder="Addresses"
          onChange={(e) => setAddresses(e.currentTarget.value)}
          value={addresses}
          disabled={loading}
        />
        <input
          className={textField}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          disabled={loading}
        />
        <Button
          onClick={async () => {
            setLoading(true)
            try {
              setStatus('Adding addresses...')
              await addAddresses(addresses, password)
              setAddresses('')
            } catch (error) {
              toast(String(error), { type: 'error' })
            } finally {
              setStatus('')
              setLoading(false)
            }
          }}
          title="Add the addresses"
          disabled={!addressIsValid}
          loading={loading}
        />
      </div>
      {status && <BodyText>{status}</BodyText>}
    </>
  )
}
