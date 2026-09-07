'use client';

import SectionLayout from '@/components/ui/section-layout';
import { Mail, ExternalLink } from 'lucide-react';
import { FULL_NAME, ROLE_LINE, CONTACT_EMAIL, SOCIALS, RESUME_PATH } from '@/lib/profile';

const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default function AboutPage() {
    return (
        <SectionLayout title="About" subtitle="Who I am" accentColor="#4FC3F7" contentClassName="section-content-tight">
            <div className="hero-section">
                <div className="hero-rule">
                    <div />
                    <span>∞</span>
                    <div />
                </div>

                <h2 className="hero-name">{FULL_NAME.toUpperCase()}</h2>
                <p className="hero-role">{ROLE_LINE}</p>

                <p className="hero-bio">
                    Hey, I&apos;m a Full-Stack Systems Developer and Computer Science Specialist graduate from the University of Toronto. 
                    I have expertise building production-grade ERP features and data visualization
                    engines that hundreds of people use daily. I am interested in machine learning, AI-workflows and building user-facing applications.
                    Please explore, take a look at my projects, and reach out if you&apos;d like to chat!
                </p>

                <div className="hero-links">
                    <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="hero-link">
                        <GithubIcon />
                        GitHub
                    </a>
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link">
                        <LinkedinIcon />
                        LinkedIn
                    </a>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hero-link">
                        <Mail size={16} />
                        Email
                    </a>
                    <a href={RESUME_PATH} download className="hero-link">
                        <ExternalLink size={16} />
                        Résumé
                    </a>
                </div>
            </div>

            <div className="section-grid about-grid">
                <div className="glass-card">
                    <div className="mono-label">What I Build</div>
                    <p className="about-text">
                        Full-stack applications, currently, I use React and TypeScript on the front, Python and Django or Node behind it.
                        As a systems developer, I care about the boring parts: cache behaviour, query counts, test coverage. I strive to
                        learn new system design patterns to improve application reliability, performance and scalability.
                    </p>
                </div>

                <div className="glass-card">
                    <div className="mono-label">What I&apos;m Into</div>
                    <p className="about-text">
                        Retrieval-augmented generation for real businesses is the thing I keep coming back to. There&apos;s
                        a huge gap between a chatbot demo and a system that answers questions correctly over a
                        company&apos;s own messy documents, and closing that gap is a genuinely interesting problem.
                        I also enjoy employing different strategies to drive coding efficiency with AI agents. Using Claude Code, 
                        Cursor, Codex plugins and different MCPs is exciting during the current age of AI agent development.
                    </p>
                </div>

                <div className="glass-card">
                    <div className="mono-label">This Website</div>
                    <p className="about-text">
                        I wanted to set some time aside to make a creative side project and code for fun.
                        The idea was to revamp my old website and I thought, now that I have some real frontend skill, I could 
                        really take some liberty with the interface and have some fun with it. I decided on emulating a well-known UI, but with a twist, 
                        and landed on one of my childhood favourites, the Wii menu.
                        Hopefully you enjoy the design, interaction, and little animation details.
                    </p>
                </div>
            </div>
        </SectionLayout>
    );
}
