"use client"

import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, ExternalLink, Star, Users, Coins, Vote, Database, Wallet } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'
import { useMemo } from 'react'

export default function ExamplesContent() {
  const { t, locale, isClient, isInitialized } = useTranslations()

  // 简易 Provider 获取
  const getProvider = async () => {
    if (typeof window === 'undefined') return null as any
    const w: any = window as any
    if (w.dogeuni || w.unielon) return w.dogeuni || w.unielon
    await new Promise<void>((resolve) => {
      const t = setInterval(() => {
        const ww: any = window as any
        if (ww.dogeuni || ww.unielon) { clearInterval(t); resolve() }
      }, 50)
    })
    const ww: any = window as any
    return ww.dogeuni || ww.unielon
  }

  // 列表页快速部署（演示用，建议仍跳详情查看完整说明）
  const handleQuickDeploy = async (example: any) => {
    try {
      const wallet: any = await getProvider()
      if (!wallet) { alert('Provider not found'); return }
      // 从 code 中提取 protocol 名；退化为标题去空格
      const m = example?.code?.match(/protocol\s+([A-Za-z0-9_]+)/)
      const moduleName = m?.[1] || String(example?.title || '').replace(/\s+/g, '') || 'Module'
      // 确保先授权账户（避免直接部署被浏览器或钱包拦截）
      try {
        await (wallet.request?.({ method: 'requestAccounts' })
          || wallet.request?.({ method: 'dogeuni_requestAccounts' })
          || wallet.requestAccounts?.()
          || wallet.getAccounts?.())
      } catch (e) {
        console.error('connect rejected', e)
        alert('连接钱包被拒绝或失败')
        return
      }
      // 读取本地生成的 carc_b64（当前示例为 USDT demo）
      const resp = await fetch('/examples/10_wallet_invoke_demo/out/usdt.carc.b64')
      const carc_b64 = await resp.text()
      let res: any = null
      try {
        res = await wallet.request?.({
          method: 'dogeuni_cardity_deploy',
          params: { protocol: moduleName, version: '1.0.0', module: moduleName, carc_b64, feeRate: 150000, forcePrompt: true },
        })
      } catch {}
      if (!res) {
        res = await wallet.cardityDeploy?.({ carc_b64, module: moduleName, version: '1.0.0' })
      }
      if (res?.code === 413) {
        alert(`oversize, need plan. bytes=${res?.bytes} limit=${res?.limit}`)
        return
      }
      alert(`deploy broadcast: ${res?.txid || res}`)
    } catch (e) {
      alert(`deploy failed: ${String((e as any)?.msg || e)}`)
    }
  }

  // 使用 useMemo 确保示例数据在语言切换时重新计算
  const examples = useMemo(() => [
    // 仅展示核心仓库中提供的 USDT-like 示例
    {
      title: 'USDT Like Token',
      slug: 'usdt-like-token',
      description: '本目录仅保留一个示例，演示如何用 Cardity 语言编写 USDT-like 协议并通过钱包以 hex-first 方式部署与调用。协议源码：08_usdt_like.car。',
      category: t('examples.categories.token'),
      difficulty: t('examples.difficulty.intermediate'),
      icon: Coins,
      hasDetail: true,
      code: `protocol USDTLikeToken {
  version: "1.0.0";
  owner: "doge1owner...";

  state {
    name: string = "Tether USD";
    symbol: string = "USDT";
    decimals: int = 6;

    total_supply: int = 0;
    max_supply: int = 1000000000;
    owner_addr: address = "doge1owner...";

    balances_placeholder: string = "";

    paused: bool = false;

    basis_points_rate: int = 0;
    maximum_fee: int = 0;
    _fee: int = 0;
    _send: int = 0;
    max_tx_amount: int = 500000;
    frozen_placeholder: string = "";
    _result: string = "ok";
  }

  method set_fee_policy(bps, cap) { state.basis_points_rate = params.bps; state.maximum_fee = params.cap }
  returns: string "ok";

  method issue(amount) {
    state._result = "ok";
    if (params.amount <= 0) { state._result = "InvalidAmount" }
    if (state.total_supply + params.amount > state.max_supply) { state._result = "ExceedsMaxSupply" }
    if (state._result == "ok") { state.total_supply = state.total_supply + params.amount }
    if (state._result == "ok") { state.balances[state.owner_addr] = state.balances[state.owner_addr] + params.amount }
    if (state._result == "ok") { emit Issue(state.owner_addr, params.amount, state.total_supply) }
  }
  returns: string state._result;

  method balance_of(user) { state.total_supply = state.total_supply }
  returns: int state.balances[params.user];

  method pause() { state.paused = "true" }
  returns: string "paused";

  method unpause() { state.paused = "false" }
  returns: string "unpaused";

  method calc_fee(amount) { state.total_supply = state.total_supply }
  returns: int (params.amount * state.basis_points_rate) / 10000;

  method freeze(user) { state.frozen[params.user] = "true" }
  returns: string "ok";

  method unfreeze(user) { state.frozen[params.user] = "false" }
  returns: string "ok";

  method transfer(to, amount) {
    state._result = "ok";
    if (params.amount <= 0) { state._result = "InvalidAmount" }
    if (state.paused == "true") { state._result = "Paused" }
    if (params.amount > state.max_tx_amount) { state._result = "ExceedsLimit" }
    if (state.frozen[ctx.sender] == "true") { state._result = "SenderFrozen" }
    if (state.frozen[params.to] == "true") { state._result = "RecipientFrozen" }
    if (state.balances[ctx.sender] < params.amount) { state._result = "Insufficient" }

    if (state._result == "ok") { state._fee = params.amount }
    if (state._result == "ok") { state._fee = state._fee * state.basis_points_rate }
    if (state._result == "ok") { state._fee = state._fee / 10000 }
    if (state._result == "ok") { if (state._fee > state.maximum_fee) { state._fee = state.maximum_fee } }
    if (state._result == "ok") { state._send = params.amount - state._fee }
    if (state._result == "ok") { state.balances[ctx.sender] = state.balances[ctx.sender] - params.amount }
    if (state._result == "ok") { state.balances[params.to] = state.balances[params.to] + state._send }
    if (state._result == "ok") { state.balances[state.owner_addr] = state.balances[state.owner_addr] + state._fee }
    if (state._result == "ok") { emit Transfer(ctx.sender, params.to, state._send, state._fee) }
  }
  returns: string state._result;
}`,
    },
  ], [t])

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">{t('examples.hero.title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('examples.hero.subtitle')}
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('examples.hero.description')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('examples.pageTitle')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('examples.pageSubtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {examples.map((example, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {example.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-400">{example.category}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-400">{example.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 line-clamp-3">
                {example.description}
              </p>
              
              <div className="mb-6 max-h-48 overflow-hidden">
                <CodeBlock
                  code={example.code.split('\n').slice(0, 8).join('\n') + (example.code.split('\n').length > 8 ? '\n// ...' : '')}
                  language="cardity"
                  showLineNumbers={true}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {example.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {example.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuickDeploy(example)}
                    className="btn-secondary inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />部署
                  </button>
                  {example.hasDetail ? (
                    <Link
                      href={`/examples/${(example.slug || example.title.toLowerCase().replace(/\s+/g, '-'))}/`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                    >
                      {t('examples.actions.viewDetails')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {t('examples.contribute.title')}
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {t('examples.contribute.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/cardity-org/cardity-core/tree/master/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('examples.actions.submitExample')}
            </a>
            <Link href={`/docs/getting-started?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-secondary inline-flex items-center">
              <Code className="w-4 h-4 mr-2" />
              {t('examples.actions.startCoding')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
