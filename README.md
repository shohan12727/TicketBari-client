# 🎟️ TicketBari — Client Side

TicketBari is a modern **Online Ticket Booking Platform** where users can discover and book tickets for **Bus, Train, Launch, and Plane**.  
This repository contains the **frontend (client side)** of the application, built with **React and Vite**.

---

## 🌐 Live Site

| Item | Link |
|-----|------|
| Live Website | https://ticket-bari-492a4.web.app |

---

## 🎯 Project Purpose

| Goal | Description |
|-----|------------|
| User Experience | Provide a smooth and user-friendly ticket booking flow |
| Role Management | Support User, Vendor, and Admin dashboards |
| Security | Secure authentication and protected routes |
| Scalability | Follow modern React architecture and best practices |
| UI/UX | Clean, responsive, recruiter-friendly design |

---

## ✨ Key Features

### 🔐 Authentication

| Feature | Status |
|------|-------|
| Email & Password Login | ✅ |
| Google Social Login | ✅ |
| Firebase Authentication | ✅ |
| Password Validation | ✅ |
| Protected Routes | ✅ |
| Persistent Login on Reload | ✅ |

---

### 🏠 Home Page

| Section | Description |
|-------|-------------|
| Hero Banner | Slider showcasing platform highlights |
| Advertisement Tickets | 6 admin-selected tickets |
| Latest Tickets | Recently added tickets |
| Extra Sections | Popular Routes, Why Choose Us |
| Responsive Design | Mobile, Tablet & Desktop |

---

### 🎫 Ticket System

| Feature | Description |
|-------|-------------|
| All Tickets Page | Shows admin-approved tickets only |
| Search | From → To location search |
| Filter | Filter by transport type |
| Sort | Price (Low → High / High → Low) |
| Pagination | 6–9 tickets per page |
| Ticket Details | Full ticket info with countdown |
| Booking Rules | Quantity & time-based validation |

---

## 📊 Dashboard Overview

### 👤 User Dashboard

| Page | Functionality |
|----|---------------|
| Profile | View user information |
| My Booked Tickets | Booking status & countdown |
| Payment | Stripe payment after vendor approval |
| Transaction History | Payment records |

---

### 🏪 Vendor Dashboard

| Page | Functionality |
|----|---------------|
| Vendor Profile | View vendor information |
| Add Ticket | Create new ticket (pending approval) |
| My Added Tickets | Update / delete tickets |
| Requested Bookings | Accept or reject bookings |
| Revenue Overview | Charts & statistics |

---

### 🛠️ Admin Dashboard

| Page | Functionality |
|----|---------------|
| Admin Profile | View admin details |
| Manage Tickets | Approve / Reject tickets |
| Manage Users | Assign roles, mark fraud |
| Advertise Tickets | Control homepage ads (max 6) |

---

## 📦 NPM Packages Used

### Frontend Dependencies

| Category | Packages |
|-------|---------|
| Core | react, react-dom |
| Routing | react-router |
| Styling | tailwindcss, daisyui |
| Icons | lucide-react, react-icons |
| Data Fetching | @tanstack/react-query, axios |
| Forms | react-hook-form |
| Authentication | firebase |
| Payment | stripe |
| Animation | framer-motion |
| Slider | swiper, react-responsive-carousel |
| Charts | recharts |
| Notifications | react-hot-toast, sweetalert2 |

---

## 🔐 Environment Variables

| Variable | Purpose |
|--------|---------|
| VITE_FIREBASE_API_KEY | Firebase API Key |
| VITE_FIREBASE_AUTH_DOMAIN | Firebase Auth Domain |
| VITE_FIREBASE_PROJECT_ID | Firebase Project ID |
| VITE_FIREBASE_STORAGE_BUCKET | Firebase Storage |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase Sender ID |
| VITE_FIREBASE_APP_ID | Firebase App ID |
| VITE_STRIPE_PUBLIC_KEY | Stripe Public Key |
| VITE_API_BASE_URL | Backend Server URL |

---

## ⚙️ Installation & Setup

| Step | Command |
|----|--------|
| Clone Repo | `git clone https://github.com/your-username/ticket-bari-client.git` |
| Install Packages | `npm install` |
| Run Development | `npm run dev` |
| Build Project | `npm run build` |

---

## 🔐 Test Credentials

| Role | Email | Password |
|----|-------|---------|
| Admin | admin@email.com | admin123 |
| Vendor | vendor@email.com | vendor123 |

---

## ✅ Deployment Checklist

| Requirement | Status |
|-----------|-------|
| No CORS / 404 / 504 Errors | ✅ |
| Reload-safe Routing | ✅ |
| Firebase Authorized Domain | ✅ |
| Protected APIs | ✅ |
| Responsive Design | ✅ |

---

## 📌 Notes

| Item | Description |
|----|-------------|
| Original Work | No module or assignment cloning |
| Commit History | 20+ meaningful client-side commits |
| UI Standard | Clean, modern & recruiter-friendly |
| Security | Environment variables used |

---

## © Copyright

© 2025 **TicketBari**. All rights reserved.
