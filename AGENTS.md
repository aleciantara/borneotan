# 🌿 BorneoTan — Project Plan

## 📌 Overview
BorneoTan is an educational website about Bornean orangutans, aimed at raising awareness, sharing knowledge, and encouraging donations.

The system consists of:
1. Public-facing website
2. Admin dashboard (for content management)

---

## 🏗️ Tech Stack

### Core
- Next.js (App Router)
- React
- Tailwind CSS
- Prisma ORM
- MYSQL

### Optional
- NextAuth / Clerk (authentication)
- Stripe / PayPal (donations)
- Resend / Nodemailer (email)

---

## 🌍 Public Website Pages

### 🏠 Home
- Hero section (mission statement)
- Key statistics
- Call-to-action (Donate)

### 📖 About
- About BorneoTan
- Mission & Vision
- About Bornean Orangutans

### 🧠 Fun Facts
- Educational facts about orangutans

### ❤️ Why Help Our Cause
- Deforestation
- Habitat loss
- Illegal wildlife trade

### 📊 Statistics
- Dynamic stats from database

### 📝 Blog
- Blog list page
- Blog detail page (`/blog/[slug]`)

### 💸 Donate
- Payment integration (Stripe/PayPal)

### 📞 Contact
- Contact form (name, email, message)

### 📍 Where to Find Us
- Map embed
- Organization details

---

## 🔐 Admin Dashboard

### Routes
- `/admin/login`
- `/admin/dashboard`
- `/admin/blog`
- `/admin/statistics`

---

## 🧩 Admin Features

### ✍️ Blog Management (CRUD)
- Create post
- Edit post
- Delete post
- Fields:
  - title
  - slug
  - content
  - image
  - published

### 📊 Statistics Management
- Add/edit/remove statistics

### 🔒 Authentication
- Admin-only access
- Protected routes (middleware)

---

## 🗂️ Folder Structure


/app
/(public)
/page.tsx
/about
/blog
/donate
/contact
/(admin)
/admin
/login
/dashboard
/blog
/statistics

/api
/blog
/auth
/stats

/components
/lib
/prisma
/styles


---

## 🧮 Database Schema

### User

id
email
password
role
createdAt


### Blog

id
title
slug
content
image
published
createdAt
updatedAt


### Statistics

id
label
value
createdAt
updatedAt


---

## ⚙️ Key Features

### SEO
- Metadata (Next.js)
- Open Graph tags
- Sitemap.xml

### Performance
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)

### Security
- Input validation (Zod)
- Auth-protected admin routes

### Media
- Optimized images (Next.js Image)

---

## 🚀 Development Roadmap

### Phase 1: Setup & UI (Week 1–2)
- Initialize project
- Create static pages
- Build layout & components

### Phase 2: Database & Blog (Week 2–3)
- Setup Prisma + DB
- Implement blog (read-only)

### Phase 3: Admin Dashboard (Week 3–4)
- Blog CRUD
- Statistics management

### Phase 4: Authentication (Week 4)
- Login system
- Route protection

### Phase 5: Integrations (Week 5)
- Donation system
- Contact form (email)

---

## ⚠️ Scope Control

Start with:
- Blog CRUD
- Statistics editor

Avoid initially:
- Full CMS
- Complex role systems

---

## 💡 Future Enhancements

- Multi-language (EN / Indonesian)
- Newsletter system
- Volunteer signup
- Wildlife tracking map

---

## 🎯 Goal

Build a scalable, SEO-friendly educational platform with a simple but powerful admin system.

Focus on:
- Clean UI
- Fast performance
- Easy content management