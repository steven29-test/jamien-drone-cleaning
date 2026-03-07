import { Box, Container, Typography, TextField, Button, Grid, FormControlLabel, Checkbox, Alert } from '@mui/material'
import { useState } from 'react'
import { saveCustomerData, sendAdminEmail, sendCustomerConfirmationEmail, CustomerData } from '../services/emailService'

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
      // 1. Save customer data to database
      const saveResult = await saveCustomerData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceType: formData.serviceType,
        marketingConsent: formData.marketingConsent,
      })

      if (!saveResult.success) {
        throw new Error('Failed to save your information')
      }

      // 2. Send email notification to admin
      const adminEmailResult = await sendAdminEmail({
        id: saveResult.customerId!,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceType: formData.serviceType,
        timestamp: new Date().toISOString(),
        marketingConsent: formData.marketingConsent,
      })

      if (!adminEmailResult.success) {
        console.warn('Failed to send admin email, but customer data was saved')
      }

      // 3. Send confirmation email to customer
      const confirmationResult = await sendCustomerConfirmationEmail(formData.email, formData.name)

      if (!confirmationResult.success) {
        console.warn('Failed to send confirmation email')
      }

      // Success
      setSuccessMessage(
        `Thank you ${formData.name}! Your information has been saved. We'll contact you soon at ${formData.email}. Check your email for confirmation.`
      )
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: '',
        marketingConsent: false,
      })
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
          Tell us about your drone cleaning needs and we'll get back to you shortly.
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Type"
                name="serviceType"
                placeholder="e.g., Roof Cleaning, Solar Panel Cleaning"
                value={formData.serviceType}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message *"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleCheckboxChange}
                    disabled={loading}
                  />
                }
                label="I consent to receive marketing emails and updates about special offers"
              />
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
                  '&:disabled': { backgroundColor: '#ccc' },
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', mt: 3, color: '#999' }}
        >
          Your information will be securely saved and used only for responding to your inquiry and marketing communications (if opted in).
        </Typography>
      </Container>
    </Box>
  )
}
