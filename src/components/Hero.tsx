import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: { xs: 620, md: 740 }, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', bgcolor: '#252927', color: '#fff' }}>
      <Box component="video" autoPlay muted loop playsInline aria-hidden="true" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/final_lighter_music.mp4" type="video/mp4" />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(27,31,29,.84) 0%, rgba(27,31,29,.50) 56%, rgba(27,31,29,.18) 100%)' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: { xs: 8, md: 10 } }}>
        <Typography sx={{ textTransform: 'uppercase', letterSpacing: 2.4, fontSize: 12, color: '#D6D4CE', mb: 2 }}>Drone solutions · Sydney</Typography>
        <Typography component="h1" sx={{ maxWidth: 880, fontSize: { xs: 46, sm: 62, md: 78 }, lineHeight: 1, letterSpacing: { xs: -2, md: -3.5 }, fontWeight: 500 }}>
          Practical drone services for work, property and industry.
        </Typography>
        <Typography sx={{ maxWidth: 570, mt: 3, mb: 4, color: '#E1E0DB', fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>
          Professional drone cleaning, commercial training pathways and practical equipment support from one Sydney-based team.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button component={Link} to="/services" variant="contained" sx={{ bgcolor: '#EEECE6', color: '#252927', px: 3.5, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#fff' } }}>Explore cleaning</Button>
          <Button component={Link} to="/drone-training" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,.6)', color: '#fff', px: 3.5, py: 1.5, textTransform: 'none', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.06)' } }}>Explore training</Button>
        </Box>
      </Container>
    </Box>
  )
}
