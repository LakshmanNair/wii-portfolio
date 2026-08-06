'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import ChannelGrid from '@/components/wii/channel-grid';
import { useWiiSfx } from '@/components/wii/sfx-provider';

// Resolve the boot phase before paint on the client so returning from a
// channel never flashes the start screen.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Phase = 'resolving' | 'prompt' | 'booting' | 'menu';

export default function Home() {
    const { playStartup, playBgMusic } = useWiiSfx();
    const [phase, setPhase] = useState<Phase>('resolving');

    useIsomorphicLayoutEffect(() => {
        if (sessionStorage.getItem('wii-started')) {
            setPhase('menu');
        } else {
            setPhase('prompt');
        }
    }, []);

    useEffect(() => {
        if (phase === 'menu') playBgMusic();
    }, [phase, playBgMusic]);

    const handleStart = () => {
        setPhase('booting');
        playStartup();
        setTimeout(() => {
            sessionStorage.setItem('wii-started', '1');
            setPhase('menu');
        }, 2200);
    };

    if (phase === 'resolving') {
        return <div className="w-screen h-screen bg-black" />;
    }

    if (phase === 'prompt') {
        return (
            <div
                className="flex items-center justify-center w-screen h-screen bg-black cursor-pointer select-none"
                onClick={handleStart}
            >
                <div className="text-center animate-pulse">
                    <div className="text-white/40 font-mono text-sm tracking-widest mb-3">CLICK ANYWHERE TO START</div>
                    <div className="text-white/15 font-mono text-xs">🎮</div>
                </div>
            </div>
        );
    }

    if (phase === 'booting') {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-black">
                <div className="text-center">
                    <div className="text-white font-mono text-2xl tracking-widest animate-pulse" style={{ animationDuration: '600ms' }}>
                        Wii
                    </div>
                </div>
            </div>
        );
    }

    return <ChannelGrid />;
}
