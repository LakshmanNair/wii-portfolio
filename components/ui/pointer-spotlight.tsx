'use client';

import { useEffect } from 'react';

const CARD_SELECTOR = '.spotlight-card, .glass-card, .project-card';
/** Distance past the card edge where the multicolour border glow still fires. */
const EDGE_PROXIMITY = 96;

/**
 * Publishes pointer coords for card effects:
 *   :root  --x / --y / --xp / --yp
 *   card   --mx / --my          local pointer position
 *   card   data-spotlight       "1" only while the pointer is ON the card
 *   card   data-edge            "1" while ON the card OR within EDGE_PROXIMITY
 *
 * Spotlight (background wash) is CSS-gated on [data-spotlight="1"].
 * Edge / outer glow is CSS-gated on [data-edge="1"].
 */
export default function PointerSpotlight() {
    useEffect(() => {
        const root = document.documentElement;
        let frame = 0;
        let x = -9999;
        let y = -9999;
        let seen = false;

        const flush = () => {
            frame = 0;

            root.style.setProperty('--x', x.toFixed(1));
            root.style.setProperty('--y', y.toFixed(1));
            root.style.setProperty('--xp', (x / window.innerWidth).toFixed(3));
            root.style.setProperty('--yp', (y / window.innerHeight).toFixed(3));

            const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);
            if (!cards.length) return;

            const rects = Array.from(cards, (card) => card.getBoundingClientRect());
            cards.forEach((card, i) => {
                const rect = rects[i];
                const localX = x - rect.left;
                const localY = y - rect.top;
                card.style.setProperty('--mx', localX.toFixed(1));
                card.style.setProperty('--my', localY.toFixed(1));

                const inside =
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom;

                const near =
                    x >= rect.left - EDGE_PROXIMITY &&
                    x <= rect.right + EDGE_PROXIMITY &&
                    y >= rect.top - EDGE_PROXIMITY &&
                    y <= rect.bottom + EDGE_PROXIMITY;

                if (inside) card.setAttribute('data-spotlight', '1');
                else card.removeAttribute('data-spotlight');

                if (near) card.setAttribute('data-edge', '1');
                else card.removeAttribute('data-edge');
            });
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(flush);
        };

        const handleMove = (e: PointerEvent) => {
            x = e.clientX;
            y = e.clientY;
            seen = true;
            schedule();
        };

        const handleScroll = () => {
            if (seen) schedule();
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return null;
}
