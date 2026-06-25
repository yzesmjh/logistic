# FedyTransist — Frontend

> React + Vite single-page application for the FedyTransist logistics platform.  
> Built as part of a **MERN stack assessment** to demonstrate frontend development skills.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Pages & Routes](#pages--routes)
- [Component Structure](#component-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Key Implementation Details](#key-implementation-details)
- [Search Engine & Crawler Policy](#search-engine--crawler-policy)
- [Deployment](#deployment)

---

## Overview

This is the React frontend for FedyTransist. It communicates with the Express/MongoDB backend via a REST API (Axios) and provides two distinct experiences:

- **Public** — landing page, shipment tracking by ID, chatbot assistant
- **Admin dashboard** — authenticated CRUD interface for managing packages and users

---

## Tech Stack

| Library | Version | Role |
|---|---|---|
| React | 18.2 | UI component model |
| Vite | 5.2 | Dev server & production bundler |
| React Router DOM | 6.23 | Client-side routing |
| Tailwind CSS | 4.0 | Utility-first styling |
| Axios | 1.7 | REST API calls |
| Formik | 2.4 | Form state management |
| Yup | 1.4 | Schema-based form validation |
| TanStack React Table | 8.17 | Sortable / filterable data tables |
| React Toastify | 10.0 | Toast notification system |
| qrcode.react | 4.2 | QR code generation |
| Headless UI | 2.0 | Accessible UI primitives |
| Lucide React | 0.546 | Icon set |
| React Loader Spinner | 6.1 | Loading state indicators |
| Socket.IO Client | 4.7 | Real-time event handling |
| PropTypes | — | Runtime prop validation |

---

## Pages & Routes

| Route | Page | Auth Required | Description |
|---|---|---|---|
| `/` | Home | ❌ | Landing page — hero, services, testimonials, coverage map, footer with chatbot |
| `/login` | Login | ❌ | Admin login with Customer ID + password |
| `/track/:id` | Track | ❌ | Public package tracking by tracking ID |
| `/dashboard` | Dashboard | ✅ | Package management overview |
| `/profile` | Profile | ✅ | Edit account details & avatar |
| `/users` | Users | ✅ | List and manage all user accounts |
| `/users/:id` | Single User | ✅ | View / edit one user account |
| `/package` | Packages | ✅ | Package list, add, edit, delete |
| `/notification` | Notifications | ✅ | In-app notification centre |
| `/logout` | Logout | ✅ | Clears session and redirects to login |
| `*` | Error | ❌ | 404 not-found fallback |

---

## Component Structure

```
src/
│
├── main.jsx                  # React entry — wraps app in BrowserRouter
├── App.jsx                   # Route definitions & protected route logic
│
├── Pages/                    # One file per route
│   ├── Login.jsx
│   ├── Track.jsx
│   ├── MyDashboard.jsx
│   ├── Package.jsx
│   ├── Profile.jsx
│   ├── Notification.jsx
│   ├── ViewUsers.jsx
│   ├── ViewSingleUsers.jsx
│   ├── Invoice.jsx
│   ├── Logout.jsx
│   └── ErrorPage.jsx
│
├── Components/
│   │
│   ├── Home/                 # Landing page sections
│   │   ├── HeroSection.jsx        # Animated hero + tracking form
│   │   ├── ServicesSection.jsx    # 6 service cards
│   │   ├── TestimonialsSection.jsx# Customer reviews with filter tabs
│   │   ├── CoverageMap.jsx        # Interactive region coverage map
│   │   └── Footer.jsx             # Links, newsletter, AI chatbot modal
│   │
│   ├── Dashboard/            # Admin dashboard widgets & layout
│   ├── Package/              # Package detail, table, forms
│   ├── Invoice/              # Invoice view
│   ├── Profile/              # Profile edit form
│   ├── User/                 # User list & detail views
│   ├── Notification/         # Notification list
│   │
│   ├── NavBar.jsx
│   ├── DataTable.jsx         # Reusable TanStack table wrapper
│   ├── AddPackageForm.jsx
│   ├── EditPackageForm.jsx
│   ├── AddDeliveryComment.jsx
│   ├── AddUserForm.jsx
│   ├── EditUserForm.jsx
│   └── QRCodeGenerator.jsx
│
├── Hooks/
│   └── useHeaderData.js      # Custom hook for dashboard header data
│
├── utils/
│   ├── data.js               # Static data constants
│   └── utils.js              # Helper functions
│
└── assets/
    ├── Images/
    ├── Icons/
    └── Font/
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ — [nodejs.org](https://nodejs.org)
- The **backend API** running locally or deployed — see the root [`README.md`](../README.md)

### Install & Run

```bash
# From the project root
cd frontend

# Install dependencies
npm install

# Start development server (hot-reload at http://localhost:5173)
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `frontend/` folder:

```env
# URL of the running backend — include trailing slash
VITE_BASEURL=http://localhost:2000/api/
```

> All Vite environment variables **must** be prefixed with `VITE_` to be exposed to the browser bundle.  
> For production, change this to your deployed backend URL.

---

## Available Scripts

Run these from inside the `frontend/` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at `http://localhost:5173` |
| `npm run build` | Compile & minify to `dist/` for production |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across the source files |

---

## Key Implementation Details

### Authentication flow
- On login, the JWT received from the API is stored in `sessionStorage`.
- A custom auth check in `App.jsx` reads the token before rendering protected routes — unauthenticated users are redirected to `/login`.
- On logout, the token is deleted from `sessionStorage` and the `/logout` endpoint is called to invalidate it server-side.

### Package tracking
- The public `/track/:id` page calls `GET /api/package/getpackage?id=:id` — no auth required.
- The tracking timeline maps the package `status` field to a 5-step progress indicator.
- A QR code is generated client-side with `qrcode.react` and encodes the current page URL.
- The **"Try Another ID"** button navigates to `/` and smooth-scrolls to the `#track-form` section in the hero.

### AI Chatbot (Footer)
- Fully hardcoded on the frontend — no API calls.
- A keyword-matching engine covers 10 intent categories (tracking, rates, delivery, lost items, pickup, account, international, contact, greetings, thanks).
- Numeric strings resembling tracking numbers receive a dedicated reply.
- Renders inside a floating modal triggered by the **"Need Help?"** button.

### Forms
- All forms use **Formik** for state + **Yup** for validation schemas.
- Errors display inline beneath each field.
- Submit buttons show loading states while the API request is in flight.

### Data Tables
- Admin list views (packages, users) use **TanStack React Table v8** via a shared `DataTable.jsx` wrapper.
- Supports column sorting, global search filter, and pagination.

---

## Search Engine & Crawler Policy

This site is intentionally excluded from all search engines and web crawlers via two layers.

### 1 — `public/robots.txt`
Served at `https://your-domain.com/robots.txt`. Instructs every crawler to skip the entire site:

```
User-agent: *
Disallow: /
```

Major bots (Googlebot, Bingbot, Baiduspider, YandexBot, DuckDuckBot, facebot, Wayback Machine, etc.) are also listed individually as a belt-and-suspenders measure.

### 2 — `<meta name="robots">` in `index.html`
A second line of defence for any crawler that ignores `robots.txt`:

```html
<meta name="robots" content="noindex, nofollow" />
```

| Directive | Effect |
|---|---|
| `noindex` | Do not add this page to any search index |
| `nofollow` | Do not follow any outbound links on this page |

---

## Deployment

The frontend is deployed to **Vercel**. The `vercel.json` at the root of the `frontend/` folder rewrites all URL paths to `index.html` so React Router handles navigation client-side without 404s on hard refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Build & deploy manually

```bash
# 1. Build the production bundle
npm run build

# 2. The dist/ folder is the deployable artefact.
#    Drag-and-drop it to Vercel, Netlify, or any static host.
```

---

> Part of the [FedyTransist full-stack project](../README.md) — a MERN stack skills assessment.
