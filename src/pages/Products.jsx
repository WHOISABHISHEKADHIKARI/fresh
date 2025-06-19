import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'

// Custom hook for intersection observer (lazy loading)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    
    // Unobserve after intersection if once is true
    if (entry.isIntersecting && options.once) {
      observer.unobserve(entry.target);
    }
  }, [options.once]);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    });
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, options.root, options.rootMargin, options.threshold]);

  return [ref, isIntersecting];
};

// LazyProductCard component for optimized rendering
const LazyProductCard = ({ product, index, viewMode, calculateDiscount }) => {
  const [ref, isVisible] = useIntersectionObserver({
    rootMargin: '200px 0px', // Load when within 200px of viewport
    once: true // Only trigger once
  });

  // Staggered animation delay based on index
  const animationDelay = Math.min(index * 50, 500); // Cap at 500ms
  
  // Format price with locale
  const formatPrice = (price) => {
    return price.toFixed(2);
  };
  
  // Only render full content when visible or close to viewport
  if (viewMode === 'list') {
    return (
      <div 
        ref={ref}
        className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-lg product-card transform-gpu backface-visibility-hidden ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {isVisible ? (
          <>
            {/* Product Image - List View */}
            <div className="relative md:w-1/3 overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="eager" 
                decoding="async"
                fetchpriority="high"
                onLoad={(e) => {
                  console.log('Image loaded in component:', product.image);
                  e.target.classList.add('loaded');
                }}
                onError={(e) => {
                  console.log('Image error in component:', product.image);
                  // Fallback for image loading errors
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTAwIDcwQzg5LjUgNzAgODEgNzguNSA4MSA4OUM4MSA5OS41IDg5LjUgMTA4IDEwMCAxMDhDMTEwLjUgMTA4IDExOSA5OS41IDExOSA4OUMxMTkgNzguNSAxMTAuNSA3MCAxMDAgNzBaTTEwMCAxMjBDNzguOSAxMjAgNjIgMTM2LjkgNjIgMTU4SDE0MEMxNDAgMTM2LjkgMTIxLjEgMTIwIDEwMCAxMjBaIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+Cg==';
                  e.target.classList.add('loaded');
                }}
              />
              {product.originalPrice > product.price && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {calculateDiscount(product.originalPrice, product.price)}% OFF
                </div>
              )}
            </div>
            {/* Product Details - List View */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-bold text-2xl text-gray-900">${formatPrice(product.price)}</p>
                  {product.originalPrice > product.price && (
                    <p className="text-lg text-gray-500 line-through">${formatPrice(product.originalPrice)}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
                    {product.weight}
                  </span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <a 
                href={`https://wa.me/9779865412482?text=I'm%20interested%20in%20buying%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.weight)})%20for%20$${product.price}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Buy Now on WhatsApp
              </a>
            </div>
          </>
        ) : (
          // Lightweight placeholder for list view
          <div className="w-full h-[200px] bg-gray-100 flex">
            <div className="w-1/3 bg-gray-200"></div>
            <div className="w-2/3 p-4">
              <div className="h-6 bg-gray-200 w-1/3 mb-4 rounded"></div>
              <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Grid view (default)
  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 product-card transform-gpu backface-visibility-hidden ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {isVisible ? (
        <>
          <div className="relative overflow-hidden group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              onLoad={(e) => {
                console.log('Grid image loaded:', product.image);
                e.target.classList.add('loaded');
              }}
              onError={(e) => {
                console.log('Grid image error:', product.image);
                // Fallback for image loading errors
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTAwIDcwQzg5LjUgNzAgODEgNzguNSA4MSA4OUM4MSA5OS41IDg5LjUgMTA4IDEwMCAxMDhDMTEwLjUgMTA4IDExOSA5OS41IDExOSA4OUMxMTkgNzguNSAxMTAuNSA3MCAxMDAgNzBaTTEwMCAxMjBDNzguOSAxMjAgNjIgMTM2LjkgNjIgMTU4SDE0MEMxNDAgMTM2LjkgMTIxLjEgMTIwIDEwMCAxMjBaIiBmaWxsPSIjRTVFN0VCIi8+PC9zdmc+Cg==';
                e.target.classList.add('loaded');
              }}
            />
            {product.originalPrice > product.price && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                {calculateDiscount(product.originalPrice, product.price)}% OFF
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <a 
                href={`https://wa.me/9779865412482?text=I'm%20interested%20in%20buying%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.weight)})%20for%20$${product.price}`} 
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
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">{product.category}</p>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
                <span className="text-xs ml-1">{product.rating}</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-900">${formatPrice(product.price)}</p>
              {product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through">${formatPrice(product.originalPrice)}</p>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                {product.weight}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </>
      ) : (
        // Lightweight placeholder when not visible
        <div className="w-full h-[300px] bg-gray-100"></div>
      )}
    </div>
  );
};
import { Star, ShoppingCart, Filter, Search, Grid, List } from 'lucide-react'
import SkeletonLoader from '../components/SkeletonLoader'

// Import product images
import turmericImg from '../assets/images/Turmeric Powder 3D Box.jpg'
import chiliImg from '../assets/images/Chilli Powder 3D Box.jpg'
import blackPepperImg from '../assets/images/Black Pepper 3D Box.jpg'
import corianderImg from '../assets/images/Coriander Powder 3D Box.jpg'
import cuminImg from '../assets/images/Cumin Powder 3D Box.jpg'
import chatMasalaImg from '../assets/images/Chat Masalaa 3D Box.jpg'
import gingerImg from '../assets/images/Ginger Powder 3D Box.jpg'
import whitePepperImg from '../assets/images/White Pepper 3D Box.jpg'
import kashmiriMirchImg from '../assets/images/Kashmiri Mirch 3D Box.jpg'
import chickenMasalaImg from '../assets/images/Chicken Masala 3D Box.jpg'
import muttonMasalaImg from '../assets/images/Mutton Masala 3D Box.jpg'
import mixMasalaImg from '../assets/images/Mix Masalaa 3D Box.jpg'
// Additional product images
import chatpateMasalaImg from '../assets/images/Chatpate Masala 3D Box.jpg'
import chowmeinMasalaImg from '../assets/images/Chowmein Masala 3D Box.jpg'
import fishMasalaImg from '../assets/images/Fish Masala 3D Box.jpg'
import kasuriMethiImg from '../assets/images/Kasuri Methi 3D Box.jpg'
import momoMasalaImg from '../assets/images/MOMO Masala 3D Box.jpg'
import panipuriMasalaImg from '../assets/images/Panipuri Masala 3D Box.jpg'
import sabjiMasalaImg from '../assets/images/Sabji Masala 3D Box.jpg'
import sekuwaMasalaImg from '../assets/images/Sekuwa Masala 3D Box.jpg'
import teaMasalaImg from '../assets/images/Tea Masala 3D Box.jpg'
import timurPowderImg from '../assets/images/Timur Powder 3D Box.jpg'
import gingerPowderImg from '../assets/images/Ginger Powder 3D Box.jpg'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: 'Organic Turmeric Powder',
      category: 'powder',
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 245,
      image: turmericImg,
      description: 'Premium organic turmeric powder with high curcumin content',
      inStock: true,
      weight: '500g'
    },
    {
      id: 2,
      name: 'Kashmiri Red Chilli',
      category: 'whole',
      price: 180,
      originalPrice: 220,
      rating: 4.7,
      reviews: 189,
      image: kashmiriMirchImg,
      description: 'Authentic Kashmiri red chillies known for their vibrant color and mild heat',
      inStock: true,
      weight: '250g'
    },
    {
      id: 3,
      name: 'Black Pepper Whole',
      category: 'whole',
      price: 210,
      originalPrice: 250,
      rating: 4.9,
      reviews: 312,
      image: blackPepperImg,
      description: 'Premium black peppercorns with intense aroma and flavor',
      inStock: true,
      weight: '300g'
    },
    {
      id: 4,
      name: 'Cardamom Green Pods',
      category: 'whole',
      price: 350,
      originalPrice: 400,
      rating: 4.8,
      reviews: 178,
      image: gingerImg,
      description: 'Aromatic green cardamom pods from the highlands of Kerala',
      inStock: true,
      weight: '100g'
    },
    {
      id: 5,
      name: 'Coriander Powder',
      category: 'powder',
      price: 90,
      originalPrice: 110,
      rating: 4.6,
      reviews: 156,
      image: corianderImg,
      description: 'Freshly ground coriander powder with citrusy notes',
      inStock: true,
      weight: '400g'
    },
    {
      id: 6,
      name: 'Cumin Seeds',
      category: 'whole',
      price: 130,
      originalPrice: 160,
      rating: 4.7,
      reviews: 203,
      image: cuminImg,
      description: 'Premium cumin seeds with intense aroma and earthy flavor',
      inStock: true,
      weight: '300g'
    },
    {
      id: 7,
      name: 'Garam Masala Blend',
      category: 'blend',
      price: 160,
      originalPrice: 190,
      rating: 4.9,
      reviews: 267,
      image: mixMasalaImg,
      description: 'Authentic garam masala blend with perfectly balanced spices',
      inStock: true,
      weight: '200g'
    },
    {
      id: 8,
      name: 'Cinnamon Sticks',
      category: 'whole',
      price: 140,
      originalPrice: 170,
      rating: 4.8,
      reviews: 192,
      image: whitePepperImg,
      description: 'Premium Ceylon cinnamon sticks with sweet and delicate flavor',
      inStock: true,
      weight: '150g'
    },
    {
      id: 9,
      name: 'Fenugreek Seeds',
      category: 'whole',
      price: 85,
      originalPrice: 100,
      rating: 4.5,
      reviews: 134,
      image: chickenMasalaImg,
      description: 'Aromatic fenugreek seeds with nutty flavor and health benefits',
      inStock: true,
      weight: '250g'
    },
    {
      id: 10,
      name: 'Chaat Masala Blend',
      category: 'blend',
      price: 110,
      originalPrice: 130,
      rating: 4.7,
      reviews: 178,
      image: chatMasalaImg,
      description: 'Tangy and spicy chaat masala blend for snacks and chaats',
      inStock: true,
      weight: '150g'
    },
    {
      id: 11,
      name: 'Cloves Whole',
      category: 'whole',
      price: 220,
      originalPrice: 260,
      rating: 4.8,
      reviews: 145,
      image: muttonMasalaImg,
      description: 'Aromatic whole cloves with intense flavor and aroma',
      inStock: true,
      weight: '100g'
    },
    {
      id: 12,
      name: 'Red Chilli Powder',
      category: 'powder',
      price: 100,
      originalPrice: 120,
      rating: 4.6,
      reviews: 189,
      image: chiliImg,
      description: 'Hot and vibrant red chilli powder for spicy dishes',
      inStock: true,
      weight: '300g'
    },
    {
      id: 13,
      name: 'Chatpate Masala',
      category: 'blend',
      price: 115,
      originalPrice: 135,
      rating: 4.7,
      reviews: 156,
      image: chatpateMasalaImg,
      description: 'Tangy and spicy chatpate masala blend for snacks and street food',
      inStock: true,
      weight: '200g'
    },
    {
      id: 14,
      name: 'Chowmein Masala',
      category: 'blend',
      price: 125,
      originalPrice: 145,
      rating: 4.8,
      reviews: 167,
      image: chowmeinMasalaImg,
      description: 'Authentic chowmein masala blend for perfect noodle dishes',
      inStock: true,
      weight: '150g'
    },
    {
      id: 15,
      name: 'Fish Masala',
      category: 'blend',
      price: 140,
      originalPrice: 165,
      rating: 4.6,
      reviews: 132,
      image: fishMasalaImg,
      description: 'Special fish masala blend for delicious seafood dishes',
      inStock: true,
      weight: '150g'
    },
    {
      id: 16,
      name: 'Kasuri Methi',
      category: 'whole',
      price: 95,
      originalPrice: 115,
      rating: 4.5,
      reviews: 124,
      image: kasuriMethiImg,
      description: 'Dried fenugreek leaves with distinctive aroma and flavor',
      inStock: true,
      weight: '100g'
    },
    {
      id: 17,
      name: 'Momo Masala',
      category: 'blend',
      price: 130,
      originalPrice: 150,
      rating: 4.9,
      reviews: 215,
      image: momoMasalaImg,
      description: 'Authentic momo masala blend for perfect dumplings',
      inStock: true,
      weight: '150g'
    },
    {
      id: 18,
      name: 'Panipuri Masala',
      category: 'blend',
      price: 105,
      originalPrice: 125,
      rating: 4.7,
      reviews: 176,
      image: panipuriMasalaImg,
      description: 'Tangy and spicy panipuri masala for perfect street food experience',
      inStock: true,
      weight: '100g'
    },
    {
      id: 19,
      name: 'Sabji Masala',
      category: 'blend',
      price: 110,
      originalPrice: 130,
      rating: 4.6,
      reviews: 143,
      image: sabjiMasalaImg,
      description: 'Perfect blend for enhancing vegetable dishes with authentic flavor',
      inStock: true,
      weight: '200g'
    },
    {
      id: 20,
      name: 'Sekuwa Masala',
      category: 'blend',
      price: 145,
      originalPrice: 170,
      rating: 4.8,
      reviews: 187,
      image: sekuwaMasalaImg,
      description: 'Traditional sekuwa masala blend for perfect grilled meat dishes',
      inStock: true,
      weight: '150g'
    },
    {
      id: 21,
      name: 'Tea Masala',
      category: 'blend',
      price: 95,
      originalPrice: 115,
      rating: 4.7,
      reviews: 156,
      image: teaMasalaImg,
      description: 'Aromatic tea masala blend for perfect masala chai',
      inStock: true,
      weight: '100g'
    },
    {
      id: 22,
      name: 'Timur Powder',
      category: 'powder',
      price: 160,
      originalPrice: 190,
      rating: 4.6,
      reviews: 142,
      image: timurPowderImg,
      description: 'Authentic Himalayan timur (Sichuan pepper) powder with unique citrusy flavor',
      inStock: true,
      weight: '100g'
    },
    {
      id: 23,
      name: 'Ginger Powder',
      category: 'powder',
      price: 120,
      originalPrice: 140,
      rating: 4.5,
      reviews: 138,
      image: gingerPowderImg,
      description: 'Premium ginger powder with warm, spicy flavor for cooking and beverages',
      inStock: true,
      weight: '150g'
    },
    {
      id: 24,
      name: 'Kashmiri Mirch',
      category: 'powder',
      price: 135,
      originalPrice: 160,
      rating: 4.7,
      reviews: 152,
      image: kashmiriMirchImg,
      description: 'Vibrant Kashmiri chili powder with rich color and mild heat',
      inStock: true,
      weight: '200g'
    },
    {
      id: 25,
      name: 'Mix Masala',
      category: 'blend',
      price: 150,
      originalPrice: 175,
      rating: 4.8,
      reviews: 195,
      image: mixMasalaImg,
      description: 'All-purpose mix masala blend for versatile cooking applications',
      inStock: true,
      weight: '250g'
    }
  ]

  // Format price in Nepali currency format (with thousand separators)
  const formatNepaliPrice = (price) => {
    return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  // Function to preload images for faster display after loading
  const preloadImages = (imageUrls) => {
    console.log('Preloading images:', imageUrls.length);
    imageUrls.forEach(src => {
      const img = new Image();
      img.onload = () => {
        // Mark image as loaded when it's ready
        console.log('Image loaded:', src);
        setTimeout(() => {
          const loadedImages = document.querySelectorAll(`img[src="${src}"]`);
          console.log('Found images to mark as loaded:', loadedImages.length);
          loadedImages.forEach(image => image.classList.add('loaded'));
        }, 100); // Small delay to ensure DOM is ready
      };
      img.src = src; // Set src after onload handler
    });
  };

  useEffect(() => {
    console.log('Starting loading process');
    // Fast loading simulation with minimal delay
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Track loading state in document title with percentage
    const updateTitle = (progress) => {
      document.title = `Loading (${Math.round(progress)}%) | Spice Emporium`;
    };
    updateTitle(0);
    
    // Preload all images immediately in background for faster display
    const allImages = allProducts.map(product => product.image);
    console.log('Starting image preload for', allImages.length, 'images');
    
    // Set products immediately to allow rendering
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    
    // Start preloading images
    preloadImages(allImages);
    
    // Accelerated progress simulation - much faster updates
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        // Very fast initial progress
        const increment = Math.max(10, 30 * (1 - prev/100));
        const newProgress = prev + increment;
        const cappedProgress = newProgress >= 100 ? 100 : newProgress;
        updateTitle(cappedProgress);
        return cappedProgress;
      });
    }, 30); // Much faster updates for smoother progress bar
    
    // Minimal loading time before showing content
    const loadingTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      updateTitle(100);
      
      // Immediate display after loading completes
      setIsLoading(false);
      document.title = 'Products | Spice Emporium';
      
      // Scroll to top when products load
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500); // Very short loading time
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
      document.title = 'Spice Emporium';
    };
  }, []);


  useEffect(() => {
    // Filter products based on category and search term
    let result = [...allProducts]
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory)
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      )
    }
    
    // Sort products
    switch(sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    
    setFilteredProducts(result)
  }, [selectedCategory, searchTerm, sortBy])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Premium Organic Spices | Fresh Masala Products</title>
        <meta name="description" content="Explore our premium range of organic spices, including turmeric, cardamom, cinnamon, and exclusive spice blends. Bulk orders available." />
        {/* Add preload hints for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add content-visibility CSS to improve rendering performance */}
       
      </Helmet>

      {isLoading ? (
        <>
          {/* Simplified Loading Progress Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
            <div 
              className="h-full bg-amber-500 transition-all duration-100 ease-out will-change-transform"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          {/* Minimal Loading indicator */}
          <div className="fixed top-3 right-4 z-50 bg-white text-xs font-medium text-amber-600 px-2 py-1 rounded">
            <span>{Math.round(loadingProgress)}%</span>
          </div>
          
          {/* Fixed minimal skeleton count for faster rendering */}
          <SkeletonLoader 
            count={4} 
            viewMode={viewMode} 
          />
        </>
      ) : (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-amber-500 to-red-600 text-white py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Premium Organic Spices</h1>
              <p className="text-xl md:text-2xl max-w-2xl animate-fadeIn animation-delay-200">From our farms to your kitchen. Experience the authentic taste of premium quality spices.</p>
            </div>
          </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8 animate-fadeIn animation-delay-300">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" size={20} />
              <select 
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="powder">Powder Spices</option>
                <option value="whole">Whole Spices</option>
                <option value="blend">Spice Blends</option>
              </select>
              
              <select 
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className={`p-2 rounded-md transition-colors duration-200 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button 
                className={`p-2 rounded-md transition-colors duration-200 ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md animate-fadeIn">
            <h3 className="text-xl font-medium text-gray-600">No products found</h3>
            <p className="text-gray-500 mt-2">Try changing your search or filter criteria</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <LazyProductCard 
                key={product.id} 
                product={product}
                index={index}
                viewMode={viewMode}
                calculateDiscount={calculateDiscount}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product, index) => (
              <LazyProductCard 
                key={product.id} 
                product={product}
                index={index}
                viewMode="list"
                calculateDiscount={calculateDiscount}
              />
            ))}
          </div>
        )}
      </div>
      </>
    )}
      </div>
  );
}

export default Products