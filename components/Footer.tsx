import Link from 'next/link'
import { Code, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-cardity-600 text-white p-2 rounded-lg mr-3">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Cardity</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Cardity 是一个专为 Dogecoin UTXO 设计的智能合约编程语言，
              提供 Solidity 风格的语法和强大的合约逻辑能力。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/cardity"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/carditylang"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@cardity.org"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">文档</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/getting-started" className="text-gray-400 hover:text-white transition-colors duration-200">
                  快速开始
                </Link>
              </li>
              <li>
                <Link href="/docs/reference" className="text-gray-400 hover:text-white transition-colors duration-200">
                  语言参考
                </Link>
              </li>
              <li>
                <Link href="/docs/cli" className="text-gray-400 hover:text-white transition-colors duration-200">
                  CLI 工具
                </Link>
              </li>
              <li>
                <Link href="/docs/deploy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  部署指南
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">社区</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/examples" className="text-gray-400 hover:text-white transition-colors duration-200">
                  代码示例
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  关于我们
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/cardity/cardity/issues"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  问题反馈
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Cardity. 开源项目，基于 MIT 协议。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              隐私政策
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 