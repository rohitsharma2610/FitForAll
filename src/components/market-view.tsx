import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  ShoppingCart,
  Star,
  Plus,
  ChevronDown,
  Heart,
  Zap,
  Dumbbell,
  Brain,
  Leaf,
  Clock,
  Award,
  Flame
} from 'lucide-react';
import { cn } from '../lib/utils';

const products = [
  {
    id: 1,
    name: 'Premium Whey Protein',
    category: 'Supplements',
    price: 49.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
    description: 'High-quality whey protein for optimal muscle recovery and growth.',
    tags: ['Recovery', 'Muscle Growth', 'Post-Workout'],
    featured: true,
    discount: 15,
    bestseller: true
  },
  {
    id: 2,
    name: 'Electrolyte Hydration Pack',
    category: 'Hydration',
    price: 24.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1550505095-81378a674395?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced electrolyte formula for enhanced hydration during intense workouts.',
    tags: ['Hydration', 'Performance', 'Endurance'],
    featured: false,
    discount: 0,
    bestseller: false
  },
  {
    id: 3,
    name: 'BCAA Energy Blend',
    category: 'Supplements',
    price: 34.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?auto=format&fit=crop&w=800&q=80',
    description: 'Premium BCAA supplement with added energy boost for training.',
    tags: ['Energy', 'Recovery', 'Focus'],
    featured: false,
    discount: 0,
    bestseller: true
  },
  {
    id: 4,
    name: 'Pre-Workout Amplifier',
    category: 'Performance',
    price: 39.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80',
    description: 'Explosive energy formula with beta-alanine and caffeine for maximum performance.',
    tags: ['Energy', 'Focus', 'Strength'],
    featured: true,
    discount: 10,
    bestseller: true
  },
  {
    id: 5,
    name: 'Collagen Peptides',
    category: 'Recovery',
    price: 32.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80',
    description: 'Support joint health and recovery with premium collagen peptides.',
    tags: ['Joints', 'Recovery', 'Anti-inflammatory'],
    featured: false,
    discount: 0,
    bestseller: false
  },
  {
    id: 6,
    name: 'Omega-3 Fish Oil',
    category: 'Supplements',
    price: 28.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1577460551100-d3f84b6e4c7c?auto=format&fit=crop&w=800&q=80',
    description: 'High-potency omega-3 fatty acids for heart health and reduced inflammation.',
    tags: ['Heart Health', 'Recovery', 'Anti-inflammatory'],
    featured: false,
    discount: 0,
    bestseller: false
  },
  {
    id: 7,
    name: 'Plant-Based Protein',
    category: 'Supplements',
    price: 54.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1622485482481-487909acf1d7?auto=format&fit=crop&w=800&q=80',
    description: 'Complete plant protein blend with all essential amino acids for vegan athletes.',
    tags: ['Vegan', 'Protein', 'Plant-Based'],
    featured: true,
    discount: 20,
    bestseller: false
  },
  {
    id: 8,
    name: 'Creatine Monohydrate',
    category: 'Performance',
    price: 29.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c1b5d28b9?auto=format&fit=crop&w=800&q=80',
    description: 'Pure micronized creatine for increased strength, power and muscle growth.',
    tags: ['Strength', 'Power', 'Muscle'],
    featured: false,
    discount: 0,
    bestseller: true
  },
  {
    id: 9,
    name: 'ZMA Sleep Formula',
    category: 'Recovery',
    price: 26.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1564452627303-115b5516e4b4?auto=format&fit=crop&w=800&q=80',
    description: 'Zinc, magnesium and vitamin B6 formula for enhanced recovery during sleep.',
    tags: ['Sleep', 'Recovery', 'Hormonal Support'],
    featured: false,
    discount: 0,
    bestseller: false
  },
  {
    id: 10,
    name: 'Nootropic Focus Blend',
    category: 'Performance',
    price: 45.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    description: 'Cognitive enhancer with alpha-GPC and bacopa for mental clarity and focus.',
    tags: ['Focus', 'Mental Clarity', 'Cognitive'],
    featured: true,
    discount: 15,
    bestseller: false
  },
  {
    id: 11,
    name: 'Greens Superfood Powder',
    category: 'Supplements',
    price: 42.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=800&q=80',
    description: 'Nutrient-dense superfood blend with 40+ ingredients for optimal health.',
    tags: ['Antioxidants', 'Immunity', 'Detox'],
    featured: false,
    discount: 0,
    bestseller: false
  },
  {
    id: 12,
    name: 'Mass Gainer Complex',
    category: 'Supplements',
    price: 59.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80',
    description: 'High-calorie formula with protein, carbs and healthy fats for muscle gain.',
    tags: ['Weight Gain', 'Muscle Mass', 'Calories'],
    featured: false,
    discount: 0,
    bestseller: true
  }
];

const categories = [
  'All Products',
  'Supplements',
  'Hydration',
  'Recovery',
  'Performance',
  'Equipment'
];

const featuredCollections = [
  {
    title: 'Pre-Workout Essentials',
    description: 'Boost your performance with these pre-workout supplements',
    image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?auto=format&fit=crop&w=800&q=80',
    icon: Zap
  },
  {
    title: 'Recovery Solutions',
    description: 'Optimize your recovery with these specialized products',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    icon: Clock
  },
  {
    title: 'Strength Builders',
    description: 'Build muscle and increase strength with these supplements',
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=800&q=80',
    icon: Dumbbell
  }
];

export function MarketView() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All Products' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
      (product.rating >= ratingFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      } else if (sortBy === 'price-low') {
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900">
          <div className="relative">
            <div className="absolute inset-0 bg-black/30" />
            <img 
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1920&q=80" 
              alt="Sports Nutrition" 
              className="h-64 w-full object-cover object-center md:h-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-4xl font-bold text-white md:text-5xl"
              >
                Elite Sports Nutrition
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 max-w-2xl text-lg text-gray-200"
              >
                Premium supplements and nutrition products scientifically formulated for peak athletic performance
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
              >
                Shop New Arrivals
              </motion.button>
            </div>
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Featured Collections</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <img 
                  src={collection.image} 
                  alt={collection.title} 
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-3 rounded-full bg-blue-500/20 p-3 backdrop-blur-sm">
                    <collection.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{collection.title}</h3>
                  <p className="mb-4 text-sm text-gray-300">{collection.description}</p>
                  <button className="rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                    View Collection
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-white">Sports Nutrition Market</h1>
          <p className="text-gray-400">
            Premium supplements and nutrition products tailored for athletes
          </p>
        </div>

        {/* Search and Cart */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
              >
                <Filter className="h-5 w-5" />
                Filter
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full z-10 mt-2 w-64 rounded-xl bg-gray-800 p-4 shadow-lg"
                >
                  <div className="mb-4">
                    <h3 className="mb-2 text-sm font-medium text-white">Price Range</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">${priceRange[0]}</span>
                      <span className="text-sm text-gray-400">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="mt-1 w-full"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="mb-2 text-sm font-medium text-white">Minimum Rating</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(rating)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            ratingFilter >= rating ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={() => {
                        setPriceRange([0, 100]);
                        setRatingFilter(0);
                      }}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Reset Filters
                    </button>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="relative">
              <button className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
                <ShoppingCart className="h-5 w-5" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sort and Categories */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl bg-gray-800"
            >
              {product.discount > 0 && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  {product.discount}% OFF
                </div>
              )}
              
              {product.bestseller && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-gray-900">
                  BESTSELLER
                </div>
              )}
              
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button 
                    onClick={handleAddToCart}
                    className="mx-1 rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  <button className="mx-1 rounded-full bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-sm text-white backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-400">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.category}</p>
                  </div>
                  <div className="text-right">
                    {product.discount > 0 ? (
                      <>
                        <p className="text-lg font-bold text-white">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                        <p className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-white">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-300">{product.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 py-2 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Benefits Section */}
        <div className="mb-12 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 p-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Why Choose Our Supplements</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-500/20 p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Premium Quality</h3>
              <p className="text-gray-300">All products are third-party tested for purity and potency</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-500/20 p-4 backdrop-blur-sm">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Science-Backed</h3>
              <p className="text-gray-300">Formulated by sports nutritionists and backed by research</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-500/20 p-4 backdrop-blur-sm">
                <Leaf className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Clean Ingredients</h3>
              <p className="text-gray-300">No artificial fillers, colors or banned substances</p>
            </div>
          </div>
        </div>
        
        {/* Featured Product */}
        <div className="mb-12 overflow-hidden rounded-xl bg-gray-800">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:order-2">
              <div className="mb-2 inline-block rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
                Featured Product
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">Ultimate Performance Stack</h2>
              <p className="mb-6 text-gray-300">
                Our most comprehensive supplement bundle designed for serious athletes. Includes pre-workout, 
                protein, BCAAs, creatine, and ZMA for complete performance and recovery support.
              </p>
              <div className="mb-6 flex items-center gap-4">
                <div className="text-3xl font-bold text-white">$149.99</div>
                <div className="text-xl text-gray-400 line-through">$199.99</div>
                <div className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                  SAVE 25%
                </div>
              </div>
              <div className="mb-6 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-300">128 reviews</span>
              </div>
              <button className="flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
                <ShoppingCart className="h-5 w-5" />
                Add Bundle to Cart
              </button>
            </div>
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80" 
                alt="Ultimate Performance Stack" 
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-400" />
                  Most Popular Bundle
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="rounded-xl bg-gray-800 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-white">Join Our Community</h2>
          <p className="mb-6 text-gray-300">
            Subscribe to our newsletter for exclusive deals, nutrition tips, and new product alerts
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-full bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}