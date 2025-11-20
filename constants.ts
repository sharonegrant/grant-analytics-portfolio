
import { CaseStudy, Skill, Industry, MarketUpdate, ExperienceItem, EducationItem } from './types';

export const RESUME_URL = "https://docs.google.com/document/d/1UZ4Z1QfEiFHMCcoDPLGvlBY032D8baps0bysVRbPMaA/edit?usp=drive_link";
export const EMAIL = "emailsharongrant@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sharonegrant";

// Pointing to the local file in the root directory
export const PROFILE_IMAGE_URL = "https://i.ibb.co/jZVwH0gs/sharon.jpg";

export const SHARON_RESUME_CONTEXT = `
You are the AI Assistant for Sharon Grant's professional portfolio. 
Your goal is to answer recruiter questions based on her resume and experience.
Adopt a professional, concise, and helpful tone.

**Profile:**
- **Name:** Sharon Grant
- **Role:** Senior Business Analytics Professional / Executive Support Assistant
- **Current Company:** MIT Investment Management Company (MITIMCo)
- **Current Scope:** Supports a $30B+ portfolio.
- **Previous Role:** Senior Real Estate Analyst at Coldwell Banker.
- **Previous Achievement:** Improved pricing accuracy by 12% using predictive models.

**Education:**
- Master of Science in Business Analytics from Suffolk University (Expected 2025).
- Bachelor of Science in Business Management from Northeastern University.

**Technical Skills:**
- **Languages:** Python (Pandas, NumPy, scikit-learn), SQL.
- **Visualization:** Tableau, Power BI.
- **Optimization:** Gurobi.
- **Enterprise:** Salesforce, Workday, Coupa.
- **Cloud/DB:** AWS (Redshift/S3), ETL pipelines.

**Key Projects:**
1. **Profit Maximization Model:** Used Python & Gurobi to identify a 15% revenue increase opportunity.
2. **ML Demand Forecasting System:** Used XGBoost to reduce forecast error (MAPE) from 18% to 8%.
3. **General:** Experience bridging technical data pipelines with executive decision-making. Managed $100M+ in budgets.

**Contact:**
- Email: ${EMAIL}
- LinkedIn: Available upon request.

**Instructions:**
- If asked about contact info, provide the email.
- If asked about specific skills (e.g., "Does she know SQL?"), provide context from the resume.
- Keep answers under 3 sentences unless asked for detail.
`;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Profit Maximization Model',
    industry: 'finance',
    problem: 'A legacy pricing strategy was resulting in suboptimal margins across a diverse real estate portfolio, leaving potential revenue on the table.',
    solution: 'Developed a linear programming model using Python and Gurobi optimization libraries. The system analyzed historical transaction data to recommend optimal price points based on market elasticity.',
    techStack: ['Python', 'Gurobi', 'Pandas', 'Linear Programming'],
    results: 'Identified a 15% revenue increase opportunity ($2.4M annualized) and reduced time to price by 40%.'
  },
  {
    id: '2',
    title: 'ML Demand Forecasting System',
    industry: 'retail',
    problem: 'Traditional moving average forecasts were failing to capture seasonal spikes, leading to an 18% variance and inventory stockouts.',
    solution: 'Engineered a machine learning pipeline using XGBoost regression. Implemented feature engineering for holidays, weather patterns, and local economic indicators.',
    techStack: ['Python', 'XGBoost', 'Scikit-Learn', 'AWS S3'],
    results: 'Reduced forecast error (MAPE) from 18% to 8%, optimizing inventory holding costs by ~12%.'
  },
  {
    id: '3',
    title: 'Executive Dashboard Automation',
    industry: 'tech',
    problem: 'Leadership relied on static Excel sheets that were 2 weeks outdated, slowing down strategic pivot decisions.',
    solution: 'Built an automated ETL pipeline feeding into a dynamic Tableau dashboard. Integrated SQL triggers to refresh data daily from Salesforce and Workday.',
    techStack: ['SQL', 'Tableau', 'ETL', 'Salesforce'],
    results: 'Saved 15 hours/week of manual reporting and enabled real time drill down into regional performance.'
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: 'Python (Pandas/NumPy)', category: 'Technical', initialCount: 142, proficiency: 95 },
  { name: 'SQL / Relational DBs', category: 'Technical', initialCount: 128, proficiency: 90 },
  { name: 'Machine Learning', category: 'Technical', initialCount: 95, proficiency: 85 },
  { name: 'Tableau / Power BI', category: 'Analytical', initialCount: 156, proficiency: 98 },
  { name: 'Gurobi Optimization', category: 'Analytical', initialCount: 42, proficiency: 75 },
  { name: 'Project Management', category: 'Enterprise', initialCount: 110, proficiency: 92 },
  { name: 'AWS Cloud / ETL', category: 'Technical', initialCount: 88, proficiency: 80 },
  { name: 'Stakeholder Comm.', category: 'Enterprise', initialCount: 165, proficiency: 100 }
];

export const INDUSTRY_CONTENT = {
  finance: {
    edgeTitle: "Risk Aware Analytics",
    edgeDesc: "In high stakes financial environments like MITIMCo ($30B+ AUM), precision is non negotiable. I build audit ready pipelines that prioritize data integrity and governance.",
    icon: "ShieldCheck"
  },
  tech: {
    edgeTitle: "Scalable Growth Engines",
    edgeDesc: "For fast moving tech sectors, I focus on automating insights. My workflows reduce 'time to decision', allowing product teams to pivot based on real time user data.",
    icon: "Zap"
  },
  retail: {
    edgeTitle: "Supply Chain Optimization",
    edgeDesc: "I bridge the gap between inventory and demand. My forecasting models directly impact the bottom line by reducing holding costs and preventing stockouts.",
    icon: "ShoppingBag"
  }
};

export const MARKET_UPDATES: MarketUpdate[] = [
  { time: "10:42 UTC", text: "NVIDIA Blackwell GPUs demonstrating 4x inference speed in early enterprise benchmarks.", link: "https://www.google.com/search?q=NVIDIA+Blackwell+GPUs+inference+speed" },
  { time: "09:15 UTC", text: "Regulatory alignment: EU AI Act compliance framework finalized for Fintech.", link: "https://www.google.com/search?q=EU+AI+Act+Fintech+compliance" },
  { time: "08:30 UTC", text: "Google Gemini 1.5 Pro context window expands, enabling full codebase reasoning.", link: "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/" },
  { time: "Yesterday", text: "OpenAI Sora beta testing shows potential for reducing marketing creative costs by 60%.", link: "https://openai.com/sora" },
  { time: "Yesterday", text: "Python 3.13 release candidate introduces experimental JIT compiler for performance gains.", link: "https://docs.python.org/3.13/whatsnew/3.13.html" },
  { time: "2 days ago", text: "MIT researchers publish new findings on reducing LLM hallucination rates in RAG systems.", link: "https://news.mit.edu/topic/artificial-intelligence2" }
];

export const ABOUT_DATA = {
  bio: "Effective data analysis requires more than just coding. It requires context. My career began in the high stakes world of institutional finance and real estate operations, where I managed budgets exceeding $100M for organizations like MITIMCo and Tufts University. I understand the pressure executives face because I’ve spent seven years supporting their strategic decisions. I recognized that the best strategies are backed by rigorous data, which drove me to earn my MS in Business Analytics. Today, I bridge the gap between complex data science and executive strategy. I combine operational acumen with advanced tools like Python, Machine Learning, and SQL to build models that don’t just report on the past. They optimize budgets, forecast demand, and recover revenue.",
  experience: [
    {
      role: "Executive Support Assistant | Finance Operations & Analytics",
      company: "MIT Investment Management Company (MITIMCo)",
      period: "2022 - Present",
      description: "Supporting finance operations for a $30B+ investment portfolio. Streamlining data flows for executive decision making and ensuring high level governance compliance."
    },
    {
      role: "Senior Real Estate Analyst",
      company: "Coldwell Banker",
      period: "2018 - 2022",
      description: "Led market analysis initiatives using predictive modeling. Improved pricing accuracy by 12% and optimized inventory turnover across regional markets."
    },
    {
      role: "Finance Administrator",
      company: "Tufts University",
      period: "Apr 2021 – Nov 2023",
      description: "Automated financial reporting processes, reducing report preparation time by 30%. Managed budgets exceeding $3M and delivered detailed forecasts to executive leadership enabling strategic decisions. Streamlined financial operations, improving reporting accuracy and regulatory compliance."
    },
    {
      role: "Assistant Subaward Administrator",
      company: "Massachusetts Institute of Technology",
      period: "Apr 2017 – Dec 2019",
      description: "Oversaw grant budgets totaling $2.5M+, ensuring data integrity and compliance with federal regulations. Optimized reporting processes, increasing efficiency by 25% and reducing processing errors. Collaborated with department heads to implement improved data management practices, aligning with institutional goals."
    }
  ] as ExperienceItem[],
  education: [
    {
      degree: "Master of Science in Business Analytics",
      school: "Suffolk University",
      year: "2025"
    },
    {
      degree: "Bachelor of Science in Business Management",
      school: "Northeastern University",
      year: "Alumni"
    }
  ] as EducationItem[]
};
