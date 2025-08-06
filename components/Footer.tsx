import Link from 'next/link'
import { Code, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">Cardity</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A statically-typed curly-braces programming language designed for developing smart contracts that run on Dogecoin UTXO.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/cardity"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/carditylang"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@cardity.org"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/getting-started" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/reference" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Language Reference
                </Link>
              </li>
              <li>
                <Link href="/docs/cli" className="text-gray-400 hover:text-white transition-colors duration-200">
                  CLI Tools
                </Link>
              </li>
              <li>
                <Link href="/docs/deploy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Deployment Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/examples" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Code Examples
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/cardity/cardity/issues"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report Issues
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Cardity Team. Open source project under MIT License.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 