import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Thai Do Thinh",
    title: "Software Engineer // Full-Stack Developer",
    roleDescription: "Final-year Computer Science student who has built and deployed several real web products, from database design to frontend and backend. Comfortable with Java, Python, JavaScript, TypeScript, C++, and frameworks like React and Spring Boot. I use AI coding tools daily to work faster while still reviewing everything myself. Looking for a Developer role to keep building real things.",
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
    period: "Oct 2022 — Present",
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
      description: "Core programming and scripting languages for systems and web.",
      skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "Java" },
        { name: "Python" },
        { name: "C++ (Basic)" }
      ]
    },
    {
      category: "Frameworks & Platforms",
      description: "Fullstack development frameworks across frontend and backend services.",
      skills: [
        { name: "ReactJS" },
        { name: "Next.js" },
        { name: "Spring Boot" },
        { name: "FastAPI" },
        { name: "Django" },
        { name: "Tailwind CSS" },
        { name: "RESTful API" }
      ]
    },
    {
      category: "Databases",
      description: "Relational data persistence, schema design, and caching layers.",
      skills: [
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Redis" }
      ]
    },
    {
      category: "Tools & DevOps",
      description: "Development tools, API testing, version control and deployments.",
      skills: [
        { name: "Git" },
        { name: "GitHub Actions" },
        { name: "Postman" },
        { name: "Render" },
        { name: "Microsoft Office" }
      ]
    },
    {
      category: "AI-Assisted Engineering",
      description: "Leveraging cutting-edge AI tools to accelerate development velocity.",
      skills: [
        { name: "Claude Code" },
        { name: "Codex" },
        { name: "Antigravity (IDE)" },
        { name: "Prompt Engineering" },
        { name: "Code Review & Verification" }
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
      description: "Engineered an internal web application used by the finance and accounting team to process bank statements and generate automated cash reports, handling transaction extraction, classification, and reconciliation.",
      highlights: [
        "Bank Statement Parsing: Built REST APIs with FastAPI, including parsers for 10+ banks (VCB, TCB, BIDV, ACB, MBB...) to automatically extract transaction data from uploaded statements, with OCR fallback via Gemini for scanned files.",
        "Cash Report Automation: Built a session-based pipeline to process and reconcile cash reports from multiple uploaded files, including automated transaction classification based on rules learned from the finance team's feedback — cutting processing time from about a day to two hours.",
        "Security & Access Control: Implemented enterprise-grade authentication with Google OAuth2 SSO (restricted to company email domain), JWT access tokens with refresh-token session tracking across devices, plus role-based access control (RBAC) separating admin and finance-team permissions.",
        "Frontend Integration: Built the UI with React, TypeScript, and Tailwind CSS for both workflows, including a review/classification screen and a real-time progress tracker (via SSE) for long-running file processing.",
        "Reliability & Monitoring: Set up centralized structured logging and health-check endpoints, plus an internal admin dashboard tracking AI usage cost, active sessions, and processing stats in real time.",
        "Documentation: Wrote step-by-step usage guides with screenshots so the finance team could use both tools on their own."
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Redis", "Google OAuth2", "SSE"]
    }
  ],

  projects: [
    {
      id: "project-01",
      number: "01",
      title: "FlexiConnect Web",
      subtitle: "Job Portal & Application Tracker Platform",
      description: "Full-featured recruitment platform connecting candidates, employers, and administrators with comprehensive role-based access, job lifecycle management, and application workflows.",
      tags: ["Spring Boot", "ReactJS", "Vite", "Tailwind CSS", "MySQL", "Spring Security", "JWT", "Render"],
      githubUrl: "https://github.com/soodthin/FlexiConnect",
      featured: true,
      keyHighlights: [
        "Backend & Database: Built REST APIs with Spring Boot and Spring Data JPA on a MySQL database, handling job listings, applications, and role-based access for candidates, employers, and admin.",
        "Security: Implemented authentication and authorization with Spring Security and JWT.",
        "Frontend Integration: Built the UI with ReactJS, Vite, and Tailwind CSS, consuming the backend REST API across all three user roles.",
        "Deployment: Deployed on Render, resolving build errors independently to keep the app stable."
      ]
    },
    {
      id: "project-02",
      number: "02",
      title: "Food Delivery & Restaurant Booking App",
      subtitle: "Fullstack Mobile Experience with Dual-Role Portals",
      description: "Cross-platform mobile application covering customer food delivery ordering, table reservations, restaurant menu management, and dedicated kitchen staff (chef) workflows.",
      tags: ["React Native", "Expo", "Django", "Django REST Framework", "MoMo", "Stripe", "Firebase"],
      githubUrl: "https://github.com/soodthin/T-Restaurant-App",
      featured: true,
      keyHighlights: [
        "Backend & Database: Built REST APIs with Django REST Framework, covering menus, table bookings, orders, and reviews.",
        "Payment Integration: Integrated MoMo and Stripe for order payments, including webhook handling for payment confirmation.",
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
