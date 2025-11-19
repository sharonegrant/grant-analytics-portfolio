import React from 'react';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => (
  <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
    {/* Ambient Background */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors duration-700"></div>
    
    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
      <div className="max-w-2xl text-left">
        <div className="flex items-center gap-2 text-blue-400 font-bold mb-3 text-xs uppercase tracking-widest">
          <Mail className="w-4 h-4" />
          Executive Briefing
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Cut Through the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Noise</span>
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          A weekly, direct intelligence report specifically for decision makers. 
          I curate the 3 most impactful AI developments affecting enterprise ROI, 
          filtering out the hype so you can focus on high value strategy.
        </p>
      </div>
      
      {/* Subscription Form */}
      <div className="w-full lg:max-w-md flex flex-col items-start gap-4 shrink-0">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input 
            type="email" 
            placeholder="executive@company.com" 
            className="flex-grow px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <Button variant="cta" className="whitespace-nowrap px-8 py-3 w-full sm:w-auto">
            Subscribe
            </Button>
        </div>
        <p className="text-[10px] text-slate-600 text-left">
            Join 1,500+ executives from Google, Amazon, and MIT.
        </p>
      </div>
    </div>
  </div>
);

export default Newsletter;