'use client';

import React from 'react';

export type PreviewVariant = 'hero' | 'timeline' | 'badges' | 'cards' | 'list' | 'contact';

interface ChannelPreviewProps {
    title: string;
    subtitle?: string;
    accentColor: string;
    variant: PreviewVariant;
}

// Fixed positions keep server and client markup identical.
const STARS = [
    { left: 8, top: 14, size: 1 }, { left: 21, top: 62, size: 1.5 },
    { left: 34, top: 28, size: 1 }, { left: 47, top: 78, size: 1 },
    { left: 58, top: 12, size: 1.5 }, { left: 69, top: 55, size: 1 },
    { left: 81, top: 33, size: 1 }, { left: 92, top: 71, size: 1.5 },
    { left: 15, top: 88, size: 1 }, { left: 63, top: 91, size: 1 },
];

const BADGE_WIDTHS = ['22%', '30%', '18%', '26%', '20%', '34%', '24%'];

function PreviewBody({ variant }: { variant: PreviewVariant }) {
    switch (variant) {
        case 'timeline':
            return (
                <div className="cp-mock cp-mock-timeline">
                    <span className="cp-tl-line" />
                    {[0, 1].map((i) => (
                        <div className="cp-tl-row" key={i}>
                            <span className="cp-tl-role" />
                            <span className="cp-tl-year" />
                        </div>
                    ))}
                </div>
            );

        case 'badges':
            return (
                <div className="cp-mock cp-mock-badges">
                    {BADGE_WIDTHS.map((w, i) => (
                        <span className="cp-badge" key={i} style={{ width: w }} />
                    ))}
                </div>
            );

        case 'cards':
            return (
                <div className="cp-mock cp-mock-cards">
                    {[0, 1, 2, 3].map((i) => (
                        <span className="cp-proj" key={i}>
                            <span className="cp-proj-thumb" />
                            <span className="cp-proj-line" />
                        </span>
                    ))}
                </div>
            );

        case 'list':
            return (
                <div className="cp-mock cp-mock-list">
                    <span className="cp-list-line" />
                    {[0, 1].map((i) => (
                        <span className="cp-list-item" key={i}>
                            <span className="cp-list-dot" />
                            <span className="cp-list-card" />
                        </span>
                    ))}
                </div>
            );

        case 'contact':
            return (
                <div className="cp-mock cp-mock-contact">
                    <span className="cp-field" />
                    <span className="cp-field" />
                    <span className="cp-field cp-field-tall" />
                    <span className="cp-send" />
                </div>
            );

        case 'hero':
        default:
            return (
                <div className="cp-mock cp-mock-hero">
                    <div className="cp-pill-row">
                        {[0, 1, 2].map((i) => <span className="cp-pill" key={i} />)}
                    </div>
                    <div className="cp-card-row">
                        {[0, 1, 2].map((i) => <span className="cp-mini-card" key={i} />)}
                    </div>
                </div>
            );
    }
}

export default function ChannelPreview({ title, subtitle, accentColor, variant }: ChannelPreviewProps) {
    return (
        <div className="channel-preview" style={{ '--preview-accent': accentColor } as React.CSSProperties}>
            <div className="cp-stars">
                {STARS.map((s, i) => (
                    <span
                        key={i}
                        className="cp-star"
                        style={{
                            left: `${s.left}%`,
                            top: `${s.top}%`,
                            width: `${s.size}px`,
                            height: `${s.size}px`,
                            animationDelay: `${i * 0.35}s`,
                        }}
                    />
                ))}
            </div>

            <div className="cp-glow" />

            {/* Miniature of the section page's sticky header */}
            <div className="cp-header">
                <span className="cp-back" />
                <span className="cp-header-title">{title}</span>
                <span className="cp-header-accent" />
            </div>

            {/* Page body — title dominates, mock content hints at the real layout */}
            <div className="cp-body">
                <h3 className="cp-title">{title}</h3>
                {subtitle && <p className="cp-subtitle">{subtitle}</p>}
                <PreviewBody variant={variant} />
            </div>
        </div>
    );
}
