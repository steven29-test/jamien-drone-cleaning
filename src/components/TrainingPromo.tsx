import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
export default function TrainingPromo() {
  return <Container maxWidth="lg" sx={{ my: { xs: 5, md: 8 } }}>
    <Box component="section" aria-labelledby="training-promo-title" sx={{ backgroundColor: '#172c25', color: '#fff', borderRadius: 3, p: { xs: 3, md: 6 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'start', md: 'center' }, justifyContent: 'space-between', gap: 4 }}>
      <Box><Typography sx={{ color: '#c5ef70', fontSize: 12, letterSpacing: 2, fontWeight: 700, mb: 1 }}>DRONE TRAINING · SYDNEY</Typography>
      <Typography id="training-promo-title" variant="h3" component="h2" sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 700, mb: 2 }}>Take your interest in drones further.</Typography>
      <Typography sx={{ color: '#c8d3cb', maxWidth: 610 }}>Explore RePL training options in Sydney. Get help choosing a pathway that fits your experience and goals. English &amp; 中文咨询.</Typography></Box>
      <Button component={Link} to="/drone-training" variant="contained" sx={{ backgroundColor: '#c5ef70', color: '#172c25', textTransform: 'none', whiteSpace: 'nowrap', fontWeight: 700, px: 3, py: 1.5, '&:hover': { backgroundColor: '#d8f6a0' } }}>Explore drone training ↗</Button>
    </Box>
  </Container>
}
