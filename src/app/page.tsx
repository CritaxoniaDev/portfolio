'use client';

import { useState } from 'react';
import { SplashScreen } from '../components/screen/SplashScreen';
import { LenisProvider } from '../components/providers/lenis-provider';
import { Cursor } from '../components/Cursor';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Marquee } from '../components/Marquee';
import { Certificates } from '../components/Certificates';
import { WorkExperience } from '../components/WorkExperience';
import { Education } from '../components/Education';
import { Skills } from '../components/Skills';
import { Transit } from '../components/Transit/Transit';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/partials/BackToTop';
import { SectionReveal } from '../components/partials/SectionReveal';
import { ParallaxLayers } from '../components/partials/ParallaxLayers';

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <SplashScreen onComplete={() => setLoaded(true)} />}
      <LenisProvider>
        <Cursor />
        <ParallaxLayers />
        <Navigation />

        {/* The hero is on screen at first paint, so it keeps its own
            choreography. Everything below arrives from a different side —
            the page reads as a sequence rather than one long scroll. */}
        <Hero />

        <SectionReveal direction="zoom"><Marquee /></SectionReveal>
        <SectionReveal direction="left"><About /></SectionReveal>
        <SectionReveal direction="right"><WorkExperience /></SectionReveal>
        <SectionReveal direction="left"><Certificates /></SectionReveal>
        <SectionReveal direction="right"><Education /></SectionReveal>
        <SectionReveal direction="up"><Skills /></SectionReveal>
        <SectionReveal direction="zoom"><Transit /></SectionReveal>
        <SectionReveal direction="right"><Projects /></SectionReveal>
        <SectionReveal direction="left"><Contact /></SectionReveal>
        <SectionReveal direction="up"><Footer /></SectionReveal>

        <BackToTop />
      </LenisProvider>
    </>
  );
}
