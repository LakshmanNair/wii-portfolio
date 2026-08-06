'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { useWiiSfx } from './sfx-provider';
import { useRouter } from 'next/navigation';
import ChannelPreview from './channel-preview';
import { sections, type Section } from '@/lib/sections';
import { CONTACT_EMAIL, RESUME_PATH } from '@/lib/profile';

const COLUMNS = 4;
const ROWS = 3;

// Channels fill the grid left-to-right, top-to-bottom, the way the real Wii
// menu does. The DOM is column-major, so each column reads its own slots.
const slots: (Section | null)[] = Array.from(
    { length: COLUMNS * ROWS },
    (_, i) => sections[i] ?? null,
);

const columnSlots = Array.from({ length: COLUMNS }, (_, col) =>
    Array.from({ length: ROWS }, (_, row) => slots[row * COLUMNS + col]),
);

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// The date depends on the viewer's clock, so it stays blank until hydration.
const subscribeToNothing = () => () => { };
const getLocalDate = () => {
    const d = new Date();
    return `${WEEKDAYS[d.getDay()]} ${d.getMonth() + 1}/${d.getDate()}`;
};

export default function ChannelGrid() {
    const { playHover, playZip, playSelect } = useWiiSfx();
    const router = useRouter();
    const [zooming, setZooming] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
    const dateStr = useSyncExternalStore(subscribeToNothing, getLocalDate, () => '');

    const handleChannelClick = (section: Section | null, e: React.MouseEvent) => {
        if (!section || zooming) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setZoomOrigin(`${cx}px ${cy}px`);
        setZooming(true);
        playZip();

        setTimeout(() => {
            router.push(section.route);
        }, 700);
    };

    return (
        <div
            className={`wii-classic-menu ${zooming ? 'channel-splash' : ''}`}
            style={{ transformOrigin: zoomOrigin }}
        >
            {/* Top section — channel grid */}
            <div className="wii-classic-top">
                <div className="wii-channels">
                    <div className="wii-channels-container">
                        {columnSlots.map((col, colIdx) => (
                            <div className={`wii-col ${colIdx === 0 ? 'first' : ''}`} key={colIdx}>
                                {col.map((section, rowIdx) => (
                                    <div
                                        key={section?.id ?? `blank-${colIdx}-${rowIdx}`}
                                        className={`wii-channel-icon ${section ? 'occupied' : 'blank'}`}
                                        onMouseEnter={() => section && playHover()}
                                        onClick={(e) => handleChannelClick(section, e)}
                                    >
                                        {section && (
                                            <>
                                                <div className="wii-channel-preview-wrap">
                                                    <ChannelPreview
                                                        title={section.label}
                                                        subtitle={section.subtitle}
                                                        accentColor={section.accentColor}
                                                        variant={section.variant}
                                                    />
                                                </div>
                                                <div className="wii-channel-hover" />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="wii-classic-bottom">
                <div className="wii-bottom-title">
                    <span className="wii-bottom-title-text">My Portfolio</span>
                </div>

                <div className="wii-left-button-container">
                    <div className="wii-left-button" />
                    <a
                        href={RESUME_PATH}
                        download
                        className="wii-wii-button wii-corner-button"
                        onMouseEnter={() => playHover()}
                        onClick={() => playSelect()}
                        aria-label="Download my résumé (PDF)"
                    >
                        <span className="wii-corner-label">Résumé</span>
                    </a>
                </div>

                <div className="wii-date-display">
                    <span>{dateStr}</span>
                </div>

                <div className="wii-right-button-container">
                    <div className="wii-right-button" />
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="wii-mail-button wii-corner-button"
                        onMouseEnter={() => playHover()}
                        onClick={() => playSelect()}
                        aria-label={`Email me at ${CONTACT_EMAIL}`}
                    >
                        <span className="wii-corner-label">Email Me</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
