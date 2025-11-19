import React, { useState } from 'react';
import { ShieldCheck, Zap, ShoppingBag, ChevronRight } from 'lucide-react';
import { Industry } from '../../types';
import { INDUSTRY_CONTENT } from '../../constants';
import Card from '../ui/Card';

const GrantEdge: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState<Industry>('finance');
  const content = INDUSTRY_CONTENT[activeIndustry];
  
  const industries: { id: Industry; label: string; icon: any }[] = [
    { id: 'finance', label: 'Finance & Investment', icon: ShieldCheck },
    { id: 'tech', label: 'Enterprise Tech', icon: Zap },
    { id: 'retail', label: 'Retail & Operations', icon: ShoppingBag },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: Strategy Selector */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Select Your Sector</div>
        {industries.map((ind) => {
          const Icon = ind.icon;
          const isActive = activeIndustry === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => setActiveIndustry(ind.id)}
              className={`
                group flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300
                ${isActive 
                  ? 'bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-900/20' 
                  : 'bg-slate-900/30 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {ind.label}
                </span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-blue-500" />}
            </button>
          );
        })}
      </div>

      {/* Right: Dynamic Content Panel */}
      <div className="lg:col-span-8">
        <Card className="h-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800 relative overflow-hidden flex flex-col justify-center p-8 md:p-12">
           {/* Background Accent */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Strategic Alignment
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {content.edgeTitle}
              </h3>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                {content.edgeDesc}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-800/50 flex items-center gap-4">
                 <div className="text-sm text-slate-500 font-medium">Delivering results for:</div>
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">M</div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">CB</div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">+</div>
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default GrantEdge;