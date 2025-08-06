import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Globe, Download, BookOpen, Play, ExternalLink, Star, Users, Coins, Vote, Database, Wallet } from 'lucide-react'
import CodeBlock from '../../components/CodeBlock'

export const metadata: Metadata = {
  title: 'Code Examples',
  description: 'Explore Cardity smart contract examples including Hello World, DRC-20 tokens, wallets, voting systems, and more. Learn from real-world code samples.',
  keywords: 'Cardity examples, smart contract samples, DRC-20 tokens, wallet protocols, voting systems, code samples',
  openGraph: {
    title: 'Cardity Code Examples - Smart Contract Samples',
    description: 'Explore real-world Cardity smart contract examples including DRC-20 tokens, wallets, voting systems, and more.',
  },
}

const examples = [
  {
    title: 'Hello World',
    description: 'A simple protocol that demonstrates basic Cardity syntax and structure',
    category: 'Basic',
    difficulty: 'Beginner',
    icon: Database,
    code: `protocol HelloCardity {
  version: "1.0.0";
  owner: "0x1234567890abcdef";
  
  state {
    string message = "Hello, Cardity!";
    int count = 0;
  }
  
  method greet(string name) {
    self.message = "Hello, " + name + "!";
    self.count = self.count + 1;
    emit Greeted(name, time.now());
  }
  
  event Greeted {
    string name;
    int timestamp;
  }
}`,
  },
  {
    title: 'Counter Protocol',
    description: 'A simple counter that can be incremented and decremented',
    category: 'Basic',
    difficulty: 'Beginner',
    icon: Shield,
    code: `protocol Counter {
  version: "1.0.0";
  owner: "0x1234567890abcdef";
  
  state {
    int count = 0;
  }
  
  method increment() {
    self.count = self.count + 1;
    emit CountChanged(self.count);
  }
  
  method decrement() {
    if (self.count > 0) {
      self.count = self.count - 1;
      emit CountChanged(self.count);
    }
  }
  
  method get_count() {
    return self.count;
  }
  
  event CountChanged {
    int new_count;
  }
}`,
  },
  {
    title: 'DRC-20 Token',
    description: 'A complete DRC-20 token implementation with mint and transfer functionality',
    category: 'Token',
    difficulty: 'Intermediate',
    icon: Globe,
    code: `protocol MyDrc20Token {
  version: "1.0.0";
  owner: "0x1234567890abcdef";
  
  drc20 {
    tick: "MYT";
    name: "My Token";
    max_supply: "1000000";
    decimals: 8;
  }
  
  state {
    int total_supply = 0;
    int mint_count = 0;
    int transfer_count = 0;
    bool deployed = false;
  }
  
  method deploy() {
    if (!self.deployed) {
      self.deployed = true;
      emit TokenDeployed(drc20.tick, drc20.max_supply);
      return "Token deployed successfully";
    }
    return "Token already deployed";
  }
  
  method mint(amount) {
    if (!self.deployed) {
      return "Token not deployed";
    }
    if (amount <= 0) {
      return "Invalid amount";
    }
    if (self.total_supply + amount > drc20.max_supply) {
      return "Exceeds max supply";
    }
    self.total_supply = self.total_supply + amount;
    self.mint_count = self.mint_count + 1;
    emit TokenMinted(drc20.tick, amount, self.total_supply);
    return "Minted successfully";
  }
  
  method transfer(to_address, amount) {
    if (!self.deployed) {
      return "Token not deployed";
    }
    if (amount <= 0) {
      return "Invalid amount";
    }
    self.transfer_count = self.transfer_count + 1;
    emit TokenTransferred(drc20.tick, amount, to_address);
    return "Transfer successful";
  }
  
  event TokenDeployed {
    string tick;
    string max_supply;
  }
  
  event TokenMinted {
    string tick;
    int amount;
    int total_supply;
  }
  
  event TokenTransferred {
    string tick;
    int amount;
    string to_address;
  }
}`,
  },
  {
    title: 'Simple Wallet',
    description: 'A basic wallet protocol for managing Dogecoin balances',
    category: 'Wallet',
    difficulty: 'Intermediate',
    icon: Download,
    code: `protocol SimpleWallet {
  version: "1.0.0";
  owner: "0x1234567890abcdef";
  
  state {
    string owner_address;
    int balance = 0;
    array transactions;
  }
  
  method initialize(string owner) {
    self.owner_address = owner;
    emit WalletCreated(owner);
  }
  
  method deposit(amount) {
    if (amount > 0) {
      self.balance = self.balance + amount;
      self.transactions.push("Deposit: " + amount);
      emit Deposit(amount, self.balance);
    }
  }
  
  method withdraw(amount, to_address) {
    if (amount <= 0) {
      return "Invalid amount";
    }
    if (amount > self.balance) {
      return "Insufficient balance";
    }
    self.balance = self.balance - amount;
    self.transactions.push("Withdraw: " + amount + " to " + to_address);
    emit Withdrawal(amount, to_address, self.balance);
    return "Withdrawal successful";
  }
  
  method get_balance() {
    return self.balance;
  }
  
  event WalletCreated {
    string owner;
  }
  
  event Deposit {
    int amount;
    int new_balance;
  }
  
  event Withdrawal {
    int amount;
    string to_address;
    int new_balance;
  }
}`,
  },
  {
    title: 'Voting System',
    description: 'A decentralized voting system with proposal creation and voting',
    category: 'Governance',
    difficulty: 'Advanced',
    icon: Play,
    code: `protocol Voting {
  version: "1.0.0";
  owner: "0x1234567890abcdef";
  
  state {
    int proposal_count = 0;
    array proposals;
    map votes;
    int voting_period = 86400; // 24 hours in seconds
  }
  
  method create_proposal(string title, string description) {
    int proposal_id = self.proposal_count + 1;
    self.proposal_count = proposal_id;
    
    map proposal;
    proposal.title = title;
    proposal.description = description;
    proposal.creator = msg.sender;
    proposal.created_at = time.now();
    proposal.end_time = time.now() + self.voting_period;
    proposal.yes_votes = 0;
    proposal.no_votes = 0;
    proposal.executed = false;
    
    self.proposals[proposal_id] = proposal;
    emit ProposalCreated(proposal_id, title, description);
    return proposal_id;
  }
  
  method vote(int proposal_id, bool support) {
    if (!self.proposals[proposal_id]) {
      return "Proposal not found";
    }
    
    map proposal = self.proposals[proposal_id];
    if (time.now() > proposal.end_time) {
      return "Voting period ended";
    }
    
    string voter_key = proposal_id + "_" + msg.sender;
    if (self.votes[voter_key]) {
      return "Already voted";
    }
    
    self.votes[voter_key] = support;
    if (support) {
      proposal.yes_votes = proposal.yes_votes + 1;
    } else {
      proposal.no_votes = proposal.no_votes + 1;
    }
    
    self.proposals[proposal_id] = proposal;
    emit Voted(proposal_id, msg.sender, support);
  }
  
  method execute_proposal(int proposal_id) {
    if (!self.proposals[proposal_id]) {
      return "Proposal not found";
    }
    
    map proposal = self.proposals[proposal_id];
    if (time.now() <= proposal.end_time) {
      return "Voting period not ended";
    }
    
    if (proposal.executed) {
      return "Proposal already executed";
    }
    
    proposal.executed = true;
    self.proposals[proposal_id] = proposal;
    
    bool passed = proposal.yes_votes > proposal.no_votes;
    emit ProposalExecuted(proposal_id, passed, proposal.yes_votes, proposal.no_votes);
    return passed ? "Proposal passed" : "Proposal rejected";
  }
  
  event ProposalCreated {
    int proposal_id;
    string title;
    string description;
  }
  
  event Voted {
    int proposal_id;
    string voter;
    bool support;
  }
  
  event ProposalExecuted {
    int proposal_id;
    bool passed;
    int yes_votes;
    int no_votes;
  }
}`,
  },
  {
    title: 'Event System Demo',
    description: 'Demonstrates advanced event handling and state management',
    category: 'Advanced',
    difficulty: 'Advanced',
    icon: Zap,
    code: `protocol EventDemo {
  version: "1.0.0";
  owner: "0x1234567890abcdef";
  
  state {
    string current_state = "idle";
    int event_count = 0;
    array event_log;
    map user_actions;
  }
  
  method trigger_event(string event_type, string data) {
    self.event_count = self.event_count + 1;
    
    map event_data;
    event_data.type = event_type;
    event_data.data = data;
    event_data.timestamp = time.now();
    event_data.user = msg.sender;
    
    self.event_log.push(event_data);
    self.user_actions[msg.sender] = self.user_actions[msg.sender] + 1;
    
    if (event_type == "state_change") {
      self.current_state = data;
      emit StateChanged(data, event_data.timestamp);
    } else if (event_type == "user_action") {
      emit UserAction(msg.sender, data, event_data.timestamp);
    }
    
    emit EventTriggered(event_type, data, self.event_count);
  }
  
  method get_event_count() {
    return self.event_count;
  }
  
  method get_current_state() {
    return self.current_state;
  }
  
  method get_user_action_count(string user) {
    return self.user_actions[user];
  }
  
  event EventTriggered {
    string event_type;
    string data;
    int total_events;
  }
  
  event StateChanged {
    string new_state;
    int timestamp;
  }
  
  event UserAction {
    string user;
    string action;
    int timestamp;
  }
}`,
  },
]

export default function ExamplesPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Code Examples</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore real-world smart contract examples and learn Cardity programming patterns
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            From simple Hello World to complex DRC-20 tokens, discover how to build powerful smart contracts
          </p>
        </div>
      </section>

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
              href="https://github.com/cardity-org/cardity-core/tree/master/examples"
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
    </div>
  )
} 