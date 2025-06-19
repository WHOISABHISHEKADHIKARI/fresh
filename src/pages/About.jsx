import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  Calendar,
  Tractor,
  Users,
  Award,
  Leaf,
  Clock,
  Heart,
  Target,
  Eye,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

const About = () => {
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

  const coreValues = [
    {
      icon: Leaf,
      title: 'Purity',
      description: '100% organic, chemical-free spices sourced from certified farms',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      title: 'Freshness',
      description: 'Small-batch grinding for maximum flavor and aroma retention',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      title: 'Tradition',
      description: 'Time-honored methods and authentic recipes passed down generations',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },

    {
      icon: Users,
      title: 'Trust',
      description: 'Reliable partnerships built on transparency and consistent quality',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const timeline = [
    {
      year: '2017',
      title: 'The Beginning',
      description: 'Started with a small farm and traditional grinding methods, focusing on local markets',
      icon: Tractor,
      color: 'bg-green-500'
    },
    {
      year: '2019',
      title: 'First 100 Clients',
      description: 'Expanded to serve local restaurants and retailers, establishing our reputation for quality',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      year: '2021',
      title: 'Organic Certification',
      description: 'Achieved organic standards and quality certifications, ensuring premium product quality',
      icon: Award,
      color: 'bg-yellow-500'
    },
    {
      year: '2024',
      title: '500+ Trusted Partners',
      description: 'Serving homes and businesses across the region with expanded product range',
      icon: TrendingUp,
      color: 'bg-primary-red'
    }
  ]

  const stats = [
    { number: '7+', label: 'Years of Excellence', icon: Calendar },
    { number: '500+', label: 'Trusted Clients', icon: Users },
    { number: '100%', label: 'Organic Products', icon: Leaf },
    { number: '24/7', label: 'Quality Assurance', icon: CheckCircle }
  ]

  const achievements = [
    'Certified organic spice producer',
    'ISO 22000 food safety certification',
    'FSSAI licensed facility',
    'Zero chemical residue guarantee',
    'Direct farmer partnerships',
    'State-of-the-art processing facility',
    'Cold storage and packaging',
    'Pan-regional distribution network'
  ]

  return (
    <>
      <Helmet>
        <title>About Fresh Masala - Our Story, Values & 7+ Years Journey</title>
        <meta name="description" content="Learn about Fresh Masala's journey from a small family venture to a trusted spice producer serving 500+ clients. Discover our core values of purity, freshness, tradition, and trust." />
        <meta name="keywords" content="fresh masala story, organic spice producer, spice company history, authentic spices, traditional methods" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              From humble beginnings to becoming a trusted name in premium spices
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Award className="w-5 h-5 text-primary-red" />
              <span className="font-medium text-gray-800">7+ Years of Excellence in Spice Industry</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary-red" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section 
        id="journey" 
        data-animate
        className={`section-padding bg-gray-50 transition-all duration-1000 ${
          isVisible['journey'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              What started as a small family venture 7 years ago has grown into a trusted name in the spice industry
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed">
              Fresh Masala was born from a passion for authentic flavors and a commitment to bringing the finest, 
              freshly ground spices from farm to kitchen. Today, we proudly serve over 500 clients including 
              restaurants, hotels, retailers, and households, maintaining our core values of purity, freshness, 
              tradition, and trust.
            </p>
            
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 hidden md:block"></div>
              
              {timeline.map((item, index) => {
                const IconComponent = item.icon
                const isEven = index % 2 === 0
                
                return (
                  <div key={index} className={`relative flex items-center mb-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-300 hidden md:flex items-center justify-center z-10">
                      <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    {/* Timeline Content */}
                    <div className={`w-full md:w-5/12 ${
                      isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                    }`}>
                      <div className="card p-6">
                        <div className="flex items-center mb-4 md:hidden">
                          <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center mr-4`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-primary-red">{item.year}</div>
                        </div>
                        <div className="hidden md:block text-2xl font-bold text-primary-red mb-4">{item.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section 
        id="values" 
        data-animate
        className={`section-padding bg-white transition-all duration-1000 ${
          isVisible['values'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do at Fresh Masala
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section 
        id="mission-vision" 
        data-animate
        className={`section-padding bg-gray-50 transition-all duration-1000 ${
          isVisible['mission-vision'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-red/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-red" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide the finest organic spices that bring authentic flavors to every kitchen, 
                while supporting sustainable farming practices and building lasting partnerships with 
                our clients and farming communities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  Deliver premium quality organic spices
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  Support sustainable farming practices
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  Build lasting client relationships
                </li>
              </ul>
            </div>
            
            {/* Vision */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                To become the most trusted name in organic spices across the region, known for our 
                commitment to quality, innovation, and customer satisfaction, while preserving 
                traditional spice-making methods for future generations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  Regional market leadership
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  Innovation in spice processing
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  Preserve traditional methods
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section 
        id="achievements" 
        data-animate
        className={`section-padding bg-white transition-all duration-1000 ${
          isVisible['achievements'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Our Achievements</h2>
            <p className="section-subtitle">
              Certifications and milestones that reflect our commitment to quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Journey of Excellence
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of our growing family of satisfied clients who trust Fresh Masala 
            for premium organic spices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="btn bg-white text-primary-red hover:bg-gray-100 text-lg px-8 py-4"
            >
              Partner With Us
            </a>
            <a 
              href="/products" 
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-red text-lg px-8 py-4"
            >
              View Our Products
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default About