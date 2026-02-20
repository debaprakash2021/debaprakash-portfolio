import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Terminal,
  Layers,
  Server,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['C', 'C++', 'JavaScript', 'Java', 'PHP'],
    color: 'from-lime/20 to-lime/5',
    borderColor: 'border-lime/30',
  },
  {
    title: 'Frameworks',
    icon: Layers,
    skills: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'HTML/CSS'],
    color: 'from-coral/20 to-coral/5',
    borderColor: 'border-coral/30',
  },
  {
    title: 'Tools & Platforms',
    icon: Server,
    skills: ['MongoDB', 'PostgreSQL', 'GitHub', 'Postman', 'Vercel', 'Cloudinary'],
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Soft Skills',
    icon: Terminal,
    skills: ['Problem-Solving', 'Creative Thinking', 'Communication', 'Decision Making'],
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
  },
];

const techStack = [
  { name: 'React', icon: '⚛️', level: 90 },
  { name: 'Node.js', icon: '🟢', level: 85 },
  { name: 'JavaScript', icon: '📜', level: 90 },
  { name: 'TypeScript', icon: '🔷', level: 80 },
  { name: 'MongoDB', icon: '🍃', level: 75 },
  { name: 'PostgreSQL', icon: '🐘', level: 70 },
  { name: 'Git', icon: '🔀', level: 85 },
  { name: 'Tailwind', icon: '🎨', level: 90 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill cards
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 50, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate progress bars
      gsap.fromTo(
        '.progress-bar',
        { width: '0%' },
        {
          width: (_i, el) => el.dataset.level + '%',
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech-stack',
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
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-4">
            My Expertise
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive toolkit I've built through hands-on project experience
            and continuous learning.
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`skill-card group relative p-6 rounded-2xl border ${category.borderColor} bg-gradient-to-b ${category.color} backdrop-blur-sm hover:scale-105 transition-all duration-500 custom-expo`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="w-6 h-6 text-white/80" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">{category.title}</h3>

              {/* Skills List */}
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-white/60 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime/60" />
                    {skill}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Tech Stack Progress Bars */}
        <div className="tech-stack max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-10">
            Proficiency Levels
          </h3>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{tech.icon}</span>
                    <span className="text-white/80 font-medium">
                      {tech.name}
                    </span>
                  </div>
                  <span className="text-white/50 text-sm">{tech.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-gradient-to-r from-lime to-coral rounded-full group-hover:shadow-glow transition-shadow duration-300"
                    data-level={tech.level}
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '100+', label: 'DSA Problems Solved' },
            { value: '3★', label: 'HackerRank Rating' },
            { value: '7.9', label: 'Current CGPA' },
            { value: '3+', label: 'Major Projects' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-lime/30 transition-colors duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
