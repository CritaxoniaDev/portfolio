'use client';

import { useSyncExternalStore } from 'react';

/* One Manila clock for the whole site — the nav meta strip and the hero
   dateline subscribe to the same store, so they can't drift apart or tick on
   different beats. Read through useSyncExternalStore so the server and the
   hydrating render agree on the placeholder. */
const formatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
});

const listeners = new Set<() => void>();
let ticker: ReturnType<typeof setInterval> | null = null;

const subscribe = (onChange: () => void) => {
    listeners.add(onChange);
    ticker ??= setInterval(() => listeners.forEach(listener => listener()), 20_000);

    return () => {
        listeners.delete(onChange);
        if (listeners.size === 0 && ticker !== null) {
            clearInterval(ticker);
            ticker = null;
        }
    };
};

const read = () => formatter.format(new Date());
const readOnServer = () => '--:--';

export const useManilaTime = () => useSyncExternalStore(subscribe, read, readOnServer);
