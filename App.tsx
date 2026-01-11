
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Lightbulb, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  ArrowUpRight, 
  ArrowDownLeft,
  Loader2,
  Camera,
  X,
  LogOut
} from 'lucide-react';
import { Product, Transaction, View, User } from './types';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/InventoryList';
import AIInsights from './pages/AIInsights';
import Auth from './pages/Auth';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Initialize with dummy data
  useEffect(() => {
    const dummyProducts: Product[] = [
      { id: '1', name: 'Eco Water Bottle', category: 'Accessories', sku: 'WB-001', quantity: 45, minStock: 20, price: 25.99, description: 'Stainless steel reusable bottle.', updatedAt: new Date().toISOString() },
      { id: '2', name: 'Organic Cotton Tee', category: 'Apparel', sku: 'TS-102', quantity: 12, minStock: 15, price: 19.50, description: 'Soft sustainable cotton.', updatedAt: new Date().toISOString() },
      { id: '3', name: 'Bamboo Toothbrush', category: 'Health', sku: 'BT-505', quantity: 120, minStock: 50, price: 4.99, description: 'Biodegradable bamboo handle.', updatedAt: new Date().toISOString() },
      { id: '4', name: 'Solar Charger', category: 'Electronics', sku: 'SC-999', quantity: 8, minStock: 10, price: 89.00, description: 'Portable solar power bank.', updatedAt: new Date().toISOString() },
    ];
    setProducts(dummyProducts);

    const dummyTransactions: Transaction[] = [
      { id: 't1', productId: '1', productName: 'Eco Water Bottle', type: 'IN', quantity: 20, date: new Date().toISOString(), user: 'Admin' },
      { id: 't2', productId: '2', productName: 'Organic Cotton Tee', type: 'OUT', quantity: 5, date: new Date().toISOString(), user: 'Manager' },
    ];
    setTransactions(dummyTransactions);
  }, []);

  const addProduct = (product: Product) => setProducts([...products, product]);
  const updateProduct = (updated: Product) => setProducts(products.map(p => p.id === updated.id ? updated : p));
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  const handleLogout = () => {
    setUser(null);
    setActiveView('dashboard');
  };

  if (!user) {
    return <Auth onAuthSuccess={(authenticatedUser) => setUser(authenticatedUser)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard products={products} transactions={transactions} />;
      case 'inventory':
        return <InventoryList products={products} onAdd={addProduct} onUpdate={updateProduct} onDelete={deleteProduct} />;
      case 'insights':
        return <AIInsights products={products} />;
      default:
        return <Dashboard products={products} transactions={transactions} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-full z-20`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Package className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && <h1 className="font-bold text-xl text-emerald-900 tracking-tight">EcoInventory</h1>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            collapsed={!isSidebarOpen} 
            onClick={() => setActiveView('dashboard')} 
          />
          <NavItem 
            icon={<Package />} 
            label="Inventory" 
            active={activeView === 'inventory'} 
            collapsed={!isSidebarOpen} 
            onClick={() => setActiveView('inventory')} 
          />
          <NavItem 
            icon={<Lightbulb />} 
            label="AI Insights" 
            active={activeView === 'insights'} 
            collapsed={!isSidebarOpen} 
            onClick={() => setActiveView('insights')} 
          />
          <NavItem 
            icon={<Settings />} 
            label="Settings" 
            active={activeView === 'settings'} 
            collapsed={!isSidebarOpen} 
            onClick={() => setActiveView('settings')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-emerald-50 text-emerald-700 transition-colors"
          >
            {isSidebarOpen ? 'Collapse Menu' : <ArrowUpRight className="rotate-45" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products, orders, categories..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:text-emerald-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <div className="flex items-center justify-end gap-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="relative group">
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border-2 border-emerald-100 cursor-pointer"
                />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, collapsed, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'}`}>{icon}</span>
    {!collapsed && <span className="font-medium">{label}</span>}
  </button>
);

export default App;
