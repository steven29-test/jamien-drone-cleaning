import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import HouseIcon from '@mui/icons-material/House'
import FactoryIcon from '@mui/icons-material/Factory'

const services = [
  {
    icon: ApartmentIcon,
    title: 'Commercial Buildings',
    description: 'High-rise cleaning, solar panels, facade maintenance',
  },
  {
    icon: HouseIcon,
    title: 'Residential Properties',
    description: 'Roof cleaning, gutter inspection, house exterior cleaning',
  },
  {
    icon: FactoryIcon,
    title: 'Industrial Facilities',
    description: 'Large-scale inspections, warehouse exteriors, equipment cleaning',
  },
]

export default function Services() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, idx) => {
            const Icon = service.icon as any
            return (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Icon sx={{ fontSize: 60, color: '#ffd700', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
