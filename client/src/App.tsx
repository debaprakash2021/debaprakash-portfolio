import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Certificates from './sections/Certificates';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Fade in sections on scroll
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-black text-white noise-overlay">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Services />
        <Certificates />
        <Education />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
