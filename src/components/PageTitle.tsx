import { HeaderText, LinkText } from 'components/Text'
import BackIcon from 'components/BackIcon'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  space,
} from 'classnames/tailwind'

const headerWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  space('space-x-2'),
  margin('mb-6')
)

export default function ({
  backButton,
  title,
}: {
  title: string
  backButton?: boolean
}) {
  return (
    <div className={headerWrapper}>
      {backButton && (
        <LinkText internal url="/">
          <BackIcon />
        </LinkText>
      )}
      <HeaderText>{title}</HeaderText>
    </div>
  )
}
