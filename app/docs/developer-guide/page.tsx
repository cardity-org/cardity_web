import Link from 'next/link'
import { ArrowRight, Code, Settings, Terminal, Database, Shield, Package, GitBranch } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function DeveloperGuidePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Developer Guide
        </h1>
        <p className="text-lg text-gray-400">
          Advanced development techniques, testing strategies, and contribution guidelines
        </p>
      </div>

      <div className="space-y-12">
        {/* Development Environment */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-blue-400" />
            Development Environment
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">System Requirements</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>Operating System:</strong> macOS, Linux, or Windows</li>
                <li>• <strong>Memory:</strong> 4GB RAM minimum, 8GB recommended</li>
                <li>• <strong>Storage:</strong> 2GB free space</li>
                <li>• <strong>Network:</strong> Internet connection for package downloads</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Required Dependencies</h3>
              <CodeBlock
                code={`# macOS (using Homebrew)
brew install cmake nlohmann-json curl libarchive openssl

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install cmake nlohmann-json3-dev libcurl4-openssl-dev libarchive-dev libssl-dev

# CentOS/RHEL
sudo yum install cmake nlohmann-json-devel libcurl-devel libarchive-devel openssl-devel

# Windows (using vcpkg)
vcpkg install cmake nlohmann-json curl libarchive openssl`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Build from Source</h3>
              <CodeBlock
                code={`# Clone the repository
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

# Create build directory
mkdir build && cd build

# Configure with CMake
cmake ..

# Build the project
make -j4

# Install to system
sudo make install

# Verify installation
cardity --version`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3 text-blue-400" />
            Project Structure
          </h2>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-3">Cardity Core Architecture</h3>
            <CodeBlock
              code={`cardity_core/
├── compiler/             # Compiler source code
│   ├── lexer.cpp        # Lexical analyzer
│   ├── parser.cpp       # Syntax parser
│   ├── semantic.cpp     # Semantic analysis
│   ├── type_system.cpp  # Type checking
│   ├── runtime.cpp      # Runtime execution
│   ├── car_generator.cpp # CAR format generator
│   ├── carc_generator.cpp # CARC binary generator
│   ├── car_deployer.cpp # Deployment tools
│   ├── dogecoin_deployer.cpp # Dogecoin integration
│   ├── drc20_standard.cpp # DRC-20 standard
│   ├── drc20_compiler.cpp # DRC-20 compiler
│   ├── drc20_cli.cpp    # DRC-20 CLI tools
│   └── event_system.cpp # Event handling
├── package_manager.cpp   # Package management
├── package_config.cpp    # Configuration management
├── package_builder.cpp   # Build system
├── registry_client.cpp   # Registry integration
├── cardity_cli.cpp      # Main CLI interface
├── examples/            # Example projects
├── docs/                # Documentation
└── CMakeLists.txt       # Build configuration`}
              language="bash"
              showLineNumbers={true}
            />
          </div>
        </section>

        {/* Testing */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-blue-400" />
            Testing Strategies
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Unit Testing</h3>
              <CodeBlock
                code={`# Run all tests
make test

# Run specific test suites
./lexer_test
./parser_test
./runtime_test
./package_manager_test

# Run with coverage
make test-coverage

# Run tests with verbose output
make test VERBOSE=1`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Protocol Testing</h3>
              <CodeBlock
                code={`# Test protocol compilation
cardityc examples/hello.car --validate

# Test protocol execution
cardity_runtime examples/hello.car set_message "Test"
cardity_runtime examples/hello.car get_message

# Test DRC-20 token
cardity_drc20 validate examples/drc20_token.car
cardity_drc20 compile examples/drc20_token.car

# Run integration tests
./integration_test examples/`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Test Protocol Example</h3>
              <CodeBlock
                code={`protocol TestProtocol {
  version: "1.0.0";
  owner: "doge1test123";
  
  state {
    counter: int = 0;
    test_results: array = [];
  }
  
  method increment() {
    state.counter = state.counter + 1;
    state.test_results.push("increment: " + state.counter);
    return state.counter;
  }
  
  method decrement() {
    if (state.counter > 0) {
      state.counter = state.counter - 1;
      state.test_results.push("decrement: " + state.counter);
    }
    return state.counter;
  }
  
  method get_counter() {
    return state.counter;
  }
  
  method get_test_results() {
    return state.test_results;
  }
  
  method reset() {
    state.counter = 0;
    state.test_results = [];
    return "Reset successful";
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Debugging */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Debugging Techniques
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Debug Mode</h3>
              <CodeBlock
                code={`# Build in debug mode
cmake -DCMAKE_BUILD_TYPE=Debug ..
make

# Run with debug output
./cardity_cli --debug init
./cardityc --debug --validate src/main.car

# Enable verbose logging
export CARDITY_DEBUG=1
cardity build --verbose

# Debug specific components
./cardityc --debug-lexer src/main.car
./cardityc --debug-parser src/main.car
./cardityc --debug-semantic src/main.car`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Error Handling</h3>
              <CodeBlock
                code={`# Common error patterns and solutions

// 1. Syntax Errors
protocol MyProtocol {
  state {
    name: string = "Test";  // Missing semicolon
  }
}

// 2. Type Errors
method process_data(data) {
  if (data.length() > 0) {  // data might not be array
    // Handle properly
  }
}

// 3. State Access Errors
method update_state() {
  state.new_variable = "value";  // Variable not declared in state
}

// 4. Event Emission Errors
method trigger_event() {
  emit MyEvent("data");  // Event not defined
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Performance Optimization */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Performance Optimization
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Protocol Optimization</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>Minimize State Variables:</strong> Only store essential data</li>
                <li>• <strong>Efficient Data Structures:</strong> Use appropriate types for your use case</li>
                <li>• <strong>Optimize Methods:</strong> Reduce computational complexity</li>
                <li>• <strong>Batch Operations:</strong> Group related operations together</li>
                <li>• <strong>Lazy Loading:</strong> Initialize data only when needed</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Compilation Optimization</h3>
              <CodeBlock
                code={`# Optimize compilation
cardityc protocol.car --format carc --optimize

# Enable specific optimizations
cardityc protocol.car --optimize-size
cardityc protocol.car --optimize-speed

# Profile compilation
cardityc protocol.car --profile

# Analyze binary size
cardity_deploy analyze protocol.carc`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Package Development */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-400" />
            Package Development
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Creating Packages</h3>
              <CodeBlock
                code={`# Initialize package
cardity init-package my-utility

# Package structure
my-utility/
├── cardity.json          # Package configuration
├── src/
│   ├── main.car         # Main protocol
│   ├── utils.car        # Utility functions
│   └── types.car        # Type definitions
├── tests/
│   ├── main_test.car    # Test protocols
│   └── utils_test.car   # Utility tests
├── docs/
│   ├── README.md        # Documentation
│   └── API.md           # API reference
└── examples/
    └── usage.car        # Usage examples`}
                language="bash"
                showLineNumbers={true}
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Package Configuration</h3>
              <CodeBlock
                code={`{
  "name": "@myorg/my-utility",
  "version": "1.0.0",
  "description": "Utility functions for Cardity development",
  "main": "src/main.car",
  "keywords": ["cardity", "utility", "helper"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/myorg/my-utility.git"
  },
  "dependencies": {
    "@cardity/standard": "^1.0.0"
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
              <h3 className="text-lg font-semibold text-white mb-3">Publishing Packages</h3>
              <CodeBlock
                code={`# Login to registry
cardity login

# Build package
cardity build

# Run tests
cardity test

# Publish package
cardity publish

# Publish with specific version
cardity publish --version 1.0.0

# Update existing package
cardity publish --update

# Unpublish package
cardity unpublish @myorg/my-utility`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Contribution Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <GitBranch className="w-6 h-6 mr-3 text-blue-400" />
            Contributing to Cardity
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Development Workflow</h3>
              <CodeBlock
                code={`# 1. Fork the repository
# Visit https://github.com/cardity-org/cardity-core and click "Fork"

# 2. Clone your fork
git clone https://github.com/yourusername/cardity-core.git
cd cardity-core

# 3. Add upstream remote
git remote add upstream https://github.com/cardity-org/cardity-core.git

# 4. Create feature branch
git checkout -b feature/amazing-feature

# 5. Make your changes
# Edit files, add tests, etc.

# 6. Test your changes
make test
cardityc examples/hello.car --validate

# 7. Commit your changes
git add .
git commit -m "Add amazing feature"

# 8. Push to your fork
git push origin feature/amazing-feature

# 9. Create Pull Request
# Visit your fork on GitHub and click "New Pull Request"`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Code Standards</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>Code Style:</strong> Follow existing code formatting and naming conventions</li>
                <li>• <strong>Documentation:</strong> Add comments and update documentation for new features</li>
                <li>• <strong>Testing:</strong> Include tests for all new functionality</li>
                <li>• <strong>Error Handling:</strong> Implement proper error handling and validation</li>
                <li>• <strong>Performance:</strong> Consider performance implications of changes</li>
                <li>• <strong>Security:</strong> Follow security best practices</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Pull Request Guidelines</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>Title:</strong> Use clear, descriptive titles</li>
                <li>• <strong>Description:</strong> Explain the problem and solution</li>
                <li>• <strong>Tests:</strong> Include tests that verify your changes</li>
                <li>• <strong>Documentation:</strong> Update relevant documentation</li>
                <li>• <strong>Breaking Changes:</strong> Clearly mark breaking changes</li>
                <li>• <strong>Review:</strong> Respond to review comments promptly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Advanced Topics */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Advanced Topics
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Custom Compiler Extensions</h3>
              <CodeBlock
                code={`// Extending the compiler with custom features

// 1. Add new language constructs
protocol ExtendedProtocol {
  // Custom annotations
  @optimize
  @cache
  state {
    data: array = [];
  }
  
  // Custom method modifiers
  @inline
  method fast_operation() {
    // Optimized implementation
  }
}

// 2. Custom type system
type CustomType {
  value: int;
  metadata: string;
}

// 3. Custom built-in functions
method custom_function() {
  return builtin_custom_op(state.data);
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Runtime Extensions</h3>
              <CodeBlock
                code={`// Extending runtime with custom operations

// 1. Custom state management
protocol AdvancedProtocol {
  state {
    // Custom state with validation
    @validate("positive")
    balance: int = 0;
    
    // Custom state with encryption
    @encrypt
    sensitive_data: string = "";
  }
  
  // 2. Custom event handling
  @event_handler("custom_event")
  method handle_custom_event(data) {
    // Custom event processing
  }
  
  // 3. Custom method decorators
  @transaction
  @atomic
  method critical_operation() {
    // Atomic transaction
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Additional Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Documentation</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <a href="/docs/getting-started" className="text-blue-400 hover:text-blue-300">Getting Started Guide</a></li>
                <li>• <a href="/docs/reference" className="text-blue-400 hover:text-blue-300">Language Reference</a></li>
                <li>• <a href="/docs/standard-library" className="text-blue-400 hover:text-blue-300">Standard Library</a></li>
                <li>• <a href="/docs/cli" className="text-blue-400 hover:text-blue-300">CLI Tools</a></li>
                <li>• <a href="/docs/deploy" className="text-blue-400 hover:text-blue-300">Deployment Guide</a></li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <a href="https://github.com/cardity-org/cardity-core" className="text-blue-400 hover:text-blue-300">GitHub Repository</a></li>
                <li>• <a href="https://discord.gg/cardity" className="text-blue-400 hover:text-blue-300">Discord Community</a></li>
                <li>• <a href="https://twitter.com/carditylang" className="text-blue-400 hover:text-blue-300">Twitter</a></li>
                <li>• <a href="https://forum.cardity.dev" className="text-blue-400 hover:text-blue-300">Developer Forum</a></li>
                <li>• <a href="mailto:hello@cardity.org" className="text-blue-400 hover:text-blue-300">Email Support</a></li>
              </ul>
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
              Now that you're familiar with advanced development techniques, you can:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Contribute to the Cardity core project
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Create and publish your own packages
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Build complex applications with Cardity
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/cardity-org/cardity-core"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                Contribute to Core
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
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