Portfolio Website – Next.js
A modern, responsive personal portfolio website built using Next.js (App Router).
This portfolio showcases my projects, skills, and contact information with a clean UI and smooth navigation.

Tech Stack
Next.js 13+ (App Router)
React
Tailwind CSS
JavaScript (ES6+)
Vercel (Deployment)

Features
Responsive design for all screen sizes
Smooth section-based navigation
Modular and reusable components
Optimized performance with Next.js
SEO-friendly structure
Contact section with API route support

📁 Project Structure
portfolio-website/
│
├── node_modules/
│
├── public/
│   ├── github-icon.svg
│   ├── linkedin-icon.svg
│   └── other-static-assets
│
├── src/
│   ├── api/
│   │   └── send/
│   │       └── route.js
│   │
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── AboutMeSection.jsx
│   │   ├── EmailSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── MenuCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavLink.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectSection.jsx
│   │   └── TabButton.jsx
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md



Folder Explanation
public/ - Contains static assets like SVG icons and images.
src/app/ - Uses Next.js App Router:
layout.js - Root layout
page.js - Home page
globals.css - Global styles
src/components/ - Reusable UI components for different sections of the portfolio.
src/api/send/route.js - API route for handling contact/email functionality.

Installation & Setup
git clone https://github.com/your-username/portfolio-website.git
cd portfolio-website
npm install
npm run dev

Open - http://localhost:3000

Deployment
This project is deployed on Vercel.
npm run build
npm start
