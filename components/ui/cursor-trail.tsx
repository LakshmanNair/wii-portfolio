'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
}

interface CursorTrailProps {
    /** Base hue for the dust; usually the page accent. */
    hue?: number;
}

const MAX_PARTICLES = 260;
const GRAVITY = 0.045;
const DRAG = 0.985;

/**
 * Stardust that falls from the cursor — a soft companion to the starfield
 * rather than a hard pointer replacement. Emission scales with pointer speed,
 * so it stays quiet until you actually move.
 */
export default function CursorTrail({ hue = 190 }: CursorTrailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hueRef = useRef(hue);

    // Kept in a ref so a hue change doesn't tear down the animation loop.
    useEffect(() => {
        hueRef.current = hue;
    }, [hue]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.matchMedia('(hover: none)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        const particles: Particle[] = [];
        let lastX = -1;
        let lastY = -1;

        const emit = (x: number, y: number, speed: number) => {
            const count = Math.min(4, 1 + Math.floor(speed / 14));
            for (let i = 0; i < count; i++) {
                if (particles.length >= MAX_PARTICLES) particles.shift();
                const maxLife = 55 + Math.random() * 45;
                particles.push({
                    x: x + (Math.random() - 0.5) * 6,
                    y: y + (Math.random() - 0.5) * 6,
                    vx: (Math.random() - 0.5) * 0.9,
                    vy: (Math.random() - 0.5) * 0.6 - 0.3,
                    life: maxLife,
                    maxLife,
                    size: Math.random() * 1.6 + 0.5,
                    hue: hueRef.current + (Math.random() - 0.5) * 40,
                });
            }
        };

        const handleMove = (e: PointerEvent) => {
            const { clientX: x, clientY: y } = e;
            if (lastX >= 0) {
                const speed = Math.hypot(x - lastX, y - lastY);
                if (speed > 1.5) emit(x, y, speed);
            }
            lastX = x;
            lastY = y;
        };
        window.addEventListener('pointermove', handleMove, { passive: true });

        let raf = 0;
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.vy += GRAVITY;
                p.vx *= DRAG;
                p.vy *= DRAG;
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 1;

                if (p.life <= 0 || p.y > height + 20) {
                    particles.splice(i, 1);
                    continue;
                }

                const t = p.life / p.maxLife;
                const alpha = t * t * 0.85;
                const radius = p.size * (0.4 + t * 0.6);

                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
                glow.addColorStop(0, `hsla(${p.hue}, 100%, 78%, ${alpha})`);
                glow.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = `hsla(${p.hue}, 100%, 92%, ${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            raf = requestAnimationFrame(render);
        };
        raf = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', handleMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 90,
            }}
        />
    );
}
