"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Code, Download, Play, ExternalLink, Star, Users, Coins, Vote, Database, Wallet, Zap, Shield, Globe, Search, X } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'
// buildPlan will be constructed by wallet; local generator kept as fallback if needed

interface ExampleDetailClientProps {
  example: any
  examplesData: any[]
}

// 图标映射
const iconMap: Record<string, any> = {
  Database,
  Shield,
  Wallet,
  Coins,
  Vote,
  Zap
}

// 添加类型定义
interface PrecompiledStatus {
  hasCarc: boolean;
  hasPlan: boolean;
  carcSize: number;
  planSize: number;
  isReady: boolean;
  error?: string;
}

interface DeployResult {
  txid: string;
  contractId: string;
  contractRef: string;
  indexed: boolean;
}

interface CardityEnvelope {
  p: 'cardity';
  op: 'deploy' | 'invoke' | 'event';
  protocol?: string;
  version?: string;
  module?: string;
  method?: string;
  args?: any[];
  contract_id?: string;
  contract_ref?: string;
  carc_b64?: string;
}

export default function ExampleDetailClient({ example, examplesData }: ExampleDetailClientProps) {
  const { t, locale } = useTranslations()
  const providerRef = useRef<any>(null)
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [lastResult, setLastResult] = useState<string>("")
  const [txStage, setTxStage] = useState<'sign'|'broadcast'|'confirmed'|'failed'|''>('')
  const [txType, setTxType] = useState<'deploy'|'invoke'|'unknown'|''>('')
  const [txId, setTxId] = useState<string>('')
  const [network, setNetwork] = useState<any>(null)
  const [lastOp, setLastOp] = useState<string>('')
  const [feeRate, setFeeRate] = useState<number>(150000)
  const [balanceDoge, setBalanceDoge] = useState<number | null>(null)
  const [needPlan, setNeedPlan] = useState<any>(null)
  const [planJsonText, setPlanJsonText] = useState<string>('')
  const [commitHex, setCommitHex] = useState<string>('')
  const [revealHexsText, setRevealHexsText] = useState<string>('')
  
  // 新增状态管理
  const [isLoading, setIsLoading] = useState(false)
  const [deployStatus, setDeployStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [deployError, setDeployError] = useState<string>('')
  const [deployResult, setDeployResult] = useState<DeployResult | null>(null)
  
  const SATS_PER_DOGE = 1e8
  
  // 检查预编译产物状态的函数
  const [carcStatus, setCarcStatus] = useState<PrecompiledStatus>({
    hasCarc: false,
    hasPlan: false,
    carcSize: 0,
    planSize: 0,
    isReady: false
  })

  // 检查预编译产物
  const checkPrecompiledAssets = useCallback(async () => {
    try {
      // 检查 CARC 文件
      const carcResp = await fetch('/examples/10_wallet_invoke_demo/out/usdt.carc.b64')
      const hasCarc = carcResp.ok
      const carcSize = hasCarc ? (await carcResp.text()).length : 0
      
      // 检查部署 plan 文件
      const planResp = await fetch('/examples/10_wallet_invoke_demo/out/deploy.carc_only.plan.json')
      const hasPlan = planResp.ok
      const planSize = hasPlan ? (await planResp.text()).length : 0
      
      setCarcStatus({ 
        hasCarc, 
        hasPlan, 
        carcSize, 
        planSize, 
        isReady: hasCarc && hasPlan 
      })
    } catch (error) {
      console.warn('Failed to check precompiled assets:', error)
      setCarcStatus({ 
        hasCarc: false, 
        hasPlan: false, 
        carcSize: 0, 
        planSize: 0, 
        isReady: false,
        error: '检查失败'
      })
    }
  }, [])

  // Effect to run on component mount
  useEffect(() => {
    checkPrecompiledAssets()
  }, [checkPrecompiledAssets])



  const connectedAccount = useMemo(() => connectedAccounts?.[0] || '', [connectedAccounts])

  const getProvider = useCallback(async () => {
    if (typeof window === 'undefined') return null
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
  }, [])

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true)
      const wallet: any = await getProvider()
      if (!wallet) { setLastResult('Provider not found'); return }
      providerRef.current = wallet

      let accounts: string[] = []
      try {
        // 优先使用项目 cardipool_web 中的 requestAccounts
        accounts = (await wallet.requestAccounts?.())
          || (await wallet.request?.({ method: 'requestAccounts' }))
          || (await wallet.request?.({ method: 'dogeuni_requestAccounts' }))
          || (await wallet.request?.({ method: 'connect' }))
          || (await wallet.request?.({ method: 'getAccounts' }))
          || (await wallet.getAccounts?.())
          || []
      } catch (e) {
        setLastResult(`connect failed: ${String(e)}`)
        return
      }
      setConnectedAccounts(accounts || [])
      setLastResult(`connected: ${accounts?.[0] || ''}`)
      // 刚连接后刷新余额
      try { await (wallet.request?.({ method: 'getBalance' }) || wallet.getBalance?.()); refreshBalance() } catch {}

      wallet.on?.('accountsChanged', (accs: string[]) => {
        setConnectedAccounts(accs || [])
      })
    } finally {
      setIsConnecting(false)
    }
  }, [getProvider])

  const disconnectWallet = useCallback(() => {
    setConnectedAccounts([])
    setLastResult('disconnected')
    // 可选：清理引用，避免后续误用
    providerRef.current = null
  }, [])

  // 首次载入尝试读取现有连接并订阅账户变更
  useEffect(() => {
    let mounted = true
    let walletLocal: any = null
    let handler: ((accs: string[]) => void) | null = null
    ;(async () => {
      const wallet: any = await getProvider()
      walletLocal = wallet
      if (!wallet || !mounted) return
      providerRef.current = wallet
      try {
        const accs: string[] = (await wallet.getAccounts?.()) || []
        if (mounted && accs?.length) {
          setConnectedAccounts(accs)
        }
      } catch {}
      handler = (accs: string[]) => { if (mounted) { setConnectedAccounts(accs || []); refreshBalance() } }
      if (typeof wallet.on === 'function') {
        wallet.on('accountsChanged', handler)
        const statusHandler = (evt: any) => {
          if (!mounted) return
          const type = (evt?.type || '') as 'deploy'|'invoke'|'unknown'|''
          const stage = (evt?.stage || '') as 'sign'|'broadcast'|'confirmed'|'failed'|''
          const txid = formatTxId(evt?.txid)
          setTxType(type)
          setTxStage(stage)
          if (txid) setTxId(txid)
          if (stage === 'sign') {
            setLastResult(`${type || 'tx'} 正在签名...`)
          } else if (stage === 'broadcast') {
            setLastResult(`${type || 'tx'} 已广播: ${txid || ''}`)
          } else if (stage === 'confirmed') {
            setLastResult(`${type || 'tx'} 已确认: ${txid || ''}`)
            // 确认后刷新余额
            refreshBalance()
          } else if (stage === 'failed') {
            setLastResult(`${type || 'tx'} 失败: ${evt?.error || ''}`)
          }
        }
        // 标准事件名
        wallet.on('TX_STATUS', statusHandler)
        // 兼容旧事件名（如果有）
        wallet.on('txStatus', statusHandler)
        ;(wallet as any).__statusHandler = statusHandler

        const chainHandler = (net: any) => {
          if (!mounted) return
          setNetwork(net)
        }
        wallet.on('chainChanged', chainHandler)
        wallet.on('networkChanged', chainHandler)
        ;(wallet as any).__chainHandler = chainHandler
      }
      // 初始化获取余额
      refreshBalance()
    })()
    return () => {
      mounted = false
      if (walletLocal && typeof walletLocal.removeListener === 'function' && handler) {
        walletLocal.removeListener('accountsChanged', handler)
        const statusHandler = (walletLocal as any).__statusHandler
        if (statusHandler) {
          walletLocal.removeListener('TX_STATUS', statusHandler)
          walletLocal.removeListener('txStatus', statusHandler)
        }
        const chainHandler = (walletLocal as any).__chainHandler
        if (chainHandler) {
          walletLocal.removeListener('chainChanged', chainHandler)
          walletLocal.removeListener('networkChanged', chainHandler)
        }
      }
    }
  }, [getProvider])

  const stageToPercent = (stage: string) => {
    if (stage === 'sign') return 25
    if (stage === 'broadcast') return 60
    if (stage === 'confirmed') return 100
    if (stage === 'failed') return 100
    return 0
  }

  const satsToDoge = (sats?: number) => {
    if (!sats && sats !== 0) return ''
    return (Number(sats) / SATS_PER_DOGE).toFixed(8)
  }

  const formatTxId = (input: any): string => {
    try {
      if (!input) return ''
      if (typeof input === 'string') return input
      if (Array.isArray(input)) return input.filter(Boolean).join(',')
      if (typeof input === 'object') {
        const anyObj: any = input
        if (anyObj && anyObj.txids) {
          const txids: any = anyObj.txids
          if (typeof txids.commit === 'string') return txids.commit
          if (Array.isArray(txids.reveal) && txids.reveal.length) return txids.reveal.filter(Boolean).join(',')
        }
        if (typeof anyObj.txid === 'string') return anyObj.txid
        if (typeof anyObj.commitTxid === 'string') return anyObj.commitTxid
        if (Array.isArray(anyObj.revealTxids)) return anyObj.revealTxids.filter(Boolean).join(',')
        if (typeof anyObj.commit === 'string') return anyObj.commit
        if (Array.isArray(anyObj.reveal)) return anyObj.reveal.filter(Boolean).join(',')
        const s = JSON.stringify(anyObj)
        return s === '{}' ? '' : s
      }
      return String(input)
    } catch {
      return String(input)
    }
  }

  const formatError = (err: any): string => {
    try {
      const code = (err && (err.code ?? err.status))
      const msg = (err && (err.message || err.msg || err.error)) || String(err)
      const data = (err && err.data) ? ` data=${(typeof err.data === 'string' ? err.data : JSON.stringify(err.data))}` : ''
      return `${code != null ? `code=${code} ` : ''}${msg}${data}`
    } catch {
      return String(err)
    }
  }

  const normalizeTxHex = (v: any): string | null => {
    try {
      if (!v) return null
      // Uint8Array/ArrayBuffer → hex
      const toHex = (bytes: Uint8Array) => Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
      if ((typeof Uint8Array !== 'undefined') && v instanceof Uint8Array) return toHex(v)
      if (typeof ArrayBuffer !== 'undefined' && v instanceof ArrayBuffer) return toHex(new Uint8Array(v))
      if (typeof v === 'string') return v.trim().startsWith('0x') ? v.trim().slice(2) : v.trim()
      if (typeof v === 'object') {
        const cand = v.txHex || v.rawtx || v.rawTx || v.hex || v.txhex || v.tx || null
        if (typeof cand === 'string') return cand.trim().startsWith('0x') ? cand.trim().slice(2) : cand.trim()
        if (cand && (cand instanceof Uint8Array || cand instanceof ArrayBuffer)) {
          const bytes = cand instanceof Uint8Array ? cand : new Uint8Array(cand as ArrayBuffer)
          return toHex(bytes)
        }
      }
      return null
    } catch { return null }
  }

  const normalizePlanShape = (plan: any): { commitTx: string, revealTxs: string[] } | null => {
    try {
      if (!plan) return null
      const commitHex = normalizeTxHex(plan.commitTx)
      const revealList: any[] = Array.isArray(plan.revealTxs) ? plan.revealTxs : []
      const revealHexs = revealList.map(normalizeTxHex).filter((s: any) => typeof s === 'string' && s.length > 0)
      if (typeof commitHex === 'string' && commitHex.length > 0 && revealHexs.length > 0) {
        return { commitTx: commitHex, revealTxs: revealHexs as string[] }
      }
      return null
    } catch { return null }
  }

  const refreshBalance = useCallback(async () => {
    try {
      const wallet: any = providerRef.current || (await getProvider())
      if (!wallet) return
      const bal = await (wallet.request?.({ method: 'getBalance' }) || wallet.getBalance?.())
      if (typeof bal === 'number') {
        // 按要求：页面显示均按 1e8 精度处理（视为 sats → DOGE）
        setBalanceDoge(bal / SATS_PER_DOGE)
      } else if (bal && typeof bal === 'object') {
        const anyBal: any = bal
        // 优先识别 *sats 字段；否则将数值字段视为 sats 再换算
        if (typeof anyBal.sats === 'number') {
          setBalanceDoge(anyBal.sats / SATS_PER_DOGE)
        } else if (typeof anyBal.balance_sats === 'number') {
          setBalanceDoge(anyBal.balance_sats / SATS_PER_DOGE)
        } else if (typeof anyBal.balance === 'number') {
          setBalanceDoge(anyBal.balance / SATS_PER_DOGE)
        } else if (typeof anyBal.total === 'number') {
          setBalanceDoge(anyBal.total / SATS_PER_DOGE)
        }
      }
    } catch {}
  }, [getProvider])

  // 获取部署状态消息的辅助函数
  const getDeployStatusMessage = useCallback((stage: string) => {
    switch (stage) {
      case 'sign':
        return '📋 钱包已弹出部署确认页面\n请在钱包中：\n• 选择 fee rate\n• 查看部署详情\n• 确认部署'
      case 'broadcast':
        return '🚀 部署确认完成，正在广播交易...'
      case 'confirmed':
        return '✅ 部署成功！合约已上链'
      case 'failed':
        return '❌ 部署失败，请查看错误信息'
      default:
        return ''
    }
  }, [])

  // 获取 CARC 数据
  const getCarcData = useCallback(async (): Promise<string | null> => {
    try {
      const response = await fetch('/examples/10_wallet_invoke_demo/out/usdt.carc.b64')
      if (response.ok) {
        return await response.text()
      }
      return null
    } catch (error) {
      console.error('Failed to fetch CARC data:', error)
      return null
    }
  }, [])

  // 获取 ABI 数据
  const getAbiData = useCallback(async (): Promise<string | null> => {
    try {
      const response = await fetch('/examples/10_wallet_invoke_demo/out/usdt.abi.json')
      if (response.ok) {
        const abiJson = await response.json()
        // 使用兼容的 base64 编码方法
        if (typeof window !== 'undefined' && (window as any).btoa) {
          return btoa(JSON.stringify(abiJson))
        } else {
          // Node.js 环境下的 fallback
          return Buffer.from(JSON.stringify(abiJson)).toString('base64')
        }
      }
      return null
    } catch (error) {
      console.error('Failed to fetch ABI data:', error)
      return null
    }
  }, [])

  const extractModuleFromCode = useCallback(() => {
    try {
      const m = example?.code?.match(/protocol\s+([A-Za-z0-9_]+)/)
      return m?.[1] || 'Module'
    } catch { return 'Module' }
  }, [example?.code])

  const handleEncodeInvoke = useCallback(async () => {
    try {
      // 按 README 约定，直接读取预先生成的 hex 文件作为"预编码"展示
      const resp = await fetch('/examples/10_wallet_invoke_demo/out/issue.invoke.hex')
      const hex = await resp.text()
      setLastResult(`invoke hex (preview): ${hex?.slice(0, 64) || ''}...`)
    } catch (e) {
      setLastResult(`encode failed: ${String(e)}`)
    }
  }, [])

  // 新增状态管理：本地预编译产物
  const [localCarcFile, setLocalCarcFile] = useState<File | null>(null)
  const [localAbiFile, setLocalAbiFile] = useState<File | null>(null)
  const [localCarcB64, setLocalCarcB64] = useState<string>('')
  const [localAbiJson, setLocalAbiJson] = useState<any>(null)
  const [localProtocol, setLocalProtocol] = useState<string>('')
  const [localVersion, setLocalVersion] = useState<string>('')
  const [localModule, setLocalModule] = useState<string>('')

  // 新增状态管理：ABI 上传
  const [abiUploadContractId, setAbiUploadContractId] = useState<string>('')
  const [abiUploadVersion, setAbiUploadVersion] = useState<string>('')
  const [abiUploadContent, setAbiUploadContent] = useState<string>('')

  // 新增状态管理
  const [abiSearchQuery, setAbiSearchQuery] = useState<string>('')
  const [abiSearchResults, setAbiSearchResults] = useState<any[]>([])
  const [abiStats, setAbiStats] = useState<{ totalContracts: number; contractsWithAbi: number; coverage: number }>({ totalContracts: 0, contractsWithAbi: 0, coverage: 0 })

  // 新增状态管理：合约发现和推荐
  const [discoveredContracts, setDiscoveredContracts] = useState<any[]>([])
  const [contractRecommendations, setContractRecommendations] = useState<any[]>([])
  const [discoveryLoading, setDiscoveryLoading] = useState(false)
  const [selectedProtocol, setSelectedProtocol] = useState<string>('')
  const [selectedVersion, setSelectedVersion] = useState<string>('')

  // 索引服务配置
  const INDEXER_BASE_URL = 'http://127.0.0.1:8089'

  // 索引服务客户端类
  class IndexServiceClient {
    private baseUrl = `${INDEXER_BASE_URL}/v4/cardity`
    
    // 基础合约查询
    async getContract(contractId: string): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/contract/${contractId}`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return await response.json()
      } catch (error) {
        console.error(`Failed to get contract ${contractId}:`, error)
        throw error
      }
    }
    
    // 通过协议查询合约
    async getContractsByProtocol(protocol: string, version?: string): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/contracts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ protocol, version, limit: 100 })
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return await response.json()
      } catch (error) {
        console.error(`Failed to get contracts for protocol ${protocol}:`, error)
        throw error
      }
      }
    
    // 通过 ABI 信息搜索合约
    async searchContractsByABI(criteria: any): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/abi/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(criteria)
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return await response.json()
      } catch (error) {
        console.error('ABI search failed:', error)
        throw error
      }
    }
    
    // 获取合约 ABI
    async getContractABI(contractId: string): Promise<any | null> {
      try {
        const response = await fetch(`${this.baseUrl}/abi/${contractId}`)
        const result = await response.json()
        
        if (result.code === 200 && result.data?.abi_json) {
          return JSON.parse(result.data.abi_json)
        }
        return null
      } catch (error) {
        console.warn(`ABI not available for contract ${contractId}:`, error)
        return null
      }
    }
    
    // 获取 ABI 统计信息
    async getABIStats(): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/abi/stats`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return await response.json()
      } catch (error) {
        console.error('Failed to get ABI stats:', error)
        throw error
      }
    }
    
    // 上传 ABI
    async uploadABI(data: any): Promise<any> {
      try {
        const response = await fetch(`${this.baseUrl}/abi/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return await response.json()
      } catch (error) {
        console.error('ABI upload failed:', error)
        throw error
      }
    }
  }

  // 创建索引服务客户端实例
  const indexClient = new IndexServiceClient()

  // 文件读取和本地存储功能
  const readCarcB64 = useCallback(async (file: File): Promise<string> => {
    const buf = new Uint8Array(await file.arrayBuffer())
    let bin = ''
    for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i])
    return btoa(bin)
  }, [])

  const readAbiJson = useCallback(async (file: File) => {
    const txt = await file.text()
    return JSON.parse(txt)
  }, [])

  // 保存到本地存储
  const saveToLocalStorage = useCallback(() => {
    if (localCarcB64 && localAbiJson) {
      const data = {
        carc_b64: localCarcB64,
        abi_json: localAbiJson,
        protocol: localProtocol,
        version: localVersion,
        module: localModule,
        timestamp: Date.now()
      }
      localStorage.setItem('cardity_local_artifacts', JSON.stringify(data))
      setLastResult('✅ 编译产物已保存到本地存储')
    }
  }, [localCarcB64, localAbiJson, localProtocol, localVersion, localModule])

  // 从本地存储恢复
  const loadFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem('cardity_local_artifacts')
      if (saved) {
        const data = JSON.parse(saved)
        setLocalCarcB64(data.carc_b64 || '')
        setLocalAbiJson(data.abi_json || null)
        setLocalProtocol(data.protocol || '')
        setLocalVersion(data.version || '')
        setLocalModule(data.module || '')
        setLastResult('✅ 已从本地存储恢复编译产物')
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error)
    }
  }, [])

  // 清除本地数据
  const clearLocalData = useCallback(() => {
    setLocalCarcFile(null)
    setLocalAbiFile(null)
    setLocalCarcB64('')
    setLocalAbiJson(null)
    setLocalProtocol('')
    setLocalVersion('')
    setLocalModule('')
    localStorage.removeItem('cardity_local_artifacts')
    setLastResult('🗑️ 本地编译产物已清除')
  }, [])

  const loadAbiStats = useCallback(async () => {
    try {
      // 使用新的索引服务客户端获取 ABI 统计
      const stats = await indexClient.getABIStats()
      setAbiStats({
        totalContracts: stats.total_contracts || 0,
        contractsWithAbi: stats.contracts_with_abi || 0,
        coverage: stats.coverage || 0
      })
    } catch (error) {
      console.warn('Failed to load ABI stats:', error)
      // 设置默认值
      setAbiStats({
        totalContracts: 0,
        contractsWithAbi: 0,
        coverage: 0
      })
    }
  }, [])

  const handleAbiSearch = useCallback(async () => {
    if (!abiSearchQuery.trim()) {
      setLastResult('请输入要搜索的 ABI 名称')
      return
    }

    try {
      // 使用新的索引服务客户端搜索 ABI
      const results = await indexClient.searchContractsByABI({
        method_name: abiSearchQuery.trim()
      })
      
      if (results.contracts && results.contracts.length > 0) {
        setAbiSearchResults(results.contracts)
        setLastResult(`找到 ${results.contracts.length} 个相关合约`)
      } else {
        setAbiSearchResults([])
        setLastResult('未找到相关结果')
      }
    } catch (error) {
      console.error('ABI search error:', error)
      setAbiSearchResults([])
      setLastResult('搜索失败，请检查网络连接')
    }
  }, [abiSearchQuery])

  const handleAbiUpload = useCallback(async () => {
    if (!abiUploadContractId.trim() || !abiUploadVersion.trim() || !abiUploadContent.trim()) {
      setLastResult('请填写完整的合约 ID、版本和 ABI 内容')
      return
    }

    try {
      // 使用新的索引服务客户端上传 ABI
      const result = await indexClient.uploadABI({
        contract_id: abiUploadContractId.trim(),
        abi_json: abiUploadContent.trim(),
        source_type: 'manual',
        version: abiUploadVersion.trim()
      })

      if (result.success) {
        setLastResult(`✅ ABI 上传成功！合约 ID: ${abiUploadContractId} 版本: ${abiUploadVersion}`)
        setAbiUploadContractId('')
        setAbiUploadVersion('')
        setAbiUploadContent('')
        loadAbiStats() // 刷新 ABI 统计
      } else {
        setLastResult(`❌ ABI 上传失败: ${result.message || '未知错误'}`)
      }
    } catch (error) {
      console.error('ABI upload error:', error)
      setLastResult(`❌ ABI 上传失败: 网络错误，请稍后重试`)
    }
  }, [abiUploadContractId, abiUploadVersion, abiUploadContent, loadAbiStats])

  const loadExampleAbi = useCallback(() => {
    setAbiUploadContractId('')
    setAbiUploadVersion('')
    setAbiUploadContent(JSON.stringify({
      "name": "USDTLikeToken",
      "version": "1.0.0",
      "methods": [
        {
          "name": "transfer",
          "inputs": [
            { "name": "to", "type": "uint256" },
            { "name": "value", "type": "uint256" }
          ],
          "outputs": [
            { "name": "success", "type": "bool" }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "name": "balanceOf",
          "inputs": [
            { "name": "account", "type": "uint256" }
          ],
          "outputs": [
            { "name": "balance", "type": "uint250" }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      "events": [
        {
          "name": "Transfer",
          "inputs": [
            { "name": "from", "type": "uint256" },
            { "name": "to", "type": "uint256" },
            { "name": "value", "type": "uint256" }
          ],
          "type": "event"
        }
      ]
    }, null, 2))
  }, [])

  // 文件上传处理函数
  const handleCarcFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setLocalCarcFile(file)
      const carcB64 = await readCarcB64(file)
      setLocalCarcB64(carcB64)
      
      // 尝试从文件名推断协议和模块名
      const fileName = file.name.replace('.carc', '')
      if (!localProtocol) setLocalProtocol(fileName)
      if (!localModule) setLocalModule(fileName)
      if (!localVersion) setLocalVersion('1.0.0')
      
      setLastResult(`✅ CARC 文件已加载: ${file.name} (${carcB64.length} bytes)`)
    } catch (error) {
      setLastResult(`❌ 读取 CARC 文件失败: ${error}`)
    }
  }, [readCarcB64, localProtocol, localModule, localVersion])

  const handleAbiFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setLocalAbiFile(file)
      const abiJson = await readAbiJson(file)
      setLocalAbiJson(abiJson)
      
      // 从 ABI 中提取协议和模块信息
      if (abiJson.name && !localProtocol) setLocalProtocol(abiJson.name)
      if (abiJson.version && !localVersion) setLocalVersion(abiJson.version)
      if (abiJson.name && !localModule) setLocalModule(abiJson.name)
      
      setLastResult(`✅ ABI 文件已加载: ${file.name} (${abiJson.methods?.length || 0} 个方法)`)
    } catch (error) {
      setLastResult(`❌ 读取 ABI 文件失败: ${error}`)
    }
  }, [readAbiJson, localProtocol, localVersion, localModule])

  // 预编译说明弹窗
  const [showPrecompileInfo, setShowPrecompileInfo] = useState(false)

  // 自动加载本地存储的编译产物
  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  // 点击外部关闭搜索建议
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.search-suggestions-container')) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDeploy = useCallback(async () => {
    if (!connectedAccount) {
      setLastResult('请先连接钱包')
      return
    }

    try {
      setIsLoading(true)
      setDeployStatus('loading')
      setDeployError('')
      setTxStage('sign')
      setTxType('deploy')
      setTxId('')
      setLastResult('�� 正在启动部署流程...\n\n1. 检查编译产物\n2. 生成部署计划\n3. 钱包将弹出确认页面\n4. 在钱包中选择合适的 fee rate\n5. 查看部署详情并确认\n6. 等待部署完成')

      // eslint-disable-next-line no-console
      console.log('=== Starting Cardity Contract Deployment ===')
      
      // 获取钱包 provider
      const wallet: any = providerRef.current || (await getProvider())
      if (!wallet) { 
        setLastResult('Provider not found'); 
        return 
      }
      
      // 优先使用本地编译产物，如果没有则回退到预编译产物
      let carcB64: string
      let protocol: string
      let version: string
      let module: string
      
      if (localCarcB64) {
        // 使用本地编译产物
        carcB64 = localCarcB64
        protocol = localProtocol || 'CustomContract'
        version = localVersion || '1.0.0'
        module = localModule || 'CustomContract'
      } else {
        // 回退到预编译产物检查
        if (!carcStatus.hasCarc) {
          setTxStage('failed')
          setDeployStatus('error')
          setDeployError('没有可用的编译产物，请上传 .carc 文件或确保预编译产物已就绪')
          setLastResult('❌ 没有可用的编译产物\n请上传 .carc 文件或确保预编译产物已就绪')
          return
        }
        
        // 加载预编译的 CARC 数据
        const carcResponse = await fetch('/examples/10_wallet_invoke_demo/out/usdt.carc.b64')
        if (!carcResponse.ok) {
          throw new Error('Failed to load CARC data')
        }
        carcB64 = await carcResponse.text()
        protocol = 'USDTLikeToken'
        version = '1.0.0'
        module = 'USDTLikeToken'
      }
      
      // eslint-disable-next-line no-console
      console.log('Generating deployment plan using cardity-plan.ts...')
      
      // 使用 cardity-plan.ts 生成部署计划
      try {
        const { generatePlanFromEnvelope } = await import('../../../lib/cardity-plan')
        
        // 构建部署 envelope
        const deployEnvelope = {
          p: 'cardity' as const,
          op: 'deploy' as const,
          protocol,
          version,
          module,
          carc_b64: carcB64
        }
        
        // eslint-disable-next-line no-console
        console.log('Deploy envelope:', deployEnvelope)
        
        // 生成部署计划
        const planResult = await generatePlanFromEnvelope(deployEnvelope, connectedAccount, {
          commitFeeRate: 1,
          revealFeeRate: 1
        })
        
        // eslint-disable-next-line no-console
        console.log('Generated plan:', planResult)
        
        // 调用部署接口，传递生成的 plan
        const result = await wallet.request?.({
          method: 'dogeuni_cardity_deploy',
          params: { plan: planResult.plan }
        })
        
        // eslint-disable-next-line no-console
        console.log('Deployment result:', result)
        
        if (result?.success) {
          // 部署成功，显示完整结果
          // eslint-disable-next-line no-console
          console.log('✅ Deployment successful!')
          
          // 设置成功状态
          setTxStage('broadcast')
          setDeployStatus('success')
          setTxId(result.commitTxid || result.txid || 'unknown')
          setLastResult(`✅ 部署成功！使用${localCarcB64 ? '本地编译产物' : '预编译产物'}`)
          
          // 保存部署结果
          setDeployResult({
            txid: result.commitTxid || result.txid || 'unknown',
            contractId: result.commitTxid || result.txid || 'unknown',
            contractRef: `${protocol}@${version}`,
            indexed: false
          })
          
          // 自动填充 ABI 上传表单
          setAbiUploadContractId(result.commitTxid || result.txid || 'unknown')
          setAbiUploadVersion(version)
          
          // 显示详细信息
          const details: string[] = [
            `大小: ${result.size || 'N/A'} bytes`,
            `费用: ${result.estimatedFee || 'N/A'} satoshi`
          ]
          
          if (result.commitTxid) {
            details.push(`Commit TX: ${result.commitTxid}`)
          }
          
          if (result.revealTxids && result.revealTxids.length > 0) {
            details.push(`Reveal TXs: ${result.revealTxids.join(', ')}`)
          }
          
          if (result.metadata) {
            if (result.metadata.contractRef) {
              details.push(`合约引用: ${result.metadata.contractRef}`)
            }
            if (result.metadata.abiHash) {
              details.push(`ABI Hash: ${result.metadata.abiHash}`)
            }
          }
          
          // 添加部署成功的庆祝信息
          const successMessage = `🎉 恭喜！Cardity 智能合约部署成功！

部署详情：
${details.join('\n')}

下一步：
• 在索引器中查看合约状态
• 测试合约调用功能
• 监控交易确认状态`

          setLastResult(successMessage)
          
        } else if (result?.code === 200 && result?.approvalRequired) {
          // 钱包显示 approval 页面，等待用户确认
          // eslint-disable-next-line no-console
          console.log('钱包显示 approval 页面，等待用户确认...')
          setTxStage('sign')
          setLastResult(getDeployStatusMessage('sign'))
          
        } else {
          // 处理错误或其他情况
          const errorMsg = result?.message || 'Deployment failed'
          setTxStage('failed')
          setDeployStatus('error')
          setDeployError(errorMsg)
          setLastResult(`❌ 部署失败: ${errorMsg}`)
          // eslint-disable-next-line no-console
          console.error('❌ Deployment failed:', result)
        }
        
      } catch (planError: any) {
        // eslint-disable-next-line no-console
        console.error('Failed to generate plan:', planError)
        setTxStage('failed')
        setDeployStatus('error')
        setDeployError(`生成部署计划失败: ${planError.message}`)
        setLastResult(`❌ 生成部署计划失败: ${planError.message}`)
        return
      }
      
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('❌ Deployment error:', error)
      setTxStage('failed')
      setDeployStatus('error')
      
      // 更友好的错误信息
      let userFriendlyError = '部署失败'
      if (error?.message?.includes('insufficient balance')) {
        userFriendlyError = '余额不足，请确保账户有足够的 DOGE 支付部署费用'
      } else if (error?.message?.includes('network')) {
        userFriendlyError = '网络连接问题，请检查网络状态后重试'
      } else if (error?.message?.includes('Failed to load CARC data')) {
        userFriendlyError = '加载 CARC 数据失败，请确保预编译产物已就绪'
      } else {
        userFriendlyError = `部署失败: ${error?.message || error?.code || '未知错误'}`
      }
      
      setDeployError(userFriendlyError)
      setLastResult(`❌ ${userFriendlyError}`)
      
    } finally {
      setIsLoading(false)
    }
  }, [connectedAccount, getProvider, localCarcB64, localProtocol, localVersion, localModule, carcStatus.hasCarc, getDeployStatusMessage])

  const handleInvoke = useCallback(async () => {
    if (!connectedAccount) {
      setLastResult('请先连接钱包')
      return
    }

    // 检查是否有已部署的合约
    if (!deployResult?.txid) {
      setLastResult('❌ 请先部署合约，然后才能进行调用测试')
      return
    }

    setTxStage('sign')
    setTxType('invoke')
    setTxId('')
    setLastResult('🚀 正在启动调用流程...\n\n1. 生成调用 envelope\n2. 构建 inscription plan\n3. 钱包将弹出确认页面\n4. 在钱包中确认调用\n5. 等待调用完成')

    try {
      // eslint-disable-next-line no-console
      console.log('=== Starting Cardity Contract Invoke ===')
      
      // 获取钱包 provider
      const wallet: any = providerRef.current || (await getProvider())
      if (!wallet) { 
        setLastResult('Provider not found'); 
        return 
      }
      
      // 生成调用 envelope，使用已部署的合约地址
      const invokeEnvelope = {
        p: 'cardity' as const,
        op: 'invoke' as const,
        contract_id: deployResult.txid, // 使用已部署的合约地址
        contract_ref: deployResult.contractRef,
        method: 'USDTLikeToken.transfer',
        args: ['DSoWSnCbDA1vvhPAVn3RKKby1hwTd7oMr9', 1000] // 示例参数：转账到指定地址
      }

      // eslint-disable-next-line no-console
      console.log('Generated invoke envelope:', invokeEnvelope)

      // 使用 cardity-plan.ts 生成 plan
      try {
        const { generatePlanFromEnvelope } = await import('../../../lib/cardity-plan')
        const plan = await generatePlanFromEnvelope(invokeEnvelope, connectedAccount, {
          commitFeeRate: 1,
          revealFeeRate: 1
        })

        // eslint-disable-next-line no-console
        console.log('Generated invoke plan:', plan)

        // 调用钱包接口
        const result = await wallet.request?.({
          method: 'dogeuni_cardity_invoke',
          params: { plan }
        })

        // eslint-disable-next-line no-console
        console.log('Invoke result:', result)

        if (result?.success) {
          // 调用成功
          setTxStage('broadcast')
          setTxId(result.txid || 'unknown')
          setLastResult(`✅ 调用成功！\n交易ID: ${result.txid}\n\n可以在索引器中查看调用记录：\n${INDEXER_BASE_URL}/v4/cardity/invocations/${deployResult.txid}?method_fqn=USDTLikeToken.transfer&limit=10`)
        } else if (result?.code === 200 && result?.approvalRequired) {
          // 钱包显示 approval 页面
          setTxStage('sign')
          setLastResult('📋 钱包已弹出调用确认页面\n请在钱包中确认调用')
        } else {
          // 处理错误
          const errorMsg = result?.message || 'Invoke failed'
          setTxStage('failed')
          setLastResult(`❌ 调用失败: ${errorMsg}`)
        }

      } catch (planError: any) {
        // eslint-disable-next-line no-console
        console.error('Failed to generate plan:', planError)
        setTxStage('failed')
        setLastResult(`❌ 生成调用计划失败: ${planError.message}`)
      }

    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('❌ Invoke error:', error)
      setTxStage('failed')

      if (error.code === -32603) {
        setLastResult(`❌ 内部错误: ${error.message}`)
      } else if (error.code === 4001) {
        setLastResult('❌ 用户取消操作')
      } else if (error.code === 413) {
        setLastResult(`❌ 负载过大: ${error.message}`)
      } else {
        setLastResult(`❌ 调用失败: ${error.message || error.code || '未知错误'}`)
      }
    }
  }, [connectedAccount, getProvider, deployResult])

  // 估算逻辑已交由钱包弹窗承担，这里移除本地估算函数

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return Database
      case 'wallet': return Wallet
      case 'token': return Coins
      case 'governance': return Vote
      case 'advanced': return Zap
      default: return Code
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'wallet': return 'bg-purple-100 text-purple-800'
      case 'token': return 'bg-green-100 text-green-800'
      case 'governance': return 'bg-orange-100 text-orange-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // 合约发现和推荐功能
  const discoverContractsByProtocol = useCallback(async () => {
    if (!selectedProtocol.trim()) {
      setLastResult('请选择要探索的协议')
      return
    }

    try {
      setDiscoveryLoading(true)
      const result = await indexClient.getContractsByProtocol(selectedProtocol, selectedVersion || undefined)
      
      if (result.contracts && result.contracts.length > 0) {
        setDiscoveredContracts(result.contracts)
        setLastResult(`发现 ${result.contracts.length} 个 ${selectedProtocol} 协议的合约`)
      } else {
        setDiscoveredContracts([])
        setLastResult(`未找到 ${selectedProtocol} 协议的合约`)
      }
    } catch (error) {
      console.error('Contract discovery failed:', error)
      setDiscoveredContracts([])
      setLastResult('合约发现失败，请稍后重试')
    } finally {
      setDiscoveryLoading(false)
    }
  }, [selectedProtocol, selectedVersion])

  const getContractRecommendations = useCallback(async () => {
    try {
      // 基于当前示例和用户兴趣推荐合约
      const interests = ['transfer', 'balanceOf', 'mint', 'burn']
      const recommendations = []
      
      for (const interest of interests) {
        try {
          const result = await indexClient.searchContractsByABI({ 
            method_name: interest, 
            limit: 3 
          })
          if (result.contracts) {
            recommendations.push(...result.contracts)
          }
        } catch (error) {
          console.warn(`Failed to get recommendations for ${interest}:`, error)
        }
      }
      
      // 去重和排序
      const uniqueRecommendations = recommendations.filter((contract, index, self) => 
        index === self.findIndex(c => c.contract_id === contract.contract_id)
      )
      
      setContractRecommendations(uniqueRecommendations.slice(0, 10))
      setLastResult(`为您推荐了 ${uniqueRecommendations.length} 个相关合约`)
    } catch (error) {
      console.error('Failed to get recommendations:', error)
      setLastResult('获取推荐合约失败')
    }
  }, [])

  // 智能搜索建议功能
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const getSearchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      // 从本地 ABI 缓存中搜索建议
      const localSuggestions: string[] = []
      if (localAbiJson?.methods) {
        localSuggestions.push(...localAbiJson.methods
          .filter((method: any) => method.name.toLowerCase().includes(query.toLowerCase()))
          .map((method: any) => method.name)
        )
      }

      // 从索引服务搜索热门方法
      const indexSuggestions: string[] = []
      try {
        const result = await indexClient.searchContractsByABI({ 
          method_name: query, 
          limit: 5 
        })
        if (result.contracts) {
          result.contracts.forEach((contract: any) => {
            if (contract.methods) {
              indexSuggestions.push(...contract.methods
                .filter((method: string) => method.toLowerCase().includes(query.toLowerCase()))
              )
            }
          })
        }
      } catch (error) {
        console.warn('Failed to get index suggestions:', error)
      }

      // 合并建议并去重
      const allSuggestions = Array.from(new Set([...localSuggestions, ...indexSuggestions]))
      setSearchSuggestions(allSuggestions.slice(0, 8))
      setShowSuggestions(allSuggestions.length > 0)
    } catch (error) {
      console.error('Failed to get search suggestions:', error)
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [localAbiJson])

  const handleSearchInputChange = useCallback((value: string) => {
    setAbiSearchQuery(value)
    getSearchSuggestions(value)
  }, [getSearchSuggestions])

  const selectSuggestion = useCallback((suggestion: string) => {
    setAbiSearchQuery(suggestion)
    setShowSuggestions(false)
    setSearchSuggestions([])
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/examples?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  {React.createElement(iconMap[example.icon] || Code, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{example.title}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(example.category)}`}>
                      {t(`examples.categories.${example.category}`)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                      {t(`examples.difficulty.${example.difficulty}`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {connectedAccount ? (
                <button onClick={disconnectWallet} className="btn-primary inline-flex items-center">
                  <span className="flex items-center"><Play className="w-4 h-4 mr-2" />断开连接</span>
                </button>
              ) : (
                <button id="connect" onClick={connectWallet} className="btn-primary inline-flex items-center">
                  {isConnecting ? (
                    <span className="flex items-center"><Play className="w-4 h-4 mr-2 animate-spin" />连接中...</span>
                  ) : (
                    <span className="flex items-center"><Play className="w-4 h-4 mr-2" />连接钱包</span>
                  )}
                </button>
              )}
              {connectedAccount ? (
                <span className="text-sm text-gray-300 truncate max-w-[240px]" title={connectedAccount}>
                  当前地址：{connectedAccount}
                </span>
              ) : (
                <span className="text-sm text-gray-500">当前地址：未连接</span>
              )}
              <button className="btn-secondary inline-flex items-center" onClick={handleEncodeInvoke}>
                <Code className="w-4 h-4 mr-2" />预编码
              </button>
              <button className="btn-secondary inline-flex items-center" onClick={handleDeploy}>
                <Download className="w-4 h-4 mr-2" />
                {isLoading ? '部署中...' : '部署'}
              </button>
              <button className="btn-secondary inline-flex items-center" onClick={handleInvoke}>
                <Play className="w-4 h-4 mr-2" />调用
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">描述</h2>
              <p className="text-gray-400 leading-relaxed">
                {example.description}
              </p>
            </div>

            {/* Code */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">完整代码</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    复制代码
                  </button>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    下载文件
                  </button>
                </div>
              </div>
              <CodeBlock
                code={example.code}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Precompiled Assets Status */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                预编译产物状态
              </h3>
              
              <div className="grid grid-cols-1 gap-3 mb-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <h4 className="font-medium text-gray-300 mb-2 text-sm">CARC 文件</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">状态:</span>
                      <span className={carcStatus.hasCarc ? 'text-green-400' : 'text-red-400'}>
                        {carcStatus.hasCarc ? '✅ 已存在' : '❌ 未找到'}
                      </span>
                    </div>
                    {carcStatus.hasCarc && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">大小:</span>
                        <span className="text-gray-300">{carcStatus.carcSize} bytes</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <h4 className="font-medium text-gray-300 mb-2 text-sm">部署计划</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">状态:</span>
                      <span className={carcStatus.hasPlan ? 'text-green-400' : 'text-red-400'}>
                        {carcStatus.hasPlan ? '✅ 已存在' : '❌ 未找到'}
                      </span>
                    </div>
                    {carcStatus.hasPlan && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">大小:</span>
                        <span className="text-gray-300">{carcStatus.planSize} bytes</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {carcStatus.hasCarc && carcStatus.hasPlan ? (
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-xs">
                    🎯 预编译产物已就绪！将以 application/cardity-carc 文件上链（carc-only 或带 envelope 的计划）
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-xs">
                    ⚠️ 预编译产物未就绪，请确保已编译示例项目
                  </p>
                </div>
              )}
            </div>

            {/* 部署步骤指导 */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                部署步骤指导
              </h3>
              <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <ol className="text-sm text-blue-300 space-y-1">
                  <li>1. 确认预编译产物已就绪</li>
                  <li>2. 点击部署按钮</li>
                  <li>3. 在钱包中确认部署信息</li>
                  <li>4. 等待交易确认</li>
                  <li>5. 在索引器中查看合约状态</li>
                  <li>6. 上传 ABI 供其他开发者使用</li>
                </ol>
                <div className="mt-2 text-xs text-blue-400">
                  📍 索引服务地址: <code className="bg-blue-900/30 px-1 rounded">{INDEXER_BASE_URL}</code>
                </div>
              </div>
            </div>

            {/* ABI 查询和搜索功能 */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                ABI 查询与搜索
              </h3>
              
              {/* 索引服务配置信息 */}
              <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg mb-3">
                <h4 className="font-medium text-blue-300 mb-2 text-sm">⚙️ 索引服务配置</h4>
                <div className="text-xs text-blue-400 space-y-1">
                  <div className="flex justify-between">
                    <span>服务地址:</span>
                    <code className="bg-blue-900/30 px-2 py-1 rounded text-blue-300">
                      {INDEXER_BASE_URL}
                    </code>
                  </div>
                  <div className="text-xs text-blue-300">
                    💡 所有 ABI 查询和上传都通过此索引服务进行
                  </div>
                  <div className="text-xs text-blue-400 mt-1">
                    🔧 如需修改地址，请编辑代码中的 <code className="bg-blue-900/30 px-1 rounded">INDEXER_BASE_URL</code> 常量
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* ABI 上传功能 */}
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <h4 className="font-medium text-green-300 mb-2 text-sm">📤 ABI 上传</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="合约 ID"
                      value={abiUploadContractId}
                      onChange={(e) => setAbiUploadContractId(e.target.value)}
                      className="px-3 py-2 bg-green-900/30 border border-green-500/50 rounded text-green-300 placeholder-green-500/50 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="版本 (如: 1.0.0)"
                      value={abiUploadVersion}
                      onChange={(e) => setAbiUploadVersion(e.target.value)}
                      className="px-3 py-2 bg-green-900/30 border border-green-500/50 rounded text-green-300 placeholder-green-500/50 text-sm"
                    />
                    <button
                      onClick={loadExampleAbi}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
                    >
                      加载示例 ABI
                    </button>
                  </div>
                  <textarea
                    placeholder="粘贴 ABI JSON 内容..."
                    value={abiUploadContent}
                    onChange={(e) => setAbiUploadContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 bg-green-900/30 border border-green-500/50 rounded text-green-300 placeholder-green-500/50 text-sm font-mono"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleAbiUpload}
                      disabled={!abiUploadContractId.trim() || !abiUploadVersion.trim() || !abiUploadContent.trim()}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800/50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
                    >
                      上传 ABI
                    </button>
                  </div>
                </div>

                {/* ABI 搜索功能 */}
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="font-medium text-blue-300 mb-2 text-sm">🔍 ABI 搜索</h4>
                  <div className="relative">
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 relative search-suggestions-container">
                        <input
                          type="text"
                          placeholder="搜索方法名 (如: transfer)"
                          value={abiSearchQuery}
                          onChange={(e) => handleSearchInputChange(e.target.value)}
                          onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                          className="w-full px-3 py-2 bg-blue-900/30 border border-blue-500/50 rounded text-blue-300 placeholder-blue-500/50 text-sm"
                        />
                        
                        {/* 智能搜索建议 */}
                        {showSuggestions && searchSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-blue-900 border border-blue-500 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                            {searchSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => selectSuggestion(suggestion)}
                                className="w-full px-3 py-2 text-left text-blue-300 hover:bg-blue-800/50 text-sm border-b border-blue-700/50 last:border-b-0"
                              >
                                💡 {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleAbiSearch}
                        disabled={!abiSearchQuery.trim()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
                      >
                        搜索
                      </button>
                    </div>
                  </div>
                  
                  {/* 搜索结果 */}
                  {abiSearchResults.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-blue-300">搜索结果:</h5>
                      {abiSearchResults.map((result, index) => (
                        <div key={index} className="p-2 bg-blue-900/30 rounded text-xs text-blue-300">
                          <div className="flex justify-between items-center">
                            <span>合约: {result.contract_id}</span>
                            <a
                              href={`${INDEXER_BASE_URL}/v4/cardity/contract/${result.contract_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 underline"
                            >
                              查看详情 →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ABI 统计信息 */}
                <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <h4 className="font-medium text-purple-300 mb-2 text-sm">📊 ABI 统计</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-300">{abiStats.totalContracts}</div>
                      <div className="text-xs text-purple-400">总合约数</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-300">{abiStats.contractsWithAbi}</div>
                      <div className="text-xs text-purple-400">有 ABI 的合约</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-300">{abiStats.coverage}%</div>
                      <div className="text-xs text-purple-400">ABI 覆盖率</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 合约发现和推荐功能 */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                合约发现与推荐
              </h3>
              
              <div className="space-y-3">
                {/* 协议探索 */}
                <div className="p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                  <h4 className="font-medium text-indigo-300 mb-2 text-sm">🔍 协议探索</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="协议名 (如: USDTLikeToken)"
                      value={selectedProtocol}
                      onChange={(e) => setSelectedProtocol(e.target.value)}
                      className="px-3 py-2 bg-indigo-900/30 border border-indigo-500/50 rounded text-indigo-300 placeholder-indigo-500/50 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="版本 (可选)"
                      value={selectedVersion}
                      onChange={(e) => setSelectedVersion(e.target.value)}
                      className="px-3 py-2 bg-indigo-900/30 border border-indigo-500/50 rounded text-indigo-300 placeholder-indigo-500/50 text-sm"
                    />
                    <button
                      onClick={discoverContractsByProtocol}
                      disabled={!selectedProtocol.trim() || discoveryLoading}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800/50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
                    >
                      {discoveryLoading ? '探索中...' : '探索协议'}
                    </button>
                  </div>
                  
                  {/* 发现的合约 */}
                  {discoveredContracts.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-indigo-300">发现的合约:</h5>
                      {discoveredContracts.map((contract, index) => (
                        <div key={index} className="p-2 bg-indigo-900/30 rounded text-xs text-indigo-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <div>合约: {contract.contract_id}</div>
                              <div className="text-indigo-400">协议: {contract.protocol}@{contract.version}</div>
                            </div>
                            <a
                              href={`${INDEXER_BASE_URL}/v4/cardity/contract/${contract.contract_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300 underline"
                            >
                              查看详情 →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 智能推荐 */}
                <div className="p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                  <h4 className="font-medium text-amber-300 mb-2 text-sm">🤖 智能推荐</h4>
                  <p className="text-xs text-amber-400 mb-3">
                    基于当前示例和常见功能为您推荐相关合约
                  </p>
                  <button
                    onClick={getContractRecommendations}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm transition-colors"
                  >
                    获取推荐
                  </button>
                  
                  {/* 推荐合约 */}
                  {contractRecommendations.length > 0 && (
                    <div className="space-y-2 mt-3">
                      <h5 className="text-sm font-medium text-amber-300">推荐合约:</h5>
                      {contractRecommendations.map((contract, index) => (
                        <div key={index} className="p-2 bg-amber-900/30 rounded text-xs text-amber-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <div>合约: {contract.contract_id}</div>
                              <div className="text-amber-400">协议: {contract.protocol}@{contract.version}</div>
                            </div>
                            <a
                              href={`${INDEXER_BASE_URL}/v4/cardity/contract/${contract.contract_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:text-amber-300 underline"
                            >
                              查看详情 →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wallet status */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">钱包状态</h3>
              <p className="text-gray-400 text-sm mb-3">{connectedAccount ? '已连接' : '未连接'}</p>
              <div className="text-xs text-gray-400 mb-2">
                <div>余额：{balanceDoge != null ? `${balanceDoge.toFixed(8)} DOGE` : '未知'}</div>
              </div>
              {/* Reveal 地址默认使用当前连接地址，无需手动填写 */}
              {network ? (
                <p className="text-gray-400 text-xs mb-2">网络：{String((network && (network.name || network.chainId)) || network)}</p>
              ) : null}
              {lastResult ? (
                <div className="rounded bg-gray-800 text-gray-200 text-xs p-3 break-words">{lastResult}</div>
              ) : null}
              
              {/* 编译产物卡片 */}
              <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-3 text-sm">🔧 编译产物管理</h4>
                
                {/* 文件上传区域 */}
                <div className="space-y-3 mb-3">
                  {/* CARC 文件上传 */}
                  <div>
                    <label className="block text-xs text-purple-400 mb-1">上传 .carc 文件 (必传)</label>
                    <input
                      type="file"
                      accept=".carc"
                      onChange={handleCarcFileUpload}
                      className="block w-full text-xs text-purple-300 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {localCarcFile && (
                      <div className="text-xs text-purple-300 mt-1">
                        ✅ 已加载: {localCarcFile.name} ({localCarcB64.length} bytes)
                      </div>
                    )}
                  </div>
                  
                  {/* ABI 文件上传 */}
                  <div>
                    <label className="block text-xs text-purple-400 mb-1">上传 .abi.json 文件 (推荐)</label>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleAbiFileUpload}
                      className="block w-full text-xs text-purple-300 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                    {localAbiFile && (
                      <div className="text-xs text-purple-300 mt-1">
                        ✅ 已加载: {localAbiFile.name} ({localAbiJson?.methods?.length || 0} 个方法)
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 协议信息配置 */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <label className="block text-xs text-purple-400 mb-1">协议名</label>
                    <input
                      type="text"
                      value={localProtocol}
                      onChange={(e) => setLocalProtocol(e.target.value)}
                      placeholder="如: USDTLikeToken"
                      className="w-full px-2 py-1 text-xs bg-purple-900/30 border border-purple-500/50 rounded text-purple-300 placeholder-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-400 mb-1">版本</label>
                    <input
                      type="text"
                      value={localVersion}
                      onChange={(e) => setLocalVersion(e.target.value)}
                      placeholder="如: 1.0.0"
                      className="w-full px-2 py-1 text-xs bg-purple-900/30 border border-purple-500/50 rounded text-purple-300 placeholder-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-purple-400 mb-1">模块名</label>
                    <input
                      type="text"
                      value={localModule}
                      onChange={(e) => setLocalModule(e.target.value)}
                      placeholder="如: USDTLikeToken"
                      className="w-full px-2 py-1 text-xs bg-purple-900/30 border border-purple-500/50 rounded text-purple-300 placeholder-purple-500/50"
                    />
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button
                    onClick={saveToLocalStorage}
                    disabled={!localCarcB64 || !localAbiJson}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed text-white rounded text-xs transition-colors"
                  >
                    保存到本地
                  </button>
                  <button
                    onClick={loadFromLocalStorage}
                    className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-xs transition-colors"
                  >
                    从本地恢复
                  </button>
                  <button
                    onClick={clearLocalData}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                  >
                    清除
                  </button>
                </div>
                
                {/* 预编译说明 */}
                <div className="mt-3 pt-3 border-t border-purple-500/30">
                  <button
                    onClick={() => setShowPrecompileInfo(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    💡 如何生成编译产物？
                  </button>
                </div>
              </div>
              
              {/* 部署状态指示器 */}
              {deployStatus === 'loading' && (
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="text-blue-300 text-sm">正在部署智能合约...</span>
                  </div>
                  <div className="text-xs text-blue-400">
                    请等待钱包确认并广播交易
                  </div>
                  {/* 部署进度指示器 */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-blue-400 mb-1">
                      <span>部署进度</span>
                      <span>{txStage === 'sign' ? '钱包确认中' : txStage === 'broadcast' ? '交易广播中' : '处理中'}</span>
                    </div>
                    <div className="w-full bg-blue-900/30 rounded-full h-2">
                      <div 
                        className={`h-2 transition-all duration-500 rounded-full ${
                          txStage === 'sign' ? 'bg-blue-500' : 
                          txStage === 'broadcast' ? 'bg-green-500' : 
                          'bg-blue-400'
                        }`}
                        style={{ 
                          width: `${txStage === 'sign' ? '50%' : txStage === 'broadcast' ? '100%' : '25%'}` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {deployStatus === 'success' && deployResult && (
                <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <h4 className="font-medium text-green-300 mb-2">✅ 部署成功!</h4>
                  <div className="text-xs text-green-400 space-y-1">
                    <div>交易ID: {deployResult.txid}</div>
                    <div>合约引用: {deployResult.contractRef}</div>
                    <div className="mt-2">
                      <a 
                        href={`${INDEXER_BASE_URL}/v4/cardity/contract/${deployResult.txid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        在索引器查看合约详情 →
                      </a>
                    </div>
                    <div className="mt-1">
                      <a 
                        href={`${INDEXER_BASE_URL}/v4/cardity/abi/${deployResult.txid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        查看合约 ABI →
                      </a>
                    </div>
                  </div>
                  
                  {/* 合约调用测试区域 */}
                  <div className="mt-3 pt-3 border-t border-green-500/30">
                    <h5 className="font-medium text-green-300 mb-2 text-sm">🧪 测试合约调用</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">合约地址:</span>
                        <code className="bg-green-900/30 px-2 py-1 rounded text-green-300">
                          {deployResult.txid}
                        </code>
                      </div>
                      <div className="text-green-400">
                        现在可以测试合约的 transfer、balanceOf 等方法
                      </div>
                      <button 
                        onClick={handleInvoke}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                      >
                        测试调用
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {deployStatus === 'error' && deployError && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="font-medium text-red-300 mb-2">❌ 部署失败</h4>
                  <div className="text-xs text-red-400">
                    {deployError}
                  </div>
                </div>
              )}
              
              {(txStage || txType || txId) ? (
                <div className="mt-3 text-xs text-gray-400 space-y-1">
                  {txType ? <div>类型：{txType}</div> : null}
                  {txStage ? <div>阶段：{txStage}</div> : null}
                  {txId ? <div className="truncate">TXID：{txId}</div> : null}
                  <div className="h-2 w-full bg-gray-700 rounded">
                    <div className={`h-2 ${txStage==='failed' ? 'bg-red-500' : 'bg-blue-500'} rounded`}
                         style={{ width: `${stageToPercent(txStage)}%` }} />
                  </div>
                </div>
              ) : null}
              {needPlan ? (
                <div className="mt-3 text-xs text-gray-400 space-y-2">
                  <div className="text-gray-300">需要 Plan（{needPlan.type}）：bytes={String(needPlan.bytes)} limit={String(needPlan.limit)}</div>
                  <details className="bg-gray-800 rounded p-2">
                    <summary className="cursor-pointer text-gray-300">Envelope 预览</summary>
                    <pre className="whitespace-pre-wrap break-all text-gray-200">{JSON.stringify(needPlan.envelope, null, 2)}</pre>
                  </details>
                  <div className="space-y-2">
                    <div className="font-semibold text-gray-300">提交计划 JSON</div>
                    <textarea
                      className="w-full h-24 bg-gray-800 border border-gray-700 rounded p-2 text-gray-100"
                      placeholder='{"commitTx":"0200...","revealTxs":["0200..."]}'
                      value={planJsonText}
                      onChange={(e) => setPlanJsonText(e.target.value)}
                    />
                    <div className="font-semibold text-gray-300">或 提交预构造交易</div>
                    <input
                      className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-gray-100"
                      placeholder='commitTxHex（0200...）'
                      value={commitHex}
                      onChange={(e) => setCommitHex(e.target.value)}
                    />
                    <textarea
                      className="w-full h-20 bg-gray-800 border border-gray-700 rounded p-2 text-gray-100"
                      placeholder='revealTxHexs（每行一笔 0200...）'
                      value={revealHexsText}
                      onChange={(e) => setRevealHexsText(e.target.value)}
                    />
                    <button
                      className="btn-primary inline-flex items-center"
                      onClick={async () => {
                        try {
                          const wallet: any = providerRef.current || (await getProvider())
                          if (!wallet) { setLastResult('Provider not found'); return }
                          let res: any = null
                          if (planJsonText.trim()) {
                            const plan = JSON.parse(planJsonText)
                            res = await wallet.request?.({ method: 'dogeuni_cardity_deploy', params: { plan } })
                          } else if (commitHex.trim() && revealHexsText.trim()) {
                            const revealTxHexs = revealHexsText.split('\n').map(s => s.trim()).filter(Boolean)
                            res = await wallet.request?.({ method: 'dogeuni_cardity_deploy', params: { commitTxHex: commitHex.trim(), revealTxHexs } })
                          } else {
                            setLastResult('请先填写 plan 或预构造交易');
                            return;
                          }
                          if (res?.txid) {
                            setTxStage('broadcast'); setTxId(String(res.txid)); setLastResult(`deploy 已广播: ${res.txid}`); setNeedPlan(null)
                          }
                        } catch (e) {
                          setLastResult(`提交计划失败: ${String(e)}`)
                        }
                      }}
                    >
                      提交计划并部署
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">主要功能</h3>
              <ul className="space-y-2">
                {example.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">使用场景</h3>
              <ul className="space-y-2">
                {example.usage.map((usage: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {usage}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Examples */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">相关示例</h3>
              <div className="space-y-3">
                {examplesData
                  .filter((ex: any) => ex.slug !== example.slug && ex.category === example.category)
                  .slice(0, 3)
                  .map((relatedExample: any) => (
                    <Link
                      key={relatedExample.slug}
                      href={`/examples/${relatedExample.slug}`}
                      className="block p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded">
                          {React.createElement(iconMap[relatedExample.icon] || Code, { className: "w-4 h-4 text-white" })}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{relatedExample.title}</h4>
                          <p className="text-xs text-gray-400">{t(`examples.difficulty.${relatedExample.difficulty}`)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">操作</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">FeeRate (sat/KB)</span>
                  <input
                    type="number"
                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-gray-100 w-32"
                    value={feeRate}
                    min={50000}
                    step={1000}
                    onChange={(e) => setFeeRate(Math.max(1000, Number(e.target.value || 0)))}
                  />
                </div>
                <button className="w-full btn-primary inline-flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  运行示例
                </button>
                <button className="w-full btn-secondary inline-flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  下载代码
                </button>
                <Link
                  href={`/docs/getting-started?lang=${locale === 'zh' ? 'zh' : 'en'}`}
                  className="w-full btn-secondary inline-flex items-center justify-center"
                >
                  <Code className="w-4 h-4 mr-2" />
                  查看文档
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 预编译说明弹窗 */}
      {showPrecompileInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">🔧 如何生成编译产物</h3>
              <button
                onClick={() => setShowPrecompileInfo(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">📋 方案 A：本地 CLI 编译（推荐）</h4>
                <div className="bg-gray-800 p-3 rounded text-xs font-mono">
                  <div className="text-green-400"># 1. 安装 Cardity Core</div>
                  <div className="text-gray-400">cargo install cardity-core</div>
                  <br />
                  <div className="text-green-400"># 2. 编译 .car 源码</div>
                  <div className="text-gray-400">cardityc --format carc your_contract.car</div>
                  <div className="text-gray-400"># 输出: your_contract.carc</div>
                  <br />
                  <div className="text-green-400"># 3. 生成 ABI</div>
                  <div className="text-gray-400">cardity_abi your_contract.car</div>
                  <div className="text-gray-400"># 输出: your_contract.abi.json</div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  💡 这是最稳定的方式，确保编译环境与生产环境一致
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">🌐 方案 B：服务器端编译（可选）</h4>
                <div className="bg-gray-800 p-3 rounded text-xs font-mono">
                  <div className="text-green-400"># 如果配置了编译 API</div>
                  <div className="text-gray-400">POST /api/compile</div>
                  <div className="text-gray-400">Body: {"{ \"source\": \"your_contract_source\" }"}</div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  ⚠️ 需要服务器支持，仅适用于开发/自托管环境
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">📁 文件要求</h4>
                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>• <code className="bg-gray-700 px-1 rounded">.carc</code>：编译后的字节码文件（必传）</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">.abi.json</code>：合约接口定义（推荐）</li>
                  <li>• 协议名、版本、模块名：用于合约标识</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">🚀 下一步</h4>
                <ol className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>1. 上传编译产物文件</li>
                  <li>2. 配置协议信息</li>
                  <li>3. 保存到本地存储</li>
                  <li>4. 点击部署按钮</li>
                  <li>5. 在钱包中确认部署</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPrecompileInfo(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                明白了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
