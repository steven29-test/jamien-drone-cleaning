import { useEffect } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import Hero from '../components/Hero'
import Features from '../components/Features'
import ServicesGrid from '../components/ServicesGrid'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import GoogleReviews from '../components/GoogleReviews'
import { updatePageMeta } from '../utils/seo'

export default function Home() {
  useEffect(() => {
    updatePageMeta(
      'Jamien Drone Cleaning - Professional Drone Cleaning Services Sydney North Shore & Inner West',
      'Professional drone cleaning services in Sydney North Shore & Inner West. Roof cleaning, solar panel cleaning, facade washing. Available in Chatswood, Willoughby, Marrickville, Newtown, and all surrounding suburbs. Call 0435 116 503.',
      'https://www.jamiendrone.com.au'
    )
  }, [])

  return (
    <>
      <Hero />
      <Features />
      <ServicesGrid />
      <BeforeAfterSlider />
      <GoogleReviews />
      <Box component="section" sx={{ py: 6, bgcolor: '#f6f7f1' }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Exterior cleaning across Sydney</Typography>
          <Typography sx={{ color: '#596453', lineHeight: 1.8, maxWidth: 800, mb: 2 }}>Jamien Drone Cleaning offers residential and commercial exterior cleaning across Sydney’s North Shore, Inner West and surrounding areas. Ask us about roof treatments, exterior washing, solar panels, windows and suitable hard surfaces.</Typography>
          <Typography sx={{ color: '#596453', lineHeight: 1.8, mb: 3 }}>Share your suburb and property photos. We assess the surfaces and access before recommending a cleaning method and providing a tailored quote.</Typography>
          <Button component="a" href="/services" sx={{ textTransform: 'none', fontWeight: 700 }}>Explore our cleaning services →</Button>
        </Container>
      </Box>
    </>
  )
}
