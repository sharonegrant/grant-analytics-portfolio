import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  active, 
  children, 
  variant = 'primary', 
  icon: Icon, 
  disabled, 
  className = "", 
  href 
}) => {
  const baseStyle = `px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  
  const variants = {
    primary: active 
      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
    outline: "border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-white",
    ai: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/20 border border-transparent",
    cta: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20 hover:scale-105"
  };

  const variantClass = variants[variant] || variants.primary;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${baseStyle} ${variantClass}`}>
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variantClass}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;