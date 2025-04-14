import React from 'react'
import HeroBanner from '../components/HeroBanner'               
import FeaturedProducts from '../components/FeaturedProducts'
import WhyAyonija from '../components/WhyAyonija'
import JobsOpening from '../components/JobsOpening'
import BecomePartner from '../components/BecomePartner'
import NewsLetter from '../components/NewsLetter'   
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div className='min-h-screen pt-8'>
    <Navbar />
        <HeroBanner />
        <FeaturedProducts />
        <WhyAyonija />
        <JobsOpening />
        <BecomePartner/>
        <NewsLetter/>
        <Footer />
    </div>
  )
}

export default Home