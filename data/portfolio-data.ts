import { Locale, PortfolioData } from '@/types/portfolio';

// Common technical skills contextual index
const COMMON_SKILL_CONTEXTS = {
  JavaScript: [
    { type: 'project' as const, label: 'FlexiConnect Web' },
    { type: 'project' as const, label: 'Saigon Savory App' },
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  TypeScript: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
  ],
  Java: [
    { type: 'project' as const, label: 'FlexiConnect Web (Spring Boot)' },
  ],
  Python: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC (FastAPI)' },
    { type: 'project' as const, label: 'Saigon Savory App (Django REST)' },
  ],
  SQL: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC (PostgreSQL)' },
    { type: 'project' as const, label: 'FlexiConnect Web (MySQL)' },
  ],
  'Spring Boot': [
    { type: 'project' as const, label: 'FlexiConnect Web' },
  ],
  'Spring Security': [
    { type: 'project' as const, label: 'FlexiConnect Web (RBAC & JWT)' },
  ],
  'Spring Data JPA': [
    { type: 'project' as const, label: 'FlexiConnect Web (Hibernate)' },
  ],
  FastAPI: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  'Django REST Framework': [
    { type: 'project' as const, label: 'Saigon Savory App' },
  ],
  'RESTful API': [
    { type: 'project' as const, label: 'FlexiConnect Web (78 APIs)' },
    { type: 'project' as const, label: 'Saigon Savory App (26 APIs)' },
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  ReactJS: [
    { type: 'project' as const, label: 'FlexiConnect Web' },
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
  ],
  'React Native (Expo)': [
    { type: 'project' as const, label: 'Saigon Savory App' },
  ],
  'Next.js': [
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
  ],
  'Tailwind CSS': [
    { type: 'project' as const, label: 'FlexiConnect Web' },
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  PostgreSQL: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  MySQL: [
    { type: 'project' as const, label: 'FlexiConnect Web (23 tables)' },
  ],
  Redis: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC (Caching & SSO)' },
  ],
  Firebase: [
    { type: 'project' as const, label: 'Saigon Savory App (Real-time Chat)' },
  ],
  Docker: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC (Containerization)' },
    { type: 'project' as const, label: 'FlexiConnect Web (Multi-stage Build)' },
  ],
  'JUnit 5': [
    { type: 'project' as const, label: 'FlexiConnect Web (46 Service Tests)' },
  ],
  Mockito: [
    { type: 'project' as const, label: 'FlexiConnect Web (46 Service Tests)' },
  ],
  Vite: [
    { type: 'project' as const, label: 'FlexiConnect Web (Role-Guarded Routes)' },
  ],
  'OAuth2 (Google SSO)': [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  n8n: [
    { type: 'project' as const, label: 'FlexiConnect Web (AI Workflows)' },
  ],
  Git: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
    { type: 'project' as const, label: 'FlexiConnect Web' },
    { type: 'project' as const, label: 'Saigon Savory App' },
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
  ],
  'GitHub Actions': [
    { type: 'project' as const, label: 'Dev Portfolio Engine (CI/CD)' },
  ],
  Postman: [
    { type: 'exp' as const, label: 'BW Industrial Dev JSC (API Testing)' },
    { type: 'project' as const, label: 'FlexiConnect Web' },
  ],
  Render: [
    { type: 'project' as const, label: 'FlexiConnect Web (Cloud Host)' },
  ],
  'Claude Code': [
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
    { type: 'exp' as const, label: 'BW Industrial Dev JSC' },
  ],
  Codex: [
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
  ],
  'Antigravity (IDE)': [
    { type: 'project' as const, label: 'Dev Portfolio Engine' },
  ],
  'Prompt Engineering': [
    { type: 'exp' as const, label: 'BWID Bank Statement OCR Fallback' },
  ],
  'Code Verification': [
    { type: 'exp' as const, label: 'BWID Release Quality Control' },
  ],
};

const COMMON_PROJECT_SCREENSHOTS = {
  flexiconnect: [
    {
      src: '/images/flexiconnect/1-job-search.png',
      captionEn: 'Dynamic faceted search across locations, categories, and salary ranges with real-time query optimization.',
      captionVi: 'Bộ lọc và tìm kiếm việc làm đa tiêu chí theo địa điểm, ngành nghề và mức lương với truy vấn tối ưu thời gian thực.',
      title: 'Job Search & Filter Engine',
    },
    {
      src: '/images/flexiconnect/2-job-detail-map.png',
      captionEn: 'Interactive vacancy specification with Leaflet job map and OSM Nominatim geocoding fallback.',
      captionVi: 'Chi tiết vị trí tuyển dụng tích hợp bản đồ Leaflet định vị địa lý OSM Nominatim tương tác.',
      title: 'Job Detail & Interactive Location Map',
    },
    {
      src: '/images/flexiconnect/3-candidate-profile.png',
      captionEn: 'Candidate profile with Cloudinary CV upload and automated CV section parsing synced into application records.',
      captionVi: 'Hồ sơ ứng viên tích hợp tải CV lên Cloudinary và tự động bóc tách các mục trong CV đồng bộ vào hồ sơ.',
      title: 'Candidate Profile & CV Storage',
    },
    {
      src: '/images/flexiconnect/4-ai-interview.png',
      captionEn: 'Turn-based mock interview workflow powered by n8n AI webhooks scored across 4 core competencies.',
      captionVi: 'Quy trình mô phỏng phỏng vấn thử theo lượt qua n8n AI webhook chấm điểm trên 4 tiêu chí năng lực.',
      title: 'AI Mock Interview Module',
    },
    {
      src: '/images/flexiconnect/5-ai-feedback.png',
      captionEn: 'Granular evaluation report analyzing communication, technical depth, and actionable growth feedback across 4 metrics.',
      captionVi: 'Báo cáo đánh giá chi tiết phân tích độ sâu kỹ thuật, khả năng giao tiếp và gợi ý cải thiện trên 4 tiêu chí.',
      title: 'AI Evaluation & Performance Scoring',
    },
    {
      src: '/images/flexiconnect/6-admin-dashboard.png',
      captionEn: 'Role-based administrative controls with Pageable pagination for users, jobs, and transactions.',
      captionVi: 'Cổng quản trị phân quyền đa cấp, phân trang dữ liệu người dùng, bài đăng và giao dịch.',
      title: 'Enterprise Administration Portal',
    },
    {
      src: '/images/flexiconnect/7-post-job.png',
      captionEn: 'Employer portal to draft vacancies, manage applicant pipelines, and track job analytics.',
      captionVi: 'Giao diện nhà tuyển dụng đăng tin, quản lý hồ sơ ứng viên và theo dõi thống kê hiệu suất.',
      title: 'Employer Job Publishing Portal',
    },
    {
      src: '/images/flexiconnect/8-auth-portal.png',
      captionEn: 'Multi-role JWT login gateway with BCrypt password hashing and session authorization.',
      captionVi: 'Cổng xác thực đa vai trò Spring Security với mã hóa BCrypt và phân quyền phiên bằng JWT.',
      title: 'Spring Security & JWT Authentication',
    },
  ],
  restaurant: [
    {
      src: '/images/restaurant/1-menu-home.jpg',
      captionEn: 'Categorized menu browsing with price filtering, dish comparisons, and chef specials.',
      captionVi: 'Khám phá thực đơn theo danh mục, lọc theo mức giá, so sánh món ăn và gợi ý từ đầu bếp.',
      title: 'Interactive Menu & Dish Discovery',
    },
    {
      src: '/images/restaurant/2-dish-detail.png',
      captionEn: 'Customizable meal options, dietary preferences, ingredient notes, and review scores.',
      captionVi: 'Tùy chọn khẩu phần, yêu cầu chế biến theo khẩu vị và điểm xếp hạng thực tế.',
      title: 'Dish Customization & Portions',
    },
    {
      src: '/images/restaurant/3-cart-checkout.png',
      captionEn: 'Dual-mode ordering supporting immediate delivery and advance dining table reservation.',
      captionVi: 'Đặt hàng linh hoạt hai chế độ: giao hàng tận nơi hoặc đặt bàn trước tại nhà hàng.',
      title: 'Cart & Table Reservation Engine',
    },
    {
      src: '/images/restaurant/4-order-momo.png',
      captionEn: 'Deep payment integration with MoMo e-wallet and Stripe with automated webhook verification.',
      captionVi: 'Tích hợp cổng thanh toán ví điện tử MoMo và Stripe qua webhook xác thực tự động.',
      title: 'Automated MoMo & Stripe Checkout',
    },
    {
      src: '/images/restaurant/5-reviews.png',
      captionEn: 'Transparent customer rating and photo feedback system linked directly to completed orders.',
      captionVi: 'Hệ thống xếp hạng và phản hồi ảnh thực tế gắn liền với đơn hàng đã hoàn tất.',
      title: 'Verified Customer Reviews',
    },
    {
      src: '/images/restaurant/6-auth-login.png',
      captionEn: 'Secure mobile login directing users to customer booking flow or kitchen staff order fulfillment.',
      captionVi: 'Xác thực di động phân luồng cho khách đặt hàng và nhân viên bếp theo dõi đơn thực tế.',
      title: 'Dual-Role Customer & Kitchen Access',
    },
  ],
};

export const portfolioDataEn: PortfolioData = {
  profile: {
    name: 'Thai Do Thinh',
    title: 'Software Engineer · FinTech Automation',
    roleDescription: 'Final-year Computer Science student with backend and full-stack experience in Python, Java, and TypeScript. During a 6-month internship at BW Industrial, built automated pipelines with FastAPI, PostgreSQL, Redis, and Docker that cut manual work from 1 day to 2 hours. Skilled in RESTful APIs, unit testing, and AI workflows, eager to build scalable, real-world software.',
    statusText: 'Available for Software Engineering Roles · Ho Chi Minh City',
    location: 'Ho Chi Minh City, Vietnam (GMT+7)',
    email: 'thinhthai963@gmail.com',
    phone: '(+84) 869 922 096',
    // resumeUrl: Set to a static PDF path (e.g., '/docs/version2.1.pdf') when hosted.
    // When left empty (""), the Resume CTA triggers window.print() with a 2-page print stylesheet.
    resumeUrl: '',
    avatarUrl: '/images/avatar.webp', // Switch back to '/images/avatar.png' if WebP not yet generated
    aboutParagraphs: [
      'I am a final-year Computer Science student at Ho Chi Minh City Open University with backend and full-stack engineering experience across Python, Java, and TypeScript.',
      'During my 6-month internship at BW Industrial Development Joint Stock Company, I built automated financial pipelines with FastAPI, PostgreSQL, Redis, and Docker that cut manual statement processing and reconciliation from 1 day to 2 hours. Skilled in high-concurrency RESTful APIs, unit testing with JUnit 5/Mockito, and AI workflows, I am eager to build scalable, real-world software.',
    ],
    meta: {
      title: 'Thai Do Thinh — Software Engineer & FinTech Automation Specialist',
      description: 'Personal portfolio of Thai Do Thinh (Sood). Specializing in FinTech automation, AI-driven reconciliation pipelines, high-throughput backend systems with FastAPI, Django REST, React, and Next.js.',
      keywords: ['Thai Do Thinh', 'Software Engineer', 'FinTech Automation', 'FastAPI', 'Spring Boot', 'Next.js', 'React', 'Vietnam Developer'],
    },
  },

  metrics: [
    {
      value: 13,
      suffix: '+',
      label: 'Banks Integrated',
      description: 'Automated statement parsers & OCR fallback for Vietnamese financial institutions.',
    },
    {
      value: 75,
      suffix: '%',
      label: 'Manual Time Cut',
      description: 'Accelerated accounting reconciliation cycle from 1 full business day down to 2 hours.',
    },
    {
      value: 104,
      suffix: '+',
      label: 'Production REST APIs',
      description: '78 FlexiConnect Spring Boot, 26 Saigon Savory Django REST, and BWID FastAPI endpoints.',
    },
    {
      value: 3,
      suffix: '',
      label: 'Shipped Systems',
      description: 'Full-stack production platforms spanning enterprise FinTech, SaaS, and mobile delivery.',
    },
  ],

  education: {
    school: 'Ho Chi Minh City Open University (HCMCOU)',
    degree: 'Bachelor of Science in Computer Science',
    major: 'Computer Science',
    period: 'Oct 2022 — Dec 2026 (Expected)',
    gpa: 'Good Standing',
    status: 'Final Year Senior',
    coursework: [
      'Software Engineering',
      'Web System Development',
      'Object-Oriented Programming (OOP)',
      'Data Structures & Algorithms',
      'Modern Programming Technologies',
      'Database Management Systems',
      'Cloud Computing',
    ],
  },

  languages: [
    {
      language: 'Vietnamese',
      proficiency: 'Native Proficiency',
      levelPercent: 100,
      description: 'Mother tongue, technical documentation, client & team communication.',
    },
    {
      language: 'English',
      proficiency: 'Professional Working Proficiency',
      levelPercent: 85,
      description: 'Technical literature, system architecture specs, international collaboration.',
    },
  ],

  skills: [
    {
      category: 'Languages',
      description: 'Core typed systems and scripting languages for backends and reactive web.',
      skills: [
        { name: 'Java', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Java },
        { name: 'Python', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Python },
        { name: 'TypeScript', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.TypeScript },
        { name: 'JavaScript', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS.JavaScript },
        { name: 'SQL', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.SQL },
      ],
    },
    {
      category: 'Frameworks & Platforms',
      description: 'Production web frameworks, ORMs, secure authentication, and mobile platforms.',
      skills: [
        { name: 'FastAPI', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.FastAPI },
        { name: 'Spring Boot', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Spring Boot'] },
        { name: 'Spring Security', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Spring Security'] },
        { name: 'Spring Data JPA', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Spring Data JPA'] },
        { name: 'Django REST Framework', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['Django REST Framework'] },
        { name: 'RESTful API', level: 'Expert', contexts: COMMON_SKILL_CONTEXTS['RESTful API'] },
        { name: 'OAuth2 (Google SSO)', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['OAuth2 (Google SSO)'] },
        { name: 'ReactJS', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.ReactJS },
        { name: 'Tailwind CSS', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Tailwind CSS'] },
        { name: 'Vite', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Vite },
        { name: 'React Native (Expo)', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['React Native (Expo)'] },
        { name: 'Next.js', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['Next.js'] },
      ],
    },
    {
      category: 'Databases',
      description: 'Relational ACID persistence, distributed caching layers, and real-time stores.',
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.PostgreSQL },
        { name: 'MySQL', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.MySQL },
        { name: 'Redis', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS.Redis },
        { name: 'Firebase', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS.Firebase },
      ],
    },
    {
      category: 'Tools & DevOps',
      description: 'Containerization, automated pipelines, testing harnesses, and API debugging.',
      skills: [
        { name: 'Docker', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS.Docker },
        { name: 'Git', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Git },
        { name: 'GitHub Actions', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['GitHub Actions'] },
        { name: 'JUnit 5', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['JUnit 5'] },
        { name: 'Mockito', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Mockito },
        { name: 'Postman', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Postman },
        { name: 'Render', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS.Render },
      ],
    },
    {
      category: 'AI-Assisted Engineering',
      description: 'Modern LLM tooling, multi-agent orchestrators, and prompt engineering.',
      skills: [
        { name: 'Claude Code', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Claude Code'] },
        { name: 'Codex', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.Codex },
        { name: 'Antigravity (IDE)', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Antigravity (IDE)'] },
        { name: 'n8n', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.n8n },
        { name: 'Prompt Engineering', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Prompt Engineering'] },
        { name: 'Code Verification', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Code Verification'] },
      ],
    },
  ],

  experiences: [
    {
      period: 'Oct 2025 — Apr 2026',
      role: 'Finance AI & Automation Intern',
      company: 'BW Industrial Development Joint Stock Company (Vietnam)',
      companyUrl: 'https://bwindustrial.com/',
      location: 'Ho Chi Minh City, Vietnam',
      projectTitle: 'Finance Data Processing Web',
      projectUrl: 'https://bwid-automation.onrender.com/',
      teamSize: '3 Members',
      description: 'An internal web app used by the finance/accounting team to process bank statements and generate cash reports, automating transaction extraction, classification, and reconciliation.',
      highlights: [
        'Bank Statement Parsing: Built FastAPI parsers in Python for 13 banks (Strategy/Factory pattern) to extract data from 10–30 statements per batch (up to 50 files), with Gemini OCR capped at 3 concurrent streams and per-file error isolation so one bad file never fails the batch.',
        'Cash Report Automation: Built a Python/PostgreSQL pipeline reconciling 500–3,000 rows per run using 50-row AI classification batches with rule-based fallback, cutting processing time for 3+ finance users from 1 day to 2 hours.',
        'Performance & Caching (Redis): Built an async Redis cache service (redis.asyncio) with SHA-256 content hashing, mget/pipeline bulk operations, 7-day TTL, and graceful degradation when Redis is unavailable.',
        'Security & Auth: Secured APIs with domain-restricted Google OAuth2 SSO, JWT refresh-token rotation, and RBAC across 2 roles, limiting each user to 5 concurrent sessions.',
        'Frontend & DevOps: Built the React, TypeScript, and Tailwind CSS UI with SSE real-time progress, an Axios 401 refresh-queue interceptor, and per-call AI token usage tracking; containerized the backend with Docker.',
      ],
      technologies: ['FastAPI', 'Python', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker', 'Google OAuth2', 'Gemini AI'],
      pipelineStages: [
        {
          step: '01',
          name: 'Multi-Bank Ingestion',
          title: '13 Bank Formats Ingested',
          description: 'Handles unstructured PDFs, Excel workbooks, and statement batches across 13 commercial banks using Strategy/Factory pattern.',
          detail: 'High-concurrency upload gateway processing 10–30 statements per batch (up to 50 files) with per-file error isolation.',
          metric: '13 Banks',
        },
        {
          step: '02',
          name: 'OCR & AI Extraction',
          title: 'FastAPI + 3-Stream Gemini OCR',
          description: 'Asynchronous extraction pipeline with Gemini OCR capped at 3 concurrent streams for scanned or degraded statements.',
          detail: 'Strategy/Factory parsers with per-file error isolation ensuring single file errors never halt batch execution.',
          metric: '3 Streams',
        },
        {
          step: '03',
          name: 'Performance & Caching',
          title: 'Async Redis SHA-256 Cache',
          description: 'Async Redis cache service (redis.asyncio) with SHA-256 content hashing, mget/pipeline bulk ops, and 7-day TTL.',
          detail: 'Graceful degradation fallback preserving service availability when Redis is temporarily unreachable.',
          metric: '7-Day TTL',
        },
        {
          step: '04',
          name: 'Cash Report Automation',
          title: '50-Row AI Classification Batches',
          description: 'Reconciles 500–3,000 transaction rows per run with rule-based fallback, cutting turnaround for 3+ finance users from 1 day to 2 hours.',
          detail: 'Automated ledger matching and reconciliation pipeline compressing finance turnaround from 1 full day down to 2 hours.',
          metric: '1d → 2h',
        },
        {
          step: '05',
          name: 'Security & DevOps',
          title: 'OAuth2 SSO + SSE Live Telemetry',
          description: 'Domain-restricted Google OAuth2 SSO, JWT refresh rotation (5 sessions/user), and live SSE token usage telemetry.',
          detail: 'Axios 401 refresh-queue interceptor, RBAC across 2 roles, and full Docker containerization.',
          metric: 'Docker',
        },
      ],
    },
  ],

  projects: [
    {
      id: 'project-01',
      number: '01',
      title: 'FlexiConnect Web',
      subtitle: 'Job Portal & Application Tracker',
      description: 'End-to-end multi-role recruitment and career platform connecting job seekers, corporate employers, and system administrators with complete application workflows and interactive AI mock interviews.',
      tags: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'ReactJS', 'Tailwind CSS', 'Vite', 'JUnit 5', 'Mockito', 'Docker', 'Render'],
      demoUrl: 'https://flexiconnectweb.onrender.com/',
      githubUrl: 'https://github.com/soodthin/FlexiConnect',
      featured: true,
      screenshots: COMMON_PROJECT_SCREENSHOTS.flexiconnect.map((item) => item.src),
      imagesList: COMMON_PROJECT_SCREENSHOTS.flexiconnect,
      metricsList: [
        { label: 'REST APIs', value: '78' },
        { label: 'Database Tables', value: '23' },
        { label: 'Controllers', value: '12' },
        { label: 'User Roles', value: '3' },
      ],
      keyHighlights: [
        'Backend & Security: Built Spring Boot/JPA REST APIs over a 23-entity MySQL schema for a recruitment platform with 3 roles (Admin, Employer, Candidate), secured with Spring Security/JWT and role-guarded React/Vite routes.',
        'AI Workflows: Integrated n8n AI webhooks for turn-based mock interviews scored on 4 metrics, and automated CV section parsing synced into candidate profiles.',
        'Third-Party Integrations: Integrated MoMo payment, Cloudinary CV storage, and 4 SMTP email flows with an employer audit log; built a Leaflet job map with OSM Nominatim geocoding and client-side fallback.',
        'Testing & Deployment: Wrote 46 JUnit 5/Mockito service tests; containerized the backend with a multi-stage Docker build and deployed on Render.',
      ],
      architectureNotes: [
        'Multi-Tier MVC Architecture with strict separation of Controller, Service, and Repository layers.',
        'Turn-based AI mock interview workflow via n8n webhooks scored across 4 evaluation metrics.',
        'Interactive Leaflet map with OSM Nominatim geocoding and client-side fallback mechanism.',
        'Multi-stage Docker build deployed on Render with Spring Security & stateless JWT authorization.',
      ],
    },
    {
      id: 'project-02',
      number: '02',
      title: 'Saigon Savory App',
      subtitle: 'Food Delivery & Restaurant Booking App',
      description: 'Cross-platform mobile application combining real-time food delivery ordering, restaurant table reservations, dish customization, and dual-portal kitchen staff management workflows.',
      tags: ['React Native', 'Expo', 'Python', 'Django REST Framework', 'RESTful API', 'MoMo', 'Stripe', 'Firebase'],
      githubUrl: 'https://github.com/soodthin/T-Restaurant-App',
      featured: true,
      screenshots: COMMON_PROJECT_SCREENSHOTS.restaurant.map((item) => item.src),
      imagesList: COMMON_PROJECT_SCREENSHOTS.restaurant,
      metricsList: [
        { label: 'Endpoints', value: '26' },
        { label: 'Payment Gateways', value: '2' },
        { label: 'Portals', value: '2' },
        { label: 'Real-time Chat', value: 'Firebase' },
      ],
      keyHighlights: [
        'Backend & Database: Built 26 RESTful APIs using Python and Django REST Framework covering menus, dish comparisons, table bookings, order workflows, and 90-day chef revenue stats.',
        'Payment Integration: Integrated 2 payment gateways (MoMo and Stripe) with 4 webhook and redirect endpoints to automate order payment confirmation and cancellation.',
        'Frontend Integration: Built the mobile UI with React Native and Expo, covering separate flows for customers and kitchen staff (chefs).',
        'Real-time Features: Implemented in-app chat between customers and the restaurant using Firebase.',
      ],
      architectureNotes: [
        'Django ORM with optimized select_related and prefetch_related query optimization.',
        'Automated webhook idempotency validation for MoMo and Stripe transactions.',
        'Staggered layered mobile viewports optimized for 60fps gesture transitions.',
      ],
    },
    {
      id: 'project-03',
      number: '03',
      title: 'Dev Portfolio Engine',
      subtitle: 'Static-Export Architecture & Bilingual Typography',
      description: 'Static-export developer portfolio built with Next.js 16, React 19, and Tailwind CSS v4. Compiled to static HTML/CSS/JS bundles and deployed automatically via GitHub Actions.',
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Lenis', 'Motion', 'GitHub Actions', 'GitHub Pages'],
      demoUrl: 'https://soodthin.github.io/dev-portfolio/',
      githubUrl: 'https://github.com/soodthin/dev-portfolio',
      featured: true,
      metricsList: [
        { label: 'Framework', value: 'Next.js 16' },
        { label: 'UI Library', value: 'React 19' },
        { label: 'Type Safety', value: 'Strict TS' },
        { label: 'Delivery', value: 'Static SSG' },
        { label: 'Localization', value: 'EN / VI' },
      ],
      keyHighlights: [
        'Static Export Pipeline: Configured with Next.js static output (output: export) and automatic GitHub Pages subpath prefixing via getAssetPath.',
        'Bilingual Typography & Themes: Pairs Newsreader display headings, Be Vietnam Pro UI copy, and JetBrains Mono indices across WCAG AA/AAA dark and light themes.',
        'GPU-Composited Motion: Uses motion/react and Lenis smooth scrolling with reduced-motion fallbacks and modal scroll-lock synchronization.',
        'Structured Data Layer: Centralized EN/VI portfolio data and translation dictionaries with strict TypeScript interfaces.',
      ],
      architectureNotes: [
        'Tailwind CSS v4 @theme tokens for dark and light modes.',
        'Inline pre-hydration theme script preventing flash of unstyled theme.',
        'Automated CI/CD deployment to GitHub Pages.',
      ],
    },
  ],

  socials: [
    {
      label: 'LinkedIn',
      handle: 'in/thinhthai',
      url: 'https://linkedin.com/in/thinhthai',
    },
    {
      label: 'GitHub',
      handle: 'github.com/soodthin',
      url: 'https://github.com/soodthin',
    },
    {
      label: 'Email',
      handle: 'thinhthai963@gmail.com',
      url: 'mailto:thinhthai963@gmail.com',
    },
    {
      label: 'Phone',
      handle: '(+84) 869 922 096',
      url: 'tel:+84869922096',
    },
  ],
};

export const portfolioDataVi: PortfolioData = {
  profile: {
    name: 'Thái Đỗ Thịnh',
    title: 'Kỹ sư Phần mềm · Tự động hóa FinTech',
    roleDescription: 'Sinh viên năm cuối ngành Khoa học Máy tính có kinh nghiệm backend và full-stack với Python, Java và TypeScript. Trong kỳ thực tập 6 tháng tại BW Industrial, đã xây dựng các đường ống tự động hóa bằng FastAPI, PostgreSQL, Redis và Docker giúp cắt giảm thời gian xử lý thủ công từ 1 ngày xuống còn 2 giờ. Thành thạo RESTful API, unit testing và quy trình AI, sẵn sàng xây dựng các hệ thống phần mềm thực tế, tối ưu và mở rộng.',
    statusText: 'Sẵn sàng cho vị trí Kỹ sư Phần mềm · TP. Hồ Chí Minh',
    location: 'TP. Hồ Chí Minh, Việt Nam (GMT+7)',
    email: 'thinhthai963@gmail.com',
    phone: '(+84) 869 922 096',
    resumeUrl: '',
    avatarUrl: '/images/avatar.webp', // Giữ '/images/avatar.png' nếu chưa chuyển sang WebP
    aboutParagraphs: [
      'Tôi là sinh viên năm cuối chuyên ngành Khoa học Máy tính tại Trường Đại học Mở TP. Hồ Chí Minh với kinh nghiệm kỹ thuật backend và full-stack thực tế trên Python, Java và TypeScript.',
      'Trong kỳ thực tập 6 tháng tại Công ty Cổ phần Phát triển Công nghiệp BW, tôi trực tiếp xây dựng các đường ống tự động hóa tài chính bằng FastAPI, PostgreSQL, Redis và Docker, giúp rút ngắn thời gian xử lý và đối soát sao kê từ 1 ngày làm việc xuống còn 2 giờ. Tôi kết hợp nền tảng kỹ thuật vững vàng với các quy trình AI hiện đại để phát triển phần mềm tin cậy, chuẩn mực và sẵn sàng mở rộng.',
    ],
    meta: {
      title: 'Thái Đỗ Thịnh — Kỹ sư Phần mềm & Chuyên gia Tự động hóa FinTech',
      description: 'Portfolio kỹ thuật của Thái Đỗ Thịnh. Chuyên sâu tự động hóa tài chính, đường ống đối soát dữ liệu bằng AI, kiến trúc backend hiệu năng cao với FastAPI, Django REST, React và Next.js.',
      keywords: ['Thái Đỗ Thịnh', 'Kỹ sư Phần mềm', 'Tự động hóa FinTech', 'FastAPI', 'Spring Boot', 'Next.js', 'React', 'Lập trình viên Việt Nam'],
    },
  },

  metrics: [
    {
      value: 13,
      suffix: '+',
      label: 'Ngân hàng tích hợp',
      description: 'Bộ trích xuất sao kê tự động & OCR dự phòng cho các định chế tài chính Việt Nam.',
    },
    {
      value: 75,
      suffix: '%',
      label: 'Giảm thời gian xử lý',
      description: 'Đẩy nhanh chu kỳ đối soát kế toán từ 1 ngày làm việc xuống còn 2 giờ.',
    },
    {
      value: 104,
      suffix: '+',
      label: 'REST API Production',
      description: '78 endpoint FlexiConnect Spring Boot, 26 endpoint Saigon Savory Django REST và hệ thống BWID FastAPI.',
    },
    {
      value: 3,
      suffix: '',
      label: 'Hệ thống hoàn chỉnh',
      description: 'Các nền tảng production từ FinTech nội bộ, cổng tuyển dụng đến app di động.',
    },
  ],

  education: {
    school: 'Trường Đại học Mở TP. Hồ Chí Minh (HCMCOU)',
    degree: 'Cử nhân Khoa học Máy tính',
    major: 'Khoa học Máy tính',
    period: 'Tháng 10/2022 — Tháng 12/2026 (Dự kiến)',
    gpa: 'Khá Giỏi',
    status: 'Sinh viên năm cuối',
    coursework: [
      'Kỹ thuật Phần mềm',
      'Phát triển Hệ thống Web',
      'Lập trình Hướng đối tượng (OOP)',
      'Cấu trúc Dữ liệu & Giải thuật',
      'Công nghệ Lập trình Hiện đại',
      'Hệ Quản trị Cơ sở Dữ liệu',
      'Điện toán Đám mây',
    ],
  },

  languages: [
    {
      language: 'Tiếng Việt',
      proficiency: 'Bản ngữ (Native)',
      levelPercent: 100,
      description: 'Tiếng mẹ đẻ, tài liệu kỹ thuật chuyên ngành, giao tiếp đội ngũ và đối tác.',
    },
    {
      language: 'Tiếng Anh',
      proficiency: 'Làm việc Chuyên nghiệp (Professional)',
      levelPercent: 85,
      description: 'Đọc hiểu tài liệu kỹ thuật, đặc tả kiến trúc phần mềm, trao đổi quốc tế.',
    },
  ],

  skills: [
    {
      category: 'Languages',
      description: 'Các ngôn ngữ lập trình định kiểu tĩnh và kịch bản cho hệ thống backend và web phản ứng.',
      skills: [
        { name: 'Java', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Java },
        { name: 'Python', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Python },
        { name: 'TypeScript', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.TypeScript },
        { name: 'JavaScript', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS.JavaScript },
        { name: 'SQL', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.SQL },
      ],
    },
    {
      category: 'Frameworks & Platforms',
      description: 'Các nền tảng web production, ORM, giải pháp xác thực bảo mật và framework di động.',
      skills: [
        { name: 'FastAPI', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.FastAPI },
        { name: 'Spring Boot', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Spring Boot'] },
        { name: 'Spring Security', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Spring Security'] },
        { name: 'Spring Data JPA', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Spring Data JPA'] },
        { name: 'Django REST Framework', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['Django REST Framework'] },
        { name: 'RESTful API', level: 'Chuyên gia', contexts: COMMON_SKILL_CONTEXTS['RESTful API'] },
        { name: 'OAuth2 (Google SSO)', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['OAuth2 (Google SSO)'] },
        { name: 'ReactJS', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.ReactJS },
        { name: 'Tailwind CSS', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Tailwind CSS'] },
        { name: 'Vite', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Vite },
        { name: 'React Native (Expo)', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['React Native (Expo)'] },
        { name: 'Next.js', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['Next.js'] },
      ],
    },
    {
      category: 'Databases',
      description: 'Lưu trữ quan hệ đảm bảo ACID, bộ đệm phân tán tốc độ cao và dữ liệu thời gian thực.',
      skills: [
        { name: 'PostgreSQL', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.PostgreSQL },
        { name: 'MySQL', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.MySQL },
        { name: 'Redis', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS.Redis },
        { name: 'Firebase', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS.Firebase },
      ],
    },
    {
      category: 'Tools & DevOps',
      description: 'Đóng gói container, tự động hóa quy trình CI/CD, kiểm thử phần mềm và gỡ lỗi API.',
      skills: [
        { name: 'Docker', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS.Docker },
        { name: 'Git', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Git },
        { name: 'GitHub Actions', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['GitHub Actions'] },
        { name: 'JUnit 5', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['JUnit 5'] },
        { name: 'Mockito', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Mockito },
        { name: 'Postman', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Postman },
        { name: 'Render', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS.Render },
      ],
    },
    {
      category: 'AI-Assisted Engineering',
      description: 'Ứng dụng các công cụ LLM hiện đại, hệ thống multi-agent và tối ưu hóa câu lệnh (prompting).',
      skills: [
        { name: 'Claude Code', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Claude Code'] },
        { name: 'Codex', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.Codex },
        { name: 'Antigravity (IDE)', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Antigravity (IDE)'] },
        { name: 'n8n', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.n8n },
        { name: 'Prompt Engineering', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Prompt Engineering'] },
        { name: 'Code Verification', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Code Verification'] },
      ],
    },
  ],

  experiences: [
    {
      period: 'Tháng 10/2025 — Tháng 04/2026',
      role: 'Thực tập sinh Tự động hóa & AI Tài chính',
      company: 'Công ty Cổ phần Phát triển Công nghiệp BW (Việt Nam)',
      companyUrl: 'https://bwindustrial.com/',
      location: 'TP. Hồ Chí Minh, Việt Nam',
      projectTitle: 'Finance Data Processing Web',
      projectUrl: 'https://bwid-automation.onrender.com/',
      teamSize: '3 Thành viên',
      description: 'Ứng dụng web nội bộ phục vụ đội ngũ kế toán/tài chính xử lý sao kê ngân hàng và lập báo cáo dòng tiền, tự động hóa quy trình bóc tách giao dịch, phân loại và đối soát kế toán.',
      highlights: [
        'Bóc tách Sao kê Ngân hàng: Xây dựng bộ parser FastAPI bằng Python cho 13 ngân hàng (Strategy/Factory pattern) để trích xuất dữ liệu từ 10–30 sao kê mỗi đợt (tối đa 50 file), kết hợp Gemini OCR giới hạn 3 luồng đồng thời và cơ chế cô lập lỗi từng file giúp một file hỏng không làm gián đoạn cả lô.',
        'Tự động hóa Báo cáo Dòng tiền: Xây dựng đường ống Python/PostgreSQL đối soát 500–3.000 dòng mỗi lượt chạy bằng các lô phân loại AI 50 dòng kết hợp cơ chế dự phòng dựa trên quy tắc (rule-based), rút ngắn thời gian xử lý cho 3+ chuyên viên tài chính từ 1 ngày xuống 2 giờ.',
        'Tối ưu Hiệu năng & Bộ đệm (Redis): Xây dựng dịch vụ đệm Redis bất đồng bộ (redis.asyncio) với mã băm nội dung SHA-256, thao tác hàng loạt mget/pipeline, thời gian sống TTL 7 ngày và cơ chế tự phục hồi (graceful degradation) khi Redis gián đoạn.',
        'Bảo mật & Xác thực: Bảo vệ hệ thống API với Google OAuth2 SSO giới hạn tên miền doanh nghiệp, cơ chế xoay vòng JWT refresh token và phân quyền RBAC trên 2 vai trò, giới hạn mỗi người dùng tối đa 5 phiên đăng nhập đồng thời.',
        'Giao diện Frontend & DevOps: Phát triển giao diện React, TypeScript và Tailwind CSS với tiến trình thời gian thực SSE, bộ đánh chặn Axios 401 refresh-queue interceptor và theo dõi mức tiêu thụ token AI trên từng cuộc gọi; đóng gói toàn bộ backend với Docker.',
      ],
      technologies: ['FastAPI', 'Python', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker', 'Google OAuth2', 'Gemini AI'],
      pipelineStages: [
        {
          step: '01',
          name: 'Thu thập Đa Ngân hàng',
          title: 'Tiếp nhận 13 Định dạng Ngân hàng',
          description: 'Xử lý PDF bảng biểu, file Excel và các lô sao kê từ 13 ngân hàng thương mại áp dụng mẫu thiết kế Strategy/Factory.',
          detail: 'Cổng tiếp nhận đa luồng bóc tách 10–30 sao kê mỗi đợt (tối đa 50 file) với cơ chế cô lập lỗi độc lập từng file.',
          metric: '13 Ngân hàng',
        },
        {
          step: '02',
          name: 'Bóc tách OCR & AI',
          title: 'FastAPI + 3 Luồng Gemini OCR',
          description: 'Đường ống bóc tách bất đồng bộ kết hợp Gemini OCR giới hạn 3 luồng đồng thời xử lý sao kê scan hoặc mờ.',
          detail: 'Bộ parser Strategy/Factory với cơ chế cô lập lỗi giúp một file hỏng không làm gián đoạn toàn bộ đợt xử lý.',
          metric: '3 Luồng',
        },
        {
          step: '03',
          name: 'Hiệu năng & Bộ đệm',
          title: 'Bộ đệm Redis SHA-256 Bất đồng bộ',
          description: 'Dịch vụ đệm Redis (redis.asyncio) với mã băm SHA-256, thao tác hàng loạt mget/pipeline và thời gian sống TTL 7 ngày.',
          detail: 'Cơ chế tự phục hồi (graceful degradation) đảm bảo tính sẵn sàng cao ngay cả khi Redis tạm ngắt kết nối.',
          metric: 'TTL 7 ngày',
        },
        {
          step: '04',
          name: 'Tự động Đối soát Dòng tiền',
          title: 'Phân loại AI theo Lô 50 Dòng',
          description: 'Tự động đối chiếu 500–3.000 dòng giao dịch mỗi đợt chạy kết hợp cơ chế dự phòng rule-based, rút ngắn từ 1 ngày còn 2 giờ.',
          detail: 'Đường ống xử lý phục vụ 3+ chuyên viên tài chính với tính năng tự động khớp sổ cái và cảnh báo sai lệch.',
          metric: '1 ngày → 2h',
        },
        {
          step: '05',
          name: 'Bảo mật & Giám sát Hệ thống',
          title: 'OAuth2 SSO + Tiến trình SSE Thời gian thực',
          description: 'Google OAuth2 SSO theo tên miền, xoay vòng JWT refresh (5 phiên/người dùng) và theo dõi token AI trực tiếp qua SSE.',
          detail: 'Bộ đánh chặn Axios 401 refresh-queue interceptor, phân quyền RBAC 2 vai trò và đóng gói toàn diện với Docker.',
          metric: 'Docker',
        },
      ],
    },
  ],

  projects: [
    {
      id: 'project-01',
      number: '01',
      title: 'FlexiConnect Web',
      subtitle: 'Cổng Tuyển dụng & Theo dõi Hồ sơ Ứng viên (Job Portal & Application Tracker)',
      description: 'Hệ thống tuyển dụng toàn diện kết nối người tìm việc, nhà tuyển dụng và quản trị viên với quy trình ứng tuyển khép kín và tính năng mô phỏng phỏng vấn kỹ thuật bằng AI.',
      tags: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'ReactJS', 'Tailwind CSS', 'Vite', 'JUnit 5', 'Mockito', 'Docker', 'Render'],
      demoUrl: 'https://flexiconnectweb.onrender.com/',
      githubUrl: 'https://github.com/soodthin/FlexiConnect',
      featured: true,
      screenshots: COMMON_PROJECT_SCREENSHOTS.flexiconnect.map((item) => item.src),
      imagesList: COMMON_PROJECT_SCREENSHOTS.flexiconnect,
      metricsList: [
        { label: 'REST APIs', value: '78' },
        { label: 'Bảng CSDL', value: '23' },
        { label: 'Controllers', value: '12' },
        { label: 'Phân quyền', value: '3 vai trò' },
      ],
      keyHighlights: [
        'Backend & Bảo mật: Xây dựng hệ thống REST API bằng Spring Boot/JPA trên cơ sở dữ liệu MySQL 23 thực thể cho nền tảng tuyển dụng 3 vai trò (Admin, Nhà tuyển dụng, Ứng viên), bảo mật với Spring Security/JWT và định tuyến React/Vite phân quyền theo vai trò.',
        'Quy trình AI Tự động: Tích hợp webhook AI qua n8n mô phỏng phỏng vấn thử theo lượt chấm điểm trên 4 tiêu chí, và tự động bóc tách các phần trong CV đồng bộ trực tiếp vào hồ sơ ứng viên.',
        'Tích hợp Dịch vụ Bên thứ ba: Tích hợp cổng thanh toán MoMo, lưu trữ CV trên Cloudinary và 4 luồng email SMTP với nhật ký kiểm toán nhà tuyển dụng; phát triển bản đồ việc làm Leaflet với định vị địa lý OSM Nominatim và cơ chế dự phòng client-side.',
        'Kiểm thử & Triển khai: Viết 46 bộ kiểm thử tầng service với JUnit 5/Mockito; đóng gói backend bằng multi-stage Docker build và triển khai trực tiếp trên Render.',
      ],
      architectureNotes: [
        'Mô hình kiến trúc phân tầng MVC tách biệt rõ rệt giữa Controller, Service và Repository.',
        'Quy trình mô phỏng phỏng vấn AI theo lượt qua webhook n8n chấm điểm trên 4 tiêu chí năng lực.',
        'Bản đồ vị trí việc làm tương tác Leaflet tích hợp định vị địa lý OSM Nominatim và dự phòng client-side.',
        'Đóng gói backend bằng multi-stage Docker build triển khai trên Render với Spring Security & JWT.',
      ],
    },
    {
      id: 'project-02',
      number: '02',
      title: 'Saigon Savory App',
      subtitle: 'Ứng dụng Giao đồ ăn & Đặt bàn Nhà hàng Di động',
      description: 'Ứng dụng di động đa nền tảng kết hợp đặt món giao hàng tận nơi, đặt bàn trước tại nhà hàng, tùy biến khẩu phần và giao diện xử lý đơn hàng chuyên biệt cho đầu bếp.',
      tags: ['React Native', 'Expo', 'Python', 'Django REST Framework', 'RESTful API', 'MoMo', 'Stripe', 'Firebase'],
      githubUrl: 'https://github.com/soodthin/T-Restaurant-App',
      featured: true,
      screenshots: COMMON_PROJECT_SCREENSHOTS.restaurant.map((item) => item.src),
      imagesList: COMMON_PROJECT_SCREENSHOTS.restaurant,
      metricsList: [
        { label: 'Endpoints', value: '26' },
        { label: 'Cổng thanh toán', value: '2' },
        { label: 'Cổng giao diện', value: '2' },
        { label: 'Chat thời gian thực', value: 'Firebase' },
      ],
      keyHighlights: [
        'Backend & Cơ sở Dữ liệu: Xây dựng 26 RESTful API bằng Python và Django REST Framework phục vụ thực đơn, so sánh món ăn, đặt bàn, đặt món và thống kê doanh thu 90 ngày cho đầu bếp.',
        'Tích hợp 2 Cổng Thanh toán: Kết nối ví điện tử MoMo và Stripe qua 4 endpoint webhook xử lý tự động xác nhận hoặc hủy đơn hàng an toàn.',
        'Giao diện Di động Phân luồng: Phát triển với React Native và Expo, cung cấp hai luồng trải nghiệm độc lập cho thực khách và nhân viên bếp.',
        'Tính năng Thời gian thực: Tích hợp tính năng trò chuyện trực tiếp giữa khách hàng và nhà hàng dựa trên Firebase real-time listeners.',
      ],
      architectureNotes: [
        'Tối ưu hóa truy vấn Django ORM thông qua select_related và prefetch_related.',
        'Cơ chế chống gọi lặp (idempotency) an toàn cho các giao dịch webhook MoMo và Stripe.',
        'Bố cục màn hình di động so le tầng hỗ trợ chuyển động mượt mà 60fps.',
      ],
    },
    {
      id: 'project-03',
      number: '03',
      title: 'Dev Portfolio Engine',
      subtitle: 'Kiến trúc Xuất Tĩnh & Thiết kế Song ngữ',
      description: 'Portfolio cá nhân xây dựng bằng Next.js 16, React 19 và Tailwind CSS v4, biên dịch tĩnh SSG hoàn toàn và triển khai tự động qua GitHub Actions.',
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Lenis', 'Motion', 'GitHub Actions', 'GitHub Pages'],
      demoUrl: 'https://soodthin.github.io/dev-portfolio/',
      githubUrl: 'https://github.com/soodthin/dev-portfolio',
      featured: true,
      metricsList: [
        { label: 'Framework', value: 'Next.js 16' },
        { label: 'Thư viện UI', value: 'React 19' },
        { label: 'Kiểu dữ liệu', value: 'Strict TS' },
        { label: 'Triển khai', value: 'Static SSG' },
        { label: 'Ngôn ngữ', value: 'EN / VI' },
      ],
      keyHighlights: [
        'Xuất tĩnh Static Export: Tương thích hoàn toàn với output: export của Next.js và tự động ghép subpath GitHub Pages qua getAssetPath.',
        'Kiểu chữ & Chủ đề Song ngữ: Kết hợp Newsreader, Be Vietnam Pro và JetBrains Mono đầy đủ dấu tiếng Việt với 2 chế độ Sáng/Tối đạt chuẩn tương phản.',
        'Chuyển động Tối ưu GPU: Sử dụng motion/react và Lenis cuộn mượt, tự động tạm dừng khi mở modal và tôn trọng cài đặt giảm chuyển động.',
        'Dữ liệu Tập trung: Quản lý đồng bộ song ngữ EN/VI với TypeScript strict, không có chuỗi văn bản gán cứng.',
      ],
      architectureNotes: [
        'Hệ thống token Tailwind CSS v4 @theme cho 2 chế độ Sáng/Tối.',
        'Script đồng bộ dark mode trước khi render giúp tránh chớp giao diện.',
        'Quy trình CI/CD triển khai tự động lên GitHub Pages.',
      ],
    },
  ],

  socials: [
    {
      label: 'LinkedIn',
      handle: 'in/thinhthai',
      url: 'https://linkedin.com/in/thinhthai',
    },
    {
      label: 'GitHub',
      handle: 'github.com/soodthin',
      url: 'https://github.com/soodthin',
    },
    {
      label: 'Email',
      handle: 'thinhthai963@gmail.com',
      url: 'mailto:thinhthai963@gmail.com',
    },
    {
      label: 'Số điện thoại',
      handle: '0869 922 096',
      url: 'tel:+84869922096',
    },
  ],
};

export const portfolioData: Record<Locale, PortfolioData> = {
  en: portfolioDataEn,
  vi: portfolioDataVi,
};

export function getPortfolioData(locale: Locale): PortfolioData {
  return portfolioData[locale] || portfolioData.en;
}
