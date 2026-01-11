
import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles, RefreshCw, CheckCircle, ChevronRight, BrainCircuit } from 'lucide-react';
import { Product } from '../types';
import { getInventoryInsights } from '../services/geminiService';

interface AIInsightsProps {
  products: Product[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ products }) => {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (products.length === 0) return;
    setLoading(true);
    try {
      const result = await getInventoryInsights(products);
      setInsights(result || "No specific insights at this time.");
    } catch (err) {
      console.error(err);
      setInsights("Failed to load insights. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            AI Smart Insights <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
          </h2>
          <p className="text-slate-500">Advanced analysis of your inventory data to boost efficiency.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 text-emerald-600"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <BrainCircuit className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Inventory Optimization Report</h3>
                  <p className="text-xs text-slate-400">Powered by Gemini 3 Flash</p>
                </div>
              </div>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-amber-500" />
                  </div>
                  <p className="animate-pulse">Analyzing stock levels and patterns...</p>
                </div>
              ) : (
                <div className="prose prose-emerald max-w-none">
                  {insights.split('\n').map((line, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard 
              title="Demand Forecasting"
              description="Expected 20% increase in Apparel category next month based on historical trends."
              tag="Predictive"
            />
            <InsightCard 
              title="Dead Stock Alert"
              description="3 items in Accessories haven't moved in 60 days. Consider a clearance sale."
              tag="Alert"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              Eco-Efficiency Score <CheckCircle className="w-5 h-5 text-emerald-400" />
            </h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-bold">92</span>
              <span className="text-emerald-400 font-medium mb-1">/ 100</span>
            </div>
            <p className="text-emerald-100 text-sm mb-6">Your inventory management is more efficient than 88% of similar businesses.</p>
            <div className="space-y-3">
              <EfficiencyStat label="Stock Turnover" value="8.5x" />
              <EfficiencyStat label="Order Accuracy" value="99.2%" />
              <EfficiencyStat label="Storage Waste" value="4.1%" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Quick Recommendations</h3>
            <div className="space-y-4">
              <RecommendationItem text="Restock Solar Chargers before Monday" />
              <RecommendationItem text="Bundle Eco Mug with Water Bottle" />
              <RecommendationItem text="Update price for Organic Cotton Tee" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ title: string, description: string, tag: string }> = ({ title, description, tag }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-200 transition-colors shadow-sm">
    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2 block">{tag}</span>
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const EfficiencyStat: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-emerald-800/50">
    <span className="text-emerald-200 text-sm">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

const RecommendationItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 group hover:bg-emerald-50 transition-colors cursor-pointer">
    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
    <span className="text-sm text-slate-600 group-hover:text-emerald-700 flex-1">{text}</span>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
  </div>
);

export default AIInsights;
