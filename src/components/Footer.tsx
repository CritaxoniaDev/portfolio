import { useScrollReveal } from './hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';

const EMAIL = 'raphaelalcantara51@gmail.com';

const connect = [
    { label: 'Email',         value: EMAIL,                href: `mailto:${EMAIL}`                       },
    { label: 'GitHub',        value: '@CritaxoniaDev',       href: 'https://github.com/CritaxoniaDev'        },
    { label: 'LinkedIn',      value: 'in/gianraphael',     href: 'https://linkedin.com/in/gianraphael'   },
    { label: 'X / Twitter',   value: '@gianraphael',       href: 'https://x.com/gianraphael'             },
];

const sections = [
    { label: 'Home',     href: '#home'     },
    { label: 'About',    href: '#about'    },
    { label: 'Skills',   href: '#skills'   },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact',  href: '#contact'  },
];

const colophon = [
    { label: 'Year',         value: 'MMXXVI'                    },
    { label: 'Set in',       value: 'Fraunces & Instrument Serif' },
    { label: 'Built with',   value: 'React · Tailwind · Vite'   },
    { label: 'Crafted in',   value: 'Manila, Philippines'       },
];

/* ──────────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────────── */
export const Footer = () => {
    const [ref] = useScrollReveal();
    const { theme } = useTheme();
    const year = new Date().getFullYear();

    // Ink color used inside the SVG signature — flips with theme
    const ink = theme === 'dark' ? '#f0efe9' : '#0a0a0a';

    return (
        <footer
            ref={ref}
            id="contact"
            className="relative w-full overflow-hidden border-t border-black/15 dark:border-white/10 bg-[rgb(244,243,238)] dark:bg-[rgb(13,12,10)] px-5 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12 md:px-12 md:pt-28 md:pb-14"
        >
            <style>{`
                /* ── SIGNATURE — fill fades in, italic outline draws itself ── */
                @keyframes sig-fade-in {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes sig-draw {
                    0%   { stroke-dashoffset: 3200; opacity: 0.35; }
                    100% { stroke-dashoffset: 0;    opacity: 1;    }
                }
                @keyframes sig-meta-in {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 0.55; transform: translateY(0); }
                }

                .sig-fill {
                    opacity: 0;
                    animation: sig-fade-in 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.35s forwards;
                    transition: fill 0.45s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .sig-stroke {
                    stroke-dasharray: 3200;
                    stroke-dashoffset: 3200;
                    opacity: 0.35;
                    animation: sig-draw 3.4s cubic-bezier(0.45, 0.0, 0.25, 1) 0.55s forwards;
                    transition: fill 0.6s ease, stroke 0.45s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .sig-meta {
                    opacity: 0;
                    animation: sig-meta-in 0.8s ease-out 2.6s forwards;
                    transition: fill 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                                stroke 0.45s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* On hover (within the SVG group) — italic outline fills in */
                .signature-group:hover .sig-stroke {
                    fill: var(--sig-ink);
                }
                .signature-group:hover .sig-fill {
                    fill: transparent;
                    -webkit-text-stroke: 2px var(--sig-ink);
                    paint-order: stroke;
                }

                /* ── Pulse for "open for work" dot ── */
                @keyframes status-pulse {
                    0%, 100% { transform: scale(1);   opacity: 1;    }
                    50%      { transform: scale(1.6); opacity: 0.45; }
                }
                .status-dot::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 9999px;
                    background: inherit;
                    animation: status-pulse 2s ease-in-out infinite;
                }

                /* ── Back-to-top arrow micro-bounce ── */
                @keyframes top-bounce {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-3px); }
                }
                .top-link:hover .top-arrow {
                    animation: top-bounce 0.9s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .sig-fill, .sig-stroke, .sig-meta,
                    .status-dot::before, .top-link:hover .top-arrow {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        stroke-dashoffset: 0 !important;
                    }
                }
            `}</style>

            {/* Backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
            <div className="absolute inset-0 dot-grid pointer-events-none opacity-70" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Radial glows */}
            <div
                className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full pointer-events-none sm:h-[640px] sm:w-[640px]"
                style={{ background: 'radial-gradient(circle, rgba(180,150,110,0.16), transparent 64%)' }}
            />
            <div
                className="absolute -bottom-40 right-1/4 h-[380px] w-[380px] rounded-full pointer-events-none sm:h-[520px] sm:w-[520px]"
                style={{ background: 'radial-gradient(circle, rgba(150,160,140,0.14), transparent 64%)' }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                {/* ── Top section plate ── */}
                <div
                    className="mb-14 flex items-center justify-between gap-4 border-b border-black/15 dark:border-white/10 pb-3 fade-up sm:mb-20"
                    style={{ animationDelay: '0.2s' }}
                >
                    <span className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                        <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                        Vol. 005 / Footer
                    </span>
                    <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] text-black/35 dark:text-white/25 smallcaps sm:inline">
                        Signed · filed · dated
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                        <span
                            className="status-dot relative block h-1.5 w-1.5 rounded-full"
                            style={{ background: 'rgb(118, 138, 102)' }}
                        />
                        Open for work
                    </span>
                </div>

                {/* ── CTA section ── */}
                <div className="relative mb-16 sm:mb-20 md:mb-24">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                        <div className="lg:col-span-7">
                            <p
                                className="mb-5 flex items-center gap-3 font-mono text-[0.72rem] leading-none tracking-[0.18em] text-black/55 dark:text-white/40 smallcaps fade-up"
                                style={{ animationDelay: '0.3s' }}
                            >
                                <span className="block h-px w-8 shrink-0 bg-black/40 dark:bg-white/25 sm:w-10" />
                                <span>In closing — Section 005</span>
                            </p>

                            <h2
                                className="hero-title font-black fade-up"
                                style={{ animationDelay: '0.45s' }}
                            >
                                <span className="title-word">Have</span>{' '}
                                <span className="title-word">something</span>
                                <br />
                                <span className="title-word">
                                    <em>in mind</em>?
                                </span>
                            </h2>

                            <p
                                className="font-serif-alt mt-6 max-w-[34rem] text-[1.1rem] italic leading-[1.5] text-black/70 dark:text-white/55 fade-up sm:text-[1.2rem]"
                                style={{ animationDelay: '0.6s' }}
                            >
                                Commissions, collaborations, and curiosities — all welcome.
                                The inbox is open and the kettle is on.
                            </p>
                        </div>

                        <div
                            className="flex flex-col gap-5 lg:col-span-5 lg:pt-16 fade-up"
                            style={{ animationDelay: '0.75s' }}
                        >
                            <div className="flex items-center gap-3 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                                <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                                The most direct route
                            </div>

                            <a
                                href={`mailto:${EMAIL}`}
                                className="group relative inline-flex items-center justify-between gap-4 border border-black dark:border-white bg-[#0a0a0a] dark:bg-[rgb(240,239,233)] px-5 py-4 text-[rgb(244,243,238)] dark:text-[rgb(13,12,10)] shadow-[5px_5px_0_rgba(10,10,10,0.85)] dark:shadow-[5px_5px_0_rgba(240,239,233,0.25)] transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0_rgba(10,10,10,0.85)] dark:hover:shadow-[7px_7px_0_rgba(240,239,233,0.25)] focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                            >
                                <span className="flex flex-col items-start">
                                    <span className="font-mono text-[0.55rem] leading-none tracking-[0.2em] text-[rgb(244,243,238)]/55 dark:text-[rgb(13,12,10)]/55 smallcaps">
                                        Write a letter
                                    </span>
                                    <span className="font-serif-alt mt-1.5 text-[1.05rem] italic leading-none sm:text-[1.15rem]">
                                        {EMAIL}
                                    </span>
                                </span>
                                <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
                            </a>

                            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-black/45 dark:text-white/30 smallcaps">
                                Typical reply within <span className="text-black/75 dark:text-white/60">48 hours</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── BIG SVG SIGNATURE ── */}
                <div
                    className="relative my-10 sm:my-14 md:my-20 fade-up"
                    style={{ animationDelay: '0.5s', ['--sig-ink' as string]: ink }}
                >
                    {/* Top hairline + label */}
                    <div className="mb-2 flex items-center gap-3 sm:mb-4">
                        <span className="block h-px flex-1 bg-black/25 dark:bg-white/20" />
                        <span className="font-mono text-[0.58rem] tracking-[0.24em] text-black/50 dark:text-white/35 smallcaps">
                            ✦ The signature ✦
                        </span>
                        <span className="block h-px flex-1 bg-black/25 dark:bg-white/20" />
                    </div>

                    <svg
                        viewBox="0 0 1600 320"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        className="signature-group block w-full cursor-default"
                        role="img"
                        aria-label="Gian Raphael"
                    >
                        {/* Top-left annotation */}
                        <g className="sig-meta">
                            <line x1="40" y1="46" x2="130" y2="46" stroke={ink} strokeWidth="1" />
                            <text
                                x="40" y="36"
                                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
                                fontSize="13"
                                fill={ink}
                                letterSpacing="3.5"
                            >
                                SIGNATURE · VOL. V
                            </text>
                        </g>

                        {/* The name */}
                        <text
                            x="800" y="230"
                            textAnchor="middle"
                            fontSize="260"
                            style={{
                                letterSpacing: '-0.02em',
                                fontFeatureSettings: '"ss01" on, "ss02" on',
                            }}
                        >
                            <tspan
                                className="sig-fill"
                                fontFamily="'Fraunces', serif"
                                fontWeight="900"
                                fill={ink}
                            >
                                Gian
                            </tspan>
                            <tspan
                                className="sig-stroke"
                                dx="36"
                                fontFamily="'Instrument Serif', serif"
                                fontStyle="italic"
                                fill="none"
                                stroke={ink}
                                strokeWidth="2"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            >
                                Raphael
                            </tspan>
                        </text>

                        {/* Serial — centered under the name */}
                        <text
                            className="sig-meta"
                            x="800" y="288"
                            textAnchor="middle"
                            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
                            fontSize="11"
                            fill={ink}
                            letterSpacing="5"
                        >
                            — N° 005 / 005 —
                        </text>

                        {/* Bottom-right annotation */}
                        <g className="sig-meta">
                            <line x1="1470" y1="278" x2="1560" y2="278" stroke={ink} strokeWidth="1" />
                            <text
                                x="1560" y="300"
                                textAnchor="end"
                                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
                                fontSize="13"
                                fill={ink}
                                letterSpacing="3.5"
                            >
                                MANILA · MMXXVI
                            </text>
                        </g>
                    </svg>

                    {/* Bottom hairline + caption */}
                    <div className="mt-2 flex items-center gap-3 sm:mt-4">
                        <span className="block h-px flex-1 bg-black/25 dark:bg-white/20" />
                        <span className="font-serif-alt text-sm italic text-black/55 dark:text-white/40 sm:text-base">
                            — hover the signature
                        </span>
                        <span className="block h-px flex-1 bg-black/25 dark:bg-white/20" />
                    </div>
                </div>

                {/* ── THREE COLUMNS ── */}
                <div
                    className="mb-16 grid grid-cols-1 gap-10 border-t border-black/15 dark:border-white/10 pt-12 sm:mb-20 md:grid-cols-3 md:gap-10 md:pt-16 lg:gap-16 fade-up"
                    style={{ animationDelay: '0.6s' }}
                >
                    {/* Connect */}
                    <div>
                        <div className="mb-5 flex items-center gap-3 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                            <span className="block h-px w-5 bg-black/30 dark:bg-white/20" />
                            Connect · I
                        </div>
                        <ul className="space-y-3">
                            {connect.map((item) => (
                                <li key={item.label} className="flex items-baseline gap-4">
                                    <span className="font-mono text-[0.58rem] tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps w-[60px] shrink-0">
                                        — {item.label}
                                    </span>
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="nav-link font-serif-alt text-[1.05rem] italic leading-tight text-black/85 dark:text-white/65 hover:text-black dark:hover:text-white sm:text-[1.15rem]"
                                    >
                                        {item.value}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sections */}
                    <div>
                        <div className="mb-5 flex items-center gap-3 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                            <span className="block h-px w-5 bg-black/30 dark:bg-white/20" />
                            The Chapters · II
                        </div>
                        <ul className="space-y-3">
                            {sections.map((item, i) => (
                                <li key={item.label} className="flex items-baseline gap-4">
                                    <span className="font-mono text-[0.58rem] tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps w-[60px] shrink-0">
                                        {String(i + 1).padStart(3, '0')}
                                    </span>
                                    <a
                                        href={item.href}
                                        className="nav-link font-serif-alt text-[1.05rem] italic leading-tight text-black/85 dark:text-white/65 hover:text-black dark:hover:text-white sm:text-[1.15rem]"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colophon */}
                    <div>
                        <div className="mb-5 flex items-center gap-3 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                            <span className="block h-px w-5 bg-black/30 dark:bg-white/20" />
                            Colophon · III
                        </div>
                        <dl className="space-y-3">
                            {colophon.map((item) => (
                                <div key={item.label} className="flex items-baseline gap-4">
                                    <dt className="font-mono text-[0.58rem] tracking-[0.18em] text-black/40 dark:text-white/25 smallcaps w-[60px] shrink-0">
                                        — {item.label}
                                    </dt>
                                    <dd className="font-serif-alt text-[1.05rem] italic leading-tight text-black/75 dark:text-white/55 sm:text-[1.15rem]">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* ── Closing flourish ── */}
                <div
                    className="mb-8 flex items-center justify-center gap-4 fade-up sm:mb-10"
                    style={{ animationDelay: '0.85s' }}
                >
                    <span className="block h-px w-16 bg-black/20 dark:bg-white/15 sm:w-24" />
                    <span className="font-serif-alt text-base italic text-black/45 dark:text-white/30 sm:text-lg">
                        — fin du catalogue —
                    </span>
                    <span className="block h-px w-16 bg-black/20 dark:bg-white/15 sm:w-24" />
                </div>

                {/* ── BOTTOM META STRIP ── */}
                <div
                    className="flex flex-col gap-4 border-t border-black/15 dark:border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between fade-up"
                    style={{ animationDelay: '0.95s' }}
                >
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6rem] tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                        <span>© {year} — Gian Raphael</span>
                        <span className="block h-3 w-px bg-black/20 dark:bg-white/15" aria-hidden="true" />
                        <span>All rights reserved</span>
                        <span className="hidden h-3 w-px bg-black/20 dark:bg-white/15 sm:block" aria-hidden="true" />
                        <span className="hidden sm:inline">Manila · Philippines</span>
                    </div>

                    <a
                        href="#home"
                        className="top-link group inline-flex items-center gap-3 self-start font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/55 dark:text-white/40 smallcaps transition-colors hover:text-black dark:hover:text-white sm:self-auto"
                    >
                        Back to top
                        <span className="relative block h-px w-10 overflow-hidden bg-black/25 dark:bg-white/20">
                            <span className="absolute inset-0 origin-right scale-x-0 bg-black dark:bg-white transition-transform duration-500 group-hover:scale-x-100" />
                        </span>
                        <span className="top-arrow inline-block">↑</span>
                    </a>
                </div>

                {/* Page footer corner ticks for that final archival touch */}
                <span className="corner-tick bl absolute bottom-3 left-3 block h-3 w-3" />
                <span className="corner-tick br absolute bottom-3 right-3 block h-3 w-3" />
            </div>
        </footer>
    );
};