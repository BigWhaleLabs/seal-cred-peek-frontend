import {
  alignItems,
  backgroundColor,
  borderRadius,
  boxShadow,
  boxShadowColor,
  brightness,
  classnames,
  display,
  fontSize,
  fontWeight,
  gap,
  justifyContent,
  lineHeight,
  padding,
  textDecoration,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const commonClasses = ({
  small,
  type,
}: {
  type: ButtonType
  small?: boolean
}) => {
  if (type === 'transparent') return textDecoration('underline')

  return classnames(
    display('flex'),
    gap('gap-x-2'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    boxShadow('active:shadow-button-active', 'hover:shadow-lg', 'shadow-2xl'),
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    padding(
      small ? { 'px-4': true, 'py-2': true } : { 'px-6': true, 'py-4': true }
    )
  )
}

const button = (type: ButtonType, small?: boolean) =>
  classnames(
    commonClasses({
      small,
      type,
    }),
    colorClasses(type)
  )

const colorClasses = (type: ButtonType) => {
  switch (type) {
    case 'primary':
      return classnames(
        borderRadius('rounded-full'),
        backgroundColor('bg-tertiary'),
        boxShadowColor(
          'shadow-tertiary',
          'hover:shadow-tertiary',
          'active:shadow-tertiary'
        ),
        boxShadow('shadow-button'),
        brightness('active:brightness-90', 'hover:brightness-95')
      )
    default:
      return backgroundColor('bg-transparent')
  }
}

interface ButtonProps {
  type?: ButtonType
  small?: boolean
  onClick: () => void
}

type ButtonType = 'primary' | 'transparent'

export default function ({
  children,
  small,
  type = 'transparent',
  onClick,
}: ButtonProps & ChildrenProp) {
  return (
    <button className={button(type, small)} onClick={onClick}>
      {children}
    </button>
  )
}
