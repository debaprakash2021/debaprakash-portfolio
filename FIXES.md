# Portfolio Fix Guide — 5 Issues + Step-by-Step Solutions

---

## New Folder Structure

```
portfolio/
├── client/                    ← All frontend code (was: root level)
│   ├── public/                ← Static assets (images, favicon)
│   ├── src/
│   │   ├── sections/          ← Page sections (Hero, Contact, etc.)
│   │   ├── components/ui/     ← Reusable UI components
│   │   ├── lib/utils.ts
│   │   ├── hooks/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.local             ← Your local env (gitignored)
│   ├── .env.example           ← Safe template to commit
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── server/                    ← Backend (was: nested inside frontend)
│   ├── src/index.ts
│   ├── .env                   ← Your real secrets (gitignored)
│   ├── .env.example           ← Safe template to commit
│   └── package.json
│
├── .gitignore                 ← Protects .env files from being pushed
├── .github/workflows/ci.yml
└── package.json               ← Root scripts to run both together
```

---

## Issue 1 — Third-party `kimi-plugin-inspect-react` breaks production build

**File:** `client/vite.config.ts`

**Problem:** The original `vite.config.ts` imported `kimi-plugin-inspect-react`, a debug plugin
that is not part of standard Vite/React tooling. It caused build failures in CI/CD because
this package is not reliably available and should never run in production.

**Fix applied in:** `client/vite.config.ts`

**Before:**
```ts
import { inspectAttr } from 'kimi-plugin-inspect-react'
plugins: [
  react(),
  ...(process.env.NODE_ENV !== 'production' ? [inspectAttr()] : []),
]
```

**After:**
```ts
plugins: [react()]
```

Also removed from `client/package.json` devDependencies.

**What to do on GitHub:**
1. Go to your repo → Issues → New Issue
2. Title: `[Bug] kimi-plugin-inspect-react causes build failure in production`
3. Body: "The vite.config.ts imports a third-party debug plugin that is not in npm registry / CI environment, causing `npm run build` to fail."

---

## Issue 2 — Contact form hardcodes `localhost:5000` (breaks in production)

**File:** `client/src/sections/Contact.tsx`

**Problem:** The contact form sends requests to `http://localhost:5000/api/contact` directly in
the code. When the site is deployed (Vercel, Netlify, GitHub Pages), `localhost:5000` doesn't
exist — the server is hosted elsewhere. This causes the form to silently fail.

**Fix applied in:** `client/src/sections/Contact.tsx`

**Before:**
```ts
const response = await fetch('http://localhost:5000/api/contact', { ... })
```

**After:**
```ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await fetch(`${API_URL}/api/contact`, { ... })
```

**What to do:**

Local development — create `client/.env.local`:
```
VITE_API_URL=http://localhost:5000
```

Production (Vercel/Netlify) — add environment variable in your hosting dashboard:
```
VITE_API_URL=https://your-server.onrender.com
```

**GitHub Issue Title:** `[Bug] Contact form hardcodes localhost — breaks in production`

---

## Issue 3 — Server CORS blocks requests from deployed frontend

**File:** `server/src/index.ts`

**Problem:** The server used `cors()` with no configuration, which in some versions of Express 5
defaults to blocking cross-origin requests. Even when it allows all origins in dev, it gives no
way to restrict properly in production.

**Fix applied in:** `server/src/index.ts`

**After:**
```ts
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, methods: ['POST', 'GET'] }));
```

**What to do:**

Add to `server/.env`:
```
CLIENT_URL=https://your-deployed-frontend.vercel.app
```

**GitHub Issue Title:** `[Bug] CORS not configured — contact form fails from deployed frontend`

---

## Issue 4 — `.env` files committed / `node_modules` not ignored properly

**File:** `.gitignore` (missing or incomplete)

**Problem:** The original repo had `.env` files either committed or not properly gitignored.
Committing `.env` exposes your Gmail password and other secrets publicly on GitHub.
Also `dist/` output was committed.

**Fix applied in:** `.gitignore`

Key lines added:
```
.env
client/.env
client/.env.local
server/.env
client/dist/
server/dist/
node_modules/
```

**What to do:**

If `.env` was already committed, run these commands in your terminal:
```bash
git rm --cached server/.env
git rm --cached client/.env
git commit -m "Remove accidentally committed .env files"
git push
```

Then rotate your Gmail App Password immediately (generate a new one).

**GitHub Issue Title:** `[Security] .env files with secrets may be exposed in repository`

---

## Issue 5 — CI workflow runs from wrong directory (monorepo not set up)

**File:** `.github/workflows/ci.yml`

**Problem:** The CI ran `npm ci` and `npm run build` from the repo root, but the
`package.json` with all frontend dependencies was also at root, mixed with server code.
This made it confusing and broke when restructured.

**Fix applied in:** `.github/workflows/ci.yml`

Now CI uses `working-directory` to run commands in the right folder:
```yaml
- name: Install client dependencies
  working-directory: ./client
  run: npm ci

- name: Build client
  working-directory: ./client
  run: npm run build
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

**What to do:**

Add `VITE_API_URL` as a GitHub Actions Secret:
1. Repo → Settings → Secrets and variables → Actions → New repository secret
2. Name: `VITE_API_URL`
3. Value: `https://your-deployed-server.onrender.com`

**GitHub Issue Title:** `[Bug] CI pipeline fails — incorrect working directory for monorepo`

---

## How to Run Locally (Step by Step)

### Step 1 — Set up server secrets
```bash
cd server
cp .env.example .env
```
Edit `server/.env`:
- Set `EMAIL_PASS` to your Gmail App Password
  (Google Account → Security → 2-Step Verification → App Passwords → Create)
- Set `CLIENT_URL=http://localhost:5173`

### Step 2 — Set up client env
```bash
cd client
cp .env.example .env.local
```
`client/.env.local` already has `VITE_API_URL=http://localhost:5000` — no change needed.

### Step 3 — Install dependencies
```bash
# From repo root
npm install
npm run install:all
```

### Step 4 — Run both together
```bash
# From repo root
npm run dev
```
This starts both `client` on http://localhost:5173 and `server` on http://localhost:5000.

---

## How to Deploy

### Deploy Frontend (Vercel — recommended)
1. Push to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Set Root Directory to `client`
4. Add Environment Variable: `VITE_API_URL` = your server URL
5. Deploy

### Deploy Backend (Render — free tier)
1. Go to render.com → New Web Service → Connect repo
2. Set Root Directory to `server`
3. Build Command: `npm install && npm run build`
4. Start Command: `node dist/index.js`
5. Add Environment Variables: `EMAIL_USER`, `EMAIL_PASS`, `CLIENT_URL`

---

## Gmail App Password Setup (Required for contact form)

1. Go to myaccount.google.com
2. Security → 2-Step Verification (must be ON)
3. Search "App Passwords" in the search bar
4. App name: "Portfolio Server" → Create
5. Copy the 16-character password (no spaces)
6. Paste into `server/.env` as `EMAIL_PASS`

**Important:** Use this App Password, NOT your real Gmail password.
