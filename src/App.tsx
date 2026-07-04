import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import TechStack from './components/TechStack'
import HowItWorks from './components/HowItWorks'
import CaseStudies from './components/CaseStudies'
import LiveDemo from './components/LiveDemo'
import Metrics from './components/Metrics'
import Founder from './components/Founder'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <HowItWorks />
      <CaseStudies />
      <LiveDemo />
      <Metrics />
      <Founder />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-green selection:text-black">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
