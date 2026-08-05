'use client';

import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

type Theme = 'light' | 'dark';

/* next-themes owns the `dark` class on <html>, the `theme` localStorage key, and
   the blocking script that applies both before first paint. */
export const ThemeProvider = ({
    children,
    nonce,
}: {
    children: ReactNode;
    /* Passed through so next-themes' blocking script satisfies the CSP. */
    nonce?: string;
}) => (
    <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme"
        nonce={nonce}
    >
        {children}
    </NextThemesProvider>
);

/* Reads false on the server and during hydration, true immediately after. */
const subscribeToHydration = () => () => {};
const hydratedOnClient = () => true;
const hydratedOnServer = () => false;

/**
 * Adapts next-themes to the `{ theme, toggleTheme }` shape the sections use.
 *
 * next-themes can only resolve the stored/system theme on the client, so the
 * hydrating render has to keep saying `light` — otherwise every component that
 * branches on `theme` (Hero's toggle, Marquee's inversion, the Footer marks)
 * would hydrate with different markup than the server sent. Only JS-driven
 * details settle after hydration; the `dark` class itself is already correct,
 * so nothing flashes.
 */
export const useTheme = () => {
    const { resolvedTheme, setTheme } = useNextTheme();
    const hydrated = useSyncExternalStore(subscribeToHydration, hydratedOnClient, hydratedOnServer);
    const theme: Theme = hydrated && resolvedTheme === 'dark' ? 'dark' : 'light';

    return {
        theme,
        toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    };
};
