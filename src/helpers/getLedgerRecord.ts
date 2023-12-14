import { Derivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliProvider } from 'helpers/providers'

export default function (original: string, derivative: string) {
  return {
    derivativeContract: Derivative__factory.connect(derivative, goerliProvider),
    original,
  }
}
