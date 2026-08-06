'use client';

import React, { ReactNode } from 'react';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'cyan';
}

const glowColorMap: Record<string, { base: number; spread: number }> = {
    blue: { base: 220, spread: 200 },
    purple: { base: 280, spread: 300 },
    green: { base: 120, spread: 200 },
    orange: { base: 30, spread: 200 },
    red: { base: 0, spread: 200 },
    cyan: { base: 180, spread: 220 },
};

/**
 * Card with a cursor-tracked spotlight and a hue that shifts across the
 * viewport. Pointer position comes from <PointerSpotlight> via CSS variables on
 * <html>, so the card itself holds no listeners.
 */
export default function GlowCard({
    children,
    className = '',
    glowColor = 'purple',
}: GlowCardProps) {
    const { base, spread } = glowColorMap[glowColor];

    return (
        <div
            className={`spotlight-card glow-card ${className}`}
            style={{
                '--base': base,
                '--spread': spread,
            } as React.CSSProperties}
        >
            <div className="glow-card-outer" aria-hidden />
            {children}
        </div>
    );
}
