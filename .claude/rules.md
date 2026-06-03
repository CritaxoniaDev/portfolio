# Project Rules — Editorial Portfolio

Read this file before making changes. These rules encode hard-won decisions; deviating from them tends to break dark mode, the visual rhythm, or both.

---

## 1. Stack & versions

- **Vite + React + TypeScript**
- **Tailwind CSS v4** — no `tailwind.config.ts` exists, and one should not be created. All theme/variant config lives in `globals.css`.
- Dark mode is **class-based**, enabled by this line near the top of `globals.css`:
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```
  Without this line, every `dark:` utility in the codebase is silently ignored. Do not remove it.

---

## 2. Theme state — single source of truth

Theme state lives in **`src/context/ThemeContext.tsx`** and is consumed via `useTheme()`. There is no standalone `useTheme.ts` hook — that pattern was tried and abandoned because each component instantiated its own isolated state.

```tsx
// ✅ Correct
import { useTheme } from '../context/ThemeContext';
const { theme, toggleTheme } = useTheme();

// ❌ Wrong — creates isolated state per component
import { useTheme } from './hooks/useTheme';
```

The `ThemeProvider` must wrap the app in `main.tsx`. It:
1. Reads initial state from `localStorage` then `prefers-color-scheme`.
2. Toggles the `dark` class on `<html>`.
3. Persists to `localStorage` on change.

---

## 3. Color palette

The palette is intentionally narrow. Do not introduce new base colors without a reason.

| Token | Light | Dark |
|---|---|---|
| Page bg | `rgb(244, 243, 238)` | `rgb(13, 12, 10)` |
| Card / paper | `rgb(240, 238, 230)` | `rgb(22, 21, 18)` |
| Ink (primary text) | `#0a0a0a` (`black`) | `#f0efe9` (`white`-ish) |

These are exposed as CSS variables in `globals.css` (`--bg`, `--black`, `--black-60`, etc.) which flip automatically inside `.dark`.

### Semantic accent colors — **never flip in dark mode**

These are status indicators with meaning, and must read identically in both themes:

| Hex | Meaning | Used for |
|---|---|---|
| `#6e8c5a` | green | current / available / valid |
| `#6483a0` | blue | completed / past |
| `#b89464` | amber/tan | part-time / warm accent |

The warm-tan and sage radial highlights (`rgba(180,150,110,0.16)`, `rgba(150,160,140,0.14)`) also stay constant across themes — they read as warm light in both.

---

## 4. The `dark:` opacity ladder

To keep the text hierarchy consistent across components, map light-mode opacities to dark-mode opacities using **this exact ladder**:

| Light | Dark | Used for |
|---|---|---|
| `text-black` | `dark:text-white` | Primary text, page-active states |
| `text-black/85` | `dark:text-white/65` | Body lead text, key paragraphs |
| `text-black/75` | `dark:text-white/55` | Standard body text |
| `text-black/65` | `dark:text-white/45` | Overline labels, captions |
| `text-black/55` | `dark:text-white/40` | Meta text, dates, secondary info |
| `text-black/45` | `dark:text-white/30` | Tertiary labels, smallcaps meta |
| `text-black/40` | `dark:text-white/25` | Weakest text — registered marks, footnotes |
| `text-black/35` | `dark:text-white/25` | Pre-active link numbers |

For borders/dividers, use a shallower ladder:

| Light | Dark | Used for |
|---|---|---|
| `border-black/30` | `dark:border-white/20` | Card outlines |
| `border-black/15` | `dark:border-white/10` | Internal dividers |
| `bg-black/30` | `dark:bg-white/20` | Decorative hairlines |

Do not invent new opacity steps inside this range. Pick the closest rung.

---

## 5. Serif text (`Instrument Serif`) — CSS-level fallback

Serif text uses the `font-serif-alt` class. The class sets `font-family: 'Instrument Serif', serif` and nothing else — color is owned by Tailwind utility classes per-element.

However, `globals.css` has a **CSS-level fallback** that catches anything missing a `dark:` variant:

```css
.dark .font-serif-alt        { color: rgba(240, 239, 233, 0.55); }
.dark p.font-serif-alt,
.dark div.font-serif-alt     { color: rgba(240, 239, 233, 0.45); }
.dark .hero-title .title-word em { color: rgba(240, 239, 233, 0.9); }
.dark .hero-mark             { color: rgba(240, 239, 233, 0.25); }
```

Do not remove this fallback. New serif elements should still get explicit `dark:text-white/XX` variants matching the ladder, but the fallback keeps them visible if a variant is forgotten.

---

## 6. Editorial design conventions

Every section in this portfolio shares a visual grammar. Maintain it when adding new sections.

### Mandatory section anatomy

Every full-section component (Hero, About, WorkExperience, Certificates, etc.) includes:

- **Layered backgrounds**: `.grid-bg`, `.dot-grid`, `.grain` — all `pointer-events-none`
- **Soft radial highlights**: two off-screen circles with warm-tan + sage gradients
- **Top meta row** (`absolute top-6`): chapter number, section name, year — smallcaps mono
- **Corner ticks** (`.corner-tick.tl`, `.corner-tick.tr`): desktop only, `md:block`
- **Ghost background number** (`.ghost-number`): the 2-digit chapter, `04` etc., huge and stroke-only
- **Bottom meta** (`absolute bottom-5`): `[ 00X / 005 ] - <Name>`
- **`fade-up`** staggered with `animationDelay` from `0.35s` upward in `~0.15s` steps

### Typography

- **Display headings** use `.hero-title` — `clamp(2.75rem, 7.5vw, 7.5rem)`, font-weight black, italic `<em>` words inside `.title-word` for the `Instrument Serif` accent
- **Body lead** uses `font-serif-alt italic` at `1.1rem`–`1.4rem`
- **Body paragraphs** use `Inter Variable` (set inline via `style={{ fontFamily: 'Inter Variable' }}`)
- **Smallcaps mono** for all meta — tracking `0.18em`, sizes `0.55rem`–`0.7rem`
- **Numbers** use tabular-nums and zero-padded to 2 or 3 digits (`01`, `005`, `Position No. 001`)

### Card pattern (stacked paper)

Cards use a three-layer stacked-paper effect:
1. Back-back plate: `translate-x-[10px] translate-y-[10px] border border-black/10 dark:border-white/10`
2. Back plate: `translate-x-[5px] translate-y-[5px] border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]`
3. Main card: `border border-black/30 dark:border-white/20 bg-[rgb(240,238,230)] dark:bg-[rgb(22,21,18)]`

Always include corner brackets on the main card (`top-left`, `top-right`, `bottom-left`, `bottom-right`), `h-3 w-3` with single-direction borders.

### Logo plates inside cards

Company/provider logos in dark mode get `dark:bg-white/85` (not `dark:bg-white`) — most logos are designed for white backgrounds and would otherwise vanish, but full white burns against the dark card.

---

## 7. SVG handling

Decorative SVGs should use `currentColor` and inherit from the parent, not hardcoded `#0a0a0a`. Example:

```tsx
// ✅ Correct — flips with theme
<svg className="text-black/60 dark:text-white/40">
  <path stroke="currentColor" strokeOpacity="0.18" ... />
  <circle fill="currentColor" fillOpacity="0.9" ... />
</svg>

// ❌ Wrong — never flips
<svg>
  <path stroke="rgba(10,10,10,0.18)" ... />
</svg>
```

For per-shape opacity variation, use `strokeOpacity` / `fillOpacity` attributes, not the rgba value.

---

## 8. Inverted sections (Marquee pattern)

The `Marquee` component is intentionally inverted relative to the rest of the site:

- **Light mode** → marquee section is dark
- **Dark mode** → marquee section is light

This is achieved by consuming `useTheme()` and computing `const inv = theme === 'light'`, then applying inline styles via token variables (`bg`, `border`, `metaTxt`, etc.). Do not refactor this to use Tailwind `dark:` utilities — the inversion logic is the point.

If adding another inverted section, follow the same pattern: derive `inv` from `theme`, define token consts at the top of the component, apply via `style={{ ... }}` with `transition: 'background/color 0.45s cubic-bezier(0.4,0,0.2,1)'`.

---

## 9. Animation rules

- **Standard ease**: `cubic-bezier(0.2, 0.7, 0.2, 1)` for entrance/state changes
- **Sharp ease**: `cubic-bezier(0.7, 0, 0.3, 1)` for line/spine draws
- **Spring overshoot**: `cubic-bezier(0.34, 1.56, 0.64, 1)` for toggle thumb only
- **Theme transition duration**: `0.45s` everywhere — body, borders, custom-styled elements
- **Fade-up staggering**: start at `0.35s`, increment by `~0.15s` per element down the section
- All animations must respect `@media (prefers-reduced-motion: reduce)` — disable transforms, set opacity to 1

Component-scoped keyframes go inside an inline `<style>{`...`}</style>` block in the component file. Shared animations (`fade-up`, `scroll-line`, `pulse-soft`) live in `globals.css`.

---

## 10. Accessibility

- Mobile menu / modals: lock `body.style.overflow = 'hidden'`, close on Escape, restore focus to toggle.
- Carousels: use `role="region"`, `aria-roledescription="carousel"`, individual cards get `aria-roledescription="slide"`.
- Decorative SVGs and ornament spans get `aria-hidden="true"`.
- Active section in nav uses `aria-current`.
- Interactive elements that change content get `aria-label` (e.g., theme toggle: `aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}`).

---

## 11. File conventions

- Components live in `src/components/` (or wherever the existing tree puts them — match the convention).
- Hooks in `src/hooks/`.
- Context in `src/context/`.
- Each section component exports a named function (`export const Hero = () => { ... }`), not a default export.
- Component files end with a trailing newline.

---

## 12. Things to never do

- ❌ Add a `tailwind.config.ts` — this is v4, config lives in CSS via `@theme` / `@custom-variant`.
- ❌ Add `localStorage`-only theme reads inside components — use `useTheme()`.
- ❌ Use `mix-blend-multiply` on text — it disappears in dark mode. (Was removed from `Navigation.tsx`'s main row.)
- ❌ Hardcode `rgba(10, 10, 10, ...)` for theme-aware properties. Use CSS variables or `dark:` variants.
- ❌ Set `background:` via inline `style` for full-section backgrounds that need to flip. Use Tailwind `bg-[...] dark:bg-[...]` so they respond to theme.
- ❌ Introduce default exports for components.
- ❌ Add `font-family` declarations inside JSX — use `.font-serif-alt`, the body's Bricolage default, or `style={{ fontFamily: 'Inter Variable' }}` for the existing three families. No new fonts without discussion.

---

## 13. When adding a new section

Checklist:

1. Start from an existing section component (`About.tsx` is the cleanest template).
2. Pick the next chapter number (`Ch. VI / ...`, ghost-number `06`, etc.).
3. Add layered backgrounds, top meta row, corner ticks, ghost number, bottom meta.
4. Use the opacity ladder for all text and borders.
5. For every `text-black/XX`, add the corresponding `dark:text-white/YY`.
6. For every `bg-black/XX` or `border-black/XX`, add the dark variant.
7. Test by toggling theme: every element should crossfade, nothing should stay light-on-light or dark-on-dark.
8. Test with `prefers-reduced-motion: reduce` enabled — entrance animations should disappear cleanly.