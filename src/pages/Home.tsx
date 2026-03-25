import { useEffect } from 'react'
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
      <Hero />
      <Features />
      <ServicesGrid />
      <BeforeAfterSlider />
      <GoogleReviews />
    </>
  )
}
