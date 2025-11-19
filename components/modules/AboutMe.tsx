
import React, { useState } from 'react';
import { Briefcase, GraduationCap, Linkedin, Download, User } from 'lucide-react';
import Button from '../ui/Button';
import SkillEndorsements from './SkillEndorsements';
import { ABOUT_DATA, LINKEDIN_URL, SKILLS_DATA, RESUME_URL, PROFILE_IMAGE_URL } from '../../constants';

const AboutMe: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16 border-b border-slate-800 pb-12">
        <div className="shrink-0">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden bg-slate-800 flex items-center justify-center">
             {imgError ? (
                <User className="w-20 h-20 text-slate-600" />
             ) : (
                <img 
                  src={PROFILE_IMAGE_URL} 
                  alt="Sharon Grant" 
                  className="w-full h-full object-cover object-top"
                  onError={() => setImgError(true)}
                />
             )}
          </div>
        </div>
        <div className="text-center md:text-left flex-grow">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Sharon Grant</h1>
           <div className="text-xl text-blue-400 font-medium mb-6">Senior Business Analytics Professional</div>
           <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-8">
             {ABOUT_DATA.bio}
           </p>
           <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button href={LINKEDIN_URL} variant="primary" icon={Linkedin}>LinkedIn Profile</Button>
              <Button href={RESUME_URL} variant="outline" icon={Download}>Download Resume</Button>
           </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        
        {/* Left Col: Experience (5 cols) */}
        <div className="xl:col-span-5 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Professional Experience</h2>
            </div>
            
            <div className="space-y-8 border-l-2 border-slate-800 ml-3 pl-8 relative">
                {ABOUT_DATA.experience.map((job, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-slate-950 bg-emerald-500"></div>
                    <h3 className="text-lg font-bold text-white">{job.role}</h3>
                    <div className="text-emerald-400 text-sm font-medium mb-1">{job.company}</div>
                    <div className="text-xs text-slate-500 font-mono mb-3 uppercase tracking-wider">{job.period}</div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {job.description}
                    </p>
                </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Education</h2>
            </div>
            <div className="grid gap-4">
                {ABOUT_DATA.education.map((edu, index) => (
                    <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-white font-bold">{edu.school}</div>
                        <div className="text-sm text-slate-400 mb-2">{edu.degree}</div>
                        <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">{edu.year}</div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Col: Skills (7 cols) */}
        <div className="xl:col-span-7">
             <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Technical Arsenal</h2>
                <p className="text-slate-400">Core competencies verified by production deployment.</p>
             </div>
             <SkillEndorsements initialSkills={SKILLS_DATA} />
        </div>

      </div>
    </div>
  );
};

export default AboutMe;