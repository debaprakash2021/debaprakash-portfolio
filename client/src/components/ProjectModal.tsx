import { X, Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

export interface ProjectType {
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  details?: { title: string; content: string }[];
  image: string;
  tech: string[];
  github: string;
  live: string | null;
  featured: boolean;
}

interface ProjectModalProps {
  project: ProjectType | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 -mt-20 relative z-10">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-2 px-3 py-1 bg-black/50 rounded-full backdrop-blur-md border border-white/10">
            {project.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mb-10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-lime hover:text-black border border-white/20 rounded-full text-white transition-all duration-300 font-medium"
            >
              <Github size={18} />
              <span>Source Code</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral hover:bg-coral/80 text-white rounded-full transition-all duration-300 font-medium"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">Overview</h3>
              <p className="text-white/70 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </section>

            {project.details && project.details.map((detail, index) => (
              <section key={index}>
                <h3 className="text-xl font-semibold mb-4 text-white/90 border-b border-white/10 pb-2">{detail.title}</h3>
                <ul className="list-disc pl-5 space-y-2 text-white/70">
                  {detail.content.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
