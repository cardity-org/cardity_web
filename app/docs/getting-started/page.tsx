import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, CheckCircle, Database, Terminal } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'Get started with Cardity smart contract development. Install CLI tools, write your first contract, and deploy to Dogecoin UTXO blockchain.',
  keywords: 'Cardity getting started, smart contract tutorial, Dogecoin development, UTXO programming, first contract',
  openGraph: {
    title: 'Getting Started with Cardity - Smart Contract Development',
    description: 'Learn how to install Cardity CLI, write your first smart contract, and deploy to Dogecoin UTXO blockchain.',
  },
}

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Getting Started
        </h1>
        <p className="text-lg text-gray-400">
          Install Cardity CLI and write your first smart contract in minutes
        </p>
      </div>

      <div className="space-y-12">
        {/* Installation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Download className="w-6 h-6 mr-3 text-blue-400" />
            Installation
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">From Source</h3>
            <CodeBlock
              code={`# Clone the repository
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

# Build and install
mkdir build && cd build
cmake ..
make
sudo make install

# Verify installation
cardity --version`}
              language="bash"
            />
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Using Package Manager</h3>
            <CodeBlock
              code={`# Install via npm (coming soon)
npm install -g cardityc

# Verify installation
cardityc --version`}
              language="bash"
            />
            <p className="text-sm text-gray-400 mt-2">
              If installation is successful, you should see output like <code className="bg-gray-800 px-1 rounded">cardity 0.1.0</code>
            </p>
          </div>
        </section>

        {/* Your First Contract */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Play className="w-6 h-6 mr-3 text-blue-400" />
            Your First Contract
          </h2>
          
          <p className="text-gray-400 mb-6">
            Create a simple Hello World contract to get familiar with Cardity's syntax:
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Create Contract File</h3>
            <p className="text-gray-400 mb-4">Create a file named <code className="bg-gray-800 px-1 rounded">hello.car</code>:</p>
            <CodeBlock
              code={`protocol HelloCardity {
  version: "1.0.0";
  owner: "doge1hello123";
  
  state {
    message: string = "Hello, Cardity!";
    count: int = 0;
  }
  
  event MessageUpdated {
    new_message: string;
  }
  
  method get_message() {
    return state.message;
  }
  
  method set_message(new_message) {
    state.message = new_message;
    emit MessageUpdated(new_message);
  }
  
  method increment() {
    state.count = state.count + 1;
  }
  
  method get_count() {
    return state.count;
  }
}`}
              language="cardity"
              showLineNumbers={true}
            />
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Compile Contract</h3>
            <CodeBlock
              code={`# Compile to binary format
cardityc hello.car --format carc

# This generates hello.carc file`}
              language="bash"
            />
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Run Contract</h3>
            <CodeBlock
              code={`# Run the contract
cardity_runtime hello.car set_message "Hello, World!"
cardity_runtime hello.car get_message
cardity_runtime hello.car increment
cardity_runtime hello.car get_count`}
              language="bash"
            />
          </div>
        </section>

        {/* Key Concepts */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Key Concepts
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Protocol</h3>
              <p className="text-gray-400 mb-4">
                Similar to Solidity's Contract, Protocol is the basic unit of Cardity contracts. Each protocol contains state, methods, and events.
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Defines contract structure
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">State</h3>
              <p className="text-gray-400 mb-4">
                Persistent data stored in UTXO. Supports basic types like int, string, bool, and complex data structures.
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Database className="w-4 h-4 mr-1" />
                Persistent storage
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Methods</h3>
              <p className="text-gray-400 mb-4">
                Executable functions that can modify state, return values, or trigger events. Supports parameters and return values.
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Code className="w-4 h-4 mr-1" />
                Business logic
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Events</h3>
              <p className="text-gray-400 mb-4">
                Used to record important information during contract execution, which can be monitored and processed by external systems.
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Logging system
              </div>
            </div>
          </div>
        </section>

        {/* DRC-20 Token Example */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            DRC-20 Token Example
          </h2>
          
          <p className="text-gray-400 mb-6">
            Cardity supports the complete DRC-20 token standard, making it easy to create tokens on Dogecoin:
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">DRC-20 Token Template</h3>
            <CodeBlock
              code={`# Generate DRC-20 token template
cardity_drc20 template basic --tick MYT --name "My Token" --output my_token.car

# Compile DRC-20 token
cardity_drc20 compile my_token.car

# Validate token definition
cardity_drc20 validate my_token.car

# Generate deployment inscription
cardity_drc20 deploy my_token.car --output deploy.json`}
              language="bash"
            />
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">DRC-20 Token Code</h3>
            <CodeBlock
              code={`protocol MyDrc20Token {
  version: "1.0.0";
  owner: "doge1token123";
  
  // DRC-20 token definition
  drc20 {
    tick: "MYT";
    name: "My Token";
    max_supply: "1000000";
    mint_limit: "1000";
    decimals: "18";
    deployer: "doge1token123";
  }
  
  state {
    total_supply: int = 0;
    deployed: bool = false;
  }
  
  method deploy() {
    if (!state.deployed) {
      state.deployed = true;
      emit TokenDeployed(drc20.tick, drc20.max_supply);
      return "Token deployed successfully";
    }
    return "Token already deployed";
  }
  
  method mint(amount) {
    if (!state.deployed) return "Token not deployed";
    if (amount <= 0) return "Invalid amount";
    if (state.total_supply + amount > drc20.max_supply) return "Exceeds max supply";
    
    state.total_supply = state.total_supply + amount;
    emit TokenMinted(drc20.tick, amount, state.total_supply);
    return "Minted successfully";
  }
  
  event TokenDeployed {
    tick: string;
    max_supply: string;
  }
  
  event TokenMinted {
    tick: string;
    amount: int;
    total_supply: int;
  }
}`}
              language="cardity"
              showLineNumbers={true}
            />
          </div>
        </section>

        {/* CLI Tools */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-blue-400" />
            CLI Tools
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Project Management</h3>
              <CodeBlock
                code={`# Initialize new project
cardity init

# Build project
cardity build

# Run tests
cardity test

# Package management
cardity install <package>
cardity uninstall <package>
cardity list
cardity search <query>`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Compiler Tools</h3>
              <CodeBlock
                code={`# Compile to binary format
cardityc main.car --format carc

# Compile to JSON format
cardityc main.car --format json

# Generate deployment package
cardityc main.car -o deployed.carc

# Generate ABI
cardity_abi main.car main.abi

# Run protocol
cardity_runtime main.car set_message "Hello"`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Deployment Tools</h3>
              <CodeBlock
                code={`# Validate .carc file
cardity_deploy validate protocol.carc

# View protocol info
cardity_deploy info protocol.carc

# Deploy to Dogecoin chain
cardity_deploy deploy protocol.carc --address doge1... --private-key ...

# Create inscription transaction
cardity_deploy inscription protocol.carc --address doge1... --output inscription.txt`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Next Steps
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Now that you've successfully created your first Cardity contract, you can:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Learn complete language syntax and features
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Explore standard library functionality
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Understand how to deploy contracts to Dogecoin network
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                View more examples and best practices
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/reference" className="btn-primary inline-flex items-center">
                Language Reference
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
  )
} 