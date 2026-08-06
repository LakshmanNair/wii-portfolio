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
                    I just finished a Computer Science Specialist at the University of Toronto and I&apos;m now a Junior
                    Full Stack Systems Developer at Clearway Construction, building ERP tools a few hundred people use
                    every day. I like shipping things people actually notice.
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
                        Full-stack work, mostly React and TypeScript on the front, Python and Django or Node behind it.
                        I care a lot about the boring parts — cache behaviour, query counts, test coverage — because
                        that&apos;s usually the difference between a demo and something a team can rely on.
                    </p>
                </div>

                <div className="glass-card">
                    <div className="mono-label">What I&apos;m Into</div>
                    <p className="about-text">
                        Retrieval-augmented generation for real businesses is the thing I keep coming back to. There&apos;s
                        a huge gap between a chatbot demo and a system that answers questions correctly over a
                        company&apos;s own messy documents, and closing that gap is a genuinely interesting problem.
                        Agentic workflows too — I&apos;ve built automation that drives real browsers end to end.
                    </p>
                </div>

                <div className="glass-card">
                    <div className="mono-label">Outside The Editor</div>
                    <p className="about-text">
                        I like creative side projects more than I probably should — this whole portfolio is a rebuilt
                        Wii menu, which should tell you something. Design, interaction, little animation details:
                        it&apos;s the same problem-solving instinct pointed somewhere more fun.
                    </p>
                </div>

                <div className="glass-card">
                    <div className="mono-label">Right Now</div>
                    <p className="about-text">
                        Based in Toronto, shipping ERP and geospatial tooling at Clearway, and building RAG and agent
                        projects on the side. Always up for a conversation about interesting engineering — the fastest
                        way to reach me is the Contact channel.
                    </p>
                </div>
            </div>
        </SectionLayout>
    );
}
