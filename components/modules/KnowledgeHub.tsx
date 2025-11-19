import React, { useState, useEffect } from 'react';
import { Compass, Layers, Telescope, Radio, Globe, TrendingUp, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import { MARKET_UPDATES } from '../../constants';

const KnowledgeHub: React.FC = () => {
  const [sentiment, setSentiment] = useState(84);

  // Simulate subtle market sentiment fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(prev => Math.min(95, Math.max(70, prev + (Math.random() - 0.5) * 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const levels = [
    {
      icon: Compass,
      title: "Explorer",
      audience: "Beginner / Generalist",
      desc: "Understand the fundamental shift Generative AI brings to business analytics without the jargon.",
      action: "Why it matters"
    },
    {
      icon: Layers,
      title: "Practitioner",
      audience: "Manager / Analyst",
      desc: "Deep dive into how I structure ETL pipelines and validate ML models before deployment.",
      action: "View Architecture"
    },
    {
      icon: Telescope,
      title: "Visionary",
      audience: "Executive / CTO",
      desc: "Strategic implementation of AI governance, cost optimization, and competitive differentiation.",
      action: "Strategic Roadmap"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Educational Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, idx) => {
          const Icon = level.icon;
          return (
            <Card key={idx} className="relative overflow-hidden hover:bg-slate-900 transition-colors group border-t-4 border-t-slate-800 hover:border-t-blue-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-32 h-32 -mr-8 -mt-8" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:border-blue-500/50 transition-colors">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{level.title}</h4>
                <div className="text-xs text-slate-500 uppercase font-bold mb-4 tracking-wider">{level.audience}</div>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed min-h-[60px]">
                  {level.desc}
                </p>
                <button className="text-xs font-bold text-blue-400 flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider">
                  {level.action} <span className="text-lg leading-none">&rsaquo;</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Market Intelligence Terminal */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Live Feed */}
        <div className="flex-grow p-4 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800/50">
             <Radio className="w-4 h-4 text-red-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Global AI Intelligence Feed</span>
          </div>
          <div className="h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 space-y-3">
            {MARKET_UPDATES.map((update, i) => (
                <a 
                    href={update.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={i} 
                    className="flex gap-3 text-sm font-mono group hover:bg-slate-900/50 p-2 rounded transition-colors cursor-pointer"
                >
                    <span className="text-slate-600 whitespace-nowrap shrink-0">{update.time}</span>
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {update.text}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                </a>
            ))}
          </div>
        </div>

        {/* Right: Sentiment Index */}
        <div className="w-full lg:w-72 bg-slate-900/50 p-6 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5"></div>
            <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-blue-400">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Market Sentiment</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2 tabular-nums">{sentiment.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-2 text-emerald-500 text-sm font-medium bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-900/50">
                    <TrendingUp className="w-3 h-3" />
                    Bullish Outlook
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;