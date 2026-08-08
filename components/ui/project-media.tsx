'use client';

import { useEffect, useRef } from 'react';

type ProjectMediaProps = {
    image?: string;
    video?: string;
    poster?: string;
    alt: string;
    color: string;
    /** Playback rate for looping demos (e.g. 1.5). */
    playbackRate?: number;
};

/**
 * Thumbnail media for a project card. Videos are always muted (autoplay policy
 * + portfolio UX) and can run slightly accelerated.
 */
export default function ProjectMedia({
    image,
    video,
    poster,
    alt,
    color,
    playbackRate = 1,
}: ProjectMediaProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        el.muted = true;
        el.defaultMuted = true;
        el.volume = 0;
        el.playbackRate = playbackRate;
        const play = () => {
            el.playbackRate = playbackRate;
            void el.play().catch(() => { /* autoplay may be blocked until gesture */ });
        };
        play();
        el.addEventListener('loadeddata', play);
        return () => el.removeEventListener('loadeddata', play);
    }, [playbackRate, video]);

    if (video) {
        return (
            <video
                ref={videoRef}
                className="project-media"
                src={video}
                poster={poster || image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
        <div className="project-media-fallback" style={{ background: `radial-gradient(circle at 50% 45%, ${color}55, transparent 70%)` }}>
            <span className="text-white/35 text-xs font-mono">PREVIEW COMING SOON</span>
        </div>
    );
}
