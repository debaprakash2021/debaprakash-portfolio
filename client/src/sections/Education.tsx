import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    grade: 'CGPA: 7.9',
    period: 'Aug 2023 - Present',
    icon: GraduationCap,
    color: 'from-lime/20 to-lime/5',
    borderColor: 'border-lime/30',
    highlights: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Web Development',
      'Object-Oriented Programming',
      'Software Engineering',
    ],
  },
  {
    institution: 'Bhadrak Higher Secondary School',
    location: 'Bhadrak, Odisha',
    degree: 'Intermediate (12th Grade)',
    field: 'Science Stream',
    grade: 'Percentage: 88%',
    period: 'April 2019 - May 2021',
    icon: Award,
    color: 'from-coral/20 to-coral/5',
    borderColor: 'border-coral/30',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
  },
  {
    institution: 'Kapileswar High School',
    location: 'Kendujhar, Odisha',
    degree: 'Matriculation (10th Grade)',
    field: 'General Education',
    grade: 'Percentage: 88%',
    period: 'April 2018 - May 2019',
    icon: Award,
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    highlights: ['Foundation in Sciences', 'Mathematics', 'English'],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        '.timeline-line',
        { height: '0%' },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate education cards
      gsap.fromTo(
        '.edu-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate timeline dots
      gsap.fromTo(
        '.timeline-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-4">
            Academic Background
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Education <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            My academic path that shaped my technical foundation and problem-solving
            abilities.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/10">
            <div className="timeline-line absolute top-0 left-0 w-full bg-gradient-to-b from-lime to-coral" />
          </div>

          {/* Education Cards */}
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div
                key={edu.institution}
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`timeline-dot absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-lime border-4 border-black z-10`}
                />

                {/* Content */}
                <div
                  className={`edu-card ml-16 lg:ml-0 ${
                    index % 2 === 1 ? 'lg:order-2 lg:pl-12' : 'lg:pr-12 lg:text-right'
                  }`}
                >
                  <div
                    className={`p-6 rounded-2xl border ${edu.borderColor} bg-gradient-to-b ${edu.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
                  >
                    {/* Header */}
                    <div
                      className={`flex items-start gap-4 mb-4 ${
                        index % 2 === 1 ? '' : 'lg:flex-row-reverse'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                        <edu.icon className="w-6 h-6 text-white/80" />
                      </div>
                      <div className={index % 2 === 1 ? '' : 'lg:text-right'}>
                        <h3 className="font-bold text-lg">{edu.institution}</h3>
                        <div
                          className={`flex items-center gap-1 text-sm text-white/50 ${
                            index % 2 === 1 ? '' : 'lg:justify-end'
                          }`}
                        >
                          <MapPin size={12} />
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm text-white/60">{edu.field}</p>
                      <div
                        className={`flex items-center gap-4 text-sm ${
                          index % 2 === 1 ? '' : 'lg:justify-end'
                        }`}
                      >
                        <span className="flex items-center gap-1 text-lime">
                          <Award size={14} />
                          {edu.grade}
                        </span>
                        <span className="flex items-center gap-1 text-white/40">
                          <Calendar size={14} />
                          {edu.period}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 1 ? '' : 'lg:justify-end'
                      }`}
                    >
                      {edu.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/60"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden lg:block ${index % 2 === 1 ? 'lg:order-1' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 border border-lime/20 text-lime text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            Currently Learning
          </div>
          <p className="text-white/60">
            Currently pursuing my B.Tech in Computer Science with a focus on
            full-stack development, cloud computing, and system design. Always
            eager to learn new technologies and tackle challenging problems.
          </p>
        </div>
      </div>
    </section>
  );
}
