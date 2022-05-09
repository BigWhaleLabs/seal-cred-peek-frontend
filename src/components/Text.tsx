import { FC } from 'react'
import {
  classnames,
  fontSize,
  fontWeight,
  margin,
  textColor,
  textDecoration,
  wordBreak,
} from 'classnames/tailwind'

const whiteText = classnames(textColor('text-white'))
const grayText = classnames(textColor('text-gray-300'))

const headerText = classnames(
  whiteText,
  fontSize('text-3xl', 'md:text-6xl'),
  fontWeight('font-bold'),
  margin('mb-6')
)
export const HeaderText: FC = ({ children }) => {
  return <p className={headerText}>{children}</p>
}

const subheaderText = classnames(
  whiteText,
  fontSize('text-xl', 'md:text-2xl'),
  fontWeight('font-bold'),
  margin('my-4'),
  wordBreak('break-all')
)
export const SubheaderText: FC = ({ children }) => {
  return <p className={subheaderText}>{children}</p>
}

const bodyText = classnames(grayText)
export const BodyText: FC = ({ children }) => {
  return <p className={bodyText}>{children}</p>
}

const codeText = classnames(grayText)
export const CodeText: FC = ({ children }) => {
  return <code className={codeText}>{children}</code>
}

const link = classnames(textDecoration('underline'), wordBreak('break-all'))
export const Link: FC<{ url: string }> = ({ children, url }) => {
  return (
    <a className={link} href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}

const errorText = textColor('text-red-500')
export const ErrorText: FC = ({ children }) => {
  return <p className={errorText}>{children}</p>
}
