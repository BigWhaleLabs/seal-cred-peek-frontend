import { LinkText } from 'components/Text'
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
      <LinkText url="https://bigwhalelabs.com/">BWL</LinkText>
      <Delimiter />
      <LinkText url="https://blog.bigwhalelabs.com/">Blog</LinkText>
      <Delimiter />
      <LinkText url="https://sealcred.xyz/">SealCred</LinkText>
      <Delimiter />
      <LinkText internal url="/terms">
        Terms of service
      </LinkText>
      <Delimiter />
      <LinkText internal url="/privacy">
        Privacy policy
      </LinkText>
    </div>
  )
}
