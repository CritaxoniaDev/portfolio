import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* ── Per-request CSP nonce ──────────────────────────────────────────────
   Next reads the nonce out of the Content-Security-Policy header on the
   *request* and stamps it onto every script it emits — its own bootstrap
   and chunk loaders included. Anything we render ourselves reads it back
   from `x-nonce` in the root layout.

   `strict-dynamic` is what lets nonced bundles inject further scripts, so
   Vercel Analytics (which has no nonce prop of its own) still loads.
   ─────────────────────────────────────────────────────────────────────── */

const isDev = process.env.NODE_ENV !== 'production';

const buildCsp = (nonce: string) =>
    [
        `default-src 'self'`,
        /* Dev needs eval for Turbopack's HMR runtime; production does not. */
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
        /* Sections render their keyframes in inline <style> blocks and the
           layout leans on style attributes, so styles stay permissive. */
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' blob: data: https://upload.wikimedia.org`,
        `font-src 'self' data:`,
        /* Sentry events tunnel through /monitoring and Vercel Analytics posts
           to /_vercel/insights — both same-origin. */
        `connect-src 'self' https://*.sentry.io`,
        `worker-src 'self' blob:`,
        `object-src 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `frame-ancestors 'none'`,
        `upgrade-insecure-requests`,
    ].join('; ');

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const csp = buildCsp(nonce);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', csp);

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('Content-Security-Policy', csp);
    return response;
}

export const config = {
    matcher: [
        /* Documents only — static assets, images and the Sentry tunnel don't
           need a nonce and shouldn't pay for the middleware hop. */
        {
            source: '/((?!api|_next/static|_next/image|_vercel|monitoring|favicon.svg|.*\\.(?:png|jpg|jpeg|webp|svg|ttf|woff2?)$).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
