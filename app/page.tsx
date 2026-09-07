'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChannelGrid from '@/components/wii/channel-grid';
import { useWiiSfx } from '@/components/wii/sfx-provider';

// Resolve the boot phase before paint on the client so returning from a
// channel never flashes the start screen.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Phase = 'resolving' | 'booting' | 'menu';

const BOOT_MS = 2200;

export default function Home() {
    const { playStartup, playBgMusic } = useWiiSfx();
    const [phase, setPhase] = useState<Phase>('resolving');
    const [fadeIn, setFadeIn] = useState(false);
    const startedRef = useRef(false);

    useIsomorphicLayoutEffect(() => {
        if (sessionStorage.getItem('wii-started')) {
            setPhase('menu');
        } else {
            // First visit: black screen + intro noise, then fade into the menu.
            setPhase('booting');
        }
    }, []);

    useEffect(() => {
        if (phase !== 'booting' || startedRef.current) return;
        startedRef.current = true;
        playStartup();

        const t = window.setTimeout(() => {
            sessionStorage.setItem('wii-started', '1');
            setFadeIn(true);
            setPhase('menu');
        }, BOOT_MS);

        return () => window.clearTimeout(t);
    }, [phase, playStartup]);

    useEffect(() => {
        if (phase === 'menu') playBgMusic();
    }, [phase, playBgMusic]);

    if (phase === 'resolving' || phase === 'booting') {
        return <div className="w-screen h-screen bg-black" aria-hidden />;
    }

    return (
        <div className={fadeIn ? 'wii-menu-fade-in' : undefined}>
            <ChannelGrid />
        </div>
    );
}
