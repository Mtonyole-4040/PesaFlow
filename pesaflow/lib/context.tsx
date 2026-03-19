import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'payment';
  amount: number;
  description: string;
  date: string;
  contact?: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export interface GroupWallet {
  id: string;
  name: string;
  totalBalance: number;
  goal: number;
  members: {
    id: string;
    name: string;
    contribution: number;
  }[];
}

interface AppContextType {
  wallets: Wallet[];
  transactions: Transaction[];
  goals: Goal[];
  groupWallets: GroupWallet[];
  totalBalance: number;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateWalletBalance: (walletId: string, amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: '1',
      name: 'Food',
      balance: 45000,
      budget: 100000,
      spent: 70000,
      color: 'bg-green-500',
      icon: '🍽️'
    },
    {
      id: '2',
      name: 'Transport',
      balance: 25000,
      budget: 50000,
      spent: 35000,
      color: 'bg-blue-500',
      icon: '🚗'
    },
    {
      id: '3',
      name: 'Savings',
      balance: 200000,
      budget: 300000,
      spent: 100000,
      color: 'bg-purple-500',
      icon: '💰'
    },
    {
      id: '4',
      name: 'Business',
      balance: 150000,
      budget: 200000,
      spent: 50000,
      color: 'bg-orange-500',
      icon: '💼'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'sent',
      amount: 15000,
      description: 'Sent to Asha for groceries',
      date: '2024-01-15',
      contact: 'Asha'
    },
    {
      id: '2',
      type: 'received',
      amount: 50000,
      description: 'Salary payment',
      date: '2024-01-14',
      contact: 'Employer'
    },
    {
      id: '3',
      type: 'payment',
      amount: 8000,
      description: 'Dala transport fare',
      date: '2024-01-13',
      contact: 'Dala Driver'
    },
    {
      id: '4',
      type: 'sent',
      amount: 25000,
      description: 'Sent to John for business',
      date: '2024-01-12',
      contact: 'John'
    },
    {
      id: '5',
      type: 'payment',
      amount: 12000,
      description: 'Supermarket shopping',
      date: '2024-01-11',
      contact: 'Shoprite'
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Save for School Fees',
      targetAmount: 200000,
      currentAmount: 75000,
      deadline: '2024-06-01',
      category: 'Education'
    },
    {
      id: '2',
      title: 'Emergency Fund',
      targetAmount: 500000,
      currentAmount: 200000,
      deadline: '2024-12-31',
      category: 'Savings'
    }
  ]);

  const [groupWallets, setGroupWallets] = useState<GroupWallet[]>([
    {
      id: '1',
      name: 'VICOBA Group',
      totalBalance: 150000,
      goal: 500000,
      members: [
        { id: '1', name: 'Asha', contribution: 30000 },
        { id: '2', name: 'John', contribution: 25000 },
        { id: '3', name: 'Neema', contribution: 40000 },
        { id: '4', name: 'Kelvin', contribution: 20000 },
        { id: '5', name: 'Fatuma', contribution: 35000 }
      ]
    }
  ]);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateWalletBalance = (walletId: string, amount: number) => {
    setWallets(prev => prev.map(wallet =>
      wallet.id === walletId
        ? { ...wallet, balance: wallet.balance + amount, spent: wallet.spent - amount }
        : wallet
    ));
  };

  return (
    <AppContext.Provider value={{
      wallets,
      transactions,
      goals,
      groupWallets,
      totalBalance,
      addTransaction,
      updateWalletBalance
    }}>
      {children}
    </AppContext.Provider>
  );
};