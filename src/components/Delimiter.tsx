import classnames, {
  display,
  fontSize,
  lineHeight,
  textColor,
  width,
} from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  display('hidden', 'sm:block')
)
const statusText = classnames(
  fontSize('text-xs'),
  lineHeight('leading-4'),
  textColor('text-gray-300')
)

export default function () {
  return (
    <div className={bottomSeparator}>
      <span className={statusText}>|</span>
    </div>
  )
}
