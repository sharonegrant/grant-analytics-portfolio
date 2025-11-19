import React from 'react';
import { Industry } from '../../types';
import { Building2, ShoppingBag, Server } from 'lucide-react';

interface IndustrySelectorProps {
  current: Industry;
  onSelect: (ind: Industry) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ current, onSelect }) => {
  const industries: { id: Industry; label: string; icon: any }[] = [
    { id: 'finance', label: 'Finance & Investment', icon: Building2 },
    { id: 'tech', label: 'Enterprise Tech', icon: Server },
    { id: 'retail', label: 'Retail & Operations', icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      {industries.map((ind) => {
        const Icon = ind.icon;
        const isActive = current === ind.id;
        return (
          <button
            key={ind.id}
            onClick={() => onSelect(ind.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300
              ${isActive 
                ? 'bg-slate-800 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transform scale-105' 
                : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-600'}`} />
            {ind.label}
          </button>
        );
      })}
    </div>
  );
};

export default IndustrySelector;