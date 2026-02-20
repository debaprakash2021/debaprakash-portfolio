import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Send, ArrowUpRight, Copy, Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// FIX: Use env variable instead of hardcoded localhost
// Set VITE_API_URL in client/.env for local dev and in your deployment dashboard for production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-text', { scale: 0.8, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.contact-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('debaprakashjena2021@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="w-full px-6 lg:px-12">
        <div ref={ctaRef} className="text-center mb-20">
          <span className="inline-block text-lime text-sm font-medium tracking-wider uppercase mb-4">Get In Touch</span>
          <h2 className="cta-text text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold leading-none mb-6">
            <span className="text-gradient">Let's Talk</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and ideas.
          </p>
        </div>

        <div className="contact-grid grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

            <div className="contact-card group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-lime/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-lime" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 mb-1">Email</p>
                  <p className="text-white font-medium">debaprakashjena2021@gmail.com</p>
                </div>
                <button onClick={copyEmail} className="p-2 rounded-lg bg-white/5 hover:bg-lime/20 transition-colors" title="Copy email">
                  {copied ? <Check className="w-5 h-5 text-lime" /> : <Copy className="w-5 h-5 text-white/50" />}
                </button>
              </div>
            </div>

            <div className="contact-card group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-lime/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Phone</p>
                  <p className="text-white font-medium">+91-8984766567</p>
                </div>
              </div>
            </div>

            <div className="contact-card group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-lime/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Location</p>
                  <p className="text-white font-medium">Phagwara, Punjab, India</p>
                </div>
              </div>
            </div>

            <div className="contact-card pt-6">
              <p className="text-sm text-white/50 mb-4">Connect with me</p>
              <div className="flex gap-4">
                <a href="https://github.com/debaprakash2021" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-lime/30 hover:bg-lime/5 transition-all duration-300 group">
                  <Github className="w-5 h-5 text-white/60 group-hover:text-lime transition-colors" />
                  <span className="text-sm">GitHub</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://www.linkedin.com/in/debaprakashjena/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm">LinkedIn</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-white/50 mb-2">Your Name</label>
                <input type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-lime/50 focus:outline-none focus:ring-1 focus:ring-lime/50 transition-all"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Your Email</label>
                <input type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-lime/50 focus:outline-none focus:ring-1 focus:ring-lime/50 transition-all"
                  placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Message</label>
                <textarea value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-lime/50 focus:outline-none focus:ring-1 focus:ring-lime/50 transition-all resize-none"
                  placeholder="Tell me about your project..." />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full px-6 py-3 bg-lime text-black font-medium rounded-xl hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? <span>Sending...</span> : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
