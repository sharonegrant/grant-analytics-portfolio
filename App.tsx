import React, { useState } from 'react';
import { Brain, Mail, Linkedin, Calendar, User, ArrowLeft, Menu, X } from 'lucide-react';
import Section from './components/ui/Section';
import Button from './components/ui/Button';
import ROICalculator from './components/modules/ROICalculator';
import DataCleaningModule from './components/modules/DataCleaningModule';
import ForecastingModule from './components/modules/ForecastingModule';
import ABTestingSimulator from './components/modules/ABTestingSimulator';
import DashboardPreview from './components/modules/DashboardPreview';
import RecruiterChatbot from './components/RecruiterChatbot';
import CaseStudies from './components/modules/CaseStudies';
import KnowledgeHub from './components/modules/KnowledgeHub';
import GrantEdge from './components/modules/GrantEdge';
import Newsletter from './components/modules/Newsletter';
import AboutMe from './components/modules/AboutMe';
import { EMAIL, CASE_STUDIES } from './constants';

type PageView = 'home' | 'about';

const GrantLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 group ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden group-hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {/* Abstract G / Graph Icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
        <path d="M3 3V21H21" stroke="url(#logo-gradient)" strokeWidth="3" strokeLinecap="square" />
        <path d="M16 8L12 12L9 9L3 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="5" width="6" height="6" stroke="url(#logo-gradient)" strokeWidth="2" />
        <defs>
          <linearGradient id="logo-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="flex flex-col justify-center text-left">
      <span className="text-lg font-black text-white tracking-tight leading-none group-hover:tracking-normal transition-all duration-500">
        GRANT
      </span>
      <span className="text-[10px] font-mono text-blue-400 tracking-[0.2em] leading-none mt-1 group-hover:text-blue-300 transition-colors">
        ANALYTICS
      </span>
    </div>
  </div>
);

export default function App() {
  const [page, setPage] = useState<PageView>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-40 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          
          {/* Name and Title Replaced Here */}
          <div 
            className="cursor-pointer flex flex-col"
            onClick={() => navigateTo('home')}
          >
            <span className="font-bold text-xl tracking-tighter text-white">
              SHARON <span className="text-blue-500">GRANT</span>
            </span>
            <span className="text-[10px] text-slate-500 font-normal uppercase tracking-widest">
              Senior Business Analytics
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <button onClick={() => navigateTo('home')} className={`hover:text-white transition-colors relative py-2 ${page === 'home' ? 'text-white' : ''}`}>
                Home
                {page === 'home' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>}
              </button>
              <button onClick={() => navigateTo('about')} className={`hover:text-white transition-colors relative py-2 ${page === 'about' ? 'text-white' : ''}`}>
                Profile
                {page === 'about' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>}
              </button>
              {page === 'home' && (
                <>
                  <a href="#case-studies" className="hover:text-white transition-colors py-2">Case Studies</a>
                  <a href="#demos" className="hover:text-blue-400 transition-colors py-2">Lab</a>
                  <a href="#knowledge" className="hover:text-white transition-colors py-2">Knowledge Hub</a>
                </>
              )}
            </div>
            <div className="h-8 w-px bg-slate-800 mx-2"></div>
            <Button variant="cta" className="py-2.5 px-5 text-xs font-bold shadow-emerald-500/20 tracking-wide uppercase" icon={Calendar} href={`mailto:${EMAIL}`}>
              Schedule Briefing
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 p-6 space-y-4 animate-in slide-in-from-top-5">
            <button onClick={() => navigateTo('home')} className="block w-full text-left text-slate-300 font-medium py-2">Home</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left text-slate-300 font-medium py-2">Profile</button>
            <Button variant="cta" className="w-full justify-center" icon={Calendar} href={`mailto:${EMAIL}`}>Schedule Briefing</Button>
          </div>
        )}
      </nav>

      {page === 'home' ? (
        <main className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <header className="pt-48 pb-24 px-6 md:px-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/5 rounded-[100%] blur-[100px] pointer-events-none"></div>
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-[100%] blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto text-center mb-12 relative z-10">
                {/* Logo Replaced Here */}
                <div className="flex justify-center mb-10">
                    <GrantLogo className="scale-125" />
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tight">
                  Data Leadership for <br /> the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">Intelligent Enterprise.</span>
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                  Bridging the gap between <span className="text-slate-200 font-medium">Python/SQL pipelines</span> and <span className="text-slate-200 font-medium">$100M+ executive decision making</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <Button variant="primary" icon={Mail} href={`mailto:${EMAIL}`} className="py-4 px-8 text-sm">Contact Me</Button>
                  <Button variant="outline" onClick={() => navigateTo('about')} icon={User} className="py-4 px-8 text-sm">View Profile</Button>
                </div>
            </div>
          </header>

          {/* Grant Edge (Why Hire Me) */}
          <Section title="The Grant Advantage" subtitle="Tailored analytical rigor for specific industry challenges.">
             <GrantEdge />
          </Section>

          {/* Case Studies */}
          <Section 
            id="case-studies"
            title="Proven Impact" 
            subtitle="Deep dives into complex problems solved with advanced analytics and machine learning."
          >
            <CaseStudies studies={CASE_STUDIES} />
          </Section>

          {/* Interactive Demos */}
          <Section 
            id="demos"
            title="Interactive Lab" 
            subtitle="Interact with the modules below to see how I use Generative AI to enhance traditional data workflows."
          >
            <div className="space-y-12">
              {/* Row 1: ROI & Data Cleaning (Condensed) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div id="roi">
                   <ROICalculator />
                </div>
                <div id="governance">
                   <DataCleaningModule />
                </div>
              </div>
              
              {/* Row 2: Forecasting & AB Testing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <ForecastingModule />
                 <div id="experiments">
                    <ABTestingSimulator />
                 </div>
              </div>

              {/* Row 3: Dashboard */}
              <div>
                <DashboardPreview />
              </div>
            </div>
          </Section>

          {/* Knowledge Hub */}
          <Section 
            id="knowledge"
            title="Knowledge Hub" 
            subtitle="Curated insights for every level of technical fluency. Explore the future of analytics."
          >
            <KnowledgeHub />
          </Section>

          {/* Newsletter Section */}
          <section className="py-24 px-6 md:px-20 border-t border-slate-900 bg-slate-950 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                <Newsletter />
            </div>
          </section>
        </main>
      ) : (
        <div className="pt-32 animate-in slide-in-from-right-8 duration-500">
           <div className="max-w-6xl mx-auto px-6 mb-8">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm font-bold uppercase tracking-widest group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Overview
              </button>
           </div>
           <AboutMe />
        </div>
      )}

      {/* Footer */}
      <footer className="py-24 px-6 text-center border-t border-slate-900 bg-slate-950">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your data strategy?</h2>
          <p className="text-slate-400 mb-10">
            Sharon Grant • Senior Business Analytics Professional
            <br/>
            <span className="text-sm text-slate-500">MS in Business Analytics • $100M+ Portfolio Management</span>
          </p>
          <div className="flex justify-center gap-4">
             <Button variant="cta" icon={Mail} href={`mailto:${EMAIL}`}>Schedule Executive Briefing</Button>
          </div>
          <div className="flex justify-center gap-8 mt-12 opacity-50 hover:opacity-100 transition-opacity">
             <a href="https://linkedin.com/in/sharonegrant" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
          <p className="text-slate-600 text-xs mt-12 font-mono">
            © {new Date().getFullYear()} Grant Analytics. Strategic Intelligence Unit.
          </p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <RecruiterChatbot />

    </div>
  );
}