import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Props = {
    onComplete?: () => void;
    minDuration?: number; // ms — total loading time
};

const statuses = [
    'Setting type',
    'Composing pages',
    'Inking the plates',
    'Binding the spine',
    'Pulling the print',
];

const NAME = 'Gian Raphael Alcantara';

export const SplashScreen = ({ onComplete, minDuration = 2800 }: Props) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [progress, setProgress] = useState(0);
    const [statusIdx, setStatusIdx] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'ready' | 'exiting' | 'gone'>('loading');
    const startRef = useRef<number | null>(null);

    // Ink color used inside the SVG accent — flips with theme
    const ink = isDark ? '#f0efe9' : '#0a0a0a';

    // Lock body scroll while splash is visible
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    // Progress ticker
    useEffect(() => {
        if (phase !== 'loading') return;
        let raf: number;

        const tick = (now: number) => {
            if (startRef.current === null) startRef.current = now;
            const elapsed = now - startRef.current;
            const pct = Math.min((elapsed / minDuration) * 100, 100);
            setProgress(pct);

            const idx = Math.min(
                Math.floor((pct / 100) * statuses.length),
                statuses.length - 1
            );
            setStatusIdx(idx);

            if (pct < 100) {
                raf = requestAnimationFrame(tick);
            } else {
                setPhase('ready');
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [minDuration, phase]);

    // 'ready' → brief hold → 'exiting'
    useEffect(() => {
        if (phase !== 'ready') return;
        const t = setTimeout(() => setPhase('exiting'), 600);
        return () => clearTimeout(t);
    }, [phase]);

    // 'exiting' → wait for slide animation → unmount
    useEffect(() => {
        if (phase !== 'exiting') return;
        const t = setTimeout(() => {
            setPhase('gone');
            onComplete?.();
        }, 950);
        return () => clearTimeout(t);
    }, [phase, onComplete]);

    if (phase === 'gone') return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)]"
            style={{
                transform: phase === 'exiting' ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.95s cubic-bezier(0.7, 0, 0.3, 1)',
            }}
            role="status"
            aria-live="polite"
            aria-label="Loading portfolio"
            aria-hidden={phase !== 'loading'}
        >
            <style>{`
                @keyframes splash-letter {
                    from { opacity: 0; transform: translateY(48px); filter: blur(10px); }
                    to   { opacity: 1; transform: translateY(0);    filter: blur(0);    }
                }
                @keyframes splash-fade-up {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                @keyframes splash-bracket {
                    from { opacity: 0; transform: scale(0.4); }
                    to   { opacity: 1; transform: scale(1);   }
                }
                @keyframes splash-rotate {
                    from { transform: rotate(0deg);   }
                    to   { transform: rotate(360deg); }
                }
                @keyframes splash-status-in {
                    from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
                    to   { opacity: 1; transform: translateY(0);    filter: blur(0);    }
                }
                @keyframes splash-ready-pulse {
                    0%, 100% { transform: scale(1);    }
                    50%      { transform: scale(1.04); }
                }

                .sp-letter   { display: inline-block; opacity: 0; animation: splash-letter 0.85s cubic-bezier(0.2,0.7,0.2,1) forwards; }
                .sp-fade     { opacity: 0; animation: splash-fade-up 0.8s cubic-bezier(0.2,0.7,0.2,1) forwards; }
                .sp-bracket  { opacity: 0; animation: splash-bracket 0.6s 0.25s cubic-bezier(0.2,0.7,0.2,1) forwards; }
                .sp-spin     { animation: splash-rotate 3.6s linear infinite; }
                .sp-status   { animation: splash-status-in 0.5s cubic-bezier(0.2,0.7,0.2,1) both; }
                .sp-ready    { animation: splash-ready-pulse 0.55s ease-out; }

                @media (prefers-reduced-motion: reduce) {
                    .sp-letter, .sp-fade, .sp-bracket, .sp-status, .sp-ready {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        filter: none !important;
                    }
                    .sp-spin { animation: none !important; }
                }
            `}</style>

            {/* Layered backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
            <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Soft radial highlight */}
            <div
                className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(180,150,110,0.18), transparent 65%)' }}
            />

            {/* Top meta row */}
            <div
                className="sp-fade absolute left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/55 dark:text-white/40 smallcaps sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.1s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">
                    Vol. 00 / Index
                </span>
                <span className="hidden shrink-0 sm:inline">— A Portfolio in Five Volumes</span>
                <span className="hidden shrink-0 font-mono tracking-[0.12em] xs:inline">
                    MMXXIV
                </span>
            </div>

            {/* Corner brackets */}
            <span className="sp-bracket absolute top-20 left-5 h-4 w-4 border-t border-l border-black dark:border-white/65 sm:top-24 sm:left-6 md:top-28 md:left-12" />
            <span className="sp-bracket absolute top-20 right-5 h-4 w-4 border-t border-r border-black dark:border-white/65 sm:top-24 sm:right-6 md:top-28 md:right-12" />
            <span className="sp-bracket absolute bottom-32 left-5 h-4 w-4 border-b border-l border-black dark:border-white/65 sm:bottom-36 sm:left-6 md:bottom-40 md:left-12" />
            <span className="sp-bracket absolute bottom-32 right-5 h-4 w-4 border-b border-r border-black dark:border-white/65 sm:bottom-36 sm:right-6 md:bottom-40 md:right-12" />

            {/* Rotating accent (top-right) */}
            <div
                className="sp-fade absolute top-16 right-5 z-10 hidden sm:top-20 sm:right-6 sm:block md:top-24 md:right-12"
                style={{ animationDelay: '0.4s' }}
            >
                <svg width="44" height="44" viewBox="0 0 44 44" className="sp-spin opacity-60" aria-hidden="true">
                    <circle cx="22" cy="22" r="18" fill="none" stroke={ink} strokeWidth="0.8" strokeDasharray="2 4" />
                    <circle cx="22" cy="22" r="2" fill={ink} />
                    <line x1="22" y1="4" x2="22" y2="10" stroke={ink} strokeWidth="0.8" />
                </svg>
            </div>

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                00
            </div>

            {/* Center content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 sm:px-6 md:px-12">
                <p
                    className="sp-fade mb-6 flex items-center gap-3 text-[0.72rem] leading-none text-black/65 dark:text-white/45 smallcaps sm:mb-8 sm:text-[0.76rem]"
                    style={{ animationDelay: '0.2s' }}
                >
                    <span className="block h-px w-8 bg-black/40 dark:bg-white/25 sm:w-10" />
                    <span>A Portfolio</span>
                    <span className="font-mono text-black/40 dark:text-white/25">— Vol. 005</span>
                </p>

                <h1
                    className="text-center font-black"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                        lineHeight: '0.92',
                        letterSpacing: '-0.005em',
                        textWrap: 'balance',
                    }}
                >
                    {NAME.split('').map((char, i) => (
                        <span
                            key={i}
                            className="sp-letter"
                            style={{ animationDelay: `${0.35 + i * 0.035}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>

                <p
                    className="sp-fade font-serif-alt mt-6 text-center text-[1.2rem] italic text-black/60 dark:text-white/45 sm:mt-8 sm:text-[1.4rem]"
                    style={{ animationDelay: `${0.35 + NAME.length * 0.035 + 0.15}s` }}
                >
                    a studio of one — software, design &amp; intent.
                </p>

                {/* Decorative italic accent */}
                <div
                    className="sp-fade mt-6 flex items-center gap-3 sm:mt-8"
                    style={{ animationDelay: `${0.35 + NAME.length * 0.035 + 0.3}s` }}
                >
                    <span className="block h-px w-12 bg-black/25 dark:bg-white/20" />
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-black/45 dark:text-white/30 smallcaps">
                        Est. 2019 · New York
                    </span>
                    <span className="block h-px w-12 bg-black/25 dark:bg-white/20" />
                </div>
            </div>

            {/* Bottom: status + counter + progress bar */}
            <div className="relative z-10 px-5 pb-10 sm:px-6 sm:pb-12 md:px-12 md:pb-16">
                <div
                    className="sp-fade mb-4 flex items-end justify-between gap-4 sm:mb-5"
                    style={{ animationDelay: '0.55s' }}
                >
                    {/* Status */}
                    <div className="min-w-0">
                        <div className="mb-2 font-mono text-[0.55rem] leading-none tracking-[0.22em] text-black/40 dark:text-white/25 smallcaps">
                            Status
                        </div>
                        {phase === 'loading' ? (
                            <div
                                key={statusIdx}
                                className="sp-status font-serif-alt truncate text-[1.1rem] italic text-black/75 dark:text-white/55 sm:text-[1.3rem]"
                            >
                                {statuses[statusIdx]}
                                <span className="text-black/40 dark:text-white/25">...</span>
                            </div>
                        ) : (
                            <div className="sp-ready font-serif-alt text-[1.1rem] italic text-black dark:text-white sm:text-[1.3rem]">
                                Ready
                                <span className="ml-2 inline-block h-2 w-2 -translate-y-[3px] bg-black dark:bg-white" />
                            </div>
                        )}
                    </div>

                    {/* Counter */}
                    <div className="shrink-0 text-right">
                        <div className="mb-2 font-mono text-[0.55rem] leading-none tracking-[0.22em] text-black/40 dark:text-white/25 smallcaps">
                            Loaded
                        </div>
                        <div
                            className="font-black tabular-nums"
                            style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.25rem)', lineHeight: '0.9' }}
                        >
                            {String(Math.floor(progress)).padStart(3, '0')}
                            <span className="text-black/30 dark:text-white/20">/100</span>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div
                    className="sp-fade relative h-px w-full bg-black/15 dark:bg-white/10"
                    style={{ animationDelay: '0.65s' }}
                >
                    <div
                        className="absolute inset-y-0 left-0 bg-black dark:bg-white"
                        style={{
                            width: `${progress}%`,
                            transition: 'width 0.06s linear',
                        }}
                    />
                    {/* Moving tick at the leading edge */}
                    <div
                        className="absolute -top-[3px] h-[7px] w-px bg-black dark:bg-white"
                        style={{
                            left: `${progress}%`,
                            transition: 'left 0.06s linear',
                        }}
                    />
                    {/* Segment markers (quarters) */}
                    <div className="pointer-events-none absolute inset-0">
                        {[25, 50, 75].map((pct) => (
                            <span
                                key={pct}
                                className="absolute top-1/2 h-1 w-px -translate-y-1/2 bg-black/30 dark:bg-white/20"
                                style={{ left: `${pct}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom meta */}
                <div
                    className="sp-fade mt-4 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps"
                    style={{ animationDelay: '0.75s' }}
                >
                    <span>[ 000 / Splash ]</span>
                    <span className="hidden sm:inline">N 40.7128 / W 74.0060</span>
                    <span>{phase === 'loading' ? 'Loading' : 'Ready'} · MMXXIV</span>
                </div>
            </div>
        </div>
    );
};