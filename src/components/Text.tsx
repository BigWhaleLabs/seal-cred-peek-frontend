import { NavLink } from 'react-router-dom'
import {
  classnames,
  fontSize,
  fontWeight,
  margin,
  textColor,
  textDecoration,
  wordBreak,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const whiteText = classnames(textColor('text-white'))
const grayText = classnames(textColor('text-gray-300'))

const headerText = classnames(
  whiteText,
  fontSize('text-3xl', 'md:text-6xl'),
  fontWeight('font-bold'),
  margin('mb-6')
)
export function HeaderText({ children }: ChildrenProp) {
  return <p className={headerText}>{children}</p>
}

const subheaderText = classnames(
  whiteText,
  fontSize('text-xl', 'md:text-2xl'),
  fontWeight('font-bold'),
  margin('my-4'),
  wordBreak('break-all')
)
export function SubheaderText({ children }: ChildrenProp) {
  return <p className={subheaderText}>{children}</p>
}

const bodyText = classnames(grayText)
export function BodyText({ children }: ChildrenProp) {
  return <p className={bodyText}>{children}</p>
}

const link = classnames(textDecoration('underline'), wordBreak('break-all'))
export function Link({ children, url }: ChildrenProp & { url: string }) {
  return (
    <a className={link} href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}

const errorText = textColor('text-red-500')
export function ErrorText({ children }: ChildrenProp) {
  return <p className={errorText}>{children}</p>
}

const sectionSubheaderContainer = classnames(
  grayText,
  fontWeight('font-bold'),
  fontSize('text-lg')
)
export function SectionSubheader({ children }: ChildrenProp) {
  return <p className={sectionSubheaderContainer}>{children}</p>
}

const footerLink = classnames(
  whiteText,
  fontSize('text-sm'),
  fontWeight('font-semibold'),
  textDecoration('no-underline', 'hover:underline')
)
export function FooterlLink({
  url,
  children,
  internal,
}: ChildrenProp & {
  url: string
  internal?: boolean
}) {
  return internal ? (
    <NavLink to={url} className={footerLink}>
      {children}
    </NavLink>
  ) : (
    <a
      className={footerLink}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const footerDelimiterText = classnames(grayText, fontSize('text-xs'))
export function FooterDelimiterText({ children }: ChildrenProp) {
  return <span className={footerDelimiterText}>{children}</span>
}
