import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined'
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { updatePageMeta } from '../utils/seo'

const palette = {
  ink: '#252927',
  taupe: '#938B7E',
  stone: '#E7E2D9',
  ivory: '#F3F0E9',
  paper: '#FBFAF7',
  muted: '#666B67',
}

export default function Equipment() {
  const { hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    updatePageMeta(
      'Drone Cleaning Equipment & Drones | Jamien Drone',
      'Explore professional drone cleaning sets and drones for commercial cleaning operations. Contact Jamien Drone for equipment guidance and availability.',
      'https://www.jamiendrone.com.au/equipment'
    )
  }, [])

  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [hash])

  return (
    <Box sx={{ bgcolor: palette.paper, color: palette.ink }}>
      <Box sx={{ bgcolor: palette.ivory, borderBottom: `1px solid ${palette.stone}`, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography sx={{ color: palette.taupe, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', mb: 2 }}>
            Jamien Drone Equipment
          </Typography>
          <Typography component="h1" sx={{ maxWidth: 820, fontFamily: 'Georgia, serif', fontSize: { xs: '2.7rem', md: '5rem' }, lineHeight: 1.02, letterSpacing: '-0.035em', mb: 3 }}>
            Practical equipment for professional drone cleaning.
          </Typography>
          <Typography sx={{ maxWidth: 680, color: palette.muted, fontSize: { xs: '1.08rem', md: '1.25rem' }, lineHeight: 1.75, mb: 4 }}>
            Explore complete cleaning setups and purpose-suited drones. Tell us about your work, and we’ll help you identify the equipment questions to resolve before you buy.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button component="a" href="#cleaning-sets" variant="contained" sx={{ bgcolor: palette.ink, px: 3, py: 1.5, textTransform: 'none', '&:hover': { bgcolor: '#3B403D' } }}>Explore equipment</Button>
            <Button component={Link} to="/contact?service=equipment" variant="outlined" sx={{ color: palette.ink, borderColor: palette.taupe, px: 3, py: 1.5, textTransform: 'none' }}>Make an enquiry</Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card id="cleaning-sets" sx={{ height: '100%', scrollMarginTop: '110px', bgcolor: '#ECE8E0', boxShadow: 'none', border: `1px solid ${palette.stone}`, borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <CleaningServicesOutlinedIcon sx={{ fontSize: 44, color: palette.taupe, mb: 4 }} />
                <Typography sx={{ color: palette.taupe, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1 }}>Equipment category 01</Typography>
                <Typography component="h2" sx={{ fontFamily: 'Georgia, serif', fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2 }}>Cleaning Sets</Typography>
                <Typography sx={{ color: palette.muted, fontSize: '1.06rem', lineHeight: 1.8, mb: 3 }}>
                  Cleaning systems can bring together water delivery, pumps, hose management, nozzles and the fittings needed for a planned operation.
                </Typography>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Discuss your requirements</Typography>
                <Typography sx={{ color: palette.muted, lineHeight: 1.8, mb: 4 }}>Surface type, working height, water supply, portability and compatibility with your chosen aircraft.</Typography>
                <Button component={Link} to="/contact?service=cleaning-set" endIcon={<ArrowForwardIcon />} sx={{ color: palette.ink, p: 0, textTransform: 'none', fontWeight: 800 }}>Enquire about cleaning sets</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card id="drones" sx={{ height: '100%', scrollMarginTop: '110px', bgcolor: palette.ink, color: '#fff', boxShadow: 'none', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <FlightOutlinedIcon sx={{ fontSize: 44, color: '#B6AEA1', mb: 4 }} />
                <Typography sx={{ color: '#B6AEA1', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1 }}>Equipment category 02</Typography>
                <Typography component="h2" sx={{ fontFamily: 'Georgia, serif', fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2 }}>Drones</Typography>
                <Typography sx={{ color: '#D8D5CE', fontSize: '1.06rem', lineHeight: 1.8, mb: 3 }}>
                  The right aircraft depends on payload, flight time, operating environment and how the cleaning system is integrated.
                </Typography>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Choose around the operation</Typography>
                <Typography sx={{ color: '#D8D5CE', lineHeight: 1.8, mb: 4 }}>Tell us whether you are starting, expanding a fleet or developing a dedicated commercial cleaning capability.</Typography>
                <Button component={Link} to="/contact?service=drones" endIcon={<ArrowForwardIcon />} sx={{ color: '#fff', p: 0, textTransform: 'none', fontWeight: 800 }}>Enquire about drones</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 8, md: 12 }, py: { xs: 6, md: 8 }, px: { xs: 3, md: 7 }, bgcolor: palette.ivory, borderRadius: 3, display: { md: 'flex' }, alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
          <Box>
            <Typography sx={{ color: palette.taupe, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1 }}>Equipment enquiries</Typography>
            <Typography component="h2" sx={{ fontFamily: 'Georgia, serif', fontSize: { xs: '2rem', md: '3rem' }, mb: 1 }}>Start with the job you need to do.</Typography>
            <Typography sx={{ color: palette.muted, maxWidth: 650, lineHeight: 1.7 }}>Availability, specifications and suitability will be confirmed for the equipment discussed. No purchase decision needs to start with guesswork.</Typography>
          </Box>
          <Button component={Link} to="/contact?service=equipment" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ mt: { xs: 3, md: 0 }, bgcolor: palette.taupe, color: '#fff', px: 3, py: 1.5, minWidth: 190, textTransform: 'none', '&:hover': { bgcolor: '#7E776C' } }}>Talk to Jamien</Button>
        </Box>
      </Container>
    </Box>
  )
}
