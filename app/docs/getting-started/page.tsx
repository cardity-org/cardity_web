"use client"

import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, CheckCircle, Database, Terminal, Package } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function GettingStartedPage() {
  const { t } = useTranslations()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          {t('docs.gettingStarted.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {t('docs.gettingStarted.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {/* Installation */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Download className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.gettingStarted.installation.title')}
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-400" />
              {t('docs.gettingStarted.installation.npmInstall.title')}
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
              {t('docs.gettingStarted.installation.npmInstall.description')} <code className="bg-gray-800 px-1 rounded">{t('docs.gettingStarted.installation.npmInstall.successOutput')}</code> {t('docs.gettingStarted.installation.npmInstall.outputText')}
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">{t('docs.gettingStarted.installation.sourceCode.title')}</h3>
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
            {t('docs.gettingStarted.firstContract.title')}
          </h2>
          
          <p className="text-gray-400 mb-6">
            {t('docs.gettingStarted.firstContract.subtitle')}
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">{t('docs.gettingStarted.firstContract.createFile')}</h3>
            <p className="text-gray-400 mb-4">{t('docs.gettingStarted.firstContract.createFileDescription')} <code className="bg-gray-800 px-1 rounded">hello.car</code>:</p>
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
            <h3 className="text-lg font-medium text-white mb-4">{t('docs.gettingStarted.firstContract.compileRun')}</h3>
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
            {t('docs.gettingStarted.cliCommands.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.cliCommands.projectInit.title')}</h3>
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
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.cliCommands.compile.title')}</h3>
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
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.cliCommands.drc20.title')}</h3>
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
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.cliCommands.deployChain.title')}</h3>
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
            {t('docs.gettingStarted.languageFeatures.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.languageFeatures.protocol.title')}</h3>
              <p className="text-gray-400 mb-4">
                {t('docs.gettingStarted.languageFeatures.protocol.description')}
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                {t('docs.gettingStarted.languageFeatures.protocol.feature')}
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.languageFeatures.state.title')}</h3>
              <p className="text-gray-400 mb-4">
                {t('docs.gettingStarted.languageFeatures.state.description')}
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Database className="w-4 h-4 mr-1" />
                {t('docs.gettingStarted.languageFeatures.state.feature')}
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.languageFeatures.events.title')}</h3>
              <p className="text-gray-400 mb-4">
                {t('docs.gettingStarted.languageFeatures.events.description')}
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Zap className="w-4 h-4 mr-1" />
                {t('docs.gettingStarted.languageFeatures.events.feature')}
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">{t('docs.gettingStarted.languageFeatures.drc20.title')}</h3>
              <p className="text-gray-400 mb-4">
                {t('docs.gettingStarted.languageFeatures.drc20.description')}
              </p>
              <div className="flex items-center text-sm text-blue-400">
                <Shield className="w-4 h-4 mr-1" />
                {t('docs.gettingStarted.languageFeatures.drc20.feature')}
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <ArrowRight className="w-6 h-6 mr-3 text-blue-400" />
            {t('docs.gettingStarted.nextSteps.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/cli" className="card hover:bg-gray-800/50 transition-colors">
              <Terminal className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('docs.gettingStarted.nextSteps.cliReference.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('docs.gettingStarted.nextSteps.cliReference.description')}
              </p>
            </Link>
            
            <Link href="/examples" className="card hover:bg-gray-800/50 transition-colors">
              <Code className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('docs.gettingStarted.nextSteps.examples.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('docs.gettingStarted.nextSteps.examples.description')}
              </p>
            </Link>
            
            <Link href="/docs/deploy" className="card hover:bg-gray-800/50 transition-colors">
              <Globe className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('docs.gettingStarted.nextSteps.deploy.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('docs.gettingStarted.nextSteps.deploy.description')}
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
} 