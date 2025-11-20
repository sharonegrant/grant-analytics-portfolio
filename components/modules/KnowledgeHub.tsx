
import React, { useState, useEffect } from 'react';
import { Compass, Layers, Telescope, Radio, Globe, TrendingUp, ExternalLink, ArrowRight, Info } from 'lucide-react';
import Card from '../ui/Card';
import { MARKET_UPDATES } from '../../constants';
import { MarketUpdate } from '../../types';

const KnowledgeHub: React.FC = () => {
  const [sentiment, setSentiment] = useState(84);
  const [newsFeed, setNewsFeed] = useState<MarketUpdate[]>(MARKET_UPDATES);

  // Simulate subtle market sentiment fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(prev => Math.min(95, Math.max(70, prev + (Math.random() - 0.5) * 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Real-time AI News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // We use rss2json to bridge the CORS gap for client-side fetching
        // Query: "Artificial Intelligence Enterprise Business"
        const RSS_URL = encodeURIComponent("https://news.google.com/rss/search?q=Artificial+Intelligence+Business+Enterprise+Strategy&hl=en-US&gl=US&ceid=US:en");
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
          const formattedNews: MarketUpdate[] = data.items.slice(0, 8).map((item: any) => {
            // Format date to "10:30 AM" or "Yesterday"
            const date = new Date(item.pubDate);
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return {
              time: timeStr,
              text: item.title.split(' - ')[0], // Remove publisher name from end of title for cleaner look
              link: item.link
            };
          });
          setNewsFeed(formattedNews);
        }
      } catch (error) {
        console.error("Failed to fetch live news, falling back to static data.", error);
        // No action needed, state is already initialized with static MARKET_UPDATES
      }
    };

    fetchNews();
  }, []);

  const levels = [
    {
      icon: Compass,
      title: "Explorer",
      audience: "Beginner / Generalist",
      desc: "Understand the fundamental shift Generative AI brings to business analytics without the jargon.",
      link: "#dashboard", // Lead to Visual Demo
      linkText: "View Live Dashboard"
    },
    {
      icon: Layers,
      title: "Practitioner",
      audience: "Manager / Analyst",
      desc: "Deep dive into how I structure ETL pipelines and validate ML models before deployment.",
      link: "#governance", // Lead to Code/ETL Demo
      linkText: "Inspect Data Engine"
    },
    {
      icon: Telescope,
      title: "Visionary",
      audience: "Executive / CTO",
      desc: "Strategic implementation of AI governance, cost optimization, and competitive differentiation.",
      link: "#roi", // Lead to ROI Strategy Demo
      linkText: "Analyze ROI Model"
    }
  ];

  const handleScrollTo = (link: string) => {
    // Remove the # if present
    const targetId = link.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Educational Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, idx) => {
          const Icon = level.icon;
          return (
            <div 
              key={idx} 
              onClick={() => handleScrollTo(level.link)}
              className="block group cursor-pointer"
            >
              <Card className="relative overflow-hidden hover:bg-slate-900 transition-all duration-300 border-t-4 border-t-slate-800 hover:border-t-blue-500 h-full flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-32 h-32 -mr-8 -mt-8" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:border-blue-500/50 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{level.title}</h4>
                  <div className="text-xs text-slate-500 uppercase font-bold mb-4 tracking-wider">{level.audience}</div>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-grow">
                    {level.desc}
                  </p>
                  
                  {/* Interactive Cue */}
                  <div className="flex items-center text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    {level.linkText} <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Market Intelligence Terminal */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Live Feed */}
        <div className="flex-grow p-4 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800/50">
             <Radio className="w-4 h-4 text-red-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Global AI Intelligence Feed (Live)</span>
          </div>
          <div className="h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 space-y-3">
            {newsFeed.map((update, i) => (
                <a 
                    href={update.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={i} 
                    className="flex gap-3 text-sm font-mono group hover:bg-slate-900/50 p-2 rounded transition-colors cursor-pointer"
                >
                    <span className="text-slate-500 whitespace-nowrap shrink-0 text-xs pt-0.5">{update.time}</span>
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors flex items-center gap-2 leading-tight">
                        {update.text}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                    <span className="text-xs font-bold uppercase tracking-widest">Sentiment Demo</span>
                    <div className="group relative">
                       <Info className="w-3 h-3 text-slate-500 cursor-help" />
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 hidden group-hover:block">
                         Live simulation of NLP sentiment analysis stream.
                       </div>
                    </div>
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
