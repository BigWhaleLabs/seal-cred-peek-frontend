import { FC, Suspense } from 'react'
import ErrorBoundary from 'components/ErrorBoundary'
import Loading from 'components/Loading'

const SuspenseWithError: FC<{ error: string }> = ({ error, children }) => {
  return (
    <ErrorBoundary fallbackText={error}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default SuspenseWithError
