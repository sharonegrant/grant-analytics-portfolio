import React, { useState } from 'react';
import { Database, Sparkles, Terminal, FileJson, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import ViewToggle from '../ui/ViewToggle';
import CodeBlock from '../ui/CodeBlock';
import Button from '../ui/Button';
import { ViewMode } from '../../types';
import { cleanDataWithGemini } from '../../services/geminiService';

const DataCleaningModule: React.FC = () => {
  const [input, setInput] = useState('Jan 1st 2024, NA, 12k revenue\nunknown date, null region, error');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('executive');

  const handleClean = async () => {
    setLoading(true);
    const result = await cleanDataWithGemini(input);
    setOutput(result);
    setLoading(false);
  };

  const engineeringCode = `import pandas as pd
from google.genai import GoogleGenAI

# Define Strict Schema for Governance
class RevenueEntry(BaseModel):
    date: str
    region: str
    revenue: float
    status: str

def clean_unstructured_data(raw_text):
    # Uses Gemini 2.5 Flash to parse unstructured text 
    # into strict JSON schema for warehouse loading.
    pass`;

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-start mb-3 shrink-0">
        <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <div>
                <h3 className="text-lg font-bold text-white leading-none">Unstructured Data Engine</h3>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider bg-blue-950/50 px-1.5 py-0.5 rounded border border-blue-900/50 inline-block mt-1">Use Case: Compliance Audit</span>
            </div>
        </div>
        <ViewToggle view={viewMode} setView={setViewMode} />
      </div>

      {viewMode === 'executive' ? (
        <div className="flex flex-col flex-grow gap-3">
          <div className="grid grid-cols-2 gap-3 flex-grow">
            {/* Input Side */}
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex flex-col">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex justify-between">
                <span>Raw Input</span>
                <Terminal className="w-3 h-3" />
              </div>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-grow bg-transparent text-slate-300 text-[10px] font-mono focus:outline-none resize-none leading-relaxed min-h-[100px]"
              />
            </div>

            {/* Output Side */}
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex flex-col relative overflow-hidden">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex justify-between">
                <span>JSON Output</span>
                <FileJson className="w-3 h-3" />
              </div>
              {output && !loading && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-emerald-500 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                  </div>
              )}
              <pre className="text-[10px] text-emerald-400 font-mono whitespace-pre-wrap flex-grow overflow-y-auto leading-relaxed min-h-[100px]">
                {loading ? <span className="animate-pulse text-slate-500">Processing...</span> : output || "// System Idle"}
              </pre>
            </div>
          </div>

          <Button onClick={handleClean} variant="ai" icon={Sparkles} disabled={loading} className="w-full py-1.5 text-xs shrink-0">
              {loading ? 'Executing Transformation...' : 'Run Normalization Pipeline'}
          </Button>

          <div className="pt-2 border-t border-slate-800 mt-auto">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong className="text-emerald-500">Why it matters:</strong> I build pipelines that use LLMs to clean messy, unstructured text into strict JSON schemas ready for analysis.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-grow min-h-[150px]">
           <CodeBlock code={engineeringCode} />
        </div>
      )}
    </Card>
  );
};

export default DataCleaningModule;