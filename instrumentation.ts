import * as Sentry from '@sentry/nextjs';

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const DEBUG = process.env.NODE_ENV !== 'production';

/* Runs once per server/edge worker before any request is handled.
   With no DSN set the SDK initialises into a no-op, so local runs stay quiet. */
export function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        Sentry.init({
            dsn: DSN,
            debug: DEBUG,
            tracesSampleRate: 1,
            environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
            release: process.env.NEXT_DEPLOYMENT_ID ?? process.env.VERCEL_DEPLOYMENT_ID,
        });
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        Sentry.init({
            dsn: DSN,
            debug: DEBUG,
            tracesSampleRate: 1,
            environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
            release: process.env.NEXT_DEPLOYMENT_ID ?? process.env.VERCEL_DEPLOYMENT_ID,
        });
    }
}

/* Reports errors thrown while rendering server components / route handlers. */
export const onRequestError = Sentry.captureRequestError;
