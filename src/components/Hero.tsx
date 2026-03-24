import { Box, Container, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        color: '#fff',
        py: 15,
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/final_lighter_music.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
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
