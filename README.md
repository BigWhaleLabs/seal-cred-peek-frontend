# SealCred admin frontend

Website that shows the current state of the SealCredLedger contract and allows to add new contracts to it.

## Local launch

1. Install dependencies with `yarn`
2. Create `.env`
3. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`

## Environment variables

| Variable                          | Description                            |
| --------------------------------- | -------------------------------------- |
| `VITE_APP_BACKEND_URL`            | URL of the backend service             |
| `VITE_ETH_NETWORK`                | Ethereum network to use                |
| `VITE_INFURA_ID`                  | Infura API ID                          |
| `VITE_SC_LEDGER_CONTRACT_ADDRESS` | Address of the SealCredLedger contract |
