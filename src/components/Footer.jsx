import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' }
  ]

  const serviceLinks = [
    { name: 'B2B Supply', path: '/services#b2b-supply' },
    { name: 'Custom Packaging', path: '/services#packaging' },
    { name: 'White Labeling', path: '/services#white-label' },
    { name: 'Logistics', path: '/services#logistics' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/freshmasala' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/freshmasala' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/freshmasala' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/freshmasala' }
  ]

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-accent-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">FM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Fresh Masala</h3>
                <p className="text-sm text-gray-400">Premium Organic Spices</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium organic spices from farm to kitchen. Trusted by 500+ clients for over 7 years. 
              We are committed to bringing you the finest, freshly ground spices with authentic flavors.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-red transition-colors duration-300 group"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-red transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/why-us"
                  className="text-gray-300 hover:text-primary-red transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-primary-red transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Blog & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-primary-red transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h5 className="text-md font-medium mb-4 text-white">Business Hours</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary-red" />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary-red" />
                  <span>Sunday: Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-red mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white mb-1">Our Location</p>
                  <p>Fresh Masala Processing Unit</p>
                  <p>Spice Market Road, Agricultural Zone</p>
                  <p>City, State - 123456</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-red" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white mb-1">Phone</p>
                  <p>+91 98765 43210</p>
                  <p>+91 87654 32109</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-red" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white mb-1">Email</p>
                  <p>info@freshmasala.com</p>
                  <p>sales@freshmasala.com</p>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Button */}
            <div className="mt-6">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Fresh Masala. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-2 text-xs text-gray-500">
                <Link to="/privacy-policy" className="hover:text-primary-red transition-colors duration-300">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link to="/terms-of-service" className="hover:text-primary-red transition-colors duration-300">
                  Terms of Service
                </Link>
                <span>|</span>
                <Link to="/sitemap" className="hover:text-primary-red transition-colors duration-300">
                  Sitemap
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                Made with ❤️ for premium spice lovers
              </p>
              
              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-primary-red hover:bg-primary-red-dark rounded-full flex items-center justify-center transition-colors duration-300 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer