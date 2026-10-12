'use client';

import { useEffect } from 'react';

const CARD_SELECTOR = '.spotlight-card, .glass-card, .project-card';
/** Distance past the card edge where the multicolour border glow still fires. */
const EDGE_PROXIMITY = 96;
/** How long the glow follows the page after the finger lifts (momentum scroll). */
const TOUCH_LINGER = 700;

/**
 * Publishes pointer coords for card effects, written only to cards near the
 * pointer so other elements never restyle:
 *   card   --mx / --my          local pointer position
 *   card   --xp                 pointer x as a fraction of the viewport (hue)
 *   card   data-spotlight       "1" only while the pointer is ON the card
 *   card   data-edge            "1" while ON the card OR within EDGE_PROXIMITY
 *
 * On touch the finger stands in for the cursor; the glow keeps tracking the
 * last touch point while the page scrolls under it, then fades out.
 *
 * Spotlight (background wash) is CSS-gated on [data-spotlight="1"].
 * Edge / outer glow is CSS-gated on [data-edge="1"].
 */
export default function PointerSpotlight() {
    useEffect(() => {
        let frame = 0;
        let lingerTimer = 0;
        let x = -9999;
        let y = -9999;
        let seen = false;
        let touching = false;

        const flush = () => {
            frame = 0;

            const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);
            if (!cards.length) return;

            const xp = (x / window.innerWidth).toFixed(3);
            const rects = Array.from(cards, (card) => card.getBoundingClientRect());
            cards.forEach((card, i) => {
                const rect = rects[i];

                const near =
                    x >= rect.left - EDGE_PROXIMITY &&
                    x <= rect.right + EDGE_PROXIMITY &&
                    y >= rect.top - EDGE_PROXIMITY &&
                    y <= rect.bottom + EDGE_PROXIMITY;

                if (!near) {
                    if (card.hasAttribute('data-edge')) card.removeAttribute('data-edge');
                    if (card.hasAttribute('data-spotlight')) card.removeAttribute('data-spotlight');
                    return;
                }

                const inside =
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom;

                card.style.setProperty('--mx', (x - rect.left).toFixed(1));
                card.style.setProperty('--my', (y - rect.top).toFixed(1));
                card.style.setProperty('--xp', xp);
                card.setAttribute('data-edge', '1');

                if (inside) card.setAttribute('data-spotlight', '1');
                else card.removeAttribute('data-spotlight');
            });
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(flush);
        };

        const clearTouch = () => {
            lingerTimer = 0;
            x = -9999;
            y = -9999;
            seen = false;
            schedule();
        };

        const startLinger = () => {
            window.clearTimeout(lingerTimer);
            lingerTimer = window.setTimeout(clearTouch, TOUCH_LINGER);
        };

        const handleMove = (e: PointerEvent) => {
            // Touch is handled by the touch listeners, which keep firing mid-scroll.
            if (e.pointerType === 'touch') return;
            x = e.clientX;
            y = e.clientY;
            seen = true;
            schedule();
        };

        const handleTouch = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            window.clearTimeout(lingerTimer);
            touching = true;
            x = touch.clientX;
            y = touch.clientY;
            seen = true;
            schedule();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (e.touches.length) return;
            touching = false;
            startLinger();
        };

        const handleScroll = () => {
            if (!seen) return;
            schedule();
            if (lingerTimer && !touching) startLinger();
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        window.addEventListener('touchstart', handleTouch, { passive: true });
        window.addEventListener('touchmove', handleTouch, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (frame) cancelAnimationFrame(frame);
            window.clearTimeout(lingerTimer);
        };
    }, []);

    return null;
}
