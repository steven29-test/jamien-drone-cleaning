import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ArrowForward, CheckCircleOutline, ExpandMore, HomeOutlined, RoofingOutlined, WbSunnyOutlined, WindowOutlined, GridViewOutlined, SearchOutlined, DescriptionOutlined, CleaningServicesOutlined, TaskAltOutlined } from '@mui/icons-material'
import { residentialServices } from '../data/residentialServices'
import { updatePageMeta } from '../utils/seo'

const icons = { roof: RoofingOutlined, path: GridViewOutlined, house: HomeOutlined, solar: WbSunnyOutlined, window: WindowOutlined }
const yellow = '#ffd700'
export default function ResidentialService() {
  const { serviceId } = useParams()
  const service = residentialServices.find(item => item.id === serviceId)
  useEffect(() => {
    if (service) updatePageMeta(`${service.label} Sydney | Jamien Drone Cleaning`, service.intro, `https://www.jamiendrone.com.au/services/residential/${service.id}`)
  }, [service])
  if (!service) return <Container sx={{ py: 10 }}><Typography variant="h3">Service not found</Typography><Button component={Link} to="/services">View our services</Button></Container>
  const Icon = icons[service.icon]
  const quoteUrl = `/contact?service=${encodeURIComponent(service.label)}`
  return <>
    <Box component="section" sx={{ background: 'linear-gradient(125deg, #171b19 0%, #28382f 100%)', color: '#fff', py: { xs: 7, md: 11 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 5, color: '#c4cec6' }}><Link to="/services" style={{ color: 'inherit' }}>Services</Link> / Residential / {service.label}</Typography>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography sx={{ color: yellow, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, fontWeight: 700, mb: 2 }}>{service.label} · Sydney</Typography>
            <Typography component="h1" sx={{ fontSize: { xs: '2.7rem', md: '4.3rem' }, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.04em', maxWidth: 750, mb: 3 }}>{service.title}</Typography>
            <Typography sx={{ color: '#d9e0db', fontSize: 19, lineHeight: 1.75, maxWidth: 660, mb: 4 }}>{service.intro}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ bgcolor: yellow, color: '#171b19', px: 3, py: 1.7, fontWeight: 700, '&:hover': { bgcolor: '#ffed77' } }}>Request a Free Quote</Button>
              <Button component="a" href="tel:+61435116503" sx={{ color: '#fff', border: '1px solid #728078', px: 3, py: 1.7 }}>Call 0435 116 503</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #637267', borderRadius: '50% 50% 12px 12px', p: 5, textAlign: 'center', bgcolor: 'rgba(255,255,255,.04)' }}>
              <Icon sx={{ fontSize: { xs: 95, md: 140 }, color: yellow, mb: 3 }} />
              <Typography sx={{ fontSize: 22, lineHeight: 1.5 }}>{service.eyebrow}</Typography>
              <Typography sx={{ color: '#c4cec6', mt: 2, fontSize: 13 }}>Your home. Your surfaces. A tailored approach.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box sx={{ bgcolor: '#f6f5ef', borderBottom: '1px solid #e4e3d9', py: 2.5 }}><Container><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}><Typography>Surface-appropriate cleaning</Typography><Typography>Clear scope before work starts</Typography><Typography>Free, tailored quotes</Typography></Stack></Container></Box>
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}><Typography sx={{ color: '#66766c', fontWeight: 700, letterSpacing: 2, fontSize: 12, mb: 2 }}>A HOME WORTH CARING FOR</Typography><Typography variant="h3" component="h2" sx={{ fontWeight: 750, fontSize: { xs: 32, md: 40 }, mb: 3 }}>{service.benefit}</Typography><Typography sx={{ color: '#546057', lineHeight: 1.9, fontSize: 18 }}>{service.story}</Typography><Typography sx={{ mt: 3, color: '#546057', lineHeight: 1.8 }}>{service.surfaces}</Typography></Grid>
        <Grid item xs={12} md={6}><Box sx={{ bgcolor: '#f6f5ef', p: { xs: 3, md: 4 }, borderRadius: 3 }}><Typography component="h2" variant="h5" sx={{ fontWeight: 700, mb: 3 }}>What we plan with you</Typography>{service.included.map(item => <Stack key={item} direction="row" spacing={2} sx={{ mb: 2.5 }}><CheckCircleOutline sx={{ color: '#536e58', mt: .3 }} /><Typography sx={{ lineHeight: 1.7 }}>{item}</Typography></Stack>)}</Box></Grid>
      </Grid>
      <Box sx={{ mt: 7, borderLeft: '4px solid #ffd700', bgcolor: '#fffbea', p: 3 }}><Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>What to expect</Typography><Typography sx={{ lineHeight: 1.8, color: '#546057' }}>{service.expectation}</Typography></Box>
    </Container>
    <Box component="section" aria-labelledby="cleaning-process" sx={{ bgcolor: '#18251d', color: '#fff', py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6 }}>
          <Typography sx={{ color: yellow, fontSize: 12, letterSpacing: 2, fontWeight: 700, mb: 2 }}>HOW IT WORKS</Typography>
          <Typography id="cleaning-process" component="h2" sx={{ fontSize: { xs: 32, md: 42 }, fontWeight: 750, lineHeight: 1.2, mb: 2 }}>A cleaner home, in four clear steps.</Typography>
          <Typography sx={{ color: '#c6d2c9', lineHeight: 1.8 }}>Know what happens next — from your first enquiry to the finishing touches.</Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            { number: '01', icon: SearchOutlined, title: 'Assess & Advise', text: 'Tell us what you would like cleaned and share a few photos. We review the surface, condition and access, and let you know if a site visit is needed.', detail: 'A plan suited to your property.' },
            { number: '02', icon: DescriptionOutlined, title: 'Your Free Quote', text: 'Receive a tailored quote with the agreed areas, cleaning approach and price. We explain expected results and any optional extras before you decide.', detail: 'Clear scope. An informed choice.' },
            { number: '03', icon: CleaningServicesOutlined, title: 'Prepare & Clean', text: 'Once you accept, we arrange a suitable date and explain how to prepare. On the day, we check the work area and clean or apply treatment using the agreed method.', detail: 'The right approach for your surfaces.' },
            { number: '04', icon: TaskAltOutlined, title: 'Final Check & Aftercare', text: service.id === 'roof-cleaning'
              ? 'We review the treated areas, tidy our work area and explain aftercare. For wash-on, weather-off roof treatments, we explain what will continue to change as growth weathers away.'
              : 'We review the completed areas, tidy our work area and explain any remaining marks or care advice. You know what was completed and how to care for the cleaned surfaces.', detail: 'A clear handover, with helpful advice.' },
          ].map((step, index) => {
            const StepIcon = step.icon
            return <Grid item xs={12} sm={6} md={3} key={step.number}>
              <Box sx={{ height: '100%', position: 'relative', bgcolor: '#26382c', border: '1px solid #435a48', borderRadius: 3, p: 3, pt: 4, display: 'flex', flexDirection: 'column', '&:hover': { borderColor: yellow }, transition: 'border-color .2s' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ width: 54, height: 54, borderRadius: 2, bgcolor: 'rgba(255,215,0,.1)', display: 'grid', placeItems: 'center' }}><StepIcon sx={{ color: yellow, fontSize: 30 }} /></Box>
                  <Typography aria-hidden="true" sx={{ color: '#a5b7aa', fontSize: 30, fontWeight: 750 }}>{step.number}</Typography>
                </Box>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{step.title}</Typography>
                <Typography sx={{ color: '#d0dad3', lineHeight: 1.85, fontSize: 15, mb: 3, flexGrow: 1 }}>{step.text}</Typography>
                <Typography sx={{ borderTop: '1px solid #435a48', pt: 2, color: '#e9edd9', fontSize: 13, fontWeight: 600 }}>{step.detail}</Typography>
                {index < 3 && <ArrowForward aria-hidden="true" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: -25, top: 60, color: yellow, zIndex: 1, fontSize: 22 }} />}
              </Box>
            </Grid>
          })}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ bgcolor: yellow, color: '#18251d', px: 3, py: 1.5, fontWeight: 700, '&:hover': { bgcolor: '#ffed77' } }}>Start with a Free Quote</Button>
          <Typography sx={{ color: '#bdccc1', mt: 2, fontSize: 13 }}>Share your suburb and a few photos to get started.</Typography>
        </Box>
      </Container>
    </Box>
    <Container maxWidth="md" sx={{ py: 8 }}><Typography component="h2" variant="h3" sx={{ fontWeight: 750, fontSize: 36, mb: 4 }}>Your questions, answered.</Typography>{service.faqs.map(([question, answer]) => <Accordion key={question} disableGutters elevation={0} sx={{ borderBottom: '1px solid #ddd', '&:before': { display: 'none' } }}><AccordionSummary expandIcon={<ExpandMore />} sx={{ py: 1 }}><Typography sx={{ fontWeight: 650 }}>{question}</Typography></AccordionSummary><AccordionDetails><Typography sx={{ color: '#546057', lineHeight: 1.8 }}>{answer}</Typography></AccordionDetails></Accordion>)}</Container>
    <Container maxWidth="lg" sx={{ pb: 8 }}><Box sx={{ bgcolor: '#24372b', color: '#fff', p: { xs: 4, md: 6 }, borderRadius: 3 }}><Typography component="h2" variant="h4" sx={{ fontWeight: 750, mb: 2 }}>{service.prompt}</Typography><Typography sx={{ color: '#d0d9d2', mb: 3, lineHeight: 1.8 }}>{service.detail} We serve Sydney’s North Shore, Inner West and surrounding areas — ask us about your suburb.</Typography><Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ bgcolor: yellow, color: '#111', px: 3, py: 1.5, fontWeight: 700, '&:hover': { bgcolor: '#ffed77' } }}>Get My Free Quote</Button></Box><Typography component="h2" variant="h6" sx={{ mt: 5, mb: 2 }}>Explore other residential services</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{residentialServices.filter(item => item.id !== service.id).map(item => <Button key={item.id} component={Link} to={`/services/residential/${item.id}`} variant="outlined" sx={{ textTransform: 'none' }}>{item.label}</Button>)}</Stack></Container>
  </>
}
