"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function StandardLibraryPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? '协议标准库' : 'Protocol Standard Library'}
      subtitle={isZh
        ? '标准库提供可复用的协议模块，让 agent 生成系统时不必从零定义身份、权限、任务、审计和页面结构。'
        : 'The standard library provides reusable protocol modules so agents do not redefine identity, permissions, tasks, audit, and page structure from scratch.'}
      sections={[
        {
          title: isZh ? '内置模块' : 'Built-in Modules',
          bullets: isZh
            ? [
                'identity：用户、角色、组织和成员关系。',
                'permission：动作级权限、审批和安全边界。',
                'workflow：任务、队列、状态机和触发器。',
                'audit：事件记录、变更日志和可追踪执行。',
                'ui：页面、表格、表单、详情面板和操作区。'
              ]
            : [
                'identity for users, roles, organizations, and memberships.',
                'permission for action-level permissions, approvals, and safety boundaries.',
                'workflow for tasks, queues, state machines, and triggers.',
                'audit for event logs, change history, and traceable execution.',
                'ui for pages, tables, forms, detail panels, and command areas.'
              ]
        },
        {
          title: isZh ? '复用模块' : 'Importing Modules',
          body: isZh
            ? '协议源可以声明依赖标准模块。编译后，依赖会出现在 protocol JSON 和 Agent OS manifest 中。'
            : 'Protocol source can declare standard module dependencies. After compilation, dependencies appear in protocol JSON and the Agent OS manifest.',
          code: {
            language: 'typescript',
            code: `use identity.User;
use permission.RolePolicy;
use audit.EventLog;

protocol ProjectDesk {
  entity Project {
    id: string;
    owner: User;
    status: "draft" | "active" | "archived";
  }

  action archive(project_id: string) -> status: string
    requires RolePolicy("admin");
}`
          }
        },
        {
          title: isZh ? '给 agent 的收益' : 'Why It Helps Agents',
          bullets: isZh
            ? [
                '减少自然语言解释空间。',
                '把常见系统能力转成稳定可组合的 schema。',
                '让 pmtsoul-agent 能直接映射页面、工具和工作流。',
                '让不同 agent 共享同一套协议语义。'
              ]
            : [
                'Reduces natural-language ambiguity.',
                'Turns common system capabilities into stable composable schemas.',
                'Lets pmtsoul-agent map pages, tools, and workflows directly.',
                'Gives different agents the same protocol semantics.'
              ],
          code: {
            language: 'json',
            code: `{
  "imports": ["identity", "permission", "workflow", "audit", "ui"],
  "agent_mapping": {
    "identity.User": "auth.user",
    "ui.TableView": "generated.table",
    "audit.EventLog": "runtime.audit_log"
  }
}`
          }
        }
      ]}
      links={[
        { label: isZh ? '协议参考' : 'Protocol Reference', href: `/docs/reference?lang=${locale}` },
        { label: isZh ? '开发者指南' : 'Developer Guide', href: `/docs/developer-guide?lang=${locale}` }
      ]}
    />
  )
}
