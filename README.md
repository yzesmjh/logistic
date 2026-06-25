# FedyTransist — Full-Stack Logistics Platform

> **Assessment project** demonstrating practical knowledge of the **MERN stack** (MongoDB · Express · React · Node.js) through a real-world logistics and package-tracking web application.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [File Uploads](#file-uploads)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Author](#author)

---

## Overview

FedyTransist is a full-featured logistics web application inspired by global courier services. It allows administrators to create and manage shipment records, upload proof-of-delivery photos, and add real-time delivery comments — while customers can publicly track their packages using a unique tracking ID.

This project was built as a **MERN stack assessment** to demonstrate end-to-end web development skills including REST API design, JWT authentication, role-based access control, cloud file storage, and a fully responsive React frontend.

---

## Live Demo

| Layer    | URL                                           |
| -------- | --------------------------------------------- |
| Frontend | https://fedex-new.onrender.com                |
| Backend  | https://westpack-clone.onrender.com           |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI component library |
| Vite | 5.2 | Build tool & dev server |
| React Router DOM | 6.23 | Client-side routing |
| Tailwind CSS | 4.0 | Utility-first styling |
| Axios | 1.7 | HTTP requests to the API |
| Formik + Yup | 2.4 / 1.4 | Form state management & validation |
| TanStack React Table | 8.17 | Data tables with sorting & filtering |
| React Toastify | 10.0 | Toast notifications |
| qrcode.react | 4.2 | QR code generation for tracking |
| Headless UI | 2.0 | Accessible UI primitives |
| Socket.IO Client | 4.7 | Real-time updates |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22.2 | JavaScript runtime |
| Express | 4.19 | Web framework & REST API |
| MongoDB Atlas | — | Cloud-hosted NoSQL database |
| Mongoose | 8.3 | MongoDB ODM (schemas & queries) |
| JSON Web Tokens | 9.0 | Stateless authentication |
| bcryptjs | 2.4 | Password hashing |
| Multer | 1.4 | Multipart file upload handling |
| Cloudinary | 1.41 | Cloud image storage & CDN |
| Nodemailer | 6.9 | Transactional email |
| Socket.IO | 4.7 | Real-time bidirectional events |
| dotenv | 16.4 | Environment variable management |

---

## Features

### Public
- 🔍 **Package tracking** — look up any shipment by tracking ID with full status history
- 📦 **Delivery timeline** — visual step-by-step progress (Processed → Picked Up → In Transit → On Hold → Delivered)
- 📷 **Proof of delivery photos** — view images attached to a shipment
- 📱 **QR code** — scan to track a package on mobile
- 💬 **AI-powered chatbot** — hardcoded FAQ assistant for common shipping questions

### Admin Dashboard (authenticated)
- 👤 **User management** — create, view, edit, and delete customer accounts
- 📦 **Package management** — full CRUD for shipment records including origin/destination, carrier, weight, dimensions, and freight cost
- 🖼️ **Photo upload** — attach up to 20 images per package via Cloudinary
- 💬 **Delivery comments** — add timestamped status updates per package
- 📊 **Data tables** — sortable/filterable tables with TanStack React Table
- 🔔 **Notifications** — in-app notification centre
- 🧾 **Invoice view** — per-package invoice page

### Security
- 🔐 JWT authentication stored in the Token model (server-side invalidation on logout)
- 🔑 Role-based access control (`ADMIN` / `USER`)
- 🛡️ Password hashing with bcryptjs
- 🤖 `robots.txt` + `<meta name="robots" content="noindex,nofollow">` — site excluded from search engines

---

## Project Structure

```
fedex/
│
├── server.js                   # Express app entry point
├── package.json                # Backend dependencies
├── .env                        # Backend environment variables (not committed)
│
├── controllers/
│   ├── userController.js       # Auth, profile, user CRUD
│   └── packageController.js    # Package CRUD, images, comments
│
├── models/
│   ├── userModel.js            # User schema
│   ├── packageModel.js         # Package schema
│   ├── tokenModel.js           # JWT token schema
│   ├── fileModel.js            # Package photo schema
│   └── deliveryCommentModel.js # Delivery status comment schema
│
├── routes/
│   ├── userRoutes.js           # /api/users/*
│   └── packageRoutes.js        # /api/package/*
│
├── middleWare/
│   ├── authMiddleware.js       # JWT verification
│   ├── uploadHandler.js        # Cloudinary/Multer integration
│   ├── errorHandler.js         # Global error handler
│   ├── responseHandler.js      # Standard response formatter
│   └── serverUploadHandler.js  # Local file handling
│
├── utils/
│   ├── constants.js            # ROLES enum
│   ├── responseCode.js         # HTTP status codes
│   ├── sendEmail.js            # Nodemailer helper
│   └── timeTeller.js           # Time utilities
│
├── uploads/                    # Temporary upload directory
│
└── frontend/                   # React + Vite SPA
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── vercel.json              # Vercel SPA rewrite rules
    ├── BaseUrl.js               # API base URL (dev override)
    ├── .env                     # Frontend environment variables
    │
    └── src/
        ├── main.jsx             # React entry point (BrowserRouter)
        ├── App.jsx              # Route definitions
        │
        ├── Pages/
        │   ├── Login.jsx
        │   ├── Track.jsx        # Public tracking page
        │   ├── MyDashboard.jsx
        │   ├── Package.jsx
        │   ├── Profile.jsx
        │   ├── Notification.jsx
        │   ├── ViewUsers.jsx
        │   ├── ViewSingleUsers.jsx
        │   ├── Invoice.jsx
        │   └── Logout.jsx
        │
        ├── Components/
        │   ├── Home/            # Landing page sections
        │   │   ├── HeroSection.jsx
        │   │   ├── ServicesSection.jsx
        │   │   ├── TestimonialsSection.jsx
        │   │   ├── CoverageMap.jsx
        │   │   └── Footer.jsx   # Includes AI chatbot
        │   ├── Dashboard/
        │   ├── Package/
        │   ├── Invoice/
        │   ├── Profile/
        │   ├── User/
        │   ├── Notification/
        │   ├── NavBar.jsx
        │   ├── DataTable.jsx
        │   ├── AddPackageForm.jsx
        │   ├── EditPackageForm.jsx
        │   ├── AddUserForm.jsx
        │   └── QRCodeGenerator.jsx
        │
        ├── Hooks/
        │   └── useHeaderData.js
        │
        └── utils/
            ├── data.js
            └── utils.js
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9 or higher (bundled with Node)
- **MongoDB Atlas** account — [mongodb.com/atlas](https://www.mongodb.com/atlas) (free tier works)
- **Cloudinary** account — [cloudinary.com](https://cloudinary.com) (free tier works)
- **Git**

---

### Clone the Repository

```bash
git clone https://github.com/<your-username>/fedex.git
cd fedex
```

---

### Backend Setup

1. **Install dependencies**

```bash
npm install
```

2. **Create a `.env` file** in the project root (see [Environment Variables](#environment-variables) below)

3. **Start the development server**

```bash
# With auto-reload (nodemon)
npm run dev

# Or plain Node
node server.js
```

The API will be available at `http://localhost:2000`

---

### Frontend Setup

1. **Navigate to the frontend folder**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** inside `frontend/` (see [Environment Variables](#environment-variables) below)

4. **Start the dev server**

```bash
npm run dev
```

The React app will be available at `http://localhost:5173`

5. **Build for production**

```bash
npm run build
```

---

## Environment Variables

### Backend — `.env` (project root)

```env
# MongoDB Atlas connection string
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority

# Express server port
PORT=2000

# Public URL of the deployed backend (used in emails)
BACKENDURL=http://localhost:2000

# JWT signing secret (use a long, random string in production)
JWT_SECRET=your_jwt_secret_here

# Gmail credentials for Nodemailer
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Cloudinary credentials (from your Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Tip:** Generate a Gmail App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Never use your real Gmail password.

### Frontend — `frontend/.env`

```env
# Base URL of the running backend API
VITE_BASEURL=http://localhost:2000/api/
```

---

## API Reference

All protected routes require the header:
```
Authorization: Bearer <jwt_token>
```

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register a new user |
| `GET` | `/verify/:id` | ❌ | Verify email address |
| `POST` | `/login` | ❌ | Login and receive JWT |
| `POST` | `/logout` | ✅ | Invalidate token |
| `GET` | `/getsingleuser` | ✅ | Get current user profile |
| `GET` | `/getallusers` | ✅ | List all users (admin) |
| `PATCH` | `/edituser` | ✅ | Update profile details |
| `PATCH` | `/changepassword` | ✅ | Change password |
| `PATCH` | `/changepin` | ✅ | Change PIN |
| `POST` | `/uploadphoto` | ✅ | Upload profile avatar |
| `POST` | `/forgotpassword` | ❌ | Request password reset email |
| `PUT` | `/resetpassword` | ❌ | Reset password via token |
| `DELETE` | `/deletesingleuser` | ✅ | Delete a user account |

### Packages — `/api/package`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/createpackage` | ✅ | Create a new shipment |
| `GET` | `/getallPackages` | ✅ | List all packages for user |
| `GET` | `/getsinglePackage` | ✅ | Get one package (authenticated) |
| `GET` | `/getpackage` | ❌ | Public package lookup by tracking ID |
| `PUT` | `/updatesinglepackage/:packageId` | ✅ | Update package details |
| `DELETE` | `/deletesinglepackage` | ✅ | Delete a package |
| `DELETE` | `/deleteallPackages` | ✅ | Delete all packages |
| `POST` | `/uploadphotos` | ✅ | Upload up to 20 images (Cloudinary) |
| `GET` | `/getpackageimage` | ✅ | Retrieve package images |
| `DELETE` | `/deletepackageimage` | ✅ | Delete a package image |
| `POST` | `/comment` | ✅ | Add a delivery status comment |
| `GET` | `/getcomment` | ❌ | Get delivery comments (public) |
| `DELETE` | `/deletecomment` | ✅ | Delete a comment |

---

## Database Schema

### User
```js
{
  firstname:   String,
  lastname:    String,
  email:       String (unique),
  customerId:  String (unique, auto-generated),
  role:        Enum ['ADMIN', 'USER'],
  password:    String (bcrypt hashed),
  profilePicx: String (Cloudinary URL),
  timestamps:  true
}
```

### Package
```js
{
  userId:               ObjectId → User,
  packageNumber:        String (auto-generated tracking ID),
  origin:               String,
  destination:          String,
  carrier:              String,
  shipmentMode:         String,
  typeOfShipment:       String,
  weight:               Number,
  qty:                  Number,
  product:              String,
  carrierReferenceNo:   String,
  pickupDate:           String,
  expectedDeliveryDate: String,
  paymentMode:          String,
  totalFreight:         Number,
  shipperInformation:   String,
  receiverInformation:  String,
  comments:             Array,
  status:               String (default: 'Processed'),
  signedForBy:          String,
  timestamps:           true
}
```

### Token
```js
{ userId: ObjectId → User, token: String, timestamps: true }
```

### File (Package Images)
```js
{ packageId: ObjectId → Package, userId: ObjectId → User, photos: [String] }
```

### DeliveryComment
```js
{
  packageId: ObjectId → Package,
  comments: [{ title: String, value: String, date: String, tag: String }]
}
```

---

## Authentication

Authentication uses **JWT (JSON Web Tokens)** with server-side token tracking:

1. On login, the server signs a JWT and stores it in the `Token` collection.
2. Every protected request verifies:
   - The `Authorization: Bearer <token>` header exists.
   - The token exists in the database (not revoked).
   - The JWT signature is valid against `JWT_SECRET`.
3. On logout, the token record is deleted — rendering the token invalid even before it expires.

```
Client                        Server
  │── POST /api/users/login ──▶│
  │◀── { token: "jwt..." } ────│  (token saved to DB)
  │                             │
  │── GET /api/... ─────────────│
  │   Authorization: Bearer ... │
  │◀── protected data ──────────│  (token checked in DB + verified)
  │                             │
  │── POST /api/users/logout ───│
  │◀── 200 OK ──────────────────│  (token deleted from DB)
```

---

## File Uploads

Images are handled with **Multer** (streaming parser) piped directly to **Cloudinary**:

```
Browser → Multer (memory) → CloudinaryStorage → Cloudinary CDN
                                   ↓
                          Returns { secure_url }
                                   ↓
                       Saved to File model in MongoDB
```

- Accepted types: `jpeg`, `jpg`, `png`, `gif`
- Max files per request: **20**
- Storage path on Cloudinary: `/uploads/pictures/`

---

## Deployment

### Frontend — Vercel
The `frontend/vercel.json` file rewrites all paths to `/index.html` so React Router handles navigation client-side.

```bash
cd frontend
npm run build       # Creates /dist
# Deploy /dist to Vercel or any static host
```

### Backend — Render
The Express server reads `PORT` from the environment. Render sets this automatically.

```bash
# Start command on Render
node server.js
```

Set all backend environment variables in the Render dashboard under **Environment → Secret Files**.

---

## Screenshots

> *(Add screenshots of the homepage, dashboard, tracking page, and admin panel here)*

| Page | Description |
|------|-------------|
| `/` | Landing page with hero, services, testimonials, coverage map |
| `/track/:id` | Public shipment tracking with timeline & QR code |
| `/login` | Admin login with Customer ID + Password |
| `/dashboard` | Admin dashboard with package & user tables |

---

## Author

**Ademuyiwa Adekunle**
- GitHub: [@kunkky](https://github.com/kunkky)
- Email: ademuyiwa.adekunle@awarri.com

---

> *This project was built as a MERN stack skills assessment. It is not affiliated with or endorsed by FedEx Corporation.*
