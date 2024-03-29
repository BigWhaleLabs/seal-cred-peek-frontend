import { ComponentChildren } from 'preact'
import { Suspense } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import ErrorBoundary from 'components/ErrorBoundary'
import Loading from 'components/Loading'

export default function ({
  children,
  error,
  fallback,
}: ChildrenProp & { error: string; fallback?: ComponentChildren }) {
  return (
    <ErrorBoundary fallbackText={error}>
      <Suspense fallback={fallback || <Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
