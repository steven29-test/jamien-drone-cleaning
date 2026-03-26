import { useEffect } from 'react'
import { Container, Box, Typography } from '@mui/material'
import ContactForm from '../components/ContactForm'
import { updatePageMeta } from '../utils/seo'

export default function Contact() {
  useEffect(() => {
    updatePageMeta(
      'Contact Jamien Drone Cleaning - Get Your Free Quote',
      'Contact us for professional drone cleaning services in Sydney. Free consultations and personalized quotes. Address: Chaplin Drive, Lane Cove NSW 2066. Phone: 0435 116 503. Email: sales@jamiendrone.com.au',
      'https://www.jamiendrone.com.au/contact'
    )
  }, [])

  return (
    <>
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Request a cleaning service and discuss your drone cleaning needs. We offer free consultations and personalized quotes.
          </Typography>
        </Container>
      </Box>

      <ContactForm />

      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Contact Information
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Address:</strong> Chaplin Drive, Lane Cove, NSW 2066
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> 0435 116 503
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> <a href="mailto:sales@jamiendrone.com.au" style={{ color: '#ffd700', textDecoration: 'none' }}>sales@jamiendrone.com.au</a>
            </Typography>
            <Typography variant="body1">
              <strong>Service Area:</strong> Greater Sydney and Surrounding Regions
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}
