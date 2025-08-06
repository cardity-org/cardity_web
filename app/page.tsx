import Link from 'next/link'
import { Code, Zap, Shield, Globe, ArrowRight, Download, BookOpen, Play } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Logo size={80} showText={false} />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">Cardity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A statically-typed curly-braces programming language designed for developing smart contracts that run on Dogecoin UTXO.
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Using Solidity-style syntax with native UTXO protocol support, making smart contract development simple and efficient.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Get Started
              </Link>
              <Link href="/docs" className="btn-secondary inline-flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Read the docs
              </Link>
              <Link href="/docs/cli" className="btn-secondary inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download CLI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core Features
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Cardity combines the elegance of modern programming languages with the power of blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Solidity-style Syntax
              </h3>
              <p className="text-gray-400">
                Familiar syntax structure reduces learning curve and helps developers quickly get started with smart contract development
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Native UTXO Protocol
              </h3>
              <p className="text-gray-400">
                Designed specifically for Dogecoin UTXO model with native support for UTXO operations and state management
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Custom Contract Logic
              </h3>
              <p className="text-gray-400">
                Powerful contract logic expression capabilities supporting complex business scenarios and custom protocols
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quick Start
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Create a simple smart contract in just a few lines of code
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Hello Cardity Example
              </h3>
              <CodeBlock
                code={`<-- SPDX-License-Identifier: MIT -->

protocol HelloCardity {
  state {
    string message;
    int count;
  }
  
  method greet(string name) {
    self.message = "Hello, " + name + "!";
    self.count += 1;
  }
  
  event Greeted(string name, int timestamp);
}`}
                language="cardity"
              />
            </div>
            
            <div className="space-y-6">
              <div className="card">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Install CLI
                </h4>
                <CodeBlock
                  code={`npm install -g cardityc`}
                  language="bash"
                />
              </div>
              
              <div className="card">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Build Contract
                </h4>
                <CodeBlock
                  code={`cardity build hello.cardity`}
                  language="bash"
                />
              </div>
              
              <div className="card">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Deploy to Dogecoin
                </h4>
                <CodeBlock
                  code={`cardity deploy hello.carc`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Try Cardity Online
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experiment with Cardity in your browser with our online playground
            </p>
          </div>
          
          <div className="card max-w-4xl mx-auto">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Cardity Playground</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700">
                    Hello World!
                  </button>
                  <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700">
                    DRC20
                  </button>
                  <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700">
                    Simple Auction
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                <textarea 
                  className="w-full h-32 bg-transparent text-gray-300 font-mono text-sm resize-none border-none outline-none"
                  placeholder="// Write your Cardity code here..."
                  defaultValue={`<-- SPDX-License-Identifier: MIT -->

protocol HelloCardity {
  state {
    string message;
  }
  
  method greet(string name) {
    self.message = "Hello, " + name + "!";
  }
}`}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Compiler version: 0.1.0
                </div>
                <button className="btn-primary">
                  Compile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your Cardity journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our developer community and explore the unlimited possibilities of smart contracts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/examples" className="btn-secondary inline-flex items-center">
              View Examples
              <Globe className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 