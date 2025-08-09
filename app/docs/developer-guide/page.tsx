"use client"

import Link from 'next/link'
import { ArrowRight, Code, Settings, Database, Shield, Package, GitBranch } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function DeveloperGuidePage() {
  const { t, isClient, isInitialized } = useTranslations()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          {t('docs.developerGuide.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {t('docs.developerGuide.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {/* Development Environment */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.developerGuide.overview.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.overview.systemRequirements.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>{t('docs.developerGuide.overview.systemRequirements.operatingSystem')}:</strong> {t('docs.developerGuide.overview.systemRequirements.osValue')}</li>
                <li>• <strong>{t('docs.developerGuide.overview.systemRequirements.memory')}:</strong> {t('docs.developerGuide.overview.systemRequirements.memoryValue')}</li>
                <li>• <strong>{t('docs.developerGuide.overview.systemRequirements.storage')}:</strong> {t('docs.developerGuide.overview.systemRequirements.storageValue')}</li>
                <li>• <strong>{t('docs.developerGuide.overview.systemRequirements.network')}:</strong> {t('docs.developerGuide.overview.systemRequirements.networkValue')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.overview.requiredDependencies.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.developerGuide.code.macosInstall')}
brew install cmake nlohmann-json curl libarchive openssl

${t('docs.developerGuide.code.ubuntuInstall')}
sudo apt-get update
sudo apt-get install cmake nlohmann-json3-dev libcurl4-openssl-dev libarchive-dev libssl-dev

${t('docs.developerGuide.code.centosInstall')}
sudo yum install cmake nlohmann-json-devel libcurl-devel libarchive-devel openssl-devel

${t('docs.developerGuide.code.windowsInstall')}
vcpkg install cmake nlohmann-json curl libarchive openssl` : `# macOS (using Homebrew)
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.overview.buildFromSource.title')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.developerGuide.code.cloneRepository')}
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

${t('docs.developerGuide.code.createBuildDir')}
mkdir build && cd build

${t('docs.developerGuide.code.configureCmake')}
cmake ..

${t('docs.developerGuide.code.buildProject')}
make -j4

${t('docs.developerGuide.code.installSystem')}
sudo make install

${t('docs.developerGuide.code.verifyInstall')}
cardity --version` : `# Clone the repository
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
            {t('docs.developerGuide.overview.projectStructure.title')}
          </h2>
          
                      <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.overview.projectStructure.cardityCoreArchitecture.title')}</h3>
            <CodeBlock
              code={isClient && isInitialized ? `${t('docs.developerGuide.code.projectStructure')}
${t('docs.developerGuide.code.compilerDir')}
${t('docs.developerGuide.code.lexerFile')}
${t('docs.developerGuide.code.parserFile')}
${t('docs.developerGuide.code.semanticFile')}
${t('docs.developerGuide.code.typeSystemFile')}
${t('docs.developerGuide.code.runtimeFile')}
${t('docs.developerGuide.code.carGeneratorFile')}
${t('docs.developerGuide.code.carcGeneratorFile')}
${t('docs.developerGuide.code.carDeployerFile')}
${t('docs.developerGuide.code.dogecoinDeployerFile')}
${t('docs.developerGuide.code.drc20StandardFile')}
${t('docs.developerGuide.code.drc20CompilerFile')}
${t('docs.developerGuide.code.drc20CliFile')}
${t('docs.developerGuide.code.eventSystemFile')}
${t('docs.developerGuide.code.packageManagerFile')}
${t('docs.developerGuide.code.packageConfigFile')}
${t('docs.developerGuide.code.packageBuilderFile')}
${t('docs.developerGuide.code.registryClientFile')}
${t('docs.developerGuide.code.cardityCliFile')}
${t('docs.developerGuide.code.examplesDir')}
${t('docs.developerGuide.code.docsDir')}
${t('docs.developerGuide.code.cmakeListsFile')}` : `cardity_core/
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
            {t('docs.developerGuide.testing.title')}
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
            {t('docs.developerGuide.testing.title')}
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.bestPractices.errorHandling.title')}</h3>
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
            {t('docs.developerGuide.bestPractices.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.bestPractices.protocolOptimization.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong>{t('docs.developerGuide.bestPractices.protocolOptimization.minimizeStateVariables')}:</strong> {t('docs.developerGuide.bestPractices.protocolOptimization.minimizeStateVariablesDesc')}</li>
                <li>• <strong>{t('docs.developerGuide.bestPractices.protocolOptimization.efficientDataStructures')}:</strong> {t('docs.developerGuide.bestPractices.protocolOptimization.efficientDataStructuresDesc')}</li>
                <li>• <strong>{t('docs.developerGuide.bestPractices.protocolOptimization.optimizeMethods')}:</strong> {t('docs.developerGuide.bestPractices.protocolOptimization.optimizeMethodsDesc')}</li>
                <li>• <strong>{t('docs.developerGuide.bestPractices.protocolOptimization.batchOperations')}:</strong> {t('docs.developerGuide.bestPractices.protocolOptimization.batchOperationsDesc')}</li>
                <li>• <strong>{t('docs.developerGuide.bestPractices.protocolOptimization.lazyLoading')}:</strong> {t('docs.developerGuide.bestPractices.protocolOptimization.lazyLoadingDesc')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.bestPractices.compilationOptimization.title')}</h3>
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
            {t('docs.developerGuide.bestPractices.packageDevelopment.title')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.bestPractices.packageDevelopment.creatingPackages.title')}</h3>
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.bestPractices.packageDevelopment.packageConfiguration.title')}</h3>
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
            {t('docs.developerGuide.overview.title')}
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
            {t('docs.developerGuide.overview.title')}
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
            {t('docs.developerGuide.resources.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.resources.documentation')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <a href={`/docs/getting-started?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.gettingStartedGuide')}</a></li>
                <li>• <a href={`/docs/reference?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.languageReference')}</a></li>
                <li>• <a href={`/docs/standard-library?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.standardLibrary')}</a></li>
                <li>• <a href={`/docs/cli?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.cliTools')}</a></li>
                <li>• <a href={`/docs/deploy?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.deploymentGuide')}</a></li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.developerGuide.resources.community')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <a href="https://github.com/cardity-org/cardity-core" className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.githubRepository')}</a></li>
                <li>• <a href="https://discord.gg/cardity" className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.discordCommunity')}</a></li>
                <li>• <a href="https://x.com/song_doge" className="text-blue-400 hover:text-blue-300">X</a></li>
                <li>• <a href="https://forum.cardity.dev" className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.developerForum')}</a></li>
                <li>• <a href="mailto:hello@cardity.org" className="text-blue-400 hover:text-blue-300">{t('docs.developerGuide.resources.emailSupport')}</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.developerGuide.nextSteps.title')}
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              {t('docs.developerGuide.nextSteps.description')}
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.developerGuide.nextSteps.contributeCore')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.developerGuide.nextSteps.createPackages')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.developerGuide.nextSteps.buildApplications')}
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/cardity-org/cardity-core"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                {t('download.openSource.viewOnGithub')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link href={`/examples?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-secondary inline-flex items-center">
                {t('docs.cli.help.viewExamples')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 