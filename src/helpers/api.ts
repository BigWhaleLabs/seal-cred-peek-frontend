import env from 'helpers/env'

const baseUrl = env.VITE_APP_BACKEND_URL

export function getContractAddress() {
  return fetch(`${baseUrl}/contract-address`).then((res) =>
    res.json()
  ) as Promise<{ address: string }>
}

export function addAddresses(addresses: string, password: string) {
  return fetch(`${baseUrl}/add-roots`, {
    method: 'POST',
    headers: {
      password,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      addresses: addresses.split(','),
    }),
  })
}

export function deleteAddresses(addresses: string, password: string) {
  return fetch(`${baseUrl}/remove-roots`, {
    method: 'DELETE',
    headers: {
      password,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      addresses: addresses.split(','),
    }),
  })
}
