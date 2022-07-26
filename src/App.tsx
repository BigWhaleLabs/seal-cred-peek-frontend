import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from 'components/Footer'
import MainBlock from 'components/MainBlock'
import Privacy from 'pages/Privacy'
import Root from 'components/Root'
import Terms from 'pages/Terms'

export default function () {
  return (
    <Router>
      <Root>
        <Routes>
          <Route path="/" element={<MainBlock />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Root>
      <Footer />
    </Router>
  )
}
