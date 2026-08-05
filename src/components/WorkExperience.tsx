'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useScrollReveal } from './hooks/useScrollReveal';

type Experience = {
    id: number;
    period: string;
    position: string;
    company: string;
    address: string;
    partTime?: boolean;
    current?: boolean;
    responsibilities: string[];
    technologies: string[];
    logo: string;
};

const experiences: Experience[] = [
    {
        id: 1,
        period: 'Nov 2024 — Jun 2025',
        position: 'Technology Associate',
        company: 'CLaaS2SaaS',
        address: 'Singapore',
        responsibilities: [
            'Webhosting and web server management.',
            'Hands-on experience in LMS platform technical administration.',
            'Any other tasks related to the business unit.',
        ],
        technologies: ['Laravel', 'Azure', 'PHP', 'MySQL', 'API Integration', 'Microsoft Power Platform', 'Postman'],
        logo: '/images/claas2saas-logo.png',
    },
    {
        id: 2,
        period: 'Aug 2025 — Jan 2026',
        position: 'Part-Time Developer',
        company: 'Reaiv',
        address: 'Philippines',
        partTime: true,
        responsibilities: [
            'Contributed to the development of a Real Estate Website App.',
            'Developed an Invoicing Application integrated with Facebook Graph API for seamless communication and invoicing solutions.',
        ],
        technologies: ['Next.js', 'Go High Level (GHL)', 'Supabase', 'API Integration', 'Twilio SDK', 'VAPI API', 'Facebook Graph API'],
        logo: '/images/reaiv-logo.webp',
    },
    {
        id: 3,
        period: 'Jun 2025 — Present',
        position: 'Technical Developer',
        company: 'CLaaS2SaaS',
        address: 'Singapore',
        current: true,
        responsibilities: [
            'Webhosting and web server management.',
            'Hands-on experience in Development of Adaptive CLaaS Project.',
            'Any other tasks related to the business unit.',
        ],
        technologies: ['Laravel', 'SQL Server', 'Azure', 'PHP', 'API Integration', 'Microsoft Power Platform', 'Postman'],
        logo: '/images/claas2saas-logo.png',
    },
];

type StatusKey = 'current' | 'partTime' | 'past';
const statusMeta: Record<StatusKey, { label: string; hex: string }> = {
    current:  { label: 'Currently',  hex: '#6e8c5a' },
    partTime: { label: 'Part-Time',  hex: '#b89464' },
    past:     { label: 'Past',       hex: '#6483a0' },
};

const getStatus = (exp: Experience): StatusKey =>
    exp.current ? 'current' : exp.partTime ? 'partTime' : 'past';

const EntryCard = ({ exp }: { exp: Experience }) => {
    const status = getStatus(exp);
    const meta = statusMeta[status];

    return (
        <article className="relative">
            {/* Back plates */}
            <div className="absolute inset-0 translate-x-[10px] translate-y-[10px] border border-black/10 dark:border-white/10" aria-hidden="true" />
            <div className="absolute inset-0 translate-x-[5px] translate-y-[5px] border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]" aria-hidden="true" />

            {/* Main card */}
            <div className="relative border border-black/30 dark:border-white/20 bg-[rgb(240,238,230)] dark:bg-[rgb(22,21,18)] p-6 sm:p-7">
                {/* Corner brackets */}
                <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-black dark:border-white/60" />
                <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-black dark:border-white/60" />
                <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-black dark:border-white/60" />
                <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-black dark:border-white/60" />

                {/* Top meta */}
                <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/50 dark:text-white/40 smallcaps">
                    <span className="flex items-center gap-2">
                        <span className="block h-px w-5 bg-black/30 dark:bg-white/20" />
                        Position No. {String(exp.id).padStart(3, '0')}
                    </span>
                    <span className="flex items-center gap-2">
                        <span
                            className={`block h-1.5 w-1.5 rounded-full ${status === 'current' ? 'status-dot' : ''}`}
                            style={{ background: meta.hex, color: meta.hex }}
                        />
                        {meta.label}
                    </span>
                </div>

                {/* Period */}
                <p className="mb-2 font-mono text-[0.62rem] tracking-[0.18em] text-black/55 dark:text-white/40 smallcaps">
                    {exp.period}
                </p>

                {/* Position title */}
                <h3 className="font-serif-alt text-[1.65rem] italic leading-[1.1] text-black dark:text-white/90 sm:text-[1.85rem]">
                    {exp.position}
                </h3>

                {/* Company + Location */}
                <div className="mt-4 mb-5 flex items-center gap-3 border-b border-black/15 dark:border-white/10 pb-5">
                    {/* Logo plate */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-black/20 dark:border-white/15 bg-white/40 dark:bg-white/85">
                        <span className="relative block h-7 w-7">
                            <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                fill
                                sizes="28px"
                                unoptimized={exp.logo.endsWith('.svg')}
                                className="object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[1rem] font-medium leading-tight text-black/85 dark:text-white/80">{exp.company}</p>
                        <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.16em] text-black/50 dark:text-white/40 smallcaps">
                            <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
                                <path
                                    d="M4.5 0.5 C 2.5 0.5, 1 2, 1 4 C 1 6.5, 4.5 10, 4.5 10 C 4.5 10, 8 6.5, 8 4 C 8 2, 6.5 0.5, 4.5 0.5 Z"
                                    stroke="currentColor"
                                    strokeWidth="0.8"
                                    fill="none"
                                />
                                <circle cx="4.5" cy="4" r="1.2" fill="currentColor" />
                            </svg>
                            {exp.address}
                        </p>
                    </div>
                </div>

                {/* Responsibilities */}
                <ul className="mb-5 list-none space-y-3">
                    {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex gap-3 text-[0.88rem] leading-[1.65] text-black/70 dark:text-white/60">
                            <span className="mt-[3px] shrink-0 font-mono text-[0.55rem] tracking-[0.2em] text-black/40 dark:text-white/30 smallcaps">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span style={{ fontFamily: 'Inter Variable' }}>{r}</span>
                        </li>
                    ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 border-t border-black/15 dark:border-white/10 pt-4">
                    {exp.technologies.map((t) => (
                        <span
                            key={t}
                            className="border border-black/25 dark:border-white/20 px-2 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-black/65 dark:text-white/55 smallcaps"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

const YearStamp = ({ year, delay = '0s' }: { year: string; delay?: string }) => (
    <div className="relative my-10 h-8 sm:my-12">
        <span
            className="fade-up absolute top-1/2 left-[26px] z-20 -translate-x-1/2 -translate-y-1/2 border border-black/25 dark:border-white/20 bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)] px-3 py-1 font-mono text-[0.68rem] tracking-[0.2em] text-black/65 dark:text-white/55 smallcaps md:left-1/2"
            style={{ animationDelay: delay }}
        >
            {year}
        </span>
    </div>
);

export const WorkExperience = () => {
    const [ref] = useScrollReveal();

    return (
        <section
            id="work"
            ref={ref}
            className="relative w-full overflow-hidden px-0 py-24 sm:py-28 md:py-32"
        >
            <style>{`
                @keyframes spine-draw {
                    from { transform: scaleY(0); }
                    to   { transform: scaleY(1); }
                }
                @keyframes marker-pop {
                    0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    65%  { transform: translate(-50%, -50%) scale(1.25); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                @keyframes connector-draw {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
                @keyframes present-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(110,140,90,0.55); }
                    50%      { box-shadow: 0 0 0 14px rgba(110,140,90,0);    }
                }
                @keyframes status-blink {
                    0%, 100% { opacity: 1;    }
                    50%      { opacity: 0.45; }
                }

                .spine-line {
                    transform-origin: top;
                    animation: spine-draw 2.4s 0.3s cubic-bezier(0.7,0,0.3,1) both;
                }
                .timeline-marker {
                    animation: marker-pop 0.7s cubic-bezier(0.2,0.7,0.2,1) both;
                }
                .connector-line.right { transform-origin: left;  animation: connector-draw 0.55s cubic-bezier(0.7,0,0.3,1) both; }
                .connector-line.left  { transform-origin: right; animation: connector-draw 0.55s cubic-bezier(0.7,0,0.3,1) both; }

                .present-marker { animation: present-pulse 2.4s ease-in-out infinite; }
                .status-dot     { animation: status-blink   2.4s ease-in-out infinite; }

                @media (prefers-reduced-motion: reduce) {
                    .spine-line, .timeline-marker, .connector-line,
                    .present-marker, .status-dot {
                        animation: none !important;
                        transform: none !important;
                    }
                    .spine-line { transform: scaleY(1) !important; }
                }
            `}</style>

            {/* Background textures */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Soft radial */}
            <div
                className="absolute left-1/2 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(150,160,140,0.14), transparent 65%)' }}
            />

            {/* Top meta row */}
            <div
                className="fade-up absolute left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/45 dark:text-white/35 smallcaps sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.35s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">
                    Ch. V / Career
                </span>
                <span className="hidden shrink-0 sm:inline">Experience / Vol. 05</span>
                <span className="hidden shrink-0 font-mono tracking-[0.12em] xs:inline">
                    MMXXIV
                </span>
            </div>

            {/* Corner ticks */}
            <div
                className="corner-tick tl fade-up absolute top-28 left-12 hidden h-3 w-3 opacity-30 md:block"
                style={{ animationDelay: '0.9s' }}
            />
            <div
                className="corner-tick tr fade-up absolute top-28 right-12 hidden h-3 w-3 opacity-30 md:block"
                style={{ animationDelay: '0.9s' }}
            />

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                03
            </div>

            {/* Intro row */}
            <div className="relative z-10 mx-auto mb-12 grid w-full max-w-[1400px] grid-cols-1 items-end gap-8 px-5 sm:mb-16 sm:px-6 md:mb-20 md:grid-cols-12 md:px-12">
                <div className="md:col-span-7">
                    <p
                        className="fade-up mb-5 flex max-w-full items-center gap-3 text-[0.72rem] leading-none text-black/65 dark:text-white/45 smallcaps sm:mb-6 sm:text-[0.76rem]"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="block h-px w-8 shrink-0 bg-black/40 dark:bg-white/25 sm:w-10" />
                        <span className="min-w-0">Experience — A Thread</span>
                        <span className="hidden shrink-0 font-mono text-black/40 dark:text-white/25 xs:inline">- 005</span>
                    </p>

                    <h2 className="hero-title fade-up font-black" style={{ animationDelay: '0.55s' }}>
                        <span className="title-word">A</span>{' '}
                        <span className="title-word"><em>path</em></span>
                        <br />
                        <span className="title-word">
                            through code
                            <span className="hero-mark align-top font-normal italic text-black/40 dark:text-white/25">.</span>
                        </span>
                    </h2>
                </div>

                <div
                    className="fade-up md:col-span-5 md:flex md:flex-col md:items-end"
                    style={{ animationDelay: '0.75s' }}
                >
                    <p className="font-serif-alt mb-6 max-w-[28rem] text-[1.1rem] italic leading-[1.5] text-black/70 dark:text-white/55 md:text-right md:text-[1.2rem]">
                        Roles, rooms, &amp; routines — a chronological thread of where I&apos;ve
                        worked &amp; what I&apos;ve been shipping.
                    </p>

                    <div className="flex items-center gap-5">
                        <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                            {experiences.length} positions
                        </span>
                        <span className="block h-px w-10 bg-black/25 dark:bg-white/20" />
                        <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                            2024 — Present
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Timeline ── */}
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-12">
                <div className="relative pt-2">
                    {/* The spine */}
                    <span
                        className="spine-line absolute left-[26px] top-0 bottom-0 z-0 w-px bg-black/25 dark:bg-white/20 md:left-1/2 md:-translate-x-1/2"
                        aria-hidden="true"
                    />

                    {/* Top tick on the spine */}
                    <span
                        className="absolute left-[26px] top-0 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
                        aria-hidden="true"
                    >
                        <span className="block h-2 w-2 rotate-45 border border-black/60 dark:border-white/45 bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)]" />
                    </span>

                    {/* 2024 stamp */}
                    <YearStamp year="2024" delay="0.5s" />

                    {/* Entries */}
                    {experiences.map((exp, i) => {
                        const side: 'left' | 'right' = i % 2 === 0 ? 'right' : 'left';
                        const isCurrent = exp.current;
                        const stagger = 0.7 + i * 0.18;

                        return (
                            <Fragment key={exp.id}>
                                {/* Insert "2025" stamp between entry 1 and entry 2 */}
                                {i === 1 && <YearStamp year="2025" delay={`${stagger - 0.1}s`} />}

                                <div className="relative mb-14 grid grid-cols-1 pl-12 sm:mb-16 md:grid-cols-2 md:gap-16 md:pl-0">
                                    {/* Marker on the spine */}
                                    <span
                                        className="timeline-marker absolute top-[34px] left-[26px] z-20 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black dark:border-white/70 bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)] md:left-1/2"
                                        style={{ animationDelay: `${stagger + 0.1}s` }}
                                        aria-hidden="true"
                                    >
                                        <span
                                            className={`block h-2 w-2 rounded-full ${isCurrent ? 'present-marker' : ''}`}
                                            style={{ background: isCurrent ? '#6e8c5a' : 'currentColor' }}
                                        />
                                    </span>

                                    {/* Entry number floating near marker */}
                                    <span
                                        className="fade-up absolute top-[26px] left-[50px] z-10 font-mono text-[0.55rem] tracking-[0.22em] text-black/45 dark:text-white/30 smallcaps md:hidden"
                                        style={{ animationDelay: `${stagger + 0.15}s` }}
                                    >
                                        0{exp.id}
                                    </span>

                                    {/* Connector line (desktop only) */}
                                    <span
                                        className={`connector-line ${side} absolute top-[34px] hidden h-px w-8 bg-black/30 dark:bg-white/20 md:block ${
                                            side === 'right' ? 'left-1/2' : 'right-1/2'
                                        }`}
                                        style={{ animationDelay: `${stagger + 0.2}s` }}
                                        aria-hidden="true"
                                    />

                                    {/* Card slots — conditional render keeps mobile clean */}
                                    {side === 'left' ? (
                                        <>
                                            <div
                                                className="fade-up"
                                                style={{ animationDelay: `${stagger + 0.25}s` }}
                                            >
                                                <EntryCard exp={exp} />
                                            </div>
                                            <div className="hidden md:block" aria-hidden="true" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="hidden md:block" aria-hidden="true" />
                                            <div
                                                className="fade-up"
                                                style={{ animationDelay: `${stagger + 0.25}s` }}
                                            >
                                                <EntryCard exp={exp} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Fragment>
                        );
                    })}

                    {/* ── Present endcap ── */}
                    <div className="relative pt-4 pb-2">
                        <span
                            className="absolute left-[26px] top-4 z-10 -translate-x-1/2 md:left-1/2"
                            aria-hidden="true"
                        >
                            <span
                                className="present-marker block h-4 w-4 rounded-full"
                                style={{ background: '#6e8c5a' }}
                            />
                        </span>
                        <div
                            className="fade-up flex items-center gap-3 pl-12 md:justify-center md:pl-0"
                            style={{ animationDelay: '1.4s' }}
                        >
                            <span className="hidden h-px w-12 bg-black/25 dark:bg-white/20 md:block" />
                            <span className="font-serif-alt text-[1.25rem] italic text-black/75 dark:text-white/55">
                                Present
                            </span>
                            <span className="font-mono text-[0.62rem] tracking-[0.2em] text-black/45 dark:text-white/30 smallcaps">
                                — Still shipping
                            </span>
                            <span className="hidden h-px w-12 bg-black/25 dark:bg-white/20 md:block" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom meta */}
            <div
                className="fade-up absolute bottom-5 left-5 hidden font-mono text-[0.64rem] text-black/40 dark:text-white/25 smallcaps sm:bottom-6 sm:left-6 sm:block md:left-12"
                style={{ animationDelay: '1.5s' }}
            >
                [ 005 / 005 ] - Experience
            </div>
        </section>
    );
};