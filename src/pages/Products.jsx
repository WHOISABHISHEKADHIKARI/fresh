import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Star, ShoppingCart, Filter, Search, Grid, List } from 'lucide-react'

// Products component - displays all available spice products
const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')

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
      image: '/api/placeholder/300/300',
      description: 'Premium organic turmeric powder with high curcumin content',
      inStock: true,
      weight: '500g'
    },
    {
      id: 2,
      name: 'Red Chili Powder',
      category: 'powder',
      price: 80,
      originalPrice: 100,
      rating: 4.6,
      reviews: 189,
      image: '/api/placeholder/300/300',
      description: 'Spicy red chili powder made from premium quality chilies',
      inStock: true,
      weight: '250g'
    },
    {
      id: 3,
      name: 'Garam Masala',
      category: 'blend',
      price: 200,
      originalPrice: 250,
      rating: 4.9,
      reviews: 312,
      image: '/api/placeholder/300/300',
      description: 'Traditional garam masala blend with authentic taste',
      inStock: true,
      weight: '100g'
    },
    {
      id: 4,
      name: 'Whole Cumin Seeds',
      category: 'whole',
      price: 150,
      originalPrice: 180,
      rating: 4.7,
      reviews: 156,
      image: '/api/placeholder/300/300',
      description: 'Fresh whole cumin seeds with intense aroma',
      inStock: false,
      weight: '500g'
    },
    {
      id: 5,
      name: 'Coriander Powder',
      category: 'powder',
      price: 90,
      originalPrice: 110,
      rating: 4.5,
      reviews: 98,
      image: '/api/placeholder/300/300',
      description: 'Freshly ground coriander powder with natural flavor',
      inStock: true,
      weight: '250g'
    },
    {
      id: 6,
      name: 'Kitchen King Masala',
      category: 'blend',
      price: 180,
      originalPrice: 220,
      rating: 4.8,
      reviews: 203,
      image: '/api/placeholder/300/300',
      description: 'Versatile kitchen king masala for all dishes',
      inStock: true,
      weight: '100g'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Products', count: allProducts.length },
    { id: 'powder', name: 'Powder Spices', count: allProducts.filter(p => p.category === 'powder').length },
    { id: 'whole', name: 'Whole Spices', count: allProducts.filter(p => p.category === 'whole').length },
    { id: 'blend', name: 'Spice Blends', count: allProducts.filter(p => p.category === 'blend').length }
  ]

  useEffect(() => {
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm, sortBy, products])

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-red-600">₹{product.price}</span>
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          </div>
          <span className="text-sm text-gray-600">{product.weight}</span>
        </div>
        
        <button 
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 ${
            product.inStock 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Premium Organic Spices - Fresh Masala Products</title>
        <meta name="description" content="Browse our premium collection of organic spices, spice powders, whole spices, and spice blends. Fresh, authentic, and high-quality spices for your kitchen." />
        <meta name="keywords" content="organic spices, spice powder, whole spices, spice blends, turmeric, chili powder, garam masala" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Organic Spices</h1>
          <p className="text-xl mb-8">Discover our collection of fresh, authentic, and high-quality spices</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                      selectedCategory === category.id 
                        ? 'bg-red-100 text-red-600 border border-red-200' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Controls */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products