import { Container, Box, Typography } from '@mui/material'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Get in touch with our team to discuss your drone cleaning needs. We offer free consultations and personalized quotes.
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
              <strong>Address:</strong> Chaplin Drive Lane Cove, NSW 2066
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> 0435 116 503
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> info@jamiendrone.com
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
