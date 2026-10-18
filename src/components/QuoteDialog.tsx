import { useState, type FormEvent } from 'react'
import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { saveCustomerToCSV } from '../services/csvService'
import AddressAutocomplete from './AddressAutocomplete'

const services = ['Roof Cleaning', 'Building & Facade Cleaning', 'Exterior House Washing', 'Driveway & Path Cleaning', 'Exterior Window Cleaning', 'Solar Panel Cleaning', 'Other / Not sure']

export default function QuoteDialog({ open, onClose, initialService = 'Other / Not sure' }: { open: boolean; onClose: () => void; initialService?: string }) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) {
      setError('Please enter your name, email and a short description of the work.')
      return
    }
    setSending(true)
    setError('')
    try {
      const result = await saveCustomerToCSV({
        name,
        email,
        phone: String(data.get('phone') || '').trim(),
        serviceType: String(data.get('service') || 'Other / Not sure'),
        message: `Website quote request\nPage: ${window.location.pathname}\nProperty address / suburb: ${String(data.get('address') || '').trim() || 'Not provided'}\n\n${message}`,
        marketingConsent: false,
      })
      if (!result.success) throw new Error(result.error || 'Unable to send your request. Please try again.')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message.replace(/^Error: /, '') : 'Unable to send your request. Please try again.')
    } finally {
      setSending(false)
    }
  }

  function closeDialog() {
    if (sending) return
    onClose()
  }

  return <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth aria-labelledby="quote-dialog-title" aria-describedby="quote-dialog-description" TransitionProps={{ onExited: () => { setSent(false); setError('') } }} PaperProps={{ sx: { bgcolor: '#F3F0E9', color: '#252927', borderRadius: 3, m: { xs: 1.5, sm: 4 }, maxHeight: 'calc(100% - 24px)' } }}>
    <DialogTitle id="quote-dialog-title" sx={{ pt: 4, px: { xs: 3, sm: 4 }, pr: 7, fontSize: { xs: 28, sm: 34 }, fontWeight: 600 }}>Get a free quote</DialogTitle>
    <IconButton aria-label="Close quote form" onClick={closeDialog} disabled={sending} sx={{ position: 'absolute', right: 12, top: 12, color: '#252927' }}><CloseIcon /></IconButton>
    <DialogContent sx={{ px: { xs: 3, sm: 4 }, pb: 4 }}>
      <Typography id="quote-dialog-description" sx={{ color: '#666B67', lineHeight: 1.7, mb: 3 }}>Tell us about your property and the cleaning you need. Our Sydney team will be in touch to discuss your quote.</Typography>
      {sent ? <Box>
        <Alert severity="success" role="status" sx={{ mb: 3 }}>Thank you. Your quote request has been sent. We’ll be in touch soon.</Alert>
        <Button onClick={closeDialog} variant="contained" fullWidth sx={{ bgcolor: '#252927', textTransform: 'none', py: 1.5 }}>Done</Button>
      </Box> : <Box component="form" onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label="Your name" name="name" autoComplete="name" required fullWidth autoFocus disabled={sending} inputProps={{ maxLength: 120 }} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Email" name="email" type="email" autoComplete="email" required fullWidth disabled={sending} inputProps={{ maxLength: 254 }} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Phone" name="phone" type="tel" autoComplete="tel" fullWidth disabled={sending} inputProps={{ maxLength: 40 }} /></Grid>
          <Grid item xs={12} sm={6}><AddressAutocomplete disabled={sending} /></Grid>
          <Grid item xs={12}><TextField label="Cleaning service" name="service" select defaultValue={initialService} fullWidth disabled={sending}>{(services.includes(initialService) ? services : [initialService, ...services]).map(service => <MenuItem key={service} value={service}>{service}</MenuItem>)}</TextField></Grid>
          <Grid item xs={12}><TextField label="Message" name="message" placeholder="What would you like cleaned? Include the property type and approximate size, if known." multiline minRows={4} required fullWidth disabled={sending} inputProps={{ maxLength: 5000 }} /></Grid>
        </Grid>
        <Typography sx={{ fontSize: 12, color: '#666B67', my: 2 }}>We’ll use these details to respond to your quote request.</Typography>
        <Button type="submit" variant="contained" fullWidth disabled={sending} sx={{ bgcolor: '#252927', color: '#fff', textTransform: 'none', py: 1.5, '&:hover': { bgcolor: '#414640' } }}>{sending ? 'Sending…' : 'Send quote request'}</Button>
        <Typography sx={{ fontSize: 13, color: '#666B67', mt: 2, textAlign: 'center' }}>Prefer to talk? <a href="tel:0435116503" style={{ color: 'inherit' }}>0435 116 503</a></Typography>
      </Box>}
    </DialogContent>
  </Dialog>
}
