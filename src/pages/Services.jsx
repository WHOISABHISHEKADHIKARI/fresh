import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Truck, Users, Package, Headphones, CheckCircle, ArrowRight, Star } from 'lucide-react'

const Services = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      title: 'Bulk Distribution',
      icon: <Truck className="w-12 h-12" />,
      description: 'Large-scale distribution services for restaurants, hotels, and food businesses',
      features: [
        'Minimum order quantity: 50kg',
        'Competitive wholesale pricing',
        'Timely delivery across regions',
        'Quality assurance guarantee',
        'Custom packaging options'
      ],
      image: '/api/placeholder/600/400'
    },
    {
      id: 2,
      title: 'Retail Supply',
      icon: <Users className="w-12 h-12" />,
      description: 'Premium spices for individual customers and small businesses',
      features: [
        'Small quantity orders available',
        'Home delivery service',
        'Fresh grinding on demand',
        'Subscription packages',
        'Gift packaging options'
      ],
      image: '/api/placeholder/600/400'
    },
    {
      id: 3,
      title: 'Custom Blending',
      icon: <Package className="w-12 h-12" />,
      description: 'Personalized spice blends according to your specific requirements',
      features: [
        'Recipe development consultation',
        'Custom spice ratios',
        'Private labeling available',
        'Taste testing sessions',
        'Bulk custom orders'
      ],
      image: '/api/placeholder/600/400'
    },
    {
      id: 4,
      title: 'Consultation Services',
      icon: <Headphones className="w-12 h-12" />,
      description: 'Expert guidance on spice selection, usage, and business solutions',
      features: [
        'Spice usage consultation',
        'Business setup guidance',
        'Quality control training',
        'Market analysis support',
        'Recipe optimization'
      ],
      image: '/api/placeholder/600/400'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We understand your specific requirements and preferences'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Create a customized solution plan tailored to your needs'
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Implement the solution with our quality assurance process'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Timely delivery with ongoing support and maintenance'
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Kumar Restaurant Chain',
      rating: 5,
      comment: 'Fresh Masala has been our trusted spice supplier for 3 years. Their bulk distribution service is exceptional with consistent quality and timely delivery.'
    },
    {
      name: 'Priya Sharma',
      business: 'Home Chef',
      rating: 5,
      comment: 'The custom blending service helped me create my signature masala. The consultation was thorough and the final product exceeded my expectations.'
    },
    {
      name: 'Mohammed Ali',
      business: 'Spice Retailer',
      rating: 5,
      comment: 'Their consultation services helped me set up my spice business. The market analysis and quality control training were invaluable.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Our Services - Fresh Masala | Distribution, Retail & Custom Solutions</title>
        <meta name="description" content="Comprehensive spice services including bulk distribution, retail supply, custom blending, and consultation. Serving restaurants, retailers, and individual customers." />
        <meta name="keywords" content="spice distribution, bulk spices, custom spice blends, spice consultation, wholesale spices" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl mb-8">Comprehensive spice solutions for every need</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From bulk distribution to custom blending, we provide comprehensive spice solutions 
              tailored to meet your specific requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center group cursor-pointer"
                onClick={() => setActiveService(index)}
              >
                <div className="text-red-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {services[activeService].title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {services[activeService].description}
              </p>
              <div className="space-y-3">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300">
                Get Quote
              </button>
            </div>
            <div>
              <img 
                src={services[activeService].image} 
                alt={services[activeService].title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure the best service delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What our clients say about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Contact us today to discuss your spice requirements</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Get Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300">
              Call Us Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services