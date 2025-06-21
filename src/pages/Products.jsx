 
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ShoppingCart, Filter, Grid, List, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async'

// Custom hook for intersection observer (lazy loading)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  const observerRef = useRef(null);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    
    // Unobserve after intersection if once is true
    if (entry.isIntersecting && options.once && observerRef.current) {
      observerRef.current.unobserve(entry.target);
    }
  }, [options.once]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    });
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }
    
    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [callback, options.root, options.rootMargin, options.threshold]);

  return [ref, isIntersecting];
};

const LazyProductCard = ({ product, index, viewMode, calculateDiscount }) => {
  const [ref, isVisible] = useIntersectionObserver({
    rootMargin: '200px 0px',
    once: true
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  const animationDelay = Math.min(index * 50, 500);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const formatPrice = (price) => {
    // Convert USD to NPR (1 USD = approximately 133 NPR as of 2023)
    const nprPrice = price * 133;
    // Format with thousand separators and 2 decimal places
    return nprPrice.toLocaleString('en-NP', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  const cardContent = (
    <>
      <div className="relative overflow-hidden group h-64">
        {/* Low quality placeholder with blur effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm transition-opacity duration-500"
          style={{
            backgroundColor: '#f5f5f5', // Fallback background color
            backgroundImage: product.image ? `url(${product.image})` : 'none',
            opacity: imageLoaded ? 0 : 1,
            transform: 'scale(1.05)', // Slightly larger to prevent blur edges
          }}
          aria-hidden="true"
        />
        <img 
          src={product.image || 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%20viewBox%3D%220%200%20300%20300%22%3E%3Crect%20fill%3D%22%23f5f5f5%22%20width%3D%22300%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20x%3D%22150%22%20y%3D%22150%22%3EImage%20not%20available%3C%2Ftext%3E%3C%2Fsvg%3E'} 
          alt={product.name} 
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
          fetchpriority={index < 4 ? "high" : "low"}
          importance={index < 4 ? "high" : "low"}
          referrerpolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={(e) => {
            console.log(`Error loading image for ${product.name}`);
            e.target.onerror = null; // Prevent infinite error loop
            // Use a data URI for a simple colored placeholder
            e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%20viewBox%3D%220%200%20300%20300%22%3E%3Crect%20fill%3D%22%23f5f5f5%22%20width%3D%22300%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20x%3D%22150%22%20y%3D%22150%22%3EImage%20not%20available%3C%2Ftext%3E%3C%2Fsvg%3E';
            handleImageLoad(); // Mark as loaded even if it's the fallback image
          }}
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
            SALE
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          <Star className="w-4 h-4 text-amber-600" fill="currentColor" />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-amber-700 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 mb-2 flex-grow line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <p className="font-bold text-xl text-amber-700">₨ {formatPrice(product.price)}</p>
            {product.originalPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">₨ {formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <a 
            href={`https://wa.me/+9779865412482?text=I'm%20interested%20in%20buying%20${encodeURIComponent(product.name)}%20for%20₨%20${formatPrice(product.price)}%20(${product.weight})`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white py-2.5 rounded-lg font-semibold hover:from-amber-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            Order Now
          </a>
        </div>
      </div>
    </>
  );

  if (viewMode === 'list') {
    return (
      <div 
        ref={ref}
        className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-1 product-card transform-gpu ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {isVisible ? cardContent : <div className="w-full h-[200px] bg-gray-100 rounded-xl"></div>}
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 product-card transform-gpu ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {isVisible ? cardContent : <div className="w-full h-[400px] bg-gray-100 rounded-xl"></div>}
    </div>
  );
};



 

// Use dynamic imports for images to improve performance
const importImage = (imagePath) => {
  // Return from cache if available
  if (imageCache.has(imagePath)) {
    return imageCache.get(imagePath);
  }

  // Directly use the original format without WebP conversion for now
  // This simplifies the image loading process and reduces potential errors
  try {
    const imageUrl = new URL(`../assets/images/${imagePath}`, import.meta.url).href;
    
    // Store in cache
    imageCache.set(imagePath, imageUrl);
    return imageUrl;
  } catch (e) {
    console.error(`Error loading image: ${imagePath}`, e);
    // Return a placeholder image URL if the original image can't be loaded
    const placeholderUrl = new URL('../assets/images/placeholder.jpg', import.meta.url).href;
    imageCache.set(imagePath, placeholderUrl);
    return placeholderUrl;
  }
};

// Generate responsive image sources based on screen size
const getResponsiveImageSrc = (imagePath) => {
  if (!imagePath) {
    console.error('No image path provided to getResponsiveImageSrc');
    return {
      small: '',
      medium: '',
      large: '',
      placeholder: ''
    };
  }
  
  try {
    const baseUrl = importImage(imagePath);
    
    // For actual implementation, you would need to have different sized versions of images
    // This is a simplified example that returns the same image for all sizes
    return {
      small: baseUrl,  // For mobile
      medium: baseUrl, // For tablets
      large: baseUrl,  // Original size for desktop
      placeholder: baseUrl // Same image for placeholder
    };
  } catch (error) {
    console.error('Error in getResponsiveImageSrc:', error);
    return {
      small: '',
      medium: '',
      large: '',
      placeholder: ''
    };
  }
};

// Define image paths for lazy loading
const imagePaths = {
  turmericImg: 'Turmeric Powder 3D Box.jpg',
  chiliImg: 'Chilli Powder 3D Box.jpg',
  blackPepperImg: 'Black Pepper 3D Box.jpg',
  corianderImg: 'Coriander Powder 3D Box.jpg',
  cuminImg: 'Cumin Powder 3D Box.jpg',
  chatMasalaImg: 'Chat Masalaa 3D Box.jpg',
  gingerImg: 'Ginger Powder 3D Box.jpg',
  whitePepperImg: 'White Pepper 3D Box.jpg',
  kashmiriMirchImg: 'Kashmiri Mirch 3D Box.jpg',
  chickenMasalaImg: 'Chicken Masala 3D Box.jpg',
  muttonMasalaImg: 'Mutton Masala 3D Box.jpg',
  mixMasalaImg: 'Mix Masalaa 3D Box.jpg',
  chatpateMasalaImg: 'Chatpate Masala 3D Box.jpg',
  chowmeinMasalaImg: 'Chowmein Masala 3D Box.jpg',
  fishMasalaImg: 'Fish Masala 3D Box.jpg',
  kasuriMethiImg: 'Kasuri Methi 3D Box.jpg',
  momoMasalaImg: 'MOMO Masala 3D Box.jpg',
  panipuriMasalaImg: 'Panipuri Masala 3D Box.jpg',
  sabjiMasalaImg: 'Sabji Masala 3D Box.jpg',
  sekuwaMasalaImg: 'Sekuwa Masala 3D Box.jpg',
  teaMasalaImg: 'Tea Masala 3D Box.jpg',
  timurPowderImg: 'Timur Powder 3D Box.jpg',
  gingerPowderImg: 'Ginger Powder 3D Box.jpg'
};

// Create a cache for loaded images to prevent redundant loading
const imageCache = new Map();

// Define product images object with dynamic imports
const productImages = {};

// Initialize product images with error handling
Object.keys(imagePaths).forEach(key => {
  try {
    productImages[key] = importImage(imagePaths[key]);
    console.log(`Loaded image: ${key}`);
  } catch (error) {
    console.error(`Failed to load image: ${key}`, error);
    // Set a fallback image
    productImages[key] = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%20viewBox%3D%220%200%20300%20300%22%3E%3Crect%20fill%3D%22%23f5f5f5%22%20width%3D%22300%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20x%3D%22150%22%20y%3D%22150%22%3EImage%20not%20available%3C%2Ftext%3E%3C%2Fsvg%3E';
  }
});

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [preloadedImages, setPreloadedImages] = useState(new Set())
  
  // Function to preload images
  const preloadImage = useCallback((src) => {
    if (preloadedImages.has(src)) return; // Skip if already preloaded
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setPreloadedImages(prev => new Set([...prev, src]));
    };
  }, [preloadedImages]);

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
      image: productImages.turmericImg,
      imageKey: 'turmericImg',
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
      image: productImages.kashmiriMirchImg,
      imageKey: 'kashmiriMirchImg',
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
      imageKey: 'blackPepperImg',
      image: productImages.blackPepperImg,
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
      image: productImages.gingerImg,
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
      image: productImages.corianderImg,
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
      image: productImages.cuminImg,
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
      image: productImages.mixMasalaImg,
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
      image: productImages.whitePepperImg,
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
      image: productImages.chickenMasalaImg,
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
      image: productImages.chatMasalaImg,
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
      image: productImages.muttonMasalaImg,
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
      image: productImages.chiliImg,
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
      image: productImages.chatpateMasalaImg,
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
      image: productImages.chowmeinMasalaImg,
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
      image: productImages.fishMasalaImg,
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
      image: productImages.kasuriMethiImg,
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
      image: productImages.momoMasalaImg,
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
      image: productImages.panipuriMasalaImg,
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
      image: productImages.sabjiMasalaImg,
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
      image: productImages.sekuwaMasalaImg,
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
      image: productImages.teaMasalaImg,
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
      image: productImages.timurPowderImg,
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
      image: productImages.gingerPowderImg,
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
      image: productImages.kashmiriMirchImg,
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
      image: productImages.mixMasalaImg,
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


  // Preload the first few visible product images
  useEffect(() => {
    if (!isLoading && filteredProducts.length > 0) {
      // Preload only the first 4 visible products
      filteredProducts.slice(0, 4).forEach(product => {
        if (product.image) {
          preloadImage(product.image);
        }
      });
    }
  }, [filteredProducts, isLoading, preloadImage]);

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
          

        </>
      ) : (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-amber-700 to-red-700 text-white py-20 shadow-xl">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn tracking-tight">Premium Organic Spices</h1>
              <p className="text-xl md:text-2xl max-w-2xl animate-fadeIn animation-delay-200 opacity-90">From our farms to your kitchen. Experience the authentic taste of premium quality spices.</p>
            </div>
          </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8 animate-fadeIn animation-delay-300">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl border border-amber-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="text-amber-600" size={20} />
              <select 
                className="border border-amber-200 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 text-gray-700 font-medium"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="powder">Powder Spices</option>
                <option value="whole">Whole Spices</option>
                <option value="blend">Spice Blends</option>
              </select>
              
              <select 
                className="border border-amber-200 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 text-gray-700 font-medium"
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
                placeholder="Search premium spices..." 
                className="w-full border border-amber-200 rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-amber-600" size={18} />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                className={`p-2.5 rounded-md transition-all duration-200 shadow-sm ${viewMode === 'grid' ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white' : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button 
                className={`p-2.5 rounded-md transition-all duration-200 shadow-sm ${viewMode === 'list' ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white' : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'}`}
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
          <div className="text-center py-16 bg-white rounded-lg shadow-lg border border-amber-100 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-amber-700">No products found</h3>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">Try changing your search or filter criteria to find our premium spices</p>
          </div>
        ) : (
          <>
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-6'}`}>
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
            {/* Load More Button */}
            <div className="text-center mt-16 mb-8">
              <button 
                // TODO: Implement onClick functionality to load more products
                className="bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold py-3.5 px-10 rounded-full hover:from-amber-700 hover:to-red-700 transition-all duration-300 shadow-md transform hover:-translate-y-1"
              >
                Discover More
              </button>
            </div>
          </>
        )}
      </div>
      </>
    )}
    </div>
  );
}

export default Products
