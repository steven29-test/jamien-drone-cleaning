import { AppBar, Toolbar, Box, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, Close as CloseIcon, Phone as PhoneIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Fragment, useState } from 'react'
import { commercialServices } from '../data/commercialServices'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const [servicesAnchor, setServicesAnchor] = useState<HTMLElement | null>(null)
  const [academyAnchor, setAcademyAnchor] = useState<HTMLElement | null>(null)
  const [equipmentAnchor, setEquipmentAnchor] = useState<HTMLElement | null>(null)
  const residentialLinks = [
    { label: 'Roof Cleaning', id: 'roof-cleaning' },
    { label: 'Driveway & Path Cleaning', id: 'driveway-cleaning' },
    { label: 'Exterior House Washing', id: 'house-washing' },
    { label: 'Solar Panel Cleaning', id: 'solar-panel-cleaning' },
    { label: 'Exterior Window Cleaning', id: 'window-cleaning' },
  ]

  const navLinks = [
    { label: 'Cleaning', path: '/services' },
    { label: 'Academy', path: '/drone-training' },
    { label: 'Equipment', path: '/equipment' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]
  const academyLinks = [
    { label: 'RePL Training', path: '/drone-training#repl-training' },
    { label: 'Licence Upgrades', path: '/drone-training#licence-upgrades' },
    { label: 'Group Training', path: '/drone-training#group-training' },
  ]
  const equipmentLinks = [
    { label: 'Cleaning Sets', path: '/equipment#cleaning-sets' },
    { label: 'Drones', path: '/equipment#drones' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 250, backgroundColor: '#252927', height: '100%' }}>
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
            <ListItemButton component={Link} to={link.path} onClick={handleNavClick} sx={{ color: location.pathname === link.path ? '#938B7E' : '#fff' }}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
          {link.path === '/services' && <>
            <ListItem><ListItemText primary="Residential" sx={{ color: '#938B7E', pl: 1 }} /></ListItem>
            {residentialLinks.map(service => <ListItem key={service.id} disablePadding><ListItemButton component={Link} to={`/services/residential/${service.id}`} onClick={handleNavClick} sx={{ color: '#fff', pl: 4 }}><ListItemText primary={service.label} /></ListItemButton></ListItem>)}
            <ListItem disablePadding><ListItemButton component={Link} to="/services#commercial-services" onClick={handleNavClick} sx={{ color: '#938B7E', pl: 2 }}><ListItemText primary="Commercial Cleaning" /></ListItemButton></ListItem>
            {commercialServices.map(service => <ListItem key={service.id} disablePadding><ListItemButton component={Link} to={`/services/commercial/${service.id}`} onClick={handleNavClick} sx={{ color: '#fff', pl: 4 }}><ListItemText primary={service.label} /></ListItemButton></ListItem>)}
          </>}
          {link.path === '/drone-training' && academyLinks.map(item => <ListItem key={item.path} disablePadding><ListItemButton component={Link} to={item.path} onClick={handleNavClick} sx={{ color: '#fff', pl: 4 }}><ListItemText primary={item.label} /></ListItemButton></ListItem>)}
          {link.path === '/equipment' && equipmentLinks.map(item => <ListItem key={item.path} disablePadding><ListItemButton component={Link} to={item.path} onClick={handleNavClick} sx={{ color: '#fff', pl: 4 }}><ListItemText primary={item.label} /></ListItemButton></ListItem>)}
        </Fragment>)}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#252927' }}>
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
                    color: '#938B7E',
                    lineHeight: 1.2,
                  }}
                >
                  Jamien Drone
                </Box>
                <Box
                  sx={{
                    fontSize: { sm: '0.7rem', md: '0.9rem' },
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  Cleaning · Academy · Equipment
                </Box>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, alignItems: 'center' }}>
              <Button
                component="a"
                href="tel:+61435116503"
                startIcon={<PhoneIcon />}
                aria-label="Call Jamien Drone Cleaning on 0435 116 503"
                sx={{
                  color: '#252927',
                  backgroundColor: '#938B7E',
                  textTransform: 'none',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#AAA296' },
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
                  sx={{ color: location.pathname.startsWith('/services') ? '#938B7E' : '#fff', textTransform: 'none', fontSize: '1rem' }}
                >
                  Cleaning
                </Button>
              ) : link.path === '/drone-training' ? (
                <Button
                  key={link.path}
                  onClick={(event) => setAcademyAnchor(event.currentTarget)}
                  endIcon={<ExpandMoreIcon />}
                  aria-controls={academyAnchor ? 'academy-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(academyAnchor)}
                  sx={{ color: location.pathname === link.path ? '#938B7E' : '#fff', textTransform: 'none', fontSize: '1rem' }}
                >
                  Academy
                </Button>
              ) : link.path === '/equipment' ? (
                <Button
                  key={link.path}
                  onClick={(event) => setEquipmentAnchor(event.currentTarget)}
                  endIcon={<ExpandMoreIcon />}
                  aria-controls={equipmentAnchor ? 'equipment-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(equipmentAnchor)}
                  sx={{ color: location.pathname === link.path ? '#938B7E' : '#fff', textTransform: 'none', fontSize: '1rem' }}
                >
                  Equipment
                </Button>
              ) : (
                <Link key={link.path} to={link.path}>
                  <Button
                    sx={{
                      color: location.pathname === link.path ? '#938B7E' : '#fff',
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:hover': { color: '#938B7E' },
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
                  color: '#938B7E',
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
        <MenuItem disabled sx={{ gridColumn: 1, gridRow: 2, opacity: '1 !important', color: '#6F756F', fontWeight: 'bold' }}>Residential</MenuItem>
        {residentialLinks.map((service, index) => (
          <MenuItem key={service.id} component={Link} to={`/services/residential/${service.id}`} onClick={() => setServicesAnchor(null)} sx={{ gridColumn: 1, gridRow: index + 3, fontSize: 14 }}>
            {service.label}
          </MenuItem>
        ))}
        <MenuItem component={Link} to="/services#commercial-services" onClick={() => setServicesAnchor(null)} sx={{ gridColumn: 2, gridRow: 2, color: '#6F756F', fontWeight: 'bold' }}>Commercial Cleaning</MenuItem>
        {commercialServices.map((service, index) => (
          <MenuItem key={service.id} component={Link} to={`/services/commercial/${service.id}`} onClick={() => setServicesAnchor(null)} sx={{ gridColumn: 2, gridRow: index + 3, fontSize: 14 }}>
            {service.label}
          </MenuItem>
        ))}
      </Menu>

      <Menu id="academy-menu" anchorEl={academyAnchor} open={Boolean(academyAnchor)} onClose={() => setAcademyAnchor(null)} slotProps={{ paper: { sx: { borderRadius: 2, mt: 1, minWidth: 230 } } }}>
        <MenuItem component={Link} to="/drone-training" onClick={() => setAcademyAnchor(null)} sx={{ fontWeight: 700, borderBottom: '1px solid #E4E0D8' }}>Academy Overview</MenuItem>
        {academyLinks.map(item => <MenuItem key={item.path} component={Link} to={item.path} onClick={() => setAcademyAnchor(null)}>{item.label}</MenuItem>)}
      </Menu>

      <Menu id="equipment-menu" anchorEl={equipmentAnchor} open={Boolean(equipmentAnchor)} onClose={() => setEquipmentAnchor(null)} slotProps={{ paper: { sx: { borderRadius: 2, mt: 1, minWidth: 220 } } }}>
        <MenuItem component={Link} to="/equipment" onClick={() => setEquipmentAnchor(null)} sx={{ fontWeight: 700, borderBottom: '1px solid #E4E0D8' }}>Equipment Overview</MenuItem>
        {equipmentLinks.map(item => <MenuItem key={item.path} component={Link} to={item.path} onClick={() => setEquipmentAnchor(null)}>{item.label}</MenuItem>)}
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: '#252927',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
