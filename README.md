# Dhyuthi 6.0 – Official Event Website

Official website for Dhyuthi 6.0, the flagship multi-track technical fest organized by IEEE SCT Student Branch.  
The site provides event details, registrations, schedules, pre-events, and accommodation info with a fast and responsive UI.

## 🚀 Features
- Dynamic hero + countdown
- Event tracks overview
- Workshops & competitions listing
- Pre-event highlights
- Team & sponsorship sections
- SEO-optimized structure
- Fully responsive design
- Lazy-loaded, optimized images

## 🛠️ Tech Stack
**Frontend**
- Next.js / React  
- Tailwind CSS  
- Framer Motion / GSAP (optional)

**Backend (if applicable)**
- Firebase / Supabase  
- Node/Express APIs

**Deployment**
- Vercel / Netlify

## 📁 Project Structure
.
├── public/          # Static assets
├── components/      # UI components
├── pages/           # Routes & main sections
├── styles/          # Global styles
├── data/            # Event metadata
└── utils/           # Helpers & hooks

## ⚙️ Getting Started

### 1. Clone
git clone https://github.com/<your-username>/dhyuthi-website.git
cd dhyuthi-website

### 2. Install dependencies
npm install

### 3. Run locally
npm run dev

### 4. Production build
npm run build
npm start

## 🔧 Environment Variables
Create a `.env.local` file if needed:
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FORM_ENDPOINT=
NEXT_PUBLIC_ANALYTICS_ID=

## 🎨 Design Principles
- Clean, minimalistic UI  
- High-quality visuals  
- Smooth animations without heavy performance costs  
- Clear CTAs for seamless user flow  

## 📦 Deployment
Continuous deployments via Vercel (recommended).


## 🔗 Live Website
https://dhyuthi.ieeesctsb.org
