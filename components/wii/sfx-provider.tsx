'use client';

import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from 'react';

interface WiiSfx {
    playHover: () => void;
    playSelect: () => void;
    playZip: () => void;
    playBack: () => void;
    playStartup: () => void;
    playBgMusic: () => void;
    stopBgMusic: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const SfxContext = createContext<WiiSfx | null>(null);

export function useWiiSfx() {
    const ctx = useContext(SfxContext);
    if (!ctx) throw new Error('useWiiSfx must be used within SfxProvider');
    return ctx;
}

export function SfxProvider({ children }: { children: React.ReactNode }) {
    const hoverRef = useRef<HTMLAudioElement | null>(null);
    const selectRef = useRef<HTMLAudioElement | null>(null);
    const zipRef = useRef<HTMLAudioElement | null>(null);
    const backRef = useRef<HTMLAudioElement | null>(null);
    const startupRef = useRef<HTMLAudioElement | null>(null);
    const bgMusicRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        hoverRef.current = new Audio('/audio/button-hover.mp3');
        selectRef.current = new Audio('/audio/button-select.mp3');
        zipRef.current = new Audio('/audio/zip.mp3');
        backRef.current = new Audio('/audio/back.mp3');
        startupRef.current = new Audio('/audio/startup.mp3');
        bgMusicRef.current = new Audio('/audio/bg-music.mp3');
        if (bgMusicRef.current) bgMusicRef.current.loop = true;
    }, []);

    const play = useCallback((ref: React.RefObject<HTMLAudioElement | null>) => {
        if (isMuted || !ref.current) return;
        ref.current.currentTime = 0;
        ref.current.play().catch(() => { });
    }, [isMuted]);

    const playHover = useCallback(() => play(hoverRef), [play]);
    const playSelect = useCallback(() => play(selectRef), [play]);
    const playZip = useCallback(() => { play(zipRef); play(selectRef); }, [play]);
    const playBack = useCallback(() => play(backRef), [play]);
    const playStartup = useCallback(() => play(startupRef), [play]);

    const playBgMusic = useCallback(() => {
        if (isMuted || !bgMusicRef.current) return;
        bgMusicRef.current.volume = 0.3;
        bgMusicRef.current.play().catch(() => { });
    }, [isMuted]);

    const stopBgMusic = useCallback(() => {
        if (!bgMusicRef.current) return;
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            if (!prev && bgMusicRef.current) bgMusicRef.current.pause();
            return !prev;
        });
    }, []);

    return (
        <SfxContext.Provider value={{ playHover, playSelect, playZip, playBack, playStartup, playBgMusic, stopBgMusic, isMuted, toggleMute }}>
            {children}
        </SfxContext.Provider>
    );
}
