'use client';

import { useEffect, useState } from 'react';

const SHOW_AFTER = 400; // px scrolled before button reveals
const SIZE = 60;        // diameter of the button in px
const STROKE = 1.5;     // ring stroke width
const RADIUS = (SIZE / 2) - 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const BackToTop = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
            setProgress(ratio);
            setVisible(scrollTop > SHOW_AFTER);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        // Use Lenis if available (smoother since the rest of the site uses it)
        const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(0, { duration: 1.6 });
            return;
        }
        // Fallback to native smooth scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const dashOffset = CIRCUMFERENCE * (1 - progress);

    return (
        <div
            aria-hidden={!visible}
            className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-out sm:bottom-6 sm:right-6 ${
                visible
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group relative block focus:outline-none"
                style={{ width: SIZE, height: SIZE }}
            >
                {/* Lift wrapper — both the bg + ring + arrow translate together on hover */}
                <span className="relative block h-full w-full transition-transform duration-200 ease-out group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] group-focus-visible:-translate-x-[2px] group-focus-visible:-translate-y-[2px]">
                    {/* Cream paper background with brutalist offset shadow */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-black bg-[rgb(244,243,238)] shadow-[3px_3px_0_rgba(10,10,10,0.85)] transition-shadow duration-200 ease-out group-hover:shadow-[5px_5px_0_rgba(10,10,10,0.85)] group-focus-visible:shadow-[5px_5px_0_rgba(10,10,10,0.85)]"
                    />

                    {/* Progress ring */}
                    <svg
                        viewBox={`0 0 ${SIZE} ${SIZE}`}
                        className="absolute inset-0 -rotate-90"
                        aria-hidden="true"
                    >
                        {/* faint track */}
                        <circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            fill="none"
                            stroke="#0a0a0a"
                            strokeOpacity="0.12"
                            strokeWidth={STROKE}
                        />
                        {/* progress */}
                        <circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            fill="none"
                            stroke="#0a0a0a"
                            strokeWidth={STROKE}
                            strokeDasharray={CIRCUMFERENCE}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.15s linear' }}
                        />
                        {/* tiny tick at the top — marks the 0% / 100% point */}
                        <line
                            x1={SIZE / 2}
                            y1={4 - STROKE - 2}
                            x2={SIZE / 2}
                            y2={4 - STROKE + 2}
                            stroke="#0a0a0a"
                            strokeWidth="1"
                            transform={`rotate(90 ${SIZE / 2} ${SIZE / 2})`}
                            opacity="0.5"
                        />
                    </svg>

                    {/* Arrow + label, stacked vertically */}
                    <span className="absolute inset-0 flex flex-col items-center justify-center leading-none text-black transition-transform duration-300 ease-out group-hover:-translate-y-[2px]">
                        <span className="text-[1.1rem] leading-none">↑</span>
                        <span
                            className="font-mono mt-0.5 text-[0.42rem] leading-none tracking-[0.22em] text-black/65 smallcaps"
                            style={{ letterSpacing: '0.22em' }}
                        >
                            Top
                        </span>
                    </span>

                    {/* Progress percentage — appears on hover at the bottom of the dial */}
                    <span className="font-mono pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full text-[0.5rem] leading-none tracking-[0.2em] text-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 smallcaps">
                        {Math.round(progress * 100)}%
                    </span>
                </span>

                {/* Tooltip — slides in from the right on hover */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap border border-black bg-[rgb(244,243,238)] px-2.5 py-1 font-mono text-[0.55rem] leading-none tracking-[0.22em] text-black opacity-0 shadow-[3px_3px_0_rgba(10,10,10,0.85)] transition-all duration-300 ease-out smallcaps group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                >
                    — Back to top
                </span>
            </button>
        </div>
    );
};