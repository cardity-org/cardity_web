import Link from 'next/link'
import { Code, ExternalLink, ArrowRight, Star, Users, Coins, Vote } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

const examples = [
  {
    title: '投票合约',
    description: '一个简单的去中心化投票系统，支持创建投票、投票和查看结果',
    category: 'Governance',
    difficulty: 'Beginner',
    icon: Vote,
    code: `<-- SPDX-License-Identifier: MIT -->

protocol Voting {
  state {
    string title;
    string[] options;
    map<string, int> votes;
    bool active;
    int endTime;
  }
  
  method createVote(string _title, string[] _options, int duration) {
    self.title = _title;
    self.options = _options;
    self.active = true;
    self.endTime = now() + duration;
  }
  
  method vote(string option) {
    require(self.active, "Voting is not active");
    require(now() < self.endTime, "Voting has ended");
    
    if (self.votes[option] == 0) {
      self.votes[option] = 1;
    } else {
      self.votes[option] += 1;
    }
  }
  
  method getResults() -> map<string, int> {
    return self.votes;
  }
  
  event VoteCast(string voter, string option);
}`,
  },
  {
    title: 'DRC-20 代币',
    description: '基于 Dogecoin 的代币标准实现，支持转账、授权和余额查询',
    category: 'Token',
    difficulty: 'Intermediate',
    icon: Coins,
    code: `<-- SPDX-License-Identifier: MIT -->

protocol DRC20 {
  state {
    string name;
    string symbol;
    int totalSupply;
    map<string, int> balances;
    map<string, map<string, int>> allowances;
  }
  
  method constructor(string _name, string _symbol, int _totalSupply) {
    self.name = _name;
    self.symbol = _symbol;
    self.totalSupply = _totalSupply;
    self.balances[msg.sender] = _totalSupply;
  }
  
  method transfer(string to, int amount) -> bool {
    require(self.balances[msg.sender] >= amount, "Insufficient balance");
    
    self.balances[msg.sender] -= amount;
    self.balances[to] += amount;
    
    emit Transfer(msg.sender, to, amount);
    return true;
  }
  
  method approve(string spender, int amount) -> bool {
    self.allowances[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
  }
  
  method transferFrom(string from, string to, int amount) -> bool {
    require(self.balances[from] >= amount, "Insufficient balance");
    require(self.allowances[from][msg.sender] >= amount, "Insufficient allowance");
    
    self.balances[from] -= amount;
    self.balances[to] += amount;
    self.allowances[from][msg.sender] -= amount;
    
    emit Transfer(from, to, amount);
    return true;
  }
  
  event Transfer(string from, string to, int amount);
  event Approval(string owner, string spender, int amount);
}`,
  },
  {
    title: '众筹合约',
    description: '支持目标金额、截止时间和退款机制的众筹平台',
    category: 'Crowdfunding',
    difficulty: 'Advanced',
    icon: Users,
    code: `<-- SPDX-License-Identifier: MIT -->

protocol Crowdfunding {
  state {
    string title;
    string description;
    int goal;
    int raised;
    int deadline;
    bool finalized;
    map<string, int> contributions;
  }
  
  method createCampaign(string _title, string _description, int _goal, int _duration) {
    self.title = _title;
    self.description = _description;
    self.goal = _goal;
    self.deadline = now() + _duration;
    self.finalized = false;
  }
  
  method contribute() {
    require(!self.finalized, "Campaign is finalized");
    require(now() < self.deadline, "Campaign has ended");
    
    int amount = msg.value;
    self.raised += amount;
    self.contributions[msg.sender] += amount;
    
    emit Contribution(msg.sender, amount);
  }
  
  method finalize() {
    require(!self.finalized, "Already finalized");
    require(now() >= self.deadline, "Campaign not ended");
    
    self.finalized = true;
    
    if (self.raised >= self.goal) {
      emit CampaignSuccessful(self.raised);
    } else {
      emit CampaignFailed(self.raised);
    }
  }
  
  method refund() {
    require(self.finalized, "Campaign not finalized");
    require(self.raised < self.goal, "Campaign was successful");
    
    int amount = self.contributions[msg.sender];
    require(amount > 0, "No contribution to refund");
    
    self.contributions[msg.sender] = 0;
    // Transfer amount back to msg.sender
  }
  
  event Contribution(string contributor, int amount);
  event CampaignSuccessful(int totalRaised);
  event CampaignFailed(int totalRaised);
}`,
  },
]

export default function ExamplesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cardity 示例
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过实际示例学习 Cardity 智能合约开发，从简单到复杂，涵盖各种应用场景
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {examples.map((example, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-cardity-100 p-2 rounded-lg mr-3">
                  <example.icon className="w-6 h-6 text-cardity-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {example.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{example.category}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{example.difficulty}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cardity-100 text-cardity-800">
                  {example.category}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {example.difficulty}
                </span>
              </div>
              
              <Link
                href={`/examples/${example.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center text-cardity-600 hover:text-cardity-700 font-medium"
              >
                查看详情
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cardity-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          想要贡献示例？
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          我们欢迎社区贡献更多高质量的示例代码。你的示例可以帮助其他开发者更好地理解和使用 Cardity。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/cardity/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            提交示例
          </a>
          <Link href="/docs/getting-started" className="btn-secondary inline-flex items-center">
            <Code className="w-4 h-4 mr-2" />
            开始编写
          </Link>
        </div>
      </div>
    </div>
  )
} 