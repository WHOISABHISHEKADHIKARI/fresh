import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Award, 
  Sprout, 
  Truck, 
  Store, 
  Users, 
  ArrowRight,
  Star,
  Clock,
  Shield,
  Leaf,
  Heart,
  ChevronRight
} from 'lucide-react'

const Home = () => {
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const spices = [
    { name: 'Turmeric', color: 'from-yellow-400 to-yellow-600', delay: '0ms' },
    { name: 'Red Chili', color: 'from-red-500 to-red-700', delay: '200ms' },
    { name: 'Cumin', color: 'from-amber-600 to-amber-800', delay: '400ms' },
    { name: 'Coriander', color: 'from-green-500 to-green-700', delay: '600ms' }
  ]

  const highlights = [
    { icon: Sprout, text: 'Producer', color: 'text-green-600' },
    { icon: Truck, text: 'Distributor', color: 'text-blue-600' },
    { icon: Store, text: 'Reseller', color: 'text-purple-600' },
    { icon: Users, text: '500+ Trusted Clients', color: 'text-primary-red' }
  ]

  const coreValues = [
    {
      icon: Leaf,
      title: 'Purity',
      description: '100% organic, chemical-free spices',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Freshness',
      description: 'Small-batch grinding for maximum flavor',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Tradition',
      description: 'Time-honored methods and recipes',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Trust',
      description: 'Reliable partnerships built over years',
      color: 'text-purple-600'
    }
  ]

  const featuredProducts = [
    {
      name: 'Premium Turmeric',
      description: 'Golden, aromatic turmeric powder with high curcumin content',
      gradient: 'from-yellow-400 to-yellow-600',
      features: ['Farm-sourced', 'Organic certified']
    },
    {
      name: 'Red Chili Powder',
      description: 'Vibrant red chili powder with perfect heat balance',
      gradient: 'from-red-500 to-red-700',
      features: ['Perfect heat level', 'Sun-dried']
    },
    {
      name: 'Cumin Powder',
      description: 'Aromatic cumin powder with rich, earthy flavor',
      gradient: 'from-amber-600 to-amber-800',
      features: ['Premium grade', 'Quality tested']
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Hotel Spice Garden',
      content: 'Fresh Masala has been our spice supplier for 3 years. Their consistency in quality and timely delivery makes them our preferred partner.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Authentic Indian Restaurant',
      content: 'The freshness and aroma of their spices is unmatched. Our customers always compliment the authentic flavors in our dishes.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Spice Retail Chain',
      content: 'Reliable bulk supply and competitive pricing. Fresh Masala understands the needs of retail businesses perfectly.',
      rating: 5
    }
  ]

  return (
    <>
      <Helmet>
        <title>Fresh Masala - Premium Organic Spices | Producer, Distributor & Reseller</title>
        <meta name="description" content="Fresh Masala - Trusted producer, distributor & reseller of organic, freshly ground spices for 7+ years. Serving homes and businesses with premium quality spices." />
        <meta name="keywords" content="fresh masala, organic spices, spice producer, spice distributor, bulk spices, premium spices, turmeric, chili powder, cumin, coriander" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-red rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-accent-orange rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-accent-yellow rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              {/* Experience Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg">
                <Award className="w-5 h-5 text-primary-red" />
                <span className="text-sm font-medium text-gray-800">7+ Years of Excellence</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fresh Masala –{' '}
                <span className="text-gradient">From Our Farm</span>{' '}
                to Every Flavorful Kitchen
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Premium organic spices, freshly ground with tradition and trust. 
                Serving homes and businesses with authentic flavors for over 7 years.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon
                  return (
                    <div key={index} className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                      <IconComponent className={`w-6 h-6 ${highlight.color} mb-2`} />
                      <span className="text-sm font-medium text-gray-800 text-center">{highlight.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/contact" className="btn btn-primary text-lg px-8 py-4">
                  Partner With Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/products" className="btn btn-secondary text-lg px-8 py-4">
                  Explore Products
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Central Circle */}
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary-red to-accent-orange rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">Fresh Masala</h3>
                    <p className="text-sm opacity-90">Premium Spices</p>
                  </div>
                </div>

                {/* Floating Spice Elements */}
                {spices.map((spice, index) => {
                  const angle = (index * 90) * (Math.PI / 180)
                  const radius = 150
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius
                  
                  return (
                    <div
                      key={spice.name}
                      className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 animate-float"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animationDelay: spice.delay
                      }}
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${spice.color} rounded-full shadow-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-medium text-center px-2">{spice.name}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section 
        id="about-preview" 
        data-animate
        className={`section-padding bg-white transition-all duration-1000 ${
          isVisible['about-preview'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started as a small family venture 7 years ago has grown into a trusted name in the spice industry. 
                Fresh Masala was born from a passion for authentic flavors and a commitment to bringing the finest, 
                freshly ground spices from farm to kitchen.
              </p>
              <p className="text-gray-600 mb-8">
                Today, we proudly serve over 500 clients including restaurants, hotels, retailers, and households, 
                maintaining our core values of purity, freshness, tradition, and trust.
              </p>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div key={index} className="card p-6 text-center">
                    <IconComponent className={`w-8 h-8 ${value.color} mx-auto mb-4`} />
                    <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        id="featured-products" 
        data-animate
        className={`section-padding bg-gray-50 transition-all duration-1000 ${
          isVisible['featured-products'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Our Premium Products</h2>
            <p className="section-subtitle">
              Freshly ground, organic spices sourced directly from trusted farms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div key={index} className="card p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-center">{product.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Available: 100g, 500g, 1kg, Bulk orders
                </p>
                <a 
                  href={`https://wa.me/9779865412482?text=I'm%20interested%20in%20buying%20${encodeURIComponent(product.name)}%20for%20your%20best%20price`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Buy Now
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products" className="btn btn-primary text-lg px-8 py-4">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        data-animate
        className={`section-padding bg-white transition-all duration-1000 ${
          isVisible['testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by 500+ businesses and households across the region
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}

export default Home