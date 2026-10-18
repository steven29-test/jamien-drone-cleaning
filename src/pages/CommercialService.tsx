import ContactActions from '../components/ContactActions'
import QuoteButton from '../components/QuoteButton'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ArrowForward, ExpandMore, CheckCircleOutline, WarehouseOutlined, ApartmentOutlined, SchoolOutlined, BusinessOutlined, DomainOutlined, SearchOutlined, DescriptionOutlined, CleaningServicesOutlined, TaskAltOutlined } from '@mui/icons-material'
import { commercialServices } from '../data/commercialServices'
import { updatePageMeta } from '../utils/seo'

const icons = { warehouse: WarehouseOutlined, apartment: ApartmentOutlined, school: SchoolOutlined, office: BusinessOutlined, strata: DomainOutlined }
export default function CommercialService() {
  const { serviceId } = useParams()
  const service = commercialServices.find(item => item.id === serviceId)
  useEffect(() => {
    if (service) updatePageMeta(`${service.label} Sydney | Exterior Cleaning | Jamien Drone`, service.description, `https://www.jamiendrone.com.au/services/commercial/${service.id}`)
  }, [service])
  if (!service) return <Container sx={{ py: 10 }}><Typography variant="h3">Service not found</Typography><Button component={Link} to="/services">View all services</Button></Container>
  const Icon = icons[service.icon]
  const quoteUrl = `/contact?service=${encodeURIComponent(service.label)}`
  const url = `https://www.jamiendrone.com.au/services/commercial/${service.id}`
  const primaryButton = { bgcolor: '#938B7E', color: '#16231d', px: 3, py: 1.5, textTransform: 'none', fontWeight: 700, borderRadius: 1.5, '&:hover': { bgcolor: '#AAA296' } }
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', name: `${service.label} — Exterior Cleaning`, serviceType: `${service.label} exterior services`, description: service.description, url, areaServed: { '@type': 'City', name: 'Sydney' }, provider: { '@type': 'Organization', name: 'Jamien Drone Cleaning', url: 'https://www.jamiendrone.com.au', telephone: '+61435116503' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Services', item: 'https://www.jamiendrone.com.au/services' }, { '@type': 'ListItem', position: 2, name: service.label, item: url }] },
      { '@type': 'FAQPage', mainEntity: service.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  }
  return <>
    <Box component="section" sx={{ bgcolor: '#1c2c25', color: '#fff', py: { xs: 6, md: 9 }, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={1} sx={{ mb: 4, color: '#afc0b3', fontSize: 12 }}><Link to="/services" style={{ color: 'inherit' }}>Services</Link><span>/</span><span>Commercial</span></Stack>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={9}><Typography sx={{ color: '#e8d46c', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontSize: 11, mb: 2 }}>Sydney · Commercial exteriors</Typography><Typography component="h1" sx={{ fontSize: { xs: 38, md: 60 }, lineHeight: 1.08, letterSpacing: '-.04em', fontWeight: 750, mb: 2 }}>{service.label}</Typography><Typography sx={{ fontSize: { xs: 17, md: 20 }, color: '#c5d0c8', lineHeight: 1.7, maxWidth: 680, mb: 3.5 }}>{service.intro}</Typography><ContactActions quoteUrl={quoteUrl} dark /></Grid>
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}><Box sx={{ width: 180, height: 180, borderRadius: 4, border: '1px solid #53695a', bgcolor: '#283f31', display: 'grid', placeItems: 'center', transform: 'rotate(5deg)', ml: 'auto' }}><Icon sx={{ color: '#e8d46c', fontSize: 90, transform: 'rotate(-5deg)' }} /></Box></Grid>
        </Grid>
      </Container>
    </Box>
    <Box sx={{ bgcolor: '#f4f2e9', py: 2.5 }}><Container maxWidth="lg"><Typography sx={{ color: '#5e695e', fontSize: 14 }}>{service.audience}</Typography></Container></Box>
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
      <Grid container spacing={6} alignItems="start"><Grid item xs={12} md={7}><Typography sx={{ color: '#7a8068', fontSize: 11, fontWeight: 700, letterSpacing: 2, mb: 2 }}>PROPERTY PRESENTATION, CONSIDERED</Typography><Typography component="h2" sx={{ fontSize: { xs: 30, md: 40 }, letterSpacing: '-.035em', fontWeight: 700, color: '#24382a', lineHeight: 1.2, mb: 2.5 }}>{service.heading}</Typography><Typography sx={{ color: '#61695c', fontSize: 17, lineHeight: 1.85, maxWidth: 650 }}>{service.story}</Typography></Grid><Grid item xs={12} md={5}><Box sx={{ borderLeft: '3px solid #d9bf43', pl: 3, py: 1 }}><Typography sx={{ fontSize: 23, fontWeight: 650, color: '#2c4430', lineHeight: 1.5, mb: 2 }}>{service.title}</Typography><Typography sx={{ color: '#69715f', fontSize: 14, lineHeight: 1.8 }}>Tell us what matters most: the areas to clean, the access available and the timing that suits your property.</Typography></Box></Grid></Grid>
      <Typography component="h2" sx={{ fontSize: 27, fontWeight: 700, color: '#263e2b', mt: 7, mb: 3 }}>Build the scope around your site.</Typography><Grid container spacing={3}>{service.areas.map(([title, text], index) => <Grid item xs={12} md={4} key={title}><Box sx={{ height: '100%', bgcolor: '#f6f7f1', borderRadius: 2, p: 3.5 }}><Typography sx={{ color: '#849276', fontWeight: 750, fontSize: 13, mb: 2 }}>0{index + 1}</Typography><Typography component="h3" sx={{ fontSize: 20, fontWeight: 700, color: '#263e2b', mb: 1.5 }}>{title}</Typography><Typography sx={{ color: '#65705e', lineHeight: 1.8, fontSize: 15 }}>{text}</Typography></Box></Grid>)}</Grid>
    </Container>
    <Box component="section" sx={{ bgcolor: '#f5f3ed', py: 8 }}><Container maxWidth="lg"><Grid container spacing={5}><Grid item xs={12} md={5}><Typography component="h2" sx={{ fontSize: 34, lineHeight: 1.2, letterSpacing: '-.035em', color: '#263e2b', fontWeight: 700, mb: 2 }}>Good planning makes<br />the difference.</Typography><Typography sx={{ color: '#63705d', lineHeight: 1.8 }}>We discuss the practical details before work starts. Drone access is considered for suitable elevated surfaces; the method is selected for your site.</Typography></Grid><Grid item xs={12} md={7}>{service.considerations.map(item => <Stack key={item} direction="row" spacing={2} sx={{ py: 1.8, borderBottom: '1px solid #dfdfd2' }}><CheckCircleOutline sx={{ color: '#738455' }} /><Typography sx={{ color: '#354b34', lineHeight: 1.6 }}>{item}</Typography></Stack>)}</Grid></Grid><Box sx={{ mt: 4, bgcolor: '#fffdf4', borderRadius: 2, p: 3 }}><Typography sx={{ fontWeight: 700, color: '#526044', mb: 1 }}>A clear scope, from the start</Typography><Typography sx={{ color: '#69705f', lineHeight: 1.8, fontSize: 14 }}>{service.note}</Typography></Box></Container></Box>
    <Container maxWidth="lg" sx={{ py: 8 }}><Typography component="h2" sx={{ textAlign: 'center', fontSize: 36, fontWeight: 700, letterSpacing: '-.035em', color: '#263e2b', mb: 4 }}>From enquiry to a clear handover.</Typography><Box component="ol" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 3, p: 0, m: 0, listStyle: 'none' }}>{[
      { icon: SearchOutlined, title: 'Review your site', text: 'Share your requirements. We assess surfaces, access and whether a site visit is needed.', bg: '#e6efd8' },
      { icon: DescriptionOutlined, title: 'Agree the scope', text: 'Review your tailored quote, method, work areas and expected results.', bg: '#fff0bd' },
      { icon: CleaningServicesOutlined, title: 'Coordinate & clean', text: 'Agree the work window and access controls, then proceed under suitable conditions.', bg: '#dff0ef' },
      { icon: TaskAltOutlined, title: 'Check & hand over', text: 'Review completed work and any aftercare, including gradual weathering after roof treatment.', bg: '#f1e5ef' },
    ].map((step,index) => { const StepIcon=step.icon; return <Box component="li" key={step.title} sx={{ bgcolor: step.bg, borderRadius: 3, p: 3, height: '100%' }}><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}><StepIcon sx={{ fontSize: 30, color: '#65794f' }} /><Typography sx={{ fontSize: 23, fontWeight: 750, color: '#8a997b' }}>0{index+1}</Typography></Stack><Typography component="h3" sx={{ fontSize: 19, fontWeight: 700, color: '#293d29', minHeight: { md: 50 }, mb: 1 }}>{step.title}</Typography><Typography sx={{ color: '#63705b', fontSize: 15, lineHeight: 1.8 }}>{step.text}</Typography></Box> })}</Box></Container>
    <Container maxWidth="md" sx={{ pb: 8 }}><Typography component="h2" sx={{ fontSize: 34, fontWeight: 700, letterSpacing: '-.03em', mb: 3, color: '#263e2b' }}>Before you book.</Typography>{service.faqs.map(([question, answer]) => <Accordion key={question} disableGutters elevation={0} sx={{ borderBottom: '1px solid #ddd', '&:before': { display: 'none' } }}><AccordionSummary expandIcon={<ExpandMore />} sx={{ py: 1 }}><Typography sx={{ fontWeight: 650, color: '#364a34' }}>{question}</Typography></AccordionSummary><AccordionDetails><Typography sx={{ color: '#62705d', lineHeight: 1.8 }}>{answer}</Typography></AccordionDetails></Accordion>)}</Container>
    <Container maxWidth="lg" sx={{ pb: 8 }}><Box sx={{ bgcolor: '#24392c', color: '#fff', borderRadius: 3, p: { xs: 4, md: 6 } }}><Typography component="h2" sx={{ fontSize: { xs: 29, md: 38 }, letterSpacing: '-.03em', fontWeight: 700, mb: 2 }}>Let’s plan your property’s next clean.</Typography><Typography sx={{ color: '#c6d4c8', lineHeight: 1.8, maxWidth: 760, mb: 3 }}>{service.enquiry}</Typography><QuoteButton quoteUrl={quoteUrl} endIcon={<ArrowForward />} sx={primaryButton}>Get a Free Quote</QuoteButton><Typography sx={{ mt: 3, fontSize: 13, color: '#b2c4b6' }}>Sydney North Shore, Inner West and surrounding areas. Ask us about your site.</Typography></Box><Typography component="h2" sx={{ mt: 4, mb: 2, fontSize: 18, fontWeight: 700 }}>More commercial services</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{commercialServices.filter(item => item.id!==service.id).map(item => <Button key={item.id} component={Link} to={`/services/commercial/${item.id}`} variant="outlined" sx={{ textTransform: 'none' }}>{item.label}</Button>)}</Stack></Container>
    <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
  </>
}
