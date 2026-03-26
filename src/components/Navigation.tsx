import { AppBar, Toolbar, Box, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { useState } from 'react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
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
            {/* Logo with Image */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                '&:hover': { opacity: 0.8 },
              }}
            >
              <Box
                component="img"
                src="/company-logo.svg"
                alt="Jamien Drone Cleaning Logo"
                sx={{
                  height: { xs: 40, md: 50 },
                  width: { xs: 40, md: 50 },
                  objectFit: 'contain',
                }}
              />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box
                  sx={{
                    fontSize: { sm: '0.9rem', md: '1.1rem' },
                    fontWeight: 'bold',
                    color: '#ffd700',
                    lineHeight: 1.2,
                  }}
                >
                  Jamien
                </Box>
                <Box
                  sx={{
                    fontSize: { sm: '0.7rem', md: '0.9rem' },
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  Drone Cleaning
                </Box>
              </Box>
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
