import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import DroneTraining from './pages/DroneTraining'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import ResidentialService from './pages/ResidentialService'
import CommercialService from './pages/CommercialService'
import { Box } from '@mui/material'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/residential/:serviceId" element={<ResidentialService />} />
          <Route path="/services/commercial/:serviceId" element={<CommercialService />} />
          <Route path="/drone-training" element={<DroneTraining />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
