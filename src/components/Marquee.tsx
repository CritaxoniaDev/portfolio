import { useScrollReveal } from './hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';

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
    const { theme } = useTheme();

    // In light mode the marquee is inverted (dark bg).
    // In dark mode the marquee is its original light bg.
    const inv = theme === 'light';

    // Shorthand token helpers
    const bg = inv ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    const border = inv ? 'rgba(240,239,233,0.12)' : 'rgba(10,10,10,0.15)';
    const metaBdr = inv ? 'rgba(240,239,233,0.10)' : 'rgba(10,10,10,0.10)';
    const metaTxt = inv ? 'rgba(240,239,233,0.35)' : 'rgba(10,10,10,0.35)';
    const metaTxt2 = inv ? 'rgba(240,239,233,0.45)' : 'rgba(10,10,10,0.45)';
    const metaLine = inv ? 'rgba(240,239,233,0.30)' : 'rgba(10,10,10,0.30)';
    const tickerTxt = inv ? 'rgba(240,239,233,0.60)' : 'rgba(10,10,10,0.60)';
    const tickerDot = inv ? 'rgba(240,239,233,0.25)' : 'rgba(10,10,10,0.25)';

    // Tilted band is always the opposite of the section
    const bandBg = inv ? 'rgb(244, 243, 238)' : 'rgb(13, 12, 10)';
    const bandBdr = inv ? 'rgb(244, 243, 238)' : '#0a0a0a';
    const bandTxt = inv ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    const bandCorner = inv ? 'rgba(10,10,10,0.4)' : 'rgba(244,243,238,0.4)';

    // Headline items
    const hlBold = inv ? 'rgba(240,239,233,1)' : 'rgba(10,10,10,1)';
    const hlItalic = inv ? 'rgba(240,239,233,0.85)' : 'rgba(10,10,10,0.85)';
    const hlStar = inv ? 'rgba(240,239,233,0.25)' : 'rgba(10,10,10,0.25)';

    const topItems = [
        'Available for select projects',
        'Based in Philippines',
        'Est. 2026',
        'Software Engineering Student',
        'Currently shipping',
        'Open to collaborations',
    ];

    const headlineItems: { text: string; italic: boolean }[] = [
        { text: 'Crafting', italic: false },
        { text: 'digital', italic: true },
        { text: 'experiences', italic: false },
        { text: 'with', italic: true },
        { text: 'intent', italic: false },
        { text: '&', italic: true },
        { text: 'care', italic: false },
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
            aria-label="Interlude — Marquee"
            className="relative w-full overflow-hidden border-y"
            style={{
                background: bg,
                borderColor: border,
                transition: 'background 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
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
            <div
                className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-6 md:px-12 py-3 border-b"
                style={{ borderColor: metaBdr, transition: 'border-color 0.45s cubic-bezier(0.4,0,0.2,1)' }}
            >
                <span
                    className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] smallcaps"
                    style={{ color: metaTxt2 }}
                >
                    <span className="block h-px w-6" style={{ background: metaLine }} />
                    Vol. 003 / Marquee
                </span>
                <span
                    className="hidden font-mono text-[0.62rem] tracking-[0.18em] smallcaps sm:inline"
                    style={{ color: metaTxt }}
                >
                    Continuous · Loop
                </span>
                <span
                    className="font-mono text-[0.62rem] tracking-[0.18em] smallcaps"
                    style={{ color: metaTxt }}
                >
                    In Motion
                </span>
            </div>

            {/* ── Top thin ticker (slow, left) ── */}
            <div
                className="marquee-mask marquee-pause border-b py-3 sm:py-4"
                style={{ borderColor: metaBdr }}
            >
                <Track dir="left" speed="55s">
                    {topItems.map((it, i) => (
                        <span
                            key={i}
                            className="flex items-center whitespace-nowrap pr-10 font-mono text-[0.7rem] smallcaps sm:pr-14 sm:text-[0.75rem]"
                            style={{ color: tickerTxt }}
                        >
                            <span className="mr-10 sm:mr-14" style={{ color: tickerDot }}>•</span>
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
                                className={`leading-none ${it.italic ? 'font-serif-alt font-normal italic' : 'font-black'}`}
                                style={{
                                    fontSize: 'clamp(3rem, 11vw, 9rem)',
                                    letterSpacing: '-0.01em',
                                    color: it.italic ? hlItalic : hlBold,
                                    transition: 'color 0.45s cubic-bezier(0.4,0,0.2,1)',
                                }}
                            >
                                {it.text}
                            </span>
                            <span
                                className="ml-8 sm:ml-12 md:ml-16"
                                style={{
                                    fontSize: 'clamp(1.4rem, 5vw, 4rem)',
                                    color: hlStar,
                                    transition: 'color 0.45s cubic-bezier(0.4,0,0.2,1)',
                                }}
                            >
                                ✦
                            </span>
                        </span>
                    ))}
                </Track>
            </div>

            {/* ── Inverted tilted band (fast, left) ── */}
            <div
                className="relative -mx-16 my-2 -rotate-[1.5deg] border-y sm:my-4 md:-mx-24"
                style={{
                    background: bandBg,
                    borderColor: bandBdr,
                    transition: 'background 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.45s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                <div className="marquee-mask marquee-pause py-4 sm:py-6">
                    <Track dir="left" speed="32s">
                        {tiltedItems.map((it, i) => (
                            <span
                                key={i}
                                className="flex items-center whitespace-nowrap pr-8 sm:pr-12"
                                style={{ color: bandTxt, transition: 'color 0.45s cubic-bezier(0.4,0,0.2,1)' }}
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

                <div className="absolute inset-0 grain pointer-events-none opacity-30 mix-blend-screen" />

                <span
                    className="absolute top-1 left-3 font-mono text-[0.55rem] tracking-[0.2em] smallcaps"
                    style={{ color: bandCorner }}
                >
                    A
                </span>
                <span
                    className="absolute bottom-1 right-3 font-mono text-[0.55rem] tracking-[0.2em] smallcaps"
                    style={{ color: bandCorner }}
                >
                    Z
                </span>
            </div>

            {/* ── Bottom thin ticker (slow, right) ── */}
            <div
                className="marquee-mask marquee-pause border-t py-3 sm:py-4"
                style={{ borderColor: metaBdr }}
            >
                <Track dir="right" speed="60s">
                    {bottomItems.map((it, i) => (
                        <span
                            key={i}
                            className="flex items-center whitespace-nowrap pr-10 font-mono text-[0.7rem] smallcaps sm:pr-14 sm:text-[0.75rem]"
                            style={{ color: tickerTxt }}
                        >
                            <span className="mr-10 sm:mr-14" style={{ color: tickerDot }}>/</span>
                            {it}
                        </span>
                    ))}
                </Track>
            </div>

            {/* ── Bottom meta ── */}
            <div
                className="relative z-10 flex items-center justify-between gap-4 border-t px-5 py-3 sm:px-6 md:px-12"
                style={{ borderColor: metaBdr }}
            >
                <span
                    className="font-mono text-[0.62rem] tracking-[0.18em] smallcaps"
                    style={{ color: metaTxt }}
                >
                    [ 003 / 005 ] - Marquee
                </span>
                <span
                    className="hidden font-mono text-[0.62rem] tracking-[0.18em] smallcaps sm:inline"
                    style={{ color: metaTxt }}
                >
                    No fixed direction
                </span>
                <span
                    className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] smallcaps"
                    style={{ color: metaTxt2 }}
                >
                    Always In Motion
                    <span className="block h-px w-6" style={{ background: metaLine }} />
                </span>
            </div>
        </section>
    );
};