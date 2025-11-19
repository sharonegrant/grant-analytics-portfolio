import React from 'react';
import { Terminal } from 'lucide-react';
import { ViewMode } from '../../types';

interface ViewToggleProps {
  view: ViewMode;
  setView: (view: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => (
  <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800 shrink-0">
    <button 
      onClick={() => setView('executive')}
      className={`px-3 py-1 rounded text-xs font-bold transition-all ${view === 'executive' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-400'}`}
    >
      Executive
    </button>
    <button 
      onClick={() => setView('engineering')}
      className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center gap-2 ${view === 'engineering' ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50 shadow' : 'text-slate-500 hover:text-slate-400'}`}
    >
      <Terminal className="w-3 h-3" />
      Engineering
    </button>
  </div>
);

export default ViewToggle;