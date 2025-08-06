import Link from 'next/link'
import { ArrowRight, Rocket, Download, Database, Shield, Settings, Terminal } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

export default function DeployPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Deployment Guide
        </h1>
        <p className="text-lg text-gray-400">
          Deploy your Cardity protocols to the Dogecoin blockchain
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Rocket className="w-6 h-6 mr-3 text-blue-400" />
            Deployment Overview
          </h2>
          
          <p className="text-gray-400 mb-6">
            Cardity supports deploying smart contracts to the Dogecoin blockchain using UTXO-based storage. 
            Your protocols are compiled to binary format and stored in OP_RETURN outputs or as inscriptions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">UTXO Storage</h3>
              <p className="text-gray-400 text-sm">
                Protocols are stored in Dogecoin UTXO outputs for permanent on-chain storage
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Binary Format</h3>
              <p className="text-gray-400 text-sm">
                .carc files contain optimized binary data for efficient blockchain storage
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Multiple Methods</h3>
              <p className="text-gray-400 text-sm">
                Support for OP_RETURN deployment and ordinals inscriptions
              </p>
            </div>
          </div>
        </section>

        {/* Compilation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Compilation Process
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Compile to Binary</h3>
              <CodeBlock
                code={`# Compile .car file to .carc binary format
cardityc protocol.car --format carc

# Compile with optimization
cardityc protocol.car --format carc --optimize

# Compile with specific output
cardityc protocol.car -o deployed.carc

# Validate compilation
cardityc protocol.car --validate`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Binary File Structure</h3>
              <CodeBlock
                code={`// .carc file contains:
// - Protocol metadata (name, version, owner)
// - State variable definitions
// - Method bytecode
// - Event definitions
// - ABI information
// - Deployment configuration

// Example binary structure
{
  "header": {
    "version": "1.0.0",
    "protocol": "MyProtocol",
    "owner": "doge1abc123def456"
  },
  "state": [...],
  "methods": [...],
  "events": [...],
  "abi": {...}
}`}
                language="json"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Validation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Pre-deployment Validation
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Validate Binary File</h3>
              <CodeBlock
                code={`# Validate .carc file
cardity_deploy validate protocol.carc

# View protocol information
cardity_deploy info protocol.carc

# Check deployment status
cardity_deploy status protocol.carc

# Validate with detailed output
cardity_deploy validate protocol.carc --verbose`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Validation Checks</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Protocol structure validation</li>
                <li>• State variable type checking</li>
                <li>• Method syntax verification</li>
                <li>• Event definition validation</li>
                <li>• ABI generation verification</li>
                <li>• Size and optimization checks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deployment Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Deployment Methods
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">OP_RETURN Deployment</h3>
              <p className="text-gray-400 mb-4">
                Deploy protocol data directly in OP_RETURN output for efficient storage:
              </p>
              <CodeBlock
                code={`# Deploy to Dogecoin chain using OP_RETURN
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ...

# Deploy with custom fee
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ... --fee 0.001

# Deploy to testnet
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ... --network testnet

# Deploy with metadata
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ... --metadata metadata.json`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Inscription Deployment</h3>
              <p className="text-gray-400 mb-4">
                Create ordinals inscriptions for protocol deployment:
              </p>
              <CodeBlock
                code={`# Create inscription transaction
cardity_deploy inscription protocol.carc --address doge1abc... --output inscription.txt

# Create inscription with metadata
cardity_deploy inscription protocol.carc --address doge1abc... --metadata metadata.json --output inscription.txt

# View inscription details
cardity_deploy inscription-info inscription.txt

# Deploy inscription
cardity_deploy deploy-inscription inscription.txt --address doge1abc... --private-key ...`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* DRC-20 Token Deployment */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            DRC-20 Token Deployment
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Token Deployment Workflow</h3>
              <CodeBlock
                code={`# 1. Create DRC-20 token definition
cardity_drc20 template basic --tick MYT --name "My Token" --output my_token.car

# 2. Compile and validate token
cardity_drc20 compile my_token.car
cardity_drc20 validate my_token.car

# 3. Generate deployment inscription
cardity_drc20 deploy my_token.car --output deploy.json

# 4. Deploy to Dogecoin chain
cardity_deploy deploy deploy.json --address doge1abc... --private-key ...

# 5. Generate mint inscription
cardity_drc20 mint MYT 1000 --output mint.json

# 6. Generate transfer inscription
cardity_drc20 transfer MYT 100 doge1abc... --output transfer.json`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">DRC-20 Deployment Example</h3>
              <CodeBlock
                code={`// DRC-20 token deployment inscription
{
  "p": "drc-20",
  "op": "deploy",
  "tick": "MYT",
  "max": "1000000",
  "lim": "1000",
  "dec": "18"
}

// Mint inscription
{
  "p": "drc-20",
  "op": "mint",
  "tick": "MYT",
  "amt": "1000"
}

// Transfer inscription
{
  "p": "drc-20",
  "op": "transfer",
  "tick": "MYT",
  "amt": "100",
  "to": "doge1abc..."
}`}
                language="json"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Network Configuration */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Network Configuration
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Network Selection</h3>
              <CodeBlock
                code={`# Deploy to mainnet (default)
cardity_deploy deploy protocol.carc --network mainnet

# Deploy to testnet
cardity_deploy deploy protocol.carc --network testnet

# Deploy to regtest (local development)
cardity_deploy deploy protocol.carc --network regtest

# Set default network
cardity config set network mainnet`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Environment Variables</h3>
              <CodeBlock
                code={`# Set environment variables for deployment
export CARDITY_NETWORK=mainnet
export CARDITY_ADDRESS=doge1abc...
export CARDITY_PRIVATE_KEY=your_private_key
export CARDITY_RPC_URL=https://doge.getblock.io
export CARDITY_RPC_USER=your_username
export CARDITY_RPC_PASS=your_password

# Use in deployment
cardity_deploy deploy protocol.carc`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Post-deployment */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Post-deployment Operations
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Verify Deployment</h3>
              <CodeBlock
                code={`# Check deployment status
cardity_deploy status protocol.carc

# View transaction details
cardity_deploy tx-info <txid>

# Verify on blockchain explorer
cardity_deploy verify <txid> --explorer

# Get deployment information
cardity_deploy info protocol.carc --deployed`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Interact with Deployed Protocol</h3>
              <CodeBlock
                code={`# Run methods on deployed protocol
cardity_runtime protocol.carc set_message "Hello" --txid <deployment_txid>

# Query state
cardity_runtime protocol.carc get_message --txid <deployment_txid>

# Execute with parameters
cardity_runtime protocol.carc transfer "doge1abc..." 100 --txid <deployment_txid>

# Get protocol state
cardity_runtime protocol.carc get_state --txid <deployment_txid>`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Deployment Best Practices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Security</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Always test on testnet first</li>
                <li>• Use secure private key management</li>
                <li>• Validate all inputs and parameters</li>
                <li>• Review protocol logic before deployment</li>
                <li>• Use environment variables for sensitive data</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Performance</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Optimize protocol size for lower fees</li>
                <li>• Use efficient data structures</li>
                <li>• Minimize state variable complexity</li>
                <li>• Consider gas costs in method design</li>
                <li>• Test with realistic data volumes</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Testing</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Comprehensive unit testing</li>
                <li>• Integration testing on testnet</li>
                <li>• Load testing for performance</li>
                <li>• Security testing and audits</li>
                <li>• User acceptance testing</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Documentation</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Document all public methods</li>
                <li>• Provide usage examples</li>
                <li>• Include deployment instructions</li>
                <li>• Maintain changelog</li>
                <li>• Create user guides</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Troubleshooting
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">Compilation Errors</h4>
                  <CodeBlock
                    code={`# Check syntax errors
cardityc protocol.car --validate --verbose

# Fix common issues:
# - Missing semicolons
# - Incorrect type declarations
# - Undefined variables
# - Invalid method signatures`}
                    language="bash"
                  />
                </div>
                
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">Deployment Failures</h4>
                  <CodeBlock
                    code={`# Check network connectivity
cardity_deploy test-connection

# Verify address and private key
cardity_deploy validate-credentials

# Check sufficient balance
cardity_deploy check-balance --address doge1abc...

# Review transaction details
cardity_deploy tx-info <txid> --verbose`}
                    language="bash"
                  />
                </div>
              </div>
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
              Now that you understand deployment, you can:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Learn advanced development techniques
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Explore testing and debugging strategies
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                Contribute to the Cardity ecosystem
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/developer-guide" className="btn-primary inline-flex items-center">
                Developer Guide
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