import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
// Hero portrait is served from public/mr_jena.jpg

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [imgSrc, setImgSrc] = useState('/mrjenaa.png');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline character animation
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.03 },
          0.2
        );
      }

      // Subheadline blur fade
      tl.fromTo(
        '.subheadline',
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1 },
        0.4
      );

      // Description fade
      tl.fromTo(
        '.description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // CTA buttons
      tl.fromTo(
        '.cta-group',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      // Social links
      tl.fromTo(
        '.social-links',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.9
      );

      // Image reveal with scale
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        0.3
      );

      // Floating badges animation
      tl.fromTo(
        '.floating-badge',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(2)' },
        1
      );

      // Parallax on scroll — only on desktop to avoid layout breakage on mobile
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        gsap.to(imageRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(textRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text into characters
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* ── MOBILE / TABLET: stacked layout ── */}
      {/* ── DESKTOP: diagonal / overlapping layout ── */}

      {/* Text Content — flex column on mobile, absolute on desktop */}
      <div
        ref={textRef}
        className="
          relative z-20 flex flex-col justify-center
          pt-28 pb-8 px-6
          sm:px-10
          lg:absolute lg:top-32 lg:left-12 lg:pt-0 lg:pb-0 lg:px-0 lg:max-w-xl
        "
      >
        {/* Greeting */}
        <div className="mb-5 overflow-hidden">
          <span className="inline-block text-lime text-xs font-medium tracking-[0.3em] uppercase">
            Full-Stack Developer
          </span>
        </div>

        {/* Headline with Hollow Text Effect */}
        <div className="mb-5">
          <p className="text-white/60 text-lg mb-2">Hey, I'm</p>
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none overflow-hidden"
          >
            <span
              className="block hollow-text"
              style={{
                WebkitTextStroke: '2px #d1e29d',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(209, 226, 157, 0.3)',
              }}
            >
              {splitText('DEBA')}
            </span>
            <span
              className="block hollow-text mt-1"
              style={{
                WebkitTextStroke: '2px #f7784e',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(247, 120, 78, 0.3)',
              }}
            >
              {splitText('PRAKASH')}
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="subheadline text-lg lg:text-2xl text-white/70 font-light mb-4">
          Building digital experiences that matter
        </p>

        {/* Description */}
        <p className="description text-sm lg:text-base text-white/50 max-w-md mb-8 leading-relaxed">
          Computer Science student at LPU crafting modern web applications
          with cutting-edge technologies. Passionate about creating seamless
          user experiences and robust backend systems.
        </p>

        {/* CTA Buttons */}
        <div className="cta-group flex flex-wrap gap-4 mb-8">
          <button
            onClick={scrollToProjects}
            className="group px-6 py-3 bg-lime text-black font-medium rounded-full hover:shadow-glow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            View My Work
            <ArrowDown
              size={18}
              className="group-hover:translate-y-1 transition-transform"
            />
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-coral hover:text-coral transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="social-links flex items-center gap-3">
          <a
            href="https://github.com/debaprakash2021"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/debaprakashjena/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:debaprakashjena2021@gmail.com"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Profile Image — below text on mobile, bottom-right on desktop */}
      <div
        ref={imageRef}
        className="
          relative w-full
          h-[55vw] min-h-[280px] max-h-[420px]
          sm:h-[50vw] sm:max-h-[480px]
          lg:absolute lg:bottom-0 lg:right-0 lg:w-[55%] lg:h-[85vh] lg:max-h-none
          xl:w-[50%]
        "
      >
        {/* Glow effect behind image */}
        <div className="absolute -inset-4 bg-gradient-to-tl from-lime/10 via-coral/10 to-transparent rounded-tl-[60px] blur-3xl opacity-60" />

        {/* Image container */}
        <div className="relative h-full overflow-hidden rounded-tl-[40px] sm:rounded-tl-[60px] lg:rounded-tl-[100px] border-l border-t border-white/10">
          <img
            src={imgSrc}
            alt="Profile"
            onError={() => {
              if (imgSrc !== '/mrjenaa.png') setImgSrc('/mrjenaa.png');
            }}
            className="w-full h-full object-cover object-top"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Floating badge - Experience — hidden on very small screens */}
        <div className="floating-badge hidden sm:block absolute bottom-20 left-4 lg:bottom-32 lg:-left-16 glass rounded-2xl px-4 py-3 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
              <span className="text-lime text-lg">💻</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">3+</p>
              <p className="text-white/50 text-xs">Years Coding</p>
            </div>
          </div>
        </div>

        {/* Floating badge - Projects — hidden on very small screens */}
        <div
          className="floating-badge hidden sm:block absolute top-6 left-4 lg:top-32 lg:-left-12 glass rounded-2xl px-4 py-3 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center">
              <span className="text-coral text-lg">🚀</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">10+</p>
              <p className="text-white/50 text-xs">Projects Built</p>
            </div>
          </div>
        </div>

        {/* Stats bar at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 glass border-t border-white/10 p-3 lg:p-6">
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-xl lg:text-3xl font-bold text-gradient">100+</p>
              <p className="text-white/50 text-xs">DSA Problems</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-xl lg:text-3xl font-bold text-gradient">7.9</p>
              <p className="text-white/50 text-xs">CGPA</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-xl lg:text-3xl font-bold text-gradient">3★</p>
              <p className="text-white/50 text-xs">HackerRank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden lg:flex absolute bottom-8 left-12 flex-col items-center gap-2 z-20">
        <span className="text-white/40 text-xs tracking-wider rotate-90 origin-left translate-x-4">SCROLL</span>
      </div>
    </section>
  );
}
