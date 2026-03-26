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
      'Jamien Drone Cleaning - Professional Drone Cleaning Services Sydney',
      'Professional drone cleaning services in Sydney. Roof cleaning, solar panel cleaning, facade washing. Based in Lane Cove, NSW 2066. Call 0435 116 503 for a free quote.',
      'https://www.jamiendrone.com.au'
    )
  }, [])

  return (
    <>
      {/* Hidden SEO Content - North Shore Suburbs */}
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
        <p>
          Drone cleaning services available across Sydney North Shore suburbs including Lane Cove, Neutral Bay, Cremorne, Mosman, Neutral Bay, Willoughby, Chatswood, Artarmon, Thornleigh, Pennant Hills, Thornleigh, Epping, Ryde, Macquarie Park, Gladesville, Hunters Hill, Northbridge, Longueville, Wollstonecraft, St Leonards, Crows Nest, Waverton, Cammeray, Naremburn, Castlecrag, Roseville, Lindfield, Killara, Turramurra, Pymble, Gordon, Wahroonga, Asquith, Pennant Hills, Thornleigh, Eastwood, Denistone, Dundas, Dundas Valley, Carlingford, Pennant Hills, Westleigh, Thornleigh, Pennant Hills, Westleigh, Kellyville, Kellyville Ridge, Castle Hill, Baulkham Hills, Hills District, Pennant Hills, Thornleigh, Westleigh, Epping, Langston Place, Thornleigh.
        </p>
        <p>
          Professional drone cleaning for Lane Cove, North Sydney, Mosman Bay, Neutral Bay, Cremorne Point, Darling Point, Double Bay, Rose Bay, Vaucluse, Watsons Bay, South Head, Bellevue Hill, Bondi Junction, Bondi, Tamarama, Bronte, Clovelly, Coogee, Maroubra, Randwick.
        </p>
        <p>
          Drone roof cleaning, solar panel cleaning, facade washing, gutter cleaning in Sydney North Shore including all suburbs from Lane Cove to Pennant Hills to Castle Hill.
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
