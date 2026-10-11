import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ArrowForward, CheckCircleOutline, ExpandMore, SearchOutlined, DescriptionOutlined, CleaningServicesOutlined, TaskAltOutlined } from '@mui/icons-material'
import { residentialServices } from '../data/residentialServices'
import { updatePageMeta } from '../utils/seo'

const yellow = '#ffd700'
export default function ResidentialService() {
  const { serviceId } = useParams()
  const service = residentialServices.find(item => item.id === serviceId)
  useEffect(() => {
    if (service) updatePageMeta(`${service.label} Sydney | Jamien Drone Cleaning`, service.intro, `https://www.jamiendrone.com.au/services/residential/${service.id}`)
  }, [service])
  if (!service) return <Container sx={{ py: 10 }}><Typography variant="h3">Service not found</Typography><Button component={Link} to="/services">View our services</Button></Container>
  const quoteUrl = `/contact?service=${encodeURIComponent(service.label)}`
  return <>
    <Box component="section" sx={{ bgcolor: '#f7f8f4', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography sx={{ color: '#687568', fontSize: 13, mb: 2 }}>Residential · Sydney</Typography>
        <Typography component="h1" sx={{ color: '#21392a', fontSize: { xs: 36, md: 56 }, fontWeight: 750, lineHeight: 1.15, letterSpacing: '-.025em', mb: 2 }}>{service.label}</Typography>
        <Typography sx={{ color: '#586359', fontSize: { xs: 16, md: 18 }, lineHeight: 1.7, maxWidth: 700, mb: 3 }}>{service.intro}</Typography>
        <Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ bgcolor: yellow, color: '#17251c', px: 3, py: 1.4, borderRadius: 2, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#ffed77' } }}>Get a Free Quote</Button>
        <Button component="a" href="tel:+61435116503" sx={{ ml: 2, color: '#324a39', textTransform: 'none' }}>0435 116 503</Button>
      </Container>
    </Box>
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}><Typography sx={{ color: '#66766c', fontWeight: 700, letterSpacing: 2, fontSize: 12, mb: 2 }}>A HOME WORTH CARING FOR</Typography><Typography variant="h3" component="h2" sx={{ fontWeight: 750, fontSize: { xs: 32, md: 40 }, mb: 3 }}>{service.benefit}</Typography><Typography sx={{ color: '#546057', lineHeight: 1.9, fontSize: 18 }}>{service.story}</Typography><Typography sx={{ mt: 3, color: '#546057', lineHeight: 1.8 }}>{service.surfaces}</Typography></Grid>
        <Grid item xs={12} md={6}><Box sx={{ bgcolor: '#f6f5ef', p: { xs: 3, md: 4 }, borderRadius: 3 }}><Typography component="h2" variant="h5" sx={{ fontWeight: 700, mb: 3 }}>What we plan with you</Typography>{service.included.map(item => <Stack key={item} direction="row" spacing={2} sx={{ mb: 2.5 }}><CheckCircleOutline sx={{ color: '#536e58', mt: .3 }} /><Typography sx={{ lineHeight: 1.7 }}>{item}</Typography></Stack>)}</Box></Grid>
      </Grid>
      <Box sx={{ mt: 7, borderLeft: '4px solid #ffd700', bgcolor: '#fffbea', p: 3 }}><Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>What to expect</Typography><Typography sx={{ lineHeight: 1.8, color: '#546057' }}>{service.expectation}</Typography></Box>
    </Container>
    <Box component="section" aria-labelledby="cleaning-process" sx={{ bgcolor: '#fafbf7', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography id="cleaning-process" component="h2" sx={{ color: '#21392a', fontSize: { xs: 29, md: 36 }, fontWeight: 700, mb: 1 }}>We make it easy.</Typography>
        <Typography sx={{ color: '#697269', mb: 5 }}>Four simple steps, from enquiry to aftercare.</Typography>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {[
            { icon: SearchOutlined, title: 'Tell us what you need', text: 'Share your suburb and a few photos. We’ll assess the surfaces and access.' },
            { icon: DescriptionOutlined, title: 'Get your free quote', text: 'A clear price and scope, with the cleaning method and expected results explained.' },
            { icon: CleaningServicesOutlined, title: 'We take care of the clean', text: 'Choose a suitable date. We’ll guide you through preparation and carry out the agreed work.' },
            { icon: TaskAltOutlined, title: 'Finish with clear advice', text: service.id === 'roof-cleaning' ? 'We check the treated areas and explain aftercare, including how roof growth continues to weather away.' : 'We check the work, tidy up and share any care advice for your cleaned surfaces.' },
          ].map((step, index) => {
            const StepIcon = step.icon
            return <Grid item xs={12} sm={6} md={3} key={step.title}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 48, height: 48, bgcolor: '#edf2e6', borderRadius: '50%', display: 'grid', placeItems: 'center' }}><StepIcon sx={{ fontSize: 24, color: '#526c43' }} /></Box>
                <Typography sx={{ color: '#95a28e', fontSize: 13, fontWeight: 700 }}>0{index + 1}</Typography>
              </Box>
              <Typography component="h3" sx={{ color: '#263e2b', fontSize: 18, fontWeight: 700, mb: 1 }}>{step.title}</Typography>
              <Typography sx={{ color: '#657063', fontSize: 15, lineHeight: 1.8 }}>{step.text}</Typography>
            </Grid>
          })}
        </Grid>
      </Container>
    </Box>
    <Container maxWidth="md" sx={{ py: 8 }}><Typography component="h2" variant="h3" sx={{ fontWeight: 750, fontSize: 36, mb: 4 }}>Your questions, answered.</Typography>{service.faqs.map(([question, answer]) => <Accordion key={question} disableGutters elevation={0} sx={{ borderBottom: '1px solid #ddd', '&:before': { display: 'none' } }}><AccordionSummary expandIcon={<ExpandMore />} sx={{ py: 1 }}><Typography sx={{ fontWeight: 650 }}>{question}</Typography></AccordionSummary><AccordionDetails><Typography sx={{ color: '#546057', lineHeight: 1.8 }}>{answer}</Typography></AccordionDetails></Accordion>)}</Container>
    <Container maxWidth="lg" sx={{ pb: 8 }}><Box sx={{ bgcolor: '#24372b', color: '#fff', p: { xs: 4, md: 6 }, borderRadius: 3 }}><Typography component="h2" variant="h4" sx={{ fontWeight: 750, mb: 2 }}>{service.prompt}</Typography><Typography sx={{ color: '#d0d9d2', mb: 3, lineHeight: 1.8 }}>{service.detail} We serve Sydney’s North Shore, Inner West and surrounding areas — ask us about your suburb.</Typography><Button component={Link} to={quoteUrl} endIcon={<ArrowForward />} sx={{ bgcolor: yellow, color: '#111', px: 3, py: 1.5, fontWeight: 700, '&:hover': { bgcolor: '#ffed77' } }}>Get My Free Quote</Button></Box><Typography component="h2" variant="h6" sx={{ mt: 5, mb: 2 }}>Explore other residential services</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{residentialServices.filter(item => item.id !== service.id).map(item => <Button key={item.id} component={Link} to={`/services/residential/${item.id}`} variant="outlined" sx={{ textTransform: 'none' }}>{item.label}</Button>)}</Stack></Container>
  </>
}
