
import React from 'react';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Product, Transaction } from '../types';

interface DashboardProps {
  products: Product[];
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, transactions }) => {
  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  
  const chartData = products.slice(0, 6).map(p => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
    stock: p.quantity,
    min: p.minStock
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">General Overview</h2>
          <p className="text-slate-500">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm">
            Quick Add
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={products.length.toString()} 
          change="+4.5%" 
          isPositive={true} 
          icon={<Package className="text-emerald-600" />} 
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Low Stock Alert" 
          value={lowStockCount.toString()} 
          change={`${lowStockCount > 0 ? '+1' : '0'}`} 
          isPositive={false} 
          icon={<AlertTriangle className="text-amber-600" />} 
          bgColor="bg-amber-50"
        />
        <StatCard 
          title="Total Inventory Value" 
          value={`$${totalValue.toLocaleString()}`} 
          change="+12.3%" 
          isPositive={true} 
          icon={<DollarSign className="text-emerald-600" />} 
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Active Transactions" 
          value={transactions.length.toString()} 
          change="+2" 
          isPositive={true} 
          icon={<TrendingUp className="text-blue-600" />} 
          bgColor="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stock Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Inventory Levels</h3>
            <select className="text-xs bg-slate-50 border-slate-200 rounded p-1">
              <option>Top 6 Products</option>
              <option>Lowest Stock</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.stock <= entry.min ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 max-h-[300px]">
            {transactions.map(t => (
              <div key={t.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  t.type === 'IN' ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  {t.type === 'IN' ? <ArrowDownRight className="w-5 h-5 text-emerald-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.productName}</p>
                  <p className="text-xs text-slate-500">
                    <span className={t.type === 'IN' ? 'text-emerald-600 font-medium' : 'text-red-600 font-medium'}>
                      {t.type} {t.quantity}
                    </span>
                    <span className="mx-1">•</span>
                    {new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 text-emerald-600 text-sm font-semibold hover:bg-emerald-50 rounded-lg transition-colors">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        {icon}
      </div>
      <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
        isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
      }`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {change}
      </div>
    </div>
    <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

export default Dashboard;
