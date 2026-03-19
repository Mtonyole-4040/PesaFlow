import React from 'react';
import { useApp } from '../lib/context';
import { WalletCard, TransactionItem, SpendingChart, QuickActionButton } from './ui';

const Dashboard: React.FC = () => {
  const { wallets, transactions, totalBalance } = useApp();

  const spendingData = wallets.map(wallet => ({
    name: wallet.name,
    value: wallet.spent,
    color: wallet.color.replace('bg-', '').replace('-500', '')
  }));

  const handleSendMoney = () => {
    // Navigate to send money page
    console.log('Send money clicked');
  };

  const handlePayBills = () => {
    // Navigate to pay bills page
    console.log('Pay bills clicked');
  };

  const handleAddMoney = () => {
    // Navigate to add money page
    console.log('Add money clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">PesaFlow</h1>
            <p className="text-green-100">Welcome back, Asha!</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            👤
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-green-100 text-sm">Total Balance</p>
          <h2 className="text-3xl font-bold">TZS {totalBalance.toLocaleString()}</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallets */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Wallets</h3>
          <div className="grid grid-cols-1 gap-4">
            {wallets.map(wallet => (
              <WalletCard key={wallet.id} wallet={wallet} />
            ))}
          </div>
        </div>

        {/* Spending Analytics */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Analytics</h3>
          <SpendingChart data={spendingData} />
          <div className="mt-4 space-y-2">
            {spendingData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">TZS {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Financial Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="text-yellow-600">💡</div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Spending Alert</p>
                <p className="text-sm text-yellow-700">You spent 30% more on food this week compared to last month.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="text-green-600">🎯</div>
              <div>
                <p className="text-sm font-medium text-green-800">Goal Progress</p>
                <p className="text-sm text-green-700">You're on track to reach your school fees goal in 4 months.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600">💰</div>
              <div>
                <p className="text-sm font-medium text-blue-800">Savings Tip</p>
                <p className="text-sm text-blue-700">Save TZS 5,000 daily to build your emergency fund faster.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-0">
            {transactions.slice(0, 5).map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <QuickActionButton
              icon="📤"
              label="Send"
              onClick={handleSendMoney}
              color="bg-blue-600 hover:bg-blue-700"
            />
            <QuickActionButton
              icon="💳"
              label="Pay"
              onClick={handlePayBills}
              color="bg-green-600 hover:bg-green-700"
            />
            <QuickActionButton
              icon="➕"
              label="Add Money"
              onClick={handleAddMoney}
              color="bg-purple-600 hover:bg-purple-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;