import { Suspense } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import ErrorBoundary from 'components/ErrorBoundary'
import Loading from 'components/Loading'

export default function ({
  error,
  children,
}: ChildrenProp & { error: string }) {
  return (
    <ErrorBoundary fallbackText={error}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
