import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, Info } from 'lucide-react';
import ProjectModal, { type ProjectType } from '../components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const projects: ProjectType[] = [
  {
    title: 'Hospital Management System',
    subtitle: 'Full-Stack Web Application',
    description:
      'Full-stack hospital operations platform with patient records, appointments, billing, prescriptions, and real-time notifications — built with React, Node.js, MongoDB, and Socket.IO.',
    longDescription:
      'A comprehensive hospital operations platform covering patient records, doctor scheduling, appointment booking, billing, prescriptions, and real-time notifications — with four distinct role-based dashboards.\n\nThe architecture follows a clean monorepo split — client/ is a React 18 + Vite SPA using Redux Toolkit for state, and server/ is a modular Express 5 backend organized into 8 domain modules (auth, users, doctors, patients, appointments, billing, reports, prescriptions). The backend uses Socket.IO for real-time push events, Bull for background job queuing (email delivery), Multer for file uploads (up to 10 MB), Joi for request validation, and Nodemailer for automated email alerts.',
    details: [
      {
        title: 'Key Features',
        content: 'JWT Auth + RBAC: Token-based auth with 4 role tiers (Admin, Doctor, Patient, Receptionist).\nAppointment scheduling: Book, reschedule, cancel with live updates.\nReal-time notifications: Socket.IO live event push.\nBilling & invoicing: Generate and manage patient payments.\nPrescriptions: Create, update, and track Rx records.\nFile upload support: Medical docs, images up to 10 MB.',
      },
      {
        title: 'Role-Based Access',
        content: 'Admin: Full system access\nDoctor: Patients + Rx\nPatient: Records + bills\nReceptionist: Appointments + registration\n\nAll four roles get different scoped views and permissions enforced server-side via JWT middleware.',
      },
      {
        title: 'REST API Endpoints (8 Modules)',
        content: 'Auth & Users: /api/auth/login, /api/auth/register, /api/auth/me, /api/users\nDoctors & Patients: /api/doctors, /api/patients\nAppointments & Billing: /api/appointments, /api/billing\nPrescriptions & Reports: /api/prescriptions, /api/reports',
      },
      {
        title: 'Architecture & Tech Stack',
        content: 'Frontend: React 18, Vite 5, Redux Toolkit, React Router DOM v6, Axios.\nBackend: Node.js, Express 5, MongoDB + Mongoose 9, Socket.IO 4, JWT + Bcryptjs.\nSupporting Libraries: Joi, Multer, Nodemailer, Bull, dotenv, Nodemon, CORS.',
      }
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tech: [
      'React 18',
      'Node.js',
      'Express 5',
      'MongoDB',
      'Socket.IO',
      'Redux',
      'Bull'
    ],
    github: 'https://github.com/debaprakash2021/hospital-management-system',
    live: null,
    featured: true,
  },
  {
    title: 'AasaMedChem',
    subtitle: 'Enterprise B2B MedChem Platform',
    description:
      'A full-stack pharmaceutical inventory and order management system with multi-role access, a custom unit conversion engine, real-time analytics, and global audit logging.',
    longDescription:
      'A production-grade, multi-role B2B pharmaceutical supply-chain platform built for the AasaMedChem Hackathon. Features a custom unit conversion engine for microgram-precision pricing, role-based access control across three user types, real-time analytics, and a global audit trail — all deployed serverlessly on Vercel with Neon PostgreSQL.\n\nThe standout feature is the UnitConversionService — a custom server-side engine that handles pharmaceutical precision math (kg → g → mg → L → mL) using PostgreSQL Decimal(19,6) to avoid floating-point errors. When a buyer orders 500g of a product priced at ₹1000/kg, it automatically normalizes the pricing and deducts the correct base quantity from inventory — all server-side to prevent manipulation.',
    details: [
      {
        title: 'Key Features',
        content: 'Multi-role RBAC: Admin / Seller / Buyer roles enforced at route, API, and DB layers via Next.js Edge middleware + JWT sessions.\nUnit conversion engine: Dynamic kg→g→mg→L→mL pricing. Decimal(19,6) precision prevents floating-point errors.\nAnalytics dashboard: Recharts Pie + Line charts for revenue breakdown and 30-day order velocity. Server-rendered real-time data.\nGlobal audit trail: Every inventory update, order placement, and status change is logged in AuditLog.\nSmart cart & checkout: Multi-seller cart auto-splits into separate quotations per seller. Real-time inventory checks prevent overselling.\nPDF invoices & CSV export: Print-ready A4 invoices via @media print CSS. Client-side CSV export.',
      },
      {
        title: 'Project Stats & Tech Stack',
        content: 'Stats: 46 TypeScript files, ~3,220 lines of code, 12 database models, 3 user roles.\nTech Stack: Next.js 16 (App Router), React 19, TypeScript 5, Prisma ORM v5, Neon PostgreSQL, NextAuth.js v4, Tailwind CSS v4, Recharts 3, bcryptjs, JWT (stateless), Vercel Server Actions.',
      },
      {
        title: 'Database Schema Highlights',
        content: 'User: id, email, password, role, status, sellerId\nProduct: sku, baseUnitId, basePrice Decimal(19,6), gstRate, supportedUnits\nConversionFactor: productId, fromUnit, toUnit, factor Decimal(19,6)\nQuotation: 6-stage workflow (SUBMITTED → REVIEWED → APPROVED → PAID → COMPLETED / REJECTED)\nConversionLog: Immutable per-item audit for financial auditability\nAuditLog: userId, action, resourceType, resourceId, changes, createdAt',
      },
      {
        title: 'Architecture Flow',
        content: 'React UI → Server Actions / API Routes → Edge Middleware (JWT/RBAC) → Prisma ORM → Neon PostgreSQL',
      }
    ],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma ORM',
      'Neon PostgreSQL',
      'Tailwind CSS',
      'NextAuth.js',
      'Recharts'
    ],
    github: 'https://github.com/debaprakash2021/aasamedchem',
    live: null,
    featured: true,
  },
  {
    title: 'EduSync',
    subtitle: 'EdTech Platform Backend',
    description:
      'Production-grade Node.js backend for a full-scale EdTech platform, handling payments, live classes, quiz grading, subscriptions, real-time chat, and instructor earnings.',
    longDescription:
      'EduSync is a feature-complete EdTech backend built to support an online learning platform similar to Udemy or Teachable. It handles the full lifecycle of a course business — from student enrollment and learning progress tracking to instructor earnings, Razorpay payment processing, Agora-powered live classes, and automated invoice generation.\n\nThe backend is structured in a strict Routes → Controllers → Services → Models architecture with 18 route modules, 27 MongoDB models, and 19 dedicated service files, reflecting real enterprise-grade separation of concerns.',
    details: [
      {
        title: 'Tech Stack',
        content: 'Runtime: Node.js (ES Modules)\nFramework: Express.js v5\nDatabase: MongoDB + Mongoose v9\nReal-time: Socket.io v4.8\nAuthentication: JWT + bcrypt\nPayments: Razorpay (Orders API + Webhooks)\nLive Streaming: Agora RTC SDK\nFile Storage: Cloudinary + Multer\nPDF Generation: PDFKit\nScheduled Tasks: node-cron',
      },
      {
        title: 'Architecture',
        content: 'Total: 105 JavaScript files\nRoutes → Controllers → Services → Models pattern\n18 route modules, 27 Mongoose schemas, 19 service modules\nMiddleware: Auth, RBAC, rate limiting, validation, error handling\nSockets: Socket.io event handlers\nCron: Scheduled background jobs',
      },
      {
        title: 'Core Features',
        content: 'Authentication: Two-step OTP signup, JWT with rotation, RBAC\nCourse Management: Draft/Published lifecycle, MongoDB text search, 90% completion heuristic\nPayments & Earnings: Razorpay webhook verification, 70/30 revenue split, instructor withdrawals\nLive Classes: Agora server-side tokens, role-based joining\nQuiz Engine: Answer sanitization, auto-grading\nSecurity: Helmet, express-mongo-sanitize, hpp, 8 granular rate limiters',
      },
      {
        title: 'Database Models (27 total)',
        content: 'User, Course, Section, Lecture, Enrollment, WatchProgress, Quiz, QuizAttempt, Order, Earning, Withdrawal, Subscription, Plan, Coupon, CouponUsage, Invoice, LiveClass, OTP, RefreshToken, Artifact, Chat, Thread, Comment, Likes, Review, Bookmark, StudentNote',
      }
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tech: [
      'Node.js',
      'Express.js v5',
      'MongoDB v9',
      'Socket.io',
      'Razorpay',
      'Agora RTC',
      'JWT Auth',
      'PDFKit',
      'node-cron'
    ],
    github: 'https://github.com/debaprakash2021/edusync-backend',
    live: null,
    featured: true,
  },
  {
    title: 'RealEstate Platform',
    subtitle: 'Full-Stack Property Booking System',
    description:
      'An Airbnb-style property rental platform with MERN stack. Features Razorpay payment integration with escrow, MongoDB geospatial search ($near queries), multi-image upload via Cloudinary, and a 3-role RBAC system.',
    longDescription:
      'RealEstate Platform is a full-stack property booking system modeled after Airbnb, built with the MERN stack (MongoDB, Express.js, React 18, Node.js). The backend follows a clean Controller → Service → Model architecture with a dedicated service layer for business logic. It implements JWT authentication with access + refresh token rotation, bcrypt password hashing (12 salt rounds), and email OTP verification via Nodemailer. A three-role RBAC system (guest, host, admin) gates every route on both the frontend and the API layer using custom auth and role middlewares. The property schema stores GeoJSON coordinates and uses a 2dsphere MongoDB index for proximity-based $near queries, rendered as an interactive map via React Leaflet. The booking engine calculates dynamic pricing (base rate × nights + cleaning/service/security fees, with weekly and monthly discount tiers), checks for date conflicts using a static Booking.hasConflict() method, and validates guest capacity against listing limits. Payment is powered by Razorpay — the backend creates a signed order, the frontend renders the Razorpay checkout, and verification is done with HMAC-SHA256 signature matching. Funds move through an escrow-style flow (held → released/refunded) with three cancellation policies. Multi-image upload uses Multer + Cloudinary with thumbnail and medium variants stored per image. The platform includes a full admin panel for user and property management with paginated search, a host analytics dashboard aggregating revenue, booking stats, and average ratings via parallel Promise.all queries, a 6-dimension review system, and a real-time notifications panel. The app is fully containerised with Docker and docker-compose, and all routes include rate limiting, Helmet security headers, express-mongo-sanitize, and input validation via express-validator.',
    details: [
      {
        title: 'Backend Structure',
        content: 'Node.js 18 + Express.js 4.18\nController → Service → Model pattern\n11 route groups, all prefixed /api/\nGlobal error handler middleware\nWinston + daily-rotate-file logging\nRate limiting + Helmet + CORS',
      },
      {
        title: 'Frontend Structure',
        content: 'React 18 + Vite 5 + TailwindCSS 3\nReact Router v6 with protected routes\nAuthContext + ThemeContext (dark mode)\nPendingAction pattern (redirect after login)\nAxios with base URL config\nReact Hot Toast + Lucide icons',
      },
      {
        title: 'Database Models (9 total)',
        content: 'User: name, email, password, role, avatar, phone, bio, hostInfo, stats\nProperty: title, description, location+GeoJSON, images, pricing, details, amenities, blockedDates, ratings, status\nBooking: property, guest, host refs, checkIn/Out, pricing breakdown, payment, cancellation\nPayment: amount, status, method, razorpayOrderId, signature\nReview: ratings, comment, hostResponse\nMessage, Conversation, Notification, Favorite',
      },
      {
        title: 'Key API Routes',
        content: 'Auth: /register, /login, /refresh-token, /send-otp\nProperties: /api/properties (GET, POST, PUT, DEL)\nBookings: /api/bookings, /my-bookings, /host-bookings, /confirm, /cancel\nPayments: /create-order, /verify, /release-funds, /refund\nAdmin: /users, /properties/approve',
      },
      {
        title: 'Key Features',
        content: 'GeoJSON + 2dsphere Index for location search\nRazorpay Escrow Payment Flow\nStatic Booking.hasConflict() + Property.isAvailable()\nMongoose Virtuals\nPendingAction Auth Pattern\n9 Strategic MongoDB Indexes on Property\nCloudinary multi-size image upload\nRole-Gated Routes (frontend + backend)',
      },
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tech: [
      'React 18',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Razorpay',
      'Cloudinary',
      'TailwindCSS',
      'Docker',
      'JWT Auth',
      'React Leaflet',
      'Winston'
    ],
    github: 'https://github.com/debaprakash2021/realestate-platform',
    live: 'https://realestate-platforms.vercel.app/',
    featured: true,
  },
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
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

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
                    className={`flex flex-wrap gap-4 ${
                      index % 2 === 1 ? 'lg:justify-end' : ''
                    }`}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group/link inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-lime hover:text-black border border-white/10 rounded-full text-white/90 transition-all"
                    >
                      <Info size={16} />
                      <span className="text-sm font-medium">View Details</span>
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 px-4 py-2 text-white/80 hover:text-lime transition-colors"
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
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
