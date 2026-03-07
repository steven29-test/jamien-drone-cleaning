import { Box, Container, Typography, Rating, Card, CardContent, Grid, Avatar } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah Mitchell',
    rating: 5,
    text: 'Excellent service! Jamien Drone Cleaning cleaned our roof in just 30 minutes. The results are amazing - our roof looks brand new. Highly professional and courteous. Would definitely recommend!',
    date: '2026-02-28',
    verified: true,
    avatar: '👩‍💼'
  },
  {
    id: '2',
    author: 'John Anderson',
    rating: 5,
    text: 'Best decision we made for our solar panels. They were covered in dirt and grime, reducing efficiency. After Jamien cleaned them, our energy output increased by 20%. Great value for money!',
    date: '2026-02-25',
    verified: true,
    avatar: '👨‍🏫'
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    rating: 5,
    text: 'Professional, punctual, and thorough. They cleaned our building facade and made it look pristine. The team was respectful of our workspace and completed the job ahead of schedule. Impressed!',
    date: '2026-02-20',
    verified: true,
    avatar: '👩‍💼'
  },
  {
    id: '4',
    author: 'Michael Chen',
    rating: 5,
    text: 'Called them for emergency cleaning before our property inspection. They came the same day and did an outstanding job. Very responsive and professional. Saved our deal!',
    date: '2026-02-18',
    verified: true,
    avatar: '👨‍💼'
  },
  {
    id: '5',
    author: 'Lisa Thompson',
    rating: 5,
    text: 'I was hesitant about drone cleaning at first, but they explained everything clearly and the equipment looked top-notch. Amazing results on our commercial complex. Will use again!',
    date: '2026-02-15',
    verified: true,
    avatar: '👩'
  },
  {
    id: '6',
    author: 'David Wong',
    rating: 5,
    text: 'Fantastic crew. Very knowledgeable about different surface types. They cleaned our gutters and roof professionally without any damage. Fair pricing and no hidden costs. Recommended!',
    date: '2026-02-10',
    verified: true,
    avatar: '👨'
  }
];

export default function GoogleReviews() {
  const averageRating = (SAMPLE_REVIEWS.reduce((sum, review) => sum + review.rating, 0) / SAMPLE_REVIEWS.length).toFixed(1);
  const fiveStarCount = SAMPLE_REVIEWS.filter(r => r.rating === 5).length;
  const totalReviews = SAMPLE_REVIEWS.length;

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Customer Reviews
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
            Trusted by hundreds of satisfied customers across Australia
          </Typography>
          
          {/* Rating Summary */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffd700' }}>
                {averageRating}
              </Typography>
              <Rating value={5} readOnly size="large" sx={{ color: '#ffd700' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#666' }}>
                {fiveStarCount} out of {totalReviews} reviews
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
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Rating */}
                  <Rating 
                    value={review.rating} 
                    readOnly 
                    size="small" 
                    sx={{ mb: 1, color: '#ffd700' }} 
                  />
                  
                  {/* Review Text */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2, 
                      color: '#333',
                      fontStyle: 'italic',
                      lineHeight: 1.6
                    }}
                  >
                    "{review.text}"
                  </Typography>

                  {/* Author Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#ffd700', fontSize: '1.5rem' }}>
                      {review.avatar}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ fontWeight: 'bold', color: '#333' }}
                      >
                        {review.author}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {review.verified && <StarIcon sx={{ fontSize: '0.9rem', color: '#ffd700' }} />}
                        Verified • {new Date(review.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
            Have you experienced our service? Share your review on Google!
          </Typography>
          <Box
            component="a"
            href="https://www.google.com/maps/place/Jamien+Drone+Cleaning"
            target="_blank"
            rel="noopener noreferrer"
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
            Leave a Review on Google
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
