import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return <>{children}</>
}
