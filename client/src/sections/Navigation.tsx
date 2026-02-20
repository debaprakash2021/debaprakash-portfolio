import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 custom-expo ${
          isScrolled
            ? 'glass py-3 border-b border-white/5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo with hollow text effect */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-xl font-black tracking-tighter group"
          >
            <span 
              className="transition-all duration-300 group-hover:text-shadow-glow"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.8)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DEBA
            </span>
            <span 
              className="transition-all duration-300"
              style={{
                WebkitTextStroke: '1.5px #d1e29d',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PRAKASH
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-white/70 hover:text-lime transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="hidden lg:block px-5 py-2.5 bg-lime text-black text-sm font-medium rounded-full hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-lime transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-dark-secondary border border-white/10 rounded-2xl p-6 transition-all duration-500 custom-expo ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-lg text-white/80 hover:text-lime transition-colors duration-300 py-2 border-b border-white/5 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="mt-4 px-5 py-3 bg-lime text-black text-center font-medium rounded-full"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
