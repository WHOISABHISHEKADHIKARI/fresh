import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Services = lazy(() => import('./pages/Services'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <ErrorBoundary>
      <div className="App min-h-screen bg-white">
        <Helmet>
          <title>Fresh Masala - Premium Organic Spices | Producer, Distributor & Reseller</title>
          <meta name="description" content="Fresh Masala - Trusted producer, distributor & reseller of organic, freshly ground spices for 7+ years. Serving homes and businesses with premium quality spices." />
        </Helmet>
        
        <Navbar />
        
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} /> {/* 404 Error Page */}
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App