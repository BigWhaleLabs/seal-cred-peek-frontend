import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Cookie from 'components/Cookie'
import Footer from 'components/Footer'
import MainBlock from 'components/MainBlock'
import Privacy from 'pages/Privacy'
import Root from 'components/Root'
import ScrollToTop from 'components/ScrollToTop'
import Terms from 'pages/Terms'

export default function () {
  return (
    <Router>
      <Root>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<MainBlock />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </ScrollToTop>
      </Root>
      <Cookie />
      <Footer />
    </Router>
  )
}
