"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function DeployPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? '发布协议层' : 'Publishing the Protocol Layer'}
      subtitle={isZh
        ? 'Cardity 可以作为公开 API、远程 MCP server、本地 CLI wrapper 或嵌入式 SDK 发布。'
        : 'Cardity can be published as a public API, remote MCP server, local CLI wrapper, or embedded SDK.'}
      sections={[
        {
          title: isZh ? '推荐的外部发布形态' : 'Recommended Public Surface',
          bullets: isZh
            ? [
                '公开 HTTPS API：适合所有 agent、后端服务和无状态调用。',
                '远程 MCP endpoint：适合支持 MCP 的 agent 直接发现工具。',
                'CLI wrapper：适合本地、CI、离线或私有网络。',
                'SDK：适合产品内部把协议编译嵌入工作流。'
              ]
            : [
                'Public HTTPS API for all agents, backends, and stateless calls.',
                'Remote MCP endpoint for MCP-capable agents that discover tools.',
                'CLI wrapper for local, CI, offline, or private networks.',
                'SDK for products that embed protocol compilation into workflows.'
              ]
        },
        {
          title: isZh ? '当前线上端点' : 'Current Production Endpoints',
          body: isZh
            ? '官网与 API 均部署在 Cloudflare 上；API 由 Seven 账号下的 Worker 代理到已发布的 Cardity Core API。'
            : 'The website and API are deployed on Cloudflare. The API is proxied by a Worker in the Seven account to the published Cardity Core API.',
          code: {
            language: 'bash',
            code: `curl https://api.cardity.org/edge-health
curl https://api.cardity.org/v1/manifest
curl https://api.cardity.org/mcp`
          }
        },
        {
          title: isZh ? '版本治理' : 'Version Governance',
          bullets: isZh
            ? [
                '协议源版本跟产品版本分离。',
                'ABI 变更需要 diff 和兼容性判断。',
                'Agent OS manifest 需要记录目标 agent runtime、工具权限和页面生成策略。',
                '公开 API 默认只暴露稳定端点，实验能力用 preview namespace。'
              ]
            : [
                'Protocol source versions are separate from product versions.',
                'ABI changes require diffing and compatibility checks.',
                'Agent OS manifests should record target agent runtime, tool permissions, and page generation strategy.',
                'Public APIs expose stable endpoints by default; experimental capabilities use a preview namespace.'
              ],
          code: {
            language: 'json',
            code: `{
  "protocol": "support-desk",
  "version": "1.2.0",
  "compatibility": "backward-compatible",
  "artifacts": {
    "abi": "support-desk.abi.json",
    "agent_os_manifest": "support-desk.agentos.json"
  }
}`
          }
        }
      ]}
      links={[
        { label: isZh ? 'API 参考' : 'API Reference', href: `/docs/reference?lang=${locale}` },
        { label: isZh ? 'CLI 与本地封装' : 'CLI and Local Wrappers', href: `/docs/cli?lang=${locale}` }
      ]}
    />
  )
}
