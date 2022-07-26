import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  return <section className={space('space-y-2')}>{children}</section>
}
