import { useScrollReveal } from './hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const Hero = () => {
    const [ref] = useScrollReveal();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            ref={ref}
            className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-24 sm:px-6 sm:py-28 md:px-12 md:py-32"
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

            {/* Top meta row */}
            <div
                className="absolute mt-10 left-5 right-5 top-6 z-10 flex items-center justify-between gap-4 text-[0.68rem] leading-none text-black/45 dark:text-white/35 smallcaps fade-up sm:left-6 sm:right-6 sm:top-8 md:left-12 md:right-12 md:top-10"
                style={{ animationDelay: '0.35s' }}
            >
                <span className="min-w-0 truncate font-mono tracking-[0.12em]">
                    N 40.7128 / W 74.0060
                </span>
                <span className="hidden shrink-0 sm:inline">Portfolio / Vol. 01</span>
                <span className="hidden shrink-0 font-mono tracking-[0.12em] xs:inline">
                    MMXXIV
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

            {/* Vertical year label */}
            <span
                className="vertical-rl absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[0.68rem] text-black/45 dark:text-white/30 smallcaps fade-up sm:block md:right-6"
                style={{ animationDelay: '0.5s' }}
            >
                Est. 2019 - Independent Practice
            </span>

            {/* Ghost background number */}
            <div className="ghost-number absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none pointer-events-none">
                01
            </div>

            {/* Floating italic accent */}
            <div
                className="absolute right-12 top-28 hidden items-center gap-3 fade-up xl:flex"
                style={{ animationDelay: '0.7s' }}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="opacity-40"
                    aria-hidden="true"
                >
                    <path
                        d="M5 35 Q 20 5, 35 35"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2 3"
                    />
                    <circle cx="35" cy="35" r="2" fill="currentColor" />
                </svg>
                <span className="font-serif-alt text-2xl italic text-black/60 dark:text-white/45">
                    a studio of one
                </span>
            </div>

            {/* Main content with editorial image plate */}
            <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">

                {/* ── Left: Editorial image plate ── */}
                <div
                    className="order-1 mx-auto w-full max-w-[420px] fade-up lg:col-span-5 lg:mx-0 lg:max-w-none xl:col-span-4"
                    style={{ animationDelay: '0.6s' }}
                >
                    {/* Plate label row */}
                    <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 dark:text-white/30 smallcaps">
                        <span className="flex items-center gap-3">
                            <span className="block h-px w-6 bg-black/30 dark:bg-white/20" />
                            Plate 001 / IV
                        </span>
                        <span className="text-black/35 dark:text-white/25">Studio · NY</span>
                    </div>

                    {/* Stacked frame for paper-stack depth */}
                    <div className="relative">
                        <div className="absolute inset-0 translate-x-[12px] translate-y-[12px] border border-black/10 dark:border-white/10" aria-hidden="true" />
                        <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] border border-black/15 dark:border-white/10 bg-black/[0.02]" aria-hidden="true" />

                        {/* Main frame */}
                        <div className="relative border border-black/30 dark:border-white/20 bg-[rgb(240,238,230)] dark:bg-[rgb(28,26,22)] p-3">
                            <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-black dark:border-white/50" />
                            <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-black dark:border-white/50" />
                            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-black dark:border-white/50" />
                            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-black dark:border-white/50" />

                            <img
                                src="/images/profile-pic.jpg"
                                alt="Portrait"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[rgba(180,160,130,0.22)] via-[rgba(140,135,120,0.10)] to-[rgba(60,55,45,0.18)]">
                                <div
                                    className="pointer-events-none absolute inset-0"
                                    style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.14))' }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="mt-5 flex items-start justify-between gap-6">
                        <p className="font-serif-alt max-w-[18rem] text-[1.05rem] italic leading-[1.35] text-black/60 dark:text-white/45">
                            Fig. 01 — the maker,<br />
                            at work in the studio.
                        </p>
                        <div className="shrink-0 text-right">
                            <div className="font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/40 dark:text-white/30 smallcaps">
                                Shot on 35mm
                            </div>
                            <div className="font-serif-alt mt-1.5 text-base italic text-black/40 dark:text-white/30">
                                — gra
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right: Existing text content ── */}
                <div className="order-2 lg:col-span-7 xl:col-span-8">
                    <p
                        className="mb-5 flex max-w-full items-center gap-3 text-[0.72rem] leading-none text-black/65 dark:text-white/45 smallcaps fade-up sm:mb-6 sm:text-[0.76rem]"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="block h-px w-8 shrink-0 bg-black/40 dark:bg-white/25 sm:w-10" />
                        <span className="min-w-0">Software Engineering Student</span>
                        <span className="hidden shrink-0 font-mono text-black/40 dark:text-white/25 xs:inline">
                            - 001
                        </span>
                    </p>

                    <h1 className="hero-title font-black fade-up" style={{ animationDelay: '0.55s' }}>
                        <span className="title-word">Crafting</span>
                        <br />
                        <span className="title-word">
                            <em>digital</em>
                        </span>
                        <br />
                        <span className="title-word">
                            experiences
                            <span className="hero-mark align-top font-normal italic text-black/40 dark:text-white/25">(R)</span>
                        </span>
                    </h1>

                    <div
                        className="mt-7 grid grid-cols-1 gap-6 fade-up sm:mt-9 sm:gap-8 md:mt-12 md:grid-cols-12 md:items-end lg:mt-14"
                        style={{ animationDelay: '0.75s' }}
                    >
                        {/* Description + theme toggle */}
                        <div className="md:col-span-5 lg:col-span-5">
                            <p className="font-serif-alt max-w-[34rem] text-[1.15rem] italic leading-[1.55] text-black/75 dark:text-white/55 sm:text-[1.28rem] md:text-[1.38rem]">
                                Passionate about creating elegant solutions through code and design. I focus on
                                building clean, user-friendly experiences that solve real problems.
                            </p>

                            {/* ── Theme toggle ── */}
                            <button
                                onClick={toggleTheme}
                                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                                className="theme-toggle mt-8 group"
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
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 border-t border-black/15 dark:border-white/10 pt-4 sm:gap-6 sm:pt-5 md:col-span-4 md:col-start-7 lg:col-start-7">
                            <div>
                                <div className="stat-number text-3xl font-black leading-none sm:text-4xl">
                                    2<span className="text-black/30 dark:text-white/20">+</span>
                                </div>
                                <div className="mt-2 text-[0.68rem] leading-tight text-black/55 dark:text-white/35 smallcaps">
                                    Projects Created
                                </div>
                            </div>
                            <div>
                                <div className="stat-number text-3xl font-black leading-none sm:text-4xl">
                                    2
                                </div>
                                <div className="mt-2 text-[0.68rem] leading-tight text-black/55 dark:text-white/35 smallcaps">
                                    Awards / Recognitions
                                </div>
                            </div>
                        </div>

                        {/* Scroll indicator */}
                        <div className="flex items-end md:col-span-2 md:col-start-11 md:justify-end">
                            <a
                                href="#work"
                                className="group inline-flex items-center gap-3 text-[0.72rem] leading-none smallcaps sm:gap-4"
                            >
                                <div className="relative h-px w-12 overflow-hidden bg-black/20 dark:bg-white/15 sm:w-[60px]">
                                    <div className="absolute inset-0 bg-black dark:bg-white scroll-line" />
                                </div>
                                <span className="transition-transform group-hover:translate-x-1">Scroll ↓</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom meta */}
            <div
                className="absolute bottom-5 left-5 hidden font-mono text-[0.64rem] text-black/40 dark:text-white/25 smallcaps fade-up sm:bottom-6 sm:left-6 sm:block md:left-12"
                style={{ animationDelay: '1s' }}
            >
                [ 001 / 005 ] - Hero
            </div>
        </section>
    );
};