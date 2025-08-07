"use client"

import Link from 'next/link'
import { Terminal, Download, Code, Database, ArrowRight, Settings, Package } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function CLIPage() {
  const { t, isClient, isInitialized } = useTranslations()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          {t('docs.cli.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {t('docs.cli.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {/* Installation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Download className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.cli.installation.title')}
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-400" />
              {t('docs.cli.installation.npmInstall.title')}
            </h3>
            <CodeBlock
              code={isClient && isInitialized ? `${t('docs.cli.installation.npmInstall.code.globalInstall')}
npm install -g cardity

${t('docs.cli.installation.npmInstall.code.verifyInstall')}
cardity --version

${t('docs.cli.installation.npmInstall.code.viewHelp')}
cardity --help` : `# Global installation of Cardity
npm install -g cardity

# Verify installation
cardity --version

# View help
cardity --help`}
              language="bash"
            />
            <p className="text-sm text-gray-400 mt-2">
              {t('docs.cli.installation.npmInstall.currentVersion')}{t('docs.cli.installation.npmInstall.colon')}<code className="bg-gray-800 px-1 rounded">1.0.1</code>
            </p>
          </div>
        </section>

        {/* Basic Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.cli.basicCommands.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.basicCommands.projectInit.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.basicCommands.projectInit.code.initProject')}
cardity init [project-name]

${t('docs.cli.basicCommands.projectInit.code.example')}
cardity init my-first-protocol` : `# Initialize new project
cardity init [project-name]

# Example
cardity init my-first-protocol`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.basicCommands.projectInit.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.basicCommands.compile.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.basicCommands.compile.code.compileFile')}
cardity compile <file> [options]

${t('docs.cli.basicCommands.compile.code.example')}
cardity compile src/index.car
cardity compile src/index.car --format carc` : `# Compile .car file
cardity compile <file> [options]

# Example
cardity compile src/index.car
cardity compile src/index.car --format carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.basicCommands.compile.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.basicCommands.run.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.basicCommands.run.code.runProtocol')}
cardity run <file> [options]

${t('docs.cli.basicCommands.run.code.example')}
cardity run dist/index.carc
cardity run dist/index.carc get_message` : `# Run compiled protocol
cardity run <file> [options]

# Example
cardity run dist/index.carc
cardity run dist/index.carc get_message`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.basicCommands.run.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.basicCommands.generateAbi.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.basicCommands.generateAbi.code.generateInterface')}
cardity abi <file> [options]

${t('docs.cli.basicCommands.generateAbi.code.example')}
cardity abi src/index.car
cardity abi src/index.car --output index.abi` : `# Generate protocol interface
cardity abi <file> [options]

# Example
cardity abi src/index.car
cardity abi src/index.car --output index.abi`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.basicCommands.generateAbi.description')}
              </p>
            </div>
          </div>
        </section>

        {/* DRC-20 Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3 text-green-400" />
            {t('docs.cli.drc20Commands.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.drc20Commands.compile.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.drc20Commands.compile.code.compileToken')}
cardity drc20 compile <file>

${t('docs.cli.drc20Commands.compile.code.example')}
cardity drc20 compile token.car` : `# Compile DRC-20 token
cardity drc20 compile <file>

# Example
cardity drc20 compile token.car`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.drc20Commands.compile.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.drc20Commands.deploy.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.drc20Commands.deploy.code.deployToken')}
cardity drc20 deploy <file> [options]

${t('docs.cli.drc20Commands.deploy.code.example')}
cardity drc20 deploy token.car
cardity drc20 deploy token.car --output deploy.json` : `# Deploy DRC-20 token
cardity drc20 deploy <file> [options]

# Example
cardity drc20 deploy token.car
cardity drc20 deploy token.car --output deploy.json`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.drc20Commands.deploy.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.drc20Commands.mint.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.drc20Commands.mint.code.mintTokens')}
cardity drc20 mint <tick> <amount> [options]

${t('docs.cli.drc20Commands.mint.code.example')}
cardity drc20 mint MYT 1000
cardity drc20 mint MYT 1000 --output mint.json` : `# Mint tokens
cardity drc20 mint <tick> <amount> [options]

# Example
cardity drc20 mint MYT 1000
cardity drc20 mint MYT 1000 --output mint.json`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.drc20Commands.mint.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.drc20Commands.transfer.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.drc20Commands.transfer.code.transferTokens')}
cardity drc20 transfer <tick> <to> <amount> [options]

${t('docs.cli.drc20Commands.transfer.code.example')}
cardity drc20 transfer MYT doge1abc... 100
cardity drc20 transfer MYT doge1abc... 100 --output transfer.json` : `# Transfer tokens
cardity drc20 transfer <tick> <to> <amount> [options]

# Example
cardity drc20 transfer MYT doge1abc... 100
cardity drc20 transfer MYT doge1abc... 100 --output transfer.json`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.drc20Commands.transfer.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Deployment Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-purple-400" />
            {t('docs.cli.deploymentCommands.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.deploymentCommands.validate.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.deploymentCommands.validate.code.validateFile')}
cardity_deploy validate <file>

${t('docs.cli.deploymentCommands.validate.code.example')}
cardity_deploy validate protocol.carc` : `# Validate .carc file
cardity_deploy validate <file>

# Example
cardity_deploy validate protocol.carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.deploymentCommands.validate.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.deploymentCommands.info.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.deploymentCommands.info.code.viewInfo')}
cardity_deploy info <file>

${t('docs.cli.deploymentCommands.info.code.example')}
cardity_deploy info protocol.carc` : `# View protocol info
cardity_deploy info <file>

# Example
cardity_deploy info protocol.carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.deploymentCommands.info.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.deploymentCommands.deploy.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.deploymentCommands.deploy.code.deployChain')}
cardity_deploy deploy <file> [options]

${t('docs.cli.deploymentCommands.deploy.code.example')}
cardity_deploy deploy protocol.carc \\
  --address doge1... \\
  --private-key ...` : `# Deploy to Dogecoin chain
cardity_deploy deploy <file> [options]

# Example
cardity_deploy deploy protocol.carc \\
  --address doge1... \\
  --private-key ...`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.deploymentCommands.deploy.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.deploymentCommands.inscription.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.deploymentCommands.inscription.code.createInscription')}
cardity_deploy inscription <file> [options]

${t('docs.cli.deploymentCommands.inscription.code.example')}
cardity_deploy inscription protocol.carc \\
  --address doge1... \\
  --output inscription.txt` : `# Create inscription transaction
cardity_deploy inscription <file> [options]

# Example
cardity_deploy inscription protocol.carc \\
  --address doge1... \\
  --output inscription.txt`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.deploymentCommands.inscription.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-orange-400" />
            {t('docs.cli.advancedCommands.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.advancedCommands.compiler.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.advancedCommands.compiler.code.compileFormats')}
cardityc main.car --format carc
cardityc main.car --format json

${t('docs.cli.advancedCommands.compiler.code.generatePackage')}
cardityc main.car -o deployed.carc` : `# Compile to different formats
cardityc main.car --format carc
cardityc main.car --format json

# Generate deployment package
cardityc main.car -o deployed.carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.advancedCommands.compiler.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.advancedCommands.abiGenerator.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.advancedCommands.abiGenerator.code.generateAbi')}
cardity_abi main.car                    ${t('docs.cli.advancedCommands.abiGenerator.code.outputStdout')}
cardity_abi main.car main.abi          ${t('docs.cli.advancedCommands.abiGenerator.code.outputFile')}

${t('docs.cli.advancedCommands.abiGenerator.code.supportedFormats')}` : `# Generate ABI
cardity_abi main.car                    # Output to stdout
cardity_abi main.car main.abi          # Output to file

# Support programming language format and JSON format`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.advancedCommands.abiGenerator.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.advancedCommands.runtime.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.advancedCommands.runtime.code.runProtocol')}
cardity_runtime main.car set_message "Hello"
cardity_runtime main.car get_message

${t('docs.cli.advancedCommands.runtime.code.methodSupport')}` : `# Run protocol
cardity_runtime main.car set_message "Hello"
cardity_runtime main.car get_message

# Support method calls and parameter passing`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.advancedCommands.runtime.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.advancedCommands.packageManager.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.advancedCommands.packageManager.code.packageCommands')}
cardity install <package>
cardity uninstall <package>
cardity list
cardity search <query>
cardity publish` : `# Package management commands
cardity install <package>
cardity uninstall <package>
cardity list
cardity search <query>
cardity publish`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('docs.cli.advancedCommands.packageManager.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Help and Support */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <ArrowRight className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.cli.help.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.help.getHelp.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.help.getHelp.code.viewAllCommands')}
cardity --help

${t('docs.cli.help.getHelp.code.viewSpecificHelp')}
cardity compile --help
cardity drc20 --help
cardity_deploy --help` : `# View all commands
cardity --help

# View specific command help
cardity compile --help
cardity drc20 --help
cardity_deploy --help`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.cli.help.version.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.cli.help.version.code.viewVersion')}
cardity --version

${t('docs.cli.help.version.code.viewDetails')}
cardity --version --verbose` : `# View version
cardity --version

# View detailed information
cardity --version --verbose`}
                language="bash"
              />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              {t('docs.cli.help.needHelp')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('docs.cli.help.quickStart')}
              </Link>
              <Link href="/examples" className="btn-secondary inline-flex items-center">
                <Code className="w-4 h-4 mr-2" />
                {t('docs.cli.help.viewExamples')}
              </Link>
              <Link href="/docs/deploy" className="btn-secondary inline-flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                {t('docs.cli.help.deployGuide')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 