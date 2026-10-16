import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function TrainingPromo() {
  return <Box component="section" sx={{ bgcolor: '#2B302E', color: '#F4F2ED', py: { xs: 8, md: 12 } }}><Container maxWidth="lg" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr .95fr' }, gap: { xs: 5, md: 12 }, alignItems: 'end' }}>
    <Box><Typography sx={{ color: '#AAA69E', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', mb: 2 }}>Jamien Drone Academy</Typography><Typography component="h2" sx={{ fontSize: { xs: 40, md: 58 }, lineHeight: 1.05, letterSpacing: -2 }}>Build the skills for your next step.</Typography></Box>
    <Box><Typography sx={{ color: '#CFCDC7', lineHeight: 1.8, mb: 3, maxWidth: 520 }}>Explore RePL training, licence upgrades and group options. We’ll help you understand the available pathway before you commit.</Typography><Button component={Link} to="/drone-training" sx={{ color: '#F4F2ED', borderBottom: '1px solid #AAA69E', borderRadius: 0, px: 0, textTransform: 'none' }}>Explore drone training ↗</Button></Box>
  </Container></Box>
}
