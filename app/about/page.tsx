import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, Users, Heart, Github, Twitter, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Cardity',
  description: 'Learn about Cardity, the smart contract programming language for Dogecoin UTXO. Discover our mission, team, and commitment to open-source development.',
  keywords: 'Cardity about, smart contract language, Dogecoin development, open source, blockchain programming, team',
  openGraph: {
    title: 'About Cardity - Smart Contract Language for Dogecoin',
    description: 'Learn about Cardity, the smart contract programming language for Dogecoin UTXO. Discover our mission, team, and commitment to open-source development.',
  },
}

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">About Cardity</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Building the future of smart contracts on Dogecoin UTXO
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            A statically-typed programming language designed for developing smart contracts that run on Dogecoin UTXO
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">
            About Cardity
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A statically-typed curly-braces programming language designed for developing smart contracts that run on Dogecoin UTXO
          </p>
        </div>

        <div className="space-y-16">
          {/* Mission */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                To make smart contract development accessible, secure, and efficient on the Dogecoin blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Developer Friendly
                </h3>
                <p className="text-gray-400">
                  Familiar Solidity-style syntax reduces learning curve and enables rapid development
                </p>
              </div>
              
              <div className="card text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Secure by Design
                </h3>
                <p className="text-gray-400">
                  Built-in security features and static type checking prevent common vulnerabilities
                </p>
              </div>
              
              <div className="card text-center">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  UTXO Native
                </h3>
                <p className="text-gray-400">
                  Designed specifically for Dogecoin's UTXO model with native protocol support
                </p>
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Core Features
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4">Language Features</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Static Typing:</strong> Compile-time type checking for better reliability</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Solidity-style Syntax:</strong> Familiar syntax for Ethereum developers</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Event System:</strong> Built-in event emission and handling</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>DRC-20 Support:</strong> Complete DRC-20 token standard implementation</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>ABI Generation:</strong> Automatic Application Binary Interface generation</span>
                  </li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4">Development Tools</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>CLI Tools:</strong> Comprehensive command-line interface</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Package Manager:</strong> Dependency management and registry</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Testing Framework:</strong> Built-in testing and validation tools</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Deployment Tools:</strong> Easy deployment to Dogecoin blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Debugging Support:</strong> Advanced debugging and error handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Architecture */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Technical Architecture
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Compiler</h3>
                <p className="text-gray-400 mb-4">
                  Advanced compiler with lexical analysis, parsing, semantic analysis, and code generation
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Lexical Analyzer</li>
                  <li>• Syntax Parser</li>
                  <li>• Type System</li>
                  <li>• Code Generator</li>
                </ul>
              </div>
              
              <div className="card text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Runtime</h3>
                <p className="text-gray-400 mb-4">
                  Efficient runtime execution engine with UTXO state management and event processing
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• State Management</li>
                  <li>• Method Execution</li>
                  <li>• Event System</li>
                  <li>• UTXO Integration</li>
                </ul>
              </div>
              
              <div className="card text-center">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Toolchain</h3>
                <p className="text-gray-400 mb-4">
                  Complete development toolchain with package management and deployment capabilities
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Package Manager</li>
                  <li>• CLI Tools</li>
                  <li>• Deployment</li>
                  <li>• Testing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Development Team */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Development Team
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Cardity is developed by a passionate team of blockchain enthusiasts, language designers, and open-source contributors
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Core Team</h3>
                <p className="text-gray-400 text-sm">
                  Language designers and blockchain experts working on the core implementation
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                <p className="text-gray-400 text-sm">
                  Active community of developers, testers, and contributors from around the world
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
                <p className="text-gray-400 text-sm">
                  Security researchers and auditors ensuring the safety of smart contracts
                </p>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section>
            <div className="card text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Open Source
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Cardity is completely open source, licensed under the MIT License. We believe in transparency, 
                community collaboration, and the power of open development.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">MIT License</h3>
                  <p className="text-gray-400 text-sm">
                    The MIT License is a permissive license that allows for maximum freedom in using, 
                    modifying, and distributing the software while providing liability protection for the authors.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Community Driven</h3>
                  <p className="text-gray-400 text-sm">
                    Development is driven by the community through GitHub issues, pull requests, 
                    and active discussions. Everyone is welcome to contribute.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/cardity-org/cardity-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
                <Link href="/docs/developer-guide" className="btn-secondary inline-flex items-center">
                  <Code className="w-4 h-4 mr-2" />
                  Contribute
                </Link>
              </div>
            </div>
          </section>

          {/* Join Community */}
          <section>
            <div className="card text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Connect with other developers, get help, share your projects, and stay updated with the latest developments
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <a
                  href="https://github.com/cardity-org/cardity-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Github className="w-6 h-6 mr-3 text-white" />
                  <span className="text-white font-medium">GitHub</span>
                </a>
                
                <a
                  href="https://twitter.com/carditylang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6 mr-3 text-white" />
                  <span className="text-white font-medium">Twitter</span>
                </a>
                
                <a
                  href="mailto:hello@cardity.org"
                  className="flex items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Mail className="w-6 h-6 mr-3 text-white" />
                  <span className="text-white font-medium">Email</span>
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/examples" className="btn-secondary inline-flex items-center">
                  View Examples
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 