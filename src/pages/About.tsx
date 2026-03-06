import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material'

export default function About() {
  return (
    <>
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
            About Jamien Drone Cleaning
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
            With over 10 years of experience in the cleaning industry, Jamien Drone Cleaning brings cutting-edge drone technology to exterior property maintenance. We specialize in providing efficient, safe, and thorough cleaning services for residential and commercial properties.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
            Our team of certified drone operators and experienced professionals is dedicated to delivering exceptional results while maintaining the highest safety and quality standards.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
            Our Mission & Values
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Our Mission
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    To provide innovative, reliable, and eco-friendly drone cleaning solutions that exceed customer expectations while maintaining the highest standards of safety and professionalism.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Our Values
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Safety, professionalism, and customer satisfaction are at the core of everything we do. We invest in the latest technology and continuously train our team to deliver outstanding results.
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
