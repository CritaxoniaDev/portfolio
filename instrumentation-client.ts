import * as Sentry from '@sentry/nextjs';

/* Loaded before the app hydrates. The DSN is public by design — it only
   permits sending events — but it still lives in an env var so forks and
   preview deploys don't report into this project. */
Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    debug: process.env.NODE_ENV !== 'production',
    tracesSampleRate: 1,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    release: process.env.NEXT_PUBLIC_DEPLOYMENT_ID,

    /* Session Replay is off: this is a one-page portfolio with a custom cursor
       and a splash animation, so replays would be heavy and low-signal. */
    replaysOnErrorSampleRate: 0,
    replaysSessionSampleRate: 0,
});

/* Lets Sentry tie a trace to the navigation that started it. */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
