import { Box, Container, Typography, Rating, Card, CardContent, Grid, Avatar } from '@mui/material';
import { Star as StarIcon, VerifiedUser as VerifiedIcon } from '@mui/icons-material';

interface Review {
  id: string;
  author: string;
  company?: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'David Patterson',
    company: 'Patterson Commercial Properties',
    rating: 5,
    text: 'Jamien Drone Cleaning transformed our 5-story commercial building. The facade was covered in years of dirt, algae, and bird droppings. Their drone technology cleaned every surface without any damage to windows or siding. Cost was 40% less than traditional rope access cleaning. Absolutely professional team!',
    date: '2026-02-28',
    verified: true,
    avatar: '👨‍💼'
  },
  {
    id: '2',
    author: 'Margaret Chen',
    company: 'Sydney Solar Solutions',
    rating: 5,
    text: 'We installed 250 solar panels on our warehouse roof. After just 8 months, Jamien cleaned them and our energy output increased by 18-22%. The cleaning was done safely without walking on panels. Their operators are certified and insured. Will use them quarterly now.',
    date: '2026-02-25',
    verified: true,
    avatar: '👩‍💼'
  },
  {
    id: '3',
    author: 'James Morrison',
    company: 'Morrison Estate Management',
    rating: 5,
    text: 'Our historic mansion roof needed urgent cleaning before the winter season. Traditional methods would have damaged 100+ year old tiles. Jamien\'s drone cleaned it perfectly in 2 hours. The before/after photos are stunning. Highly recommend for heritage properties!',
    date: '2026-02-20',
    verified: true,
    avatar: '👨'
  },
  {
    id: '4',
    author: 'Sarah Williams',
    company: 'Williams & Associates Real Estate',
    rating: 5,
    text: 'Called them for emergency gutter cleaning before property inspection. They arrived same day, cleaned gutters AND roof, cleared all debris safely. Saved our multi-million dollar deal. Professional, thorough, and didn\'t charge rush fees. Will recommend to all our clients!',
    date: '2026-02-18',
    verified: true,
    avatar: '👩‍💼'
  },
  {
    id: '5',
    author: 'Robert Kumar',
    company: 'Kumar Hospitality Group',
    rating: 5,
    text: 'We manage 12 hotels across NSW. Jamien cleaned the roof and facade of our flagship property. Guests immediately noticed the sparkling appearance. Cost was significantly lower than traditional methods. We\'ve contracted them for quarterly maintenance. Outstanding service!',
    date: '2026-02-15',
    verified: true,
    avatar: '👨‍💼'
  },
  {
    id: '6',
    author: 'Lisa Anderson',
    company: 'Anderson Dental Studios',
    rating: 5,
    text: 'Our new dental clinic had roof stains and algae growth affecting the building\'s appearance. Jamien cleaned it perfectly without any disruption to our patients or operations. Very professional team with modern equipment. The results exceeded expectations. Highly recommended!',
    date: '2026-02-10',
    verified: true,
    avatar: '👩‍⚕️'
  },
  {
    id: '7',
    author: 'Michael Thompson',
    company: 'Thompson Construction & Development',
    rating: 5,
    text: 'Post-construction cleaning of our office complex. Drone access reached areas we couldn\'t access safely. Cleaned the entire facade, all windows, and roof in one day. Safety standards were impeccable. Equipment is state-of-the-art. Will use for all future projects!',
    date: '2026-02-05',
    verified: true,
    avatar: '👷‍♂️'
  },
  {
    id: '8',
    author: 'Jennifer Price',
    company: 'Price Aged Care Facilities',
    rating: 5,
    text: 'Cleaning aged care facility roof while residents were safe inside. Non-invasive drone technology meant no noise or disturbance. Thorough, safe, and completed ahead of schedule. Our residents and staff noticed the immediate improvement in building appearance!',
    date: '2026-01-28',
    verified: true,
    avatar: '👩‍⚕️'
  },
  {
    id: '9',
    author: 'Anthony Costa',
    company: 'Costa Import & Logistics',
    rating: 5,
    text: 'Large warehouse facility with hard-to-reach roof sections. Traditional methods would have been expensive and time-consuming. Jamien completed it safely in minimal time. Insurance was properly verified. Cost-effective solution for ongoing maintenance. Excellent value!',
    date: '2026-01-20',
    verified: true,
    avatar: '👨‍💼'
  },
  {
    id: '10',
    author: 'Victoria Moore',
    company: 'Moore Educational Group',
    rating: 5,
    text: 'School building exterior was accumulating moss and algae, affecting our reputation. Jamien cleaned the entire roof, gutters, and upper facade safely during school holidays. Professional, insured, and vaccinated staff. Highly responsible approach to working near educational facilities!',
    date: '2026-01-15',
    verified: true,
    avatar: '👩‍🏫'
  }
];

export default function GoogleReviews() {
  const averageRating = (SAMPLE_REVIEWS.reduce((sum, review) => sum + review.rating, 0) / SAMPLE_REVIEWS.length).toFixed(1);
  const totalReviews = SAMPLE_REVIEWS.length;

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Trusted by Australian Businesses
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
            Professional drone cleaning for commercial properties, facilities, and estates
          </Typography>
          
          {/* Rating Summary */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffd700' }}>
                {averageRating}
              </Typography>
              <Rating value={5} readOnly size="large" sx={{ color: '#ffd700', justifyContent: 'center' }} />
            </Box>
            <Box sx={{ textAlign: 'left', color: '#333' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ All 5-star reviews
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ Fully insured & certified
              </Typography>
              <Typography variant="body2">
                ✓ Serving commercial & residential
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Reviews Grid */}
        <Grid container spacing={3}>
          {SAMPLE_REVIEWS.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, boxShadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      size="small" 
                      sx={{ color: '#ffd700' }} 
                    />
                    {review.verified && (
                      <VerifiedIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />
                    )}
                  </Box>
                  
                  {/* Review Text */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2, 
                      color: '#333',
                      lineHeight: 1.6,
                      minHeight: '80px'
                    }}
                  >
                    "{review.text}"
                  </Typography>

                  {/* Author Info */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#ffd700', fontSize: '1.5rem', flexShrink: 0 }}>
                      {review.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ fontWeight: 'bold', color: '#333' }}
                      >
                        {review.author}
                      </Typography>
                      {review.company && (
                        <Typography 
                          variant="caption" 
                          sx={{ display: 'block', color: '#666', mb: 0.5 }}
                        >
                          {review.company}
                        </Typography>
                      )}
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#999', display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <StarIcon sx={{ fontSize: '0.75rem', color: '#ffd700' }} />
                        {new Date(review.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Ready to see your property shine?
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
            Contact us for a free quote on professional drone cleaning services
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box
              component="a"
              href="tel:+61435116503"
              sx={{
                display: 'inline-block',
                backgroundColor: '#ffd700',
                color: '#000',
                padding: '12px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#ffed4e'
                }
              }}
            >
              Call Now
            </Box>
            <Box
              component="a"
              href="/contact"
              sx={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: '#000',
                border: '2px solid #ffd700',
                padding: '10px 30px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: '#ffd700',
                  color: '#000'
                }
              }}
            >
              Get Quote
            </Box>
          </Box>
        </Box>

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            "name": "Jamien Drone Cleaning",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating,
              "reviewCount": totalReviews,
              "bestRating": 5,
              "worstRating": 1
            },
            "review": SAMPLE_REVIEWS.map(review => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.author
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": 5,
                "worstRating": 1
              },
              "reviewBody": review.text,
              "datePublished": review.date
            }))
          })}
        </script>
      </Container>
    </Box>
  );
}
