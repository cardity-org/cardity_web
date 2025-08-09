"use client"

import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, ExternalLink, Star, Users, Coins, Vote, Database, Wallet } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'
import { useMemo } from 'react'

export default function ExamplesContent() {
  const { t, locale, isClient, isInitialized } = useTranslations()

  // 使用 useMemo 确保示例数据在语言切换时重新计算
  const examples = useMemo(() => [
    {
      title: 'Hello World',
      description: '最简单的 Hello World 示例，展示基本的协议结构：协议定义、状态变量、事件定义和基本方法实现',
      category: t('examples.categories.basic'),
      difficulty: t('examples.difficulty.beginner'),
      icon: Database,
      code: `protocol HelloWorld {
  version: "1.0.0";
  owner: "doge1abc123def456";
  
  state {
    message: string = "Hello, Cardity!";
    count: int = 0;
  }
  
  event MessageUpdated {
    new_message: string;
  }
  
  event CounterIncremented {
    old_count: int;
    new_count: int;
  }
  
  method get_message() {
    return state.message;
  }
  
  method set_message(new_message) {
    state.message = new_message;
    emit MessageUpdated(new_message);
  }
  
  method increment() {
    let old_count = state.count;
    state.count = state.count + 1;
    emit CounterIncremented(old_count, state.count);
  }
  
  method get_count() {
    return state.count;
  }
}`,
    },
    {
      title: 'Counter Protocol',
      description: '计数器协议，展示状态管理和事件系统：状态变量操作、条件逻辑、事件发射和方法参数',
      category: t('examples.categories.basic'),
      difficulty: t('examples.difficulty.beginner'),
      icon: Shield,
      code: `protocol Counter {
  version: "1.0.0";
  owner: "doge1counter123";
  
  state {
    count: int = 0;
    name: string = "Counter";
    active: bool = true;
    max_count: int = 1000;
  }
  
  event CountChanged {
    old_count: int;
    new_count: int;
    operation: string;
  }
  
  event CounterReset {
    previous_count: int;
  }
  
  method increment() {
    if (state.active && state.count < state.max_count) {
      let old_count = state.count;
      state.count = state.count + 1;
      emit CountChanged(old_count, state.count, "increment");
    }
  }
  
  method decrement() {
    if (state.active && state.count > 0) {
      let old_count = state.count;
      state.count = state.count - 1;
      emit CountChanged(old_count, state.count, "decrement");
    }
  }
  
  method get_count() {
    return state.count;
  }
  
  method set_name(new_name) {
    state.name = new_name;
  }
  
  method get_name() {
    return state.name;
  }
  
  method toggle_active() {
    state.active = !state.active;
  }
  
  method reset() {
    let previous_count = state.count;
    state.count = 0;
    emit CounterReset(previous_count);
  }
  
  method set_max_count(max) {
    if (max > 0) {
      state.max_count = max;
    }
  }
}`,
    },
    {
      title: 'Simple Wallet',
      description: '基础钱包协议，展示金融应用开发：余额管理、交易记录、安全锁定机制和每日限额控制',
      category: t('examples.categories.wallet'),
      difficulty: t('examples.difficulty.intermediate'),
      icon: Download,
      code: `protocol Wallet {
  version: "1.0.0";
  owner: "doge1wallet456";
  
  state {
    balance: int = 0;
    owner_address: string = "doge1wallet456";
    is_locked: bool = false;
    transaction_count: int = 0;
    max_daily_withdrawal: int = 10000;
    daily_withdrawal_used: int = 0;
    last_reset_date: string = "";
  }
  
  event BalanceUpdated {
    old_balance: int;
    new_balance: int;
    operation: string;
  }
  
  event WalletLocked {
    locked: bool;
  }
  
  event TransactionCreated {
    amount: int;
    transaction_type: string;
  }
  
  method deposit(amount) {
    if (!state.is_locked && amount > 0) {
      let old_balance = state.balance;
      state.balance = state.balance + amount;
      state.transaction_count = state.transaction_count + 1;
      emit BalanceUpdated(old_balance, state.balance, "deposit");
      emit TransactionCreated(amount, "deposit");
    }
  }
  
  method withdraw(amount) {
    if (!state.is_locked && amount > 0) {
      if (state.balance >= amount) {
        if (state.daily_withdrawal_used + amount <= state.max_daily_withdrawal) {
          let old_balance = state.balance;
          state.balance = state.balance - amount;
          state.daily_withdrawal_used = state.daily_withdrawal_used + amount;
          state.transaction_count = state.transaction_count + 1;
          emit BalanceUpdated(old_balance, state.balance, "withdraw");
          emit TransactionCreated(amount, "withdraw");
        }
      }
    }
  }
  
  method get_balance() {
    return state.balance;
  }
  
  method get_owner() {
    return state.owner_address;
  }
  
  method lock_wallet() {
    state.is_locked = true;
    emit WalletLocked(true);
  }
  
  method unlock_wallet() {
    state.is_locked = false;
    emit WalletLocked(false);
  }
  
  method get_transaction_count() {
    return state.transaction_count;
  }
  
  method set_max_daily_withdrawal(max) {
    if (max > 0) {
      state.max_daily_withdrawal = max;
    }
  }
  
  method reset_daily_withdrawal() {
    state.daily_withdrawal_used = 0;
    state.last_reset_date = "today";
  }
}`,
    },
    {
      title: 'DRC-20 Token',
      description: '完整的 DRC-20 代币实现：DRC-20 标准支持、代币部署、铸造和转账、持有人统计和完整的事件系统',
      category: t('examples.categories.token'),
      difficulty: t('examples.difficulty.intermediate'),
      icon: Globe,
      code: `protocol MyDrc20Token {
  version: "1.0.0";
  owner: "doge1token123";
  
  // DRC-20 代币定义
  drc20 {
    tick: "MYT";
    name: "My Token";
    max_supply: "1000000";
    mint_limit: "1000";
    decimals: "18";
    deployer: "doge1token123";
  }
  
  // 状态变量
  state {
    total_supply: int = 0;
    deployed: bool = false;
    mint_count: int = 0;
    transfer_count: int = 0;
    holders: int = 0;
  }
  
  // 事件定义
  event TokenDeployed {
    tick: string;
    max_supply: string;
    deployer: string;
  }
  
  event TokenMinted {
    tick: string;
    amount: int;
    total_supply: int;
    minter: string;
  }
  
  event TokenTransferred {
    tick: string;
    amount: int;
    from_address: string;
    to_address: string;
  }
  
  event HolderAdded {
    address: string;
    total_holders: int;
  }
  
  // 部署方法
  method deploy() {
    if (!state.deployed) {
      // 验证代币参数
      if (drc20.tick.length() < 3 || drc20.tick.length() > 4) {
        return "Invalid tick length";
      }
      
      if (drc20.max_supply <= 0) {
        return "Invalid max supply";
      }
      
      // 执行部署
      state.deployed = true;
      emit TokenDeployed(drc20.tick, drc20.max_supply, drc20.deployer);
      return "Token deployed successfully";
    }
    return "Token already deployed";
  }
  
  // 铸造方法
  method mint(amount, minter_address) {
    if (!state.deployed) {
      return "Token not deployed";
    }
    
    if (amount <= 0) {
      return "Invalid amount";
    }
    
    if (state.total_supply + amount > drc20.max_supply) {
      return "Exceeds max supply";
    }
    
    if (amount > drc20.mint_limit) {
      return "Exceeds mint limit";
    }
    
    // 执行铸造
    state.total_supply = state.total_supply + amount;
    state.mint_count = state.mint_count + 1;
    emit TokenMinted(drc20.tick, amount, state.total_supply, minter_address);
    return "Minted successfully";
  }
  
  // 转账方法
  method transfer(from_address, to_address, amount) {
    if (!state.deployed) {
      return "Token not deployed";
    }
    
    if (amount <= 0) {
      return "Invalid amount";
    }
    
    if (from_address.length() < 26 || to_address.length() < 26) {
      return "Invalid address";
    }
    
    // 执行转账
    state.transfer_count = state.transfer_count + 1;
    state.holders = state.holders + 1;
    emit TokenTransferred(drc20.tick, amount, from_address, to_address);
    emit HolderAdded(to_address, state.holders);
    return "Transfer successful";
  }
  
  // 查询方法
  method get_total_supply() {
    return state.total_supply;
  }
  
  method get_mint_count() {
    return state.mint_count;
  }
  
  method get_transfer_count() {
    return state.transfer_count;
  }
  
  method get_holders_count() {
    return state.holders;
  }
  
  method is_deployed() {
    return state.deployed;
  }
  
  method get_token_info() {
    return "Token: " + drc20.tick + ", Name: " + drc20.name + ", Supply: " + state.total_supply;
  }
}`,
    },
    {
      title: 'Event System Demo',
      description: '事件系统演示，展示复杂的事件处理：多种事件类型、事件参数、系统事件和错误处理事件',
      category: t('examples.categories.advanced'),
      difficulty: t('examples.difficulty.intermediate'),
      icon: Zap,
      code: `protocol EventDemo {
  version: "1.0.0";
  owner: "doge1event123";
  
  state {
    user_count: int = 0;
    event_count: int = 0;
    last_event_time: string = "";
    active_users: int = 0;
  }
  
  // 用户相关事件
  event UserRegistered {
    user_id: string;
    user_name: string;
    registration_time: string;
  }
  
  event UserLogin {
    user_id: string;
    login_time: string;
  }
  
  event UserLogout {
    user_id: string;
    logout_time: string;
    session_duration: int;
  }
  
  // 系统事件
  event SystemEvent {
    event_type: string;
    description: string;
    timestamp: string;
  }
  
  event ErrorOccurred {
    error_code: int;
    error_message: string;
    user_id: string;
  }
  
  // 用户管理方法
  method register_user(user_id, user_name) {
    if (user_id.length() > 0 && user_name.length() > 0) {
      state.user_count = state.user_count + 1;
      state.event_count = state.event_count + 1;
      state.last_event_time = "now";
      
      emit UserRegistered(user_id, user_name, "now");
      emit SystemEvent("user_registration", "New user registered", "now");
      
      return "User registered successfully";
    }
    return "Invalid user data";
  }
  
  method user_login(user_id) {
    if (user_id.length() > 0) {
      state.active_users = state.active_users + 1;
      state.event_count = state.event_count + 1;
      state.last_event_time = "now";
      
      emit UserLogin(user_id, "now");
      emit SystemEvent("user_login", "User logged in", "now");
      
      return "Login successful";
    }
    return "Invalid user ID";
  }
  
  method user_logout(user_id, session_duration) {
    if (user_id.length() > 0) {
      state.active_users = state.active_users - 1;
      state.event_count = state.event_count + 1;
      state.last_event_time = "now";
      
      emit UserLogout(user_id, "now", session_duration);
      emit SystemEvent("user_logout", "User logged out", "now");
      
      return "Logout successful";
    }
    return "Invalid user ID";
  }
  
  // 系统方法
  method trigger_system_event(event_type, description) {
    state.event_count = state.event_count + 1;
    state.last_event_time = "now";
    
    emit SystemEvent(event_type, description, "now");
    return "System event triggered";
  }
  
  method report_error(error_code, error_message, user_id) {
    state.event_count = state.event_count + 1;
    state.last_event_time = "now";
    
    emit ErrorOccurred(error_code, error_message, user_id);
    emit SystemEvent("error", "Error reported", "now");
    
    return "Error reported";
  }
  
  // 查询方法
  method get_user_count() {
    return state.user_count;
  }
  
  method get_event_count() {
    return state.event_count;
  }
  
  method get_active_users() {
    return state.active_users;
  }
  
  method get_last_event_time() {
    return state.last_event_time;
  }
  
  method get_stats() {
    return "Users: " + state.user_count + ", Events: " + state.event_count + ", Active: " + state.active_users;
  }
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
                
                <Link
                  href={`/examples/${example.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  {t('examples.actions.viewDetails')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
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
