---
name: frontend-design
description: Create or modify frontend interfaces for this editorial portfolio. Use this skill when the user asks to build, restyle, or extend any React component, section, page element, or visual treatment in this project. Outputs must match the editorial / paper / studio-typographic aesthetic already established and follow the project's dark-mode and design conventions documented in .claude/rules.md.
---

This skill governs frontend work inside this specific project. The project is a personal portfolio with a strong editorial / paper / studio-typographic identity. Generic "AI slop" aesthetics are not acceptable here — neither are aesthetics that conflict with the established direction.

## Before doing anything

Read `.claude/rules.md` first. It contains the project-specific rules — Tailwind v4 setup, the `ThemeContext` pattern, the opacity ladder, semantic color tokens, the section anatomy. This skill is the *aesthetic direction*; `rules.md` is the *non-negotiable mechanics*. Both apply to every frontend change.

If the two ever conflict, `rules.md` wins.

## The aesthetic direction

This is **editorial / studio-typographic** — like a printed magazine plate or a personal monograph. The mental model is "a designer's portfolio binder from a quiet studio in 2024," not "a SaaS landing page."

Specific tonal commitments:

- **Paper, not screen.** Backgrounds are warm cream (`rgb(244, 243, 238)`) or deep ink (`rgb(13, 12, 10)`) — never pure white, never pure black. Grain overlays and dot grids reinforce this.
- **Typographic hierarchy carries most of the weight.** Big italic serif words (`Instrument Serif`) inside an otherwise quiet `Bricolage Grotesque` body. Smallcaps mono labels (`font-mono` + `.smallcaps`) at `0.55rem`–`0.7rem` with `0.18em` tracking do the framing.
- **Restraint, not maximalism.** Bold maximalism would betray this direction. Every decorative element (corner ticks, ghost numbers, vertical labels, fade-up reveals) serves the editorial frame. Do not add elements just to fill space.
- **Asymmetric grids with mono-label anchors.** Sections divide into `lg:col-span-7` / `lg:col-span-5` (or 8/4) splits. The smaller column always carries the "specimen" — image plate, animated blob, ledger card.
- **Diagonal motion is rare and intentional.** Only the Marquee section breaks the orthogonal grid (`-rotate-[1.5deg]` inverted band). Don't add more tilted elements.

## Visual vocabulary (use these; don't invent parallel ones)

### The frame
- Top meta row with chapter number, section name, year (smallcaps mono, `0.68rem`)
- Corner ticks (`.corner-tick.tl`, `.corner-tick.tr`) on desktop
- Ghost number (`.ghost-number`) — the chapter as a huge stroke-only `(R)` mark
- Bottom meta `[ 00X / 005 ] - <Name>`
- Layered backgrounds: `.grid-bg`, `.dot-grid`, `.grain` — never omit these

### The card / specimen plate
- Three-layer stacked-paper effect: two offset back-plates plus the main card
- Single-pixel corner brackets at all four corners
- Paper tone: `bg-[rgb(240,238,230)]` light / `dark:bg-[rgb(22,21,18)]` dark
- Cards lift slightly off the page surface — the cream is warmer than the page cream, the dark is warmer than the page dark

### Typography
- Display headings → `.hero-title font-black` with `Instrument Serif` italic `<em>` words inside `.title-word` spans
- Body lead → `font-serif-alt italic` at `1.1rem`–`1.4rem`
- Body paragraphs → `Inter Variable` inline (`style={{ fontFamily: 'Inter Variable' }}`)
- Meta / labels / counters → `font-mono` + `.smallcaps` + `tracking-[0.18em]`
- Numbers pad to 2 or 3 digits (`01`, `005`, `Position No. 001`)

### Motion
- `fade-up` for entrance, staggered from `animationDelay: 0.35s` up in ~0.15s steps
- `cubic-bezier(0.2, 0.7, 0.2, 1)` is the standard ease; `cubic-bezier(0.7, 0, 0.3, 1)` for line draws
- Theme transitions: `0.45s cubic-bezier(0.4, 0, 0.2, 1)` on `background` and `color`
- Component-scoped animations live inside inline `<style>{`...`}</style>` blocks; shared animations live in `globals.css`
- `prefers-reduced-motion: reduce` must be respected on every animation

### Color (semantic, not decorative)
- Page / paper / ink — flip with theme
- Status hexes — never flip:
  - `#6e8c5a` green → current / active / valid
  - `#6483a0` blue → completed / past
  - `#b89464` amber → part-time / warm accent
- Warm-tan + sage radial gradients (`rgba(180,150,110,0.16)` / `rgba(150,160,140,0.14)`) — constant across themes

## Dark mode is mandatory

Every new element must work in both themes. Use the opacity ladder from `rules.md` Section 4. Every `text-black/XX` gets its `dark:text-white/YY` pair. Every `bg-black/XX` gets a `dark:bg-white/YY` pair. Every `border-black/XX` gets a `dark:border-white/YY` pair.

SVGs use `currentColor` and inherit. Don't hardcode `rgba(10,10,10,...)` for theme-aware shapes — use `strokeOpacity` / `fillOpacity` on top of `currentColor`.

## What "good" looks like for this project

A new section should feel like the next page of the same printed monograph. Someone scrolling through should not be able to tell where one designer's work ended and another's began.

Concretely, a good addition:

1. Re-uses the existing section anatomy (frame, ghost number, meta rows, fade-up stagger).
2. Picks one fresh idea for its "specimen" — the right-column visual that distinguishes this section from the others. Hero has a portrait plate, About has a morphing blob, Work has a vertical timeline spine, Certificates has a centered carousel with depth-blur falloff. The next section needs its own idea, not a remix of these.
3. Maintains the opacity ladder so the type hierarchy reads the same as the rest of the site.
4. Adds component-scoped keyframes only — never modifies `globals.css` unless extending shared infrastructure.
5. Crossfades cleanly in both directions of the theme toggle.

## What "bad" looks like

- A purple gradient. Any gradient that isn't warm-tan + sage radial highlights.
- A sans-serif heading. Headings always use `.hero-title` with `Instrument Serif` italic words inside.
- Drop shadows on cards. The stacked-paper back-plates do the depth job.
- Pure `#000` or `#fff`. The palette is `#0a0a0a` and `#f0efe9`.
- Rounded corners on cards or buttons (only on dots, status indicators, the toggle thumb).
- New font imports. The project uses three: `Bricolage Grotesque` (body), `Instrument Serif` (display italic), `Inter Variable` (body paragraph fallback). Add nothing.
- Emoji as decoration. The decorative vocabulary is corner brackets, ticks, smallcaps mono labels, hairline rules, and `✦` / `◆` in the Marquee.

## Process

When asked to add or modify a section:

1. Read `.claude/rules.md` and re-read this skill if it's been more than a session.
2. Look at the closest existing section component as a template. `About.tsx` is the cleanest starting point for a content section; `WorkExperience.tsx` for anything with cards and a spine; `Certificates.tsx` for anything carousel-shaped.
3. Decide on the one new visual idea for the specimen column.
4. Write the component matching every convention in `rules.md`.
5. Toggle theme mentally — every element should have its dark-mode pair.
6. Toggle reduced-motion mentally — every animation should degrade gracefully.

When asked to restyle something, change as little as possible. The cohesion across sections is the product.