import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import QuoteDialog from './QuoteDialog'

export default function Hero() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  return (
    <>
    <Box component="section" sx={{ position: 'relative', minHeight: { xs: 540, md: 640 }, display: 'flex', alignItems: 'center', overflow: 'hidden', bgcolor: '#252927', color: '#fff' }}>
      <Box component="video" autoPlay muted loop playsInline aria-hidden="true" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/final_lighter_music.mp4" type="video/mp4" />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(27,31,29,.94) 0%, rgba(27,31,29,.78) 55%, rgba(27,31,29,.48) 100%)' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 7, md: 10 } }}>
        <Typography sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 11, color: '#D6D4CE', mb: 2.5 }}>Sydney · Domestic & Commercial</Typography>
        <Typography component="h1" sx={{ maxWidth: 760, fontSize: { xs: 43, sm: 58, md: 72 }, lineHeight: 1.08, letterSpacing: { xs: -1.5, md: -2.5 }, fontWeight: 500 }}>
          Your property.<br />Looking its best.
        </Typography>
        <Typography sx={{ maxWidth: 500, mt: 2.5, mb: 3.5, color: '#E1E0DB', fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>
          Professional drone cleaning for roofs, facades, windows and solar panels across Sydney.
        </Typography>
        <Box>
          <Button onClick={() => setQuoteOpen(true)} aria-haspopup="dialog" variant="contained" sx={{ bgcolor: '#EEECE6', color: '#252927', px: 3.5, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#fff' } }}>Get a free quote</Button>
        </Box>
        <Box sx={{ mt: 4, pt: 2.5, borderTop: '1px solid rgba(255,255,255,.2)', maxWidth: 500 }}>
          <Typography sx={{ fontSize: 13, color: '#D6D4CE', mb: 0.5 }}>Want to become a drone pilot?</Typography>
          <Button component={Link} to="/drone-training" sx={{ color: '#F3F0E9', p: 0, minHeight: 40, textTransform: 'none', fontWeight: 500, fontSize: 15, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}>Explore RePL training →</Button>
        </Box>
      </Container>
    </Box>
    <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
