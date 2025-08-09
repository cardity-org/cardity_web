"use client"

import Link from 'next/link'
import { ArrowRight, Package, Code, Database, Zap, Shield, Settings } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function StandardLibraryPage() {
  const { t, isClient, isInitialized } = useTranslations()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          {t('docs.standardLibrary.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {t('docs.standardLibrary.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {/* Built-in Functions */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.standardLibrary.functions.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.functions.timeFunctions.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">now()</code> - {t('docs.standardLibrary.functions.timeFunctions.now')}</li>
                <li><code className="bg-gray-800 px-1 rounded">time()</code> - {t('docs.standardLibrary.functions.timeFunctions.time')}</li>
                <li><code className="bg-gray-800 px-1 rounded">date()</code> - {t('docs.standardLibrary.functions.timeFunctions.date')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.functions.arrayFunctions.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">length()</code> - {t('docs.standardLibrary.functions.arrayFunctions.length')}</li>
                <li><code className="bg-gray-800 px-1 rounded">push()</code> - {t('docs.standardLibrary.functions.arrayFunctions.push')}</li>
                <li><code className="bg-gray-800 px-1 rounded">pop()</code> - {t('docs.standardLibrary.functions.arrayFunctions.pop')}</li>
                <li><code className="bg-gray-800 px-1 rounded">splice()</code> - {t('docs.standardLibrary.functions.arrayFunctions.splice')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.functions.stringFunctions.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">length()</code> - {t('docs.standardLibrary.functions.stringFunctions.length')}</li>
                <li><code className="bg-gray-800 px-1 rounded">substring()</code> - {t('docs.standardLibrary.functions.stringFunctions.substring')}</li>
                <li><code className="bg-gray-800 px-1 rounded">toLowerCase()</code> - {t('docs.standardLibrary.functions.stringFunctions.toLowerCase')}</li>
                <li><code className="bg-gray-800 px-1 rounded">toUpperCase()</code> - {t('docs.standardLibrary.functions.stringFunctions.toUpperCase')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.functions.mathFunctions.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">abs()</code> - {t('docs.standardLibrary.functions.mathFunctions.abs')}</li>
                <li><code className="bg-gray-800 px-1 rounded">min()</code> - {t('docs.standardLibrary.functions.mathFunctions.min')}</li>
                <li><code className="bg-gray-800 px-1 rounded">max()</code> - {t('docs.standardLibrary.functions.mathFunctions.max')}</li>
                <li><code className="bg-gray-800 px-1 rounded">sqrt()</code> - {t('docs.standardLibrary.functions.mathFunctions.sqrt')}</li>
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
            {t('docs.standardLibrary.overview.title')}
          </h2>
          
          <p className="text-gray-400 mb-6">
            {t('docs.standardLibrary.overview.description')}
          </p>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.overview.packageConfiguration.title')}</h3>
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.overview.packageCommands.title')}</h3>
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
          {t('docs.standardLibrary.overview.standardPackages.title')}
        </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-400" />
                {t('docs.standardLibrary.overview.standardPackages.cardityStandard.title')}
              </h3>
              <p className="text-gray-400 mb-4">
                {t('docs.standardLibrary.overview.standardPackages.cardityStandard.description')}
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">{t('docs.standardLibrary.overview.standardPackages.cardityStandard.features.title')}</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityStandard.features.dataStructures')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityStandard.features.stringManipulation')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityStandard.features.mathOperations')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityStandard.features.timeFunctions')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityStandard.features.validationHelpers')}</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-400" />
                {t('docs.standardLibrary.overview.standardPackages.cardityUtils.title')}
              </h3>
              <p className="text-gray-400 mb-4">
                {t('docs.standardLibrary.overview.standardPackages.cardityUtils.description')}
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">{t('docs.standardLibrary.overview.standardPackages.cardityUtils.features.title')}</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityUtils.features.addressValidation')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityUtils.features.hashEncryption')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityUtils.features.jsonManipulation')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityUtils.features.errorHandling')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityUtils.features.loggingDebugging')}</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.title')}
              </h3>
              <p className="text-gray-400 mb-4">
                {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.description')}
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">{t('docs.standardLibrary.overview.standardPackages.cardityDrc20.features.title')}</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.features.tokenTemplates')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.features.deploymentUtilities')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.features.mintTransfer')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.features.tokenValidation')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityDrc20.features.eventEmission')}</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-400" />
                {t('docs.standardLibrary.overview.standardPackages.cardityTest.title')}
              </h3>
              <p className="text-gray-400 mb-4">
                {t('docs.standardLibrary.overview.standardPackages.cardityTest.description')}
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-md font-semibold text-white mb-2">{t('docs.standardLibrary.overview.standardPackages.cardityTest.features.title')}</h4>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityTest.features.unitTesting')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityTest.features.assertionFunctions')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityTest.features.mockStateEvents')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityTest.features.testCoverage')}</li>
                  <li>• {t('docs.standardLibrary.overview.standardPackages.cardityTest.features.integrationTesting')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Using Standard Library */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.standardLibrary.usage.importAndUse')}
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.usage.importAndUse')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.standardLibrary.usage.code.importStandardLibrary')}
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
    ${t('docs.standardLibrary.usage.code.useBuiltInFunctions')}
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
}` : `// Import standard library functions
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
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.usage.drc20WithStandardLibrary')}</h3>
              <CodeBlock
                code={isClient && isInitialized ? `${t('docs.standardLibrary.usage.code.usingDrc20Library')}
import "@cardity/drc20";

protocol MyToken {
  version: "1.0.0";
  owner: "doge1token123";
  
  ${t('docs.standardLibrary.usage.code.drc20Configuration')}
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
}` : `// Using DRC-20 standard library
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
            {t('docs.standardLibrary.usage.registryFeatures')}
          </h2>
          
          <p className="text-gray-400 mb-6">
            {t('docs.standardLibrary.overview.description')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.usage.registryFeatures')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• {t('docs.standardLibrary.usage.centralizedDiscovery')}</li>
                <li>• {t('docs.standardLibrary.usage.versionManagement')}</li>
                <li>• {t('docs.standardLibrary.usage.dependencyResolution')}</li>
                <li>• {t('docs.standardLibrary.usage.packageDocumentation')}</li>
                <li>• {t('docs.standardLibrary.usage.communityRatings')}</li>
                <li>• {t('docs.standardLibrary.usage.securityScanning')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.standardLibrary.usage.registryCommands')}</h3>
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
            {t('docs.standardLibrary.nextSteps.title')}
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              {t('docs.standardLibrary.nextSteps.description')}
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.standardLibrary.nextSteps.learnDeployment')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.standardLibrary.nextSteps.exploreAdvancedTechniques')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.standardLibrary.nextSteps.createPublishPackages')}
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/docs/deploy?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-primary inline-flex items-center">
                {t('docs.deploy.title')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href={`/docs/developer-guide?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-secondary inline-flex items-center">
                {t('docs.developerGuide.title')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 