'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';

const EMAIL = 'raphaelalcantara51@gmail.com';
const MESSAGE_LIMIT = 500;

const subjectOptions = [
    { value: 'project', label: 'A project' },
    { value: 'collab', label: 'A collaboration' },
    { value: 'question', label: 'A question' },
    { value: 'hello', label: 'Just to say hello' },
] as const;

type SubjectValue = typeof subjectOptions[number]['value'];

const Postmark = ({ isDark }: { isDark: boolean }) => {
    const textColor = isDark ? 'rgb(240, 239, 233)' : '#0a0a0a';
    const bgColor = isDark ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    return (
        <svg
            width="92"
            height="92"
            viewBox="0 0 92 92"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[2px_2px_0_rgba(10,10,10,0.10)]"
            aria-hidden="true"
        >
            <circle cx="46" cy="46" r="42" fill={bgColor} stroke={textColor} strokeWidth="1.5" />
            <circle cx="46" cy="46" r="34" fill="none" stroke={textColor} strokeWidth="0.6" opacity="0.55" />

            {/* curved text — top */}
            <defs>
                <path id="postmark-top" d="M 16 46 A 30 30 0 0 1 76 46" fill="none" />
                <path id="postmark-bot" d="M 16 50 A 30 30 0 0 0 76 50" fill="none" />
            </defs>
            <text
                fontSize="7.5"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
                letterSpacing="3.5"
                fill={textColor}
            >
                <textPath href="#postmark-top" startOffset="50%" textAnchor="middle">
                    ★ DISPATCH OFFICE ★
                </textPath>
            </text>

            {/* center mark */}
            <text x="46" y="44" textAnchor="middle" fontSize="13" style={{ fontFamily: 'var(--font-fraunces), serif' }} fontWeight="900" fill={textColor}>N°</text>
            <text x="46" y="58" textAnchor="middle" fontSize="13" style={{ fontFamily: 'var(--font-instrument-serif), serif' }} fontStyle="italic" fill={textColor}>001</text>

            {/* curved text — bottom */}
            <text
                fontSize="7"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
                letterSpacing="3"
                fill={textColor}
            >
                <textPath href="#postmark-bot" startOffset="50%" textAnchor="middle">
                    MANILA · MMXXVI
                </textPath>
            </text>
        </svg>
    );
};

export const Contact = () => {
    const [ref] = useScrollReveal();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Color token helpers
    const bg = isDark ? 'rgb(13, 12, 10)' : 'rgb(244, 243, 238)';
    const border = isDark ? 'rgba(240,239,233,0.15)' : 'rgba(10,10,10,0.15)';
    const border20 = isDark ? 'rgba(240,239,233,0.20)' : 'rgba(10,10,10,0.20)';
    const border25 = isDark ? 'rgba(240,239,233,0.25)' : 'rgba(10,10,10,0.25)';
    const border30 = isDark ? 'rgba(240,239,233,0.30)' : 'rgba(10,10,10,0.30)';
    const border35 = isDark ? 'rgba(240,239,233,0.35)' : 'rgba(10,10,10,0.35)';
    const border40 = isDark ? 'rgba(240,239,233,0.40)' : 'rgba(10,10,10,0.40)';
    const border55 = isDark ? 'rgba(240,239,233,0.55)' : 'rgba(10,10,10,0.55)';
    const border85 = isDark ? 'rgba(240,239,233,0.85)' : 'rgba(10,10,10,0.85)';
    const text35 = isDark ? 'rgba(240,239,233,0.35)' : 'rgba(10,10,10,0.35)';
    const text40 = isDark ? 'rgba(240,239,233,0.40)' : 'rgba(10,10,10,0.40)';
    const text45 = isDark ? 'rgba(240,239,233,0.45)' : 'rgba(10,10,10,0.45)';
    const text50 = isDark ? 'rgba(240,239,233,0.50)' : 'rgba(10,10,10,0.50)';
    const text55 = isDark ? 'rgba(240,239,233,0.55)' : 'rgba(10,10,10,0.55)';
    const text65 = isDark ? 'rgba(240,239,233,0.65)' : 'rgba(10,10,10,0.65)';
    const text70 = isDark ? 'rgba(240,239,233,0.70)' : 'rgba(10,10,10,0.70)';
    const text85 = isDark ? 'rgba(240,239,233,0.85)' : 'rgba(10,10,10,0.85)';
    const paperBg = isDark ? 'rgb(22, 21, 18)' : 'rgb(240, 238, 230)';
    const paperTexture = isDark ? 'rgba(240,239,233,0.02)' : 'rgba(10,10,10,0.02)';
    const shadow = isDark ? 'rgba(240,239,233,0.12)' : 'rgba(10,10,10,0.12)';
    const shadowSubmit = isDark ? 'rgba(240,239,233,0.85)' : 'rgba(10,10,10,0.85)';
    const shadowSubmitHover = isDark ? 'rgba(240,239,233,0.90)' : 'rgba(10,10,10,0.90)';
    const cardBg = isDark ? 'rgb(22, 21, 18)' : 'rgb(240, 238, 230)';
    const pulseColor = 'rgb(118, 138, 102)';
    const border15 = isDark ? 'rgba(240,239,233,0.15)' : 'rgba(10,10,10,0.15)';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState<SubjectValue>('project');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const remaining = MESSAGE_LIMIT - message.length;
    const subjectLabel = subjectOptions.find(s => s.value === subject)?.label ?? 'Hello';
    const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    }).toUpperCase();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const fullSubject = `${subjectLabel} — from ${name || 'a visitor'}`;
        const body = `${message}\n\n— ${name}\n${email}`;
        const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setSent(true);
        window.setTimeout(() => setSent(false), 3800);
    };

    return (
        <section
            ref={ref}
            id="contact"
            className="relative w-full overflow-hidden border-b px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-32"
            style={{
                background: bg,
                borderColor: border,
                transition: 'background 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
        >
            <style>{`
                /* Send button — small jitter when it transitions to "Dispatched" */
                @keyframes seal-stamp {
                    0%   { transform: scale(1)   rotate(0deg); }
                    25%  { transform: scale(1.08) rotate(-2deg); }
                    50%  { transform: scale(0.96) rotate(1deg); }
                    100% { transform: scale(1)   rotate(0deg); }
                }
                .seal-anim { animation: seal-stamp 0.55s cubic-bezier(0.2, 0.7, 0.2, 1); }

                /* Subtle paper texture on form container */
                .paper {
                    background-color: ${paperBg};
                    background-image:
                        repeating-linear-gradient(0deg,    ${paperTexture} 0 1px, transparent 1px 28px),
                        repeating-linear-gradient(90deg,   ${paperTexture} 0 1px, transparent 1px 28px);
                }

                @media (prefers-reduced-motion: reduce) {
                    .seal-anim { animation: none !important; }
                }
            `}</style>

            {/* Backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-60 dark:opacity-40" />
            <div className="absolute inset-0 dot-grid pointer-events-none dark:opacity-30" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Radial glows */}
            <div
                className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full pointer-events-none sm:h-[520px] sm:w-[520px] md:-top-48 md:-left-40 md:h-[640px] md:w-[640px]"
                style={{ background: 'radial-gradient(circle, rgba(180,150,110,0.14), transparent 64%)' }}
            />
            <div
                className="absolute -bottom-40 -right-32 h-[380px] w-[380px] rounded-full pointer-events-none sm:h-[480px] sm:w-[480px] md:-bottom-48 md:-right-40 md:h-[600px] md:w-[600px]"
                style={{ background: 'radial-gradient(circle, rgba(150,160,140,0.12), transparent 64%)' }}
            />

            {/* Vertical archive label */}
            <span
                className="vertical-rl absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[0.68rem] smallcaps fade-up sm:block md:right-6"
                style={{ color: text45, animationDelay: '0.5s' }}
            >
                The Dispatch · sealed by hand
            </span>

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                {/* ── Top section plate ── */}
                <div
                    className="mb-14 flex items-center justify-between gap-4 pb-3 fade-up sm:mb-20 md:mb-24"
                    style={{ borderColor: border, borderBottomWidth: '1px', animationDelay: '0.3s' }}
                >
                    <span className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] smallcaps" style={{ color: text45 }}>
                        <span className="block h-px w-6" style={{ background: border30 }} />
                        Vol. 004 / Contact
                    </span>
                    <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] smallcaps sm:inline" style={{ color: text40 }}>
                        Outbound · awaiting transmission
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] smallcaps" style={{ color: text45 }}>
                        <span className="relative flex h-1.5 w-1.5">
                            <span
                                className="absolute inset-0 rounded-full pulse-soft"
                                style={{ background: pulseColor }}
                            />
                        </span>
                        Office is open
                    </span>
                </div>

                {/* ── Title area ── */}
                <div className="relative mb-16 sm:mb-24 md:mb-28">
                    <div
                        className="ghost-number absolute -top-8 left-0 select-none font-black leading-none pointer-events-none sm:-top-16 md:-top-24"
                        aria-hidden="true"
                    >
                        08
                    </div>

                    <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                        <div className="relative z-10 lg:col-span-7">
                            <p
                                className="mb-5 flex items-center gap-3 text-[0.72rem] leading-none smallcaps fade-up sm:text-[0.76rem]"
                                style={{ color: text65, animationDelay: '0.4s' }}
                            >
                                <span className="block h-px w-8 shrink-0 sm:w-10" style={{ background: border40 }} />
                                <span>Section 005 — The Dispatch</span>
                                <span className="hidden shrink-0 font-mono xs:inline" style={{ color: text40 }}>— 005</span>
                            </p>

                            <h2
                                className="hero-title font-black fade-up"
                                style={{ animationDelay: '0.55s' }}
                            >
                                <span className="title-word">Send</span>{' '}
                                <span className="title-word">word</span>
                                <br />
                                <span className="title-word"><em>across</em></span>{' '}
                                <span className="title-word">
                                    the wire
                                    <span className="hero-mark align-top font-normal italic" style={{ color: text40 }}>V</span>
                                </span>
                            </h2>
                        </div>

                        <div
                            className="relative z-10 lg:col-span-5 lg:pt-12 fade-up"
                            style={{ animationDelay: '0.75s' }}
                        >
                            <div className="mb-4 flex items-center gap-3 font-mono text-[0.6rem] leading-none tracking-[0.18em] smallcaps" style={{ color: text40 }}>
                                <span className="block h-px w-6" style={{ background: border25 }} />
                                Note to the Reader
                            </div>
                            <p className="font-serif-alt max-w-[30rem] text-[1.1rem] italic leading-[1.5] sm:text-[1.2rem]" style={{ color: text70 }}>
                                Fill out the form to the left and your message will travel
                                directly to the studio inbox.{' '}
                                <span className="not-italic font-mono text-[0.7rem] tracking-[0.1em] smallcaps" style={{ color: text55 }}>
                                    The kettle is on. The pen is sharp.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── The Dispatch (form + sidebar) ── */}
                <section
                    className="relative fade-up"
                    style={{ borderColor: border20, borderTopWidth: '1px', animationDelay: '0.4s' }}
                >
                    {/* Top marginalia on the border */}
                    <span className="font-serif-alt absolute -top-[0.95rem] left-0 z-10 inline-block pr-4 text-sm italic leading-none" style={{ background: bg, color: text55 }}>
                        The Dispatch.
                    </span>
                    <span className="font-mono absolute -top-[0.75rem] right-0 z-10 hidden pl-3 text-[0.6rem] leading-none tracking-[0.18em] smallcaps sm:inline-block" style={{ background: bg, color: text40 }}>
                        Form N° 001 · Draft 1.0
                    </span>

                    <div className="grid grid-cols-1 gap-10 pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-16">
                        {/* ── THE FORM ── */}
                        <div className="relative lg:col-span-8">
                            {/* Postmark — overlapping the top-right corner of the form */}
                            <div
                                className="absolute -top-6 -right-3 z-20 rotate-[-12deg] sm:-top-8 sm:-right-4 md:-top-10 md:-right-6"
                                aria-hidden="true"
                            >
                                <Postmark isDark={isDark} />
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="paper relative border-2 p-6 shadow-[8px_8px_0] sm:p-8 md:p-10"
                                style={{
                                    borderColor: border85,
                                    boxShadow: `8px 8px 0 ${shadow}`,
                                }}
                            >
                                {/* Corner ticks */}
                                <span className="corner-tick tl absolute top-2 left-2 block h-3 w-3" />
                                <span className="corner-tick tr absolute top-2 right-2 block h-3 w-3" />
                                <span className="corner-tick bl absolute bottom-2 left-2 block h-3 w-3" />
                                <span className="corner-tick br absolute bottom-2 right-2 block h-3 w-3" />

                                {/* Form header */}
                                <header className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-3" style={{ borderColor: border40, borderBottomWidth: '1px' }}>
                                    <div>
                                        <div className="font-mono text-[0.58rem] leading-none tracking-[0.22em] smallcaps" style={{ color: text50 }}>
                                            — Outbound transmission
                                        </div>
                                        <div className="font-serif-alt mt-1 text-[1.4rem] italic leading-none sm:text-[1.65rem]" style={{ color: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }}>
                                            Dispatch form
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 font-mono text-[0.55rem] tracking-[0.18em] smallcaps" style={{ color: text50 }}>
                                        <span>Drafted — {today}</span>
                                        <span>Sheet 01 / 01</span>
                                    </div>
                                </header>

                                {/* TO line — pre-filled, locked */}
                                <div className="mb-3 flex items-center gap-3 py-2" style={{ borderColor: border25, borderBottomWidth: '1px' }}>
                                    <label className="font-mono text-[0.6rem] tracking-[0.2em] smallcaps shrink-0 w-14 sm:w-16" style={{ color: text55 }}>
                                        To:
                                    </label>
                                    <span className="font-serif-alt text-base italic sm:text-[1.05rem]" style={{ color: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }}>
                                        Gian Raphael — at the studio
                                    </span>
                                    <span className="ml-auto font-mono text-[0.5rem] tracking-[0.18em] smallcaps" style={{ color: text35 }}>
                                        Recipient
                                    </span>
                                </div>

                                {/* FROM (name) */}
                                <div className="mb-3 flex items-center gap-3 py-2 transition-colors" style={{ borderColor: border30, borderBottomWidth: '1px' }}>
                                    <label htmlFor="dispatch-name" className="font-mono text-[0.6rem] tracking-[0.2em] smallcaps shrink-0 w-14 sm:w-16" style={{ color: text55 }}>
                                        From:
                                    </label>
                                    <input
                                        id="dispatch-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="your name"
                                        required
                                        autoComplete="name"
                                        className="font-serif-alt flex-1 bg-transparent text-base italic outline-none sm:text-[1.05rem]"
                                        style={{
                                            color: isDark ? 'rgb(240,239,233)' : '#0a0a0a',
                                            caretColor: isDark ? 'rgb(240,239,233)' : '#0a0a0a'
                                        }}
                                        placeholder-style={{ color: text35 }}
                                    />
                                </div>

                                {/* RETURN ADDRESS (email) */}
                                <div className="mb-6 flex items-center gap-3 py-2 transition-colors" style={{ borderColor: border30, borderBottomWidth: '1px' }}>
                                    <label htmlFor="dispatch-email" className="font-mono text-[0.6rem] tracking-[0.2em] smallcaps shrink-0 w-14 sm:w-16" style={{ color: text55 }}>
                                        Return:
                                    </label>
                                    <input
                                        id="dispatch-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="where can I write back?"
                                        required
                                        autoComplete="email"
                                        className="font-serif-alt flex-1 bg-transparent text-base italic outline-none sm:text-[1.05rem]"
                                        style={{
                                            color: isDark ? 'rgb(240,239,233)' : '#0a0a0a',
                                            caretColor: isDark ? 'rgb(240,239,233)' : '#0a0a0a'
                                        }}
                                    />
                                </div>

                                {/* SUBJECT — radio grid */}
                                <fieldset className="mb-6">
                                    <legend className="mb-3 flex items-center gap-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text55 }}>
                                        <span className="block h-px w-5" style={{ background: border30 }} />
                                        Re: the subject — tick one
                                    </legend>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                                        {subjectOptions.map((opt) => {
                                            const isOn = subject === opt.value;
                                            return (
                                                <label
                                                    key={opt.value}
                                                    className="group flex cursor-pointer items-center gap-2"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="subject"
                                                        value={opt.value}
                                                        checked={isOn}
                                                        onChange={() => setSubject(opt.value as SubjectValue)}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        className={`relative block h-3.5 w-3.5 shrink-0 border transition-all duration-200 ${isOn
                                                                ? isDark ? 'bg-white border-white' : 'bg-black border-black'
                                                                : isDark ? 'border-white/45 bg-transparent group-hover:border-white' : 'border-black/45 bg-transparent group-hover:border-black'
                                                            }`}
                                                    >
                                                        {isOn && (
                                                            <span className="absolute inset-[3px] block" style={{ background: paperBg }} />
                                                        )}
                                                    </span>
                                                    <span
                                                        className={`font-serif-alt text-[0.95rem] italic leading-tight transition-colors sm:text-[1rem] ${isOn ? isDark ? 'text-white' : 'text-black' : isDark ? 'text-white/65 group-hover:text-white' : 'text-black/65 group-hover:text-black'
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                                {/* MESSAGE textarea */}
                                <div className="mb-6">
                                    <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text55 }}>
                                        <span className="flex items-center gap-3">
                                            <span className="block h-px w-5" style={{ background: border30 }} />
                                            Message — write freely
                                        </span>
                                        <span style={{ color: remaining < 60 ? (isDark ? 'rgb(240,239,233)' : '#0a0a0a') : text40 }}>
                                            {message.length} / {MESSAGE_LIMIT}
                                        </span>
                                    </div>
                                    <div className="relative transition-colors" style={{ borderWidth: '1px', borderColor: border35 }}>
                                        <textarea
                                            id="dispatch-message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_LIMIT))}
                                            placeholder="What brings you here? Take your time — I read every dispatch."
                                            required
                                            rows={6}
                                            maxLength={MESSAGE_LIMIT}
                                            style={{ fontFamily: "Inter Variable", color: isDark ? 'rgb(240,239,233)' : '#0a0a0a', background: 'transparent', caretColor: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }}
                                            className="block w-full resize-none p-4 text-base leading-[1.65] outline-none sm:text-[1.05rem]"
                                        />
                                        {/* Page corner ticks inside the textarea box */}
                                        <span className="pointer-events-none absolute -top-px -left-px h-2 w-2" style={{ borderLeftWidth: '1px', borderTopWidth: '1px', borderColor: border55 }} />
                                        <span className="pointer-events-none absolute -top-px -right-px h-2 w-2" style={{ borderRightWidth: '1px', borderTopWidth: '1px', borderColor: border55 }} />
                                        <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2" style={{ borderLeftWidth: '1px', borderBottomWidth: '1px', borderColor: border55 }} />
                                        <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2" style={{ borderRightWidth: '1px', borderBottomWidth: '1px', borderColor: border55 }} />
                                    </div>
                                </div>

                                {/* Submit row */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-5" style={{ borderColor: border30, borderTopWidth: '1px' }}>
                                    <div className="font-mono text-[0.55rem] tracking-[0.2em] smallcaps" style={{ color: text45 }}>
                                        Signed by hand · sealed before send
                                    </div>
                                    <button
                                        type="submit"
                                        className={`group relative inline-flex items-center gap-3 border px-5 py-3 font-mono text-[0.62rem] leading-none tracking-[0.2em] smallcaps transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] focus:outline-none focus-ring-1 ${sent ? 'seal-anim' : ''
                                            }`}
                                        style={{
                                            borderColor: isDark ? 'rgb(240,239,233)' : '#0a0a0a',
                                            background: isDark ? 'rgb(240,239,233)' : '#0a0a0a',
                                            color: isDark ? 'rgb(13, 12, 10)' : 'rgb(244,243,238)',
                                            boxShadow: `5px 5px 0 ${shadowSubmit}`,
                                        }}
                                        onMouseEnter={(e) => {
                                            const elem = e.currentTarget;
                                            elem.style.boxShadow = `7px 7px 0 ${shadowSubmitHover}`;
                                        }}
                                        onMouseLeave={(e) => {
                                            const elem = e.currentTarget;
                                            elem.style.boxShadow = `5px 5px 0 ${shadowSubmit}`;
                                        }}
                                    >
                                        <span>{sent ? 'Dispatched' : 'Send dispatch'}</span>
                                        <span className="transition-transform group-hover:translate-x-1">
                                            {sent ? '✓' : '↗'}
                                        </span>
                                    </button>
                                </div>
                            </form>

                            {/* Caption beneath the form */}
                            <p className="mt-5 text-center font-serif-alt text-sm italic sm:mt-6 sm:text-base" style={{ color: text55 }}>
                                — your message will open in your email client, addressed and ready to send.
                            </p>
                        </div>

                        {/* ── SIDEBAR ── */}
                        <aside className="relative flex flex-col gap-8 lg:col-span-4">
                            {/* Status */}
                            <div className="border p-5 sm:p-6" style={{ borderColor: border25, background: cardBg, boxShadow: `3px 3px 0 ${shadow}` }}>
                                <div className="mb-3 flex items-center gap-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text50 }}>
                                    <span className="block h-px w-5" style={{ background: border30 }} />
                                    Currently
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="relative flex h-2 w-2 self-center">
                                        <span
                                            className="absolute inset-0 rounded-full pulse-soft"
                                            style={{ background: pulseColor }}
                                        />
                                    </span>
                                    <span className="font-serif-alt text-[1.4rem] italic leading-none" style={{ color: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }}>
                                        Open for work
                                    </span>
                                </div>
                                <p className="mt-3 text-[0.85rem] leading-[1.55] sm:text-[0.9rem]" style={{ color: text65 }}>
                                    Available for select projects from{' '}
                                    <span style={{ color: text85 }}>Q2 onwards</span>. Smaller engagements welcome year-round.
                                </p>
                            </div>

                            {/* Response time */}
                            <div className="relative">
                                <div className="mb-3 flex items-center gap-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text50 }}>
                                    <span className="block h-px w-5" style={{ background: border30 }} />
                                    Response time
                                </div>
                                <p className="font-serif-alt text-[1.1rem] italic leading-snug sm:text-[1.2rem]" style={{ color: text85 }}>
                                    Usually within{' '}
                                    <span style={{ borderBottomWidth: '1px', borderColor: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }}>48 hours</span>, often
                                    sooner.
                                </p>
                                <p className="mt-1 font-mono text-[0.58rem] tracking-[0.18em] smallcaps" style={{ color: text45 }}>
                                    Mon — Fri · 09:00 to 18:00 GMT+8
                                </p>
                            </div>

                            {/* Where I am */}
                            <div className="relative">
                                <div className="mb-3 flex items-center gap-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text50 }}>
                                    <span className="block h-px w-5" style={{ background: border30 }} />
                                    The studio
                                </div>
                                <p className="font-serif-alt text-[1.1rem] italic leading-snug sm:text-[1.2rem]" style={{ color: text85 }}>
                                    Manila — Philippines
                                </p>
                                <p className="mt-1 font-mono text-[0.58rem] tracking-[0.18em] smallcaps" style={{ color: text45 }}>
                                    14.5995° N, 120.9842° E
                                </p>
                            </div>

                            {/* Other channels */}
                            <div className="relative">
                                <div className="mb-3 flex items-center gap-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text50 }}>
                                    <span className="block h-px w-5" style={{ background: border30 }} />
                                    Or find me elsewhere
                                </div>
                                <ul className="space-y-2.5">
                                    {[
                                        { label: 'GitHub', value: '@CritaxoniaDev', href: 'https://github.com/gianraphael' },
                                        { label: 'LinkedIn', value: 'in/gianraphael', href: 'https://linkedin.com/in/gianraphael' },
                                        { label: 'X', value: '@gianraphael', href: 'https://x.com/gianraphael' },
                                    ].map((item) => (
                                        <li key={item.label} className="flex items-baseline gap-3">
                                            <span className="font-mono text-[0.55rem] tracking-[0.2em] w-14 shrink-0 smallcaps" style={{ color: text40 }}>
                                                — {item.label}
                                            </span>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="nav-link font-serif-alt text-base italic sm:text-[1.05rem]"
                                                style={{ color: text85 }}
                                            >
                                                {item.value}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Skip the form */}
                            <div className="mt-2 pt-6" style={{ borderColor: border15, borderTopWidth: '1px' }}>
                                <p className="mb-3 font-mono text-[0.58rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text50 }}>
                                    Or skip the form entirely
                                </p>
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className={`group inline-flex w-full items-center justify-between gap-3 border px-4 py-3 transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] focus:outline-none focus:ring-1 ${isDark ? 'focus:ring-[rgb(240,239,233)]' : 'focus:ring-[#0a0a0a]'
                                        }`}
                                    style={{
                                        borderColor: isDark ? 'rgb(240,239,233)' : '#0a0a0a',
                                        background: cardBg,
                                        boxShadow: `4px 4px 0 ${shadowSubmit}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        const elem = e.currentTarget;
                                        elem.style.boxShadow = `6px 6px 0 ${shadowSubmitHover}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        const elem = e.currentTarget;
                                        elem.style.boxShadow = `4px 4px 0 ${shadowSubmit}`;
                                    }}
                                >
                                    <span className="flex flex-col items-start">
                                        <span className="font-mono text-[0.55rem] leading-none tracking-[0.2em] smallcaps" style={{ color: text55 }}>
                                            Write directly
                                        </span>
                                        <span className="font-serif-alt mt-1 text-[0.95rem] italic leading-none sm:text-[1.05rem]" style={{ color: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }}>
                                            {EMAIL}
                                        </span>
                                    </span>
                                    <span className="text-base transition-transform group-hover:translate-x-1">↗</span>
                                </a>
                            </div>
                        </aside>
                    </div>

                    <div className="mt-16 border-t sm:mt-20" aria-hidden="true" style={{ borderColor: border20 }} />
                </section>

                {/* ── Closing flourish ── */}
                <div
                    className="mt-10 flex items-center justify-center gap-4 fade-up sm:mt-14"
                    style={{ animationDelay: '0.9s' }}
                >
                    <span className="block h-px w-16 sm:w-24" style={{ background: border20 }} />
                    <span className="font-serif-alt text-base italic sm:text-lg" style={{ color: text45 }}>
                        — fin de la transmission —
                    </span>
                    <span className="block h-px w-16 sm:w-24" style={{ background: border20 }} />
                </div>

                {/* ── Bottom meta ── */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-3 pt-4 sm:mt-16" style={{ borderColor: border, borderTopWidth: '1px' }}>
                    <span className="font-mono text-[0.62rem] tracking-[0.18em] smallcaps" style={{ color: text40 }}>
                        [ 004 / 005 ] - Contact
                    </span>
                    <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] smallcaps sm:inline" style={{ color: text40 }}>
                        Form sealed · pen down · kettle on
                    </span>
                    <a
                        href="#footer"
                        className="group inline-flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] smallcaps transition-colors"
                        style={{ color: text55 }}
                        onMouseEnter={(e) => {
                            const elem = e.currentTarget;
                            elem.style.color = isDark ? 'rgb(240,239,233)' : '#0a0a0a';
                        }}
                        onMouseLeave={(e) => {
                            const elem = e.currentTarget;
                            elem.style.color = text55;
                        }}
                    >
                        Continue to Colophon
                        <span className="relative block h-px w-10 overflow-hidden" style={{ background: border25 }}>
                            <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: isDark ? 'rgb(240,239,233)' : '#0a0a0a' }} />
                        </span>
                        <span className="transition-transform group-hover:translate-x-1">↓</span>
                    </a>
                </div>
            </div>
        </section>
    );
};