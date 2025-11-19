import React, { useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Skill } from '../../types';

interface SkillEndorsementsProps {
  initialSkills: Skill[];
}

const SkillEndorsements: React.FC<SkillEndorsementsProps> = ({ initialSkills }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [endorsed, setEndorsed] = useState<Set<string>>(new Set());

  const handleEndorse = (name: string) => {
    if (endorsed.has(name)) return;
    setSkills(prev => prev.map(s => 
      s.name === name ? { ...s, initialCount: s.initialCount + 1 } : s
    ));
    setEndorsed(prev => new Set(prev).add(name));
  };

  const categories = ['Technical', 'Analytical', 'Enterprise'] as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map(category => (
            <div key={category} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                    <div className={`w-2 h-2 rounded-full ${
                        category === 'Technical' ? 'bg-blue-500' : 
                        category === 'Analytical' ? 'bg-purple-500' : 'bg-emerald-500'
                    }`}></div>
                    <h3 className="font-bold text-white uppercase tracking-widest text-sm">{category} Stack</h3>
                </div>
                
                <div className="space-y-6">
                    {skills.filter(s => s.category === category).map(skill => (
                        <div key={skill.name} className="group">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-300 font-medium">{skill.name}</span>
                                <span className="text-slate-500 text-xs">{skill.proficiency}%</span>
                            </div>
                            {/* Proficiency Bar */}
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                        category === 'Technical' ? 'bg-blue-600' : 
                                        category === 'Analytical' ? 'bg-purple-600' : 'bg-emerald-600'
                                    }`}
                                    style={{ width: `${skill.proficiency}%` }}
                                ></div>
                            </div>
                            
                            {/* Verification Interaction */}
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Peer Verified</span>
                                <button 
                                    onClick={() => handleEndorse(skill.name)}
                                    disabled={endorsed.has(skill.name)}
                                    className={`
                                        flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all
                                        ${endorsed.has(skill.name) 
                                            ? 'text-emerald-400 bg-emerald-900/20' 
                                            : 'text-slate-400 bg-slate-800 hover:text-white hover:bg-slate-700'
                                        }
                                    `}
                                >
                                    {endorsed.has(skill.name) ? (
                                        <>
                                            <CheckCircle2 className="w-3 h-3" /> Verified
                                        </>
                                    ) : (
                                        <>
                                            Verify <ChevronRight className="w-3 h-3" />
                                        </>
                                    )}
                                    <span className="ml-1 tabular-nums opacity-70">({skill.initialCount})</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
};

export default SkillEndorsements;