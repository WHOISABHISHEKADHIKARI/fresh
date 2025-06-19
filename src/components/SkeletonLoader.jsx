import React from 'react'

// Ultra-lightweight skeleton component for product cards with minimal animations
const ProductCardSkeleton = ({ viewMode = 'grid', index = 0 }) => {
  // No animation delays for immediate rendering
  // Removed all staggered animations for faster loading
  
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Simplified image placeholder */}
        <div className="w-full h-40 bg-gray-200"></div>
        <div className="p-3">
          {/* Minimal content placeholders */}
          <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  } else {
    // Ultra-minimal list view skeleton
    return (
      <div className="bg-white rounded-lg overflow-hidden flex">
        {/* Simplified image placeholder */}
        <div className="w-1/3 h-32 bg-gray-200"></div>
        <div className="w-2/3 p-3">
          {/* Minimal content placeholders */}
          <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
}

// Lightweight skeleton component for filters and search
const FiltersSkeletonLoader = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-6 animate-fade-in-down will-change-transform">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded skeleton"></div>
          <div className="w-28 h-8 rounded skeleton"></div>
          <div className="w-28 h-8 rounded skeleton"></div>
        </div>
        <div className="relative flex-1 max-w-md">
          <div className="w-full h-8 rounded skeleton"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded skeleton"></div>
          <div className="w-8 h-8 rounded skeleton"></div>
        </div>
      </div>
    </div>
  )
}

// Ultra-lightweight skeleton loader component
const SkeletonLoader = ({ count = 4, viewMode = 'grid' }) => {
  // Create minimal array of skeleton items without priorities or animations
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={viewMode === 'grid' ? 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2' : 'w-full p-2'}>
      <ProductCardSkeleton viewMode={viewMode} index={index} />
    </div>
  ))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-2">
        {skeletons}
      </div>
    </div>
  )
}

export { ProductCardSkeleton, FiltersSkeletonLoader }
export default SkeletonLoader