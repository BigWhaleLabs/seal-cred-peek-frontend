import { Component } from 'react'
import { ErrorText } from 'components/Text'
import { margin } from 'classnames/tailwind'

const errorContrainer = margin('my-4')

export default class extends Component<{
  fallbackText: string
}> {
  state: {
    hasError: boolean
    error?: Error
  } = { hasError: false }
  static getDerivedStateFromError(error: Error) {
    return {
      error,
      hasError: true,
    }
  }
  render() {
    if (this.state.hasError) {
      console.error(this.state.error)
      return (
        <div className={errorContrainer}>
          <ErrorText>
            {this.props.fallbackText}: {this.state.error?.message}
          </ErrorText>
        </div>
      )
    }
    return this.props.children
  }
}
