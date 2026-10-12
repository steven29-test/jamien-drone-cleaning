import { AppBar, Toolbar, Box, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, Close as CloseIcon, Phone as PhoneIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Fragment, useState } from 'react'
import { commercialServices } from '../data/commercialServices'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const [servicesAnchor, setServicesAnchor] = useState<HTMLElement | null>(null)
  const residentialLinks = [
    { label: 'Roof Cleaning', id: 'roof-cleaning' },
    { label: 'Driveway & Path Cleaning', id: 'driveway-cleaning' },
    { label: 'Exterior House Washing', id: 'house-washing' },
    { label: 'Solar Panel Cleaning', id: 'solar-panel-cleaning' },
    { label: 'Exterior Window Cleaning', id: 'window-cleaning' },
  ]

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
        {navLinks.map(link => <Fragment key={link.path}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={link.path} onClick={handleNavClick} sx={{ color: location.pathname === link.path ? '#ffd700' : '#fff' }}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
          {link.path === '/services' && <>
            <ListItem><ListItemText primary="Residential" sx={{ color: '#ffd700', pl: 1 }} /></ListItem>
            {residentialLinks.map(service => <ListItem key={service.id} disablePadding><ListItemButton component={Link} to={`/services/residential/${service.id}`} onClick={handleNavClick} sx={{ color: '#fff', pl: 4 }}><ListItemText primary={service.label} /></ListItemButton></ListItem>)}
            <ListItem><ListItemText primary="Commercial" sx={{ color: '#ffd700', pl: 1 }} /></ListItem>
            {commercialServices.map(service => <ListItem key={service.id} disablePadding><ListItemButton component={Link} to={`/services/commercial/${service.id}`} onClick={handleNavClick} sx={{ color: '#fff', pl: 4 }}><ListItemText primary={service.label} /></ListItemButton></ListItem>)}
          </>}
        </Fragment>)}
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
              <Button
                component="a"
                href="tel:+61435116503"
                startIcon={<PhoneIcon />}
                aria-label="Call Jamien Drone Cleaning on 0435 116 503"
                sx={{
                  color: '#1a1a1a',
                  backgroundColor: '#ffd700',
                  textTransform: 'none',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#ffed4e' },
                }}
              >
                0435 116 503
              </Button>
              {navLinks.map((link) => link.path === '/services' ? (
                <Button
                  key={link.path}
                  onClick={(event) => setServicesAnchor(event.currentTarget)}
                  endIcon={<ExpandMoreIcon />}
                  aria-controls={servicesAnchor ? 'services-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(servicesAnchor)}
                  sx={{ color: location.pathname.startsWith('/services') ? '#ffd700' : '#fff', textTransform: 'none', fontSize: '1rem' }}
                >
                  Services
                </Button>
              ) : (
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

            {/* Mobile Phone Link and Hamburger */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
              <Button
                component="a"
                href="tel:+61435116503"
                startIcon={<PhoneIcon sx={{ fontSize: 18 }} />}
                aria-label="Call Jamien Drone Cleaning on 0435 116 503"
                sx={{
                  color: '#ffd700',
                  minWidth: 0,
                  px: 1,
                  fontSize: { xs: '0.78rem', sm: '0.9rem' },
                  fontWeight: 700,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                0435 116 503
              </Button>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: '#fff' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu id="services-menu" anchorEl={servicesAnchor} open={Boolean(servicesAnchor)} onClose={() => setServicesAnchor(null)} MenuListProps={{ sx: { display: 'grid', gridTemplateColumns: '1fr 1fr', p: 1.5, columnGap: 2 } }} slotProps={{ paper: { sx: { borderRadius: 2, mt: 1, minWidth: 480 } } }}>
        <MenuItem component={Link} to="/services" onClick={() => setServicesAnchor(null)} sx={{ gridColumn: '1 / -1', borderBottom: '1px solid #eee', mb: 1 }}>All Services</MenuItem>
        <MenuItem disabled sx={{ gridColumn: 1, gridRow: 2, opacity: '1 !important', color: '#55704b', fontWeight: 'bold' }}>Residential</MenuItem>
        {residentialLinks.map((service, index) => (
          <MenuItem key={service.id} component={Link} to={`/services/residential/${service.id}`} onClick={() => setServicesAnchor(null)} sx={{ gridColumn: 1, gridRow: index + 3, fontSize: 14 }}>
            {service.label}
          </MenuItem>
        ))}
        <MenuItem disabled sx={{ gridColumn: 2, gridRow: 2, opacity: '1 !important', color: '#55704b', fontWeight: 'bold' }}>Commercial</MenuItem>
        {commercialServices.map((service, index) => (
          <MenuItem key={service.id} component={Link} to={`/services/commercial/${service.id}`} onClick={() => setServicesAnchor(null)} sx={{ gridColumn: 2, gridRow: index + 3, fontSize: 14 }}>
            {service.label}
          </MenuItem>
        ))}
      </Menu>

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
