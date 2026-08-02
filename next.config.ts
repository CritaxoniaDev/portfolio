import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const isProduction = process.env.NODE_ENV === 'production';

/* Vercel exposes VERCEL_DEPLOYMENT_ID; set NEXT_DEPLOYMENT_ID yourself
   anywhere else. Undefined = deployment stamping off. */
const deploymentId = process.env.NEXT_DEPLOYMENT_ID || process.env.VERCEL_DEPLOYMENT_ID;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Stamps every static asset request with the deployment it belongs to, so a
     client left open across a deploy keeps fetching chunks from the build it
     was served (skew protection). */
  deploymentId,

  /* Mirrors that id into the browser bundle so client-side Sentry events carry
     the same release as server ones — otherwise only half the stack traces
     match the uploaded source maps. Derived, never set by hand. */
  ...(deploymentId ? { env: { NEXT_PUBLIC_DEPLOYMENT_ID: deploymentId } } : {}),

  /* Sentry needs these to turn minified stack traces back into source lines. */
  productionBrowserSourceMaps: true,
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  /* Verbose SDK + build-plugin logging outside production. */
  debug: !isProduction,
  silent: isProduction && !process.env.CI,

  /* Routes Sentry traffic through this app so ad blockers don't eat events.
     Costs one serverless function; drop it if you'd rather report directly. */
  tunnelRoute: '/monitoring',

  /* Source maps are uploaded at build time, then deleted from the output so
     they never ship to visitors. Needs SENTRY_AUTH_TOKEN; without it the
     upload is skipped and the build still succeeds. */
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  /* Also upload maps for chunks outside the page bundles, so frames in shared
     vendor code resolve too. */
  widenClientFileUpload: true,
});
