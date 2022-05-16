import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import MainBlock from 'components/MainBlock'
import Root from 'components/Root'

const App = () => {
  return (
    <Root>
      <MainBlock />
      <ToastContainer theme="dark" />
    </Root>
  )
}

export default App
