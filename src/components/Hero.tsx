import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import QuoteButton from './QuoteButton'

export default function Hero() {
  return (
    <>
    <Box component="section" sx={{ position: 'relative', minHeight: { xs: 720, md: 640 }, display: 'flex', alignItems: 'center', overflow: 'hidden', bgcolor: '#252927', color: '#fff' }}>
      {/* DJI Matrice 400 product image; animated photograph, not cleaning footage.
          Source: https://store.dji.com/au/product/dji-matrice-400-worry-free-plus-combo */}
      <Box sx={{ position: 'absolute', right: 0, top: 0, width: { xs: '100%', md: '62%' }, height: { xs: 350, md: '100%' }, overflow: 'hidden' }}>
        <Box component="img" src="/m400-banner.webp" alt="DJI Matrice 400 enterprise drone" width={1280} height={1280} fetchPriority="high" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: { xs: 'center 39%', md: 'center 46%' }, filter: 'saturate(.38)', animation: 'm400BannerZoom 16s ease-in-out infinite alternate', transformOrigin: '55% 45%', '@keyframes m400BannerZoom': { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.045)' } }, '@media (prefers-reduced-motion: reduce)': { animation: 'none' } }} />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, background: { xs: 'linear-gradient(180deg, rgba(37,41,39,.12) 0px, rgba(37,41,39,.15) 180px, #252927 340px)', md: 'linear-gradient(90deg, #252927 0%, #252927 34%, rgba(37,41,39,.94) 43%, rgba(37,41,39,.3) 65%, rgba(37,41,39,.12) 100%)' } }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: '280px', md: 10 }, pb: { xs: 6, md: 10 } }}>
        <Typography sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 11, color: '#D6D4CE', mb: 2.5 }}>Sydney · Domestic & Commercial</Typography>
        <Typography component="h1" sx={{ maxWidth: 650, fontSize: { xs: 43, sm: 58, md: 64 }, lineHeight: 1.08, letterSpacing: { xs: -1.5, md: -2.5 }, fontWeight: 500 }}>
          Your property.<br />Looking its best.
        </Typography>
        <Typography sx={{ maxWidth: 500, mt: 2.5, mb: 3.5, color: '#E1E0DB', fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>
          Professional drone cleaning for roofs, facades, windows and solar panels across Sydney.
        </Typography>
        <Box>
          <QuoteButton variant="contained" sx={{ bgcolor: '#EEECE6', color: '#252927', px: 3.5, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#fff' } }}>Get a free quote</QuoteButton>
        </Box>
        <Box sx={{ mt: 4, pt: 2.5, borderTop: '1px solid rgba(255,255,255,.2)', maxWidth: 500 }}>
          <Typography sx={{ fontSize: 13, color: '#D6D4CE', mb: 0.5 }}>Want to become a drone pilot?</Typography>
          <Button component={Link} to="/drone-training" sx={{ color: '#F3F0E9', p: 0, minHeight: 40, textTransform: 'none', fontWeight: 500, fontSize: 15, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}>Explore RePL training →</Button>
        </Box>
      </Container>
    </Box>
    </>
  )
}
