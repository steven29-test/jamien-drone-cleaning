import { Box, Container, Grid, Typography } from '@mui/material'

const features = [
  ['01', 'Modern equipment', 'Purpose-selected drone systems for precise and efficient work.'],
  ['02', 'Careful planning', 'Each site and training enquiry is considered before we recommend a path.'],
  ['03', 'Professional support', 'Clear communication from your first question through to the next step.'],
  ['04', 'Sydney based', 'Local support for property owners, businesses and aspiring drone pilots.'],
]

function FeatureIcon({ index }: { index: number }) {
  const drawings = [
    <g key="drone"><rect x="21" y="25" width="14" height="11" rx="3" /><path d="m22 27-8-9m20 9 8-9M22 34l-8 8m20-8 8 8M25 36l-2 5m8-5 2 5" /><ellipse cx="12" cy="16" rx="8" ry="3" /><ellipse cx="44" cy="16" rx="8" ry="3" /><ellipse cx="12" cy="44" rx="8" ry="3" /><ellipse cx="44" cy="44" rx="8" ry="3" /><path d="M26 30h4" /></g>,
    <g key="plan"><path d="M21 12h-5a3 3 0 0 0-3 3v31a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3V15a3 3 0 0 0-3-3h-5" /><rect x="21" y="8" width="14" height="8" rx="3" /><path d="m20 26 3 3 5-6m4 4h5m-17 11 3 3 5-6m4 4h5" /></g>,
    <g key="support"><path d="M12 30v-3a16 16 0 0 1 32 0v3" /><rect x="9" y="27" width="8" height="15" rx="4" /><rect x="39" y="27" width="8" height="15" rx="4" /><path d="M43 42v1a6 6 0 0 1-6 6h-6" /><rect x="25" y="46" width="8" height="5" rx="2.5" /><path d="M22 28h.01M34 28h.01m-12 7c3 3 9 3 12 0" /></g>,
    <g key="sydney"><path d="M6 44h44M10 40h36M13 40l-3-12c7 0 13 4 18 12M22 40l-2-22c10 4 16 12 18 22M33 40l6-17c4 5 6 10 7 17M8 49c4-2 6 2 10 0s6 2 10 0 6 2 10 0 6 2 10 0" /></g>,
  ]
  return <Box sx={{ width: 64, height: 64, mb: 3.5, borderRadius: '18px', bgcolor: '#E4E7DF', color: '#657361', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[index]}</svg>
  </Box>
}

export default function Features() {
  return <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F0EEE8' }}><Container maxWidth="lg">
    <Typography sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, color: '#76766F', mb: 2 }}>Why Jamien</Typography>
    <Typography component="h2" sx={{ fontSize: { xs: 36, md: 54 }, lineHeight: 1.08, letterSpacing: -2, maxWidth: 720, mb: { xs: 6, md: 9 } }}>One drone business. Clear pathways for different needs.</Typography>
    <Grid container spacing={{ xs: 4, md: 2 }}>{features.map(([number,title,description], index) => <Grid item xs={12} sm={6} md={3} key={number}>
      <Box sx={{ borderTop: '1px solid #BEBBB3', pt: 3, pr: 3 }}><FeatureIcon index={index} /><Typography component="h3" sx={{ fontSize: 20, fontWeight: 600, mb: 1.5 }}>{title}</Typography><Typography sx={{ color: '#666760', lineHeight: 1.7, fontSize: 14 }}>{description}</Typography></Box>
    </Grid>)}</Grid>
  </Container></Box>
}
