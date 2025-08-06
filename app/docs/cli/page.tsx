import Link from 'next/link'
import { Terminal, Download, Code, Database, ArrowRight, Settings, Package } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

export default function CLIPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          CLI Reference
        </h1>
        <p className="text-lg text-gray-400">
          Complete command-line interface reference for Cardity development tools
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
              当前版本：<code className="bg-gray-800 px-1 rounded">1.0.1</code>
            </p>
          </div>
        </section>

        {/* Basic Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-blue-400" />
            Basic Commands
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">项目初始化</h3>
              <CodeBlock
                code={`# 初始化新项目
cardity init [project-name]

# 示例
cardity init my-first-protocol`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                创建新的 Cardity 项目，包含基本文件结构
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">编译协议</h3>
              <CodeBlock
                code={`# 编译 .car 文件
cardity compile <file> [options]

# 示例
cardity compile src/index.car
cardity compile src/index.car --format carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                将 Cardity 协议文件编译为可执行格式
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">运行协议</h3>
              <CodeBlock
                code={`# 运行编译后的协议
cardity run <file> [options]

# 示例
cardity run dist/index.carc
cardity run dist/index.carc get_message`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                执行编译后的协议文件
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">生成 ABI</h3>
              <CodeBlock
                code={`# 生成协议接口
cardity abi <file> [options]

# 示例
cardity abi src/index.car
cardity abi src/index.car --output index.abi`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                自动生成协议的应用二进制接口
              </p>
            </div>
          </div>
        </section>

        {/* DRC-20 Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3 text-green-400" />
            DRC-20 Token Commands
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">编译 DRC-20 代币</h3>
              <CodeBlock
                code={`# 编译 DRC-20 代币
cardity drc20 compile <file>

# 示例
cardity drc20 compile token.car`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                专门用于编译 DRC-20 代币协议
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">部署 DRC-20 代币</h3>
              <CodeBlock
                code={`# 部署 DRC-20 代币
cardity drc20 deploy <file> [options]

# 示例
cardity drc20 deploy token.car
cardity drc20 deploy token.car --output deploy.json`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                部署 DRC-20 代币到 Dogecoin 网络
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">铸造代币</h3>
              <CodeBlock
                code={`# 铸造代币
cardity drc20 mint <tick> <amount> [options]

# 示例
cardity drc20 mint MYT 1000
cardity drc20 mint MYT 1000 --output mint.json`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                铸造指定数量的 DRC-20 代币
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">转账代币</h3>
              <CodeBlock
                code={`# 转账代币
cardity drc20 transfer <tick> <to> <amount> [options]

# 示例
cardity drc20 transfer MYT doge1abc... 100
cardity drc20 transfer MYT doge1abc... 100 --output transfer.json`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                转账 DRC-20 代币到指定地址
              </p>
            </div>
          </div>
        </section>

        {/* Deployment Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-purple-400" />
            Deployment Commands
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">验证协议</h3>
              <CodeBlock
                code={`# 验证 .carc 文件
cardity_deploy validate <file>

# 示例
cardity_deploy validate protocol.carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                验证编译后的协议文件格式和内容
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">查看协议信息</h3>
              <CodeBlock
                code={`# 查看协议信息
cardity_deploy info <file>

# 示例
cardity_deploy info protocol.carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                显示协议的详细信息，包括版本、方法等
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">部署到 Dogecoin</h3>
              <CodeBlock
                code={`# 部署到 Dogecoin 链
cardity_deploy deploy <file> [options]

# 示例
cardity_deploy deploy protocol.carc \\
  --address doge1... \\
  --private-key ...`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                将协议部署到 Dogecoin 区块链网络
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">创建铭文交易</h3>
              <CodeBlock
                code={`# 创建铭文交易
cardity_deploy inscription <file> [options]

# 示例
cardity_deploy inscription protocol.carc \\
  --address doge1... \\
  --output inscription.txt`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                使用 ordinals 协议创建铭文交易
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-orange-400" />
            Advanced Commands
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">编译器工具</h3>
              <CodeBlock
                code={`# 编译为不同格式
cardityc main.car --format carc
cardityc main.car --format json

# 生成部署包
cardityc main.car -o deployed.carc`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                高级编译器选项和格式转换
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">ABI 生成器</h3>
              <CodeBlock
                code={`# 生成 ABI
cardity_abi main.car                    # 输出到标准输出
cardity_abi main.car main.abi          # 输出到文件

# 支持编程语言格式和 JSON 格式`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                独立的 ABI 生成工具
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">运行时工具</h3>
              <CodeBlock
                code={`# 运行协议
cardity_runtime main.car set_message "Hello"
cardity_runtime main.car get_message

# 支持方法调用和参数传递`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                独立的运行时执行工具
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">包管理</h3>
              <CodeBlock
                code={`# 包管理命令
cardity install <package>
cardity uninstall <package>
cardity list
cardity search <query>
cardity publish`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                管理依赖包和发布包
              </p>
            </div>
          </div>
        </section>

        {/* Help and Support */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <ArrowRight className="w-6 h-6 mr-3 text-blue-400" />
            Help and Support
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">获取帮助</h3>
              <CodeBlock
                code={`# 查看所有命令
cardity --help

# 查看特定命令帮助
cardity compile --help
cardity drc20 --help
cardity_deploy --help`}
                language="bash"
              />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">版本信息</h3>
              <CodeBlock
                code={`# 查看版本
cardity --version

# 查看详细信息
cardity --version --verbose`}
                language="bash"
              />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              需要更多帮助？查看我们的文档和示例
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
                <ArrowRight className="w-4 h-4 mr-2" />
                快速开始
              </Link>
              <Link href="/examples" className="btn-secondary inline-flex items-center">
                <Code className="w-4 h-4 mr-2" />
                查看示例
              </Link>
              <Link href="/docs/deploy" className="btn-secondary inline-flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                部署指南
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 