"use client"

import Link from 'next/link'
import { ArrowRight, Code, FileText, Settings, Database, Zap, Shield } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function ReferencePage() {
  const { t } = useTranslations()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          {t('docs.reference.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {t('docs.reference.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {/* Protocol Structure */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.reference.syntax.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.syntax.description')}
          </p>
          <CodeBlock
            code={`protocol MyContract {
  version: "1.0.0";
  owner: "doge1contract123";
  
  // State variables
  state {
    name: string = "My Contract";
    balance: int = 0;
  }
  
  // Methods
  method setName(newName) {
    state.name = newName;
  }
  
  // Events
  event NameChanged {
    oldName: string;
    newName: string;
  }
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* State Variables */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.reference.types.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.types.description')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.types.basicTypes.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">string</code> - {t('docs.reference.types.basicTypes.string')}</li>
                <li><code className="bg-gray-800 px-1 rounded">int</code> - {t('docs.reference.types.basicTypes.int')}</li>
                <li><code className="bg-gray-800 px-1 rounded">bool</code> - {t('docs.reference.types.basicTypes.bool')}</li>
                <li><code className="bg-gray-800 px-1 rounded">number</code> - {t('docs.reference.types.basicTypes.number')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.types.complexTypes.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">array</code> - {t('docs.reference.types.complexTypes.array')}</li>
                <li><code className="bg-gray-800 px-1 rounded">map</code> - {t('docs.reference.types.complexTypes.map')}</li>
                <li><code className="bg-gray-800 px-1 rounded">struct</code> - {t('docs.reference.types.complexTypes.struct')}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <CodeBlock
              code={`state {
  // Basic types
  name: string = "My Protocol";
  age: int = 25;
  isActive: bool = true;
  owner: string = "doge1owner123";
  
  // Complex types
  tags: array = ["tag1", "tag2"];
  scores: map = {"user1": 100, "user2": 200};
  users: array = [];
}

// Structure definition
struct User {
  name: string;
  age: int;
  verified: bool;
}`}
              language="cardity"
              showLineNumbers={true}
            />
          </div>
        </section>

        {/* Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.reference.functions.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.functions.description')}
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.basicMethods.title')}</h3>
              <CodeBlock
                code={`method setName(newName) {
  state.name = newName;
  emit NameChanged(state.name, newName);
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.methodsWithReturn.title')}</h3>
              <CodeBlock
                code={`method getName() {
  return state.name;
}

method calculate(a, b) {
  return a + b;
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.methodsWithParams.title')}</h3>
              <CodeBlock
                code={`method transfer(toAddress, amount) {
  if (amount <= 0) {
    return "Invalid amount";
  }
  
  if (state.balance < amount) {
    return "Insufficient balance";
  }
  
  state.balance = state.balance - amount;
  emit Transfer(toAddress, amount);
  return "Transfer successful";
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Events */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.reference.functions.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.functions.description')}
          </p>
          
          <CodeBlock
            code={`// Event declaration
event Transfer {
  from: string;
  to: string;
  amount: int;
}

event UserRegistered {
  name: string;
  timestamp: int;
}

// Emit events in methods
method transfer(to, amount) {
  state.balance = state.balance - amount;
  emit Transfer(state.owner, to, amount);
}

method registerUser(name) {
  state.users.push(name);
  emit UserRegistered(name, now());
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* DRC-20 Token Standard */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.reference.functions.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.functions.description')}
          </p>
          
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
    mint_count: int = 0;
    transfer_count: int = 0;
  }
  
  // Deploy method
  method deploy() {
    if (!state.deployed) {
      state.deployed = true;
      emit TokenDeployed(drc20.tick, drc20.max_supply);
      return "Token deployed successfully";
    }
    return "Token already deployed";
  }
  
  // Mint method
  method mint(amount) {
    if (!state.deployed) return "Token not deployed";
    if (amount <= 0) return "Invalid amount";
    if (state.total_supply + amount > drc20.max_supply) return "Exceeds max supply";
    
    state.total_supply = state.total_supply + amount;
    state.mint_count = state.mint_count + 1;
    emit TokenMinted(drc20.tick, amount, state.total_supply);
    return "Minted successfully";
  }
  
  // Transfer method
  method transfer(to_address, amount) {
    if (!state.deployed) return "Token not deployed";
    if (amount <= 0) return "Invalid amount";
    
    state.transfer_count = state.transfer_count + 1;
    emit TokenTransferred(drc20.tick, amount, to_address);
    return "Transfer successful";
  }
  
  // Events
  event TokenDeployed {
    tick: string;
    max_supply: string;
  }
  
  event TokenMinted {
    tick: string;
    amount: int;
    total_supply: int;
  }
  
  event TokenTransferred {
    tick: string;
    amount: int;
    to_address: string;
  }
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* Control Structures */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.reference.functions.controlStructures.title')}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.controlStructures.conditionalStatements.title')}</h3>
              <CodeBlock
                code={`method processPayment(amount) {
  if (state.balance >= amount) {
    state.balance = state.balance - amount;
    emit PaymentProcessed(amount);
  } else {
    emit InsufficientFunds(state.balance, amount);
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.controlStructures.loops.title')}</h3>
              <CodeBlock
                code={`method processArray(items) {
  for (i = 0; i < items.length; i++) {
    state.processedItems.push(items[i]);
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Built-in Functions */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.reference.functions.builtInFunctions.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.functions.builtInFunctions.description')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.builtInFunctions.commonFunctions.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><code className="bg-gray-800 px-1 rounded">now()</code> - {t('docs.reference.functions.builtInFunctions.commonFunctions.now')}</li>
                <li><code className="bg-gray-800 px-1 rounded">length()</code> - {t('docs.reference.functions.builtInFunctions.commonFunctions.length')}</li>
                <li><code className="bg-gray-800 px-1 rounded">push()</code> - {t('docs.reference.functions.builtInFunctions.commonFunctions.push')}</li>
                <li><code className="bg-gray-800 px-1 rounded">pop()</code> - {t('docs.reference.functions.builtInFunctions.commonFunctions.pop')}</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3">{t('docs.reference.functions.builtInFunctions.usageExamples.title')}</h3>
              <CodeBlock
                code={`method addUser(name) {
  state.users.push(name);
  emit UserAdded(name, now());
}

method getUsersCount() {
  return state.users.length();
}`}
                language="cardity"
              />
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.reference.functions.errorHandling.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.functions.errorHandling.description')}
          </p>
          
          <CodeBlock
            code={`method withdraw(amount) {
  if (state.balance < amount) {
    return "Insufficient balance";
  }
  
  if (amount <= 0) {
    return "Amount must be positive";
  }
  
  state.balance = state.balance - amount;
  emit Withdrawal(state.owner, amount);
  return "Withdrawal successful";
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* ABI Generation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.reference.functions.abiGeneration.title')}
          </h2>
          <p className="text-gray-400 mb-6">
            {t('docs.reference.functions.abiGeneration.description')}
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">{t('docs.reference.functions.abiGeneration.generateAbi.title')}</h3>
            <CodeBlock
              code={`# Generate ABI from .car file
cardity_abi protocol.car protocol.abi

# Generate ABI for DRC-20 token
cardity_abi drc20_token.car drc20_token.abi`}
              language="bash"
            />
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">{t('docs.reference.functions.abiGeneration.generatedAbiExample.title')}</h3>
            <CodeBlock
              code={`{
  "protocol": "MyDrc20Token",
  "version": "1.0.0",
  "methods": [
    {
      "name": "deploy",
      "params": [],
      "returns": "string"
    },
    {
      "name": "mint",
      "params": ["amount"],
      "returns": "string"
    },
    {
      "name": "transfer",
      "params": ["to_address", "amount"],
      "returns": "string"
    }
  ],
  "events": [
    {
      "name": "TokenDeployed",
      "params": ["tick", "max_supply"]
    },
    {
      "name": "TokenMinted",
      "params": ["tick", "amount", "total_supply"]
    }
  ]
}`}
              language="json"
              showLineNumbers={true}
            />
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t('docs.gettingStarted.nextSteps.title')}
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              {t('docs.gettingStarted.nextSteps.description')}
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.gettingStarted.nextSteps.learnStandardLibrary')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.gettingStarted.nextSteps.understandCliTools')}
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                {t('docs.gettingStarted.nextSteps.viewMoreExamples')}
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/standard-library" className="btn-primary inline-flex items-center">
                {t('docs.standardLibrary.title')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/docs/cli" className="btn-secondary inline-flex items-center">
                {t('docs.cli.title')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 