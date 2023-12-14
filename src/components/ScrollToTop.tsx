import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [location])

  return <>{children}</>
}
