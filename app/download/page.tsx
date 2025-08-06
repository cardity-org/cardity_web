import Link from 'next/link'
import { ArrowRight, Download, Code, Package, Terminal, Database, Zap, Shield, Github, ExternalLink } from 'lucide-react'

const downloadOptions = [
  {
    title: 'CLI Tools',
    description: 'Complete command-line interface for Cardity development',
    icon: Terminal,
    downloads: [
      {
        name: 'cardity',
        description: 'Main CLI tool for project management',
        version: '0.1.0',
        size: '2.1 MB',
        platform: 'All Platforms'
      },
      {
        name: 'cardityc',
        description: 'Compiler for .car files',
        version: '0.1.0',
        size: '1.8 MB',
        platform: 'All Platforms'
      },
      {
        name: 'cardity_runtime',
        description: 'Runtime execution engine',
        version: '0.1.0',
        size: '2.3 MB',
        platform: 'All Platforms'
      },
      {
        name: 'cardity_drc20',
        description: 'DRC-20 token management tools',
        version: '0.1.0',
        size: '1.5 MB',
        platform: 'All Platforms'
      },
      {
        name: 'cardity_abi',
        description: 'ABI generator',
        version: '0.1.0',
        size: '1.2 MB',
        platform: 'All Platforms'
      },
      {
        name: 'cardity_deploy',
        description: 'Deployment tools',
        version: '0.1.0',
        size: '2.0 MB',
        platform: 'All Platforms'
      }
    ]
  },
  {
    title: 'Example Projects',
    description: 'Ready-to-use example projects and templates',
    icon: Code,
    downloads: [
      {
        name: 'Hello World',
        description: 'Simple Hello World protocol',
        version: '1.0.0',
        size: '2 KB',
        platform: 'Source Code'
      },
      {
        name: 'Counter Protocol',
        description: 'Basic counter with increment/decrement',
        version: '1.0.0',
        size: '3 KB',
        platform: 'Source Code'
      },
      {
        name: 'Wallet Protocol',
        description: 'Simple wallet with deposit/withdraw',
        version: '1.0.0',
        size: '5 KB',
        platform: 'Source Code'
      },
      {
        name: 'DRC-20 Token',
        description: 'Complete DRC-20 token implementation',
        version: '1.0.0',
        size: '8 KB',
        platform: 'Source Code'
      },
      {
        name: 'Event Demo',
        description: 'Event system demonstration',
        version: '1.0.0',
        size: '4 KB',
        platform: 'Source Code'
      },
      {
        name: 'Voting System',
        description: 'Decentralized voting protocol',
        version: '1.0.0',
        size: '6 KB',
        platform: 'Source Code'
      }
    ]
  },
  {
    title: 'Development Kit',
    description: 'Complete development environment setup',
    icon: Package,
    downloads: [
      {
        name: 'Cardity Dev Kit',
        description: 'Complete development toolkit',
        version: '0.1.0',
        size: '15 MB',
        platform: 'All Platforms'
      },
      {
        name: 'VS Code Extension',
        description: 'Cardity language support for VS Code',
        version: '0.1.0',
        size: '500 KB',
        platform: 'VS Code'
      },
      {
        name: 'Project Templates',
        description: 'Starter project templates',
        version: '1.0.0',
        size: '2 MB',
        platform: 'Source Code'
      }
    ]
  }
]

const platforms = [
  {
    name: 'macOS',
    icon: '🍎',
    architectures: ['Intel x64', 'Apple Silicon'],
    packageManagers: ['Homebrew', 'Direct Download']
  },
  {
    name: 'Linux',
    icon: '🐧',
    architectures: ['x64', 'ARM64'],
    packageManagers: ['APT', 'YUM', 'Direct Download']
  },
  {
    name: 'Windows',
    icon: '🪟',
    architectures: ['x64'],
    packageManagers: ['Chocolatey', 'Direct Download']
  }
]

export default function DownloadPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">
          Download Cardity
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Get the latest Cardity tools, examples, and development kits to start building smart contracts on Dogecoin
        </p>
      </div>

      {/* Quick Start */}
      <div className="mb-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Start
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Choose your platform and get started with Cardity in minutes
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {platforms.map(platform => (
              <div key={platform.name} className="bg-gray-800 rounded-lg p-6">
                <div className="text-4xl mb-4">{platform.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {platform.name}
                </h3>
                <div className="text-sm text-gray-400 mb-4">
                  <div className="mb-2">
                    <strong>Architectures:</strong>
                    <div className="mt-1">
                      {platform.architectures.map(arch => (
                        <span key={arch} className="inline-block bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Package Managers:</strong>
                    <div className="mt-1">
                      {platform.packageManagers.map(pm => (
                        <span key={pm} className="inline-block bg-blue-600 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {pm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full">
                  Download for {platform.name}
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Or install via package manager:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 inline-block">
              <code className="text-green-400">brew install cardity</code>
            </div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="space-y-16">
        {downloadOptions.map((option, index) => (
          <section key={index}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {option.title}
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {option.description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {option.downloads.map((download, downloadIndex) => (
                <div key={downloadIndex} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {download.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {download.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Version:</span>
                      <span className="text-white">{download.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Size:</span>
                      <span className="text-white">{download.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-white">{download.platform}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full inline-flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Installation Instructions */}
      <section className="mt-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Installation Instructions
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">From Source</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Clone the repository
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

# Install dependencies
brew install cmake nlohmann-json curl libarchive openssl

# Build and install
mkdir build && cd build
cmake ..
make -j4
sudo make install

# Verify installation
cardity --version`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Using Package Manager</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# macOS (Homebrew)
brew install cardity

# Ubuntu/Debian
sudo apt-get install cardity

# Windows (Chocolatey)
choco install cardity

# Verify installation
cardity --version`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="mt-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            System Requirements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Storage</h3>
              <p className="text-gray-400 text-sm">
                Minimum 2GB free space for installation and development
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Memory</h3>
              <p className="text-gray-400 text-sm">
                4GB RAM minimum, 8GB recommended for development
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Network</h3>
              <p className="text-gray-400 text-sm">
                Internet connection for package downloads and updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Repository */}
      <section className="mt-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Open Source
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Cardity is completely open source. View the source code, contribute, or build from source.
          </p>
          
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
              Build from Source
            </Link>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="mt-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Need Help?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Having trouble with installation or setup? We're here to help.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/getting-started" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200">
              <div className="text-2xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive guides and tutorials
              </p>
            </Link>
            
            <a
              href="https://github.com/cardity-org/cardity-core/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-2xl mb-4">🐛</div>
              <h3 className="text-lg font-semibold text-white mb-2">Report Issues</h3>
              <p className="text-gray-400 text-sm">
                Found a bug? Report it on GitHub
              </p>
            </a>
            
            <a
              href="mailto:hello@cardity.org"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-2xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
              <p className="text-gray-400 text-sm">
                Get in touch for support
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 