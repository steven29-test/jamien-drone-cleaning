import { Box, Container, Typography, TextField, Button, Grid, FormControlLabel, Checkbox, Alert } from '@mui/material'
import { useState } from 'react'
import { saveCustomerToCSV } from '../services/csvService'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: '',
    marketingConsent: false,
  })

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      // Save to CSV
      const result = await saveCustomerToCSV({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceType: formData.serviceType,
        marketingConsent: formData.marketingConsent,
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to save your information')
      }

      // Success message
      const consentMessage = formData.marketingConsent
        ? 'You will receive marketing updates and special offers.'
        : 'We will only contact you regarding your inquiry.'

      setSuccessMessage(
        `Thank you ${formData.name}! Your information has been saved successfully. We'll contact you soon at ${formData.email}. ${consentMessage}`
      )

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: '',
        marketingConsent: false,
      })

      // Scroll to success message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } catch (error) {
      setErrorMessage(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
          Get in Touch
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', mb: 4, color: '#666' }}
        >
          Tell us about your drone cleaning needs. Fill out the form below and we'll get back to you shortly.
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="body2">{successMessage}</Typography>
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="body2">{errorMessage}</Typography>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                variant="outlined"
                placeholder="+1 (555) 123-4567"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Type"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                disabled={loading}
                variant="outlined"
                placeholder="e.g., Roof Cleaning, Solar Panel Cleaning, Building Facade"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                variant="outlined"
                placeholder="Tell us about your project and cleaning needs..."
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ backgroundColor: '#fff9e6', p: 2, borderRadius: 1, border: '1px solid #ffe082' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleCheckboxChange}
                      disabled={loading}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I consent to receive marketing emails about special offers, seasonal discounts, and service updates from Jamien Drone Cleaning
                    </Typography>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: '#ffd700',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  py: 1.5,
                  '&:hover': { backgroundColor: '#ffed4e' },
                  '&:disabled': { backgroundColor: '#ccc', color: '#666' },
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', mt: 4, color: '#999' }}
        >
          Your information will be securely saved and used only for responding to your inquiry.
          {formData.marketingConsent && ' You can unsubscribe from marketing emails at any time.'}
        </Typography>
      </Container>
    </Box>
  )
}
