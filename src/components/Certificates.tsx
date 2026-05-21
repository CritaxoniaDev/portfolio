import { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';

type Certificate = {
    id: number;
    title: string;
    provider: string;
    issueDate: string;
    status?: string;
    statusColor: 'green' | 'blue' | 'amber';
    logo: string;
    certificateLink: string;
    skills: string[];
    description: string;
};

const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Mastering in Power Apps (v27Nov2024)',
        provider: 'Microsoft',
        issueDate: 'Feb 17, 2025',
        statusColor: 'green',
        logo: '/images/microsoft-logo.svg',
        certificateLink: '#',
        skills: ['Power Apps', 'Canvas Apps', 'Model-driven Apps', 'Power Platform'],
        description:
            'Comprehensive instructor-led training focused on mastering Microsoft Power Apps for building business applications.',
    },
    {
        id: 2,
        title: 'Power BI - Turning Data into Actionable Insights (v1Dec2024)',
        provider: 'Microsoft',
        issueDate: 'Dec 13, 2024',
        statusColor: 'green',
        logo: '/images/microsoft-logo.svg',
        certificateLink: '#',
        skills: ['Power BI', 'Data Visualization', 'DAX', 'Data Analytics'],
        description:
            'Instructor-led training on transforming raw data into meaningful insights using Microsoft Power BI.',
    },
    {
        id: 3,
        title: 'Mastering in Power Automate (v24Nov2024)',
        provider: 'Microsoft',
        issueDate: 'Nov 26, 2024',
        statusColor: 'green',
        logo: '/images/microsoft-logo.svg',
        certificateLink: '#',
        skills: ['Power Automate', 'Workflow Automation', 'Business Process', 'Integration'],
        description:
            'Advanced instructor-led training on automating business processes using Microsoft Power Automate.',
    },
    {
        id: 4,
        title: 'Navigating the AI-Driven Future: Education, Ethics and Innovation',
        provider: 'Regional Assembly for Information Technology Education (RAITE)',
        issueDate: 'Nov 04, 2024',
        status: 'Completed',
        statusColor: 'blue',
        logo: '/images/psite-logo.png',
        certificateLink: '#',
        skills: ['AI Driven Platforms'],
        description:
            'Regional assembly focusing on the latest developments in information technology education and digital transformation in academic institutions.',
    },
    {
        id: 5,
        title: 'GDG Cloud Next Extended Manila 2025',
        provider: 'Google Developer Group',
        issueDate: 'Jan 20, 2025',
        status: 'Valid',
        statusColor: 'green',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        certificateLink: '#',
        skills: ['AI Agent SDK', 'Unified Cloud Security', 'Firebase Studio Prototyping'],
        description:
            'Extended event covering Google Cloud innovations, AI/ML technologies, and modern web development practices presented at Cloud Next 2025.',
    },
    {
        id: 7,
        title: 'NextGenPH: Youth Innovators Reimagining Public Service Innovation Contest',
        provider: 'NextGenPH Project Team',
        issueDate: 'Nov 11, 2025',
        status: 'Valid',
        statusColor: 'green',
        logo: '/images/nextgenph-logo.png',
        certificateLink: '#',
        skills: [
            'Public Service Innovation',
            'Youth Leadership',
            'Innovation and Ideation',
        ],
        description:
            'Recognition for participating in the NextGenPH: Youth Innovators Reimagining Public Service Innovation Contest, contributing innovative ideas and solutions aimed at improving public service through youth-driven initiatives.',
    },
];

const statusHex: Record<Certificate['statusColor'], string> = {
    green: '#6e8c5a',
    blue: '#6483a0',
    amber: '#b89464',
};

export const Certificates = () => {
    const [revealRef] = useScrollReveal();
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const rafRef = useRef<number | null>(null);

    /** Recompute scale/opacity/active index based on each card's distance from track center. */
    const updateScrollState = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
            const track = trackRef.current;
            if (!track) return;

            const cards = Array.from(track.querySelectorAll<HTMLElement>('.cert-card'));
            const trackRect = track.getBoundingClientRect();
            const trackCenter = trackRect.left + trackRect.width / 2;

            let closestIdx = 0;
            let minDist = Infinity;

            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const dist = Math.abs(cardCenter - trackCenter);
                const norm = Math.min(dist / rect.width, 1.3);

                const scale = 1 - norm * 0.12;
                const opacity = Math.max(1 - norm * 0.55, 0.22);
                const translateY = norm * 14; // side cards sit a touch lower

                card.style.transform = `translateY(${translateY}px) scale(${scale})`;
                card.style.opacity = `${opacity}`;
                card.style.filter = norm > 0.05 ? `blur(${norm * 1.4}px)` : 'blur(0)';

                if (dist < minDist) {
                    minDist = dist;
                    closestIdx = i;
                }
            });

            setActiveIndex(closestIdx);
        });
    }, []);

    useEffect(() => {
        updateScrollState();
        const track = trackRef.current;
        if (!track) return;

        track.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);
        return () => {
            track.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [updateScrollState]);

    const scrollToIndex = (i: number) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelectorAll<HTMLElement>('.cert-card')[i];
        if (!card) return;
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const target =
            track.scrollLeft +
            (cardRect.left - trackRect.left) -
            trackRect.width / 2 +
            cardRect.width / 2;
        track.scrollTo({ left: target, behavior: 'smooth' });
    };

    const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
    const next = () => scrollToIndex(Math.min(certificates.length - 1, activeIndex + 1));

    // Keyboard nav when section is in viewport-ish (we attach to the track on focus)
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };

    return (
        <section
            id="certificates"
            ref={revealRef}
            className="relative w-full overflow-hidden px-0 py-24 sm:py-28 md:py-32"
        >
            <style>{`
                .cert-track {
                    display: flex;
                    gap: 28px;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding-inline: max(20px, calc((100% - 420px) / 2));
                    padding-block: 32px;
                }
                .cert-track::-webkit-scrollbar { display: none; }

                .cert-card {
                    flex: 0 0 86vw;
                    max-width: 420px;
                    scroll-snap-align: center;
                    transition: transform 0.25s cubic-bezier(0.2,0.7,0.2,1),
                                opacity 0.35s ease,
                                filter 0.35s ease;
                    will-change: transform, opacity, filter;
                }
                @media (min-width: 640px) {
                    .cert-card { flex-basis: 420px; }
                }

                @keyframes status-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
                    50%      { box-shadow: 0 0 0 6px transparent;  opacity: 0.55; }
                }
                .status-dot {
                    animation: status-pulse 2.4s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .cert-card { transition: none; }
                    .status-dot { animation: none; }
                }
            `}</style>

            {/* Subtle textures */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Soft radial highlight */}
            <div
                className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[860px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(180,150,110,0.14), transparent 65%)' }}
            />

            {/* Top meta row */}
            <div
                className="absolute left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/45 smallcaps fade-up sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.35s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">
                    Ch. IV / Credentials
                </span>
                <span className="hidden shrink-0 sm:inline">Certificates / Vol. 04</span>
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

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                04
            </div>

            {/* Intro row */}
            <div className="relative z-10 mx-auto mb-10 grid w-full max-w-[1400px] grid-cols-1 items-end gap-8 px-5 sm:mb-12 sm:px-6 md:mb-16 md:grid-cols-12 md:px-12">
                <div className="md:col-span-7">
                    <p
                        className="mb-5 flex max-w-full items-center gap-3 text-[0.72rem] leading-none text-black/65 smallcaps fade-up sm:mb-6 sm:text-[0.76rem]"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="block h-px w-8 shrink-0 bg-black/40 sm:w-10" />
                        <span className="min-w-0">Credentials — A Ledger</span>
                        <span className="hidden shrink-0 font-mono text-black/40 xs:inline">
                            - 004
                        </span>
                    </p>

                    <h2 className="hero-title font-black fade-up" style={{ animationDelay: '0.55s' }}>
                        <span className="title-word">Things</span>{' '}
                        <span className="title-word"><em>I&apos;ve</em></span>
                        <br />
                        <span className="title-word">
                            studied
                            <span className="hero-mark align-top font-normal italic text-black/40">.</span>
                        </span>
                    </h2>
                </div>

                <div
                    className="fade-up md:col-span-5 md:flex md:flex-col md:items-end"
                    style={{ animationDelay: '0.75s' }}
                >
                    <p className="font-serif-alt mb-6 max-w-[28rem] text-[1.1rem] italic leading-[1.5] text-black/70 md:text-right md:text-[1.2rem]">
                        A running ledger of certifications, workshops &amp; assemblies — proof of practice,
                        not just paper.
                    </p>

                    {/* Carousel controls */}
                    <div className="flex items-center gap-5">
                        <span className="font-mono text-[0.72rem] tracking-[0.18em] text-black/55 smallcaps tabular-nums">
                            <span className="text-black">{String(activeIndex + 1).padStart(2, '0')}</span>
                            <span className="mx-2 text-black/30">/</span>
                            <span>{String(certificates.length).padStart(2, '0')}</span>
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={prev}
                                disabled={activeIndex === 0}
                                aria-label="Previous certificate"
                                className="group relative flex h-10 w-10 items-center justify-center border border-black/40 transition-colors hover:bg-black hover:text-[rgb(244,243,238)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
                            >
                                <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-current" />
                                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-current" />
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                                    <path d="M6 1 L1 6 L6 11" stroke="currentColor" strokeWidth="1.2" fill="none" />
                                    <path d="M1 6 L15 6" stroke="currentColor" strokeWidth="1.2" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                disabled={activeIndex === certificates.length - 1}
                                aria-label="Next certificate"
                                className="group relative flex h-10 w-10 items-center justify-center border border-black/40 transition-colors hover:bg-black hover:text-[rgb(244,243,238)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
                            >
                                <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-current" />
                                <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-current" />
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                                    <path d="M10 1 L15 6 L10 11" stroke="currentColor" strokeWidth="1.2" fill="none" />
                                    <path d="M15 6 L1 6" stroke="currentColor" strokeWidth="1.2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Carousel ── */}
            <div
                ref={trackRef}
                className="cert-track relative z-10 fade-up"
                style={{ animationDelay: '0.85s' }}
                tabIndex={0}
                onKeyDown={onKeyDown}
                role="region"
                aria-label="Certificates carousel"
                aria-roledescription="carousel"
            >
                {certificates.map((c, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <article
                            key={c.id}
                            className="cert-card"
                            aria-label={`Certificate ${i + 1} of ${certificates.length}: ${c.title}`}
                            aria-roledescription="slide"
                        >
                            <div className="relative">
                                {/* Back plates */}
                                <div
                                    className="absolute inset-0 translate-x-[10px] translate-y-[10px] border border-black/10"
                                    aria-hidden="true"
                                />
                                <div
                                    className="absolute inset-0 translate-x-[5px] translate-y-[5px] border border-black/15 bg-black/[0.02]"
                                    aria-hidden="true"
                                />

                                {/* Main card */}
                                <div className="relative flex min-h-[560px] flex-col border border-black/30 bg-[rgb(240,238,230)] p-6 sm:p-7">
                                    {/* Corner brackets */}
                                    <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-black" />
                                    <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-black" />
                                    <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-black" />
                                    <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-black" />

                                    {/* Top meta */}
                                    <div className="flex items-center justify-between gap-4 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/50 smallcaps">
                                        <span className="flex items-center gap-2">
                                            <span className="block h-px w-5 bg-black/30" />
                                            No. {String(c.id).padStart(3, '0')}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span
                                                className="status-dot block h-1.5 w-1.5 rounded-full"
                                                style={{ background: statusHex[c.statusColor], color: statusHex[c.statusColor] }}
                                            />
                                            {c.status ?? 'Valid'}
                                        </span>
                                    </div>

                                    {/* Logo plate */}
                                    <div className="my-7 flex h-20 items-center justify-center border-y border-black/10 bg-[rgba(0,0,0,0.015)]">
                                        <img
                                            src={c.logo}
                                            alt={`${c.provider} logo`}
                                            className="max-h-9 max-w-[60%] object-contain opacity-85"
                                            loading="lazy"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>

                                    {/* Provider */}
                                    <p className="font-mono text-[0.62rem] tracking-[0.18em] text-black/55 smallcaps">
                                        Issued by · {c.provider}
                                    </p>

                                    {/* Title */}
                                    <h3 className="font-serif-alt mt-2 text-[1.5rem] italic leading-[1.2] text-black sm:text-[1.65rem]">
                                        {c.title}
                                    </h3>

                                    {/* Description */}
                                    <p style={{ fontFamily: 'Inter Variable' }} className="mt-3 text-[0.88rem] leading-[1.6] text-black/65">
                                        {c.description}
                                    </p>

                                    {/* Skills */}
                                    <div className="mt-5 mb-5 flex flex-wrap gap-1.5">
                                        {c.skills.map((s) => (
                                            <span
                                                key={s}
                                                className="border border-black/25 px-2 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-black/65 smallcaps"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Spacer pushes footer down */}
                                    <div className="mt-auto" />

                                    {/* Footer */}
                                    <div className="flex items-end justify-between gap-4 border-t border-black/15 pt-4">
                                        <div>
                                            <div className="font-mono text-[0.55rem] tracking-[0.2em] text-black/40 smallcaps">
                                                Issued
                                            </div>
                                            <div className="font-serif-alt mt-0.5 text-[1rem] italic text-black/75">
                                                {c.issueDate}
                                            </div>
                                        </div>
                                        <a
                                            href={c.certificateLink}
                                            tabIndex={isActive ? 0 : -1}
                                            className="group inline-flex items-center gap-2 border-b border-black/40 pb-0.5 text-[0.7rem] smallcaps transition-colors hover:border-black"
                                        >
                                            View Certificate
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Segmented progress + meta */}
            <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center gap-6 px-5 sm:mt-12 sm:px-6 md:flex-row md:justify-between md:px-12">
                {/* Segments */}
                <div className="flex items-center gap-2.5">
                    {certificates.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => scrollToIndex(i)}
                            aria-label={`Go to certificate ${i + 1}`}
                            aria-current={i === activeIndex}
                            className="group flex h-4 items-center"
                        >
                            <span
                                className={`block h-px transition-all duration-500 ${i === activeIndex
                                    ? 'w-12 bg-black'
                                    : 'w-6 bg-black/25 group-hover:bg-black/50'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/45 smallcaps">
                    Drag · Scroll · or use ← →
                </span>
            </div>

            {/* Bottom meta */}
            <div
                className="absolute bottom-5 left-5 hidden font-mono text-[0.64rem] text-black/40 smallcaps fade-up sm:bottom-6 sm:left-6 sm:block md:left-12"
                style={{ animationDelay: '1s' }}
            >
                [ 004 / 005 ] - Certificates
            </div>
        </section>
    );
};