import React, { useState } from 'react';
import { Search, Bot, Brain } from 'lucide-react';
import Card from '../ui/Card';
import ViewToggle from '../ui/ViewToggle';
import Button from '../ui/Button';
import CodeBlock from '../ui/CodeBlock';
import { ViewMode } from '../../types';
import { generateInsightWithGemini } from '../../services/geminiService';

const DashboardPreview: React.FC = () => {
  const [aiInsight, setAiInsight] = useState("Click the button to generate an executive summary of this dashboard using Grant Analytics AI.");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('executive');

  const generateInsight = async () => {
    setLoading(true);
    const text = await generateInsightWithGemini();
    setAiInsight(text);
    setLoading(false);
  };

  const engineeringCode = `-- DBT Model: dim_customers_daily
WITH daily_stats AS (
  SELECT 
    date_trunc('day', event_time) as day,
    count(distinct user_id) as active_users,
    sum(case when event_type = 'churn' then 1 else 0 end) as churn_events
  FROM raw.app_events
  WHERE event_time > current_date - interval '30 days'
  GROUP BY 1
),
ltv_calc AS (
  SELECT 
    avg(revenue) as avg_ltv 
  FROM finance.stripe_charges
  WHERE status = 'succeeded'
)
SELECT 
  ds.*,
  lc.avg_ltv,
  (ds.churn_events::float / ds.active_users) as churn_rate
FROM daily_stats ds
CROSS JOIN ltv_calc lc`;

  return (
    <Card className="col-span-full border-slate-800 bg-slate-950">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-orange-400" />
          Automated Executive Reporting
        </h3>
        <div className="flex items-center gap-4">
            <ViewToggle view={viewMode} setView={setViewMode} />
            {viewMode === 'executive' && (
                <Button onClick={generateInsight} variant="ai" icon={Brain} disabled={loading}>
                {loading ? "Analyzing Metrics..." : "Generate AI Insight"}
                </Button>
            )}
        </div>
      </div>

      {viewMode === 'executive' ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="text-slate-500 text-xs uppercase mb-1">Customer LTV</div>
                <div className="text-2xl font-bold text-white">$2,850</div>
                <div className="text-emerald-500 text-xs mt-1">+12.5% YoY</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="text-slate-500 text-xs uppercase mb-1">Churn Risk</div>
                <div className="text-2xl font-bold text-white">4.2%</div>
                <div className="text-red-400 text-xs mt-1">+0.8% (Alert)</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="text-slate-500 text-xs uppercase mb-1">Data Coverage</div>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-slate-400 text-xs mt-1">Stable</div>
                </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex gap-4 items-start">
                <Bot className="w-6 h-6 text-orange-400 mt-1 shrink-0" />
                <div>
                <h4 className="text-orange-400 font-bold text-sm mb-2">AI Executive Summary</h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {loading ? <span className="animate-pulse">Analyzing 3,402 data points via Gemini API...</span> : aiInsight}
                </p>
                </div>
            </div>
        </>
      ) : (
          <div className="h-64">
            <CodeBlock code={engineeringCode} language="sql" />
          </div>
      )}
    </Card>
  );
};

export default DashboardPreview;