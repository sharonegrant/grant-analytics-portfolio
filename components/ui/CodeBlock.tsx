import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "python" }) => (
  <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden font-mono text-xs h-full">
    <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-500">
      <span className="uppercase text-[10px] tracking-widest font-bold">{language}</span>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
      </div>
    </div>
    <div className="p-4 overflow-x-auto text-blue-300 h-[calc(100%-33px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
      <pre className="whitespace-pre">{code}</pre>
    </div>
  </div>
);

export default CodeBlock;