import { Box, Container, Typography, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'

interface Slide {
  id: number
  image: string
  title: string
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: '/Building_Jamien.png',
    title: 'Building Facade Cleaning - Before & After'
  },
  {
    id: 2,
    image: '/Roof_Moss_Jamien.png',
    title: 'Roof Moss Removal - Before & After'
  },
  {
    id: 3,
    image: '/Solar_Panel_Jamien.png',
    title: 'Solar Panel Cleaning - Before & After'
  }
]

export default function BeforeAfterSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            See the Difference
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', fontSize: { xs: '1rem', md: '1.1rem' } }}>
            Professional drone cleaning transforms your property
          </Typography>
        </Box>

        {/* Slider Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backgroundColor: '#000',
            aspectRatio: '16 / 9',
            maxWidth: '100%',
          }}
        >
          {/* Image */}
          <Box
            component="img"
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].title}
            sx={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'contain',
              backgroundColor: '#000',
            }}
          />

          {/* Title Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              padding: { xs: '20px 15px 10px', md: '40px 20px 20px' },
              color: '#fff',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
              {SLIDES[currentSlide].title}
            </Typography>
          </Box>

          {/* Left Arrow */}
          <Box
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: { xs: '10px', md: '20px' },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '50%',
              width: { xs: '40px', md: '50px' },
              height: { xs: '40px', md: '50px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.6)',
              },
              zIndex: 10,
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
          </Box>

          {/* Right Arrow */}
          <Box
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: { xs: '10px', md: '20px' },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '50%',
              width: { xs: '40px', md: '50px' },
              height: { xs: '40px', md: '50px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.6)',
              },
              zIndex: 10,
            }}
          >
            <ChevronRightIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
          </Box>
        </Box>

        {/* Dots Navigation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: 4,
          }}
        >
          {SLIDES.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: index === currentSlide ? '32px' : '12px',
                height: '12px',
                borderRadius: '6px',
                backgroundColor: index === currentSlide ? '#ffd700' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: index === currentSlide ? '#ffd700' : '#bbb',
                },
              }}
            />
          ))}
        </Box>

        {/* Slide Counter */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 3,
            color: '#666',
          }}
        >
          {currentSlide + 1} / {SLIDES.length}
        </Typography>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
            Ready to see your property shine?
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 3, fontSize: { xs: '0.95rem', md: '1rem' } }}>
            Contact us for a free quote on professional drone cleaning services
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box
              component="a"
              href="tel:+61435116503"
              sx={{
                display: 'inline-block',
                backgroundColor: '#ffd700',
                color: '#000',
                padding: { xs: '14px 24px', md: '12px 32px' },
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: { xs: '0.95rem', md: '1rem' },
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#ffed4e'
                },
                width: { xs: '100%', sm: 'auto' },
                textAlign: 'center',
              }}
            >
              Call Now
            </Box>
            <Box
              component={Link}
              to="/contact"
              sx={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: '#000',
                border: '2px solid #ffd700',
                padding: { xs: '12px 22px', md: '10px 30px' },
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: { xs: '0.95rem', md: '1rem' },
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: '#ffd700',
                  color: '#000'
                },
                width: { xs: '100%', sm: 'auto' },
                textAlign: 'center',
              }}
            >
              Get Quote
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
