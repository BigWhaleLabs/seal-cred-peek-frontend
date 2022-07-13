# SealCred peek frontend

Website that shows the current state of the SealCredERC721Ledger contract.

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

| Variable                                          | Description                                                                 |
| ------------------------------------------------- | --------------------------------------------------------------------------- |
| `VITE_ETH_NETWORK`                                | Ethereum network to use (defaults to @bwl/constants)                        |
| `VITE_ETH_RPC`                                    | Ethereum node RPC URI (defaults to @bwl/constants)                          |
| `VITE_ETH_RPC_MAINNET`                            | Ethereum mainnet node RPC URI (defaults to @bwl/constants)                  |
| `VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS`           | Address of the SCEmailLedger contract (defaults to @bwl/constants)          |
| `VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS`          | Address of the SCERC721Ledger contract (defaults to @bwl/constants)         |
| `VITE_EXTERNAL_SC_ERC721_LEDGER_CONTRACT_ADDRESS` | Address of the ExternalSCERC721Ledger contract (defaults to @bwl/constants) |
| `VITE_ENCRYPT_KEY`                                | Secret key to encrypt local storage                                         |
