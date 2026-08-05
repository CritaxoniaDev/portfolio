'use client';

import Image from 'next/image';
import { useScrollReveal } from './hooks/useScrollReveal';

type EducationItem = {
    id: number;
    institution: string;
    degree: string;
    date: string;
    location: string;
    status: string;
    statusColor: 'green' | 'blue';
    logo: string;
    isOngoing: boolean;
    description: string;
    skills: string[];
};
    
const educationData: EducationItem[] = [
    {
        id: 1,
        institution: 'Lithan Academy Pte Ltd',
        degree: 'Bachelor Degree in Software Engineering',
        date: '2023 - 2026',
        location: 'Singapore',
        status: 'Completed',
        statusColor: 'green',
        logo: '/images/lithan-logo.png',
        isOngoing: false,
        description:
            'Comprehensive applied degree program focusing on practical software engineering skills and industry-relevant technologies.',
        skills: ['Software Engineering', 'Applied Learning', 'Industry Projects', 'Technical Skills'],
    },
    {
        id: 2,
        institution: 'First City Providential College',
        degree: 'Bachelor of Science in Information Technology — Software Engineering',
        date: '2023 - Present',
        location: 'Philippines',
        status: 'In Progress',
        statusColor: 'blue',
        logo: '/images/fcpc-logo.png',
        isOngoing: true,
        description:
            "Bachelor's degree program specializing in software engineering with focus on modern development practices and methodologies.",
        skills: ['Information Technology', 'Software Engineering', 'Programming', 'System Design'],
    },
    {
        id: 3,
        institution: 'Sapang Palay National High School',
        degree: 'Senior High School',
        date: '2021 - 2022',
        location: 'Philippines',
        status: 'With Honors',
        statusColor: 'green',
        logo: '/images/spnhs-logo.png',
        isOngoing: false,
        description:
            'Completed senior high school education with honors, building foundational knowledge for higher education in technology.',
        skills: ['Academic Excellence', 'Leadership', 'Critical Thinking', 'Foundation Studies'],
    },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];
const pad = (n: number) => String(n).padStart(2, '0');

export const Education = () => {
    const [ref] = useScrollReveal();

    return (
        <section
            ref={ref}
            id="education"
            className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28 md:px-12 md:py-32"
        >
            {/* ── Layered backgrounds ── */}
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Soft radial highlights */}
            <div
                className="absolute -top-32 -right-24 h-[360px] w-[360px] rounded-full pointer-events-none sm:h-[440px] sm:w-[440px] md:-top-40 md:-right-32 md:h-[560px] md:w-[560px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(150,160,140,0.14), transparent 62%)',
                }}
            />
            <div
                className="absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full pointer-events-none sm:h-[480px] sm:w-[480px] md:-bottom-44 md:-left-32 md:h-[640px] md:w-[640px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(180,150,110,0.14), transparent 62%)',
                }}
            />

            {/* Top meta row */}
            <div
                className="absolute left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/45 dark:text-white/30 smallcaps fade-up sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.3s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">
                    Section / Education
                </span>
                <span className="hidden shrink-0 sm:inline">Portfolio / Vol. 02</span>
                <span className="hidden shrink-0 font-mono tracking-[0.12em] xs:inline">
                    Three Chapters
                </span>
            </div>

            {/* Decorative corner ticks */}
            <div
                className="corner-tick tl absolute top-28 left-12 hidden h-3 w-3 opacity-30 fade-up md:block"
                style={{ animationDelay: '0.9s' }}
            />
            <div
                className="corner-tick tr absolute top-28 right-12 hidden h-3 w-3 opacity-30 fade-up md:block"
                style={{ animationDelay: '0.9s' }}
            />

            {/* Vertical accent label */}
            <span
                className="vertical-rl absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[0.68rem] text-black/45 dark:text-white/30 smallcaps fade-up sm:block md:right-6"
                style={{ animationDelay: '0.5s' }}
            >
                A Record of Learning — bound by curiosity
            </span>

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                05
            </div>

            {/* Floating italic accent */}
            <div
                className="absolute left-12 top-28 hidden items-center gap-3 fade-up xl:flex"
                style={{ animationDelay: '0.7s' }}
            >
                <span className="font-serif-alt text-2xl italic text-black/60 dark:text-white/40">
                    a brief ledger
                </span>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-40 text-black dark:text-white" aria-hidden="true">
                    <path
                        d="M5 5 Q 20 35, 35 5"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2 3"
                    />
                    <circle cx="5" cy="5" r="2" fill="currentColor" />
                </svg>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                {/* ── Section heading ── */}
                <div className="mb-14 sm:mb-20 md:mb-24">
                    {/* Eyebrow */}
                    <p
                        className="mb-5 flex max-w-full items-center gap-3 text-[0.72rem] leading-none text-black/65 dark:text-white/45 smallcaps fade-up sm:mb-6 sm:text-[0.76rem]"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="block h-px w-8 shrink-0 bg-black/40 dark:bg-white/25 sm:w-10" />
                        <span className="min-w-0">Education &amp; Training</span>
                        <span className="hidden shrink-0 font-mono text-black/40 dark:text-white/25 xs:inline">- 002</span>
                    </p>

                    {/* Title */}
                    <h2 className="hero-title font-black fade-up" style={{ animationDelay: '0.55s' }}>
                        <span className="title-word">Rooms</span>{' '}
                        <span className="title-word"><em>that</em></span>
                        <br />
                        <span className="title-word">shaped</span>{' '}
                        <span className="title-word"><em>the</em></span>
                        <br />
                        <span className="title-word">
                            making
                            <span className="hero-mark align-top font-normal italic text-black/40 dark:text-white/25">.</span>
                        </span>
                    </h2>

                    {/* Subtitle row + stats */}
                    <div
                        className="mt-8 grid grid-cols-1 gap-6 fade-up sm:mt-10 sm:gap-8 md:mt-12 md:grid-cols-12 md:items-end"
                        style={{ animationDelay: '0.75s' }}
                    >
                        <div className="md:col-span-6 lg:col-span-6">
                            <p className="font-serif-alt max-w-[34rem] text-[1.1rem] italic leading-[1.55] text-black/75 dark:text-white/55 sm:text-[1.22rem] md:text-[1.32rem]">
                                A short ledger of the rooms where curiosity met discipline — and discipline, in time, learned to listen back.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-black/15 dark:border-white/10 pt-4 sm:gap-6 sm:pt-5 md:col-span-5 md:col-start-8">
                            <div>
                                <div className="stat-number text-3xl font-black leading-none sm:text-4xl">
                                    03
                                </div>
                                <div className="mt-2 text-[0.66rem] leading-tight text-black/55 dark:text-white/40 smallcaps">
                                    Institutions
                                </div>
                            </div>
                            <div>
                                <div className="stat-number text-3xl font-black leading-none sm:text-4xl">
                                    05<span className="text-black/30 dark:text-white/25">+</span>
                                </div>
                                <div className="mt-2 text-[0.66rem] leading-tight text-black/55 dark:text-white/40 smallcaps">
                                    Years
                                </div>
                            </div>
                            <div>
                                <div className="stat-number text-3xl font-black leading-none sm:text-4xl">
                                    02
                                </div>
                                <div className="mt-2 text-[0.66rem] leading-tight text-black/55 dark:text-white/40 smallcaps">
                                    Countries
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Entries ── */}
                <ol className="relative space-y-10 sm:space-y-10 md:space-y-10">
                    {educationData.map((item, idx) => {
                        const padded = pad(idx + 1);
                        const roman = ROMAN[idx] ?? String(idx + 1);
                        const isLast = idx === educationData.length - 1;

                        return (
                            <li
                                key={item.id}
                                className="relative fade-up"
                                style={{ animationDelay: `${0.95 + idx * 0.2}s` }}
                            >
                                {/* Chapter label row */}
                                <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps sm:mb-7">
                                    <span className="flex items-center gap-3">
                                        <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                                        Chapter {padded} / {roman}
                                    </span>
                                    <span className="hidden text-black/35 dark:text-white/25 sm:inline">
                                        {item.date} · {item.location}
                                    </span>
                                </div>

                                {/* Entry hairline */}
                                <div className="mb-8 h-px w-full bg-black/15 dark:bg-white/10 sm:mb-10" />

                                <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
                                    {/* ── Logo plate ── */}
                                    <div className="md:col-span-4 lg:col-span-3">
                                        {/* Plate label */}
                                        <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[0.58rem] leading-none tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps">
                                            <span className="flex items-center gap-2">
                                                <span className="block h-px w-4 bg-black/25 dark:bg-white/15" />
                                                Plate {padded}
                                            </span>
                                            <span className="text-black/30 dark:text-white/25">Crest</span>
                                        </div>

                                        {/* Stacked frame */}
                                        <div className="relative mx-auto w-full max-w-[240px] md:mx-0 md:max-w-none">
                                            {/* Back plates */}
                                            <div
                                                className="absolute inset-0 translate-x-[10px] translate-y-[10px] border border-black/10 dark:border-white/[0.06]"
                                                aria-hidden="true"
                                            />
                                            <div
                                                className="absolute inset-0 translate-x-[5px] translate-y-[5px] border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
                                                aria-hidden="true"
                                            />

                                            {/* Main frame */}
                                            <div className="relative border border-black/30 dark:border-white/20 bg-[rgb(240,238,230)] dark:bg-[rgb(22,21,18)] p-3">
                                                {/* Corner brackets */}
                                                <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-black dark:border-white" />
                                                <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-black dark:border-white" />
                                                <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-black dark:border-white" />
                                                <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-black dark:border-white" />

                                                <div className="relative aspect-square overflow-hidden bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)]">
                                                    <Image
                                                        src={item.logo}
                                                        alt={`${item.institution} crest`}
                                                        fill
                                                        sizes="(max-width: 768px) 45vw, 240px"
                                                        unoptimized={item.logo.endsWith('.svg')}
                                                        className="object-contain p-4"
                                                    />
                                                    {/* Subtle vignette */}
                                                    <div
                                                        className="pointer-events-none absolute inset-0"
                                                        style={{
                                                            background:
                                                                'radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.10))',
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                    {/* Tiny year mark */}
                                                    <span className="absolute bottom-2 right-2 font-mono text-[0.55rem] tracking-[0.18em] text-black/35 dark:text-white/25 smallcaps">
                                                        {item.date.split(' ')[0]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Caption under logo */}
                                        <div className="mt-4 flex items-start justify-between gap-3">
                                            <span className="font-serif-alt text-sm italic text-black/45 dark:text-white/30">
                                                Fig. {padded} — crest
                                            </span>
                                            <span className="font-mono text-[0.58rem] tracking-[0.18em] text-black/35 dark:text-white/25 smallcaps">
                                                {item.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Content ── */}
                                    <div className="md:col-span-8 lg:col-span-9">
                                        {/* Mobile meta */}
                                        <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[0.62rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps sm:hidden">
                                            <span>{item.date}</span>
                                            <span>{item.location}</span>
                                        </div>

                                        {/* Institution name */}
                                        <h3
                                            className="font-serif-alt italic leading-[1.4] leading-[0.95] tracking-[-0.01em]"
                                            style={{ fontSize: 'clamp(1.85rem, 4.4vw, 3.5rem)' }}
                                        >
                                            {item.institution}
                                        </h3>

                                        {/* Degree */}
                                        <p className="mt-3 text-[1.1rem] font-medium leading-tight text-black/65 dark:text-white/45 sm:mt-4 sm:text-[1.25rem] md:text-[1.4rem]">
                                            {item.degree}
                                        </p>

                                        {/* Status row */}
                                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/15 dark:border-white/10 pt-5 sm:mt-7">
                                            {/* Status pill */}
                                            <span className="flex items-center gap-2.5">
                                                <span className="relative flex h-2 w-2 items-center justify-center">
                                                    <span
                                                        className={`relative z-10 block h-2 w-2 rounded-full ${
                                                            item.statusColor === 'green'
                                                                ? 'bg-[#3a6b3a]'
                                                                : 'bg-[#3a5a8a]'
                                                        }`}
                                                    />
                                                    {item.isOngoing && (
                                                        <span
                                                            className={`absolute inline-flex h-4 w-4 rounded-full opacity-50 pulse-soft ${
                                                                item.statusColor === 'green'
                                                                    ? 'bg-[#3a6b3a]'
                                                                    : 'bg-[#3a5a8a]'
                                                            }`}
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </span>
                                                <span className="text-[0.7rem] leading-none text-black/70 dark:text-white/55 smallcaps">
                                                    {item.status}
                                                </span>
                                            </span>

                                            {/* Year range */}
                                            <span className="hidden items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-black/50 dark:text-white/40 smallcaps sm:flex">
                                                <span className="block h-px w-4 bg-black/25 dark:bg-white/15" />
                                                {item.date}
                                            </span>

                                            {/* Location */}
                                            <span className="hidden items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-black/50 dark:text-white/40 smallcaps sm:flex">
                                                ↳ {item.location}
                                            </span>

                                            {/* Spacer */}
                                            <span className="ml-auto hidden font-serif-alt text-base italic text-black/35 dark:text-white/25 md:inline">
                                                — Ch. {padded}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p style={{ fontFamily: 'Inter Variable' }} className="mt-6 max-w-[44rem] text-[0.97rem] leading-[1.65] text-black/70 dark:text-white/55 sm:text-base sm:leading-[1.7]">
                                            {item.description}
                                        </p>

                                        {/* Skills */}
                                        <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-2.5">
                                            <span className="mr-1 flex items-center gap-2 font-mono text-[0.58rem] leading-none tracking-[0.2em] text-black/40 dark:text-white/25 smallcaps">
                                                <span className="block h-px w-3 bg-black/25 dark:bg-white/15" />
                                                Focus
                                            </span>
                                            {item.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="inline-flex items-center gap-1.5 border border-black/20 dark:border-white/15 bg-[rgb(240,238,230)] dark:bg-[rgb(22,21,18)] px-2.5 py-1 font-mono text-[0.62rem] leading-none tracking-[0.12em] text-black/65 dark:text-white/45 smallcaps transition-colors hover:border-black/50 dark:hover:border-white/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.08]"
                                                >
                                                    <span className="block h-1 w-1 rounded-full bg-black/30 dark:bg-white/25" />
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* End-of-entry punctuation */}
                                {!isLast && (
                                    <div className="mt-14 flex items-center gap-4 sm:mt-16 md:mt-10">
                                        <span className="block h-px flex-1 bg-black/10 dark:bg-white/[0.06]" />
                                        <span className="font-serif-alt text-lg italic text-black/35 dark:text-white/25">§</span>
                                        <span className="block h-px flex-1 bg-black/10 dark:bg-white/[0.06]" />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ol>

                {/* ── Closing accent ── */}
                <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/15 dark:border-white/10 pt-6 sm:mt-20 sm:flex-row sm:items-center sm:gap-6 sm:pt-7">
                    <span className="flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                        <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                        End of Section · Education
                    </span>
                    <span className="font-serif-alt text-lg italic text-black/45 dark:text-white/30 sm:text-xl">
                        — and the studying, of course, continues.
                    </span>
                </div>
            </div>

            {/* Bottom meta */}
            <div
                className="absolute bottom-5 left-5 hidden font-mono text-[0.64rem] text-black/40 dark:text-white/25 smallcaps fade-up sm:bottom-6 sm:left-6 sm:block md:left-12"
                style={{ animationDelay: '1.2s' }}
            >
                [ 002 / 005 ] - Education
            </div>
            <div
                className="absolute bottom-5 right-5 hidden font-mono text-[0.64rem] text-black/40 dark:text-white/25 smallcaps fade-up sm:bottom-6 sm:right-6 sm:block md:right-12"
                style={{ animationDelay: '1.2s' }}
            >
                N 14.6760 / E 121.0437
            </div>
        </section>
    );
};