import { useEffect } from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import TrainingPromo from '../components/TrainingPromo'
import ServicesGrid from '../components/ServicesGrid'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import GoogleReviews from '../components/GoogleReviews'
import { updatePageMeta } from '../utils/seo'

export default function Home() {
  useEffect(() => {
    updatePageMeta(
      'Jamien Drone | Drone Cleaning and RePL Training Sydney',
      'Sydney drone cleaning services and RePL training pathways from Jamien Drone. Explore residential and commercial cleaning, drone training and equipment support.',
      'https://www.jamiendrone.com.au'
    )
  }, [])

  return (
    <>
      <Hero />
      <Features />
      <ServicesGrid />
      <TrainingPromo />
      <BeforeAfterSlider />
      <GoogleReviews />
    </>
  )
}

