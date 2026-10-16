import { Box, Button, Stack } from '@mui/material'
import { ArrowForward, PhoneOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function ContactActions({ quoteUrl = '/contact', dark = false, centered = false }: { quoteUrl?: string; dark?: boolean; centered?: boolean }) {
  const color = dark ? '#fff' : '#26382c'
  return <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 3 }} alignItems={{ xs: 'stretch', sm: 'flex-start' }} justifyContent={centered ? 'center' : 'flex-start'}>
    <Button component={Link} to={quoteUrl} endIcon={<ArrowForward sx={{ fontSize: 18 }} />} sx={{ bgcolor: '#938B7E', color: '#17251c', minHeight: 48, px: 3, borderRadius: 1.5, textTransform: 'none', fontWeight: 700, boxShadow: 'none', '&:hover': { bgcolor: '#AAA296' } }}>Get a Free Quote</Button>
    <Box sx={{ textAlign: 'center' }}>
      <Button component="a" href="tel:+61435116503" aria-label="Call Jamien Drone Cleaning on 0435 116 503" startIcon={<PhoneOutlined sx={{ fontSize: 19 }} />} sx={{ color, border: dark ? '1px solid rgba(255,255,255,.35)' : '1px solid #c7cdc3', minHeight: 48, width: { xs: '100%', sm: 'auto' }, px: 3, borderRadius: 1.5, textTransform: 'none', fontWeight: 650, '&:hover': { bgcolor: dark ? 'rgba(255,255,255,.06)' : '#edf0e8', borderColor: color } }}><Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>Call us</Box><Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, whiteSpace: 'nowrap' }}>Call 0435 116 503</Box></Button>
    </Box>
  </Stack>
}
