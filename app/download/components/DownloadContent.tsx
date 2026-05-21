'use client'

import { Github, Network, Package, Terminal, Workflow } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function DownloadContent() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">
          {isZh ? '接入 Cardity Core' : 'Use Cardity Core'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-300">
          {isZh
            ? '现在优先使用公开 API 与 MCP endpoint。本地 CLI 和源码构建用于私有环境、CI 和深度集成。'
            : 'Prefer the public API and MCP endpoint. Use local CLI and source builds for private environments, CI, and deeper integration.'}
        </p>
      </div>

      <div className="space-y-8">
        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-bold text-white">
            <Network className="mr-2 h-6 w-6 text-cardity-300" />
            {isZh ? '公开 API' : 'Public API'}
          </h2>
          <p className="mb-4 text-gray-300">
            {isZh
              ? '任何 agent 或后端服务都可以先从 manifest 发现能力，再提交协议源。'
              : 'Any agent or backend can discover capabilities from the manifest and then submit protocol source.'}
          </p>
          <CodeBlock
            language="bash"
            code={`curl https://api.cardity.org/v1/manifest

curl https://api.cardity.org/v1/protocol/compile \\
  -H 'content-type: application/json' \\
  -d '{"source":"protocol Demo { action run(input: string) -> output: string; }"}'`}
          />
        </section>

        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-bold text-white">
            <Workflow className="mr-2 h-6 w-6 text-cardity-300" />
            {isZh ? 'MCP endpoint' : 'MCP Endpoint'}
          </h2>
          <p className="mb-4 text-gray-300">
            {isZh
              ? '支持 MCP 的 agent 可以直接挂载远程 Cardity 工具。'
              : 'MCP-capable agents can mount Cardity as a remote tool provider.'}
          </p>
          <CodeBlock
            language="json"
            code={`{
  "mcpServers": {
    "cardity": {
      "url": "https://api.cardity.org/mcp"
    }
  }
}`}
          />
        </section>

        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-bold text-white">
            <Terminal className="mr-2 h-6 w-6 text-cardity-300" />
            {isZh ? '本地源码构建' : 'Local Source Build'}
          </h2>
          <p className="mb-4 text-gray-300">
            {isZh
              ? '需要离线、CI 或私有 agent runtime 时，可以从源码构建本地工具链。'
              : 'For offline, CI, or private agent runtimes, build the local toolchain from source.'}
          </p>
          <CodeBlock
            language="bash"
            code={`git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core
npm install
npm run build

./build/cardityc --help
node bin/cardity.js --help`}
          />
        </section>

        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-bold text-white">
            <Package className="mr-2 h-6 w-6 text-cardity-300" />
            {isZh ? 'Agent OS 产物' : 'Agent OS Artifacts'}
          </h2>
          <CodeBlock
            language="json"
            showLineNumbers
            code={`{
  "abi": "dist/app.abi.json",
  "protocol_json": "dist/app.protocol.json",
  "agent_os_manifest": "dist/app.agentos.json",
  "target_runtime": "pmtsoul-agent"
}`}
          />
        </section>

        <section className="card text-center">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {isZh ? '开源仓库' : 'Open-source Repository'}
          </h2>
          <p className="mb-6 text-gray-400">
            {isZh ? '查看源码、提交 issue 或继续完善协议层。' : 'View source, file issues, or help evolve the protocol layer.'}
          </p>
          <a
            href="https://github.com/cardity-org/cardity-core"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-glow inline-flex items-center"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </section>
      </div>
    </div>
  )
}
