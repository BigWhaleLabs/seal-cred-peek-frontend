import {
  animation,
  classnames,
  height,
  margin,
  opacity,
  textColor,
  width,
} from 'classnames/tailwind'

const loader = classnames(
  animation('animate-spin'),
  textColor('text-blue-500'),
  margin('mr-2')
)
const icon = classnames(loader, width('w-5'), height('h-5'))
export default function () {
  return (
    <svg className={icon} viewBox="0 0 24 24">
      <circle
        className={classnames(opacity('opacity-25'))}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      ></circle>
      <path
        className={classnames(opacity('opacity-75'))}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
