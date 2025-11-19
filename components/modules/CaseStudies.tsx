import React from 'react';
import { CheckCircle2, ArrowUpRight, Layers, Trophy } from 'lucide-react';
import Card from '../ui/Card';
import { CaseStudy } from '../../types';

interface CaseStudiesProps {
  studies: CaseStudy[];
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ studies }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {studies.map((study, index) => (
        <Card key={study.id} className="flex flex-col h-full group hover:border-slate-700 transition-colors duration-300">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-900/50 transition-colors">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                Case Study 0{index + 1}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{study.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {study.techStack.map(tech => (
                <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">The Challenge</h4>
              <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-3">
                {study.problem}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">The Solution</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <h4 className="text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-2">
              <Trophy className="w-3 h-3" /> Measurable Impact
            </h4>
            <p className="text-lg font-bold text-white">
              {study.results}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CaseStudies;