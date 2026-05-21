import { useScrollReveal } from './hooks/useScrollReveal';

type TrackProps = {
    children: React.ReactNode;
    dir?: 'left' | 'right';
    speed?: string;
};

const Track = ({ children, dir = 'left', speed = '40s' }: TrackProps) => (
    <div
        className="marquee-track"
        style={{ animation: `marquee-${dir} ${speed} linear infinite` }}
    >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
    </div>
);

export const Marquee = () => {
    const [ref] = useScrollReveal();

    const topItems = [
        'Available for select projects',
        'Based in Philippines',
        'Est. 2026',
        'Software Engineering Student',
        'Currently shipping',
        'Open to collaborations',
    ];

    const headlineItems: { text: string; italic: boolean }[] = [
        { text: 'Crafting',    italic: false },
        { text: 'digital',     italic: true  },
        { text: 'experiences', italic: false },
        { text: 'with',        italic: true  },
        { text: 'intent',      italic: false },
        { text: '&',           italic: true  },
        { text: 'care',        italic: false },
    ];

    const tiltedItems = ['Design', 'Develop', 'Deploy', 'Iterate', 'Refine', 'Ship'];

    const bottomItems = [
        '20+ Educational projects',
        '12 awards',
        '∞ curiosity',
        'Coffee-powered',
        'Always learning',
        'MMXXIV',
    ];

    return (
        <section
            ref={ref}
            className="relative w-full overflow-hidden border-y border-black/15 bg-[rgb(244,243,238)]"
        >
            <style>{`
                @keyframes marquee-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
                @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); }   }

                .marquee-track {
                    display: flex;
                    width: max-content;
                    will-change: transform;
                }

                .marquee-mask {
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                            mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }

                @media (hover: hover) {
                    .marquee-pause:hover .marquee-track {
                        animation-play-state: paused;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .marquee-track {
                        animation: none !important;
                        transform: translateX(-10%) !important;
                    }
                }
            `}</style>

            {/* Subtle background textures */}
            <div className="absolute inset-0 dot-grid pointer-events-none opacity-30" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* ── Section plate ── */}
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-black/10 px-5 sm:px-6 md:px-12 py-3">
                <span className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 smallcaps">
                    <span className="block h-px w-6 bg-black/30" />
                    Vol. 003 / Marquee
                </span>
                <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps sm:inline">
                    Continuous · Loop
                </span>
                <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps">
                    In Motion
                </span>
            </div>

            {/* ── Top thin ticker (slow, left) ── */}
            <div className="marquee-mask marquee-pause border-b border-black/10 py-3 sm:py-4">
                <Track dir="left" speed="55s">
                    {topItems.map((it, i) => (
                        <span
                            key={i}
                            className="flex items-center whitespace-nowrap pr-10 font-mono text-[0.7rem] text-black/60 smallcaps sm:pr-14 sm:text-[0.75rem]"
                        >
                            <span className="mr-10 text-black/25 sm:mr-14">•</span>
                            {it}
                        </span>
                    ))}
                </Track>
            </div>

            {/* ── HEADLINE band (medium, right) ── */}
            <div className="marquee-mask marquee-pause py-10 sm:py-14 md:py-20">
                <Track dir="right" speed="42s">
                    {headlineItems.map((it, i) => (
                        <span
                            key={i}
                            className="flex items-center whitespace-nowrap pr-8 sm:pr-12 md:pr-16"
                        >
                            <span
                                className={`leading-none ${
                                    it.italic
                                        ? 'font-serif-alt font-normal italic text-black/85'
                                        : 'font-black text-black'
                                }`}
                                style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', letterSpacing: '-0.01em' }}
                            >
                                {it.text}
                            </span>
                            <span
                                className="ml-8 text-black/25 sm:ml-12 md:ml-16"
                                style={{ fontSize: 'clamp(1.4rem, 5vw, 4rem)' }}
                            >
                                ✦
                            </span>
                        </span>
                    ))}
                </Track>
            </div>

            {/* ── Inverted tilted band (fast, left) ── */}
            <div className="relative -mx-16 my-2 -rotate-[1.5deg] border-y border-black bg-[#0a0a0a] sm:my-4 md:-mx-24">
                <div className="marquee-mask marquee-pause py-4 sm:py-6">
                    <Track dir="left" speed="32s">
                        {tiltedItems.map((it, i) => (
                            <span
                                key={i}
                                className="flex items-center whitespace-nowrap pr-8 sm:pr-12"
                                style={{ color: 'rgb(244, 243, 238)' }}
                            >
                                <span
                                    className="font-black uppercase leading-none"
                                    style={{
                                        fontSize: 'clamp(1.5rem, 5vw, 3.25rem)',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {it}
                                </span>
                                <span
                                    className="ml-8 opacity-35 sm:ml-12"
                                    style={{ fontSize: 'clamp(0.9rem, 2.6vw, 1.8rem)' }}
                                >
                                    ◆
                                </span>
                            </span>
                        ))}
                    </Track>
                </div>

                {/* Subtle grain on the dark band */}
                <div className="absolute inset-0 grain pointer-events-none opacity-30 mix-blend-screen" />

                {/* Tiny corner markers on the dark band */}
                <span className="absolute top-1 left-3 font-mono text-[0.55rem] tracking-[0.2em] smallcaps" style={{ color: 'rgba(244,243,238,0.4)' }}>
                    A
                </span>
                <span className="absolute bottom-1 right-3 font-mono text-[0.55rem] tracking-[0.2em] smallcaps" style={{ color: 'rgba(244,243,238,0.4)' }}>
                    Z
                </span>
            </div>

            {/* ── Bottom thin ticker (slow, right) ── */}
            <div className="marquee-mask marquee-pause border-t border-black/10 py-3 sm:py-4">
                <Track dir="right" speed="60s">
                    {bottomItems.map((it, i) => (
                        <span
                            key={i}
                            className="flex items-center whitespace-nowrap pr-10 font-mono text-[0.7rem] text-black/60 smallcaps sm:pr-14 sm:text-[0.75rem]"
                        >
                            <span className="mr-10 text-black/25 sm:mr-14">/</span>
                            {it}
                        </span>
                    ))}
                </Track>
            </div>

            {/* ── Bottom meta ── */}
            <div className="relative z-10 flex items-center justify-between gap-4 border-t border-black/10 px-5 py-3 sm:px-6 md:px-12">
                <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps">
                    [ 003 / 005 ] - Marquee
                </span>
                <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps sm:inline">
                    No fixed direction
                </span>
                <span className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 smallcaps">
                    Always In Motion
                    <span className="block h-px w-6 bg-black/30" />
                </span>
            </div>
        </section>
    );
};