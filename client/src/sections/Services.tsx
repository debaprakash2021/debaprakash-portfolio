import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Palette,
  Database,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Full-Stack Development',
    description:
      'End-to-end web application development using modern technologies. From responsive frontends to scalable backends, I build complete solutions that perform.',
    icon: Code2,
    features: [
      'React & Next.js Applications',
      'Node.js & Express APIs',
      'Database Design & Integration',
      'Authentication & Security',
    ],
    color: 'from-lime/20 to-lime/5',
    borderColor: 'border-lime/30',
    glowColor: 'shadow-lime/20',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description:
      'Creating intuitive and visually stunning user interfaces. I focus on user-centered design principles to deliver experiences that delight.',
    icon: Palette,
    features: [
      'Responsive Web Design',
      'Component Libraries',
      'Design Systems',
      'Prototyping & Wireframing',
    ],
    color: 'from-coral/20 to-coral/5',
    borderColor: 'border-coral/30',
    glowColor: 'shadow-coral/20',
  },
  {
    id: 3,
    title: 'Database Architecture',
    description:
      'Designing efficient and scalable database solutions. From schema design to query optimization, I ensure your data works for you.',
    icon: Database,
    features: [
      'MongoDB & PostgreSQL',
      'Schema Design',
      'Query Optimization',
      'Data Migration',
    ],
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20',
  },
  {
    id: 4,
    title: 'API Development',
    description:
      'Building robust and well-documented APIs that power your applications. RESTful or GraphQL, I create APIs that developers love to use.',
    icon: Globe,
    features: [
      'RESTful API Design',
      'Authentication (JWT/OAuth)',
      'API Documentation',
      'Third-party Integrations',
    ],
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setActiveService(id);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-4">
            What I Do
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Services I <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From concept to deployment, I provide comprehensive development
            services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card group relative p-8 rounded-3xl border ${service.borderColor} bg-gradient-to-b ${service.color} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${service.glowColor}`}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Spotlight effect */}
              {activeService === service.id && (
                <div
                  className="absolute pointer-events-none transition-opacity duration-300"
                  style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    width: 200,
                    height: 200,
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    opacity: 0.5,
                  }}
                />
              )}

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <service.icon className="w-7 h-7 text-white/80" />
                <Sparkles
                  className="absolute -top-1 -right-1 w-4 h-4 text-lime opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold mb-3 group-hover:text-lime transition-colors duration-300">
                {service.title}
              </h3>
              <p className="relative text-white/60 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="relative space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-white/70"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime/60 group-hover:bg-lime transition-colors" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative inline-flex items-center gap-2 text-sm text-white/60 hover:text-lime transition-colors duration-300 group/link"
              >
                <span>Discuss Your Project</span>
                <ArrowRight
                  size={16}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </a>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/50 mb-4">
            Have a project in mind that doesn't fit these categories?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-black font-medium rounded-full hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            <span>Let's Discuss</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
