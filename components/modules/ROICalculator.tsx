import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import Card from '../ui/Card';
import ViewToggle from '../ui/ViewToggle';
import CodeBlock from '../ui/CodeBlock';
import { ViewMode } from '../../types';

const ROICalculator: React.FC = () => {
  const [revenue, setRevenue] = useState(50); // In Millions
  const [maturity, setMaturity] = useState(1); // 0-3 scale
  const [viewMode, setViewMode] = useState<ViewMode>('executive');

  // Logic: Lower maturity = Higher impact potential
  const impactPercent = maturity === 0 ? 0.15 : maturity === 1 ? 0.08 : 0.03;
  const projectedGain = (revenue * impactPercent).toFixed(1);
  
  const engineeringCode = `class BusinessCaseBuilder:
    def __init__(self, current_revenue, data_maturity_score):
        self.revenue = current_revenue
        self.maturity = data_maturity_score
        
    def calculate_impact(self):
        multiplier = {
            "legacy": 0.15,  # 15% lift via basic hygiene
            "emerging": 0.08, # 8% lift via optimization
            "advanced": 0.03  # 3% lift via AI/ML
        }
        return self.revenue * multiplier[self.maturity]`;

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Strategic Value Engine</h3>
        </div>
        <ViewToggle view={viewMode} setView={setViewMode} />
      </div>

      {viewMode === 'executive' ? (
        <div className="flex flex-col flex-grow gap-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-1">
                <span>Annual Revenue</span>
                <span className="text-white">${revenue}M</span>
              </div>
              <input 
                type="range" min="10" max="500" value={revenue}
                onChange={(e) => setRevenue(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Data Maturity</label>
              <div className="grid grid-cols-4 gap-1">
                {['Legacy', 'Emerging', 'Modern', 'AI-Native'].map((level, idx) => (
                  <button 
                    key={level}
                    onClick={() => setMaturity(idx)}
                    className={`py-1 rounded text-[10px] font-medium border transition-all ${
                      maturity === idx 
                      ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/50' 
                      : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Dashboard */}
          <div className="bg-slate-950 rounded border border-slate-800 p-3 flex items-center justify-between relative overflow-hidden">
             <div className="absolute inset-0 bg-emerald-500/5"></div>
             <div className="relative z-10">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Projected Impact</div>
                <div className="text-2xl font-bold text-white">+${projectedGain}M</div>
             </div>
             <div className="relative z-10 text-right">
                 <div className="text-[10px] text-slate-500 font-mono mb-0.5">FORMULA</div>
                 <div className="text-[10px] text-emerald-400 font-mono">
                    ${revenue}M × {(impactPercent * 100).toFixed(0)}%
                 </div>
             </div>
          </div>

          <div className="pt-3 border-t border-slate-800 mt-auto">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong className="text-emerald-500">Why it matters:</strong> Moving from 'Legacy' to 'Modern' data practices typically unlocks 8-15% revenue lift through operational efficiency alone.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-40">
          <CodeBlock code={engineeringCode} />
        </div>
      )}
    </Card>
  );
};

export default ROICalculator;