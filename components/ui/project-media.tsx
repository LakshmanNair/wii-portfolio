'use client';

import { useEffect, useRef } from 'react';

type ProjectMediaProps = {
    image?: string;
    video?: string;
    poster?: string;
    alt: string;
    color: string;
};

/**
 * Thumbnail media for a project card.
 *
 * Videos render as a real player with native controls, so a viewer can scrub
 * or go fullscreen to read the UI up close. The source files are encoded with
 * no audio stream at all; the volumechange guard below keeps the element muted
 * even if a browser exposes an unmute affordance for the empty track.
 */
export default function ProjectMedia({ image, video, poster, alt, color }: ProjectMediaProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        const forceMute = () => {
            if (!el.muted || el.volume !== 0) {
                el.muted = true;
                el.volume = 0;
            }
        };

        forceMute();
        el.addEventListener('volumechange', forceMute);
        return () => el.removeEventListener('volumechange', forceMute);
    }, [video]);

    if (video) {
        return (
            <video
                ref={videoRef}
                className="project-media project-media-player"
                src={video}
                poster={poster}
                controls
                muted
                loop
                playsInline
                preload="metadata"
                controlsList="nodownload noremoteplayback"
                aria-label={alt}
            />
        );
    }

    if (image) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="project-media" src={image} alt={alt} loading="lazy" />
        );
    }

    return (
        <div
            className="project-media-fallback"
            style={{ background: `radial-gradient(circle at 50% 45%, ${color}55, transparent 70%)` }}
        >
            <span className="text-white/35 text-xs font-mono">PREVIEW COMING SOON</span>
        </div>
    );
}
