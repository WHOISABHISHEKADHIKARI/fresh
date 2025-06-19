import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ]

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-red text-white py-2 text-sm hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@freshmasala.com</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">7+ Years of Excellence</span> | <span>500+ Trusted Clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-in-out transform backdrop-saturate-150 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-xl translate-y-0 border-b border-gray-100/20' 
          : 'bg-gradient-to-r from-white via-white/98 to-white/95 translate-y-0'
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-red via-accent-orange to-red-600 rounded-full shadow-lg ring-2 ring-red-100 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">FM</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-red transition-colors duration-300">
                  Fresh Masala
                </h2>
                <p className="text-sm text-gray-600 -mt-1">Premium Organic Spices</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-primary-red group ${
                    isActivePath(link.path)
                      ? 'text-primary-red'
                      : 'text-gray-700 hover:text-primary-red'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-red to-accent-orange transform transition-all duration-700 ease-in-out ${
                    isActivePath(link.path)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/contact"
                className="btn bg-gradient-to-r from-primary-red to-accent-orange hover:from-accent-orange hover:to-primary-red text-white text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out font-medium"
                >
                  Get Quote
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full text-gray-700 hover:text-primary-red hover:bg-red-50 transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-180 hover:shadow-md"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out transform overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}>
          <div className="bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-xl border-t border-gray-100/20 shadow-2xl">
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-4 relative">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-500 ease-in-out transform hover:translate-x-2 ${
                      isActivePath(link.path)
                        ? 'text-primary-red bg-gradient-to-r from-red-50 to-red-50/50 shadow-sm'
                        : 'text-gray-700 hover:text-primary-red hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Contact Info */}
                <div className="pt-6 mt-2 border-t border-gray-200/50">
                  <div className="flex flex-col space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>info@freshmasala.com</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="btn bg-gradient-to-r from-primary-red to-accent-orange hover:from-accent-orange hover:to-primary-red text-white w-full mt-6 text-sm py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-500 ease-in-out font-medium"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  )
}

export default Navbar