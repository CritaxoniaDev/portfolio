'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Props = {
    onComplete?: () => void;
    /** Floor, not a fixed wait — the splash leaves as soon as the page is
     *  genuinely ready, but never flashes past faster than this. */
    minDuration?: number;
};

/* Each stage is tied to something that actually happens, so the bar is
   reporting work rather than performing it. */
const STAGES = [
    { at: 0, label: 'Setting type' },
    { at: 46, label: 'Inking the plates' },
    { at: 78, label: 'Binding the spine' },
    { at: 94, label: 'Pulling the print' },
];

const NAME_LINES = [
    ['Gian', 'Raphael'],
    ['Alcantara'],
];

const COLOPHON = [
    ['Set in', 'Bricolage Grotesque'],
    ['Accents', 'Instrument Serif'],
    ['Composed', 'Manila, Philippines'],
];

const HARD_CAP = 4200;

export const SplashScreen = ({ onComplete, minDuration = 900 }: Props) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const ink = isDark ? '#f0efe9' : '#0a0a0a';

    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'ready' | 'exiting' | 'gone'>('loading');

    /* Milestones the ticker eases toward, raised by real browser events. */
    const ceilingRef = useRef(18);
    const startRef = useRef<number | null>(null);
    const skipRef = useRef<HTMLButtonElement>(null);

    const dismiss = useCallback(() => {
        setPhase(current => (current === 'loading' || current === 'ready' ? 'exiting' : current));
    }, []);

    /* Lock scroll while the splash covers the page. */
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    /* Raise the ceiling as the page genuinely becomes usable. */
    useEffect(() => {
        let cancelled = false;
        const raise = (value: number) => {
            if (!cancelled) ceilingRef.current = Math.max(ceilingRef.current, value);
        };

        document.fonts?.ready.then(() => raise(72)).catch(() => raise(72));

        if (document.readyState === 'complete') {
            raise(100);
        } else {
            window.addEventListener('load', () => raise(100), { once: true });
        }

        /* Never hold the page hostage to a slow asset. */
        const cap = setTimeout(() => raise(100), HARD_CAP);

        return () => {
            cancelled = true;
            clearTimeout(cap);
        };
    }, []);

    /* Ease toward the ceiling, then hand over. The easing is measured in
       seconds rather than frames, so a busy main thread (or a 120Hz display)
       doesn't change how long the splash is on screen. */
    useEffect(() => {
        if (phase !== 'loading') return;
        let raf = 0;
        let previous: number | null = null;

        const tick = (now: number) => {
            if (startRef.current === null) startRef.current = now;
            const elapsed = now - startRef.current;
            const delta = Math.min(0.1, previous === null ? 0.016 : (now - previous) / 1000);
            previous = now;

            setProgress(current => {
                const ceiling = elapsed < minDuration
                    ? Math.min(ceilingRef.current, (elapsed / minDuration) * 100)
                    : ceilingRef.current;
                const approach = 1 - Math.exp(-delta * 7);
                const next = current + (ceiling - current) * approach + delta * 12;
                return Math.min(100, Math.max(current, next));
            });

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [phase, minDuration]);

    /* 100% → hold a beat → leave. */
    useEffect(() => {
        if (phase !== 'loading' || progress < 99.4) return;
        const t = setTimeout(() => setPhase('ready'), 120);
        return () => clearTimeout(t);
    }, [phase, progress]);

    useEffect(() => {
        if (phase !== 'ready') return;
        const t = setTimeout(() => setPhase('exiting'), 320);
        return () => clearTimeout(t);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'exiting') return;
        const slide = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 760;
        const t = setTimeout(() => {
            setPhase('gone');
            onComplete?.();
        }, slide);
        return () => clearTimeout(t);
    }, [phase, onComplete]);

    /* Escape skips — nobody should be trapped behind a loading screen. */
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') dismiss();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [dismiss]);

    if (phase === 'gone') return null;

    const stage = STAGES.reduce((found, s) => (progress >= s.at ? s : found), STAGES[0]);
    const settled = phase !== 'loading';
    const nameDelayBase = 0.28;

    return (
        <div
            className="sp-shell fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)]"
            style={{ transform: phase === 'exiting' ? 'translateY(-100%)' : 'translateY(0)' }}
            role="status"
            aria-live="polite"
            aria-label="Loading portfolio"
        >
            <style>{`
                @keyframes sp-rise {
                    from { transform: translateY(105%); }
                    to   { transform: translateY(0);    }
                }
                @keyframes sp-fade-up {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                @keyframes sp-rule {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
                @keyframes sp-bracket {
                    from { opacity: 0; transform: scale(0.4); }
                    to   { opacity: 1; transform: scale(1);   }
                }
                @keyframes sp-rotate    { to { transform: rotate(360deg); } }
                @keyframes sp-status-in {
                    from { opacity: 0; transform: translateY(8px); filter: blur(3px); }
                    to   { opacity: 1; transform: translateY(0);   filter: blur(0);   }
                }

                /* Words rise out of a mask, the way a line lifts off a press. */
                .sp-mask   { display: inline-block; overflow: hidden; vertical-align: bottom; }
                .sp-word   { display: inline-block; transform: translateY(105%);
                             animation: sp-rise 0.95s cubic-bezier(0.2,0.7,0.2,1) forwards; }
                .sp-fade   { opacity: 0; animation: sp-fade-up 0.7s cubic-bezier(0.2,0.7,0.2,1) forwards; }
                .sp-rule   { transform-origin: left center; transform: scaleX(0);
                             animation: sp-rule 0.9s cubic-bezier(0.7,0,0.3,1) forwards; }
                .sp-bracket{ opacity: 0; animation: sp-bracket 0.6s 0.2s cubic-bezier(0.2,0.7,0.2,1) forwards; }
                .sp-spin   { animation: sp-rotate 9s linear infinite; transform-origin: center; }
                .sp-status { animation: sp-status-in 0.45s cubic-bezier(0.2,0.7,0.2,1) both; }
                .sp-shell  { transition: transform 0.75s cubic-bezier(0.7,0,0.3,1); }

                @media (prefers-reduced-motion: reduce) {
                    .sp-word, .sp-fade, .sp-rule, .sp-bracket, .sp-status, .sp-spin {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        filter: none !important;
                    }
                    .sp-shell { transition: none !important; }
                }
            `}</style>

            {/* Layered backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
            <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />
            <div className="absolute inset-0 grain pointer-events-none" />

            <div
                className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(180,150,110,0.18), transparent 65%)' }}
            />

            {/* Top meta row */}
            <div
                className="sp-fade absolute left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/55 dark:text-white/40 smallcaps sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.08s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">Vol. 00 / Index</span>
                <span className="hidden shrink-0 sm:inline">Portfolio &mdash; Manila, Philippines</span>
                <span className="hidden shrink-0 font-mono tracking-[0.12em] xs:inline">MMXXVI</span>
            </div>

            {/* Corner brackets */}
            <span className="sp-bracket absolute top-20 left-5 h-4 w-4 border-t border-l border-black dark:border-white/65 sm:top-24 sm:left-6 md:top-28 md:left-12" />
            <span className="sp-bracket absolute top-20 right-5 h-4 w-4 border-t border-r border-black dark:border-white/65 sm:top-24 sm:right-6 md:top-28 md:right-12" />
            <span className="sp-bracket absolute bottom-32 left-5 h-4 w-4 border-b border-l border-black dark:border-white/65 sm:bottom-36 sm:left-6 md:bottom-40 md:left-12" />
            <span className="sp-bracket absolute bottom-32 right-5 h-4 w-4 border-b border-r border-black dark:border-white/65 sm:bottom-36 sm:right-6 md:bottom-40 md:right-12" />

            {/* Registration mark */}
            <div
                className="sp-fade absolute top-16 right-5 z-10 hidden sm:top-20 sm:right-6 sm:block md:top-24 md:right-12"
                style={{ animationDelay: '0.35s' }}
            >
                <svg width="46" height="46" viewBox="0 0 46 46" className="opacity-55" aria-hidden="true">
                    <g className="sp-spin" style={{ transformOrigin: '23px 23px' }}>
                        <circle cx="23" cy="23" r="19" fill="none" stroke={ink} strokeWidth="0.7" strokeDasharray="1.5 5" />
                    </g>
                    <circle cx="23" cy="23" r="11" fill="none" stroke={ink} strokeWidth="0.7" strokeOpacity="0.5" />
                    <line x1="23" y1="4" x2="23" y2="16" stroke={ink} strokeWidth="0.7" />
                    <line x1="23" y1="30" x2="23" y2="42" stroke={ink} strokeWidth="0.7" />
                    <line x1="4" y1="23" x2="16" y2="23" stroke={ink} strokeWidth="0.7" />
                    <line x1="30" y1="23" x2="42" y2="23" stroke={ink} strokeWidth="0.7" />
                    <circle cx="23" cy="23" r="1.8" fill={ink} />
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
                    style={{ animationDelay: '0.18s' }}
                >
                    <span className="block h-px w-8 bg-black/40 dark:bg-white/25 sm:w-10" />
                    <span>Software Engineering</span>
                    <span className="font-mono text-black/40 dark:text-white/25">&mdash; Vol. 00</span>
                </p>

                {/* The name lifts off the press, line by line */}
                <h1
                    aria-label="Gian Raphael Alcantara"
                    className="text-center font-black"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                        lineHeight: '0.92',
                        letterSpacing: '-0.005em',
                        textWrap: 'balance',
                    }}
                >
                    {NAME_LINES.map((line, lineIndex) => (
                        <span key={lineIndex} className="block" aria-hidden="true">
                            {line.map((word, wordIndex) => (
                                <span key={word} className="sp-mask">
                                    <span
                                        className="sp-word"
                                        style={{ animationDelay: `${nameDelayBase + (lineIndex * 2 + wordIndex) * 0.11}s` }}
                                    >
                                        {word}
                                        {wordIndex < line.length - 1 && ' '}
                                    </span>
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>

                <span
                    className="sp-rule mt-7 block h-px w-[min(26rem,72vw)] bg-black/25 dark:bg-white/20 sm:mt-9"
                    style={{ animationDelay: '0.75s' }}
                    aria-hidden="true"
                />

                <p
                    className="sp-fade font-serif-alt mt-6 max-w-[34rem] text-center text-[1.15rem] italic text-black/60 dark:text-white/45 sm:mt-7 sm:text-[1.35rem]"
                    style={{ animationDelay: '0.85s' }}
                >
                    Software, design &amp; intent &mdash; built from Manila.
                </p>

                {/* Colophon — true details, in place of the old studio line */}
                <dl
                    className="sp-fade mt-8 hidden gap-x-8 gap-y-1.5 font-mono text-[0.58rem] leading-none tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps sm:mt-10 sm:grid sm:grid-cols-3"
                    style={{ animationDelay: '1s' }}
                >
                    {COLOPHON.map(([term, detail]) => (
                        <div key={term} className="flex flex-col items-center gap-1.5">
                            <dt className="text-black/30 dark:text-white/20">{term}</dt>
                            <dd className="text-black/55 dark:text-white/40">{detail}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* Bottom: status + counter + progress */}
            <div className="relative z-10 px-5 pb-10 sm:px-6 sm:pb-12 md:px-12 md:pb-16">
                <div
                    className="sp-fade mb-4 flex items-end justify-between gap-4 sm:mb-5"
                    style={{ animationDelay: '0.5s' }}
                >
                    <div className="min-w-0 flex-1">
                        <div className="mb-2 font-mono text-[0.55rem] leading-none tracking-[0.22em] text-black/40 dark:text-white/25 smallcaps">
                            Status
                        </div>
                        {settled ? (
                            <div className="font-serif-alt text-[1.1rem] italic text-black dark:text-white sm:text-[1.3rem]">
                                Ready
                                <span className="ml-2 inline-block h-2 w-2 -translate-y-[3px] bg-black dark:bg-white" />
                            </div>
                        ) : (
                            <div
                                key={stage.label}
                                className="sp-status font-serif-alt truncate text-[1.1rem] italic text-black/75 dark:text-white/55 sm:text-[1.3rem]"
                            >
                                {stage.label}
                                <span className="text-black/40 dark:text-white/25">&hellip;</span>
                            </div>
                        )}
                    </div>

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

                <div
                    className="sp-fade relative h-px w-full bg-black/15 dark:bg-white/10"
                    style={{ animationDelay: '0.6s' }}
                >
                    <div
                        className="absolute inset-y-0 left-0 bg-black dark:bg-white"
                        style={{ width: `${progress}%`, transition: 'width 0.12s linear' }}
                    />
                    <div
                        className="absolute -top-[3px] h-[7px] w-px bg-black dark:bg-white"
                        style={{ left: `${progress}%`, transition: 'left 0.12s linear' }}
                    />
                    <div className="pointer-events-none absolute inset-0">
                        {[25, 50, 75].map(pct => (
                            <span
                                key={pct}
                                className="absolute top-1/2 h-1 w-px -translate-y-1/2 bg-black/30 dark:bg-white/20"
                                style={{ left: `${pct}%` }}
                            />
                        ))}
                    </div>
                </div>

                <div
                    className="sp-fade mt-4 flex items-center justify-between gap-4 font-mono text-[0.62rem] tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps"
                    style={{ animationDelay: '0.7s' }}
                >
                    <span>[ 000 / Splash ]</span>
                    <span className="hidden sm:inline">14.5995&deg; N / 120.9842&deg; E</span>
                    <button
                        ref={skipRef}
                        type="button"
                        onClick={dismiss}
                        className="group inline-flex items-center gap-2 text-black/45 transition-colors duration-300 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:text-white/30 dark:hover:text-white dark:focus-visible:outline-white"
                    >
                        Skip
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                            &rarr;
                        </span>
                        <span className="sr-only">the loading screen</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
