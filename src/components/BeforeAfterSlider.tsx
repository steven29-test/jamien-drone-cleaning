import { Box, Container, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'

interface Slide {
  id: number
  image: string
  title: string
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: '/before-after-1.jpg', // Replace with your actual filename
    title: 'Roof Cleaning - Before & After'
  },
  {
    id: 2,
    image: '/before-after-2.jpg', // Replace with your actual filename
    title: 'Solar Panel Cleaning - Before & After'
  },
  {
    id: 3,
    image: '/before-after-3.jpg', // Replace with your actual filename
    title: 'Facade Cleaning - Before & After'
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
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            See the Difference
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', fontSize: '1.1rem' }}>
            Professional drone cleaning transforms your property
          </Typography>
        </Box>

        {/* Slider Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backgroundColor: '#f5f5f5',
          }}
        >
          {/* Image */}
          <Box
            component="img"
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].title}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              minHeight: '400px',
              objectFit: 'cover',
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
              padding: '40px 20px 20px',
              color: '#fff',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {SLIDES[currentSlide].title}
            </Typography>
          </Box>

          {/* Left Arrow */}
          <Box
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
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
            <ChevronLeftIcon sx={{ fontSize: '2rem' }} />
          </Box>

          {/* Right Arrow */}
          <Box
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: '#fff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
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
            <ChevronRightIcon sx={{ fontSize: '2rem' }} />
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
      </Container>
    </Box>
  )
}
