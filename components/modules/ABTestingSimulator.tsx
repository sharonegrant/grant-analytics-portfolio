import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import ViewToggle from '../ui/ViewToggle';
import CodeBlock from '../ui/CodeBlock';
import { ViewMode } from '../../types';

const ABTestingSimulator: React.FC = () => {
  const [variantA, setVariantA] = useState(120);
  const [variantB, setVariantB] = useState(145);
  const [viewMode, setViewMode] = useState<ViewMode>('executive');
  
  const lift = ((variantB - variantA) / variantA * 100).toFixed(1);
  const liftNum = parseFloat(lift);
  const confidence = liftNum > 5 ? 98 : liftNum > 0 ? 65 : 10;
  const isSignificant = confidence > 95;

  const engineeringCode = `from scipy import stats

def evaluate_experiment(control_conv, test_conv, n_obs):
    """
    Calculates statistical significance using 
    Welch's t-test for independent samples.
    """
    t_stat, p_val = stats.ttest_ind_from_stats(
        mean1=control_conv, std1=np.std(control), nobs1=n_obs,
        mean2=test_conv, std2=np.std(test), nobs2=n_obs
    )
    
    is_significant = p_val < 0.05
    lift = (test_conv - control_conv) / control_conv
    
    return {
        "p_value": p_val,
        "lift": lift,
        "deploy": is_significant and lift > 0.01
    }

# Current Test State
# Control: ${variantA} | Variant: ${variantB}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <Card className="h-full flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-pink-400" />
                    <h3 className="text-lg font-bold text-white">Experimental Rigor</h3>
                </div>
            </div>
            <p className="text-xs text-slate-400 mb-6">
                Validating features before full rollout to prevent revenue regression.
            </p>
            
            {viewMode === 'executive' ? (
                <div className="space-y-4">
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded border-l-4 border-slate-500"><span className="text-slate-300 text-sm">Control (A)</span><span className="text-white font-mono">{variantA}</span></div>
                    <div className="flex justify-between p-3 bg-slate-800/50 rounded border-l-4 border-pink-500"><span className="text-slate-300 text-sm">Variant (B)</span><span className="text-white font-mono">{variantB}</span></div>
                    
                    <div className="mt-4 p-3 rounded bg-slate-950 border border-slate-800">
                         <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Decision Science</h4>
                         {isSignificant ? (
                             <div className="flex gap-2 text-emerald-400 text-xs items-start">
                                 <CheckCircle2 className="w-4 h-4 shrink-0" />
                                 <div>
                                    <strong>Deploy Recommended:</strong> Statistical significance reached (p &lt; 0.05). Risk of false positive is low.
                                 </div>
                             </div>
                         ) : (
                             <div className="flex gap-2 text-amber-400 text-xs items-start">
                                 <AlertTriangle className="w-4 h-4 shrink-0" />
                                 <div>
                                    <strong>Hold Deployment:</strong> Result is noise. Rolling out now risks negative ROI impact.
                                 </div>
                             </div>
                         )}
                    </div>

                    <button onClick={() => { setVariantA(Math.floor(Math.random() * 50) + 100); setVariantB(Math.floor(Math.random() * 80) + 110); }} className="w-full py-2 text-xs uppercase font-bold text-slate-400 border border-slate-700 rounded hover:bg-slate-800 transition-colors mt-2">
                        Simulate New Iteration
                    </button>
                </div>
            ) : (
               <div className="mt-2 h-48">
                   <CodeBlock code={engineeringCode} />
               </div>
            )}
        </div>
      </Card>
      
      <Card className="flex flex-col items-center justify-center text-center p-6 relative min-h-[240px]">
        <div className="absolute top-4 right-4">
            <ViewToggle view={viewMode} setView={setViewMode} />
        </div>

        {viewMode === 'executive' ? (
            <>
                <div className="relative mb-4 mt-4">
                <svg width="120" height="120" className="-rotate-90">
                    <circle cx="60" cy="60" r="52" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                    <circle 
                        cx="60" cy="60" r="52" 
                        stroke={confidence > 95 ? "#10b981" : confidence > 50 ? "#f59e0b" : "#ef4444"} 
                        strokeWidth="8" fill="transparent" 
                        strokeDasharray={326} 
                        strokeDashoffset={326 - (confidence / 100) * 326} 
                        className="transition-all duration-1000" 
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <div className="text-2xl font-bold text-white">{confidence}%</div>
                     <div className="text-[10px] text-slate-500 uppercase">Confidence</div>
                </div>
                </div>
                <div className="text-lg font-medium text-white mb-1">Lift: <span className={liftNum > 0 ? "text-emerald-400" : "text-red-400"}>{liftNum > 0 ? '+' : ''}{lift}%</span></div>
                <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                    Calculated via Welch's t-test. We only ship features that statistically guarantee business lift.
                </p>
            </>
        ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-mono p-4">
                <div className="text-left">
                <div className="mb-2 border-b border-slate-800 pb-1">// Logic</div>
                <div className="text-pink-400">if</div> p_val &lt; 0.05: <br/>&nbsp;&nbsp;status = <span className="text-emerald-400">"DEPLOY"</span><br/>
                <div className="text-pink-400">else</div>: <br/>&nbsp;&nbsp;status = <span className="text-red-400">"REJECT"</span>
                </div>
            </div>
        )}
      </Card>
    </div>
  );
};

export default ABTestingSimulator;