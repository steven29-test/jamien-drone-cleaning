import { AppBar, Toolbar, Box, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { useState } from 'react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 250, backgroundColor: '#1a1a1a', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              onClick={handleNavClick}
              sx={{
                color: location.pathname === link.path ? '#ffd700' : '#fff',
                '&:hover': { backgroundColor: '#333', color: '#ffd700' },
              }}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#1a1a1a' }}>
        <Container maxWidth="lg" sx={{ p: 0 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1, px: { xs: 2, md: 0 } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontWeight: 'bold',
                color: '#fff',
                textDecoration: 'none',
                '&:hover': { color: '#ffd700' },
              }}
            >
              Jamien Drone
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    sx={{
                      color: location.pathname === link.path ? '#ffd700' : '#fff',
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

            {/* Mobile Hamburger */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: '#1a1a1a',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
