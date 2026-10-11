import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ArrowForward, CheckCircleOutline, ExpandMore, SearchOutlined, DescriptionOutlined, CleaningServicesOutlined, TaskAltOutlined, RoofingOutlined, GridViewOutlined, HomeOutlined, WbSunnyOutlined, WindowOutlined } from '@mui/icons-material'
import { residentialServices } from '../data/residentialServices'
import { updatePageMeta } from '../utils/seo'

const yellow = '#ffd700'
const heroContent = {
  'roof-cleaning': { line: 'A fresher roof. A home that shines.', copy: 'Roof cleaning and softwash treatments, tailored to your roof.', icon: RoofingOutlined },
  'driveway-cleaning': { line: 'A better welcome home.', copy: 'Refresh your driveway and paths with surface-appropriate cleaning.', icon: GridViewOutlined },
  'house-washing': { line: 'Let your home shine again.', copy: 'Exterior washing that brings a fresh look to your home.', icon: HomeOutlined },
  'solar-panel-cleaning': { line: 'A clean start for your panels.', copy: 'Clear away surface build-up with a tailored panel-cleaning plan.', icon: WbSunnyOutlined },
  'window-cleaning': { line: 'Enjoy a clearer view.', copy: 'Exterior window cleaning for a brighter-looking home.', icon: WindowOutlined },
}
export default function ResidentialService() {
  const { serviceId } = useParams()
  const service = residentialServices.find(item => item.id === serviceId)
  useEffect(() => {
    if (service) updatePageMeta(`${service.label} Sydney | Jamien Drone Cleaning`, service.intro, `https://www.jamiendrone.com.au/services/residential/${service.id}`)
  }, [service])
  if (!service) return <Container sx={{ py: 10 }}><Typography variant="h3">Service not found</Typography><Button component={Link} to="/services">View our services</Button></Container>
  const hero = heroContent[service.id]
  const HeroIcon = hero.icon
  const quoteUrl = `/contact?service=${encodeURIComponent(service.label)}`
  return <>
    <Box component="section" sx={{ bgcolor: '#f5f3ed', position: 'relative', overflow: 'hidden', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={9}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
              <Box sx={{ width: 24, height: 3, bgcolor: '#d9ac00' }} />
              <Typography sx={{ color: '#68685e', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>Residential / Sydney</Typography>
            </Stack>
            <Typography component="h1" sx={{ color: '#222a23', fontSize: { xs: 38, sm: 48, md: 64 }, fontWeight: 750, lineHeight: 1.06, letterSpacing: '-.045em', mb: 2.5 }}>{service.label}</Typography>
            <Typography sx={{ color: '#60645b', fontSize: { xs: 17, md: 19 }, lineHeight: 1.65, maxWidth: 600, mb: 3.5 }}>{hero.copy}</Typography>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
              <Button component={Link} to={quoteUrl} endIcon={<ArrowForward sx={{ fontSize: 18 }} />} sx={{ bgcolor: '#222a23', color: '#fff', px: 3, py: 1.6, borderRadius: 1, textTransform: 'none', fontWeight: 650, '&:hover': { bgcolor: '#40513d' } }}>Get a Free Quote</Button>
              <Button component="a" href="tel:+61435116503" sx={{ color: '#353e33', textTransform: 'none', fontSize: 14 }}>0435 116 503</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ width: 190, height: 190, ml: 'auto', borderRadius: '50%', bgcolor: '#e8e8dc', position: 'relative', display: 'grid', placeItems: 'center' }}>
              <HeroIcon sx={{ fontSize: 90, color: '#52614b', stroke: '#e8e8dc', strokeWidth: .2 }} />
              <Box sx={{ width: 42, height: 42, borderRadius: '50%', bgcolor: yellow, position: 'absolute', right: 2, bottom: 8, display: 'grid', placeItems: 'center', fontSize: 26, color: '#31402d' }}>✦</Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}><Typography sx={{ color: '#66766c', fontWeight: 700, letterSpacing: 2, fontSize: 12, mb: 2 }}>A HOME WORTH CARING FOR</Typography><Typography variant="h3" component="h2" sx={{ fontWeight: 750, fontSize: { xs: 32, md: 40 }, mb: 3 }}>{service.benefit}</Typography><Typography sx={{ color: '#546057', lineHeight: 1.9, fontSize: 18 }}>{service.story}</Typography><Typography sx={{ mt: 3, color: '#546057', lineHeight: 1.8 }}>{service.surfaces}</Typography></Grid>
        <Grid item xs={12} md={6}><Box sx={{ bgcolor: '#f6f5ef', p: { xs: 3, md: 4 }, borderRadius: 3 }}><Typography component="h2" variant="h5" sx={{ fontWeight: 700, mb: 3 }}>What we plan with you</Typography>{service.included.map(item => <Stack key={item} direction="row" spacing={2} sx={{ mb: 2.5 }}><CheckCircleOutline sx={{ color: '#536e58', mt: .3 }} /><Typography sx={{ lineHeight: 1.7 }}>{item}</Typography></Stack>)}</Box></Grid>
      </Grid>
      <Box sx={{ mt: 7, borderLeft: '4px solid #ffd700', bgcolor: '#fffbea', p: 3 }}><Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>What to expect</Typography><Typography sx={{ lineHeight: 1.8, color: '#546057' }}>{service.expectation}</Typography></Box>
    </Container>
    <Box component="section" aria-labelledby="cleaning-process" sx={{ bgcolor: '#f5f3ed', py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 7 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: 120 }}>
              <Typography sx={{ color: '#68745f', fontSize: 11, fontWeight: 700, letterSpacing: 2.2, mb: 2 }}>THE SIMPLE PART</Typography>
              <Typography id="cleaning-process" component="h2" sx={{ color: '#243021', fontSize: { xs: 34, md: 44 }, fontWeight: 750, lineHeight: 1.12, letterSpacing: '-.04em', mb: 2.5 }}>You enjoy your home.<br />We handle the clean.</Typography>
              <Typography sx={{ color: '#686d61', fontSize: 16, lineHeight: 1.8, maxWidth: 330, mb: 3 }}>A clear quote, a considered approach and helpful advice. Here’s how we get there.</Typography>
              <Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ p: 0, color: '#334b2e', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: 'transparent', color: '#6b7c47' } }}>Let’s get started</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {[
                { icon: SearchOutlined, title: 'A quick conversation', text: 'Share your suburb and a few photos. We assess your surfaces and access.', bg: '#e8ecdf' },
                { icon: DescriptionOutlined, title: 'A quote that’s clear', text: 'Know the price, scope and expected results before you book.', bg: '#f0e8d5' },
                { icon: CleaningServicesOutlined, title: 'Leave the clean to us', text: 'We agree on a date, explain preparation and carry out your clean.', bg: '#fffdf8' },
                { icon: TaskAltOutlined, title: 'The finishing touches', text: service.id === 'roof-cleaning' ? 'We check treated areas and explain aftercare, including gradual roof weathering.' : 'We check the work, tidy up and share helpful care advice.', bg: '#e7ebe6' },
              ].map((step, index) => {
                const StepIcon = step.icon
                return <Box component="li" key={step.title} sx={{ bgcolor: step.bg, borderRadius: 2, p: { xs: 3, md: 3.5 }, minHeight: { sm: 225 }, display: 'flex', flexDirection: 'column', transition: 'transform .2s ease', '@media (hover: hover)': { '&:hover': { transform: 'translateY(-4px)' } }, '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3.5 }}>
                    <StepIcon sx={{ fontSize: 27, color: '#516047' }} />
                    <Typography aria-hidden="true" sx={{ fontSize: 13, color: '#7c846f', fontWeight: 700, letterSpacing: 1 }}>0{index + 1}</Typography>
                  </Stack>
                  <Typography component="h3" sx={{ fontSize: 20, color: '#293322', fontWeight: 700, letterSpacing: '-.025em', mb: 1.2 }}>{step.title}</Typography>
                  <Typography sx={{ fontSize: 15, color: '#626a58', lineHeight: 1.75, maxWidth: 290 }}>{step.text}</Typography>
                </Box>
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Container maxWidth="md" sx={{ py: 8 }}><Typography component="h2" variant="h3" sx={{ fontWeight: 750, fontSize: 36, mb: 4 }}>Your questions, answered.</Typography>{service.faqs.map(([question, answer]) => <Accordion key={question} disableGutters elevation={0} sx={{ borderBottom: '1px solid #ddd', '&:before': { display: 'none' } }}><AccordionSummary expandIcon={<ExpandMore />} sx={{ py: 1 }}><Typography sx={{ fontWeight: 650 }}>{question}</Typography></AccordionSummary><AccordionDetails><Typography sx={{ color: '#546057', lineHeight: 1.8 }}>{answer}</Typography></AccordionDetails></Accordion>)}</Container>
    <Container maxWidth="lg" sx={{ pb: 8 }}><Box sx={{ bgcolor: '#24372b', color: '#fff', p: { xs: 4, md: 6 }, borderRadius: 3 }}><Typography component="h2" variant="h4" sx={{ fontWeight: 750, mb: 2 }}>{service.prompt}</Typography><Typography sx={{ color: '#d0d9d2', mb: 3, lineHeight: 1.8 }}>{service.detail} We serve Sydney’s North Shore, Inner West and surrounding areas — ask us about your suburb.</Typography><Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ bgcolor: yellow, color: '#111', px: 3, py: 1.5, fontWeight: 700, '&:hover': { bgcolor: '#ffed77' } }}>Get My Free Quote</Button></Box><Typography component="h2" variant="h6" sx={{ mt: 5, mb: 2 }}>Explore other residential services</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{residentialServices.filter(item => item.id !== service.id).map(item => <Button key={item.id} component={Link} to={`/services/residential/${item.id}`} variant="outlined" sx={{ textTransform: 'none' }}>{item.label}</Button>)}</Stack></Container>
  </>
}
