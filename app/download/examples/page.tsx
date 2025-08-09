import Link from 'next/link'
import { ArrowRight, Download, Code, Github, ExternalLink, FileText, Package } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

const examples = [
  {
    name: 'Hello World',
    description: 'Simple Hello World protocol demonstrating basic Cardity syntax',
    filename: 'hello.car',
    size: '2 KB',
    difficulty: 'Beginner',
    category: 'Basic',
    features: ['State variables', 'Methods', 'Events'],
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
    downloadUrl: 'https://github.com/cardity-org/cardity-core/blob/master/examples/hello.car'
  },
  {
    name: 'Counter Protocol',
    description: 'Basic counter with increment, decrement, and state management',
    filename: 'counter.car',
    size: '3 KB',
    difficulty: 'Beginner',
    category: 'Basic',
    features: ['State management', 'Method parameters', 'Conditional logic'],
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
    downloadUrl: 'https://github.com/cardity-org/cardity-core/blob/master/examples/counter.car'
  },
  {
    name: 'DRC-20 Token',
    description: 'Complete DRC-20 token implementation with deploy, mint, and transfer',
    filename: 'drc20_token.car',
    size: '8 KB',
    difficulty: 'Intermediate',
    category: 'Token',
    features: ['DRC-20 standard', 'Token deployment', 'Mint/Transfer', 'Events'],
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
    downloadUrl: 'https://github.com/cardity-org/cardity-core/blob/master/examples/drc20_token.car'
  },
  {
    name: 'Simple Wallet',
    description: 'Basic wallet with deposit, withdraw, and balance management',
    filename: 'wallet_protocol.car',
    size: '5 KB',
    difficulty: 'Intermediate',
    category: 'Wallet',
    features: ['Balance management', 'Transaction history', 'Owner control'],
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
    downloadUrl: 'https://github.com/cardity-org/cardity-core/blob/master/examples/wallet_protocol.car'
  },
  {
    name: 'Voting System',
    description: 'Decentralized voting system with proposal creation and voting',
    filename: 'voting.car',
    size: '6 KB',
    difficulty: 'Advanced',
    category: 'Governance',
    features: ['Proposal management', 'Voting mechanism', 'Result tracking'],
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
    downloadUrl: 'https://github.com/cardity-org/cardity-core/blob/master/examples/voting.car'
  },
  {
    name: 'Event System Demo',
    description: 'Demonstration of Cardity event system with multiple event types',
    filename: 'event_demo.car',
    size: '4 KB',
    difficulty: 'Intermediate',
    category: 'Advanced',
    features: ['Event system', 'User management', 'System events'],
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
    downloadUrl: 'https://github.com/cardity-org/cardity-core/blob/master/examples/event_demo.car'
  }
]

const categories = [
  { name: 'All', count: examples.length },
  { name: 'Basic', count: examples.filter(ex => ex.category === 'Basic').length },
  { name: 'Token', count: examples.filter(ex => ex.category === 'Token').length },
  { name: 'Wallet', count: examples.filter(ex => ex.category === 'Wallet').length },
  { name: 'Governance', count: examples.filter(ex => ex.category === 'Governance').length },
  { name: 'Advanced', count: examples.filter(ex => ex.category === 'Advanced').length }
]

export default function ExamplesDownloadPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">
          Example Projects
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Download ready-to-use Cardity example projects and templates to learn and build upon
        </p>
      </div>

      {/* Categories Filter */}
      <div className="mb-12">
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.name}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {examples.map((example, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {example.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    example.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    example.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {example.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {example.category}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">
                  {example.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {example.filename}
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    {example.size}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {example.features.map(feature => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code Preview */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-2">Code Preview:</h4>
              <div className="max-h-48 overflow-y-auto">
                <CodeBlock
                  code={example.code}
                  language="cardity"
                  showLineNumbers={false}
                />
              </div>
            </div>
            
            {/* Download Actions */}
            <div className="flex gap-3">
              <a
                href={example.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center flex-1 justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
              <a
                href={example.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Start Guide */}
      <div className="mt-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            How to Use Examples
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">1. Download and Setup</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Download example
wget https://github.com/cardity-org/cardity-core/raw/master/examples/hello.car

# Compile example
cardityc hello.car --format carc

# Run example
cardity_runtime hello.car set_message "Hello, World!"
cardity_runtime hello.car get_message`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">2. Modify and Experiment</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Edit the .car file
nano hello.car

# Add new methods or modify state
# Recompile and test
cardityc hello.car --validate
cardity_runtime hello.car your_new_method`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Need More Examples?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore the complete collection of examples and contribute your own
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/cardity-org/cardity-core/tree/master/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <Github className="w-4 h-4 mr-2" />
              Browse All Examples
            </a>
            <Link href={`/docs/getting-started?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="btn-secondary inline-flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Learn Cardity
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 