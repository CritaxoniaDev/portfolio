'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export type RevealDirection = 'left' | 'right' | 'up' | 'down' | 'zoom';

/* How far a section sits from its resting place before it is revealed. */
const FROM: Record<RevealDirection, string> = {
    left: 'translate3d(-4.5rem, 0, 0)',
    right: 'translate3d(4.5rem, 0, 0)',
    up: 'translate3d(0, 3.5rem, 0)',
    down: 'translate3d(0, -3.5rem, 0)',
    zoom: 'scale(0.955)',
};

/**
 * Slides a section into place from a given direction the first time it
 * scrolls into view.
 *
 * The hidden state is applied by the effect rather than rendered, so the
 * server markup and a JS-less browser both show plain, visible content —
 * and anything already on screen at first paint is left alone instead of
 * being hidden and re-revealed.
 */
export const SectionReveal = ({
    direction = 'up',
    children,
}: {
    direction?: RevealDirection;
    children: ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) return;

        el.dataset.armed = 'true';

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                el.dataset.revealed = 'true';
                observer.disconnect();
            },
            { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(el);

        /* Jumping straight here from a nav link would otherwise land on a
           section that is still invisible, so a hash match reveals it at once
           and skips the transition. */
        const sectionId = el.firstElementChild?.id;
        const onHashChange = () => {
            if (!sectionId || window.location.hash !== '#' + sectionId) return;
            el.dataset.instant = 'true';
            el.dataset.revealed = 'true';
            observer.disconnect();
        };
        window.addEventListener('hashchange', onHashChange);
        onHashChange();

        return () => {
            observer.disconnect();
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    return (
        <div
            ref={ref}
            className="section-reveal"
            style={{ '--reveal-from': FROM[direction] } as CSSProperties}
        >
            {children}
        </div>
    );
};
