'use client';

import { useEffect } from 'react';

/* ── Layered scroll depth ───────────────────────────────────────────────
   One controller for the whole page: a single rAF-throttled scroll handler
   nudges background layers at different rates so sections gain depth
   without anything obviously "animating".

   Offsets are measured once per resize (not per frame) so the loop never
   reads layout, and only layers near the viewport are touched.
   ─────────────────────────────────────────────────────────────────────── */

/* Selector → drift rate. Small numbers on purpose: the effect should be
   felt rather than noticed. */
const LAYERS: [selector: string, speed: number][] = [
    ['.ghost-number', 0.18],
    ['.grid-bg', 0.05],
    ['.dot-grid', 0.08],
    ['[data-parallax]', 0.12],
];

const MAX_DRIFT = 110; // px, so a fast flick can never fling a layer off-plot

type Layer = { el: HTMLElement; speed: number; centre: number; height: number; near: boolean };

export const ParallaxLayers = () => {
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduced.matches) return;

        let layers: Layer[] = [];
        let frame = 0;
        let observer: IntersectionObserver | null = null;

        const collect = () => {
            observer?.disconnect();
            observer = new IntersectionObserver(
                entries => {
                    for (const entry of entries) {
                        const layer = layers.find(l => l.el === entry.target);
                        if (layer) layer.near = entry.isIntersecting;
                    }
                },
                { rootMargin: '25% 0px 25% 0px' }
            );

            layers = LAYERS.flatMap(([selector, speed]) =>
                [...document.querySelectorAll<HTMLElement>(selector)].map(el => {
                    const rate = Number(el.dataset.parallax) || speed;
                    const rect = el.getBoundingClientRect();
                    return {
                        el,
                        speed: rate,
                        centre: rect.top + window.scrollY + rect.height / 2,
                        height: rect.height,
                        near: false,
                    };
                })
            );

            for (const layer of layers) observer!.observe(layer.el);
        };

        const apply = () => {
            frame = 0;
            const viewportCentre = window.scrollY + window.innerHeight / 2;

            for (const layer of layers) {
                if (!layer.near) continue;
                const drift = (viewportCentre - layer.centre) * layer.speed;
                const clamped = Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, drift));
                layer.el.style.setProperty('--parallax-y', `${clamped.toFixed(1)}px`);
            }
        };

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(apply);
        };

        /* Wait for fonts so measured centres reflect the final layout. */
        const start = () => {
            collect();
            apply();
        };
        document.fonts?.ready.then(start).catch(start);
        start();

        const onResize = () => {
            collect();
            apply();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            for (const layer of layers) layer.el.style.removeProperty('--parallax-y');
        };
    }, []);

    return null;
};
