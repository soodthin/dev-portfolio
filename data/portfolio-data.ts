import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Thai Do Thinh",
    title: "Software Engineer // Full-Stack Developer",
    roleDescription: "Final-year Computer Science student who has built and deployed several real web products, from database design to frontend and backend. Comfortable with Java, Python, JavaScript, TypeScript, and frameworks like Spring Boot and React. I use AI coding tools daily to work faster while still reviewing everything myself. Looking for a Developer role to keep building real things.",
    statusText: "AVAILABLE FOR DEVELOPER ROLES // READY TO DEPLOY",
    location: "Ho Chi Minh City, Viet Nam",
    email: "thinhthai963@gmail.com",
    phone: "0869922096",
    resumeUrl: "#contact",
    avatarUrl: "/images/avatar.png",
    aboutParagraphs: [
      "I am a final-year Computer Science student at Ho Chi Minh City Open University. Throughout my academic and practical journey, I have engineered fullstack web and mobile systems spanning database architecture, RESTful backend services, secure authentication, and reactive interfaces.",
      "My recent experience includes engineering financial automation and AI data parsing pipelines at BW Industrial Development Joint Stock Company, where our team cut reporting turnaround from 1 day to 2 hours. I combine solid fundamental engineering with modern AI-assisted workflows to deliver high quality, reliable software quickly."
    ],
    meta: {
      title: "Thai Do Thinh — Software Engineer Portfolio",
      description: "Personal engineering portfolio of Thai Do Thinh (soodthin) — Full-Stack Developer specializing in React, TypeScript, Spring Boot, and FastAPI.",
      keywords: ["Thai Do Thinh", "Software Engineer", "Full-Stack Developer", "React", "TypeScript", "Spring Boot", "FastAPI", "Portfolio"]
    }
  },

  education: {
    school: "Ho Chi Minh City Open University",
    major: "Computer Science",
    period: "Oct 2022 — Dec 2026 (Expected)",
    coursework: [
      "Software Engineering",
      "Web System Development",
      "Object-Oriented Programming (OOP)",
      "Data Structures & Algorithms",
      "Modern Programming Technologies",
      "Database Management Systems",
      "Cloud Computing"
    ]
  },

  languages: [
    { language: "Vietnamese", proficiency: "Native proficiency" },
    { language: "English", proficiency: "Professional working proficiency" }
  ],

  skills: [
    {
      category: "Languages",
      description: "Core programming and query languages for systems and web.",
      skills: [
        { name: "Java" },
        { name: "Python" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "SQL" }
      ]
    },
    {
      category: "Frameworks & Platforms",
      description: "Fullstack and mobile frameworks across frontend and backend services.",
      skills: [
        { name: "Spring Boot" },
        { name: "Spring Security" },
        { name: "Spring Data JPA (Hibernate)" },
        { name: "FastAPI" },
        { name: "Django REST Framework" },
        { name: "RESTful API" },
        { name: "ReactJS" },
        { name: "React Native (Expo)" },
        { name: "Tailwind CSS" }
      ]
    },
    {
      category: "Databases",
      description: "Relational persistence, in-memory caching layers, and real-time stores.",
      skills: [
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Redis" },
        { name: "Firebase" }
      ]
    },
    {
      category: "Tools & DevOps",
      description: "Unit testing, containerization, version control, and API testing.",
      skills: [
        { name: "JUnit 5" },
        { name: "Mockito" },
        { name: "Docker" },
        { name: "Git" },
        { name: "Postman" },
        { name: "Microsoft Office" }
      ]
    },
    {
      category: "AI-Assisted Engineering",
      description: "Leveraging cutting-edge AI tools to accelerate development velocity.",
      skills: [
        { name: "Claude Code" },
        { name: "Codex" },
        { name: "Antigravity (IDE)" }
      ]
    }
  ],

  experiences: [
    {
      period: "Oct 2025 — Apr 2026",
      role: "Finance AI & Automation Intern",
      company: "BW Industrial Development Joint Stock Company (Vietnam)",
      location: "Ho Chi Minh City, Viet Nam",
      projectTitle: "Finance Data Processing Web",
      projectUrl: "https://bwid-automation.onrender.com/",
      teamSize: "3",
      description: "An internal web app used by the finance/accounting team to process bank statements and generate cash reports, automating transaction extraction, classification, and reconciliation.",
      highlights: [
        "Bank Statement Parsing: Built FastAPI parsers in Python for 14 banks to extract data from 10–30 statements per batch (up to 50 files), with 3-stream concurrent Gemini OCR fallback.",
        "Cash Report Automation: Built a PostgreSQL pipeline reconciling 500–3,000 rows per run using 50-row AI classification batches, cutting processing time for 3+ finance users from 1 day to 2 hours.",
        "Performance & Caching (Redis): Built an async Redis caching layer (redis.asyncio) with SHA-256 key hashing and pipeline batching (mget) for OCR/AI results, cutting redundant LLM API calls with graceful in-memory fallback.",
        "Security & Auth: Secured APIs via domain-restricted Google OAuth2 SSO, JWT refresh rotation, and RBAC across 2 roles, managing up to 10 concurrent sessions (5 per user).",
        "Frontend & DevOps: Built the ReactJS, TypeScript, and Tailwind CSS admin dashboard to track real-time AI token costs, and containerized the backend workflow using Docker."
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Redis", "Docker", "Google OAuth2"]
    }
  ],

  projects: [
    {
      id: "project-01",
      number: "01",
      title: "FlexiConnect Web",
      subtitle: "Job Portal & Application Tracker Platform",
      description: "Full-featured recruitment platform connecting candidates, employers, and administrators with comprehensive role-based access, job lifecycle management, and application workflows.",
      tags: ["Spring Boot", "ReactJS", "MySQL", "Spring Security", "Spring Data JPA", "JUnit 5", "Mockito", "Render"],
      githubUrl: "https://github.com/soodthin/FlexiConnect",
      screenshots: [
        "/images/flexiconnect/1-job-search.png",
        "/images/flexiconnect/2-job-detail-map.png",
        "/images/flexiconnect/3-candidate-profile.png",
        "/images/flexiconnect/4-ai-interview.png",
        "/images/flexiconnect/5-ai-feedback.png",
        "/images/flexiconnect/6-admin-dashboard.png",
        "/images/flexiconnect/7-post-job.png",
        "/images/flexiconnect/8-auth-portal.png",
      ],
      featured: true,
      keyHighlights: [
        "Backend & Database Architecture: Built 78 RESTful APIs across 12 controllers in Java and Spring Boot on a 23-table MySQL schema (21 JPA entities), plus 1 WebSocket endpoint for live alerts.",
        "Data Integrity & Pagination: Applied @Transactional for automatic rollback on payment and job application flows, and added Pageable pagination across 3 admin management modules.",
        "Integrations & Security: Integrated MoMo payment gateway and Cloudinary for CV storage; set up authentication and role-based authorization for 3 user roles (Admin, Employer, Candidate) via Spring Security and JWT.",
        "Testing: Wrote unit tests for core service-layer business logic and edge cases using JUnit and Mockito.",
        "Frontend & Deployment: Built the UI with ReactJS, Vite, and Tailwind CSS, and deployed the full-stack application on Render."
      ]
    },
    {
      id: "project-02",
      number: "02",
      title: "Food Delivery & Restaurant Booking App",
      subtitle: "Fullstack Mobile Experience with Dual-Role Portals",
      description: "Cross-platform mobile application covering customer food delivery ordering, table reservations, restaurant menu management, and dedicated kitchen staff (chef) workflows.",
      tags: ["React Native", "Expo", "Django", "Django REST Framework", "RESTful API", "MoMo", "Stripe", "Firebase"],
      githubUrl: "https://github.com/soodthin/T-Restaurant-App",
      screenshots: [
        "/images/restaurant/1-menu-home.jpg",
        "/images/restaurant/2-dish-detail.png",
        "/images/restaurant/3-cart-checkout.png",
        "/images/restaurant/4-order-momo.png",
        "/images/restaurant/5-reviews.png",
        "/images/restaurant/6-auth-login.png",
      ],
      featured: true,
      keyHighlights: [
        "Backend & Database: Built 26 RESTful APIs using Python and Django REST Framework covering menus, dish comparisons, table bookings, order workflows, and 90-day chef revenue stats.",
        "Payment Integration: Integrated 2 payment gateways (MoMo and Stripe) with 4 webhook and redirect endpoints to automate order payment confirmation and cancellation.",
        "Frontend Integration: Built the mobile UI with React Native and Expo, covering separate flows for customers and kitchen staff (chefs).",
        "Real-time Features: Implemented in-app chat between customers and the restaurant using Firebase."
      ]
    },
    {
      id: "project-03",
      number: "03",
      title: "Dev Portfolio Engine",
      subtitle: "Pure Typographic Static Portfolio Architecture",
      description: "Minimalist, high-performance portfolio engine built with Next.js App Router and TypeScript, compiled to static export for zero-latency hosting on GitHub Pages via automated CI/CD.",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "GitHub Pages", "GitHub Actions"],
      demoUrl: "https://soodthin.github.io/dev-portfolio/",
      githubUrl: "https://github.com/soodthin/dev-portfolio",
      featured: true,
      keyHighlights: [
        "100% static export (SSG) with automated deployment pipeline via GitHub Actions.",
        "Pure typographic 2D vector flat-layered design system with zero icon or emoji dependencies.",
        "Strict TypeScript typing throughout data models and component interfaces."
      ]
    }
  ],

  socials: [
    {
      label: "LinkedIn",
      handle: "in/thinhthai",
      url: "https://linkedin.com/in/thinhthai"
    },
    {
      label: "GitHub",
      handle: "github.com/soodthin",
      url: "https://github.com/soodthin"
    },
    {
      label: "Email",
      handle: "thinhthai963@gmail.com",
      url: "mailto:thinhthai963@gmail.com"
    },
    {
      label: "Phone",
      handle: "0869922096",
      url: "tel:0869922096"
    }
  ]
};
