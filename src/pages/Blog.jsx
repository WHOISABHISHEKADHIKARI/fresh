import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Calendar, User, Tag, ArrowRight, Search, Filter } from 'lucide-react'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const blogPosts = [
    {
      id: 1,
      title: 'The Health Benefits of Turmeric: Nature\'s Golden Spice',
      excerpt: 'Discover the amazing health benefits of turmeric, from its anti-inflammatory properties to its role in boosting immunity and promoting overall wellness.',
      content: 'Turmeric has been used for centuries in traditional medicine...',
      category: 'health',
      author: 'Dr. Priya Sharma',
      date: '2024-01-15',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['turmeric', 'health', 'anti-inflammatory', 'immunity']
    },
    {
      id: 2,
      title: 'Spice Storage Tips: Keeping Your Spices Fresh and Flavorful',
      excerpt: 'Learn the best practices for storing spices to maintain their freshness, flavor, and potency for longer periods.',
      content: 'Proper spice storage is crucial for maintaining quality...',
      category: 'tips',
      author: 'Chef Rajesh Kumar',
      date: '2024-01-10',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      tags: ['storage', 'freshness', 'tips', 'kitchen']
    },
    {
      id: 3,
      title: 'The Art of Spice Blending: Creating Your Signature Masala',
      excerpt: 'Master the art of creating custom spice blends with our expert guide to combining flavors and achieving the perfect balance.',
      content: 'Creating the perfect spice blend is both an art and science...',
      category: 'recipes',
      author: 'Master Chef Arjun',
      date: '2024-01-05',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      tags: ['blending', 'masala', 'recipes', 'cooking']
    },
    {
      id: 4,
      title: 'Organic vs Conventional Spices: What\'s the Difference?',
      excerpt: 'Understanding the differences between organic and conventional spices, and why choosing organic matters for your health and the environment.',
      content: 'The debate between organic and conventional spices...',
      category: 'education',
      author: 'Dr. Meera Patel',
      date: '2024-01-01',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['organic', 'conventional', 'health', 'environment']
    },
    {
      id: 5,
      title: 'Regional Indian Spices: A Journey Through Flavors',
      excerpt: 'Explore the diverse world of regional Indian spices and how different states contribute unique flavors to Indian cuisine.',
      content: 'India\'s culinary diversity is reflected in its spices...',
      category: 'culture',
      author: 'Food Historian Kavita',
      date: '2023-12-28',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      tags: ['regional', 'indian', 'culture', 'flavors']
    },
    {
      id: 6,
      title: 'Spice Grinding Techniques: From Whole to Powder',
      excerpt: 'Learn different spice grinding techniques and tools to achieve the perfect texture and release maximum flavor from your spices.',
      content: 'The way you grind your spices can significantly impact...',
      category: 'tips',
      author: 'Chef Suresh',
      date: '2023-12-25',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['grinding', 'techniques', 'flavor', 'tools']
    },
    {
      id: 7,
      title: 'Seasonal Spices: What to Use When',
      excerpt: 'Discover which spices work best in different seasons and how to adapt your cooking to seasonal ingredients and weather.',
      content: 'Seasonal cooking with spices enhances both flavor...',
      category: 'recipes',
      author: 'Chef Anita',
      date: '2023-12-20',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['seasonal', 'cooking', 'weather', 'adaptation']
    },
    {
      id: 8,
      title: 'The Science Behind Spice Flavors',
      excerpt: 'Understand the chemistry behind spice flavors and how different compounds create the tastes and aromas we love.',
      content: 'The complex world of spice chemistry reveals...',
      category: 'education',
      author: 'Dr. Vikram Singh',
      date: '2023-12-15',
      readTime: '9 min read',
      image: '/api/placeholder/400/250',
      tags: ['science', 'chemistry', 'flavors', 'compounds']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'health', name: 'Health & Wellness', count: blogPosts.filter(p => p.category === 'health').length },
    { id: 'tips', name: 'Tips & Tricks', count: blogPosts.filter(p => p.category === 'tips').length },
    { id: 'recipes', name: 'Recipes & Cooking', count: blogPosts.filter(p => p.category === 'recipes').length },
    { id: 'education', name: 'Education', count: blogPosts.filter(p => p.category === 'education').length },
    { id: 'culture', name: 'Culture & History', count: blogPosts.filter(p => p.category === 'culture').length }
  ]

  const featuredPost = blogPosts[0]

  useEffect(() => {
    setPosts(blogPosts)
    setFilteredPosts(blogPosts)
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, posts])

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const BlogCard = ({ post, featured = false }) => (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group ${
      featured ? 'md:flex md:items-center' : ''
    }`}>
      <div className={`relative overflow-hidden ${
        featured ? 'md:w-1/2' : ''
      }`}>
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? 'h-64 md:h-80' : 'h-48'
          }`}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${
        featured ? 'md:w-1/2' : ''
      }`}>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(post.date)}</span>
          <span className="mx-2">•</span>
          <User className="w-4 h-4 mr-2" />
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h3 className={`font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300 ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
              #{tag}
            </span>
          ))}
        </div>
        
        <button className="text-red-600 font-semibold hover:text-red-700 flex items-center group-hover:translate-x-2 transition-transform duration-300">
          Read More <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </article>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Spice Blog - Fresh Masala | Tips, Recipes & Spice Knowledge</title>
        <meta name="description" content="Explore our spice blog for cooking tips, health benefits, recipes, and expert knowledge about spices. Learn from our culinary experts and spice specialists." />
        <meta name="keywords" content="spice blog, cooking tips, spice recipes, health benefits, spice knowledge, culinary tips" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Spice Blog</h1>
          <p className="text-xl mb-8">Discover the world of spices through expert insights, tips, and recipes</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Article</h2>
          </div>
          <BlogCard post={featuredPost} featured={true} />
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Search Articles</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
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

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['turmeric', 'health', 'recipes', 'organic', 'tips', 'cooking', 'blending', 'storage'].map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(tag)}
                    className="bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 px-3 py-1 rounded-full text-sm transition-colors duration-300"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {currentPosts.length} of {filteredPosts.length} articles
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Blog Posts Grid */}
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {currentPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 border rounded-lg ${
                          currentPage === index + 1
                            ? 'bg-red-600 text-white border-red-600'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchTerm('')
                  }}
                  className="mt-4 text-red-600 hover:text-red-700 font-semibold"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Subscribe to our newsletter for the latest spice tips and recipes</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog