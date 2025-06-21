import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Award, Shield, Clock, Users, Leaf, Truck, Star, CheckCircle } from 'lucide-react'

const WhyUs = () => {
  const [isVisible, setIsVisible] = useState({})

  const reasons = [
    {
      icon: <Award className="w-12 h-12" />,
      title: '7+ Years of Excellence',
      description: 'Established expertise in spice production, distribution, and retail with a proven track record of quality and reliability.',
      stats: '7+ Years Experience'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensure every batch meets our high standards. All products are tested for purity and freshness.',
      stats: '100% Quality Guaranteed'
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: 'Organic & Natural',
      description: 'We source only the finest organic spices, free from artificial additives, preservatives, and harmful chemicals.',
      stats: '100% Organic Certified'
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Fresh Grinding',
      description: 'Spices are ground fresh to order, preserving maximum flavor, aroma, and nutritional value for the best culinary experience.',
      stats: 'Ground Fresh Daily'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Trusted by Thousands',
      description: 'Over 50,000+ satisfied customers including restaurants, hotels, retailers, and home cooks trust our products.',
      stats: '50,000+ Happy Customers'
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'Reliable Delivery',
      description: 'Efficient logistics network ensures timely delivery across regions with proper packaging to maintain freshness.',
      stats: '99% On-Time Delivery'
    }
  ]

  const achievements = [
    {
      number: '7+',
      label: 'Years in Business',
      description: 'Established and growing'
    },
    {
      number: '5000+',
      label: 'Satisfied Customers',
      description: 'Across multiple regions'
    },
    {
      number: '50+',
      label: 'Spice Varieties',
      description: 'Premium quality range'
    },
    {
      number: '99%',
      label: 'Customer Satisfaction',
      description: 'Based on feedback'
    }
  ]

  const certifications = [
    {
      title: 'Organic Certification',
      description: 'Certified organic by recognized authorities',
      icon: <Leaf className="w-8 h-8" />
    },
    {
      title: 'Food Safety Standards',
      description: 'Compliant with food safety regulations',
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: 'Quality Management',
      description: 'ISO quality management systems',
      icon: <Award className="w-8 h-8" />
    }
  ]

  const testimonials = [
    {
      name: 'Amit Patel',
      role: 'Restaurant Owner',
      rating: 5,
      comment: 'Fresh Masala has been our spice supplier for 4 years. The consistency in quality and timely delivery makes them our preferred choice.',
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Sunita Devi',
      role: 'Home Cook',
      rating: 5,
      comment: 'The freshness and aroma of their spices is unmatched. My family can taste the difference in every dish I prepare.',
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Ravi Kumar',
      role: 'Spice Retailer',
      rating: 5,
      comment: 'Their wholesale rates are competitive and the quality is consistent. My customers always come back for more.',
      image: '/api/placeholder/80/80'
    }
  ]

  const comparisonFeatures = [
    {
      feature: 'Freshness Guarantee',
      us: true,
      others: false,
      description: 'Ground fresh to order vs pre-ground stock'
    },
    {
      feature: 'Organic Certification',
      us: true,
      others: false,
      description: '100% certified organic vs mixed quality'
    },
    {
      feature: 'Direct Sourcing',
      us: true,
      others: false,
      description: 'Direct from farmers vs multiple intermediaries'
    },
    {
      feature: 'Custom Blending',
      us: true,
      others: false,
      description: 'Personalized blends vs standard products only'
    },
    {
      feature: 'Quality Testing',
      us: true,
      others: true,
      description: 'Rigorous testing vs basic quality checks'
    },
    {
      feature: 'Customer Support',
      us: true,
      others: true,
      description: '24/7 support vs limited availability'
    }
  ]

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

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Why Choose Fresh Masala | 7+ Years of Quality Spice Excellence</title>
        <meta name="description" content="Discover why Fresh Masala is the trusted choice for premium organic spices. 7+ years of excellence, quality assurance, fresh grinding, and 5000+ satisfied customers." />
        <meta name="keywords" content="why choose fresh masala, quality spices, organic spices, fresh grinding, spice quality assurance" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Fresh Masala?</h1>
          <p className="text-xl mb-8">7+ years of excellence in delivering premium organic spices</p>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Sets Us Apart</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality, freshness, and customer satisfaction makes us the preferred choice for spice lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                id={`reason-${index}`}
                data-animate
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-6 text-center group ${
                  isVisible[`reason-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="text-red-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{reason.title}</h3>
                <p className="text-gray-600 mb-4">{reason.description}</p>
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                  {reason.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that speak for our commitment and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{achievement.label}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Certifications & Standards</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards with proper certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-red-600 mb-4 flex justify-center">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Fresh Masala vs Others</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we compare with other spice suppliers
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 p-4 font-semibold text-gray-800">
                <div>Features</div>
                <div className="text-center text-red-600">Fresh Masala</div>
                <div className="text-center">Others</div>
              </div>
              {comparisonFeatures.map((item, index) => (
                <div key={index} className="grid grid-cols-3 p-4 border-b border-gray-200 hover:bg-gray-50">
                  <div>
                    <div className="font-semibold text-gray-800">{item.feature}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                  <div className="text-center">
                    {item.us ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <div className="w-6 h-6 bg-red-200 rounded-full mx-auto"></div>
                    )}
                  </div>
                  <div className="text-center">
                    {item.others ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <div className="w-6 h-6 bg-red-200 rounded-full mx-auto"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from our valued customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Fresh Masala Difference</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers who trust us for their spice needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyUs