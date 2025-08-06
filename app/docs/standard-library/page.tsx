import Link from 'next/link'
import { ArrowRight, Package, Code, Database, Zap, Shield, Settings } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

export default function StandardLibraryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Standard Library
        </h1>
        <p className="text-lg text-gray-400">
          Built-in libraries and utilities for Cardity development
        </p>
      </div>

      <div className="space-y-12">
        {/* Built-in Functions */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            Built-in Functions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Time Functions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">now()</code> - Current timestamp</li>
                <li><code className="bg-gray-800 px-1 rounded">time()</code> - Current time in seconds</li>
                <li><code className="bg-gray-800 px-1 rounded">date()</code> - Current date string</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Array Functions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">length()</code> - Get array length</li>
                <li><code className="bg-gray-800 px-1 rounded">push()</code> - Add element to array</li>
                <li><code className="bg-gray-800 px-1 rounded">pop()</code> - Remove last element</li>
                <li><code className="bg-gray-800 px-1 rounded">splice()</code> - Remove elements</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">String Functions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">length()</code> - String length</li>
                <li><code className="bg-gray-800 px-1 rounded">substring()</code> - Extract substring</li>
                <li><code className="bg-gray-800 px-1 rounded">toLowerCase()</code> - Convert to lowercase</li>
                <li><code className="bg-gray-800 px-1 rounded">toUpperCase()</code> - Convert to uppercase</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Math Functions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">abs()</code> - Absolute value</li>
                <li><code className="bg-gray-800 px-1 rounded">min()</code> - Minimum value</li>
                <li><code className="bg-gray-800 px-1 rounded">max()</code> - Maximum value</li>
                <li><code className="bg-gray-800 px-1 rounded">sqrt()</code> - Square root</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <CodeBlock
              code={`// Example usage of built-in functions
method process_data(items) {
  if (items.length() > 0) {
    for (i = 0; i < items.length(); i++) {
      item = items[i];
      if (item > 0) {
        state.total = state.total + abs(item);
      }
    }
  }
  
  state.last_updated = now();
  emit DataProcessed(state.total, state.last_updated);
}`}
              language="cardity"
              showLineNumbers={true}
            />
          </div>
        </section>

        {/* Package Management */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-400" />
            Package Management
          </h2>
          
          <p className="text-gray-400 mb-6">
            Cardity provides a comprehensive package management system for sharing and reusing code:
          </p>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Package Configuration</h3>
              <CodeBlock
                code={`{
  "name": "my-protocol",
  "version": "1.0.0",
  "description": "My Cardity Protocol",
  "dependencies": {
    "@cardity/standard": "^1.0.0",
    "@cardity/utils": "~2.0.0",
    "@cardity/drc20": "^1.0.0"
  },
  "devDependencies": {
    "@cardity/test": "^1.0.0"
  },
  "scripts": {
    "build": "cardity build",
    "test": "cardity test",
    "publish": "cardity publish"
  }
}`}
                language="json"
                showLineNumbers={true}
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Package Commands</h3>
              <CodeBlock
                code={`# Install packages
cardity install @cardity/standard
cardity install @cardity/utils@^2.0.0

# List installed packages
cardity list

# Search packages
cardity search "token"
cardity search "wallet"

# Update packages
cardity update
cardity update @cardity/standard

# Publish package
cardity publish`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Standard Packages */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Standard Packages
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-400" />
                @cardity/standard
              </h3>
              <p className="text-gray-400 mb-4">
                Core standard library providing essential utilities and data structures for Cardity development.
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">Features:</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• Data structures (Array, Map, Set)</li>
                  <li>• String manipulation utilities</li>
                  <li>• Math and number operations</li>
                  <li>• Time and date functions</li>
                  <li>• Validation helpers</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-400" />
                @cardity/utils
              </h3>
              <p className="text-gray-400 mb-4">
                Utility functions for common development tasks and helper methods.
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">Features:</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• Address validation and formatting</li>
                  <li>• Hash and encryption utilities</li>
                  <li>• JSON parsing and manipulation</li>
                  <li>• Error handling helpers</li>
                  <li>• Logging and debugging tools</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                @cardity/drc20
              </h3>
              <p className="text-gray-400 mb-4">
                Complete DRC-20 token standard implementation with deployment and management tools.
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">Features:</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• DRC-20 token templates</li>
                  <li>• Token deployment utilities</li>
                  <li>• Mint and transfer operations</li>
                  <li>• Token validation helpers</li>
                  <li>• Event emission for tokens</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-400" />
                @cardity/test
              </h3>
              <p className="text-gray-400 mb-4">
                Testing framework for Cardity protocols with assertion and mocking capabilities.
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">Features:</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• Unit testing framework</li>
                  <li>• Assertion functions</li>
                  <li>• Mock state and events</li>
                  <li>• Test coverage reporting</li>
                  <li>• Integration testing helpers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Using Standard Library */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Using Standard Library
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Import and Use</h3>
              <CodeBlock
                code={`// Import standard library functions
import "@cardity/standard";

protocol MyProtocol {
  version: "1.0.0";
  owner: "doge1protocol123";
  
  state {
    users: array = [];
    balances: map = {};
    last_updated: int = 0;
  }
  
  method add_user(name, initial_balance) {
    // Use built-in functions
    if (name.length() < 2) {
      return "Name too short";
    }
    
    if (initial_balance < 0) {
      return "Invalid balance";
    }
    
    user = {
      "id": "user_" + state.users.length(),
      "name": name,
      "balance": abs(initial_balance),
      "created_at": now()
    };
    
    state.users.push(user);
    state.balances[user.id] = user.balance;
    state.last_updated = now();
    
    emit UserAdded(user.id, name, user.balance);
    return "User added successfully";
  }
  
  method get_user_balance(user_id) {
    return state.balances[user_id] || 0;
  }
  
  method get_total_users() {
    return state.users.length();
  }
  
  event UserAdded {
    user_id: string;
    name: string;
    balance: int;
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">DRC-20 with Standard Library</h3>
              <CodeBlock
                code={`// Using DRC-20 standard library
import "@cardity/drc20";

protocol MyToken {
  version: "1.0.0";
  owner: "doge1token123";
  
  // DRC-20 configuration
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
    holders: map = {};
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
    state.holders[state.owner] = (state.holders[state.owner] || 0) + amount;
    
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
          </div>
        </section>

        {/* Registry Integration */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Package Registry
          </h2>
          
          <p className="text-gray-400 mb-6">
            Cardity provides a centralized package registry for sharing and discovering community packages:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Registry Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Centralized package discovery</li>
                <li>• Version management and semantic versioning</li>
                <li>• Dependency resolution</li>
                <li>• Package documentation and examples</li>
                <li>• Community ratings and reviews</li>
                <li>• Security scanning and validation</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Registry Commands</h3>
              <CodeBlock
                code={`# Search packages
cardity search "wallet"
cardity search "token"

# View package details
cardity info @cardity/standard
cardity info @cardity/utils

# Install specific version
cardity install @cardity/standard@1.2.0

# Update all packages
cardity update

# Publish package
cardity login
cardity publish`}
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
              Now that you understand the standard library, you can:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Learn about deployment strategies
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Explore advanced development techniques
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Create and publish your own packages
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/deploy" className="btn-primary inline-flex items-center">
                Deployment Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/docs/developer-guide" className="btn-secondary inline-flex items-center">
                Developer Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 