'use client';

import { useState, useEffect, useRef } from 'react';
import { useManilaTime } from './hooks/useManilaTime';

type NavLink = {
    href: string;
    label: string;
    description: string;
};

const links: NavLink[] = [
    { href: '#about', label: 'About', description: 'who is behind the desk' },
    { href: '#work', label: 'Work', description: 'recent projects & studies' },
    { href: '#certificates', label: 'Certificates', description: 'the paper trail' },
    { href: '#education', label: 'Education', description: 'an academic record' },
    { href: '#skills', label: 'Skills', description: 'tools of the trade' },
    { href: '#projects', label: 'Projects', description: 'a curated selection' },
    { href: '#contact', label: 'Contact', description: 'send word' },
];

export const Navigation = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const time = useManilaTime();

    const toggleRef = useRef<HTMLButtonElement>(null);

    // ── Scroll-aware navigation (optimized)
    useEffect(() => {
        const onScroll = () => {
            const isScrolled = window.scrollY > 24;
            setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        };

        onScroll();

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // ── Active section tracking via IntersectionObserver
    useEffect(() => {
        const sections = links
            .map((l) => document.querySelector(l.href))
            .filter((el): el is Element => !!el);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection('#' + entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        sections.forEach((s) => observer.observe(s));

        return () => observer.disconnect();
    }, []);

    // ── Lock body scroll when menu open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // ── Escape to close + restore focus
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100]">
                {/* Scroll-aware paper backdrop */}
                <div
                    aria-hidden="true"
                    className={`absolute inset-0 transition-all duration-500 ${scrolled
                        ? 'border-b border-black/10 dark:border-white/10 bg-[rgba(244,243,238,0.78)] dark:bg-[rgba(13,12,10,0.78)] backdrop-blur-md'
                        : 'border-b border-transparent'
                        }`}
                />

                <div className="relative">
                    {/* ── Top mono meta strip (desktop only) ── */}
                    <div
                        className={`hidden items-center justify-between gap-4 overflow-hidden px-12 font-mono text-[0.56rem] tracking-[0.18em] text-black/40 dark:text-white/30 smallcaps transition-all duration-500 md:flex ${scrolled
                            ? 'max-h-0 py-0 opacity-0'
                            : 'max-h-8 py-2 opacity-100'
                            }`}
                    >
                        <span className="flex items-center gap-3">
                            <span className="block h-px w-5 bg-black/25 dark:bg-white/20" />
                            Software Engineering · Manila, Philippines
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="inline-block h-1 w-1 rounded-full bg-[rgb(118,138,102)]" />
                            Manila — {time}
                        </span>
                        <span className="flex items-center gap-3">
                            Portfolio · Vol. 01 — MMXXVI
                            <span className="block h-px w-5 bg-black/25 dark:bg-white/20" />
                        </span>
                    </div>

                    {/* ── Main nav row ── */}
                    <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 md:px-12 md:py-4">
                        {/* Logo block */}
                        <a href="#" className="group flex items-center gap-3">
                            {/* Monogram mark with bracket ornaments */}
                            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center border border-black/40 dark:border-white/35 transition-colors group-hover:border-black dark:group-hover:border-white">
                                <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-black dark:border-white" />
                                <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-black dark:border-white" />
                                <span className="font-black text-[0.78rem] leading-none">
                                    G
                                </span>
                            </span>
                            <span className="flex flex-col leading-none">
                                <span className="text-[0.72rem] font-medium leading-none smallcaps">
                                    Gian Raphael Alcantara
                                </span>
                                <span className="font-serif-alt mt-1 hidden text-[0.72rem] italic leading-none text-black/45 dark:text-white/35 sm:inline">
                                    software engineer
                                </span>
                            </span>
                        </a>

                        {/* Desktop links */}
                        <ul className="hidden list-none items-center gap-7 md:flex lg:gap-9">
                            {links.map((l, i) => {
                                const active = activeSection === l.href;
                                return (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            className="group flex items-baseline gap-2 text-[0.72rem] smallcaps"
                                        >
                                            <span
                                                className={`font-mono text-[0.58rem] leading-none tracking-[0.16em] transition-colors ${active
                                                    ? 'text-black dark:text-white'
                                                    : 'text-black/35 dark:text-white/30'
                                                    }`}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="nav-link relative">
                                                {l.label}
                                                <span
                                                    className={`absolute -bottom-1 left-0 block h-px bg-black dark:bg-white transition-all duration-500 ${active ? 'w-full' : 'w-0'
                                                        }`}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Status pill (desktop only) */}
                        <a
                            href="#contact"
                            className="group hidden items-center gap-2 border border-black/30 dark:border-white/25 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.18em] smallcaps transition-colors hover:bg-black hover:text-[rgb(244,243,238)] dark:hover:bg-white dark:hover:text-[rgb(13,12,10)] lg:flex"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span
                                    className="absolute inset-0 rounded-full pulse-soft"
                                    style={{ background: 'rgb(118, 138, 102)' }}
                                />
                            </span>
                            Available — say hello
                            <span className="font-serif-alt -mr-0.5 ml-1 text-sm italic leading-none transition-transform group-hover:translate-x-0.5">
                                ↗
                            </span>
                        </a>

                        {/* Mobile toggle */}
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setOpen((o) => !o)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            className="relative z-[110] flex items-center gap-2.5 md:hidden"
                        >
                            <span className="font-mono text-[0.62rem] tracking-[0.2em] smallcaps">
                                {open ? 'Close' : 'Index'}
                            </span>
                            <span className="relative flex h-6 w-6 flex-col items-end justify-center gap-1.5">
                                <span
                                    className={`block h-px bg-black dark:bg-white transition-all duration-300 ${open ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6'
                                        }`}
                                />
                                <span
                                    className={`block h-px bg-black dark:bg-white transition-all duration-300 ${open ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4'
                                        }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ──────────────── Mobile menu overlay ──────────────── */}
            <div
                className={`fixed inset-0 z-[90] overflow-hidden bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)] transition-all duration-500 md:hidden ${open
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                    }`}
                aria-hidden={!open}
                inert={!open}
                role="dialog"
                aria-modal={open}
                aria-label="Site navigation"
            >
                {/* Background textures */}
                <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
                <div className="absolute inset-0 dot-grid pointer-events-none" />
                <div className="absolute inset-0 grain pointer-events-none" />

                {/* Soft radial highlight */}
                <div
                    className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(180,150,110,0.18), transparent 62%)',
                    }}
                />

                {/* Vertical side label */}
                <span
                    className="vertical-rl absolute right-3 top-1/2 z-10 -translate-y-1/2 text-[0.6rem] text-black/40 dark:text-white/30 smallcaps"
                    style={{
                        opacity: open ? 1 : 0,
                        transition: `opacity 0.6s ${open ? '0.45s' : '0s'}`,
                    }}
                >
                    The Index · MMXXVI
                </span>

                {/* Corner ticks */}
                <span
                    className="corner-tick tl absolute top-24 left-5 z-10 h-3 w-3 opacity-40"
                    style={{
                        opacity: open ? 0.4 : 0,
                        transition: `opacity 0.6s ${open ? '0.4s' : '0s'}`,
                    }}
                />
                <span
                    className="corner-tick br absolute bottom-24 right-5 z-10 h-3 w-3 opacity-40"
                    style={{
                        opacity: open ? 0.4 : 0,
                        transition: `opacity 0.6s ${open ? '0.4s' : '0s'}`,
                    }}
                />

                {/* Top meta strip */}
                <div
                    className="absolute left-5 right-5 top-20 z-10 flex items-center justify-between gap-3 font-mono text-[0.58rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps sm:left-6 sm:right-6"
                    style={{
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(-10px)',
                        transition: `opacity 0.6s ${open ? '0.3s' : '0s'}, transform 0.6s ${open ? '0.3s' : '0s'}`,
                    }}
                >
                    <span className="flex items-center gap-3">
                        <span className="block h-px w-5 bg-black/30 dark:bg-white/20" />
                        Menu / 007 Sections
                    </span>
                    <span className="flex items-center gap-2">
                        <span
                            className="inline-block h-1 w-1 rounded-full pulse-soft"
                            style={{ background: 'rgb(118, 138, 102)' }}
                        />
                        {time} MNL
                    </span>
                </div>

                {/* Section label */}
                <p
                    className="absolute left-5 right-5 top-32 z-10 flex items-center gap-3 text-[0.7rem] smallcaps text-black/65 dark:text-white/45 sm:left-6 sm:right-6"
                    style={{
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0)' : 'translateY(-10px)',
                        transition: `opacity 0.6s ${open ? '0.35s' : '0s'}, transform 0.6s ${open ? '0.35s' : '0s'}`,
                    }}
                >
                    <span className="block h-px w-8 bg-black/40 dark:bg-white/25" />
                    The Index
                    <span className="font-serif-alt italic text-black/45 dark:text-white/35">— choose a chapter</span>
                </p>

                {/* Link list */}
                <ul className="flex h-full list-none flex-col items-stretch justify-center px-5 pt-16 sm:px-6">
                    {links.map((l, i) => {
                        const active = activeSection === l.href;
                        return (
                            <li
                                key={l.href}
                                className="w-full border-b border-black/15 dark:border-white/10 last:border-b-0"
                                style={{
                                    opacity: open ? 1 : 0,
                                    transform: open ? 'translateY(0)' : 'translateY(28px)',
                                    transition: `opacity 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.4 + i * 0.07}s, transform 0.6s cubic-bezier(0.2,0.7,0.2,1) ${0.4 + i * 0.07}s`,
                                }}
                            >
                                <a
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-end justify-between gap-3 py-3 sm:py-4"
                                >
                                    <div className="flex items-baseline gap-3 sm:gap-5">
                                        <span className="font-mono text-[0.65rem] tracking-[0.18em] smallcaps text-black/45 dark:text-white/30">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="flex flex-col items-start">
                                            <span
                                                className="font-black"
                                                style={{
                                                    fontSize: 'clamp(1.9rem, 9vw, 3.5rem)',
                                                    lineHeight: '0.9',
                                                    letterSpacing: '-0.035em',
                                                }}
                                            >
                                                {l.label}
                                            </span>
                                            <span className="font-serif-alt mt-1 text-[0.78rem] italic text-black/45 dark:text-white/35 sm:text-sm">
                                                — {l.description}
                                            </span>
                                        </span>
                                    </div>

                                    {active ? (
                                        <span className="flex shrink-0 items-center gap-2 pb-3 font-mono text-[0.58rem] tracking-[0.18em] smallcaps text-black/65 dark:text-white/55">
                                            <span className="block h-1.5 w-1.5 rounded-full bg-black dark:bg-white pulse-soft" />
                                            here
                                        </span>
                                    ) : (
                                        <span
                                            className="font-serif-alt pb-2 text-3xl italic text-black/30 dark:text-white/20 transition-transform duration-500 group-hover:translate-x-1.5"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer */}
                <div
                    className="absolute bottom-6 left-5 right-5 z-10 sm:left-6 sm:right-6"
                    style={{
                        opacity: open ? 1 : 0,
                        transition: `opacity 0.5s ${open ? '0.85s' : '0s'}`,
                    }}
                >
                    {/* Fin flourish */}
                    <div className="mb-3 flex items-center gap-3 font-serif-alt italic text-black/45 dark:text-white/35">
                        <span className="block h-px flex-1 bg-black/20 dark:bg-white/15" />
                        <span className="text-base sm:text-lg">— fin de l'index —</span>
                        <span className="block h-px flex-1 bg-black/20 dark:bg-white/15" />
                    </div>

                    {/* Bottom meta */}
                    <div className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps">
                        <span>Manila · Philippines</span>
                        <span>Portfolio · MMXXVI</span>
                    </div>
                </div>
            </div>
        </>
    );
};