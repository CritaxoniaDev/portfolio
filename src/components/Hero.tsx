'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import profilePic from '../../public/images/profile-pic.jpg';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useManilaTime } from './hooks/useManilaTime';
import { useTheme } from '../context/ThemeContext';

/* Its own component so the minute tick doesn't re-render the whole hero. */
const Dateline = () => <span className="tabular-nums">{useManilaTime()} PHT</span>;

const stats = [
    { value: '08', label: 'Projects' },
    { value: '06', label: 'Certifications' },
    { value: '03', label: 'Roles held' },
];

const dossier: { term: string; detail: ReactNode }[] = [
    { term: 'Role', detail: 'Technical Developer' },
    { term: 'Company', detail: 'CLaaS2SaaS · since Nov 2024' },
    { term: 'Base', detail: 'Manila, PH' },
    { term: 'Local time', detail: <Dateline /> },
];

const stack = ['Laravel', 'React', 'Next.js', 'Spring Boot', 'Tailwind', 'MySQL'];

const index = [
    { numeral: 'I', label: 'About', href: '#about' },
    { numeral: 'II', label: 'Work', href: '#work' },
    { numeral: 'III', label: 'Certificates', href: '#certificates' },
    { numeral: 'IV', label: 'Education', href: '#education' },
    { numeral: 'V', label: 'Skills', href: '#skills' },
    { numeral: 'VI', label: 'Projects', href: '#projects' },
    { numeral: 'VII', label: 'Contact', href: '#contact' },
];

export const Hero = () => {
    const [ref] = useScrollReveal();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            id="top"
            ref={ref}
            className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-24 sm:px-6 sm:py-28 md:px-12 lg:py-16"
        >
            {/* Layered backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Soft radial highlights */}
            <div
                className="absolute -top-32 -left-32 h-[360px] w-[360px] rounded-full pointer-events-none sm:h-[440px] sm:w-[440px] md:-top-40 md:-left-40 md:h-[560px] md:w-[560px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(180,150,110,0.16), transparent 62%)',
                }}
            />
            <div
                className="absolute -bottom-32 -right-32 h-[380px] w-[380px] rounded-full pointer-events-none sm:h-[480px] sm:w-[480px] md:-bottom-44 md:-right-44 md:h-[640px] md:w-[640px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(150,160,140,0.14), transparent 62%)',
                }}
            />

            {/* Decorative corner ticks */}
            <div
                className="corner-tick tl absolute top-32 left-12 hidden h-3 w-3 opacity-30 fade-up md:block"
                style={{ animationDelay: '0.9s' }}
            />
            <div
                className="corner-tick tr absolute top-32 right-12 hidden h-3 w-3 opacity-30 fade-up md:block"
                style={{ animationDelay: '0.9s' }}
            />

            {/* Vertical rail label */}
            <span
                className="vertical-rl absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[0.68rem] text-black/45 dark:text-white/30 smallcaps fade-up sm:block md:right-6"
                style={{ animationDelay: '0.5s' }}
            >
                Software Engineering &mdash; Manila, Philippines
            </span>

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                01
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">

                    {/* ── Left: portrait plate + dossier ── */}
                    <div
                        className="order-2 mx-auto w-full max-w-[420px] fade-up lg:order-1 lg:col-span-5 lg:mx-0 lg:max-w-[360px] xl:col-span-4 xl:max-w-[400px]"
                        style={{ animationDelay: '0.6s' }}
                    >
                        {/* Plate label row */}
                        <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                            <span className="flex items-center gap-3">
                                <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                                Plate 001 / I
                            </span>
                            <span className="text-black/40 dark:text-white/25">Manila &middot; PH</span>
                        </div>

                        {/* Stacked frame for paper-stack depth */}
                        <div className="relative">
                            <div
                                className="absolute inset-0 translate-x-[12px] translate-y-[12px] border border-black/10 dark:border-white/10"
                                aria-hidden="true"
                            />
                            <div
                                className="absolute inset-0 translate-x-[6px] translate-y-[6px] border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
                                aria-hidden="true"
                            />

                            {/* Main frame */}
                            <div className="group relative border border-black/30 dark:border-white/20 bg-[rgb(240,238,230)] dark:bg-[rgb(28,26,22)] p-3">
                                <span className="absolute top-0 left-0 z-20 h-3 w-3 border-t border-l border-black dark:border-white/50" />
                                <span className="absolute top-0 right-0 z-20 h-3 w-3 border-t border-r border-black dark:border-white/50" />
                                <span className="absolute bottom-0 left-0 z-20 h-3 w-3 border-b border-l border-black dark:border-white/50" />
                                <span className="absolute bottom-0 right-0 z-20 h-3 w-3 border-b border-r border-black dark:border-white/50" />

                                <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
                                    <Image
                                        src={profilePic}
                                        alt="Gian Raphael Alcantara"
                                        fill
                                        priority
                                        placeholder="blur"
                                        sizes="(max-width: 1024px) 90vw, 400px"
                                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03]"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0"
                                        style={{
                                            background:
                                                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.22))',
                                        }}
                                        aria-hidden="true"
                                    />
                                    {/* Exposure strip */}
                                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 font-mono text-[0.55rem] leading-none tracking-[0.18em] text-white/70 smallcaps mix-blend-difference">
                                        <span>Fig. 01</span>
                                        <span className="tabular-nums">4 : 5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="mt-4 flex items-start justify-between gap-6">
                            <p className="font-serif-alt max-w-[18rem] text-[1.05rem] italic leading-[1.35] text-black/60 dark:text-white/45">
                                Fig. 01 &mdash; the developer,<br />
                                somewhere between builds.
                            </p>
                            <div className="shrink-0 text-right">
                                <div className="font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps">
                                    Portrait / 2026
                                </div>
                                <div className="font-serif-alt mt-1.5 text-base italic text-black/40 dark:text-white/25">
                                    &mdash; gra
                                </div>
                            </div>
                        </div>

                        {/* Dossier */}
                        <dl className="mt-5 border-t border-black/15 dark:border-white/10">
                            {dossier.map(({ term, detail }) => (
                                <div
                                    key={term}
                                    className="flex items-baseline justify-between gap-4 border-b border-black/[0.08] dark:border-white/[0.06] py-2"
                                >
                                    <dt className="font-mono text-[0.58rem] leading-none tracking-[0.2em] text-black/45 dark:text-white/30 smallcaps">
                                        {term}
                                    </dt>
                                    <dd className="text-right text-[0.82rem] leading-none text-black/75 dark:text-white/55">
                                        {detail}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* ── Right: masthead ── */}
                    <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-8">
                        {/* Availability chip */}
                        <div
                            className="mb-5 flex flex-wrap items-center gap-3 fade-up"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <span className="inline-flex items-center gap-2.5 border border-black/15 dark:border-white/10 px-3 py-1.5 text-[0.62rem] leading-none text-black/65 dark:text-white/45 smallcaps">
                                <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
                                    <span
                                        className="pulse-soft absolute inset-0 rounded-full"
                                        style={{ background: '#6e8c5a' }}
                                    />
                                </span>
                                Open for work
                            </span>
                            <span className="inline-flex items-center gap-3 text-[0.7rem] leading-none text-black/55 dark:text-white/40 smallcaps">
                                <span className="block h-px w-6 bg-black/25 dark:bg-white/15" aria-hidden="true" />
                                Technology Associate &mdash; CLaaS2SaaS
                            </span>
                        </div>

                        <h1
                            className="hero-title font-black fade-up"
                            style={{ animationDelay: '0.55s' }}
                        >
                            <span className="title-word">Gian Raphael</span>
                            <br />
                            <span className="title-word">
                                <em>Alcantara</em>
                            </span>
                        </h1>

                        <p
                            className="font-serif-alt mt-6 max-w-[34rem] text-[1.12rem] italic leading-[1.5] text-black/75 dark:text-white/55 fade-up sm:text-[1.22rem] md:text-[1.28rem]"
                            style={{ animationDelay: '0.7s' }}
                        >
                            BSIT Software Engineering student in Manila, building production
                            web applications with Laravel, React and Next.js &mdash; and
                            documenting the work as I go.
                        </p>

                        {/* Calls to action */}
                        <div
                            className="mt-7 flex flex-col gap-3 fade-up sm:mt-8 sm:flex-row sm:items-center sm:gap-4"
                            style={{ animationDelay: '0.8s' }}
                        >
                            <a
                                href="#projects"
                                className="group inline-flex items-center justify-between gap-6 border border-black bg-black px-6 py-3.5 text-[0.7rem] leading-none text-[rgb(244,243,238)] smallcaps transition-colors duration-300 hover:bg-transparent hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:border-white/70 dark:bg-white dark:text-[rgb(13,12,10)] dark:hover:bg-transparent dark:hover:text-white dark:focus-visible:outline-white"
                            >
                                View selected work
                                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                                    &rarr;
                                </span>
                            </a>
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-between gap-6 border border-black/30 px-6 py-3.5 text-[0.7rem] leading-none text-black/75 smallcaps transition-colors duration-300 hover:border-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:border-white/20 dark:text-white/55 dark:hover:border-white/60 dark:hover:text-white dark:focus-visible:outline-white"
                            >
                                Get in touch
                                <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
                                    &darr;
                                </span>
                            </a>
                        </div>

                        {/* Stack specimen */}
                        <div
                            className="mt-7 border-t border-black/15 dark:border-white/10 pt-4 fade-up"
                            style={{ animationDelay: '0.9s' }}
                        >
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                                <span className="font-mono text-[0.58rem] leading-none tracking-[0.2em] text-black/45 dark:text-white/30 smallcaps">
                                    Working in
                                </span>
                                <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                                    {stack.map((tool, i) => (
                                        <li
                                            key={tool}
                                            className="flex items-baseline gap-3 text-[0.8rem] leading-none text-black/75 dark:text-white/55"
                                        >
                                            {tool}
                                            {i < stack.length - 1 && (
                                                <span className="text-black/25 dark:text-white/20" aria-hidden="true">
                                                    /
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Stats + controls */}
                        <div
                            className="mt-5 grid grid-cols-1 gap-6 fade-up sm:mt-6 md:grid-cols-12 md:items-end"
                            style={{ animationDelay: '1s' }}
                        >
                            <dl className="grid grid-cols-3 gap-4 border-t border-black/15 dark:border-white/10 pt-4 sm:gap-6 md:col-span-7">
                                {stats.map(({ value, label }) => (
                                    <div key={label}>
                                        <dd className="stat-number text-3xl font-black leading-none tabular-nums sm:text-4xl">
                                            {value}
                                        </dd>
                                        <dt className="mt-2 text-[0.68rem] leading-tight text-black/55 dark:text-white/40 smallcaps">
                                            {label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>

                            <div className="flex items-center justify-between gap-6 md:col-span-5 md:justify-end md:gap-8">
                                {/* ── Theme toggle ── */}
                                <button
                                    onClick={toggleTheme}
                                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                                    className="theme-toggle group"
                                >
                                    {/* Pill track */}
                                    <span className="theme-toggle__track" aria-hidden="true">
                                        <span className="theme-toggle__thumb">
                                            {/* Sun icon */}
                                            <svg
                                                className="theme-toggle__icon theme-toggle__icon--sun"
                                                width="9" height="9" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2.5"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <circle cx="12" cy="12" r="4" />
                                                <line x1="12" y1="2" x2="12" y2="5" />
                                                <line x1="12" y1="19" x2="12" y2="22" />
                                                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                                                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                                                <line x1="2" y1="12" x2="5" y2="12" />
                                                <line x1="19" y1="12" x2="22" y2="12" />
                                                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                                                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                                            </svg>
                                            {/* Moon icon */}
                                            <svg
                                                className="theme-toggle__icon theme-toggle__icon--moon"
                                                width="9" height="9" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2.5"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                            </svg>
                                        </span>
                                    </span>

                                    {/* Label */}
                                    <span className="theme-toggle__label smallcaps">
                                        {isDark ? 'Dark mode' : 'Light mode'}
                                    </span>
                                </button>

                                <a
                                    href="#about"
                                    className="group inline-flex items-center gap-3 text-[0.72rem] leading-none text-black/75 dark:text-white/55 smallcaps sm:gap-4"
                                >
                                    <span className="relative h-px w-12 overflow-hidden bg-black/20 dark:bg-white/15 sm:w-[60px]">
                                        <span className="absolute inset-0 bg-black dark:bg-white scroll-line" />
                                    </span>
                                    <span className="transition-transform group-hover:translate-x-1">Scroll &darr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Contents index ── */}
                <nav
                    aria-label="Section index"
                    className="mt-6 hidden border-t border-black/15 dark:border-white/10 pt-3.5 fade-up lg:[@media(min-height:720px)]:block"
                    style={{ animationDelay: '1.15s' }}
                >
                    <ol className="grid grid-cols-7 gap-4">
                        {index.map(({ numeral, label, href }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className="group flex items-baseline gap-2.5 text-[0.72rem] leading-none text-black/55 transition-colors duration-300 hover:text-black dark:text-white/40 dark:hover:text-white smallcaps"
                                >
                                    <span className="font-mono text-[0.58rem] tracking-[0.18em] text-black/35 transition-colors duration-300 group-hover:text-black/60 dark:text-white/25 dark:group-hover:text-white/50">
                                        {numeral}
                                    </span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                                        {label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            {/* Bottom meta */}
            <div
                className="absolute bottom-5 left-5 right-5 hidden items-center justify-between font-mono text-[0.64rem] text-black/40 dark:text-white/25 smallcaps fade-up sm:bottom-6 sm:left-6 sm:right-6 sm:flex md:left-12 md:right-12"
                style={{ animationDelay: '1.1s' }}
            >
                <span>[ 001 / 005 ] - Hero</span>
                <span className="tracking-[0.12em]">14.5995&deg; N / 120.9842&deg; E</span>
            </div>
        </section>
    );
};
