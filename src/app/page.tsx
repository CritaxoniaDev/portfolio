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

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <SplashScreen onComplete={() => setLoaded(true)} />}
      <LenisProvider>
        <Cursor />
        <Navigation />
        <Hero />
        <Marquee />
        <About />
        <WorkExperience />
        <Certificates />
        <Education />
        <Skills />
        <Transit />
        <Projects />
        <Contact />
        <Footer />
        <BackToTop />
      </LenisProvider>
    </>
  );
}
