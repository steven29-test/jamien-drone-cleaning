import { Box, Container, Typography, Grid, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#252927', color: '#fff', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Jamien Drone
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              Drone cleaning, training pathways and equipment support in Sydney.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: '#938B7E' } }}>
              Home
            </Link>
            <Link component={RouterLink} to="/about" sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: '#938B7E' } }}>
              About
            </Link>
            <Link component={RouterLink} to="/services" sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: '#938B7E' } }}>
              Services
            </Link>
            <Link component={RouterLink} to="/drone-training" sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: '#938B7E' } }}>
              Drone Training
            </Link>
            <Link component={RouterLink} to="/contact" sx={{ display: 'block', color: '#aaa', textDecoration: 'none', '&:hover': { color: '#938B7E' } }}>
              Contact
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Services
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              • Roof Cleaning
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              • Solar Panel Cleaning
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              • Facade Cleaning
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              • Building Inspection
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              <strong>Address:</strong><br />
              Chaplin Drive, Lane Cove, NSW 2066
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              <strong>Phone:</strong><br />
              0435 116 503
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              <strong>Email:</strong><br />
              <Link href="mailto:sales@jamiendrone.com.au" sx={{ color: '#938B7E', textDecoration: 'none' }}>
                sales@jamiendrone.com.au
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid #333', pt: 3 }}>
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaa' }}>
            &copy; 2024 Jamien Drone Cleaning. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
