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
      'Jamien Drone Cleaning - Professional Drone Cleaning Services Sydney North Shore & Inner West',
      'Professional drone cleaning services in Sydney North Shore & Inner West. Roof cleaning, solar panel cleaning, facade washing. Available in Chatswood, Willoughby, Marrickville, Newtown, and all surrounding suburbs. Call 0435 116 503.',
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
