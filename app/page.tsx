import Link from 'next/link'
import { Code, Zap, Shield, Globe, ArrowRight, Download, BookOpen, Play } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-cardity-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-cardity-600 text-white p-4 rounded-2xl">
                <Code className="w-12 h-12" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Cardity
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              专为 Dogecoin UTXO 设计的智能合约编程语言
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              使用 Solidity 风格的语法，原生支持 UTXO 协议，让智能合约开发变得简单高效
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
                <Play className="w-4 h-4 mr-2" />
                开始编写合约
              </Link>
              <Link href="/docs" className="btn-secondary inline-flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                查看文档
              </Link>
              <Link href="/docs/cli" className="btn-secondary inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                下载 CLI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              核心特性
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cardity 结合了现代编程语言的优雅和区块链技术的强大功能
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-cardity-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-cardity-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Solidity 风格语法
              </h3>
              <p className="text-gray-600">
                熟悉的语法结构，降低学习成本，让开发者快速上手智能合约开发
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                UTXO 原生协议
              </h3>
              <p className="text-gray-600">
                专为 Dogecoin UTXO 模型设计，原生支持 UTXO 操作和状态管理
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                自定义合约逻辑
              </h3>
              <p className="text-gray-600">
                强大的合约逻辑表达能力，支持复杂的业务场景和自定义协议
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              快速开始
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              几行代码就能创建一个简单的智能合约
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Hello Cardity 示例
              </h3>
              <CodeBlock
                code={`<-- SPDX-License-Identifier: MIT -->

protocol HelloCardity {
  state {
    string message;
    int count;
  }
  
  method greet(string name) {
    self.message = "Hello, " + name + "!";
    self.count += 1;
  }
  
  event Greeted(string name, int timestamp);
}`}
                language="cardity"
              />
            </div>
            
            <div className="space-y-6">
              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  安装 CLI
                </h4>
                <CodeBlock
                  code={`npm install -g cardityc`}
                  language="bash"
                />
              </div>
              
              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  编译合约
                </h4>
                <CodeBlock
                  code={`cardity build hello.cardity`}
                  language="bash"
                />
              </div>
              
              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  部署到 Dogecoin
                </h4>
                <CodeBlock
                  code={`cardity deploy hello.carc`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cardity-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备开始你的 Cardity 之旅？
          </h2>
          <p className="text-xl text-cardity-100 mb-8 max-w-2xl mx-auto">
            加入我们的开发者社区，探索智能合约的无限可能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs/getting-started" className="bg-white text-cardity-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center">
              开始学习
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/examples" className="border border-white text-white hover:bg-white hover:text-cardity-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center">
              查看示例
              <Globe className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 