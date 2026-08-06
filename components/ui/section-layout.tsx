'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useWiiSfx } from '../wii/sfx-provider';
import { ArrowLeft } from 'lucide-react';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import SmoothScroll from './smooth-scroll';
import SectionNav from './section-nav';
import CursorTrail from './cursor-trail';
import { hexToHue } from '@/lib/color';

interface SectionLayoutProps {
    title: string;
    subtitle?: string;
    accentColor?: string;
    /** Lets a page tighten its own content padding, e.g. to fit without scrolling. */
    contentClassName?: string;
    children: React.ReactNode;
}

export default function SectionLayout({ title, subtitle, accentColor = '#4FC3F7', contentClassName = '', children }: SectionLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { playBack } = useWiiSfx();

    const handleBack = () => {
        playBack();
        // The session flag is set during startup, so / skips straight to the menu.
        router.push('/');
    };

    return (
        <div className="section-page" style={{ '--accent': accentColor } as React.CSSProperties}>
            <SmoothScroll />

            {/* Parallax starfield */}
            <StarsBackground
                className="section-stars"
                starColor="#ffffff"
                speed={110}
                factor={0.03}
                pointerEvents={false}
            />

            <CursorTrail hue={hexToHue(accentColor)} />

            {/* Top bar */}
            <header className="section-header">
                <button onClick={handleBack} className="back-button" aria-label="Back to menu">
                    <ArrowLeft size={18} />
                    <span>Wii Menu</span>
                </button>
                <div className="section-title-area">
                    <h1 className="section-title" style={{ color: accentColor }}>{title}</h1>
                    {subtitle && <p className="section-subtitle">{subtitle}</p>}
                </div>
                <div className="section-header-accent" style={{ background: accentColor }} />
            </header>

            {/* Content */}
            <main className={`section-content ${contentClassName}`.trim()}>
                {children}
            </main>

            <SectionNav route={pathname} />

            {/* Bottom border accent */}
            <div className="section-bottom-accent" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }} />
        </div>
    );
}
