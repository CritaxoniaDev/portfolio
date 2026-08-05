'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useTheme } from '../../context/ThemeContext';

/* ── Specimen 02 ────────────────────────────────────────────────────────
   A MacBook Pro 14", modelled to its published dimensions (31.26 × 22.12 ×
   1.55 cm, 3024 × 1964 display) at a scale of 1 unit = 10 cm, with a live
   2D canvas painted onto the screen as an editor typing out this project's
   own source.

   The lid opens once the specimen scrolls into view, the loop pauses while
   off-screen, `prefers-reduced-motion` gets a still open machine, and every
   GPU resource is disposed on unmount.
   ─────────────────────────────────────────────────────────────────────── */

/* Real dimensions, in centimetres, divided by ten. */
const BASE_W = 3.126;
const BASE_D = 2.212;
const BASE_H = 0.155;
const LID_H = 2.14;
const LID_T = 0.055;
const SCREEN_W = 3.02;
const SCREEN_H = 1.962; // 3.02 / 1.962 = 1.539, the panel's real aspect

const LID_CLOSED = -Math.PI / 2 + 0.015;
const LID_OPEN = -0.28; // ~106° from the deck, where people actually leave them

/* ── The editor painted onto the panel ──────────────────────────────── */
type Token = [text: string, color: keyof typeof SYNTAX];

const SYNTAX = {
    plain: '#d6d9e0',
    comment: '#5b6472',
    keyword: '#c4a1ff',
    string: '#9ecf8a',
    fn: '#7fb3ff',
    num: '#f0a97f',
    punct: '#7d8797',
};

/* Genuinely this project's clock hook, so the screen isn't showing filler. */
const SOURCE: Token[][] = [
    [["import", 'keyword'], [' { useSyncExternalStore } ', 'plain'], ['from', 'keyword'], [" 'react'", 'string'], [';', 'punct']],
    [],
    [['// One Manila clock for the whole site.', 'comment']],
    [['const', 'keyword'], [' formatter = ', 'plain'], ['new', 'keyword'], [' Intl.DateTimeFormat(', 'plain'], ["'en-PH'", 'string'], [', {', 'punct']],
    [['  timeZone: ', 'plain'], ["'Asia/Manila'", 'string'], [',', 'punct']],
    [['  hour: ', 'plain'], ["'2-digit'", 'string'], [', minute: ', 'plain'], ["'2-digit'", 'string'], [',', 'punct']],
    [['});', 'punct']],
    [],
    [['const', 'keyword'], [' subscribe = (onChange) => {', 'punct']],
    [['  listeners.', 'plain'], ['add', 'fn'], ['(onChange);', 'punct']],
    [['  ticker ??= ', 'plain'], ['setInterval', 'fn'], ['(tick, ', 'punct'], ['20_000', 'num'], [');', 'punct']],
    [['  ', 'plain'], ['return', 'keyword'], [' () => listeners.', 'plain'], ['delete', 'fn'], ['(onChange);', 'punct']],
    [['};', 'punct']],
    [],
    [['export const', 'keyword'], [' useManilaTime = () =>', 'plain']],
    [['  ', 'plain'], ['useSyncExternalStore', 'fn'], ['(subscribe, read, readOnServer);', 'punct']],
];

const TOTAL_CHARS = SOURCE.reduce((n, line) => n + line.reduce((m, [text]) => m + text.length, 0) + 1, 0);

const CANVAS_W = 1024;
const CANVAS_H = 665;

const paintScreen = (
    ctx: CanvasRenderingContext2D,
    revealed: number,
    caretVisible: boolean
) => {
    ctx.fillStyle = '#0c0e12';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    /* Window chrome */
    ctx.fillStyle = '#15181e';
    ctx.fillRect(0, 0, CANVAS_W, 46);
    const dots: [number, string][] = [[26, '#ff5f57'], [52, '#febc2e'], [78, '#28c840']];
    for (const [x, color] of dots) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, 23, 7, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = '#8b94a3';
    ctx.font = '500 17px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('useManilaTime.ts — finale-portfolio', CANVAS_W / 2, 29);
    ctx.textAlign = 'left';

    /* Gutter */
    ctx.fillStyle = '#0a0c10';
    ctx.fillRect(0, 46, 62, CANVAS_H - 46);

    const lineHeight = 31;
    const top = 78;
    let budget = revealed;
    let caret: { x: number; y: number } | null = null;

    ctx.font = '400 18px ui-monospace, SFMono-Regular, Menlo, monospace';

    for (let i = 0; i < SOURCE.length; i++) {
        const y = top + i * lineHeight;
        if (y > CANVAS_H - 46) break;

        ctx.fillStyle = budget > 0 ? '#4c5561' : '#2a3038';
        ctx.textAlign = 'right';
        ctx.fillText(String(i + 1), 46, y);
        ctx.textAlign = 'left';

        let x = 82;
        for (const [text, color] of SOURCE[i]) {
            if (budget <= 0) break;
            const slice = text.slice(0, budget);
            ctx.fillStyle = SYNTAX[color];
            ctx.fillText(slice, x, y);
            x += ctx.measureText(slice).width;
            budget -= slice.length;
        }
        if (budget > 0) budget -= 1; // newline
        else if (caret === null) caret = { x, y };
    }

    if (caret && caretVisible) {
        ctx.fillStyle = '#7fb3ff';
        ctx.fillRect(caret.x + 1, caret.y - 15, 10, 20);
    }

    /* Status bar */
    ctx.fillStyle = '#15181e';
    ctx.fillRect(0, CANVAS_H - 34, CANVAS_W, 34);
    ctx.fillStyle = '#6f7a8a';
    ctx.font = '400 15px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText('TypeScript   UTF-8   Ln ' + SOURCE.length + ', Col 1', 20, CANVAS_H - 12);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#6e8c5a';
    ctx.fillText('● build passing', CANVAS_W - 20, CANVAS_H - 12);
    ctx.textAlign = 'left';
};

const shell = {
    light: { body: 0xd9dadd, deck: 0xc9cace, metalness: 0.92, roughness: 0.29, env: 1.05 },
    dark: { body: 0x35363b, deck: 0x2a2b30, metalness: 0.9, roughness: 0.34, env: 0.85 },
};

export const LaptopSpecimen = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const shellRef = useRef<{ body: THREE.MeshStandardMaterial; deck: THREE.MeshStandardMaterial; scene: THREE.Scene } | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        } catch {
            return; // No WebGL — the aura underneath stays as the fallback.
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.setAttribute('aria-hidden', 'true');
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0.15, 1.55, 5.2);
        camera.lookAt(0, 0.55, 0);

        /* A room probe gives the aluminium something to reflect. */
        const pmrem = new THREE.PMREMGenerator(renderer);
        const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = environment;

        const key = new THREE.DirectionalLight(0xfff4e2, 2.1);
        key.position.set(-2.4, 3.4, 2.6);
        scene.add(key);

        const rim = new THREE.DirectionalLight(0xdfe7ff, 1.1);
        rim.position.set(2.8, 1.4, -2.2);
        scene.add(rim);

        /* Spill from the panel onto the keyboard deck, as a real screen does. */
        const screenGlow = new THREE.PointLight(0x8fb6ff, 0.85, 2.4, 2);
        screenGlow.position.set(0, 0.75, -0.35);
        scene.add(screenGlow);

        const laptop = new THREE.Group();
        laptop.scale.setScalar(0.86);
        scene.add(laptop);

        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: shell.light.body,
            metalness: shell.light.metalness,
            roughness: shell.light.roughness,
        });
        const deckMaterial = new THREE.MeshStandardMaterial({
            color: shell.light.deck,
            metalness: 0.45,
            roughness: 0.55,
        });
        const bezelMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0b0d,
            metalness: 0.35,
            roughness: 0.62,
        });

        /* ── Base ── */
        const baseGeometry = new RoundedBoxGeometry(BASE_W, BASE_H, BASE_D, 4, 0.045);
        const base = new THREE.Mesh(baseGeometry, bodyMaterial);
        laptop.add(base);

        /* Keyboard well */
        const wellGeometry = new RoundedBoxGeometry(2.72, 0.02, 1.06, 3, 0.02);
        const well = new THREE.Mesh(wellGeometry, bezelMaterial);
        well.position.set(0, BASE_H / 2 - 0.002, -0.42);
        laptop.add(well);

        /* Keys — one instanced mesh for the whole deck */
        const keyGeometry = new RoundedBoxGeometry(0.155, 0.018, 0.155, 2, 0.018);
        const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x17181c, metalness: 0.2, roughness: 0.78 });
        const columns = 15;
        const rows = 6;
        const keys = new THREE.InstancedMesh(keyGeometry, keyMaterial, columns * rows);
        const dummy = new THREE.Object3D();
        let index = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const wide = r === rows - 1 && c > 4 && c < 10; // spacebar row
                dummy.position.set(-1.24 + c * 0.177, BASE_H / 2 + 0.012, -0.86 + r * 0.172);
                dummy.scale.set(wide ? 1.9 : 1, 1, r === 0 ? 0.62 : 1);
                dummy.updateMatrix();
                keys.setMatrixAt(index++, dummy.matrix);
            }
        }
        keys.instanceMatrix.needsUpdate = true;
        laptop.add(keys);

        /* Trackpad — shares the deck material so it follows the theme */
        const trackpadGeometry = new RoundedBoxGeometry(1.06, 0.012, 0.68, 3, 0.015);
        const trackpad = new THREE.Mesh(trackpadGeometry, deckMaterial);
        trackpad.position.set(0, BASE_H / 2 + 0.001, 0.58);
        laptop.add(trackpad);

        /* Hinge */
        const hingeGeometry = new THREE.CylinderGeometry(0.045, 0.045, 2.78, 16);
        const hinge = new THREE.Mesh(hingeGeometry, bezelMaterial);
        hinge.rotation.z = Math.PI / 2;
        hinge.position.set(0, BASE_H / 2 - 0.02, -BASE_D / 2 + 0.05);
        laptop.add(hinge);

        /* ── Lid ── */
        const lidPivot = new THREE.Group();
        lidPivot.position.set(0, BASE_H / 2 - 0.02, -BASE_D / 2 + 0.05);
        lidPivot.rotation.x = reducedMotion ? LID_OPEN : LID_CLOSED;
        laptop.add(lidPivot);

        const lidGeometry = new RoundedBoxGeometry(BASE_W, LID_H, LID_T, 4, 0.04);
        const lid = new THREE.Mesh(lidGeometry, bodyMaterial);
        lid.position.set(0, LID_H / 2, 0);
        lidPivot.add(lid);

        const bezelGeometry = new THREE.PlaneGeometry(BASE_W - 0.03, LID_H - 0.03);
        const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
        bezel.position.set(0, LID_H / 2, LID_T / 2 + 0.001);
        lidPivot.add(bezel);

        /* Panel — the live editor */
        const screenCanvas = document.createElement('canvas');
        screenCanvas.width = CANVAS_W;
        screenCanvas.height = CANVAS_H;
        const ctx = screenCanvas.getContext('2d');
        const screenTexture = new THREE.CanvasTexture(screenCanvas);
        screenTexture.colorSpace = THREE.SRGBColorSpace;
        screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false });
        const screen = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_W, SCREEN_H), screenMaterial);
        screen.position.set(0, LID_H / 2 + 0.03, LID_T / 2 + 0.004);
        lidPivot.add(screen);

        /* The notch */
        const notch = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.055), bezelMaterial);
        notch.position.set(0, LID_H - 0.038, LID_T / 2 + 0.006);
        lidPivot.add(notch);

        shellRef.current = { body: bodyMaterial, deck: deckMaterial, scene };

        const resize = () => {
            const { clientWidth: w, clientHeight: h } = mount;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);

        const pointer = { x: 0, y: 0 };
        const onPointerMove = (event: PointerEvent) => {
            const rect = mount.getBoundingClientRect();
            pointer.x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / rect.width));
            pointer.y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / rect.height));
        };
        if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

        let visible = false;
        let hasOpened = reducedMotion;
        let openedAt = 0;
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible && !hasOpened) {
                    hasOpened = true;
                    openedAt = performance.now();
                }
            },
            { threshold: 0.15 }
        );
        intersectionObserver.observe(mount);

        const start = performance.now();
        let frame = 0;
        let lastPaint = -1;
        let typedChars = 0;

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const renderFrame = () => {
            const now = performance.now();
            const elapsed = (now - start) / 1000;

            /* Lid opens once, on first sight. */
            if (hasOpened && !reducedMotion) {
                const t = Math.min(1, (now - openedAt) / 1500);
                lidPivot.rotation.x = LID_CLOSED + (LID_OPEN - LID_CLOSED) * easeOutCubic(t);
            }

            /* Typing — restarts after a pause at the end. */
            const cycle = (elapsed % 26) - 1.2;
            typedChars = reducedMotion ? TOTAL_CHARS : Math.max(0, Math.min(TOTAL_CHARS, Math.floor(cycle * 34)));
            const caretVisible = reducedMotion ? false : Math.floor(elapsed * 1.6) % 2 === 0;
            const paintKey = typedChars * 2 + (caretVisible ? 1 : 0);
            if (ctx && paintKey !== lastPaint) {
                paintScreen(ctx, typedChars, caretVisible);
                screenTexture.needsUpdate = true;
                lastPaint = paintKey;
            }

            /* Idle drift plus pointer lean. */
            const idle = reducedMotion ? 0 : Math.sin(elapsed * 0.32) * 0.06;
            laptop.rotation.y += ((-0.26 + pointer.x * 0.4 + idle) - laptop.rotation.y) * 0.045;
            laptop.rotation.x += ((pointer.y * 0.12) - laptop.rotation.x) * 0.045;
            laptop.position.y = reducedMotion ? -0.35 : -0.35 + Math.sin(elapsed * 0.5) * 0.025;

            screenGlow.intensity = 0.8 + Math.sin(elapsed * 2.2) * 0.06;

            renderer.render(scene, camera);
        };

        const loop = () => {
            frame = requestAnimationFrame(loop);
            if (visible) renderFrame();
        };

        if (reducedMotion) {
            renderFrame();
        } else {
            loop();
        }

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            window.removeEventListener('pointermove', onPointerMove);
            [baseGeometry, wellGeometry, keyGeometry, trackpadGeometry, hingeGeometry, lidGeometry, bezelGeometry].forEach(g => g.dispose());
            screen.geometry.dispose();
            notch.geometry.dispose();
            [bodyMaterial, deckMaterial, bezelMaterial, keyMaterial, screenMaterial].forEach(m => m.dispose());
            screenTexture.dispose();
            environment.dispose();
            pmrem.dispose();
            renderer.dispose();
            renderer.domElement.remove();
            shellRef.current = null;
        };
    }, []);

    /* Aluminium finish follows the site theme. */
    useEffect(() => {
        const refs = shellRef.current;
        if (!refs) return;
        const next = theme === 'dark' ? shell.dark : shell.light;
        refs.body.color.setHex(next.body);
        refs.body.metalness = next.metalness;
        refs.body.roughness = next.roughness;
        refs.deck.color.setHex(next.deck);
        refs.scene.environmentIntensity = next.env;
    }, [theme]);

    return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
};
