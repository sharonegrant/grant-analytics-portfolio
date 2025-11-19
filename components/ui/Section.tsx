import React from 'react';
import { SectionProps } from '../../types';

const Section: React.FC<SectionProps> = ({ title, subtitle, children, className = "", id }) => (
  <section id={id} className={`py-20 px-6 md:px-20 border-b border-slate-800/50 ${className}`}>
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h2>
        <p className="text-slate-400 text-lg max-w-2xl">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

export default Section;