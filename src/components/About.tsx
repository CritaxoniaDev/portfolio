'use client';

import { useScrollReveal } from './hooks/useScrollReveal';

export const About = () => {
    const [ref] = useScrollReveal();

    return (
        <section
            id="about"
            ref={ref}
            className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-24 sm:px-6 sm:py-28 md:px-12 md:py-32"
        >
            {/* Blob-specific keyframes (kept local so the section is self-contained) */}
            <style>{`
                @keyframes blob-morph-a {
                    0%, 100% { border-radius: 62% 38% 30% 70% / 60% 32% 68% 40%; }
                    25%      { border-radius: 30% 70% 70% 30% / 50% 60% 40% 50%; }
                    50%      { border-radius: 50% 50% 28% 72% / 38% 52% 48% 62%; }
                    75%      { border-radius: 68% 32% 58% 42% / 64% 46% 54% 36%; }
                }
                @keyframes blob-morph-b {
                    0%, 100% { border-radius: 42% 58% 62% 38% / 44% 50% 50% 56%; }
                    33%      { border-radius: 72% 28% 50% 50% / 30% 62% 38% 70%; }
                    66%      { border-radius: 48% 52% 70% 30% / 60% 38% 62% 40%; }
                }
                @keyframes blob-spin       { from { transform: translate(-50%, -50%) rotate(0); } to { transform: translate(-50%, -50%) rotate(360deg); } }
                @keyframes blob-spin-rev   { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0); } }
                @keyframes blob-pulse      { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.55; } }
                @keyframes blob-float      { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10px, -14px); } }
                @keyframes orbit-spin      { from { transform: rotate(0); } to { transform: rotate(360deg); } }
                @keyframes speck-drift     { 0%, 100% { transform: translate(0, 0); opacity: 0.5; } 50% { transform: translate(6px, -8px); opacity: 0.9; } }

                .blob-a       { animation: blob-morph-a 14s ease-in-out infinite, blob-spin 38s linear infinite; }
                .blob-b       { animation: blob-morph-b 18s ease-in-out infinite, blob-spin-rev 28s linear infinite; }
                .blob-core    { animation: blob-pulse 5.5s ease-in-out infinite; }
                .blob-stage   { animation: blob-float 11s ease-in-out infinite; }
                .blob-orbit   { animation: orbit-spin 42s linear infinite; transform-origin: center; }
                .speck        { animation: speck-drift 7s ease-in-out infinite; }
                .speck.s2     { animation-delay: -2s; animation-duration: 9s; }
                .speck.s3     { animation-delay: -4s; animation-duration: 11s; }

                @media (prefers-reduced-motion: reduce) {
                    .blob-a, .blob-b, .blob-core, .blob-stage, .blob-orbit, .speck {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* Layered backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Soft radial highlights (mirrored from Hero) */}
            <div
                className="absolute -top-32 -right-32 h-[360px] w-[360px] rounded-full pointer-events-none sm:h-[440px] sm:w-[440px] md:-top-40 md:-right-40 md:h-[560px] md:w-[560px]"
                style={{ background: 'radial-gradient(circle, rgba(180,150,110,0.16), transparent 62%)' }}
            />
            <div
                className="absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full pointer-events-none sm:h-[480px] sm:w-[480px] md:-bottom-44 md:-left-44 md:h-[640px] md:w-[640px]"
                style={{ background: 'radial-gradient(circle, rgba(150,160,140,0.14), transparent 62%)' }}
            />

            {/* Top meta row */}
            <div
                className="absolute left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/45 dark:text-white/35 smallcaps fade-up sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.35s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">
                    Ch. II / Biography
                </span>
                <span className="hidden shrink-0 sm:inline">About / Vol. 02</span>
                <span className="hidden shrink-0 font-mono tracking-[0.12em] xs:inline">
                    MMXXIV
                </span>
            </div>

            {/* Corner ticks */}
            <div
                className="corner-tick tl absolute top-28 left-12 hidden h-3 w-3 opacity-30 fade-up md:block"
                style={{ animationDelay: '0.9s' }}
            />
            <div
                className="corner-tick tr absolute top-28 right-12 hidden h-3 w-3 opacity-30 fade-up md:block"
                style={{ animationDelay: '0.9s' }}
            />

            {/* Vertical year label (left side this time, for variation) */}
            <span
                className="vertical-rl absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-[0.68rem] text-black/45 dark:text-white/30 smallcaps fade-up sm:block md:left-6"
                style={{ animationDelay: '0.5s', writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
            >
                Profile - Biography - 002
            </span>

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                02
            </div>

            {/* Floating italic accent */}
            <div
                className="absolute left-12 top-28 hidden items-center gap-3 fade-up xl:flex"
                style={{ animationDelay: '0.7s' }}
            >
                <span className="font-serif-alt text-2xl italic text-black/60 dark:text-white/45">
                    notes from a maker
                </span>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-40" aria-hidden="true">
                    <path d="M5 5 Q 20 35, 35 5" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 3" />
                    <circle cx="5" cy="5" r="2" fill="currentColor" />
                </svg>
            </div>

            {/* Main content */}
            <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">

                {/* ── Left: Text content ── */}
                <div className="order-1 lg:col-span-7 xl:col-span-7">
                    <p
                        className="mb-5 flex max-w-full items-center gap-3 text-[0.72rem] leading-none text-black/65 dark:text-white/45 smallcaps fade-up sm:mb-6 sm:text-[0.76rem]"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="block h-px w-8 shrink-0 bg-black/40 dark:bg-white/25 sm:w-10" />
                        <span className="min-w-0">About — Profile</span>
                        <span className="hidden shrink-0 font-mono text-black/40 dark:text-white/25 xs:inline">- 002</span>
                    </p>

                    <h2 className="hero-title font-black fade-up" style={{ animationDelay: '0.55s' }}>
                        <span className="title-word">A</span>{' '}
                        <span className="title-word"><em>student</em></span>{' '}
                        <span className="title-word">of</span>
                        <br />
                        <span className="title-word">
                            the craft
                            <span className="hero-mark align-top font-normal italic text-black/40 dark:text-white/25">.</span>
                        </span>
                    </h2>

                    <div className="mt-7 fade-up sm:mt-9 md:mt-12" style={{ animationDelay: '0.75s' }}>
                        {/* Lead line */}
                        <p className="font-serif-alt max-w-[36rem] text-[1.25rem] italic leading-[1.5] text-black/85 dark:text-white/65 sm:text-[1.4rem] md:text-[1.5rem]">
                            My name is{' '}
                            <span className="not-italic font-normal text-black dark:text-white underline decoration-black/30 dark:decoration-white/30 underline-offset-[6px]">
                                Gian Raphael Alcantara
                            </span>
                            , a dedicated software engineering student at{' '}
                            <span className="not-italic font-normal text-black dark:text-white underline decoration-black/30 dark:decoration-white/30 underline-offset-[6px]">
                                First City Providential College
                            </span>
                            .
                        </p>

                        {/* Divider */}
                        <div className="mt-7 mb-6 flex items-center gap-4">
                            <span className="block h-px w-12 bg-black/30 dark:bg-white/20" />
                            <span className="font-mono text-[0.6rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                                Mission · Vision
                            </span>
                            <span className="block h-px flex-1 bg-black/15 dark:bg-white/10" />
                        </div>

                        {/* Body paragraphs as a 2-col arrangement on larger screens */}
                        <div className="grid max-w-[42rem] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                            <div className="relative">
                                <span className="absolute -left-4 top-0 hidden font-mono text-[0.55rem] tracking-[0.2em] text-black/35 dark:text-white/25 smallcaps md:block">
                                    i.
                                </span>
                                <p style={{ fontFamily: 'Inter Variable' }} className="text-[0.95rem] leading-[1.7] text-black/70 dark:text-white/55 sm:text-[1rem]">
                                    My mission revolves around mastering programming languages,
                                    algorithms, and software development methodologies. Fueled by a
                                    relentless passion for technology and innovation, I aspire to become
                                    a proficient software engineer capable of tackling complex problems
                                    and contributing to groundbreaking projects.
                                </p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-4 top-0 hidden font-mono text-[0.55rem] tracking-[0.2em] text-black/35 dark:text-white/25 smallcaps md:block">
                                    ii.
                                </span>
                                <p style={{ fontFamily: 'Inter Variable' }} className="text-[0.95rem] leading-[1.7] text-black/70 dark:text-white/55 sm:text-[1rem]">
                                    My vision extends beyond academic excellence; I aim to leverage my
                                    skills to create impactful solutions that address real-world
                                    challenges — whether it's enhancing user experiences, optimizing
                                    system performance, or revolutionizing industries through
                                    cutting-edge software.
                                </p>
                            </div>
                        </div>

                        {/* Signature row */}
                        <div className="mt-10 flex items-center gap-5">
                            <span className="font-serif-alt text-xl italic text-black/55 dark:text-white/40 sm:text-2xl">
                                — signed,
                            </span>
                            <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                                The Author
                            </span>
                            <span className="block h-px flex-1 bg-black/20 dark:bg-white/15" />
                        </div>
                    </div>
                </div>

                {/* ── Right: Animated blob ── */}
                <div
                    className="order-2 mx-auto w-full max-w-[460px] fade-up lg:col-span-5 lg:mx-0 lg:max-w-none xl:col-span-5"
                    style={{ animationDelay: '0.6s' }}
                >
                    {/* Plate label */}
                    <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                        <span className="flex items-center gap-3">
                            <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                            Fig. 02 / Specimen
                        </span>
                        <span className="text-black/35 dark:text-white/25">Living · Form</span>
                    </div>

                    {/* Blob stage */}
                    <div className="relative aspect-square w-full">
                        <div className="absolute inset-0 blob-stage">
                            {/* Concentric SVG guide lines — use currentColor so they invert */}
                            <svg
                                className="absolute inset-0 h-full w-full pointer-events-none text-black/60 dark:text-white/40"
                                viewBox="0 0 400 400"
                                aria-hidden="true"
                            >
                                <circle cx="200" cy="200" r="186" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" strokeDasharray="2 5" />
                                <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.5" strokeDasharray="2 5" />
                                <line x1="200" y1="6" x2="200" y2="394" stroke="currentColor" strokeOpacity="0.10" strokeWidth="0.5" strokeDasharray="2 5" />
                                <line x1="6" y1="200" x2="394" y2="200" stroke="currentColor" strokeOpacity="0.10" strokeWidth="0.5" strokeDasharray="2 5" />
                                {/* Slowly orbiting tick around the rim */}
                                <g className="blob-orbit" style={{ transformOrigin: '200px 200px' }}>
                                    <circle cx="200" cy="14" r="2.5" fill="currentColor" fillOpacity="0.9" />
                                    <circle cx="200" cy="14" r="6" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.5" />
                                </g>
                            </svg>

                            {/* Outer blob — warm tan (kept across themes) */}
                            <div
                                className="blob-a absolute left-1/2 top-1/2 h-[78%] w-[78%] mix-blend-multiply dark:mix-blend-screen"
                                style={{
                                    background:
                                        'radial-gradient(circle at 30% 30%, rgba(190,158,114,0.65), rgba(150,128,92,0.4) 55%, rgba(110,95,72,0.28) 85%)',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />

                            {/* Middle blob — muted sage */}
                            <div
                                className="blob-b absolute left-1/2 top-1/2 h-[58%] w-[58%] mix-blend-multiply dark:mix-blend-screen"
                                style={{
                                    background:
                                        'radial-gradient(circle at 70% 35%, rgba(158,170,148,0.7), rgba(108,122,100,0.4) 55%, rgba(70,82,68,0.3) 85%)',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />

                            {/* Innermost pulsing core — flips colour in dark */}
                            <div
                                className="blob-core absolute left-1/2 top-1/2 h-[26%] w-[26%] rounded-full"
                                style={{
                                    background:
                                        'radial-gradient(circle, var(--blob-core-c, rgba(10,10,10,0.88)), var(--blob-core-c2, rgba(10,10,10,0.45)) 55%, transparent 80%)',
                                    filter: 'blur(2px)',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />

                            {/* Grain overlay on blob area */}
                            <div className="absolute inset-0 grain rounded-[40%] pointer-events-none opacity-60" />

                            {/* Floating specks — currentColor-driven */}
                            <span
                                className="speck absolute left-[18%] top-[24%] h-1 w-1 rounded-full bg-black/55 dark:bg-white/55"
                            />
                            <span
                                className="speck s2 absolute right-[20%] top-[68%] h-[3px] w-[3px] rounded-full bg-black/45 dark:bg-white/45"
                            />
                            <span
                                className="speck s3 absolute left-[28%] bottom-[18%] h-[2px] w-[2px] rounded-full bg-black/60 dark:bg-white/60"
                            />

                            {/* Center crosshair */}
                            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <span className="absolute left-1/2 top-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/50" />
                                <span className="absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/50" />
                            </span>

                            {/* Corner brackets */}
                            <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-black/60 dark:border-white/45" />
                            <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-black/60 dark:border-white/45" />
                            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-black/60 dark:border-white/45" />
                            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-black/60 dark:border-white/45" />

                            {/* Cardinal labels */}
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.55rem] tracking-[0.2em] text-black/40 dark:text-white/30 smallcaps">N</span>
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.55rem] tracking-[0.2em] text-black/40 dark:text-white/30 smallcaps">S</span>
                            <span className="absolute top-1/2 -left-3 -translate-y-1/2 font-mono text-[0.55rem] tracking-[0.2em] text-black/40 dark:text-white/30 smallcaps">W</span>
                            <span className="absolute top-1/2 -right-3 -translate-y-1/2 font-mono text-[0.55rem] tracking-[0.2em] text-black/40 dark:text-white/30 smallcaps">E</span>
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="mt-5 flex items-start justify-between gap-6">
                        <p className="font-serif-alt max-w-[18rem] text-[1.05rem] italic leading-[1.35] text-black/60 dark:text-white/45">
                            Fig. 02 — a study in<br />
                            motion &amp; intent.
                        </p>
                        <div className="shrink-0 text-right">
                            <div className="font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/40 dark:text-white/30 smallcaps">
                                Observed in studio
                            </div>
                            <div className="font-serif-alt mt-1.5 text-base italic text-black/40 dark:text-white/30">
                                — gra
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom meta */}
            <div
                className="absolute bottom-5 left-5 hidden font-mono text-[0.64rem] text-black/40 dark:text-white/25 smallcaps fade-up sm:bottom-6 sm:left-6 sm:block md:left-12"
                style={{ animationDelay: '1s' }}
            >
                [ 002 / 005 ] - About
            </div>
        </section>
    );
};