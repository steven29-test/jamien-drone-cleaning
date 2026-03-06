import { Box, Container, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1a1a1a', color: '#fff', py: 4, mt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          &copy; 2024 Jamien Drone Cleaning. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', mt: 1, color: '#aaa' }}
        >
          Professional drone cleaning services for residential and commercial properties.
        </Typography>
      </Container>
    </Box>
  )
}
