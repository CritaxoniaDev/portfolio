import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { Bricolage_Grotesque, Fraunces, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';

/* Body default — variable font, optical-size axis kept from the old CSS import. */
const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ['latin'],
    axes: ['opsz'],
    display: 'swap',
    variable: '--font-bricolage-grotesque',
});

/* Editorial serif — 400 only, but the italic is load-bearing (`.title-word em`). */
const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    weight: '400',
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-instrument-serif',
});

/* Display serif for the signature marks — SOFT/WONK axes match the old import.
   Turbopack strips remote `@import url(...)` from CSS, so this has to be here. */
const fraunces = Fraunces({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    axes: ['SOFT', 'WONK', 'opsz'],
    display: 'swap',
    variable: '--font-fraunces',
});

const SITE_URL = 'https://gianraphael.dev';
const TITLE = 'Gian Raphael Alcantara | Software Engineer & Full Stack Developer';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description:
        'Official portfolio of Gian Raphael Alcantara — BSIT Software Engineering student, Full Stack Developer, and Technology Associate. Explore projects, skills, certifications, and software engineering work.',
    keywords: [
        'Gian Raphael Alcantara',
        'gianraphael.dev',
        'software engineer',
        'full stack developer',
        'Laravel developer',
        'React developer',
        'Next.js developer',
        'BSIT student',
        'portfolio',
        'web developer Philippines',
    ],
    authors: [{ name: 'Gian Raphael Alcantara', url: SITE_URL }],
    creator: 'Gian Raphael Alcantara',
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
    icons: {
        icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        type: 'website',
        url: SITE_URL,
        title: TITLE,
        description:
            'Explore the portfolio of Gian Raphael Alcantara — showcasing software engineering projects, web applications, and technical expertise.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Gian Raphael Alcantara — software engineering, built from Manila.',
            },
        ],
        siteName: 'gianraphael.dev',
        locale: 'en_PH',
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: 'Official developer portfolio of Gian Raphael Alcantara.',
        images: [{ url: '/og-image.png', alt: 'Gian Raphael Alcantara — portfolio' }],
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0f172a',
};

const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gian Raphael Alcantara',
    url: SITE_URL,
    image: `${SITE_URL}/images/profile-pic.jpg`,
    jobTitle: 'Software Engineer',
    description: 'Full Stack Developer and BSIT Software Engineering student.',
    sameAs: [
        'https://github.com/CritaxoniaDev',
        'https://www.linkedin.com/in/gian-alcantara/',
    ],
    knowsAbout: [
        'Laravel',
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Power Automate',
    ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    /* Set by middleware.ts. Next already stamps its own scripts with this;
       everything below is what we emit by hand. */
    const nonce = (await headers()).get('x-nonce') ?? undefined;

    return (
        <html
            lang="en-PH"
            className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} ${fraunces.variable}`}
            suppressHydrationWarning
        >
            <head>
                <link
                    rel="preload"
                    href="/fonts/InterVariable-s.p.dab461a7.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin=""
                />
                {/* Browsers blank a script's `nonce` content attribute once it
                    has been parsed (so a CSS attribute selector can't exfiltrate
                    it), which makes the hydrated attribute look mismatched even
                    though the header and the element agreed. next-themes marks
                    its own nonced script the same way. */}
                <script
                    type="application/ld+json"
                    nonce={nonce}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
            </head>
            <body>
                <ThemeProvider nonce={nonce}>{children}</ThemeProvider>
                <noscript>You need to enable JavaScript to run this website.</noscript>
                <Analytics />
            </body>
        </html>
    );
}
