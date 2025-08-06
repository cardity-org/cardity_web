import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, CheckCircle, Database, Terminal, Package } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'Get started with Cardity smart contract development. Install CLI tools via npm, write your first contract, and deploy to Dogecoin UTXO blockchain.',
  keywords: 'Cardity getting started, smart contract tutorial, Dogecoin development, UTXO programming, first contract, npm install',
  openGraph: {
    title: 'Getting Started with Cardity - Smart Contract Development',
    description: 'Learn how to install Cardity CLI via npm, write your first smart contract, and deploy to Dogecoin UTXO blockchain.',
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
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-400" />
              npm 安装（推荐）
            </h3>
            <CodeBlock
              code={`# 全局安装 Cardity
npm install -g cardity

# 验证安装
cardity --version

# 查看帮助
cardity --help`}
              language="bash"
            />
            <p className="text-sm text-gray-400 mt-2">
              如果安装成功，你应该看到类似 <code className="bg-gray-800 px-1 rounded">cardity 1.0.1</code> 的输出
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">从源码编译</h3>
            <CodeBlock
              code={`# 克隆项目
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

# 安装依赖
npm install

# 验证安装
cardity --version`}
              language="bash"
            />
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
            />
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Compile and Run</h3>
            <CodeBlock
              code={`# 编译协议
cardity compile hello.car

# 生成 ABI
cardity abi hello.car

# 运行协议
cardity run hello.carc

# 调用方法
cardity run hello.carc get_message
cardity run hello.carc set_message "Hello, World!"`}
              language="bash"
            />
          </div>
        </section>

        {/* CLI Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-blue-400" />
            CLI Commands
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">项目初始化</h3>
              <CodeBlock
                code={`# 初始化新项目
cardity init my-first-protocol

# 进入项目目录
cd my-first-protocol

# 查看项目结构
ls -la`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">编译和运行</h3>
              <CodeBlock
                code={`# 编译协议
cardity compile src/index.car

# 生成 ABI
cardity abi src/index.car

# 运行协议
cardity run dist/index.carc`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">DRC-20 代币操作</h3>
              <CodeBlock
                code={`# 编译 DRC-20 代币
cardity drc20 compile token.car

# 部署 DRC-20 代币
cardity drc20 deploy token.car

# 铸造代币
cardity drc20 mint MYT 1000`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">部署到区块链</h3>
              <CodeBlock
                code={`# 验证协议
cardity_deploy validate protocol.carc

# 部署到 Dogecoin
cardity_deploy deploy protocol.carc \\
  --address doge1... \\
  --private-key ...`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Language Features */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            Language Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">协议定义</h3>
              <p className="text-gray-400 mb-4">
                Cardity 使用 <code className="bg-gray-800 px-1 rounded">protocol</code> 关键字定义智能合约
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                类似 Solidity 的语法
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">状态管理</h3>
              <p className="text-gray-400 mb-4">
                使用 <code className="bg-gray-800 px-1 rounded">state</code> 块定义状态变量
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Database className="w-4 h-4 mr-1" />
                持久化存储
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">事件系统</h3>
              <p className="text-gray-400 mb-4">
                使用 <code className="bg-gray-800 px-1 rounded">event</code> 和 <code className="bg-gray-800 px-1 rounded">emit</code> 处理事件
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Zap className="w-4 h-4 mr-1" />
                事件驱动架构
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">DRC-20 支持</h3>
              <p className="text-gray-400 mb-4">
                内置完整的 DRC-20 代币标准支持
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Shield className="w-4 h-4 mr-1" />
                代币标准兼容
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <ArrowRight className="w-6 h-6 mr-3 text-blue-400" />
            Next Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/cli" className="card hover:bg-gray-800/50 transition-colors">
              <Terminal className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">CLI Reference</h3>
              <p className="text-gray-400 text-sm">
                Learn all available CLI commands and options
              </p>
            </Link>
            
            <Link href="/examples" className="card hover:bg-gray-800/50 transition-colors">
              <Code className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Examples</h3>
              <p className="text-gray-400 text-sm">
                Explore real-world smart contract examples
              </p>
            </Link>
            
            <Link href="/docs/deploy" className="card hover:bg-gray-800/50 transition-colors">
              <Globe className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Deploy</h3>
              <p className="text-gray-400 text-sm">
                Deploy your contracts to Dogecoin blockchain
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
} 