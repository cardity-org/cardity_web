import Link from 'next/link'
import { Terminal, Download, Code, Database, ArrowRight, Settings, Package } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function CLIPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          CLI Tools
        </h1>
        <p className="text-lg text-gray-400">
          Command-line tools for Cardity development, compilation, and deployment
        </p>
      </div>

      <div className="space-y-12">
        {/* Main CLI */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-blue-400" />
            Main CLI Commands
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
cardity search <query>

# Publish package
cardity publish`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Project Configuration</h3>
              <CodeBlock
                code={`# cardity.json configuration file
{
  "name": "my-protocol",
  "version": "1.0.0",
  "description": "My Cardity Protocol",
  "dependencies": {
    "@cardity/standard": "^1.0.0",
    "@cardity/utils": "~2.0.0"
  },
  "scripts": {
    "build": "cardity build",
    "test": "cardity test",
    "publish": "cardity publish"
  }
}`}
                language="json"
              />
            </div>
          </div>
        </section>

        {/* Compiler */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            Compiler Tools
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Basic Compilation</h3>
              <CodeBlock
                code={`# Compile .car file to binary format
cardityc main.car --format carc

# Compile to JSON format
cardityc main.car --format json

# Generate deployment package
cardityc main.car -o deployed.carc

# Validate contract
cardityc main.car --validate`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Runtime Execution</h3>
              <CodeBlock
                code={`# Run protocol methods
cardity_runtime main.car set_message "Hello"
cardity_runtime main.car get_message
cardity_runtime main.car increment
cardity_runtime main.car get_count

# Run with parameters
cardity_runtime main.car transfer "doge1abc..." 100`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">ABI Generation</h3>
              <CodeBlock
                code={`# Generate ABI from .car file
cardity_abi main.car
cardity_abi main.car main.abi

# Generate ABI for DRC-20 token
cardity_abi drc20_token.car drc20_token.abi

# Generate ABI from JSON format
cardity_abi protocol.json protocol.abi`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* DRC-20 Tools */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-400" />
            DRC-20 Token Tools
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Token Templates</h3>
              <CodeBlock
                code={`# Generate basic DRC-20 template
cardity_drc20 template basic --tick MYT --name "My Token" --output my_token.car

# Generate advanced DRC-20 template
cardity_drc20 template advanced --tick ADV --name "Advanced Token" --max-supply 10000000 --output advanced_token.car

# View template help
cardity_drc20 template --help`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Token Operations</h3>
              <CodeBlock
                code={`# Compile DRC-20 token
cardity_drc20 compile my_token.car

# Validate token definition
cardity_drc20 validate my_token.car

# Generate deployment inscription
cardity_drc20 deploy my_token.car --output deploy.json

# Generate mint inscription
cardity_drc20 mint MYT 1000 --output mint.json

# Generate transfer inscription
cardity_drc20 transfer MYT 100 doge1abc... --output transfer.json`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">DRC-20 Workflow</h3>
              <CodeBlock
                code={`# 1. Create DRC-20 token definition
cardity_drc20 template basic --tick MYT --name "My Token" --output my_token.car

# 2. Compile and validate token
cardity_drc20 compile my_token.car
cardity_drc20 validate my_token.car

# 3. Generate ABI
cardity_abi my_token.car my_token.abi

# 4. Generate deployment inscription
cardity_drc20 deploy my_token.car --output deploy.json

# 5. Deploy to Dogecoin chain
cardity_deploy deploy deploy.json --address doge1... --private-key ...

# 6. Generate mint inscription
cardity_drc20 mint MYT 1000 --output mint.json

# 7. Generate transfer inscription
cardity_drc20 transfer MYT 100 doge1abc... --output transfer.json`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Deployment Tools */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Download className="w-6 h-6 mr-3 text-blue-400" />
            Deployment Tools
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Binary Validation</h3>
              <CodeBlock
                code={`# Validate .carc file
cardity_deploy validate protocol.carc

# View protocol information
cardity_deploy info protocol.carc

# Check deployment status
cardity_deploy status protocol.carc`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Chain Deployment</h3>
              <CodeBlock
                code={`# Deploy to Dogecoin chain
cardity_deploy deploy protocol.carc --address doge1... --private-key ...

# Deploy with custom fee
cardity_deploy deploy protocol.carc --address doge1... --private-key ... --fee 0.001

# Deploy with network selection
cardity_deploy deploy protocol.carc --address doge1... --private-key ... --network mainnet`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Inscription Creation</h3>
              <CodeBlock
                code={`# Create inscription transaction
cardity_deploy inscription protocol.carc --address doge1... --output inscription.txt

# Create inscription with metadata
cardity_deploy inscription protocol.carc --address doge1... --metadata metadata.json --output inscription.txt

# View inscription details
cardity_deploy inscription-info inscription.txt`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Package Management */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-400" />
            Package Management
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Package Operations</h3>
              <CodeBlock
                code={`# Install package
cardity install @cardity/standard
cardity install @cardity/utils@^2.0.0

# Uninstall package
cardity uninstall @cardity/standard

# List installed packages
cardity list

# Search packages
cardity search "token"
cardity search "wallet"

# Update packages
cardity update
cardity update @cardity/standard`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Package Publishing</h3>
              <CodeBlock
                code={`# Login to registry
cardity login

# Publish package
cardity publish

# Publish with version
cardity publish --version 1.0.0

# Unpublish package
cardity unpublish @myorg/mypackage`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-blue-400" />
            Configuration
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Global Configuration</h3>
              <CodeBlock
                code={`# Set default network
cardity config set network mainnet

# Set default address
cardity config set address doge1abc...

# Set registry URL
cardity config set registry https://registry.cardity.dev

# View configuration
cardity config list

# Reset configuration
cardity config reset`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Environment Variables</h3>
              <CodeBlock
                code={`# Set environment variables
export CARDITY_NETWORK=mainnet
export CARDITY_ADDRESS=doge1abc...
export CARDITY_PRIVATE_KEY=your_private_key
export CARDITY_REGISTRY=https://registry.cardity.dev

# Use in commands
cardity deploy protocol.carc`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Help and Support */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Help and Support
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Getting Help</h3>
              <CodeBlock
                code={`# General help
cardity --help
cardity -h

# Command-specific help
cardity init --help
cardity build --help
cardity deploy --help

# DRC-20 help
cardity_drc20 --help
cardity_drc20 template --help

# Compiler help
cardityc --help
cardity_abi --help`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Version Information</h3>
              <CodeBlock
                code={`# Check versions
cardity --version
cardityc --version
cardity_drc20 --version
cardity_abi --version
cardity_deploy --version

# Check for updates
cardity update-check`}
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
              Now that you understand the CLI tools, you can:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Learn about deployment strategies
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Explore package management features
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                View deployment examples
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/deploy" className="btn-primary inline-flex items-center">
                Deployment Guide
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