import { FooterlLink } from 'components/Text'
import Delimiter from 'components/Delimiter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const footerContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-center'),
  padding('py-8'),
  width('w-fit'),
  margin('mx-auto'),
  space('space-y-4', 'sm:space-x-4', 'sm:space-y-0')
)

export default function () {
  return (
    <div className={footerContainer}>
      <FooterlLink url="https://blog.bigwhalelabs.com/">Bwl</FooterlLink>
      <Delimiter />
      <FooterlLink url="https://blog.bigwhalelabs.com/">Blog</FooterlLink>
      <Delimiter />
      <FooterlLink url="https://sealcred.xyz/">SealCred</FooterlLink>
      <Delimiter />
      <FooterlLink url="/terms">Terms of service</FooterlLink>
      <Delimiter />
      <FooterlLink url="/privacy">Privacy policy</FooterlLink>
    </div>
  )
}
