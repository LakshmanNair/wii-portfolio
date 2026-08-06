'use client';

import SectionLayout from '@/components/ui/section-layout';
import { Rocket, ExternalLink } from 'lucide-react';
import { SOCIALS } from '@/lib/profile';

const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

// Demo links and repos land in the next pass.
const projects = [
    {
        title: 'Agentic AI Web Automation Engine',
        description:
            'An autonomous agent that reads and fills complex medical forms on its own. It walks the live DOM with Playwright and reasons about each field through the Gemini API, reaching 100% submission reliability across the forms I threw at it.',
        tags: ['TypeScript', 'Playwright', 'Gemini API', 'Agents'],
        type: 'code',
        github: SOCIALS.github,
        demo: '',
        color: '#CE93D8',
    },
    {
        title: 'GIST — Geospatial Analytics Platform',
        description:
            'Designed, architected and shipped solo at Clearway. Turns large-scale JSON datasets into interactive Leaflet maps and analytics dashboards that upper management actually uses to make decisions.',
        tags: ['React', 'TypeScript', 'Leaflet', 'Data Viz'],
        type: 'code',
        github: '',
        demo: '',
        color: '#4FC3F7',
    },
    {
        title: 'Expense Management Platform',
        description:
            'End-to-end expense and approval system serving 585+ employees, including corporate VISA statement reconciliation. Cut roughly 15 hours of manual finance work every month.',
        tags: ['React', 'Django', 'PostgreSQL', 'Docker'],
        type: 'code',
        github: '',
        demo: '',
        color: '#81C784',
    },
    {
        title: 'AI Fitness Web App',
        description:
            'Built and deployed with the team at MyEdMaster. Next.js REST services behind a React frontend, focused on making the workout experience configurable per user.',
        tags: ['Next.js', 'React', 'REST APIs', 'Vercel'],
        type: 'code',
        github: '',
        demo: 'https://teamrocketaifitnessappd4.vercel.app/',
        color: '#FFB74D',
    },
];

export default function ProjectsPage() {
    return (
        <SectionLayout title="Projects" subtitle="Things I've built" accentColor="#EF5350">
            <div className="mono-label" style={{ marginBottom: '2rem' }}>
                <Rocket size={14} />
                Showcase
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="project-card"
                        style={{ animationDelay: `${i * 100}ms`, animation: 'slideUp 500ms ease both' }}
                    >
                        {/* Thumbnail — screenshots and demo videos land in the next pass */}
                        <div className="project-thumbnail">
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <div
                                    className="text-4xl"
                                    style={{ filter: `drop-shadow(0 0 20px ${project.color}40)` }}
                                >
                                    🚀
                                </div>
                                <span className="text-white/40 text-xs font-mono">
                                    {project.demo ? 'LIVE PROJECT' : 'CASE STUDY'}
                                </span>
                            </div>

                            {/* Color accent glow */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 70%)` }}
                            />
                        </div>

                        {/* Project info */}
                        <div className="project-body">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="project-tags">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="project-tag">{tag}</span>
                                    ))}
                                </div>

                                {(project.github || project.demo) && (
                                    <div className="flex gap-2 ml-3">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                aria-label={`${project.title} source`}
                                                className="text-white/30 hover:text-white/70 transition-colors">
                                                <GithubIcon />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                                aria-label={`${project.title} live demo`}
                                                className="text-white/30 hover:text-white/70 transition-colors">
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionLayout>
    );
}
