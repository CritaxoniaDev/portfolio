'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

/* Last-resort boundary: catches render errors that escape the root layout.
   It replaces the layout entirely, so globals.css and the font variables are
   gone by the time this renders — hence the inline styles. */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <html lang="en-PH">
            <body
                style={{
                    margin: 0,
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    padding: '2rem',
                    background: 'rgb(244, 243, 238)',
                    color: '#0a0a0a',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                }}
            >
                <main style={{ maxWidth: '32rem', textAlign: 'center' }}>
                    <p
                        style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                            fontSize: '0.6rem',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            opacity: 0.45,
                        }}
                    >
                        [ 500 ] — Unexpected error
                    </p>
                    <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', fontWeight: 900, margin: '0.75rem 0' }}>
                        Something came apart.
                    </h1>
                    <p style={{ opacity: 0.65, lineHeight: 1.7, margin: '0 0 1.75rem' }}>
                        The page failed to render. It has been reported — reloading usually clears it.
                    </p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        style={{
                            border: '1px solid rgba(10, 10, 10, 0.3)',
                            background: 'transparent',
                            color: 'inherit',
                            padding: '0.7rem 1.6rem',
                            font: 'inherit',
                            fontSize: '0.8rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}
                    >
                        Reload
                    </button>
                    {error.digest && (
                        <p
                            style={{
                                marginTop: '2rem',
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                                fontSize: '0.6rem',
                                opacity: 0.35,
                            }}
                        >
                            digest {error.digest}
                        </p>
                    )}
                </main>
            </body>
        </html>
    );
}
