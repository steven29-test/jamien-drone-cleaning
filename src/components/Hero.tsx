import { Box, Container, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), linear-gradient(to right, #1a1a1a, #333)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        py: 15,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Professional Drone Cleaning Services
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, fontSize: '1.2rem' }}>
          Keep your property spotless with cutting-edge drone technology
        </Typography>
        <Link to="/services" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffd700',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#ffed4e' },
            }}
          >
            Explore Services
          </Button>
        </Link>
      </Container>
    </Box>
  )
}
