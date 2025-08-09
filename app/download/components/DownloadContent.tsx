'use client'

import { Terminal, Package, Github, CheckCircle, Layers, Rocket } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function DownloadContent() {
  const { t } = useTranslations()
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{t('download.page.title') || t('download.title')}</h1>
        <p className="text-lg text-gray-300">{t('download.page.subtitle') || t('download.subtitle')}</p>
      </div>

      {/* 开发环境与依赖 */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Terminal className="w-6 h-6 mr-2 text-cardity-300" /> {t('download.env.title')}
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-4">
            <li>{t('download.env.macosTested')}</li>
            <li>{t('download.env.xcode')}</li>
            <li>{t('download.env.brewDeps')}</li>
            <li>{t('download.env.nodeVersion')}</li>
          </ul>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-cardity-300 mb-2">{t('download.env.installTitle')}</h3>
            <CodeBlock
              language="bash"
              code={`# Homebrew 依赖
brew install cmake openssl libarchive curl`}
            />
          </div>
        </div>
      </section>

      {/* 下载与构建 */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Package className="w-6 h-6 mr-2 text-cardity-300" /> {t('download.build.title')}
          </h2>
          <CodeBlock
            language="bash"
            code={`# 获取源码
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

# 安装 Node 依赖并构建 C++ 可执行文件
npm install
npm run build`}
          />
        </div>
      </section>

      {/* 验证 */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-cardity-300" /> {t('download.verify.title')}
          </h2>
          <CodeBlock
            language="bash"
            code={`./build/cardityc --help | head -n 1
node bin/cardity.js --help | head -n 5`}
          />
        </div>
      </section>

      {/* 快速上手（单文件部署） */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Rocket className="w-6 h-6 mr-2 text-cardity-300" /> {t('download.quickstart.title')}
          </h2>
          <CodeBlock
            language="bash"
            code={`# 编译 .car -> .carc
./build/cardityc examples/08_usdt_like.car --format carc -o /tmp/usdt.carc

# 生成部署 hex（仅 hex 上链场景）
node bin/cardity.js ophex /tmp/usdt.carc > /tmp/usdt.carc.hex`}
          />
        </div>
      </section>

      {/* 直接上链（内置铭文计划 + 广播） */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4">{t('download.onchain.title')}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-cardity-300 mb-2">{t('download.onchain.envTitle')}</h3>
              <CodeBlock
                language="ini"
                code={`DOGE_RPC_URL=http://127.0.0.1:22555
DOGE_RPC_USER=rpcuser
DOGE_RPC_PASS=rpcpass`}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-cardity-300 mb-2">{t('download.onchain.planTitle')}</h3>
              <CodeBlock
                language="bash"
                code={`# 生成铭文计划（可包含最小 envelope）
node bin/cardity_inscribe_plan.js /tmp/usdt.carc <revealAddr> \
  --op deploy --protocol USDTLikeToken --version 1.0.0 > /tmp/usdt.plan.json

# 直接上链（读取 .env，通过 RPC fund/sign/send）
node bin/cardity_inscribe.js /tmp/usdt.plan.json`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 可选：完整 commit/reveal（需安装依赖） */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4">{t('download.optional.title')}</h2>
          <CodeBlock
            language="bash"
            code={`npm i @dogeuni-org/coin-dogecoin
# 提供 UTXO 列表（数组项含 txId/vOut/amount/address/privateKey(WIF)）
node bin/cardity_inscribe_full.js /tmp/usdt.plan.json \
  --utxos utxos.json --change <changeAddr> --commit-fee 1.0 --reveal-fee 1.0 --network mainnet`}
          />
        </div>
      </section>

      {/* 多文件打包（包/模块） */}
      <section className="mb-10">
        <div className="card card-gradient">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Layers className="w-6 h-6 mr-2 text-cardity-300" /> {t('download.package.title')}
          </h2>
        <CodeBlock
            language="bash"
            code={`# 已内置示例：examples/usdt_suite/（USDTLikeToken + USDTokenMeta）
node bin/cardity_package.js examples/usdt_suite /tmp/usdt_suite.inscription.json`}
          />
        </div>
      </section>

      {/* GitHub CTA */}
      <section>
        <div className="card text-center">
          <h2 className="text-xl font-semibold text-white mb-4">{t('download.openSource.title')}</h2>
          <p className="text-gray-400 mb-6">{t('download.openSource.description')}</p>
          <a
            href="https://github.com/cardity-org/cardity-core"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-glow inline-flex items-center"
          >
            <Github className="w-4 h-4 mr-2" /> {t('download.openSource.viewOnGithub')}
          </a>
        </div>
      </section>
    </div>
  )
}
