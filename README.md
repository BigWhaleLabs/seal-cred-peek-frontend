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

| Variable                         | Description                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| `VITE_ETH_NETWORK`               | Ethereum network to use (defaults to @bwl/constants)                |
| `VITE_ETH_RPC`                   | Ethereum node RPC URI (defaults to @bwl/constants)                  |
| `VITE_SCLEDGER_CONTRACT_ADDRESS` | Address of the SealCredLedger contract (defaults to @bwl/constants) |
