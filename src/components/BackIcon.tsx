import { stroke, width } from 'classnames/tailwind'

export default function () {
  return (
    <div className={width('w-8')}>
      <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          className={stroke('stroke-white')}
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </div>
  )
}
