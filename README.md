# University Workspace

> A modern, scalable digital academic workspace designed for university students, teachers, department chairs, and campus administrators.

---

## 1. Project Overview

**University Workspace** is a unified digital platform that bridges communication, course management, and academic scheduling across campus. It allows university stakeholders to:

- Create and join dedicated academic rooms (University-wide, Department, Course spaces, and Personal study groups).
- Discover faculty information, maintain office hours, and locate campus offices.
- Sync lectures, lab sections, seminars, and examination dates on an interactive calendar.
- Manage profiles with verified academic affiliations and role badges.
- Receive timely notifications for course announcements, join requests, and schedule alterations.

---

## 2. Technology Stack

### Frontend
- **Framework / Bundler:** React (JavaScript / JSX) + Vite
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS (v4)
- **HTTP Client:** Axios (configured with auth interceptors)
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js (ES Modules)
- **Web Framework:** Express.js
- **Database & ODM:** MongoDB with Mongoose
- **Authentication & Security:** JSON Web Tokens (JWT) + bcryptjs
- **Middleware:** CORS, Error Handler, Role-Based Access Control (RBAC)

---

## 3. Folder Structure

```text
university-workspace/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logos/
│   │   ├── components/
│   │   │   ├── common/         # Button, Card, Input, Badge, Modal, Loader
│   │   │   ├── layout/         # Header, Sidebar, Footer
│   │   │   ├── navigation/     # Navbar, Breadcrumbs
│   │   │   ├── auth/           # LoginForm, SignupForm
│   │   │   ├── profile/        # ProfileCard, ProfileHeader
│   │   │   ├── rooms/          # RoomCard, RoomList
│   │   │   ├── people/         # PersonCard, TeacherCard
│   │   │   ├── schedule/       # ScheduleCalendar, ScheduleItem
│   │   │   └── notifications/  # NotificationItem, NotificationList
│   │   ├── pages/
│   │   │   ├── public/         # Home, Helpdesk, Login, Signup
│   │   │   ├── dashboard/      # Dashboard
│   │   │   ├── profile/        # MyProfile, PublicProfile
│   │   │   ├── rooms/          # MyRooms, CreateRoom, JoinRoom, RoomDetails
│   │   │   ├── people/         # People, TeacherProfile
│   │   │   ├── schedule/       # Schedule, CreateSchedule
│   │   │   ├── notifications/  # Notifications
│   │   │   └── settings/       # Settings
│   │   ├── layouts/            # PublicLayout, DashboardLayout
│   │   ├── routes/             # AppRoutes, ProtectedRoute, PublicRoute
│   │   ├── services/           # api.js, authService, roomService, etc.
│   │   ├── context/            # AuthContext, AppContext
│   │   ├── hooks/              # useAuth, useApi
│   │   ├── utils/              # constants, helpers, validators
│   │   ├── data/               # helpdeskFaqs
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/                 # db.js, env.js
│   ├── controllers/            # auth, user, profile, room, schedule, notification
│   ├── middleware/             # authMiddleware, errorMiddleware, roleMiddleware
│   ├── models/                 # User, Profile, University, Department, Room,
│   │                           # RoomMember, RoomRequest, Schedule, Notification, Post
│   ├── routes/                 # authRoutes, userRoutes, profileRoutes, roomRoutes, etc.
│   ├── services/               # authService, roomService, notificationService, etc.
│   ├── validators/             # authValidator, roomValidator, profileValidator
│   ├── utils/                  # generateToken, generateRoomCode, response
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── README.md
├── .gitignore
├── jsconfig.json
└── package.json
```

---

## 4. Installation

Clone the repository and install dependencies:

```bash
# Install root dependencies
npm install

# (Optional) Install client and server dependencies individually if developing in separate containers:
cd client && npm install
cd ../server && npm install
cd ..
```

---

## 5. Environment Variables

Create `.env` files from the provided `.env.example` templates:

### Client (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### Server (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/university_workspace
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

---

## 6. Running Frontend

Start the Vite development server:

```bash
npm run dev
```

The frontend application will be accessible at `http://localhost:3000`.

---

## 7. Running Backend

Start the Node.js Express server:

```bash
# Using root helper
npm run server

# Or directly in server directory
cd server
npm run dev
```

The API server will run at `http://localhost:5000/api` with health check at `/api/health`.

---

## 8. Development Roadmap

- [x] **Phase 1: Project Architecture & Scaffolding** *(Completed)*
  - Clean modular structure for Client & Server.
  - Setup React Router with protected and public route guards.
  - Setup Central AuthContext, AppContext, and custom hooks.
  - Tailwind CSS integration and reusable UI primitives (`Button`, `Card`, `Input`, `Modal`, `Badge`).
  - Mongoose data models for User, Profile, University, Department, Room, Members, Requests, Schedule, Notifications, and Posts.
  - Standardized REST API endpoints and error middleware.
- [ ] **Phase 2: Database Connectivity & Authentication Integration**
  - Connect to production MongoDB instance.
  - Full JWT cookie / bearer token persistence and role enforcement.
- [ ] **Phase 3: Interactive Academic Spaces & Real-time Feeds**
  - Room post creation, file uploads, and threaded discussions.
  - Join approval workflows for Department Heads & Teachers.
- [ ] **Phase 4: Full Schedule & Notification Engine**
  - Interactive week/month timetable view with collision detection.
  - Live notification alerts.
