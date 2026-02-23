<div align="center">

# ✦ Debaprakash Jena — Personal Portfolio

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-debaprakash--portfolio.vercel.app-lime?style=for-the-badge&color=84cc16)](https://debaprakash-portfolio.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CI](https://img.shields.io/github/actions/workflow/status/debaprakash2021/debaprakash-portfolio/ci.yml?branch=main&style=for-the-badge&label=CI)](https://github.com/debaprakash2021/debaprakash-portfolio/actions)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> *A high-performance, animation-driven developer portfolio built with React 19, GSAP, and a Node.js/Express backend — crafted to leave a lasting impression.*

<br/>

![Portfolio Preview](client/public/hero-portrait.jpg)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Sections Overview](#-sections-overview)
- [Contact](#-contact)

---

## 🚀 About

This is my personal developer portfolio — a full-stack web application designed to showcase my skills, projects, certificates, and background as a **Full-Stack Developer**. It features cinematic GSAP animations, a responsive layout with a diagonal design language, and a real backend-powered contact form.

Built from scratch with performance and developer experience in mind: TypeScript end-to-end, Vite's lightning-fast bundling, and a clean monorepo structure.

---

## ✨ Features

- **Cinematic Animations** — GSAP-powered entrance animations, character-split text reveals, parallax scrolling, and staggered scroll-triggered transitions throughout every section
- **Responsive Design** — Fully adaptive layout from mobile to 4K displays using Tailwind CSS
- **Working Contact Form** — Messages delivered directly to inbox via a Node.js + Nodemailer backend with CORS protection
- **Diagonal / Asymmetric Layout** — A distinctive design language that stands out from typical portfolio templates
- **Floating Badges & Stats** — Live stat showcases (CGPA, DSA count, HackerRank rating) rendered with glass-morphism UI
- **CI/CD Integrated** — Automated linting and build checks on every push via GitHub Actions
- **SEO Ready** — Sitemap, `robots.txt`, web manifest, and optimized meta tags included
- **PWA Support** — Web app manifest for installability on mobile devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Library |
| TypeScript | 5.9 | Type Safety |
| Vite | 7 | Build Tool & Dev Server |
| Tailwind CSS | 3.4 | Utility-first Styling |
| GSAP + @gsap/react | 3.14 | Animations & ScrollTrigger |
| Lucide React | 0.562 | Icon Library |
| Radix UI | Latest | Accessible UI Primitives |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 5 | HTTP Server |
| TypeScript | 5.9 | Type Safety |
| Nodemailer | 7 | Email Delivery |
| dotenv | 17 | Environment Config |
| CORS | 2.8 | Cross-Origin Policy |

### DevOps & Tooling
- **Deployment:** Vercel (Frontend)
- **CI/CD:** GitHub Actions
- **Version Control:** Git + GitHub
- **Package Manager:** npm (workspaces)

---

## 📁 Project Structure

```
debaprakash-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── client/                     # React frontend (Vite)
│   ├── public/
│   │   ├── hero-portrait.jpg
│   │   ├── project-*.jpg       # Project thumbnails
│   │   ├── sitemap.xml
│   │   ├── robots.txt
│   │   └── manifest.json
│   ├── src/
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Certificates.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── components/ui/      # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/utils.ts        # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
├── server/                     # Express backend
│   ├── src/
│   │   └── index.ts            # Server entry (health check + contact API)
│   ├── .env.example
│   └── package.json
├── .gitignore
└── package.json                # Root workspace config
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v20 or higher
- **npm** v9 or higher
- A **Gmail account** with an [App Password](https://support.google.com/accounts/answer/185833) for the contact form

### 1. Clone the Repository

```bash
git clone https://github.com/debaprakash2021/debaprakash-portfolio.git
cd debaprakash-portfolio
```

### 2. Install Dependencies

Install both client and server dependencies:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Configure Environment Variables

```bash
# Client
cp client/.env.example client/.env

# Server
cp server/.env.example server/.env
```

Fill in your values (see [Environment Variables](#-environment-variables) below).

### 4. Run in Development Mode

Open two terminal tabs:

```bash
# Terminal 1 — Frontend
cd client
npm run dev
# → http://localhost:5173

# Terminal 2 — Backend
cd server
npm run dev
# → http://localhost:5000
```

---

## 🔐 Environment Variables

### `client/.env`

```env
VITE_API_URL=http://localhost:5000
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (update to your deployed server URL in production) |

### `server/.env`

```env
PORT=5000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server |
| `EMAIL_USER` | Gmail address used to send contact form emails |
| `EMAIL_PASS` | Gmail App Password (not your account password) |
| `CLIENT_URL` | Your deployed frontend URL for CORS whitelisting |

> ⚠️ **Never commit `.env` files.** They are already in `.gitignore`.

---

## 📦 Scripts

### Client (`/client`)

```bash
npm run dev        # Start Vite development server
npm run build      # Type-check + production build
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

### Server (`/server`)

```bash
npm run dev        # Start with nodemon (hot-reload)
npm run build      # Compile TypeScript to /dist
npm start          # Run compiled production server
```

---

## ⚙️ CI/CD Pipeline

Every push and pull request to `main` triggers the GitHub Actions CI workflow:

```
Push to main
    ├── build-client
    │   ├── Checkout code
    │   ├── Setup Node.js 20
    │   ├── npm ci (clean install)
    │   ├── ESLint check
    │   └── Vite production build
    └── build-server
        ├── Checkout code
        ├── Setup Node.js 20
        ├── npm ci (clean install)
        └── TypeScript compile check
```

Secrets like `VITE_API_URL` are injected at build time via GitHub repository secrets.

---

## 🗂️ Sections Overview

| Section | Description |
|---|---|
| **Hero** | Animated landing with character-split headline, parallax portrait, floating badges, and stats (CGPA, DSA, HackerRank) |
| **Skills** | Categorized skill cards (Languages, Frameworks, Tools, Soft Skills) + animated tech stack progress bars |
| **Projects** | Showcase of real-world projects with thumbnails, descriptions, and live/repo links |
| **Services** | What I offer as a developer — frontend, backend, and full-stack services |
| **Education** | Academic background at LPU with timeline layout |
| **Certificates** | Professional certifications and achievements |
| **Contact** | Functional contact form backed by the Express + Nodemailer API |

---

## 📬 Contact

<div>

**Debaprakash Jena**
Full-Stack Developer | Computer Science @ LPU

[![Portfolio](https://img.shields.io/badge/Portfolio-debaprakash--portfolio.vercel.app-lime?style=flat-square&color=84cc16)](https://debaprakash-portfolio.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-debaprakashjena-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/debaprakashjena/)
[![GitHub](https://img.shields.io/badge/GitHub-debaprakash2021-181717?style=flat-square&logo=github)](https://github.com/debaprakash2021)
[![Email](https://img.shields.io/badge/Email-debaprakashjena2021@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:debaprakashjena2021@gmail.com)

</div>

---

<div align="center">

Designed & built with ❤️ by **Debaprakash Jena**
<br/>
⭐ If you found this project useful or inspiring, consider leaving a star!

</div>
