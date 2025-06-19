import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Spice Circles */}
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-red rounded-full animate-spin"></div>
          
          {/* Inner Spice Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-red to-accent-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Fresh Masala</h3>
          <p className="text-gray-600 text-sm">Preparing premium spices for you...</p>
        </div>
        
        {/* Animated Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary-red rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-red rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary-red rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner