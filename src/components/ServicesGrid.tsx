import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const pathways = [
  ['Cleaning', 'Residential roofs, exterior surfaces, solar panels and commercial buildings.', '/services', 'View cleaning services'],
  ['Academy', 'RePL course enquiries, licence upgrades and group training pathways.', '/drone-training', 'Explore drone training'],
  ['Equipment', 'Drone cleaning systems and practical equipment support are being developed.', '/equipment', 'Explore equipment'],
]

export default function ServicesGrid() {
  return <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAF9F5' }}><Container maxWidth="lg">
    <Grid container spacing={{ xs: 5, md: 8 }}><Grid item xs={12} md={5}>
      <Typography sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, color: '#76766F', mb: 2 }}>Choose your pathway</Typography>
      <Typography component="h2" sx={{ fontSize: { xs: 36, md: 54 }, lineHeight: 1.08, letterSpacing: -2, mb: 3 }}>What can we help you achieve?</Typography>
      <Typography sx={{ color: '#666760', lineHeight: 1.8, maxWidth: 420 }}>Each part of Jamien Drone has its own information and enquiry path, while sharing one experienced team.</Typography>
    </Grid><Grid item xs={12} md={7}>
      {pathways.map(([title,description,path,action], index) => <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '54px 1fr', borderTop: '1px solid #C9C6BE', py: 3.2 }}>
        <Typography sx={{ color: '#938B7E', fontSize: 12 }}>0{index+1}</Typography><Box><Typography component="h3" sx={{ fontSize: { xs: 25, md: 29 }, mb: 1 }}>{title}</Typography><Typography sx={{ color: '#666760', mb: 1.5 }}>{description}</Typography><Button component={Link} to={path} sx={{ color: '#303532', borderRadius: 0, p: 0, textTransform: 'none', borderBottom: '1px solid #8F887D' }}>{action} ↗</Button></Box>
      </Box>)}
    </Grid></Grid>
  </Container></Box>
}
