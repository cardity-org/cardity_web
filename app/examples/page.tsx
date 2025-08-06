import Link from 'next/link'
import { Code, ExternalLink, ArrowRight, Star, Users, Coins, Vote, Database, Wallet, Zap } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

const examples = [
  {
    title: 'Hello World',
    description: 'A simple Hello World contract demonstrating basic Cardity syntax and state management',
    category: 'Basic',
    difficulty: 'Beginner',
    icon: Code,
    code: `protocol HelloCardity {
  version: "1.0.0";
  owner: "doge1hello123";
  
  state {
    message: string = "Hello, Cardity!";
    count: int = 0;
  }
  
  event MessageUpdated {
    new_message: string;
  }
  
  method get_message() {
    return state.message;
  }
  
  method set_message(new_message) {
    state.message = new_message;
    emit MessageUpdated(new_message);
  }
  
  method increment() {
    state.count = state.count + 1;
  }
  
  method get_count() {
    return state.count;
  }
}`,
  },
  {
    title: 'Counter Protocol',
    description: 'A counter contract with increment, decrement, and state management capabilities',
    category: 'Basic',
    difficulty: 'Beginner',
    icon: Database,
    code: `protocol Counter {
  version: "1.0.0";
  owner: "doge1counter123";
  
  state {
    count: int = 0;
    name: string = "Counter";
    active: bool = true;
  }
  
  method increment() {
    state.count = state.count + 1;
  }
  
  method decrement() {
    state.count = state.count - 1;
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
}`,
  },
  {
    title: 'DRC-20 Token',
    description: 'Complete DRC-20 token implementation with deploy, mint, and transfer functionality',
    category: 'Token',
    difficulty: 'Intermediate',
    icon: Coins,
    code: `protocol MyDrc20Token {
  version: "1.0.0";
  owner: "doge1token123";
  
  // DRC-20 token definition
  drc20 {
    tick: "MYT";
    name: "My Token";
    max_supply: "1000000";
    mint_limit: "1000";
    decimals: "18";
    deployer: "doge1token123";
  }
  
  state {
    total_supply: int = 0;
    deployed: bool = false;
    mint_count: int = 0;
    transfer_count: int = 0;
  }
  
  method deploy() {
    if (!state.deployed) {
      state.deployed = true;
      emit TokenDeployed(drc20.tick, drc20.max_supply);
      return "Token deployed successfully";
    }
    return "Token already deployed";
  }
  
  method mint(amount) {
    if (!state.deployed) return "Token not deployed";
    if (amount <= 0) return "Invalid amount";
    if (state.total_supply + amount > drc20.max_supply) return "Exceeds max supply";
    
    state.total_supply = state.total_supply + amount;
    state.mint_count = state.mint_count + 1;
    emit TokenMinted(drc20.tick, amount, state.total_supply);
    return "Minted successfully";
  }
  
  method transfer(to_address, amount) {
    if (!state.deployed) return "Token not deployed";
    if (amount <= 0) return "Invalid amount";
    
    state.transfer_count = state.transfer_count + 1;
    emit TokenTransferred(drc20.tick, amount, to_address);
    return "Transfer successful";
  }
  
  event TokenDeployed {
    tick: string;
    max_supply: string;
  }
  
  event TokenMinted {
    tick: string;
    amount: int;
    total_supply: int;
  }
  
  event TokenTransferred {
    tick: string;
    amount: int;
    to_address: string;
  }
}`,
  },
  {
    title: 'Simple Wallet',
    description: 'A basic wallet contract with deposit, withdraw, and balance management',
    category: 'Wallet',
    difficulty: 'Intermediate',
    icon: Wallet,
    code: `protocol SimpleWallet {
  version: "1.0.0";
  owner: "doge1wallet123";
  
  state {
    balance: int = 0;
    owner: string = "doge1wallet123";
    transactions: array = [];
  }
  
  event Deposit {
    amount: int;
    timestamp: int;
  }
  
  event Withdrawal {
    amount: int;
    timestamp: int;
  }
  
  method deposit(amount) {
    if (amount <= 0) {
      return "Invalid amount";
    }
    
    state.balance = state.balance + amount;
    state.transactions.push("deposit:" + amount);
    emit Deposit(amount, now());
    return "Deposit successful";
  }
  
  method withdraw(amount) {
    if (amount <= 0) {
      return "Invalid amount";
    }
    
    if (state.balance < amount) {
      return "Insufficient balance";
    }
    
    state.balance = state.balance - amount;
    state.transactions.push("withdraw:" + amount);
    emit Withdrawal(amount, now());
    return "Withdrawal successful";
  }
  
  method get_balance() {
    return state.balance;
  }
  
  method get_transactions() {
    return state.transactions;
  }
}`,
  },
  {
    title: 'Voting System',
    description: 'A decentralized voting system with proposal creation and voting mechanisms',
    category: 'Governance',
    difficulty: 'Advanced',
    icon: Vote,
    code: `protocol Voting {
  version: "1.0.0";
  owner: "doge1voting123";
  
  state {
    proposals: array = [];
    votes: map = {};
    active_proposal: string = "";
    proposal_count: int = 0;
  }
  
  event ProposalCreated {
    id: string;
    title: string;
    description: string;
  }
  
  event VoteCast {
    proposal_id: string;
    voter: string;
    choice: string;
  }
  
  method create_proposal(title, description) {
    proposal_id = "proposal_" + state.proposal_count;
    proposal = {
      "id": proposal_id,
      "title": title,
      "description": description,
      "yes_votes": 0,
      "no_votes": 0,
      "created_at": now()
    };
    
    state.proposals.push(proposal);
    state.proposal_count = state.proposal_count + 1;
    emit ProposalCreated(proposal_id, title, description);
    return "Proposal created: " + proposal_id;
  }
  
  method vote(proposal_id, choice) {
    if (choice != "yes" && choice != "no") {
      return "Invalid choice. Use 'yes' or 'no'";
    }
    
    vote_key = proposal_id + ":" + state.owner;
    if (state.votes[vote_key]) {
      return "Already voted on this proposal";
    }
    
    state.votes[vote_key] = choice;
    
    // Update proposal votes
    for (i = 0; i < state.proposals.length; i++) {
      if (state.proposals[i].id == proposal_id) {
        if (choice == "yes") {
          state.proposals[i].yes_votes = state.proposals[i].yes_votes + 1;
        } else {
          state.proposals[i].no_votes = state.proposals[i].no_votes + 1;
        }
        break;
      }
    }
    
    emit VoteCast(proposal_id, state.owner, choice);
    return "Vote cast successfully";
  }
  
  method get_proposal(proposal_id) {
    for (i = 0; i < state.proposals.length; i++) {
      if (state.proposals[i].id == proposal_id) {
        return state.proposals[i];
      }
    }
    return "Proposal not found";
  }
  
  method get_all_proposals() {
    return state.proposals;
  }
}`,
  },
  {
    title: 'Event System Demo',
    description: 'Demonstration of Cardity event system with multiple event types and handlers',
    category: 'Advanced',
    difficulty: 'Advanced',
    icon: Zap,
    code: `protocol EventDemo {
  version: "1.0.0";
  owner: "doge1event123";
  
  state {
    user_count: int = 0;
    event_count: int = 0;
    users: array = [];
    events: array = [];
  }
  
  event UserRegistered {
    user_id: string;
    name: string;
    timestamp: int;
  }
  
  event UserUpdated {
    user_id: string;
    old_name: string;
    new_name: string;
    timestamp: int;
  }
  
  event UserDeleted {
    user_id: string;
    timestamp: int;
  }
  
  event SystemEvent {
    event_type: string;
    message: string;
    timestamp: int;
  }
  
  method register_user(name) {
    if (name.length() < 2) {
      return "Name too short";
    }
    
    user_id = "user_" + state.user_count;
    user = {
      "id": user_id,
      "name": name,
      "created_at": now()
    };
    
    state.users.push(user);
    state.user_count = state.user_count + 1;
    state.event_count = state.event_count + 1;
    
    emit UserRegistered(user_id, name, now());
    emit SystemEvent("user_registered", "User " + name + " registered", now());
    
    return "User registered: " + user_id;
  }
  
  method update_user(user_id, new_name) {
    if (new_name.length() < 2) {
      return "Name too short";
    }
    
    old_name = "";
    for (i = 0; i < state.users.length; i++) {
      if (state.users[i].id == user_id) {
        old_name = state.users[i].name;
        state.users[i].name = new_name;
        state.users[i].updated_at = now();
        break;
      }
    }
    
    if (old_name == "") {
      return "User not found";
    }
    
    state.event_count = state.event_count + 1;
    emit UserUpdated(user_id, old_name, new_name, now());
    emit SystemEvent("user_updated", "User " + user_id + " updated", now());
    
    return "User updated successfully";
  }
  
  method delete_user(user_id) {
    for (i = 0; i < state.users.length; i++) {
      if (state.users[i].id == user_id) {
        state.users.splice(i, 1);
        state.event_count = state.event_count + 1;
        emit UserDeleted(user_id, now());
        emit SystemEvent("user_deleted", "User " + user_id + " deleted", now());
        return "User deleted successfully";
      }
    }
    return "User not found";
  }
  
  method get_users() {
    return state.users;
  }
  
  method get_event_count() {
    return state.event_count;
  }
}`,
  },
]

export default function ExamplesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Cardity Examples
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Learn Cardity through practical examples, from basic contracts to advanced DRC-20 tokens and governance systems
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
            
            <p className="text-gray-400 mb-6">
              {example.description}
            </p>
            
            <div className="mb-6">
              <CodeBlock
                code={example.code}
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
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Want to contribute examples?
        </h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          We welcome community contributions of high-quality example code. Your examples can help other developers better understand and use Cardity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/cardity/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Submit Example
          </a>
          <Link href="/docs/getting-started" className="btn-secondary inline-flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Start Coding
          </Link>
        </div>
      </div>
    </div>
  )
} 