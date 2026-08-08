'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionLayout from '@/components/ui/section-layout';
import { Rocket, ExternalLink, Gamepad2, X } from 'lucide-react';
import { SOCIALS } from '@/lib/profile';

const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

// Served from this Next.js app's public/checkers (Vercel). Same-origin keeps
// the Wasm loader simple; GitHub Pages can replace this once Pages is enabled
// on LakshmanNair7/Checkers-AI (Settings → Pages → gh-pages branch).
const CHECKERS_EMBED = '/checkers/index.html';

type Project = {
    title: string;
    description: string;
    tags: string[];
    type: string;
    github: string;
    demo: string;
    color: string;
    embed?: string;
    icon?: 'rocket' | 'gamepad';
};

// Demo links and repos land in the next pass.
const projects: Project[] = [
    {
        title: 'Agentic AI Web Automation Engine',
        description:
            'An autonomous agent that reads and fills complex medical forms on its own. It walks the live DOM with Playwright and reasons about each field through the Gemini API, reaching 100% submission reliability across the forms I threw at it.',
        tags: ['TypeScript', 'Playwright', 'Gemini API', 'Agents'],
        type: 'code',
        github: SOCIALS.github,
        demo: '',
        color: '#CE93D8',
        icon: 'rocket',
    },
    {
        title: 'Checkers & Decision Trees',
        description:
            'CSC111 AI checkers — pick a Minimax / Alpha-Beta / Aggressor matchup and watch a live animated game in the browser (Python + Pygame compiled to WebAssembly).',
        tags: ['Python', 'Pygame', 'Minimax', 'WebAssembly'],
        type: 'code',
        github: 'https://github.com/LakshmanNair7/Checkers-AI',
        demo: CHECKERS_EMBED,
        embed: CHECKERS_EMBED,
        color: '#EF5350',
        icon: 'gamepad',
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
        icon: 'rocket',
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
        icon: 'rocket',
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
        icon: 'rocket',
    },
];

export default function ProjectsPage() {
    const [embedOpen, setEmbedOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!embedOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setEmbedOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [embedOpen]);

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
                        {/* Thumbnail — Checkers card opens a live Wasm embed */}
                        <div className="project-thumbnail">
                            {project.embed ? (
                                <button
                                    type="button"
                                    className="project-embed-trigger"
                                    onClick={() => setEmbedOpen(true)}
                                    aria-label={`Play ${project.title} live`}
                                >
                                    <Gamepad2
                                        size={40}
                                        style={{ filter: `drop-shadow(0 0 20px ${project.color}80)` }}
                                    />
                                    <span className="text-white/70 text-xs font-mono tracking-wider">
                                        PLAY LIVE DEMO
                                    </span>
                                    <span className="text-white/35 text-[10px] font-mono">
                                        Python · Pygame · Wasm
                                    </span>
                                </button>
                            ) : (
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
                            )}

                            {/* Color accent glow */}
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
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

            {mounted &&
                embedOpen &&
                createPortal(
                    <div
                        className="project-embed-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Checkers & Decision Trees live demo"
                        onClick={() => setEmbedOpen(false)}
                    >
                        <div
                            className="project-embed-panel"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="project-embed-bar">
                                <span className="font-mono text-sm text-white/80">
                                    Checkers & Decision Trees
                                </span>
                                <button
                                    type="button"
                                    className="project-embed-close"
                                    onClick={() => setEmbedOpen(false)}
                                    aria-label="Close live demo"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <iframe
                                src={CHECKERS_EMBED}
                                title="Checkers & Decision Trees"
                                className="project-embed-frame"
                                allow="autoplay"
                            />
                        </div>
                    </div>,
                    document.body,
                )}
        </SectionLayout>
    );
}
