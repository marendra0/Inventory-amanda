
import React, { useState } from 'react';
import { Package, Mail, Lock, User, ShieldCheck, ArrowRight, Leaf } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onAuthSuccess: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    const mockUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (formData.email.split('@')[0]) : formData.name,
      email: formData.email,
      role: isLogin ? (formData.email.includes('admin') ? 'ADMIN' : 'USER') : role,
      avatar: `https://picsum.photos/seed/${formData.email}/100`,
    };
    onAuthSuccess(mockUser);
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20"></div>

      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-200/50 flex flex-col md:flex-row overflow-hidden relative z-10 border border-emerald-100">
        
        {/* Left Side: Branding/Info */}
        <div className="md:w-5/12 bg-emerald-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Leaf className="w-64 h-64 rotate-45" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">EcoInventory</h1>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">Manage with Purpose.</h2>
            <p className="text-emerald-100/80 text-lg leading-relaxed">
              Join the future of sustainable inventory management with real-time AI insights.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-emerald-500/50">
            <p className="text-sm font-medium text-emerald-200 uppercase tracking-widest mb-2">Platform Features</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <ShieldCheck className="w-4 h-4" /> Secure Admin Controls
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <ShieldCheck className="w-4 h-4" /> Real-time Analytics
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-16">
          <div className="max-w-md mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-slate-500">
                {isLogin ? 'Enter your details to access your dashboard' : 'Fill in the form to start managing inventory'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                      placeholder="John Doe"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    placeholder="name@company.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Register as:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('USER')}
                      className={`py-3 px-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${
                        role === 'USER' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      <User className="w-4 h-4" /> User
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('ADMIN')}
                      className={`py-3 px-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${
                        role === 'ADMIN' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" /> Admin
                    </button>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-emerald-600 font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up Now' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
