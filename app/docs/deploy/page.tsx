"use client"

import Link from 'next/link'
import { ArrowRight, Rocket, Database, Shield, Settings } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function DeployPage() {
  const { t, isClient, isInitialized } = useTranslations()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          {t('docs.deploy.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {t('docs.deploy.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Rocket className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.deploy.overview.title')}
          </h2>
          
          <p className="text-gray-400 mb-6">
            {t('docs.deploy.overview.description')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('docs.deploy.methods.opReturn.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('docs.deploy.methods.opReturn.description')}
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('docs.deploy.methods.inscription.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('docs.deploy.methods.inscription.description')}
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('docs.deploy.methods.opReturn.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('docs.deploy.methods.inscription.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Compilation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.deploy.steps.compile.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.steps.compile.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.deploy.code.compileCommands.compileToBinary')}
cardityc protocol.car --format carc

${t('docs.deploy.code.compileCommands.compileWithOptimization')}
cardityc protocol.car --format carc --optimize

${t('docs.deploy.code.compileCommands.compileWithOutput')}
cardityc protocol.car -o deployed.carc

${t('docs.deploy.code.compileCommands.validateCompilation')}
cardityc protocol.car --validate` : `# Compile .car file to .carc binary format
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.code.binaryStructure.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.deploy.code.binaryStructure.description')}
${t('docs.deploy.code.binaryStructure.protocolMetadata')}
${t('docs.deploy.code.binaryStructure.stateVariables')}
${t('docs.deploy.code.binaryStructure.methodBytecode')}
${t('docs.deploy.code.binaryStructure.eventDefinitions')}
${t('docs.deploy.code.binaryStructure.abiInformation')}
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
}` : `// .carc file contains:
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
            {t('docs.deploy.steps.validate.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.steps.validate.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.deploy.code.deploymentCommands.validateFile')}
cardity_deploy validate protocol.carc

${t('docs.deploy.code.deploymentCommands.viewProtocolInfo')}
cardity_deploy info protocol.carc

${t('docs.deploy.code.deploymentCommands.checkDeploymentStatus')}
cardity_deploy status protocol.carc

${t('docs.deploy.code.deploymentCommands.validateWithVerbose')}
cardity_deploy validate protocol.carc --verbose` : `# Validate .carc file
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.code.validationChecks.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t('docs.deploy.code.validationChecks.protocolStructure')}</li>
                <li>{t('docs.deploy.code.validationChecks.stateVariableType')}</li>
                <li>{t('docs.deploy.code.validationChecks.methodSyntax')}</li>
                <li>{t('docs.deploy.code.validationChecks.eventDefinition')}</li>
                <li>{t('docs.deploy.code.validationChecks.abiGeneration')}</li>
                <li>{t('docs.deploy.code.validationChecks.sizeOptimization')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deployment Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.deploy.methods.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.methods.opReturn.title')}</h3>
              <p className="text-gray-400 mb-4">
                {t('docs.deploy.methods.opReturn.description')}
              </p>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.deploy.code.deploymentCommands.deployToChain')}
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ...

${t('docs.deploy.code.deploymentCommands.deployWithCustomFee')}
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ... --fee 0.001

${t('docs.deploy.code.deploymentCommands.deployToTestnet')}
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ... --network testnet

${t('docs.deploy.code.deploymentCommands.deployWithMetadata')}
cardity_deploy deploy protocol.carc --address doge1abc... --private-key ... --metadata metadata.json` : `# Deploy to Dogecoin chain using OP_RETURN
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.methods.inscription.title')}</h3>
              <p className="text-gray-400 mb-4">
                {t('docs.deploy.methods.inscription.description')}
              </p>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.deploy.code.deploymentCommands.createInscription')}
cardity_deploy inscription protocol.carc --address doge1abc... --output inscription.txt

${t('docs.deploy.code.deploymentCommands.createInscriptionWithMetadata')}
cardity_deploy inscription protocol.carc --address doge1abc... --metadata metadata.json --output inscription.txt

${t('docs.deploy.code.deploymentCommands.viewInscriptionDetails')}
cardity_deploy inscription-info inscription.txt

${t('docs.deploy.code.deploymentCommands.deployInscription')}
cardity_deploy deploy-inscription inscription.txt --address doge1abc... --private-key ...` : `# Create inscription transaction
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
            {t('docs.deploy.steps.deploy.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.steps.deploy.title')}</h3>
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
            {t('docs.deploy.steps.deploy.title')}
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
            {t('docs.deploy.steps.deploy.title')}
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
            {t('docs.deploy.steps.deploy.title')}
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.troubleshooting.documentation')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t('docs.deploy.troubleshooting.documentAllMethods')}</li>
                <li>{t('docs.deploy.troubleshooting.provideUsageExamples')}</li>
                <li>{t('docs.deploy.troubleshooting.includeDeploymentInstructions')}</li>
                <li>{t('docs.deploy.troubleshooting.maintainChangelog')}</li>
                <li>{t('docs.deploy.troubleshooting.createUserGuides')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.deploy.troubleshooting.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.deploy.troubleshooting.commonIssues')}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">{t('docs.deploy.troubleshooting.compilationErrors')}</h4>
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
                  <h4 className="text-md font-semibold text-white mb-2">{t('docs.deploy.troubleshooting.deploymentFailures')}</h4>
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
            {t('docs.deploy.nextSteps.title')}
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              {t('docs.deploy.nextSteps.description')}
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.deploy.nextSteps.learnAdvancedTechniques')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.deploy.nextSteps.exploreTestingDebugging')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.deploy.nextSteps.contributeEcosystem')}
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/docs/developer-guide?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-primary inline-flex items-center">
                {t('docs.developerGuide.title')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href={`/examples?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-secondary inline-flex items-center">
                {t('examples.title')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 