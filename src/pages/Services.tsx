import { Container, Typography, Box, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const serviceDetails = [
  'High-rise building exterior cleaning',
  'Solar panel inspection and cleaning',
  'Roof cleaning and moss removal',
  'Gutter inspection and cleaning',
  'Facade and window cleaning',
  'Industrial equipment inspection',
  'Thermal imaging inspections',
  'Real estate photography and videography',
]

export default function Services() {
  return (
    <>
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            Drone Cleaning Services
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We offer comprehensive drone-based cleaning and inspection services designed to keep your property in pristine condition while reducing safety risks and costs.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Our Service Offerings
                  </Typography>
                  <List>
                    {serviceDetails.map((service, idx) => (
                      <ListItem key={idx} sx={{ mb: 1 }}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: '#ffd700' }} />
                        </ListItemIcon>
                        <ListItemText primary={service} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 2, backgroundColor: '#f9f9f9' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Why Drone Cleaning?
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
                    <strong>Safety:</strong> Eliminates the need for dangerous high-altitude work
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
                    <strong>Efficiency:</strong> Completes jobs faster than traditional methods
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
                    <strong>Cost-Effective:</strong> Reduces labor costs and equipment expenses
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
                    <strong>Precision:</strong> Drone technology provides detailed inspections
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                    <strong>Eco-Friendly:</strong> Low environmental impact cleaning solutions
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
