import Link from 'next/link'
import { Code, Github, Twitter, Mail, Heart, Users, Globe, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          关于 Cardity
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Cardity 是一个专为 Dogecoin UTXO 设计的智能合约编程语言，
          致力于让区块链开发变得更加简单和高效。
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            我们的使命
          </h2>
          <p className="text-gray-600 mb-6">
            Cardity 的诞生源于对 Dogecoin 生态系统发展的深刻思考。我们相信，
            通过提供简单易用的智能合约编程语言，可以激发更多开发者参与到
            Dogecoin 生态建设中，创造出更多有趣和有价值的应用。
          </p>
          <p className="text-gray-600 mb-6">
            我们的目标是降低智能合约开发的门槛，让任何人都能够轻松地创建、
            部署和管理基于 Dogecoin 的去中心化应用。
          </p>
          <div className="flex items-center text-cardity-600">
            <Heart className="w-5 h-5 mr-2" />
            <span className="font-medium">为 Dogecoin 社区而生</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            核心特性
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-cardity-100 p-2 rounded-lg mr-4">
                <Code className="w-5 h-5 text-cardity-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Solidity 风格语法
                </h3>
                <p className="text-gray-600">
                  熟悉的语法结构，降低学习成本，让开发者快速上手
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 p-2 rounded-lg mr-4">
                <Zap className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  UTXO 原生支持
                </h3>
                <p className="text-gray-600">
                  专为 Dogecoin UTXO 模型设计，原生支持 UTXO 操作
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  开源社区驱动
                </h3>
                <p className="text-gray-600">
                  完全开源，社区贡献，持续改进和发展
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          技术架构
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                编译器
              </h3>
              <p className="text-gray-600">
                将 Cardity 代码编译为字节码，支持语法检查、类型检查和优化
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                运行时
              </h3>
              <p className="text-gray-600">
                在 Dogecoin 网络上执行合约，处理 UTXO 操作和状态管理
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                工具链
              </h3>
              <p className="text-gray-600">
                提供 CLI 工具、调试器、测试框架等完整的开发工具
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            开发团队
          </h2>
          <p className="text-gray-600 mb-6">
            Cardity 由一群热爱 Dogecoin 和区块链技术的开发者创建。
            我们来自不同的背景，但都致力于推动 Dogecoin 生态系统的发展。
          </p>
          <p className="text-gray-600 mb-6">
            我们的团队包括：
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-cardity-600" />
              区块链协议专家
            </li>
            <li className="flex items-center">
              <Code className="w-4 h-4 mr-2 text-cardity-600" />
              编程语言设计师
            </li>
            <li className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-cardity-600" />
              开源社区维护者
            </li>
            <li className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-cardity-600" />
              开发者体验专家
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            开源协议
          </h2>
          <p className="text-gray-600 mb-6">
            Cardity 采用 MIT 开源协议，这意味着：
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• 任何人都可以自由使用、修改和分发</li>
            <li>• 可以用于商业项目</li>
            <li>• 可以修改源代码</li>
            <li>• 可以私有部署</li>
          </ul>
          <p className="text-gray-600 mb-6">
            我们相信开源的力量，希望通过开放协作推动整个生态系统的发展。
          </p>
          <a
            href="https://github.com/cardity/cardity/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cardity-600 hover:text-cardity-700 font-medium"
          >
            查看完整协议
            <Github className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>

      <div className="bg-cardity-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">
          加入我们的社区
        </h2>
        <p className="text-cardity-100 mb-6 max-w-2xl mx-auto">
          无论你是开发者、设计师还是区块链爱好者，我们都欢迎你加入 Cardity 社区。
          一起构建更好的 Dogecoin 生态系统！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/cardity"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-cardity-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </a>
          <a
            href="https://twitter.com/carditylang"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white hover:bg-white hover:text-cardity-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </a>
          <a
            href="mailto:hello@cardity.org"
            className="border border-white text-white hover:bg-white hover:text-cardity-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            联系我们
          </a>
        </div>
      </div>
    </div>
  )
} 