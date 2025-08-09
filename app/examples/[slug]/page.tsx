import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ExampleDetailClient from './ExampleDetailClient'

// 示例数据
const examplesData = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    description: '最简单的 Hello World 示例，展示基本的协议结构：协议定义、状态变量、事件定义和基本方法实现',
    category: 'basic',
    difficulty: 'beginner',
    icon: 'Database',
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
    features: [
      '基本的协议结构',
      '状态变量管理',
      '事件定义和发射',
      '简单方法实现'
    ],
    usage: [
      '学习 Cardity 基本语法',
      '理解协议结构',
      '掌握状态管理',
      '熟悉事件系统'
    ]
  },
  {
    slug: 'counter-protocol',
    title: 'Counter Protocol',
    description: '计数器协议，展示状态管理和事件系统：状态变量操作、条件逻辑、事件发射和方法参数',
    category: 'basic',
    difficulty: 'beginner',
    icon: 'Shield',
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
    features: [
      '条件逻辑控制',
      '状态变量操作',
      '事件发射',
      '方法参数处理'
    ],
    usage: [
      '学习条件语句',
      '掌握状态更新',
      '理解事件系统',
      '实践方法调用'
    ]
  },
  {
    slug: 'simple-wallet',
    title: 'Simple Wallet',
    description: '基础钱包协议，展示金融应用开发：余额管理、交易记录、安全锁定机制和每日限额控制',
    category: 'wallet',
    difficulty: 'intermediate',
    icon: 'Wallet',
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
  
  method set_daily_limit(limit) {
    if (limit > 0) {
      state.max_daily_withdrawal = limit;
    }
  }
  
  method get_daily_remaining() {
    return state.max_daily_withdrawal - state.daily_withdrawal_used;
  }
}`,
    features: [
      '余额管理',
      '交易记录',
      '安全锁定',
      '每日限额'
    ],
    usage: [
      '金融应用开发',
      '安全机制设计',
      '交易处理',
      '限额控制'
    ]
  },
  {
    slug: 'drc-20-token',
    title: 'DRC-20 Token',
    description: '完整的 DRC-20 代币实现，包含铸造、转账、授权和销毁功能，符合 Dogecoin 代币标准',
    category: 'token',
    difficulty: 'intermediate',
    icon: 'Coins',
    code: `protocol DRC20Token {
  version: "1.0.0";
  owner: "doge1token789";
  
  state {
    name: string = "Example Token";
    symbol: string = "EXT";
    decimals: int = 8;
    total_supply: int = 1000000000;
    circulating_supply: int = 0;
    owner_address: string = "doge1token789";
  }
  
  event TokenMinted {
    to: string;
    amount: int;
    total_supply: int;
  }
  
  event TokenTransferred {
    from: string;
    to: string;
    amount: int;
  }
  
  event Approval {
    owner: string;
    spender: string;
    amount: int;
  }
  
  event TokenBurned {
    from: string;
    amount: int;
    total_supply: int;
  }
  
  method mint(to_address, amount) {
    if (msg.sender == state.owner_address) {
      if (state.circulating_supply + amount <= state.total_supply) {
        state.circulating_supply = state.circulating_supply + amount;
        emit TokenMinted(to_address, amount, state.circulating_supply);
      }
    }
  }
  
  method transfer(to_address, amount) {
    if (amount > 0) {
      // 这里应该有余额检查逻辑
      emit TokenTransferred(msg.sender, to_address, amount);
    }
  }
  
  method approve(spender, amount) {
    emit Approval(msg.sender, spender, amount);
  }
  
  method transfer_from(from_address, to_address, amount) {
    if (amount > 0) {
      // 这里应该有授权检查逻辑
      emit TokenTransferred(from_address, to_address, amount);
    }
  }
  
  method burn(amount) {
    if (amount > 0) {
      // 这里应该有余额检查逻辑
      state.circulating_supply = state.circulating_supply - amount;
      emit TokenBurned(msg.sender, amount, state.circulating_supply);
    }
  }
  
  method get_name() {
    return state.name;
  }
  
  method get_symbol() {
    return state.symbol;
  }
  
  method get_decimals() {
    return state.decimals;
  }
  
  method get_total_supply() {
    return state.total_supply;
  }
  
  method get_circulating_supply() {
    return state.circulating_supply;
  }
}`,
    features: [
      '代币铸造',
      '转账功能',
      '授权机制',
      '销毁功能'
    ],
    usage: [
      '代币开发',
      'DeFi 应用',
      '标准实现',
      '经济模型'
    ]
  },
  {
    slug: 'voting-system',
    title: 'Voting System',
    description: '去中心化投票系统，支持提案创建、投票、结果统计和治理机制，适用于 DAO 和社区治理',
    category: 'governance',
    difficulty: 'advanced',
    icon: 'Vote',
    code: `protocol VotingSystem {
  version: "1.0.0";
  owner: "doge1vote123";
  
  state {
    proposal_count: int = 0;
    active_proposals: int = 0;
    total_voters: int = 0;
    quorum_percentage: int = 50;
    voting_period: int = 604800; // 7 days in seconds
  }
  
  event ProposalCreated {
    proposal_id: int;
    title: string;
    description: string;
    creator: string;
    start_time: string;
    end_time: string;
  }
  
  event VoteCast {
    proposal_id: int;
    voter: string;
    vote: bool;
    weight: int;
  }
  
  event ProposalExecuted {
    proposal_id: int;
    result: bool;
    yes_votes: int;
    no_votes: int;
    total_votes: int;
  }
  
  method create_proposal(title, description, duration) {
    if (msg.sender == state.owner_address) {
      state.proposal_count = state.proposal_count + 1;
      state.active_proposals = state.active_proposals + 1;
      
      let proposal_id = state.proposal_count;
      let start_time = "now";
      let end_time = "now + " + duration;
      
      emit ProposalCreated(proposal_id, title, description, msg.sender, start_time, end_time);
    }
  }
  
  method vote(proposal_id, vote_choice) {
    if (proposal_id > 0 && proposal_id <= state.proposal_count) {
      // 这里应该有投票权重计算逻辑
      let weight = 1; // 简化版本
      
      emit VoteCast(proposal_id, msg.sender, vote_choice, weight);
    }
  }
  
  method execute_proposal(proposal_id) {
    if (proposal_id > 0 && proposal_id <= state.proposal_count) {
      // 这里应该有投票结果统计逻辑
      let yes_votes = 0;
      let no_votes = 0;
      let total_votes = yes_votes + no_votes;
      
      let result = yes_votes > no_votes && total_votes >= (state.total_voters * state.quorum_percentage / 100);
      
      state.active_proposals = state.active_proposals - 1;
      
      emit ProposalExecuted(proposal_id, result, yes_votes, no_votes, total_votes);
    }
  }
  
  method set_quorum(percentage) {
    if (msg.sender == state.owner_address && percentage > 0 && percentage <= 100) {
      state.quorum_percentage = percentage;
    }
  }
  
  method set_voting_period(period) {
    if (msg.sender == state.owner_address && period > 0) {
      state.voting_period = period;
    }
  }
  
  method get_proposal_count() {
    return state.proposal_count;
  }
  
  method get_active_proposals() {
    return state.active_proposals;
  }
  
  method get_quorum_percentage() {
    return state.quorum_percentage;
  }
  
  method get_voting_period() {
    return state.voting_period;
  }
}`,
    features: [
      '提案创建',
      '投票机制',
      '结果统计',
      '治理控制'
    ],
    usage: [
      'DAO 治理',
      '社区投票',
      '提案管理',
      '结果统计'
    ]
  },
  {
    slug: 'event-system-demo',
    title: 'Event System Demo',
    description: '高级事件处理系统，展示复杂的事件管理、状态同步和系统监控功能，适用于大型应用',
    category: 'advanced',
    difficulty: 'advanced',
    icon: 'Zap',
    code: `protocol EventSystem {
  version: "1.0.0";
  owner: "doge1event456";
  
  state {
    event_count: int = 0;
    user_count: int = 0;
    active_users: int = 0;
    last_event_time: string = "";
  }
  
  // 用户事件
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
    features: [
      '事件管理',
      '状态同步',
      '系统监控',
      '错误处理'
    ],
    usage: [
      '大型应用',
      '系统监控',
      '事件处理',
      '状态管理'
    ]
  }
]

// 生成静态参数
export async function generateStaticParams() {
  return examplesData.map((example) => ({
    slug: example.slug,
  }))
}

export default function ExampleDetailPage({ params }: { params: { slug: string } }) {
  // locale is only available in client hooks; for server fallback, default to en
  const langParam = '?lang=en'
  // 查找对应的示例
  const example = examplesData.find(ex => ex.slug === params.slug)
  
  if (!example) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">示例未找到</h1>
            <p className="text-gray-400 mb-8">抱歉，您请求的示例不存在。</p>
            <Link href={`/examples${langParam}`} className="btn-primary inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回示例列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <ExampleDetailClient example={example} examplesData={examplesData} />
}
