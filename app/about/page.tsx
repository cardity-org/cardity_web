import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, Package, Database, FileText, Github, ExternalLink, Terminal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Cardity',
  description: 'Learn about Cardity - a statically-typed programming language for developing smart contracts on Dogecoin UTXO with Solidity-style syntax.',
  keywords: 'Cardity about, smart contract language, Dogecoin development, UTXO programming, blockchain language',
  openGraph: {
    title: 'About Cardity - Smart Contract Language for Dogecoin',
    description: 'Learn about Cardity programming language, its features, and how it enables smart contract development on Dogecoin UTXO.',
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          About Cardity
        </h1>
        <p className="text-lg text-gray-400">
          Cardity Core - 完整的智能合约编程语言实现，专为 Dogecoin UTXO 设计
        </p>
      </div>

      <div className="space-y-12">
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-400" />
            项目概述
          </h2>
          
          <div className="card">
            <p className="text-gray-300 mb-4">
              Cardity Core 是 Cardity 编程语言的完整实现，提供：
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>编译器</strong> - 将编程语言格式的 .car 文件编译为可执行格式</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>运行时</strong> - 执行编译后的协议</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>包管理器</strong> - 管理依赖和发布包</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>CLI 工具</strong> - 命令行开发工具</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>类型系统</strong> - 静态类型检查</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>事件系统</strong> - 事件驱动架构</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>ABI 生成器</strong> - 自动生成协议接口（支持编程语言格式和 JSON 格式）</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>区块链部署</strong> - 支持 Dogecoin 链上部署</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>DRC-20 代币标准</strong> - 完整的 DRC-20 代币支持</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Version Information */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-green-400" />
            版本信息
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-400" />
                npm 包信息
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>包名：</span>
                  <code className="bg-gray-800 px-2 rounded">cardity</code>
                </div>
                <div className="flex justify-between">
                  <span>当前版本：</span>
                  <code className="bg-gray-800 px-2 rounded">1.0.1</code>
                </div>
                <div className="flex justify-between">
                  <span>许可证：</span>
                  <code className="bg-gray-800 px-2 rounded">MIT</code>
                </div>
                <div className="flex justify-between">
                  <span>包大小：</span>
                  <code className="bg-gray-800 px-2 rounded">143 kB</code>
                </div>
                <div className="flex justify-between">
                  <span>文件数量：</span>
                  <code className="bg-gray-800 px-2 rounded">40</code>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Github className="w-5 h-5 mr-2 text-purple-400" />
                GitHub 仓库
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>仓库：</span>
                  <code className="bg-gray-800 px-2 rounded">cardity-org/cardity-core</code>
                </div>
                <div className="flex justify-between">
                  <span>主页：</span>
                  <code className="bg-gray-800 px-2 rounded">github.com/cardity-org/cardity-core</code>
                </div>
                <div className="flex justify-between">
                  <span>npm 页面：</span>
                  <code className="bg-gray-800 px-2 rounded">npmjs.com/package/cardity</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            核心特性
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">编程语言格式</h3>
              <p className="text-gray-400 mb-4">
                Cardity 支持编程语言格式的 .car 文件，类似 Solidity 的语法，包含：
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• 协议定义（protocol）</li>
                <li>• 状态变量（state）</li>
                <li>• 事件系统（event）</li>
                <li>• 方法定义（method）</li>
                <li>• 类型系统（string, int, bool）</li>
                <li>• 事件发射（emit）</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">DRC-20 代币标准</h3>
              <p className="text-gray-400 mb-4">
                完整的 DRC-20 代币标准支持，包含：
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• 代币定义（drc20 块）</li>
                <li>• 部署方法（deploy）</li>
                <li>• 铸造方法（mint）</li>
                <li>• 转账方法（transfer）</li>
                <li>• 事件定义（TokenDeployed, TokenMinted, TokenTransferred）</li>
                <li>• 自动 ABI 生成</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">区块链部署</h3>
              <p className="text-gray-400 mb-4">
                支持多种部署方式：
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• .carc 二进制格式</li>
                <li>• OP_RETURN 部署</li>
                <li>• 铭文部署（ordinals 协议）</li>
                <li>• Dogecoin 链上部署</li>
                <li>• 协议验证和查看</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">开发工具</h3>
              <p className="text-gray-400 mb-4">
                完整的开发工具链：
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• CLI 命令行工具</li>
                <li>• 项目初始化</li>
                <li>• 编译和运行</li>
                <li>• ABI 生成</li>
                <li>• 包管理</li>
                <li>• 调试和测试</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Options */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Download className="w-6 h-6 mr-3 text-blue-400" />
            安装方式
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-400" />
                npm 安装（推荐）
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-green-400">npm install -g cardity</code>
              </div>
              <p className="text-gray-400 text-sm">
                通过 npm 包管理器一键安装，支持全局使用，自动管理依赖。
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Github className="w-5 h-5 mr-2 text-green-400" />
                从源码编译
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-green-400">git clone https://github.com/cardity-org/cardity-core.git</code>
              </div>
              <p className="text-gray-400 text-sm">
                从 GitHub 仓库克隆源码，适合开发者自定义编译和贡献代码。
              </p>
            </div>
          </div>
        </section>

        {/* Community and Links */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3 text-blue-400" />
            社区和链接
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">官方资源</h3>
              <div className="space-y-3">
                <Link href="https://github.com/cardity-org/cardity-core" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub 仓库
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
                <Link href="https://www.npmjs.com/package/cardity" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Package className="w-4 h-4 mr-2" />
                  npm 包页面
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
                <Link href="/docs" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <BookOpen className="w-4 h-4 mr-2" />
                  官方文档
                </Link>
                <Link href="/examples" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Code className="w-4 h-4 mr-2" />
                  示例项目
                </Link>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">开发资源</h3>
              <div className="space-y-3">
                <Link href="/docs/getting-started" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  快速开始
                </Link>
                <Link href="/docs/cli" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Terminal className="w-4 h-4 mr-2" />
                  CLI 参考
                </Link>
                <Link href="/docs/deploy" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Shield className="w-4 h-4 mr-2" />
                  部署指南
                </Link>
                <Link href="/download" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  下载工具
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contributing */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <ArrowRight className="w-6 h-6 mr-3 text-blue-400" />
            贡献代码
          </h2>
          
          <div className="card">
            <p className="text-gray-300 mb-4">
              欢迎贡献代码！Cardity 是一个开源项目，我们欢迎所有形式的贡献：
            </p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Fork 项目并创建功能分支</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>提交你的更改</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>推送到分支并创建 Pull Request</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>报告 Bug 和提出功能建议</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://github.com/cardity-org/cardity-core" className="btn-primary inline-flex items-center">
                <Github className="w-4 h-4 mr-2" />
                查看 GitHub
              </Link>
              <Link href="/docs/developer-guide" className="btn-secondary inline-flex items-center">
                <Code className="w-4 h-4 mr-2" />
                开发指南
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 