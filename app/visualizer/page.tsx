'use client'

import { useMemo, useState } from 'react'
import {
  AlertCircle,
  Boxes,
  Braces,
  CheckCircle2,
  Copy,
  Database,
  FileJson,
  Network,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { useTranslations } from '../../lib/i18n'

type InputMode = 'manifest' | 'source' | 'requirement'

type ManifestNode = {
  id: string
  label: string
  kind: string
  meta?: Record<string, unknown>
}

type ManifestEdge = {
  from: string
  to: string
  label?: string
}

type Visualization = {
  protocol: Record<string, unknown>
  summary: Record<string, number>
  layers: Record<'business' | 'system' | 'agent', string[]>
  nodes: ManifestNode[]
  edges: ManifestEdge[]
}

const sampleManifest = {
  schema: 'cardity.agent_manifest.v1',
  protocol: {
    name: 'MemberPointsSystem',
    owner: 'agent-os',
    version: '1.0.0',
  },
  methods: [
    {
      name: 'earn_points',
      route: { method: 'POST', path: '/protocols/MemberPointsSystem/methods/earn_points' },
      returns: 'string',
      effects: { writes: ['total_points_issued', 'last_user'], emits: ['PointsEarned'] },
    },
    {
      name: 'get_balance',
      route: { method: 'GET', path: '/protocols/MemberPointsSystem/methods/get_balance' },
      returns: 'int',
      effects: { reads: ['member_point_balances'] },
    },
    {
      name: 'spend_points',
      route: { method: 'POST', path: '/protocols/MemberPointsSystem/methods/spend_points' },
      returns: 'string',
      effects: { writes: ['total_points_spent', 'last_user'], emits: ['PointsSpent'] },
    },
  ],
  events: [
    {
      name: 'PointsEarned',
      params: [{ name: 'user' }, { name: 'amount' }, { name: 'reason' }],
      runtime_fields: [{ name: 'id' }, { name: 'write_index' }, { name: 'source_run_id' }],
    },
    {
      name: 'PointsSpent',
      params: [{ name: 'user' }, { name: 'amount' }, { name: 'reason' }],
      runtime_fields: [{ name: 'id' }, { name: 'write_index' }, { name: 'source_run_id' }],
    },
  ],
  permissions: [
    { action: 'earn_points', requires_confirmation: true, reason: 'Writes points balance' },
    { action: 'spend_points', requires_confirmation: true, reason: 'Writes points balance' },
  ],
  agent: {
    tools: [
      { name: 'member_points_system_earn_points', kind: 'command', method: 'earn_points' },
      { name: 'member_points_system_get_balance', kind: 'query', method: 'get_balance' },
      { name: 'member_points_system_spend_points', kind: 'command', method: 'spend_points' },
    ],
  },
  system: {
    api: {
      routes: [
        { method: 'POST', path: '/protocols/MemberPointsSystem/methods/earn_points' },
        { method: 'GET', path: '/protocols/MemberPointsSystem/methods/get_balance' },
        { method: 'POST', path: '/protocols/MemberPointsSystem/methods/spend_points' },
      ],
    },
    database: {
      tables: [
        { name: 'member_point_balances', columns: [{ name: 'user' }, { name: 'balance' }], primary_key: ['user'] },
        { name: 'member_point_ledger', columns: [{ name: 'user' }, { name: 'delta' }, { name: 'reason' }], primary_key: ['user'] },
      ],
      read_models: [
        { name: 'member_point_balances', columns: [{ name: 'user' }, { name: 'balance' }], primary_key: ['user'] },
      ],
      projections: [
        { name: 'points_earned_to_member_points', version: '1.1', on: { event: 'PointsEarned' } },
        { name: 'points_spent_to_member_points', version: '1.1', on: { event: 'PointsSpent' } },
      ],
    },
    ui: {
      actions: [
        { name: 'member_points_system_earn_points', method: 'earn_points', kind: 'command', risk_level: 'medium', confirm_required: true, dry_run_supported: true, readback_required: true, permission: 'earn_points' },
        { name: 'member_points_system_get_balance', method: 'get_balance', kind: 'query', risk_level: 'low', confirm_required: false, dry_run_supported: false, readback_required: false },
        { name: 'member_points_system_spend_points', method: 'spend_points', kind: 'command', risk_level: 'medium', confirm_required: true, dry_run_supported: true, readback_required: true, permission: 'spend_points' },
      ],
    },
    workflows: [
      { name: 'on_PointsEarned', trigger: { event: 'PointsEarned' } },
      { name: 'on_PointsSpent', trigger: { event: 'PointsSpent' } },
    ],
  },
}

const sampleSource = `protocol MemberPointsSystem {
  version: "1.0.0";
  owner: "agent-os";

  state {
    result: string = "ok";
    total_points_issued: int = 0;
    total_points_spent: int = 0;
    last_actor: address = "";
    last_user: address = "";
    last_amount: int = 0;
    last_delta: int = 0;
    last_reason: string = "";
    last_operation: string = "none";
  }

  table member_point_balances {
    user: address;
    balance: int = 0;
  }

  table member_point_ledger {
    user: address;
    delta: int;
    reason: string;
    actor: address;
    operation: string;
  }

  event PointsEarned {
    user: address;
    amount: int;
    reason: string;
  }

  event PointsSpent {
    user: address;
    amount: int;
    reason: string;
  }

  method earn_points(user: address, amount: int, reason: string) {
    state.result = "ok";
    state.total_points_issued = state.total_points_issued + params.amount;
    state.last_actor = ctx.sender;
    state.last_user = params.user;
    state.last_amount = params.amount;
    state.last_delta = params.amount;
    state.last_reason = params.reason;
    state.last_operation = "earn_points";
    emit PointsEarned(params.user, params.amount, params.reason);
  }
  returns: string state.result;

  method spend_points(user: address, amount: int, reason: string) {
    state.result = "ok";
    state.total_points_spent = state.total_points_spent + params.amount;
    state.last_actor = ctx.sender;
    state.last_user = params.user;
    state.last_amount = params.amount;
    state.last_delta = 0 - params.amount;
    state.last_reason = params.reason;
    state.last_operation = "spend_points";
    emit PointsSpent(params.user, params.amount, params.reason);
  }
  returns: string state.result;

  method get_balance(user: address) {
    state.result = state.result;
  }
  returns: string state.result;
}`

const sampleRequirement = 'Build a member points system. Users can earn points and spend points. Admins can adjust points. Every write action should require confirmation, support dry-run, emit audit events, and update replay-safe read models.'

const copy = {
  en: {
    title: 'Manifest Visualizer',
    subtitle: 'Start from a requirement, .car source, or Agent OS manifest, then inspect the Business, System, and Agent contract layers.',
    manifestMode: 'Manifest JSON',
    sourceMode: '.car source',
    requirementMode: 'Requirement',
    input: 'Manifest JSON',
    sourceInput: '.car source',
    requirementInput: 'Natural language requirement',
    loadSample: 'Load sample',
    reset: 'Reset',
    compileSource: 'Compile source',
    compiling: 'Compiling',
    generatePrompt: 'Generate prompt',
    generatingPrompt: 'Generating',
    copyMermaid: 'Copy Mermaid',
    copyPrompt: 'Copy prompt',
    valid: 'Manifest parsed',
    sourceReady: 'Source ready',
    requirementReady: 'Requirement ready',
    promptReady: 'Agent prompt ready',
    compileSuccess: 'Compiled manifest',
    invalid: 'Invalid JSON',
    compileFailed: 'Compile failed',
    guideFailed: 'Guide failed',
    business: 'Business',
    system: 'System',
    agent: 'Agent',
    edges: 'Contract edges',
    empty: 'Paste manifest JSON, compile .car source, or generate an authoring prompt from a requirement.',
    promptTitle: 'Cardity authoring prompt',
    promptSubtitle: 'Use this with Codex, Claude, Cursor, PMTSoul, or another Agent. It asks the Agent to write compile-ready .car source instead of executing production writes.',
    promptEmpty: 'Enter a requirement and generate a prompt. The next step is to paste the prompt into an Agent, then compile the returned .car source here.',
  },
  zh: {
    title: 'Manifest 图谱',
    subtitle: '从自然语言需求、.car 源码或 Agent OS manifest 开始，然后查看 Business、System、Agent 三层协议契约。',
    manifestMode: 'Manifest JSON',
    sourceMode: '.car 源码',
    requirementMode: '需求',
    input: 'Manifest JSON',
    sourceInput: '.car 源码',
    requirementInput: '自然语言需求',
    loadSample: '加载示例',
    reset: '清空',
    compileSource: '编译源码',
    compiling: '编译中',
    generatePrompt: '生成 Prompt',
    generatingPrompt: '生成中',
    copyMermaid: '复制 Mermaid',
    copyPrompt: '复制 Prompt',
    valid: 'Manifest 已解析',
    sourceReady: '源码待编译',
    requirementReady: '需求待生成',
    promptReady: 'Agent Prompt 已生成',
    compileSuccess: 'Manifest 已生成',
    invalid: 'JSON 无效',
    compileFailed: '编译失败',
    guideFailed: '生成指南失败',
    business: '业务层',
    system: '系统层',
    agent: 'Agent 层',
    edges: '契约边',
    empty: '粘贴 manifest JSON、编译 .car 源码，或先从需求生成协议编写 Prompt。',
    promptTitle: 'Cardity 协议编写 Prompt',
    promptSubtitle: '把它交给 Codex、Claude、Cursor、PMTSoul 或其他 Agent。它会要求 Agent 生成可编译 .car，而不是执行生产写入。',
    promptEmpty: '输入需求并生成 Prompt。下一步是把 Prompt 发给 Agent，再把返回的 .car 源码粘贴到这里编译。',
  },
}

const layerIcons = {
  business: Braces,
  system: Database,
  agent: ShieldCheck,
}

function asArray(value: unknown): any[] {
  return Array.isArray(value) ? value : []
}

function names(items: unknown): string[] {
  return asArray(items).map((item) => item?.name).filter(Boolean)
}

function protocolName(protocol: unknown) {
  if (typeof protocol === 'string') return protocol
  if (protocol && typeof protocol === 'object' && 'name' in protocol) return String((protocol as any).name)
  return 'Cardity Protocol'
}

function nodeId(prefix: string, value: unknown) {
  return `${prefix}_${String(value || 'item').replace(/[^A-Za-z0-9_]/g, '_')}`
}

function graphNode(id: string, label: string, kind: string, meta: Record<string, unknown> = {}): ManifestNode {
  return { id, label, kind, meta }
}

function edge(from: string, to: string, label = ''): ManifestEdge {
  return { from, to, label }
}

function buildVisualization(manifest: any): Visualization {
  const system = manifest.system || {}
  const database = system.database || {}
  const ui = system.ui || {}
  const api = system.api || {}
  const agent = manifest.agent || {}
  const protocol = protocolName(manifest.protocol)

  const nodes: ManifestNode[] = [
    graphNode('business', 'Business Protocol Layer', 'layer'),
    graphNode('system', 'System Generation Layer', 'layer'),
    graphNode('agent', 'Agent Execution Layer', 'layer'),
    graphNode('protocol', `${protocol} Protocol`, 'protocol', manifest.protocol || {}),
  ]
  const edges: ManifestEdge[] = [
    edge('business', 'system', 'compiled into'),
    edge('system', 'agent', 'consumed by'),
    edge('business', 'protocol'),
  ]

  for (const method of asArray(manifest.methods)) {
    const id = nodeId('method', method.name)
    nodes.push(graphNode(id, method.name, 'method', {
      route: method.route || null,
      returns: method.returns || null,
      writes: asArray(method.effects?.writes),
      emits: asArray(method.effects?.emits),
    }))
    edges.push(edge('protocol', id, 'method'))
  }

  for (const eventItem of asArray(manifest.events)) {
    const id = nodeId('event', eventItem.name)
    nodes.push(graphNode(id, eventItem.name, 'event', {
      params: names(eventItem.params),
      runtime_fields: names(eventItem.runtime_fields),
    }))
    edges.push(edge('protocol', id, 'event'))
  }

  for (const table of asArray(database.tables)) {
    const id = nodeId('table', table.name)
    nodes.push(graphNode(id, table.name, 'table', { columns: names(table.columns), primary_key: asArray(table.primary_key) }))
    edges.push(edge('system', id, 'database'))
  }

  for (const readModel of asArray(database.read_models)) {
    const id = nodeId('read_model', readModel.name)
    nodes.push(graphNode(id, readModel.name, 'read_model', { columns: names(readModel.columns), primary_key: asArray(readModel.primary_key) }))
    edges.push(edge('system', id, 'read model'))
  }

  for (const route of asArray(api.routes)) {
    const id = nodeId('route', `${route.method || 'ROUTE'}_${route.path || ''}`)
    nodes.push(graphNode(id, `${route.method || 'ROUTE'} ${route.path || '-'}`, 'api_route'))
    edges.push(edge('system', id, 'api'))
  }

  for (const projection of asArray(database.projections)) {
    const id = nodeId('projection', projection.name)
    nodes.push(graphNode(id, projection.name, 'projection', { version: projection.version || null, source: projection.source || null }))
    edges.push(edge('system', id, 'projection'))
    if (projection.on?.event) edges.push(edge(nodeId('event', projection.on.event), id, 'triggers'))
  }

  for (const workflow of asArray(system.workflows)) {
    const id = nodeId('workflow', workflow.name)
    nodes.push(graphNode(id, workflow.name, 'workflow', workflow.trigger || {}))
    edges.push(edge('system', id, 'workflow'))
    if (workflow.trigger?.event) edges.push(edge(nodeId('event', workflow.trigger.event), id, 'starts'))
  }

  for (const action of asArray(ui.actions)) {
    const id = nodeId('action', action.name)
    nodes.push(graphNode(id, action.name, 'action', {
      kind: action.kind || null,
      risk_level: action.risk_level || null,
      confirm_required: Boolean(action.confirm_required),
      dry_run_supported: Boolean(action.dry_run_supported),
      readback_required: Boolean(action.readback_required),
      permission: action.permission || null,
    }))
    edges.push(edge('agent', id, 'action'))
    if (action.method) edges.push(edge(nodeId('method', action.method), id, 'exposed as'))
  }

  for (const tool of asArray(agent.tools)) {
    const id = nodeId('tool', tool.name)
    nodes.push(graphNode(id, tool.name, 'tool', { kind: tool.kind || null, method: tool.method || null }))
    edges.push(edge('agent', id, 'tool'))
    if (tool.method) edges.push(edge(nodeId('method', tool.method), id, 'registered as'))
  }

  for (const permission of asArray(manifest.permissions)) {
    const id = nodeId('permission', permission.action)
    nodes.push(graphNode(id, permission.action, 'permission', {
      requires_confirmation: Boolean(permission.requires_confirmation),
      reason: permission.reason || '',
    }))
    edges.push(edge('agent', id, 'permission'))
    for (const action of asArray(ui.actions).filter((item) => item.permission === permission.action || item.method === permission.action)) {
      edges.push(edge(nodeId('action', action.name), id, 'requires'))
    }
  }

  return {
    protocol: manifest.protocol || {},
    summary: {
      nodes: nodes.length,
      edges: edges.length,
      methods: asArray(manifest.methods).length,
      events: asArray(manifest.events).length,
      tables: asArray(database.tables).length,
      read_models: asArray(database.read_models).length,
      actions: asArray(ui.actions).length,
      tools: asArray(agent.tools).length,
    },
    layers: {
      business: ['protocol', ...asArray(manifest.methods).map((item) => nodeId('method', item.name)), ...asArray(manifest.events).map((item) => nodeId('event', item.name))],
      system: [
        ...asArray(database.tables).map((item) => nodeId('table', item.name)),
        ...asArray(database.read_models).map((item) => nodeId('read_model', item.name)),
        ...asArray(api.routes).map((item) => nodeId('route', `${item.method || 'ROUTE'}_${item.path || ''}`)),
        ...asArray(database.projections).map((item) => nodeId('projection', item.name)),
        ...asArray(system.workflows).map((item) => nodeId('workflow', item.name)),
      ],
      agent: [
        ...asArray(ui.actions).map((item) => nodeId('action', item.name)),
        ...asArray(agent.tools).map((item) => nodeId('tool', item.name)),
        ...asArray(manifest.permissions).map((item) => nodeId('permission', item.action)),
      ],
    },
    nodes,
    edges,
  }
}

function renderMermaid(visualization: Visualization) {
  return [
    'graph LR',
    `  P["${protocolName(visualization.protocol)}"]`,
    `  P --> B["Business (${visualization.layers.business.length})"]`,
    `  P --> S["System (${visualization.layers.system.length})"]`,
    `  P --> A["Agent (${visualization.layers.agent.length})"]`,
    `  S --> E["Edges (${visualization.edges.length})"]`,
  ].join('\n')
}

async function writeClipboardText(value: string) {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)
  if (copied) return true

  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}

function buildAuthoringPrompt(requirement: string, guide: any) {
  const rules = asArray(guide.protocol_rules)
    .map((item, index) => `${index + 1}. ${String(item)}`)
    .join('\n')

  const tableSyntax = guide.table_syntax ? `\n\nTable syntax reference:\n\`\`\`car\n${guide.table_syntax}\n\`\`\`` : ''

  return `You are a Cardity protocol author.

Task:
Convert the following product requirement into compile-ready Cardity .car source.

Requirement:
${requirement.trim()}

Rules:
${rules}

Output format:
1. Return the full .car source in one fenced \`\`\`car block.
2. Include protocol, version, owner, state, table, event, method, and returns blocks where needed.
3. Keep Cardity generic: do not generate a full app runtime, deployment script, or production write executor.
4. For write-like methods, model permission, confirmation, dry-run/readback intent, audit events, and replay-safe projections through the generated manifest semantics.
5. After the .car block, include the exact compile command:
   cardity compile protocol.car --include-manifest --no-carc
6. If you are connected to the Cardity MCP server, call cardity_compile and repair diagnostics until compilation succeeds.${tableSyntax}`
}

function kindClass(kind: string) {
  if (kind === 'action' || kind === 'tool' || kind === 'permission') return 'border-emerald-500/60'
  if (kind === 'event' || kind === 'workflow') return 'border-amber-500/60'
  if (kind === 'projection') return 'border-rose-500/60'
  return 'border-cardity-500/60'
}

function NodeCard({ node }: { node: ManifestNode }) {
  const metadata = Object.entries(node.meta || {}).filter(([, value]) => (
    value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)
  ))

  return (
    <article className={`rounded-lg border bg-dark-950/70 p-4 ${kindClass(node.kind)}`}>
      <div className="text-[11px] uppercase tracking-[0.16em] text-gray-500">{node.kind.replace(/_/g, ' ')}</div>
      <h3 className="mt-1 text-sm font-semibold text-white break-words">{node.label}</h3>
      {metadata.length > 0 && (
        <div className="mt-3 space-y-2">
          {metadata.slice(0, 3).map(([key, value]) => (
            <div key={key} className="text-xs text-gray-400">
              <span className="text-gray-300">{key.replace(/_/g, ' ')}: </span>
              <span className="break-words">
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

export default function VisualizerPage() {
  const { locale } = useTranslations()
  const text = copy[locale]
  const [mode, setMode] = useState<InputMode>('manifest')
  const [source, setSource] = useState(() => JSON.stringify(sampleManifest, null, 2))
  const [compiledManifest, setCompiledManifest] = useState<any | null>(null)
  const [compileError, setCompileError] = useState('')
  const [isCompiling, setIsCompiling] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [guideError, setGuideError] = useState('')
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const parsed = useMemo(() => {
    if (mode === 'requirement') {
      return { manifest: null, error: guideError }
    }
    if (mode === 'source') {
      return { manifest: compiledManifest, error: compileError }
    }
    if (!source.trim()) return { manifest: null, error: '' }
    try {
      return { manifest: JSON.parse(source), error: '' }
    } catch (error) {
      return { manifest: null, error: error instanceof Error ? error.message : 'Invalid JSON' }
    }
  }, [source, mode, compiledManifest, compileError, guideError])

  const visualization = useMemo(() => (
    parsed.manifest ? buildVisualization(parsed.manifest) : null
  ), [parsed.manifest])

  const nodesById = useMemo(() => new Map((visualization?.nodes || []).map((node) => [node.id, node])), [visualization])
  const mermaid = visualization ? renderMermaid(visualization) : ''

  async function copyMermaid() {
    if (!mermaid) return
    if (await writeClipboardText(mermaid)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }
  }

  async function copyGeneratedPrompt() {
    if (!generatedPrompt) return
    if (await writeClipboardText(generatedPrompt)) {
      setCopiedPrompt(true)
      window.setTimeout(() => setCopiedPrompt(false), 1600)
    }
  }

  function defaultValue(nextMode: InputMode) {
    if (nextMode === 'manifest') return JSON.stringify(sampleManifest, null, 2)
    if (nextMode === 'source') return sampleSource
    return sampleRequirement
  }

  function switchMode(nextMode: InputMode) {
    setMode(nextMode)
    setSource(defaultValue(nextMode))
    setCompiledManifest(null)
    setCompileError('')
    setGeneratedPrompt('')
    setGuideError('')
    setCopied(false)
    setCopiedPrompt(false)
  }

  function loadSample() {
    setSource(defaultValue(mode))
    setCompiledManifest(null)
    setCompileError('')
    setGeneratedPrompt('')
    setGuideError('')
  }

  function resetInput() {
    setSource('')
    setCompiledManifest(null)
    setCompileError('')
    setGeneratedPrompt('')
    setGuideError('')
  }

  function updateSource(value: string) {
    setSource(value)
    if (mode === 'source') {
      setCompiledManifest(null)
      setCompileError('')
    }
    if (mode === 'requirement') {
      setGeneratedPrompt('')
      setGuideError('')
    }
  }

  async function compileSource() {
    if (!source.trim()) {
      setCompileError(text.compileFailed)
      return
    }
    setIsCompiling(true)
    setCompileError('')
    setCompiledManifest(null)
    try {
      const response = await fetch('/api/cardity/compile', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          source_text: source,
          include_manifest: true,
          include_abi: false,
          include_protocol: false,
          carc: false,
        }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok || !payload.manifest) {
        const message = payload?.error?.message || payload?.error || payload?.stderr || text.compileFailed
        throw new Error(String(message))
      }
      setCompiledManifest(payload.manifest)
    } catch (error) {
      setCompileError(error instanceof Error ? error.message : text.compileFailed)
    } finally {
      setIsCompiling(false)
    }
  }

  async function generateAuthoringPrompt() {
    if (!source.trim()) {
      setGuideError(text.guideFailed)
      return
    }
    setIsGeneratingGuide(true)
    setGuideError('')
    setGeneratedPrompt('')
    try {
      const response = await fetch('/api/cardity/generation-guide', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ requirement: source }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        const message = payload?.error?.message || payload?.error || text.guideFailed
        throw new Error(String(message))
      }
      setGeneratedPrompt(buildAuthoringPrompt(source, payload))
    } catch (error) {
      setGuideError(error instanceof Error ? error.message : text.guideFailed)
    } finally {
      setIsGeneratingGuide(false)
    }
  }

  const statusText = parsed.error
    ? (mode === 'source' ? text.compileFailed : mode === 'requirement' ? text.guideFailed : text.invalid)
    : visualization
      ? (mode === 'source' ? text.compileSuccess : text.valid)
      : mode === 'requirement'
        ? (generatedPrompt ? text.promptReady : text.requirementReady)
        : (mode === 'source' ? text.sourceReady : text.valid)

  return (
    <div className="min-h-screen">
      <section className="border-b border-dark-800 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cardity-700/40 bg-cardity-950/40 px-4 py-2 text-sm text-cardity-100 mb-5">
                <Network className="w-4 h-4" />
                Cardity Visualizer
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{text.title}</h1>
              <p className="text-lg text-gray-400 mt-4 leading-8">{text.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex rounded-lg border border-dark-700 bg-dark-900 p-1">
                {(['requirement', 'source', 'manifest'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => switchMode(item)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === item ? 'bg-cardity-600 text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item === 'manifest' ? text.manifestMode : item === 'source' ? text.sourceMode : text.requirementMode}
                  </button>
                ))}
              </div>
              <button className="btn-secondary inline-flex items-center" onClick={loadSample}>
                <FileJson className="w-4 h-4 mr-2" />
                {text.loadSample}
              </button>
              <button className="btn-outline inline-flex items-center" onClick={resetInput}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {text.reset}
              </button>
              {mode === 'source' && (
                <button className="btn-primary inline-flex items-center disabled:opacity-50" onClick={compileSource} disabled={isCompiling || !source.trim()}>
                  <Boxes className="w-4 h-4 mr-2" />
                  {isCompiling ? text.compiling : text.compileSource}
                </button>
              )}
              {mode === 'requirement' && (
                <button className="btn-primary inline-flex items-center disabled:opacity-50" onClick={generateAuthoringPrompt} disabled={isGeneratingGuide || !source.trim()}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGeneratingGuide ? text.generatingPrompt : text.generatePrompt}
                </button>
              )}
              <button className="btn-primary inline-flex items-center disabled:opacity-50" onClick={copyMermaid} disabled={!visualization}>
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied' : text.copyMermaid}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.82fr_1.18fr] gap-6 items-start">
          <div className="rounded-lg border border-dark-800 bg-dark-950/80 overflow-hidden">
            <div className="h-12 px-4 border-b border-dark-800 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-200">{mode === 'source' ? text.sourceInput : mode === 'requirement' ? text.requirementInput : text.input}</div>
              <div className={`inline-flex items-center gap-2 text-xs ${parsed.error ? 'text-rose-300' : 'text-emerald-300'}`}>
                {parsed.error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                {statusText}
              </div>
            </div>
            <textarea
              value={source}
              onChange={(event) => updateSource(event.target.value)}
              spellCheck={false}
              className="h-[680px] w-full resize-none bg-dark-950 p-4 font-mono text-sm leading-6 text-gray-200 outline-none"
            />
            {parsed.error && (
              <div className="border-t border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
                {parsed.error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {mode === 'requirement' ? (
              <section className="rounded-lg border border-dark-800 bg-dark-950/75 overflow-hidden">
                <div className="border-b border-dark-800 px-4 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-cardity-300">Agent authoring</div>
                    <h2 className="text-lg font-semibold text-white">{text.promptTitle}</h2>
                    <p className="text-sm text-gray-400 mt-1 leading-6">{text.promptSubtitle}</p>
                  </div>
                  <button className="btn-secondary inline-flex items-center disabled:opacity-50 shrink-0" onClick={copyGeneratedPrompt} disabled={!generatedPrompt}>
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedPrompt ? 'Copied' : text.copyPrompt}
                  </button>
                </div>
                {generatedPrompt ? (
                  <pre className="max-h-[760px] overflow-auto whitespace-pre-wrap break-words p-4 text-sm leading-6 text-gray-200">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="p-8 text-gray-400">{text.promptEmpty}</div>
                )}
              </section>
            ) : visualization ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(visualization.summary).map(([key, value]) => (
                    <div key={key} className="rounded-lg border border-dark-800 bg-dark-900/65 p-4">
                      <div className="text-xs uppercase tracking-[0.14em] text-gray-500">{key.replace(/_/g, ' ')}</div>
                      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid xl:grid-cols-3 gap-4">
                  {(['business', 'system', 'agent'] as const).map((layer) => {
                    const Icon = layerIcons[layer]
                    return (
                      <section key={layer} className="rounded-lg border border-dark-800 bg-dark-900/60 overflow-hidden">
                        <div className="border-b border-dark-800 px-4 py-4 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-cardity-900/45 border border-cardity-800/50 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-cardity-300" />
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-cardity-300">{layer}</div>
                            <h2 className="text-lg font-semibold text-white">{text[layer]}</h2>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          {visualization.layers[layer].map((id) => {
                            const node = nodesById.get(id)
                            return node ? <NodeCard key={id} node={node} /> : null
                          })}
                        </div>
                      </section>
                    )
                  })}
                </div>

                <section className="rounded-lg border border-dark-800 bg-dark-950/75 overflow-hidden">
                  <div className="border-b border-dark-800 px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-cardity-300" />
                    {text.edges}
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 p-4">
                    {visualization.edges.map((item, index) => (
                      <div key={`${item.from}-${item.to}-${index}`} className="text-xs text-gray-400 break-words">
                        <span className="font-mono text-gray-200">{item.from}</span>
                        <span className="mx-2 text-cardity-300">{item.label || 'links'}</span>
                        <span className="font-mono text-gray-200">{item.to}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <div className="rounded-lg border border-dark-800 bg-dark-900/60 p-8 text-gray-400">{text.empty}</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
