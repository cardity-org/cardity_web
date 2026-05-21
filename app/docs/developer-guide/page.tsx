"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function DeveloperGuidePage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? 'Agent 集成指南' : 'Agent Integration Guide'}
      subtitle={isZh
        ? 'Cardity 的目标是成为 agent 生成系统前的协议层：先固化系统契约，再让 agent 写代码、建页面、接工具。'
        : 'Cardity is the protocol layer before agents generate systems: lock the system contract first, then let agents write code, create pages, and wire tools.'}
      sections={[
        {
          title: isZh ? '与 pmtsoul-agent 对接' : 'Integrating with pmtsoul-agent',
          body: isZh
            ? 'pmtsoul-agent 可以把 Agent OS manifest 当作底层规划输入：生成任务图、工具定义、页面结构、权限模型和验收检查。'
            : 'pmtsoul-agent can use the Agent OS manifest as planning input for task graphs, tool definitions, page structure, permission models, and acceptance checks.',
          code: {
            language: 'json',
            code: `{
  "runtime": "pmtsoul-agent",
  "inputs": {
    "protocol_json": "./dist/app.protocol.json",
    "abi": "./dist/app.abi.json"
  },
  "outputs": ["tasks", "tools", "routes", "views", "tests"]
}`
          }
        },
        {
          title: isZh ? '推荐生成流程' : 'Recommended Generation Flow',
          bullets: isZh
            ? [
                '用户一句话描述系统目标。',
                'LLM 先生成 Cardity 协议源，而不是直接写完整项目。',
                'Cardity Core 编译并返回 ABI、protocol JSON 和 Agent OS manifest。',
                'pmtsoul-agent 基于 manifest 生成项目结构、工具、页面和测试。',
                '最后由工程 agent 执行代码实现和验证。'
              ]
            : [
                'User describes the system goal in one sentence.',
                'The LLM generates Cardity protocol source before writing a full project.',
                'Cardity Core compiles ABI, protocol JSON, and Agent OS manifest.',
                'pmtsoul-agent generates project structure, tools, pages, and tests from the manifest.',
                'Implementation agents then write and verify code.'
              ]
        },
        {
          title: isZh ? '最小对接接口' : 'Minimal Integration Contract',
          body: isZh
            ? '上层 agent 只需要把自然语言意图转换成协议源，并保存编译产物。Cardity 不强制必须是 MCP server 或 CLI。'
            : 'The upper agent only needs to turn intent into protocol source and preserve compiled artifacts. Cardity does not require MCP or CLI specifically.',
          code: {
            language: 'typescript',
            code: `type CardityCompileRequest = {
  source: string;
  target?: "agent-os" | "api" | "sdk";
};

type CardityCompileResult = {
  abi: object;
  protocol_json: object;
  agent_os_manifest: object;
  diagnostics: Array<{ level: string; message: string }>;
};`
          }
        },
        {
          title: isZh ? '失败处理' : 'Failure Handling',
          bullets: isZh
            ? [
                '如果协议源含糊，返回 diagnostics 给 LLM 修复。',
                '如果 ABI 破坏兼容，要求用户确认。',
                '如果 manifest 缺少页面或工具映射，pmtsoul-agent 应暂停生成并请求补全。',
                '线上 API 保持无状态，业务上下文由调用方保存。'
              ]
            : [
                'If protocol source is ambiguous, return diagnostics for the LLM to repair.',
                'If the ABI breaks compatibility, require user approval.',
                'If the manifest lacks page or tool mappings, pmtsoul-agent should pause and request completion.',
                'The public API stays stateless; callers own business context.'
              ]
        }
      ]}
      links={[
        { label: isZh ? '快速开始' : 'Getting Started', href: `/docs/getting-started?lang=${locale}` },
        { label: isZh ? '发布协议层' : 'Publish the Protocol Layer', href: `/docs/deploy?lang=${locale}` }
      ]}
    />
  )
}
