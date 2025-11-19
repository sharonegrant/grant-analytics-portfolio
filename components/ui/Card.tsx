import React from 'react';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

export default Card;