import { FooterDelimiterText } from 'components/Text'
import classnames, { display, width } from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  display('hidden', 'sm:block')
)

export default function () {
  return (
    <div className={bottomSeparator}>
      <FooterDelimiterText>|</FooterDelimiterText>
    </div>
  )
}
