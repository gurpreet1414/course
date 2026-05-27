import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import CareerPath from '@/components/CareerPath';
import PopularCourses from '@/components/PopularCourses';
import NVQByTrade from '@/components/NVQByTrade';
import HowItWorks from '@/components/HowItWorks';
import LogosSection from '@/components/LogosSection';
import StatsCTA from '@/components/StatsCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow ">
        <div className='sm:mt-24 mt-18'></div>
        <HeroSection  />
        <ServiceCards />
        <CareerPath />
        <PopularCourses />
        <NVQByTrade />
        <HowItWorks />
        <LogosSection />
        <StatsCTA />
      </main>

      <Footer />
    </div>
  );
}