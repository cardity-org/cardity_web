import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag, ExternalLink } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Cardity 0.1.0 Release: Complete DRC-20 Support and Enhanced Toolchain',
    excerpt: 'We are excited to announce the release of Cardity 0.1.0, featuring complete DRC-20 token standard support, enhanced CLI tools, and improved deployment capabilities.',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['Release', 'DRC-20', 'CLI'],
    slug: 'cardity-0-1-0-release',
    featured: true
  },
  {
    id: 2,
    title: 'Building Your First DRC-20 Token with Cardity',
    excerpt: 'Learn how to create, deploy, and manage DRC-20 tokens on Dogecoin using Cardity\'s comprehensive toolchain and simplified syntax.',
    date: '2024-01-10',
    readTime: '8 min read',
    tags: ['Tutorial', 'DRC-20', 'Deployment'],
    slug: 'building-first-drc20-token'
  },
  {
    id: 3,
    title: 'Understanding Cardity\'s UTXO-Native Architecture',
    excerpt: 'Deep dive into how Cardity leverages Dogecoin\'s UTXO model for efficient smart contract execution and state management.',
    date: '2024-01-05',
    readTime: '12 min read',
    tags: ['Architecture', 'UTXO', 'Technical'],
    slug: 'utxo-native-architecture'
  },
  {
    id: 4,
    title: 'Cardity vs Solidity: A Developer\'s Perspective',
    excerpt: 'Comparing Cardity and Solidity from a developer\'s perspective, exploring syntax similarities, differences, and use cases.',
    date: '2023-12-28',
    readTime: '10 min read',
    tags: ['Comparison', 'Solidity', 'Development'],
    slug: 'cardity-vs-solidity'
  },
  {
    id: 5,
    title: 'Advanced Cardity Patterns: Event-Driven Architecture',
    excerpt: 'Explore advanced patterns for building event-driven smart contracts with Cardity, including best practices and real-world examples.',
    date: '2023-12-20',
    readTime: '15 min read',
    tags: ['Advanced', 'Events', 'Patterns'],
    slug: 'event-driven-architecture'
  },
  {
    id: 6,
    title: 'Deploying Cardity Contracts to Dogecoin Mainnet',
    excerpt: 'Step-by-step guide to deploying your Cardity smart contracts to the Dogecoin mainnet using OP_RETURN and inscription methods.',
    date: '2023-12-15',
    readTime: '7 min read',
    tags: ['Deployment', 'Mainnet', 'Guide'],
    slug: 'deploying-to-mainnet'
  },
  {
    id: 7,
    title: 'Cardity Package Management: Creating and Publishing Libraries',
    excerpt: 'Learn how to create, publish, and manage Cardity packages using the built-in package manager and registry system.',
    date: '2023-12-10',
    readTime: '9 min read',
    tags: ['Packages', 'Registry', 'Development'],
    slug: 'package-management'
  },
  {
    id: 8,
    title: 'Security Best Practices for Cardity Smart Contracts',
    excerpt: 'Essential security practices and patterns for writing secure Cardity smart contracts, including common pitfalls to avoid.',
    date: '2023-12-05',
    readTime: '11 min read',
    tags: ['Security', 'Best Practices', 'Audit'],
    slug: 'security-best-practices'
  }
]

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Cardity Blog
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Latest updates, tutorials, and insights about Cardity development
        </p>
      </div>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map(post => (
        <div key={post.id} className="mb-12">
          <div className="card">
            <div className="flex items-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Featured
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              {post.title}
            </h2>
            
            <p className="text-gray-400 mb-6 text-lg">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
            >
              Read more
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      ))}

      {/* All Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.filter(post => !post.featured).map(post => (
          <article key={post.id} className="card">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {post.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
              
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                Read more
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest Cardity updates, tutorials, and community news delivered to your inbox
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Browse by Category
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Releases', count: 3, color: 'from-blue-600 to-purple-600' },
            { name: 'Tutorials', count: 5, color: 'from-green-600 to-blue-600' },
            { name: 'Technical', count: 4, color: 'from-purple-600 to-pink-600' },
            { name: 'Community', count: 2, color: 'from-orange-600 to-red-600' }
          ].map(category => (
            <Link
              key={category.name}
              href={`/blog/category/${category.name.toLowerCase()}`}
              className="card text-center hover:scale-105 transition-transform duration-200"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {category.count} articles
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* External Resources */}
      <div className="mt-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            More Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Documentation</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/docs/getting-started" className="hover:text-white transition-colors duration-200">
                    Getting Started Guide
                  </Link>
                </li>
                <li>
                  <Link href="/docs/reference" className="hover:text-white transition-colors duration-200">
                    Language Reference
                  </Link>
                </li>
                <li>
                  <Link href="/docs/examples" className="hover:text-white transition-colors duration-200">
                    Code Examples
                  </Link>
                </li>
                <li>
                  <Link href="/docs/deploy" className="hover:text-white transition-colors duration-200">
                    Deployment Guide
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://github.com/cardity/cardity-core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 inline-flex items-center"
                  >
                    GitHub Repository
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/cardity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 inline-flex items-center"
                  >
                    Discord Community
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/carditylang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 inline-flex items-center"
                  >
                    Twitter Updates
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@cardity.org"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 