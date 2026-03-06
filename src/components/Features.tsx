import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'

const features = [
  {
    icon: CloudIcon,
    title: 'Advanced Drone Technology',
    description: 'Latest drone equipment for efficient and precise cleaning',
  },
  {
    icon: CheckCircleIcon,
    title: 'Professional Results',
    description: 'Expert service with guaranteed satisfaction',
  },
  {
    icon: SecurityIcon,
    title: 'Fully Insured',
    description: 'Complete insurance coverage for your peace of mind',
  },
  {
    icon: SpeedIcon,
    title: 'Fast & Efficient',
    description: 'Quick turnaround without compromising quality',
  },
]

export default function Features() {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, idx) => {
            const Icon = feature.icon as any
            return (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    textAlign: 'center',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Icon
                    sx={{ fontSize: 60, color: '#ffd700', mb: 2, mx: 'auto' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {feature.description}
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
