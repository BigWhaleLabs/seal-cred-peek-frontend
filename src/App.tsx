import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import MainBlock from 'components/MainBlock'
import Root from 'components/Root'

export default function () {
  return (
    <Root>
      <MainBlock />
      <ToastContainer theme="dark" />
    </Root>
  )
}
