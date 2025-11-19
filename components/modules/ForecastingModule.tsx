import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import ViewToggle from '../ui/ViewToggle';
import CodeBlock from '../ui/CodeBlock';
import { ViewMode } from '../../types';

const ForecastingModule: React.FC = () => {
  const [spend, setSpend] = useState(50);
  const [viewMode, setViewMode] = useState<ViewMode>('executive');

  const generatePoints = (marketingSpend: number) => {
    const points = [];
    for(let i=0; i<12; i++) {
      const baseline = 100 + (i * 5);
      const lift = (marketingSpend * 1.5) * (Math.log(i + 2));
      points.push(baseline + lift);
    }
    return points;
  };
  const dataPoints = generatePoints(spend);
  const maxVal = Math.max(...dataPoints);

  const engineeringCode = `from sklearn.linear_model import LinearRegression
import numpy as np

class RevenueForecaster:
    def __init__(self):
        self.model = LinearRegression()
        
    def train(self, historic_data):
        """
        Trains model on historic marketing spend vs revenue.
        Includes seasonality adjustment factor.
        """
        X = historic_data[['marketing_spend', 'seasonality_index']]
        y = historic_data['revenue']
        self.model.fit(X, y)
        
    def predict_scenario(self, proposed_spend):
        # Simulating logarithmic diminishing returns
        base_impact = self.model.predict([[proposed_spend, 1.0]])
        return np.log(base_impact) * self.scaling_factor

# Instantiate and run scenario analysis
forecaster = RevenueForecaster()
q4_projection = forecaster.predict_scenario(spend=${spend}000)`;

  return (
    <Card className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-8 flex-grow">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Strategic Forecasting
            </h3>
            <div className="md:hidden mb-4"><ViewToggle view={viewMode} setView={setViewMode} /></div>
          </div>
         
          <p className="text-slate-400 text-sm mt-2 mb-6">
            Predictive modeling for risk mitigation. Adjust allocation to see Q4 impact.
          </p>
          
          {viewMode === 'executive' ? (
            <div className="space-y-4 mt-auto">
              <input 
                type="range" 
                min="10" max="100" 
                value={spend} 
                onChange={(e) => setSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Marketing Spend</span>
                <span className="text-2xl font-bold text-purple-400">${spend}k</span>
              </div>
            </div>
          ) : (
             <div className="text-xs text-slate-500 italic mb-4 mt-auto">
                // Model parameters adjust dynamically based on inputs
             </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
            <div className="hidden md:flex justify-end mb-4">
                <ViewToggle view={viewMode} setView={setViewMode} />
            </div>
            {viewMode === 'executive' ? (
                <div className="h-64 relative bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 flex-grow">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[0, 25, 50, 75, 100].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />)}
                    <path d={`M ${dataPoints.map((val, i) => `${(i/11)*100},${100 - (val/maxVal)*80}`).join(' L ')}`} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <path d={`M 0,100 ${dataPoints.map((val, i) => `L ${(i/11)*100},${100 - (val/maxVal)*80}`).join(' ')} L 100,100 Z`} fill="url(#gradient)" opacity="0.2" />
                    <defs><linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#a855f7" stopOpacity="0" /></linearGradient></defs>
                </svg>
                <div className="absolute top-2 right-2 bg-slate-900/80 px-3 py-1 rounded border border-slate-700 text-xs text-white">
                    Proj. Rev: <span className="text-purple-400 font-bold">${Math.round(dataPoints[11])}k</span>
                </div>
                </div>
            ) : (
                <div className="h-64">
                    <CodeBlock code={engineeringCode} />
                </div>
            )}
        </div>
      </div>
    </Card>
  );
};

export default ForecastingModule;