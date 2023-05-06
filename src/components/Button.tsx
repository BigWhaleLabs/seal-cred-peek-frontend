import { textDecoration } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const button = textDecoration('underline')

export default function ({
  children,
  onClick,
}: ChildrenProp & { onClick: () => void }) {
  return (
    <button className={button} onClick={onClick}>
      {children}
    </button>
  )
}
