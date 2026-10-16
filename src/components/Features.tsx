import { Box, Container, Grid, Typography } from '@mui/material'

const features = [
  ['01', 'Modern equipment', 'Purpose-selected drone systems for precise and efficient work.'],
  ['02', 'Careful planning', 'Each site and training enquiry is considered before we recommend a path.'],
  ['03', 'Professional support', 'Clear communication from your first question through to the next step.'],
  ['04', 'Sydney based', 'Local support for property owners, businesses and aspiring drone pilots.'],
]

export default function Features() {
  return <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F0EEE8' }}><Container maxWidth="lg">
    <Typography sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, color: '#76766F', mb: 2 }}>Why Jamien</Typography>
    <Typography component="h2" sx={{ fontSize: { xs: 36, md: 54 }, lineHeight: 1.08, letterSpacing: -2, maxWidth: 720, mb: { xs: 6, md: 9 } }}>One drone business. Clear pathways for different needs.</Typography>
    <Grid container spacing={{ xs: 4, md: 2 }}>{features.map(([number,title,description]) => <Grid item xs={12} sm={6} md={3} key={number}>
      <Box sx={{ borderTop: '1px solid #BEBBB3', pt: 2.5, pr: 3 }}><Typography sx={{ color: '#938B7E', fontSize: 12, mb: 4 }}>{number}</Typography><Typography component="h3" sx={{ fontSize: 20, fontWeight: 600, mb: 1.5 }}>{title}</Typography><Typography sx={{ color: '#666760', lineHeight: 1.7, fontSize: 14 }}>{description}</Typography></Box>
    </Grid>)}</Grid>
  </Container></Box>
}
