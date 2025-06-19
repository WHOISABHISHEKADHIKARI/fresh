import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary-red to-accent-orange bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-primary-red to-accent-orange rounded-full blur-sm" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-red to-accent-orange text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-primary-red bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound