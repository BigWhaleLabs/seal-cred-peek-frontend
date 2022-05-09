import { FC } from 'react'
import {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  cursor,
  display,
  flex,
  flexDirection,
  fontWeight,
  justifyContent,
  margin,
  opacity,
  outlineStyle,
  padding,
  space,
  textColor,
} from 'classnames/tailwind'
import Spinner from 'components/Spinner'

type ButtonProps = {
  onClick: () => void
  title: string
  disabled?: boolean
  loading?: boolean
}

const button = (disabled?: boolean, loading?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    alignItems('items-center'),
    backgroundColor(
      'bg-transparent',
      disabled ? undefined : 'hover:bg-blue-500'
    ),
    textColor('text-blue-700', disabled ? undefined : 'hover:text-white'),
    fontWeight('font-semibold'),
    padding('py-2', 'px-4'),
    borderWidth('border'),
    borderColor(
      'border-blue-500',
      disabled ? undefined : 'hover:border-transparent'
    ),
    borderRadius('rounded'),
    outlineStyle('focus:outline-none'),
    disabled || loading ? opacity('opacity-50') : undefined,
    disabled || loading ? cursor('cursor-not-allowed') : undefined
  )
const Button: FC<ButtonProps> = ({ onClick, title, disabled, loading }) => {
  return (
    <button
      className={button(disabled, loading)}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <Spinner />}
      {title}
    </button>
  )
}

export default Button
