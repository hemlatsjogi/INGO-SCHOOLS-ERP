# INGO-SCHOOLS-ERP

Next-Generation Intelligent School ERP Platform featuring an animated landing page, RESTful Express backend with JWT authentication, and a PostgreSQL database schema.

---

## Directory Structure

```
INGO-SCHOOLS-ERP/
│
├── frontend/
│   ├── React (Vite + TypeScript)
│   ├── CSS / Tailwind / responsive.css (Multi-tier Media Queries)
│   ├── Framer Motion (Paper airplane motion loop & smooth text reveal)
│   └── Components/
│       ├── Navbar.tsx             # Responsive header with branding & mobile drawer
│       ├── Hero.tsx               # Hero section with Future highlight & doodle underline
│       ├── AnimatedPaperAirplane.tsx # Floating paper plane with looping dashed trail
│       ├── AnimatedText.tsx       # Word-by-word smooth staggered text reveal
│       ├── DoodleAccents.tsx      # Geometric origami bursts, doodle star & sunbursts
│       ├── FeatureCards.tsx       # 4 Interactive cards (Easy to Use, Secure, Cloud, Scalable)
│       ├── BookingModal.tsx       # VIP Demo request dialog connected to backend
│       └── Footer.tsx             # Animated CTA Banner & 5-Column Navigation Footer
│
├── backend/
│   ├── Node.js & Express
│   ├── API Endpoints (/api/inquiries, /api/features, /api/stats, /api/health)
│   ├── Authentication (JWT token issuance, bcrypt password hashing)
│   ├── Middleware (Bearer token verification, role-based authorization)
│   └── Controllers & Routes
│
├── database/
│   ├── PostgreSQL Schema (schools, users, academic_years, classes, students, attendance, inquiries)
│   ├── Seed Data (Admin user, demo teacher, sample classes, test inquiry)
│   └── db.js (pg client connection pool)
│
└── README.md
```

---

## Key Features & Visual Engineering

### 1. Animated Paper Airplane Flight Motion
- Built with **Framer Motion** and **SVG path trajectory**.
- Features an aerodynamic continuous gliding loop with synchronized banking/tilt angle rotations.
- An animated dashed flight path (`stroke-dasharray` & `stroke-dashoffset`) dynamically traces behind the plane.
- **Interactive Micro-Action**: Hovering speeds up the flight trail, and clicking triggers a 360° loop-the-loop trick!

### 2. Smooth Text Reveal ("Smooth Coming")
- Smooth cubic-bezier spring easing `[0.22, 1, 0.36, 1]` with staggered upward translation and subtle blur dissipation.
- "Future" headline highlight with an animated hand-drawn doodle brush underline stroke.

### 3. Multi-Media Query Responsive Breakpoints (`responsive.css`)
Specially engineered across 6 distinct viewport tiers:
1. **Extra Small Phones (`<= 480px`)**: Compact header, stacked hero layout, full-width touch buttons, scaled airplane viewBox (`scale(0.72)`), single-column feature cards.
2. **Medium Phablets (`481px - 640px`)**: Inline action buttons, fluid headline clamp.
3. **Tablets & iPads (`641px - 768px`)**: Centered hero layout, 2x2 grid for bottom feature cards.
4. **Laptops & Desktops (`769px - 1024px` & `1025px - 1440px`)**: Side-by-side hero composition, full 4-column feature grid.
5. **Ultra-Wide Screens (`>= 1441px`)**: Centered container max-width constraints (1440px), scalable typography.
6. **Accessibility Tier (`prefers-reduced-motion: reduce`)**: Automatically disables infinite transforms for users with motion sensitivity.

---

## Quick Start & Running Locally

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will start on `http://localhost:5173`.

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The REST API will listen on `http://localhost:5000`.

### Database Setup (PostgreSQL)

1. Create database:
   ```sql
   CREATE DATABASE ingo_schools_erp;
   ```
2. Run schema and seed scripts:
   ```bash
   psql -U postgres -d ingo_schools_erp -f database/schema.sql
   psql -U postgres -d ingo_schools_erp -f database/seed.sql
   ```

---

## API Reference

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate and receive JWT token
- `GET /api/auth/me` - Authenticated user profile (Requires `Authorization: Bearer <token>`)

### ERP Platform
- `POST /api/inquiries` - Submit VIP Demo Booking or School Inquiry
- `GET /api/features` - Retrieve platform feature modules
- `GET /api/stats` - Live platform metrics (Students, Schools, Uptime)
- `GET /api/health` - API service health status

---

## License
MIT License. Created for INGO Schools ERP.
