import React from 'react';
import { PlusCircle, Filter, TrendingUp, TrendingDown, Wallet, ShoppingBag, Briefcase, Utensils } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Expenses = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Expense Tracker</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
              <PlusCircle className="w-5 h-5" /> Add Expense
            </button>
            <button className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg">
              <Filter className="w-5 h-5" /> Filter
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-600 text-white p-5 rounded-lg shadow-md">
            <p className="text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">$24,562.00</h2>
            <p className="text-xs mt-1">↑ +2.4% from last month</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-sm">Income</p>
            <h2 className="text-2xl font-bold text-green-600">$8,942.00</h2>
            <p className="text-xs text-green-600 mt-1">+12.5%</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-sm">Expenses</p>
            <h2 className="text-2xl font-bold text-red-600">$5,321.00</h2>
            <p className="text-xs text-red-600 mt-1">+8.2%</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <a href="#" className="text-blue-600 text-sm font-medium">View All</a>
          </div>

          <div className="space-y-4">
            {/* Transaction Item */}
            {[
              { name: 'Shopping', place: 'Amazon.com', amount: '-$142.00', date: 'Today', icon: <ShoppingBag className="text-blue-500" /> },
              { name: 'Salary', place: 'Employer Inc.', amount: '+$4,500.00', date: 'Yesterday', icon: <Briefcase className="text-green-500" /> },
              { name: 'Restaurant', place: "Foodie's Place", amount: '-$85.00', date: '2 days ago', icon: <Utensils className="text-red-500" /> }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.place}</p>
                  </div>
                </div>
                <div className={`font-medium ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.amount}
                </div>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expenses;
