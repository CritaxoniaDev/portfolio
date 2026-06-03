import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';
import styles from './transit.module.css';

export const Transit = () => {
    const [ref] = useScrollReveal();
    const { theme } = useTheme();

    // In light mode the transit is inverted (dark bg).
    // In dark mode the transit is its original light bg.
    const inv = theme === 'light';

    // Shorthand token helpers
    const bg = inv ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    const border = inv ? 'rgba(240,239,233,0.15)' : 'rgba(10,10,10,0.15)';
    const metaBdr = inv ? 'rgba(240,239,233,0.10)' : 'rgba(10,10,10,0.10)';
    const metaTxt = inv ? 'rgba(240,239,233,0.35)' : 'rgba(10,10,10,0.35)';
    const metaTxt2 = inv ? 'rgba(240,239,233,0.45)' : 'rgba(10,10,10,0.45)';
    const metaLine = inv ? 'rgba(240,239,233,0.30)' : 'rgba(10,10,10,0.30)';
    const trackLine = inv ? 'rgba(240,239,233,0.32)' : 'rgba(10,10,10,0.32)';
    const trackDot = inv ? 'rgba(240,239,233,0.55)' : 'rgba(10,10,10,0.55)';
    const sparkCol = inv ? 'rgba(240,239,233,0.5)' : 'rgba(10,10,10,0.5)';
    const sparkCol2 = inv ? 'rgba(240,239,233,0.55)' : 'rgba(10,10,10,0.55)';
    const sparkCol3 = inv ? 'rgba(240,239,233,0.45)' : 'rgba(10,10,10,0.45)';
    const sparkCol4 = inv ? 'rgba(240,239,233,0.4)' : 'rgba(10,10,10,0.4)';
    const revealTxt = inv ? 'rgba(240,239,233,0.55)' : 'rgba(10,10,10,0.55)';
    const revealDot = inv ? 'rgba(240,239,233,0.30)' : 'rgba(10,10,10,0.30)';
    const revealDash = inv ? 'rgba(240,239,233,0.40)' : 'rgba(10,10,10,0.40)';
    const revealItalic = inv ? 'rgba(240,239,233,0.85)' : 'rgba(10,10,10,0.85)';
    const faintBg = inv ? 'rgba(240,239,233,0.07)' : 'rgba(10,10,10,0.07)';
    const faintBg2 = inv ? 'rgba(240,239,233,0.06)' : 'rgba(10,10,10,0.06)';
    const signalLight = 'rgb(118, 138, 102)';
    const lightCard = inv ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    const signalBg = inv ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    const svgStroke = inv ? 'rgb(240, 239, 233)' : 'rgb(244, 243, 238)';
    const svgFill = inv ? 'rgb(13, 12, 10)' : 'rgb(10, 10, 10)';
    const boxBorder = inv ? 'rgba(240,239,233,0.70)' : 'rgba(10,10,10,0.70)';
    const boxText = inv ? 'rgba(240,239,233,0.50)' : 'rgba(10,10,10,0.50)';
    const boxItalic = inv ? 'rgb(240, 239, 233)' : 'rgb(10, 10, 10)';

    // Faint background marquee — sits behind the train
    const transitItems = [
        'Now arriving',
        'Platform 002',
        'All aboard',
        'Next stop — projects',
        'Mind the gap',
        'Service on schedule',
    ];

    return (
        <section
            ref={ref}
            aria-label="Interlude — Transit"
            className="relative w-full overflow-hidden border-y"
            style={{
                background: bg,
                borderColor: border,
                transition: 'background 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
        >
            {/* Backgrounds */}
            <div className="absolute inset-0 dot-grid pointer-events-none opacity-25" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* ── Top section plate ── */}
            <div
                className="relative z-10 flex items-center justify-between gap-4 border-b px-5 py-3 sm:px-6 md:px-12"
                style={{ borderColor: metaBdr }}
            >
                <span
                    className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] smallcaps"
                    style={{ color: metaTxt2 }}
                >
                    <span className="block h-px w-6" style={{ background: metaLine }} />
                    Interlude · Transit
                </span>
                <span
                    className="hidden font-mono text-[0.62rem] tracking-[0.18em] smallcaps sm:inline"
                    style={{ color: metaTxt }}
                >
                    Skills &nbsp;→&nbsp; Projects
                </span>
                <span
                    className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] smallcaps"
                    style={{ color: metaTxt2 }}
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span
                            className="absolute inset-0 rounded-full pulse-soft"
                            style={{ background: signalLight }}
                        />
                    </span>
                    Service Approaching
                </span>
            </div>

            {/* ── Main station band ── */}
            <div className="relative h-[210px] sm:h-[240px] md:h-[260px]">
                {/* Faint marquee text behind everything */}
                <div className={`${styles.transitMask} absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden`}>
                    <div className={`${styles.transitTrack}`}>
                        {[0, 1].map(loop => (
                            <div key={loop} className="flex shrink-0" aria-hidden={loop === 1}>
                                {transitItems.map((it, i) => (
                                    <span
                                        key={`${loop}-${i}`}
                                        className="flex items-center whitespace-nowrap pr-10 sm:pr-14"
                                    >
                                        <span
                                            className="font-serif-alt italic leading-none"
                                            style={{ fontSize: 'clamp(3rem, 11vw, 8rem)', letterSpacing: '-0.01em', color: faintBg }}
                                        >
                                            {it}
                                        </span>
                                        <span
                                            className="ml-8 sm:ml-12"
                                            style={{ fontSize: 'clamp(1.4rem, 5vw, 4rem)', color: faintBg2 }}
                                        >
                                            ✦
                                        </span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Distant platform lights / sparks */}
                <span className={`${styles.sparkA} absolute top-[22%] left-[11%] block h-1 w-1 rounded-full`} style={{ background: sparkCol }} />
                <span className={`${styles.sparkB} absolute top-[30%] left-[27%] block h-[3px] w-[3px] rounded-full`} style={{ background: sparkCol2 }} />
                <span className={`${styles.sparkC} absolute bottom-[28%] left-[41%] block h-1 w-1 rounded-full`} style={{ background: sparkCol3 }} />
                <span className={`${styles.sparkD} absolute top-[18%] right-[22%] block h-[3px] w-[3px] rounded-full`} style={{ background: sparkCol2 }} />
                <span className={`${styles.sparkE} absolute bottom-[24%] right-[12%] block h-1 w-1 rounded-full`} style={{ background: sparkCol3 }} />
                <span className={`${styles.sparkB} absolute top-[40%] right-[38%] block h-[2px] w-[2px] rounded-full`} style={{ background: sparkCol4 }} />

                {/* ── The Track — twin rails + ties ── */}
                <div
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-1/2 translate-y-[14px]"
                >
                    <div
                        className="h-[6px] w-full"
                        style={{
                            backgroundImage:
                                `repeating-linear-gradient(to right, ${trackLine} 0 2px, transparent 2px 14px)`,
                        }}
                    />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: trackDot }} />
                    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: trackDot }} />
                </div>

                {/* ── Station ── */}
                <div className="absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        {/* Signal pole + lamp */}
                        <div className="absolute -left-[60px] bottom-[10px] sm:-left-[78px]">
                            <span className="block h-[58px] w-px" style={{ background: trackDot }} />
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 block h-2.5 w-2.5 rounded-full border" style={{ borderColor: trackDot, background: signalBg }}>
                                <span
                                    className={`${styles.signalLight} absolute inset-[2px] block rounded-full`}
                                    style={{ background: signalLight }}
                                />
                            </span>
                            <span className="absolute top-3 left-1/2 block h-px w-3" style={{ background: trackDot }} />
                        </div>

                        {/* Station signage */}
                        <div className="absolute -top-[58px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                            <div style={{ borderColor: boxBorder, background: lightCard, boxShadow: `2px 2px 0 ${inv ? 'rgba(240,239,233,0.85)' : 'rgba(10,10,10,0.85)'}` }} className="border px-3 py-1">
                                <div className="font-mono text-[0.55rem] leading-none tracking-[0.22em] smallcaps" style={{ color: boxText }}>
                                    ↓ Station ↓
                                </div>
                                <div className="font-serif-alt mt-0.5 text-[0.95rem] italic leading-none sm:text-[1.05rem]" style={{ color: boxItalic }}>
                                    Platform 002
                                </div>
                            </div>
                            <span className="absolute left-1/2 top-full block h-3 w-px -translate-x-1/2" style={{ background: revealDash }} />
                        </div>

                        {/* Platform shelf */}
                        <div className="relative h-[6px] w-[180px] border-t sm:w-[220px]" style={{ borderColor: trackDot, background: faintBg2 }}>
                            <span className="corner-tick tl absolute -top-1 -left-1 block h-2 w-2" />
                            <span className="corner-tick tr absolute -top-1 -right-1 block h-2 w-2" />
                        </div>
                    </div>
                </div>

                {/* ── The Train (locomotive + 2 carts) ── */}
                <div
                    className={`${styles.trainJourney} absolute left-0 top-1/2 z-10`}
                    style={{ willChange: 'transform' }}
                >
                    {/* Smoke puffs above the smokestack */}
                    <div className="pointer-events-none absolute" style={{ left: '50px', top: '-18px' }}>
                        <span className={`${styles.smoke1} absolute block h-2.5 w-2.5 rounded-full`} style={{ background: 'rgba(10,10,10,0.4)' }} />
                        <span className={`${styles.smoke2} absolute block h-2 w-2 rounded-full`} style={{ background: 'rgba(10,10,10,0.35)' }} />
                        <span className={`${styles.smoke3} absolute block h-3 w-3 rounded-full`} style={{ background: 'rgba(10,10,10,0.30)' }} />
                    </div>

                    {/* ── Carts — hang off the LEFT of the locomotive ──
                        Order in flex (left → right): passenger car, then tender (closest to engine). */}
                    <div
                        className="pointer-events-none absolute top-0 flex items-end"
                        style={{ right: '100%', gap: '2px' }}
                    >
                        {/* ── Passenger car ── */}
                        <svg
                            width="90"
                            height="52"
                            viewBox="0 0 90 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="block drop-shadow-[2px_2px_0_rgba(10,10,10,0.08)]"
                            aria-hidden="true"
                        >
                            {/* Arched roof */}
                            <path d="M4 18 Q45 13 86 18 L86 22 L4 22 Z" fill={svgFill} />
                            <line x1="6" y1="19.5" x2="84" y2="19.5" stroke={svgStroke} strokeWidth="0.4" opacity="0.3" />
                            {/* Body */}
                            <rect x="4" y="22" width="82" height="16" fill={svgFill} />
                            {/* Windows — uniform row */}
                            <rect x="9" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="19" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="29" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="39" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="49" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="59" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="69" y="25" width="6" height="6" fill={svgStroke} />
                            <rect x="79" y="25" width="6" height="6" fill={svgStroke} />
                            {/* Side trim below windows */}
                            <line x1="6" y1="34" x2="84" y2="34" stroke={svgStroke} strokeWidth="0.4" opacity="0.35" />
                            {/* Bottom edge of body */}
                            <rect x="2" y="38" width="86" height="2" fill={svgFill} />
                            {/* Chassis rod — same y as locomotive rod */}
                            <rect x="6" y="41.5" width="78" height="1.5" fill={svgFill} opacity="0.55" />
                            {/* Couplings */}
                            <rect x="0" y="32" width="4" height="2" fill={svgFill} />
                            <rect x="86" y="32" width="4" height="2" fill={svgFill} />
                        </svg>

                        {/* ── Coal tender (closest to locomotive) ── */}
                        <svg
                            width="60"
                            height="52"
                            viewBox="0 0 60 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="block drop-shadow-[2px_2px_0_rgba(10,10,10,0.08)]"
                            aria-hidden="true"
                        >
                            {/* Coal pile — jagged silhouette */}
                            <path d="M6 22 L10 16 L14 18 L18 14 L22 17 L26 15 L30 18 L34 15 L38 17 L42 14 L46 18 L50 16 L54 22 Z" fill={svgFill} />
                            {/* Top rim of tender */}
                            <rect x="4" y="21" width="52" height="2" fill={svgFill} />
                            {/* Tender body */}
                            <rect x="4" y="22" width="52" height="16" fill={svgFill} />
                            {/* Rivet band */}
                            <line x1="6" y1="30" x2="54" y2="30" stroke={svgStroke} strokeWidth="0.4" opacity="0.4" />
                            {/* Bottom edge */}
                            <rect x="2" y="38" width="56" height="2" fill={svgFill} />
                            {/* Chassis rod */}
                            <rect x="6" y="41.5" width="48" height="1.5" fill={svgFill} opacity="0.55" />
                            {/* Couplings */}
                            <rect x="0" y="32" width="4" height="2" fill={svgFill} />
                            <rect x="56" y="32" width="4" height="2" fill={svgFill} />
                        </svg>
                    </div>

                    {/* ── Locomotive (unchanged — your edited version) ── */}
                    <svg
                        width="96"
                        height="52"
                        viewBox="0 0 96 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block drop-shadow-[2px_2px_0_rgba(10,10,10,0.10)]"
                    >
                        {/* Connecting rod between drive wheels */}
                        <rect x="14" y="41.5" width="28" height="1.5" fill={svgFill} opacity="0.55" />

                        {/* Cab */}
                        <path d="M4 20 L4 38 L32 38 L32 20 L28 16 L8 16 Z" fill={svgFill} />
                        <rect x="10" y="22" width="16" height="9" fill={svgStroke} />
                        <line x1="18" y1="22" x2="18" y2="31" stroke={svgFill} strokeWidth="0.6" />

                        {/* Boiler */}
                        <rect x="32" y="24" width="44" height="14" fill={svgFill} />
                        <line x1="44" y1="24" x2="44" y2="38" stroke={svgStroke} strokeWidth="0.5" opacity="0.4" />
                        <line x1="58" y1="24" x2="58" y2="38" stroke={svgStroke} strokeWidth="0.5" opacity="0.4" />

                        {/* Smokestack */}
                        <rect x="50" y="12" width="6" height="12" fill={svgFill} />
                        <ellipse cx="53" cy="12" rx="5" ry="1.6" fill={svgFill} />

                        {/* Steam dome */}
                        <path d="M62 24 Q66 18 70 24 Z" fill={svgFill} />

                        {/* Boiler front + headlight */}
                        <circle cx="78" cy="31" r="8.5" fill={svgFill} />
                        <circle cx="78" cy="31" r="2.6" fill={svgStroke} />
                        <circle cx="78" cy="31" r="1" fill={svgFill} />
                        <circle cx="78.6" cy="30.3" r="0.5" fill={svgStroke} />

                        {/* Cowcatcher */}
                        <path d="M86 33 L94 39 L94 44 L86 40 Z" fill={svgFill} />
                        <line x1="87" y1="34.5" x2="92" y2="39.5" stroke={svgStroke} strokeWidth="0.5" opacity="0.5" />
                        <line x1="86.5" y1="37" x2="92" y2="41.5" stroke={svgStroke} strokeWidth="0.5" opacity="0.5" />
                    </svg>
                </div>

                {/* ── Centered reveal text — staggered fade-up on scroll ── */}
                <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 px-5 text-center sm:bottom-4 md:bottom-5">
                    <p className="font-mono text-[0.6rem] leading-none tracking-[0.24em] smallcaps sm:text-[0.66rem]" style={{ color: revealTxt }}>
                        <span className={`${styles.revealWord}`} style={{ animationDelay: '0.10s' }}>All</span>
                        <span className={`${styles.revealWord} mx-1`} style={{ animationDelay: '0.22s', color: revealDot }}>·</span>
                        <span className={`${styles.revealWord}`} style={{ animationDelay: '0.34s' }}>aboard</span>
                        <span className={`${styles.revealWord} mx-2`} style={{ animationDelay: '0.46s', color: revealDash }}>—</span>
                        <span className={`${styles.revealWord}`} style={{ animationDelay: '0.58s' }}>next</span>
                        <span className={`${styles.revealWord} mx-1`} style={{ animationDelay: '0.70s', color: revealDot }}>·</span>
                        <span className={`${styles.revealWord}`} style={{ animationDelay: '0.82s' }}>stop</span>{' '}
                        <span
                            className={`${styles.revealWord} font-serif-alt text-[1.05rem] italic leading-none sm:text-[1.2rem]`}
                            style={{ animationDelay: '0.96s', letterSpacing: '0', color: revealItalic }}
                        >
                            projects
                        </span>
                        <span className={`${styles.revealWord} ml-2`} style={{ animationDelay: '1.14s', color: boxText }}>↓</span>
                    </p>
                </div>
            </div>

            {/* ── Bottom section plate ── */}
            <div
                className="relative z-10 flex items-center justify-between gap-4 border-t px-5 py-3 sm:px-6 md:px-12"
                style={{ borderColor: metaBdr }}
            >
                <span className="font-mono text-[0.62rem] tracking-[0.18em] smallcaps" style={{ color: boxText }}>
                    [ Interlude ] - Transit
                </span>
                <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] smallcaps sm:inline" style={{ color: metaTxt }}>
                    Service running · on time
                </span>
                <span className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] smallcaps" style={{ color: revealTxt }}>
                    Departing to Projects
                    <span className="block h-px w-6" style={{ background: metaLine }} />
                </span>
            </div>
        </section>
    );
};