import Link from 'next/link'
import { ArrowRight, Code, FileText, Settings, Database } from 'lucide-react'
import CodeBlock from '@/components/CodeBlock'

export default function ReferencePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          语言参考
        </h1>
        <p className="text-lg text-gray-600">
          完整的 Cardity 语言语法和特性说明
        </p>
      </div>

      <div className="space-y-12">
        {/* SPDX License */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-cardity-600" />
            SPDX License 标识
          </h2>
          <p className="text-gray-600 mb-6">
            每个 Cardity 合约文件都应该以 SPDX 许可证标识开头：
          </p>
          <CodeBlock
            code={`<-- SPDX-License-Identifier: MIT -->`}
            language="cardity"
          />
          <p className="text-sm text-gray-500 mt-2">
            支持的许可证包括：MIT、GPL-3.0、Apache-2.0 等
          </p>
        </section>

        {/* Protocol Structure */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Code className="w-6 h-6 mr-3 text-cardity-600" />
            协议结构
          </h2>
          <p className="text-gray-600 mb-6">
            Protocol 是 Cardity 合约的基本单位，类似于 Solidity 中的 Contract：
          </p>
          <CodeBlock
            code={`protocol MyContract {
  // 状态变量
  state {
    string name;
    int balance;
  }
  
  // 方法
  method setName(string newName) {
    self.name = newName;
  }
  
  // 事件
  event NameChanged(string oldName, string newName);
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* State Variables */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3 text-cardity-600" />
            状态变量
          </h2>
          <p className="text-gray-600 mb-6">
            状态变量存储在 UTXO 中，支持以下数据类型：
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">基本类型</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-1 rounded">int</code> - 整数类型</li>
                <li><code className="bg-gray-100 px-1 rounded">string</code> - 字符串类型</li>
                <li><code className="bg-gray-100 px-1 rounded">bool</code> - 布尔类型</li>
                <li><code className="bg-gray-100 px-1 rounded">address</code> - 地址类型</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">复合类型</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-1 rounded">array</code> - 数组类型</li>
                <li><code className="bg-gray-100 px-1 rounded">map</code> - 映射类型</li>
                <li><code className="bg-gray-100 px-1 rounded">struct</code> - 结构体类型</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <CodeBlock
              code={`state {
  // 基本类型
  string name;
  int age;
  bool isActive;
  address owner;
  
  // 复合类型
  string[] tags;
  map<string, int> scores;
  User[] users;
}

struct User {
  string name;
  int age;
  bool verified;
}`}
              language="cardity"
              showLineNumbers={true}
            />
          </div>
        </section>

        {/* Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-cardity-600" />
            方法
          </h2>
          <p className="text-gray-600 mb-6">
            方法是合约的可执行函数，可以修改状态、返回值或触发事件：
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">基本方法</h3>
              <CodeBlock
                code={`method setName(string newName) {
  self.name = newName;
  emit NameChanged(self.name, newName);
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">带返回值的方法</h3>
              <CodeBlock
                code={`method getName() -> string {
  return self.name;
}

method calculate(int a, int b) -> int {
  return a + b;
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">构造函数</h3>
              <CodeBlock
                code={`method constructor(string _name, int _initialBalance) {
  self.name = _name;
  self.balance = _initialBalance;
  self.owner = msg.sender;
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Events */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            事件
          </h2>
          <p className="text-gray-600 mb-6">
            事件用于记录合约执行过程中的重要信息：
          </p>
          
          <CodeBlock
            code={`// 事件声明
event Transfer(string from, string to, int amount);
event UserRegistered(string name, int timestamp);

// 触发事件
method transfer(string to, int amount) {
  self.balance -= amount;
  emit Transfer(msg.sender, to, amount);
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* Control Structures */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            控制结构
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">条件语句</h3>
              <CodeBlock
                code={`method processPayment(int amount) {
  if (self.balance >= amount) {
    self.balance -= amount;
    emit PaymentProcessed(amount);
  } else {
    emit InsufficientFunds(self.balance, amount);
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">循环</h3>
              <CodeBlock
                code={`method processArray(string[] items) {
  for (int i = 0; i < items.length; i++) {
    self.processedItems.push(items[i]);
  }
}`}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>
        </section>

        {/* Global Variables */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            全局变量
          </h2>
          <p className="text-gray-600 mb-6">
            Cardity 提供了一些全局变量来访问合约执行上下文：
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">常用全局变量</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-1 rounded">msg.sender</code> - 当前调用者地址</li>
                <li><code className="bg-gray-100 px-1 rounded">msg.value</code> - 发送的 Dogecoin 数量</li>
                <li><code className="bg-gray-100 px-1 rounded">now()</code> - 当前时间戳</li>
                <li><code className="bg-gray-100 px-1 rounded">self</code> - 当前合约实例</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">使用示例</h3>
              <CodeBlock
                code={`method deposit() {
  self.balance += msg.value;
  emit Deposit(msg.sender, msg.value, now());
}`}
                language="cardity"
              />
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            错误处理
          </h2>
          <p className="text-gray-600 mb-6">
            使用 require 语句进行条件检查和错误处理：
          </p>
          
          <CodeBlock
            code={`method withdraw(int amount) {
  require(self.balance >= amount, "Insufficient balance");
  require(amount > 0, "Amount must be positive");
  
  self.balance -= amount;
  emit Withdrawal(msg.sender, amount);
}`}
            language="cardity"
            showLineNumbers={true}
          />
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            下一步
          </h2>
          
          <div className="bg-cardity-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              现在你已经了解了 Cardity 的基本语法，接下来可以：
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                学习标准库的使用方法
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                了解 CLI 工具的使用
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-cardity-600" />
                查看更多示例代码
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs/standard-library" className="btn-primary inline-flex items-center">
                标准库
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/docs/cli" className="btn-secondary inline-flex items-center">
                CLI 工具
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 