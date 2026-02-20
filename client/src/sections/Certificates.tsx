import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  ExternalLink,
  Trophy,
  Target,
  Star,
  Code,
  Cloud,
  Globe,
  Monitor,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: 'ChatGPT-4 Prompt Engineering',
    subtitle: 'ChatGPT, Generative AI & LLM',
    issuer: 'Infosys Springboard',
    date: 'Jul 2025 - Aug 2025',
    link: 'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_014157693153288192147/overview',
    icon: Monitor,
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Cloud Computing',
    subtitle: 'Fundamentals & Architecture',
    issuer: 'NPTEL',
    date: 'Jan 2025 - Apr 2025',
    link: 'https://archive.nptel.ac.in/noc/B2C/candidate_login/candidate_scores.php?courseid=noc25-cs11',
    icon: Cloud,
    color: 'from-sky-500/20 to-sky-500/5',
    borderColor: 'border-sky-500/30',
  },
  {
    title: 'IELTS Advance English',
    subtitle: 'Professional English Communication',
    issuer: 'Udemy',
    date: 'Sept 2024 - Oct 2024',
    link: 'https://www.udemy.com/certificate/UC-d403b50a-90d9-4326-a29e-d092462c2284/',
    icon: Globe,
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
  },
  {
    title: 'Responsive Web Design',
    subtitle: 'HTML, CSS & Modern Layouts',
    issuer: 'FreeCodeCamp',
    date: 'Sept 2023 - Jan 2024',
    link: 'https://www.freecodecamp.org/fccbf6324b4-1e67-4066-b1f5-f040b31f594c',
    icon: Code,
    color: 'from-lime/20 to-lime/5',
    borderColor: 'border-lime/30',
  },
];

const achievements = [
  {
    title: '100+ DSA Problems',
    description: 'Solved on LeetCode & GeeksforGeeks',
    date: 'Aug 2025',
    icon: Code,
    color: 'text-lime',
    bgColor: 'bg-lime/10',
  },
  {
    title: '3★ Problem Solving',
    description: 'Achieved on HackerRank',
    date: 'Jul 2025',
    icon: Star,
    color: 'text-coral',
    bgColor: 'bg-coral/10',
  },
  {
    title: 'C++ Programming',
    description: 'OOP & DSA Training Completed',
    date: 'Jun - Jul 2025',
    icon: Target,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate certificate cards
      gsap.fromTo(
        '.cert-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.certs-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate achievements
      gsap.fromTo(
        '.achievement-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-4">
            Credentials
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Certificates & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Continuous learning and skill validation through industry-recognized
            certifications.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="certs-grid grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {certificates.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`cert-card group relative p-6 rounded-2xl border ${cert.borderColor} bg-gradient-to-b ${cert.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <cert.icon className="w-6 h-6 text-white/80" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-lime transition-colors duration-300 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-1">{cert.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{cert.issuer}</span>
                    <span className="text-xs text-white/40">{cert.date}</span>
                  </div>
                </div>

                {/* External link icon */}
                <ExternalLink
                  size={16}
                  className="text-white/30 group-hover:text-lime transition-colors flex-shrink-0"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-lime" />
            Key Achievements
          </h3>

          <div className="achievements-grid grid sm:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="achievement-card p-6 rounded-2xl border border-white/10 bg-white/[0.02] text-center hover:border-lime/30 transition-colors duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-full ${achievement.bgColor} flex items-center justify-center mx-auto mb-4`}
                >
                  <achievement.icon className={`w-7 h-7 ${achievement.color}`} />
                </div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm text-white/60 mb-2">
                  {achievement.description}
                </p>
                <span className="text-xs text-white/40">{achievement.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Training Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="p-8 rounded-3xl border border-lime/20 bg-gradient-to-b from-lime/10 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-lime/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-lime" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  C++ Programming Training
                </h3>
                <p className="text-white/60 mb-4">
                  Completed intensive training in C++ fundamentals, OOP concepts,
                  and core data structures. Developed mini-projects including a
                  Student Record System and Browser History Manager.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['OOP', 'DSA', 'STL', 'File Handling'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-lime/10 border border-lime/20 rounded-full text-lime"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
