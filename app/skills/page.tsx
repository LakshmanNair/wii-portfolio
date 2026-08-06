'use client';

import SectionLayout from '@/components/ui/section-layout';
import GlowCard from '@/components/ui/glow-card';
import { Zap } from 'lucide-react';

const skillCategories = [
    {
        title: 'Languages',
        skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'SQL', 'Bash'],
    },
    {
        title: 'Frameworks & Technologies',
        skills: ['React', 'Next.js', 'Node.js', 'Django', 'Vite', 'Tailwind CSS', 'REST APIs', 'React Query', 'Leaflet'],
    },
    {
        title: 'Data & Infrastructure',
        skills: ['PostgreSQL', 'Docker', 'AWS', 'Terraform', 'GitHub Actions (CI/CD)', 'Git'],
    },
    {
        title: 'Testing & Automation',
        skills: ['PyTest', 'Playwright', 'Selenium', 'Agentic workflows', 'Agile', 'Code review'],
    },
    {
        title: 'Machine Learning',
        skills: ['Neural networks', 'Deep learning', 'NLP', 'RAG', 'scikit-learn', 'Gemini API', 'PyTorch'],
    },
];

export default function SkillsPage() {
    return (
        <SectionLayout title="Skills" subtitle="Technical toolkit" accentColor="#FFB74D">
            <div className="mono-label" style={{ marginBottom: '2rem' }}>
                <Zap size={14} />
                Proficiencies
            </div>

            <div className="skills-stack">
                {skillCategories.map((category, i) => (
                    <GlowCard key={i} glowColor="purple" className="glow-card-skills">
                        <h3 className="text-white/80 font-mono font-semibold text-sm tracking-wider uppercase">
                            {category.title}
                        </h3>
                        <div className="skill-pills">
                            {category.skills.map((skill, j) => (
                                <span
                                    key={j}
                                    className="skill-badge"
                                    style={{
                                        animationDelay: `${(i * category.skills.length + j) * 30}ms`,
                                        animation: 'slideUp 400ms ease both',
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </GlowCard>
                ))}
            </div>
        </SectionLayout>
    );
}
