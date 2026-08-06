'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSectionNeighbours, type Section } from '@/lib/sections';
import { useWiiSfx } from '../wii/sfx-provider';

interface SectionNavProps {
    route: string;
}

/** Ignore arrow keys while the visitor is typing. */
function isTyping(target: EventTarget | null) {
    const el = target as HTMLElement | null;
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

export default function SectionNav({ route }: SectionNavProps) {
    const router = useRouter();
    const { playHover, playSelect } = useWiiSfx();
    const { prev, next } = getSectionNeighbours(route);

    const go = useCallback(
        (section: Section | null) => {
            if (!section) return;
            playSelect();
            router.push(section.route);
        },
        [router, playSelect],
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                go(prev);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                go(next);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [go, prev, next]);

    useEffect(() => {
        [prev, next].forEach((s) => s && router.prefetch(s.route));
    }, [router, prev, next]);

    const renderArrow = (section: Section | null, direction: 'prev' | 'next') => {
        if (!section) return null;
        return (
            <button
                type="button"
                className={`section-arrow section-arrow-${direction}`}
                style={{ '--arrow-accent': section.accentColor } as React.CSSProperties}
                onMouseEnter={() => playHover()}
                onClick={() => go(section)}
                aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} section: ${section.label}`}
            >
                <span className="section-arrow-glyph">
                    {direction === 'prev' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
                </span>
                <span className="section-arrow-label">{section.label}</span>
            </button>
        );
    };

    return (
        <nav className="section-nav" aria-label="Section navigation">
            {renderArrow(prev, 'prev')}
            {renderArrow(next, 'next')}
            <p className="section-nav-hint">
                <kbd>←</kbd><kbd>→</kbd> to browse
            </p>
        </nav>
    );
}
