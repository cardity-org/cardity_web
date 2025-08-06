import Link from 'next/link'
import { Download, Play, ArrowRight, CheckCircle } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          快速开始
        </h1>
        <p className="text-lg text-gray-600">
          在几分钟内安装 Cardity CLI 并编写你的第一个智能合约
        </p>
      </div>

      <div className="space-y-12">
        {/* Installation */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Download className="w-6 h-6 mr-3 text-cardity-600" />
            安装 CLI 工具
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">使用 npm 安装</h3>
            <CodeBlock
              code={`npm install -g cardityc`}
              language="bash"
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">验证安装</h3>
            <CodeBlock
              code={`cardity --version`}
              language="bash"
            />
            <p className="text-sm text-gray-600 mt-2">
              如果安装成功，你应该看到类似 <code className="bg-gray-200 px-1 rounded">cardity 0.1.0</code> 的输出
            </p>
          </div>
        </section>

        {/* Hello World */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Play className="w-6 h-6 mr-3 text-cardity-600" />
            你的第一个合约
          </h2>
          
          <p className="text-gray-600 mb-6">
            创建一个简单的 Hello World 合约来熟悉 Cardity 的基本语法：
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">创建合约文件</h3>
            <p className="text-gray-600 mb-4">创建一个名为 <code className="bg-gray-200 px-1 rounded">hello.cardity</code> 的文件：</p>
            <CodeBlock
              code={`<-- SPDX-License-Identifier: MIT -->

protocol HelloWorld {
  state {
    string message;
    int count;
  }
  
  method greet(string name) {
    self.message = "Hello, " + name + "!";
    self.count += 1;
  }
  
  method getMessage() -> string {
    return self.message;
  }
  
  method getCount() -> int {
    return self.count;
  }
  
  event Greeted(string name, int timestamp);
}`}
              language="cardity"
              showLineNumbers={true}
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">编译合约</h3>
            <CodeBlock
              code={`cardity build hello.cardity`}
              language="bash"
            />
            <p className="text-sm text-gray-600 mt-2">
              这将生成一个 <code className="bg-gray-200 px-1 rounded">hello.carc</code> 文件
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">运行合约</h3>
            <CodeBlock
              code={`cardity run hello.carc greet "Cardity"`}
              language="bash"
            />
          </div>
        </section>

        {/* Key Concepts */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            核心概念
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Protocol（协议）</h3>
              <p className="text-gray-600 mb-4">
                类似于 Solidity 中的 Contract，是 Cardity 合约的基本单位。每个协议包含状态、方法和事件。
              </p>
              <div className="flex items-center text-sm text-cardity-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                定义合约结构
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">State（状态）</h3>
              <p className="text-gray-600 mb-4">
                合约的持久化数据，存储在 UTXO 中。支持基本类型如 int、string、bool 等。
              </p>
              <div className="flex items-center text-sm text-cardity-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                持久化存储
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Method（方法）</h3>
              <p className="text-gray-600 mb-4">
                合约的可执行函数，可以修改状态、返回值或触发事件。支持参数和返回值。
              </p>
              <div className="flex items-center text-sm text-cardity-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                业务逻辑
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Event（事件）</h3>
              <p className="text-gray-600 mb-4">
                用于记录合约执行过程中的重要信息，可以被外部系统监听和处理。
              </p>
              <div className="flex items-center text-sm text-cardity-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                日志记录
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            下一步
          </h2>
          
          <div className="bg-cardity-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              现在你已经成功创建了第一个 Cardity 合约！接下来你可以：
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                学习完整的语言语法和特性
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                探索标准库提供的功能
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                了解如何部署合约到 Dogecoin 网络
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                查看更多示例和最佳实践
              </li>
            </ul>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link href="/docs/reference" className="btn-primary inline-flex items-center">
                语言参考
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/examples" className="btn-secondary inline-flex items-center">
                查看示例
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 