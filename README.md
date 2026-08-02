# finale-portfolio

Editorial portfolio for Gian Raphael Alcantara — **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |

## Structure

```
instrumentation.ts         — Sentry init for the node + edge runtimes, onRequestError
instrumentation-client.ts  — Sentry init for the browser
src/
  app/
    layout.tsx       — root layout: fonts, metadata, JSON-LD, <ThemeProvider>
    page.tsx         — the single page; client component that composes every section
    global-error.tsx — last-resort error boundary, reports to Sentry
    globals.css      — Tailwind v4 entry, design tokens, shared animations
  components/        — section components (all client components)
  context/           — ThemeContext (light/dark, single source of truth)
```

Static assets live in `public/` and are referenced from the web root (`/images/...`, `/fonts/...`).

## Dark mode

Class-based, driven by the `dark` class on `<html>` and handled by
[next-themes](https://github.com/pacocoursey/next-themes):

1. `ThemeProvider` in `app/layout.tsx` is next-themes configured with `attribute="class"`,
   `defaultTheme="system"` and `storageKey="theme"`. Its blocking script applies the class
   **before first paint**, so there is no flash.
2. `src/context/ThemeContext.tsx` adapts it to the `{ theme, toggleTheme }` API the sections use,
   collapsing `'system'` to the resolved `'light' | 'dark'`.
3. The hook reports `'light'` during hydration to match SSR, then settles — so no component that
   branches on `theme` hydrates with mismatched markup.

Tailwind's `dark:` variant is wired to that class in `globals.css` via
`@custom-variant dark (&:where(.dark, .dark *));` — see `.claude/rules.md` for the full design rules.

## Error monitoring & deployments

[`@sentry/nextjs`](https://docs.sentry.io/platforms/javascript/guides/nextjs/) is wired up but
**inert until a DSN is present** — with no env vars set, `Sentry.init()` is a no-op and the build
still succeeds. Nothing is hardcoded, so forks and previews never report into this project.

| Env var | Where | What it does |
|---|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | build + runtime | Turns reporting on. Public by design — it only permits *sending* events |
| `SENTRY_ORG` / `SENTRY_PROJECT` | build | Target for source map upload |
| `SENTRY_AUTH_TOKEN` | build (CI secret) | Enables the upload. Without it the build logs a skip and carries on |
| `NEXT_DEPLOYMENT_ID` | build + runtime | Stamps assets as `?dpl=<id>` for skew protection and tags the Sentry release. On Vercel, `VERCEL_DEPLOYMENT_ID` is used automatically |

Copy [`.env.example`](.env.example) to `.env.local` to fill these in — every one is optional, and
the site builds and runs with none of them set. `NEXT_PUBLIC_DEPLOYMENT_ID` is *derived* from
`NEXT_DEPLOYMENT_ID` in `next.config.ts` so browser and server events report the same release;
don't set it by hand.

Details worth knowing:

- **Debug logging** is on whenever `NODE_ENV !== 'production'`, so you see what the SDK is doing
  locally without noise for real visitors.
- **Events tunnel through `/monitoring`** rather than going straight to `sentry.io`, so ad blockers
  don't silently eat them. That route is a rewrite, and costs one serverless function.
- **Source maps** are generated (`productionBrowserSourceMaps`), uploaded at build, then deleted
  from the output — stack traces symbolicate in Sentry without shipping maps to visitors.
- **Session Replay is disabled.** The custom cursor and splash animation make replays heavy and
  low-signal here; raise `replaysOnErrorSampleRate` in `instrumentation-client.ts` if you want it.
