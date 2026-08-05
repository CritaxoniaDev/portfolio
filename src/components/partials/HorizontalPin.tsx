'use client';

import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';

/* ── Pinned horizontal scroll ───────────────────────────────────────────
   The frame is made taller than the viewport by exactly the distance the
   track needs to travel. While the page scrolls through that extra height
   the inner panel is stuck to the top and the track's own `scrollLeft` is
   driven from scroll progress — so the carousel's existing snap, focus
   effects and scroll events all keep working untouched.

   Below `minWidth`, or under `prefers-reduced-motion`, none of this
   engages and the track stays an ordinary horizontal scroller.
   ─────────────────────────────────────────────────────────────────────── */

/* Space kept clear for the fixed navigation bar. */
const NAV_CLEARANCE = 96;
/* Below this the stage would be too small to read, so the carousel simply
   stays an ordinary swipe carousel instead. */
const MIN_SCALE = 0.7;

export type PinApi = {
    pinned: boolean;
    /** Scrolls the page so the track lands at the given scrollLeft. */
    scrollTrackTo: (left: number, smooth?: boolean) => void;
};

export const HorizontalPin = ({
    trackRef,
    apiRef,
    minWidth = 1024,
    children,
}: {
    trackRef: RefObject<HTMLElement | null>;
    apiRef?: RefObject<PinApi | null>;
    minWidth?: number;
    children: ReactNode;
}) => {
    const frameRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const distanceRef = useRef(0);
    const [pinned, setPinned] = useState(false);

    useEffect(() => {
        const frame = frameRef.current;
        const panel = panelRef.current;
        const track = trackRef.current;
        if (!frame || !panel || !track) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let active = false;
        let frameId = 0;

        const measure = () => {
            const stage = stageRef.current;
            if (!stage) return;

            /* Measure unscaled, then work out how much the stage has to shrink
               to sit inside the viewport under the fixed navigation. */
            stage.style.setProperty('--pin-scale', '1');
            const available = window.innerHeight - NAV_CLEARANCE;
            const natural = stage.scrollHeight;
            const fit = natural > 0 ? available / natural : 1;
            const scale = Math.min(1, fit);

            const roomy = window.innerWidth >= minWidth && !reduced.matches && scale >= MIN_SCALE;
            const distance = roomy ? Math.max(0, track.scrollWidth - track.clientWidth) : 0;

            distanceRef.current = distance;
            active = distance > 0;

            if (active) {
                stage.style.setProperty('--pin-scale', scale.toFixed(3));
                /* Extra height = exactly the horizontal distance to cover. */
                frame.style.height = `${window.innerHeight + distance}px`;
                track.style.overflowX = 'hidden';
            } else {
                stage.style.removeProperty('--pin-scale');
                frame.style.height = '';
                track.style.overflowX = '';
                track.scrollLeft = 0;
            }
            setPinned(active);
        };

        const apply = () => {
            frameId = 0;
            if (!active) return;
            const distance = distanceRef.current;
            const start = frame.getBoundingClientRect().top + window.scrollY;
            const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
            track.scrollLeft = progress * distance;
        };

        const onScroll = () => {
            if (frameId) return;
            frameId = requestAnimationFrame(apply);
        };

        measure();
        apply();

        const resizeObserver = new ResizeObserver(() => {
            measure();
            apply();
        });
        resizeObserver.observe(track);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
        reduced.addEventListener('change', measure);

        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', measure);
            reduced.removeEventListener('change', measure);
            frame.style.height = '';
            track.style.overflowX = '';
        };
    }, [trackRef, minWidth]);

    /* Buttons and dots ask for a scrollLeft; while pinned that has to become
       a page scroll, or the next frame would immediately overwrite it. */
    useImperativeHandle(
        apiRef,
        () => ({
            pinned,
            scrollTrackTo: (left: number, smooth = true) => {
                const frame = frameRef.current;
                const track = trackRef.current;
                if (!track) return;

                if (!pinned || !frame || distanceRef.current === 0) {
                    track.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
                    return;
                }

                const start = frame.getBoundingClientRect().top + window.scrollY;
                const clamped = Math.min(distanceRef.current, Math.max(0, left));
                window.scrollTo({ top: start + clamped, behavior: smooth ? 'smooth' : 'auto' });
            },
        }),
        [pinned, trackRef]
    );

    return (
        <div ref={frameRef} className="relative" data-pinned={pinned || undefined}>
            <div
                ref={panelRef}
                className={
                    pinned
                        ? 'sticky top-0 flex h-screen flex-col justify-center overflow-x-clip pt-16'
                        : undefined
                }
            >
                <div
                    ref={stageRef}
                    className={pinned ? 'w-full origin-center' : undefined}
                    style={pinned ? { transform: 'scale(var(--pin-scale, 1))' } : undefined}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
