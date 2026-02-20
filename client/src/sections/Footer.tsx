import { useEffect, useRef } from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(209, 226, 157, ${particle.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(209, 226, 157, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 border-t border-white/5"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center lg:text-left">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold mb-2 inline-block"
            >
              <span className="text-white">Deba</span>
              <span className="text-lime">prakash</span>
            </a>
            <p className="text-white/40 text-sm">
              © 2025 Debaprakash. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Home', href: '#hero' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-white/50 hover:text-lime transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-coral fill-coral animate-pulse" />
            <span>using React & Tailwind</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-lime hover:text-lime hover:shadow-glow transition-all duration-300"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
