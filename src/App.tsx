import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
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
            <Route element={<MainBlock />} path="/" />
            <Route element={<Terms />} path="/terms" />
            <Route element={<Privacy />} path="/privacy" />
          </Routes>
        </ScrollToTop>
      </Root>
      <Footer />
    </Router>
  )
}
