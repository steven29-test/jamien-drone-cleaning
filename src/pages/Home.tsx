import { useEffect } from 'react'
import { Box } from '@mui/material'
import Hero from '../components/Hero'
import Features from '../components/Features'
import ServicesGrid from '../components/ServicesGrid'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import GoogleReviews from '../components/GoogleReviews'
import { updatePageMeta } from '../utils/seo'

export default function Home() {
  useEffect(() => {
    updatePageMeta(
      'Jamien Drone Cleaning - Professional Drone Cleaning Services Sydney North Shore',
      'Professional drone cleaning services in Sydney North Shore. Roof cleaning, solar panel cleaning, facade washing in Lane Cove, Neutral Bay, Mosman, Cremorne, Willoughby, Chatswood, and all North Shore suburbs. Call 0435 116 503.',
      'https://www.jamiendrone.com.au'
    )
  }, [])

  return (
    <>
      {/* Hidden SEO Content - Comprehensive North Shore Suburbs & Keywords */}
      <Box
        sx={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          visibility: 'hidden',
          fontSize: '0.75rem',
          color: '#f5f5f5',
          backgroundColor: '#f5f5f5',
        }}
        role="doc-tip"
        aria-hidden="true"
      >
        <h2>Drone Cleaning Services - Sydney North Shore Suburbs</h2>
        
        <p>
          <strong>Lower North Shore Suburbs:</strong> Lane Cove drone cleaning, Neutral Bay drone cleaning, Cremorne drone cleaning, Mosman drone cleaning, Willoughby drone cleaning, Chatswood drone cleaning, Artarmon drone cleaning, Thornleigh drone cleaning, Pennant Hills drone cleaning, Epping drone cleaning.
        </p>

        <p>
          <strong>Mid North Shore Suburbs:</strong> Ryde drone cleaning, Macquarie Park drone cleaning, Gladesville drone cleaning, Hunters Hill drone cleaning, Northbridge drone cleaning, Longueville drone cleaning, Wollstonecraft drone cleaning, St Leonards drone cleaning, Crows Nest drone cleaning, Waverton drone cleaning.
        </p>

        <p>
          <strong>Upper North Shore Suburbs:</strong> Cammeray drone cleaning, Naremburn drone cleaning, Castlecrag drone cleaning, Roseville drone cleaning, Lindfield drone cleaning, Killara drone cleaning, Turramurra drone cleaning, Pymble drone cleaning, Gordon drone cleaning, Wahroonga drone cleaning, Asquith drone cleaning.
        </p>

        <p>
          <strong>Hills District Suburbs:</strong> Castle Hill drone cleaning, Kellyville drone cleaning, Baulkham Hills drone cleaning, Westleigh drone cleaning, Denistone drone cleaning, Eastwood drone cleaning.
        </p>

        <p>
          <strong>Services Offered:</strong> Drone roof cleaning, drone solar panel cleaning, drone facade cleaning, drone building cleaning, drone gutter cleaning, drone window cleaning, professional drone cleaning services for residential and commercial properties.
        </p>

        <p>
          <strong>Keywords:</strong> Drone cleaning Chatswood, drone cleaning Willoughby, drone cleaning Lane Cove, drone cleaning Neutral Bay, drone cleaning Mosman, drone cleaning Cremorne, drone cleaning Artarmon, drone cleaning Thornleigh, drone cleaning Pennant Hills, drone cleaning Epping, drone cleaning Ryde, drone cleaning Macquarie Park, drone cleaning Gladesville, drone cleaning Hunters Hill, drone cleaning Roseville, drone cleaning Lindfield, drone cleaning Castle Hill, drone cleaning Kellyville, drone cleaning Baulkham Hills.
        </p>

        <p>
          <strong>Service Keywords:</strong> Roof cleaning Sydney North Shore, solar panel cleaning Chatswood, facade cleaning Willoughby, building cleaning Lane Cove, gutter cleaning Mosman, professional cleaning services, drone cleaning services, aerial cleaning, high-rise cleaning.
        </p>

        <p>
          Based in Lane Cove, NSW 2066. Phone: 0435 116 503. Email: sales@jamiendrone.com.au. We provide free quotes for all drone cleaning services across Sydney North Shore.
        </p>
      </Box>

      <Hero />
      <Features />
      <ServicesGrid />
      <BeforeAfterSlider />
      <GoogleReviews />
    </>
  )
}
