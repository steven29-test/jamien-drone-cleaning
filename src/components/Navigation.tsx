import { AppBar, Toolbar, Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Navigation() {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Drone Cleaning', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1a1a1a' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            <Link to="/">Jamien Drone Cleaning</Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': { color: '#ffd700' },
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
