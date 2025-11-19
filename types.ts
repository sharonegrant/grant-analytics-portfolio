import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ViewMode = 'executive' | 'engineering';
export type Industry = 'finance' | 'tech' | 'retail';

export interface ButtonProps {
  onClick?: () => void;
  active?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ai' | 'cta' | 'ghost';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  href?: string;
}

export interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

export interface RevenueEntry {
  date: string;
  region: string;
  revenue: number;
  status: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  results: string;
  industry: Industry | 'all';
}

export interface Skill {
  name: string;
  category: 'Technical' | 'Analytical' | 'Enterprise';
  initialCount: number;
  proficiency: number; // 0-100
}

export interface MarketUpdate {
  time: string;
  text: string;
  link: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
}