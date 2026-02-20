import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Momentum',
    subtitle: 'Professional Video Streaming Platform',
    description:
      'A full-featured video streaming platform with secure authentication, video upload orchestration, access control, and smooth streaming workflows. Built with modern React architecture and robust backend.',
    image: '/project-momentum.jpg',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express.js',
      'shadcn/ui',
      'Framer Motion',
      'Tailwind CSS',
    ],
    github: 'https://github.com/debaprakash2021/Momentum',
    live: null,
    featured: true,
  },
  {
    title: 'Mahalakshmi Vendor Portal',
    subtitle: 'Vendor Management System',
    description:
      'A comprehensive MERN-based vendor platform featuring catalog management, order processing, authentication, and role-based access control. Includes real-time notifications and invoice generation.',
    image: '/project-mahalakshmi.jpg',
    tech: [
      'React.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'RESTful APIs',
    ],
    github: 'https://github.com/debaprakash2021/Mahalaxmi-Vendor',
    live: null,
    featured: true,
  },
  {
    title: 'Labour Laws Portal',
    subtitle: 'Complaint & Information System',
    description:
      'A full-stack complaint and information portal built with PHP and SQL. Features structured complaint submissions, tracking system, and role-based dashboards for users and administrators.',
    image: '/project-labour.jpg',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SQL', 'Apache Server'],
    github: 'https://github.com/debaprakash2021/project',
    live: null,
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each project card
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        gsap.fromTo(
          project,
          {
            opacity: 0,
            y: 80,
            rotateX: index % 2 === 0 ? -5 : 5,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Connector line animation
      gsap.fromTo(
        '.connector-line',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack
            development, from concept to deployment.
          </p>
        </div>

        {/* Projects Grid - Broken Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* SVG Connector Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ zIndex: 0 }}
          >
            <path
              className="connector-line"
              d="M 200 200 Q 600 300 400 600 Q 200 900 600 1000"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1e29d" />
                <stop offset="100%" stopColor="#f7784e" />
              </linearGradient>
            </defs>
          </svg>

          {/* Projects */}
          <div className="relative z-10 space-y-20 lg:space-y-32">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => { projectRefs.current[index] = el; }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`relative group ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-lime/20 to-coral/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 custom-expo"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-lime hover:text-black transition-all duration-300"
                          >
                            <Github size={20} />
                          </a>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-coral hover:text-white transition-all duration-300"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-lime text-black text-xs font-semibold rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}
                >
                  <span className="text-coral text-sm font-medium mb-2 block">
                    {project.subtitle}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-lime transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div
                    className={`flex flex-wrap gap-2 mb-6 ${
                      index % 2 === 1 ? 'lg:justify-end' : ''
                    }`}
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/70 hover:border-lime/50 hover:text-lime transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div
                    className={`flex gap-4 ${
                      index % 2 === 1 ? 'lg:justify-end' : ''
                    }`}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-white/80 hover:text-lime transition-colors"
                    >
                      <Github size={18} />
                      <span className="text-sm">View Code</span>
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-20">
          <a
            href="https://github.com/debaprakash2021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white hover:border-lime hover:text-lime transition-all duration-300 group"
          >
            <Github size={18} />
            <span>View All Projects on GitHub</span>
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
