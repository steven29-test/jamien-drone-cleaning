import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import { updatePageMeta } from '../utils/seo'

const courses = [
  { title: 'Under 2 kg corporate training', category: 'Getting started', icon: "M4 21V5h10v16M14 10h6v11M7 9h4M7 13h4M7 17h4M2 21h20", description: 'An introduction for teams and new operators exploring workplace drone use.', points: ['Discuss your team’s experience', 'Explore practical flying skills', 'Training scope confirmed on enquiry'] },
  { title: 'RePL training — under 7 kg', category: 'Getting started', icon: "M2 9l10-6 10 6-10 6-10-6ZM6 12v6l6 3 6-3v-6M22 9v9", description: 'Explore your first Remote Pilot Licence course and build a foundation for your next step.', points: ['Theory and practical training enquiries', 'Aircraft and assessment details', 'Ask about AROC inclusions'] },
  { title: 'Aeronautical radio course (AROC)', category: 'Radio & operations', icon: "M12 9v12M8 21l4-9 4 9M8 5a6 6 0 0 0 0 8M16 5a6 6 0 0 1 0 8M5 2a10 10 0 0 0 0 14M19 2a10 10 0 0 1 0 14", description: 'Enquire about aeronautical radio training as a standalone option or alongside your RePL course.', points: ['Radio communication training', 'Entry requirements and assessment', 'Check standalone or bundled options'] },
  { title: 'RePL upgrade — under 25 kg', category: 'Licence upgrades', icon: "M8 9h8v6H8zM8 9 4 5m12 4 4-4M8 15l-4 4m12-4 4 4M2 4h5M17 4h5M2 20h5M17 20h5", description: 'For existing pilots exploring training for a heavier aircraft and their next application.', points: ['Review your current RePL', 'Discuss your intended aircraft', 'Confirm a suitable upgrade pathway'] },
  { title: 'Chief Remote Pilot / ReOC pathway', category: 'Advanced pathways', icon: "M8 4H5v17h14V4h-3M8 2h8v5H8zM8 12h8M8 16h5", description: 'Discuss training and support options for leading a drone operation.', points: ['Share your operational goals', 'Discuss experience and prerequisites', 'Specialist availability to be confirmed'] },
  { title: 'BVLOS training', category: 'Advanced pathways', icon: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM16 8l-3 5-5 3 3-5 5-3Z", description: 'Explore further training options for beyond visual line of sight operations.', points: ['Discuss your existing qualifications', 'Ask about specialist training options', 'Provider and availability to be confirmed'] },
  { title: 'Group & corporate training', category: 'Teams', icon: "M9 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1 21v-3a5 5 0 0 1 10 0v3M13 21v-3a5 5 0 0 1 10 0v3", description: 'Plan a training enquiry around your people, aircraft and business goals.', points: ['Training for multiple participants', 'Discuss preferred dates and location', 'Request a tailored course proposal'] },
]
const categories = ['All courses', 'Getting started', 'Radio & operations', 'Licence upgrades', 'Advanced pathways', 'Teams']

export default function TrainingCourses() {
  const [category, setCategory] = useState('All courses')
  useEffect(() => {
    window.scrollTo(0, 0)
    updatePageMeta('Drone Training Courses Sydney | Jamien Drone Academy', 'Browse drone training enquiries with Jamien Drone Academy: RePL, AROC, licence upgrades, corporate training and advanced pathways in Sydney.', 'https://www.jamiendrone.com.au/academy/courses')
  }, [])
  const visibleCourses = courses.filter(course => category === 'All courses' || course.category === category)
  return <Box component="main" sx={{ bgcolor: '#F4F2ED', color: '#2B302E', pb: { xs: 7, md: 11 } }}>
    <Container maxWidth="lg">
      <Box component="header" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 7 }, maxWidth: 820 }}>
        <Typography sx={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#657361', mb: 2 }}>Jamien Drone Academy · Sydney</Typography>
        <Typography component="h1" sx={{ fontSize: { xs: 42, md: 68 }, letterSpacing: '-.045em', lineHeight: 1.05, mb: 3 }}>Your next skill.<br />Your next possibility.</Typography>
        <Typography sx={{ maxWidth: 600, fontSize: { xs: 16, md: 18 }, color: '#666760', lineHeight: 1.8 }}>Explore our drone training course directory. Start with your first flight, progress your licence or find a pathway for your team.</Typography>
      </Box>
      <Box component="nav" aria-label="Filter training courses" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pb: 4, borderBottom: '1px solid #DAD8D0', mb: 4 }}>
        {categories.map(item => <Button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} sx={{ borderRadius: '30px', px: 2.3, py: 1, fontSize: 13, textTransform: 'none', border: '1px solid', borderColor: category === item ? '#2B302E' : '#DAD8D0', bgcolor: category === item ? '#2B302E' : 'transparent', color: category === item ? '#fff' : '#535A50', '&:hover': { bgcolor: category === item ? '#414A40' : '#E8E9E1' } }}>{item}</Button>)}
      </Box>
      <Typography role="status" sx={{ fontSize: 13, color: '#666760', mb: 3 }}>{visibleCourses.length} course{visibleCourses.length === 1 ? '' : 's'} · Enquire for dates and fees</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {visibleCourses.map(({ title, category: group, icon, description, points }) => <Box component="article" key={title} sx={{ bgcolor: '#FCFBF7', border: '1px solid #DEDFD5', borderRadius: '22px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ bgcolor: '#E5E8DF', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 104 }}><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#657361" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg><Typography sx={{ fontSize: 11, letterSpacing: '.04em', color: '#535F4F' }}>{group}</Typography></Box>
          <Box sx={{ p: 3.5, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography component="h2" sx={{ fontSize: 23, fontWeight: 600, letterSpacing: '-.025em', lineHeight: 1.25, mb: 2 }}>{title}</Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.8, color: '#666760', mb: 2 }}>{description}</Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0, mb: 3, color: '#666760', fontSize: 13, lineHeight: 1.9 }}>{points.map(point => <li key={point}>{point}</li>)}</Box>
            <Button component={Link} to={`/drone-training?course=${encodeURIComponent(title)}#enquire`} endIcon={<span aria-hidden="true">→</span>} aria-label={`Enquire about ${title}`} sx={{ mt: 'auto', justifyContent: 'space-between', bgcolor: '#2B302E', color: '#fff', textTransform: 'none', borderRadius: '30px', px: 2.5, py: 1.4, '&:hover': { bgcolor: '#465141' } }}>Enquire about this course</Button>
          </Box>
        </Box>)}
      </Box>
      <Typography sx={{ fontSize: 12, lineHeight: 1.8, color: '#666760', mt: 3 }}>Course availability, provider, prerequisites, fees and inclusions are confirmed before booking. Advanced pathways are enquiries for specialist options. Training does not itself grant operational approvals.</Typography>
      <Box sx={{ mt: { xs: 6, md: 8 }, bgcolor: '#2B302E', color: '#F4F2ED', borderRadius: '22px', p: { xs: 4, md: 6 }, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography component="h2" sx={{ fontSize: { xs: 28, md: 36 }, mb: 1 }}>Not sure where to start?</Typography><Typography sx={{ color: '#CDCFC5', fontSize: 15 }}>Tell us what you want to do. We’ll help you explore the next step.</Typography></Box><Button component={Link} to="/drone-training#enquire" sx={{ bgcolor: '#E5E8DF', color: '#2B302E', textTransform: 'none', borderRadius: '30px', px: 3, py: 1.5, '&:hover': { bgcolor: '#D3D9C9' } }}>Help me choose →</Button></Box>
    </Container>
  </Box>
}
