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
  ],
  'JUnit 5': [
    { type: 'project' as const, label: 'FlexiConnect Web (Unit Testing)' },
  ],
  Mockito: [
    { type: 'project' as const, label: 'FlexiConnect Web (Mocking & Edge Cases)' },
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
      captionEn: 'Rich vacancy specification showing requirements, compensation package, and interactive office location.',
      captionVi: 'Chi tiết vị trí tuyển dụng với mô tả công việc, chế độ đãi ngộ và bản đồ vị trí văn phòng tương tác.',
      title: 'Job Detail & Interactive Location Map',
    },
    {
      src: '/images/flexiconnect/3-candidate-profile.png',
      captionEn: 'Comprehensive candidate profile with Cloudinary CV upload and application status pipeline.',
      captionVi: 'Hồ sơ ứng viên toàn diện tích hợp tải CV lên Cloudinary và theo dõi trạng thái ứng tuyển.',
      title: 'Candidate Profile & CV Storage',
    },
    {
      src: '/images/flexiconnect/4-ai-interview.png',
      captionEn: 'Interactive technical interview simulation asking tailored behavioral and algorithm questions.',
      captionVi: 'Mô phỏng phỏng vấn kỹ thuật tương tác với câu hỏi thuật toán và tình huống thực tế.',
      title: 'AI Mock Interview Module',
    },
    {
      src: '/images/flexiconnect/5-ai-feedback.png',
      captionEn: 'Granular scoring report analyzing communication, technical depth, and actionable growth feedback.',
      captionVi: 'Báo cáo chấm điểm chi tiết phân tích độ sâu kỹ thuật, khả năng giao tiếp và gợi ý cải thiện.',
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
    roleDescription: 'Final-year Computer Science student specializing in full-stack systems, automated financial pipelines, and high-concurrency RESTful backends. Experienced with Java, Python, TypeScript, Spring Boot, FastAPI, and React.',
    statusText: 'Available for Software Engineering Roles · Ho Chi Minh City',
    location: 'Ho Chi Minh City, Vietnam (GMT+7)',
    email: 'thinhthai963@gmail.com',
    phone: '(+84) 869 922 096',
    // resumeUrl: Set to a static PDF path (e.g., '/docs/version2.1.pdf') when hosted.
    // When left empty (""), the Resume CTA triggers window.print() with a 2-page print stylesheet.
    resumeUrl: '',
    avatarUrl: '/images/avatar.webp', // Switch back to '/images/avatar.png' if WebP not yet generated
    aboutParagraphs: [
      'I am a final-year Computer Science engineer at Ho Chi Minh City Open University. Throughout my academic foundation and production work, I have architected full-stack web and mobile systems spanning relational database design, high-throughput REST APIs, secure RBAC authentication, and reactive interfaces.',
      'At BW Industrial Development Joint Stock Company, I engineered automated financial pipelines and concurrent AI-driven OCR parsers, cutting daily statement reconciliation turnaround from 1 full day down to 2 hours. I combine core software engineering principles with modern AI velocity to build reliable, maintainable systems.',
    ],
    meta: {
      title: 'Thai Do Thinh — Software Engineer & FinTech Automation Specialist',
      description: 'Personal portfolio of Thai Do Thinh (Sood). Specializing in FinTech automation, AI-driven reconciliation pipelines, high-throughput backend systems with FastAPI, Django REST, React, and Next.js.',
      keywords: ['Thai Do Thinh', 'Software Engineer', 'FinTech Automation', 'FastAPI', 'Spring Boot', 'Next.js', 'React', 'Vietnam Developer'],
    },
  },

  metrics: [
    {
      value: 14,
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
    major: 'Computer Science & Software Engineering',
    period: 'Oct 2022 — Dec 2026 (Expected)',
    gpa: 'Good Standing',
    status: 'Final Year Senior',
    coursework: [
      'Software Engineering Architecture',
      'Web System Development & Microservices',
      'Object-Oriented Programming (OOP / SOLID)',
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS / SQL)',
      'Cloud Computing & Distributed Systems',
      'Modern Programming Technologies',
    ],
  },

  languages: [
    {
      language: 'Vietnamese',
      proficiency: 'Native Language',
      levelPercent: 100,
      description: 'Mother tongue, technical documentation, client & team communication.',
    },
    {
      language: 'English',
      proficiency: 'Professional Working',
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
        { name: 'Django REST Framework', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['Django REST Framework'] },
        { name: 'ReactJS', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS.ReactJS },
        { name: 'Next.js', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['Next.js'] },
        { name: 'React Native (Expo)', level: 'Proficient', contexts: COMMON_SKILL_CONTEXTS['React Native (Expo)'] },
        { name: 'Spring Security', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Spring Security'] },
        { name: 'Spring Data JPA', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Spring Data JPA'] },
        { name: 'Tailwind CSS', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Tailwind CSS'] },
        { name: 'RESTful API', level: 'Expert', contexts: COMMON_SKILL_CONTEXTS['RESTful API'] },
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
        { name: 'Prompt Engineering', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Prompt Engineering'] },
        { name: 'Code Verification', level: 'Advanced', contexts: COMMON_SKILL_CONTEXTS['Code Verification'] },
      ],
    },
  ],

  experiences: [
    {
      period: 'Oct 2025 — Apr 2026',
      role: 'Finance AI & Automation Intern',
      company: 'BW Industrial Development Joint Stock Company',
      companyUrl: 'https://bwindustrial.com/',
      location: 'Ho Chi Minh City, Vietnam',
      projectTitle: 'Finance Data Processing Web & Automated Reconciliation Engine',
      projectUrl: 'https://bwid-automation.onrender.com/',
      teamSize: '3 Engineers',
      description: 'Mission-critical enterprise internal web system for the accounting department. Automates transaction ingestion, parsing, multi-bank statement reconciliation, and audited cash flow reporting.',
      highlights: [
        'Multi-Bank Statement Parsing: Engineered asynchronous FastAPI parsers in Python for 14 commercial banks (VCB, TCB, ACB, BIDV, etc.) processing batches of 10–50 PDF/Excel statement files concurrently with a 3-stream Gemini AI OCR fallback.',
        'Intelligent Reconciliation Pipeline: Built a PostgreSQL reconciliation pipeline processing 500–3,000 transaction rows per batch with AI-assisted categorization, cutting finance turnaround from 1 full business day down to 2 hours.',
        'High-Performance Async Redis Caching: Architected an async Redis layer (redis.asyncio) using SHA-256 statement hash keys and mget pipelining to cache OCR tokens and AI classification results, preventing redundant LLM API calls.',
        'Enterprise Security & RBAC: Enforced domain-restricted Google OAuth2 SSO, secure JWT refresh rotation, and role-based permissions across 2 administrative roles managing up to 10 concurrent active sessions.',
        'Modern Frontend & Containerization: Built the responsive administrative dashboard with React, TypeScript, and Tailwind CSS featuring live token cost telemetry, and containerized the backend using Docker.',
      ],
      technologies: ['FastAPI', 'Python', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker', 'Google OAuth2', 'Gemini AI'],
      pipelineStages: [
        {
          step: '01',
          name: 'Multi-Bank Ingestion',
          title: '14 Bank Formats Ingested',
          description: 'Handles unstructured PDFs, Excel workbooks, CSV ledgers, and raw statement scans across 14 major commercial banks.',
          detail: 'High-concurrency file upload gateway routing statement payloads to specialized domestic bank parser modules.',
          metric: '14 Banks',
        },
        {
          step: '02',
          name: 'OCR & AI Extraction',
          title: 'FastAPI + 3-Stream OCR Fallback',
          description: 'Asynchronous extraction pipeline with 3-stream concurrent Gemini AI OCR for corrupted or scanned statements.',
          detail: 'Automated structure recovery with strict schema parsing, confidence thresholding, and self-healing retries.',
          metric: '3 Streams',
        },
        {
          step: '03',
          name: 'Schema Normalization',
          title: 'Pydantic Strict Validation',
          description: 'Normalizes disparate banking transactional schemas into unified, auditable internal ledger data structures.',
          detail: 'Strict currency normalization, transaction hash calculation for deduplication, and ISO datetime synchronization.',
          metric: '100% Strict',
        },
        {
          step: '04',
          name: 'Automated Reconciliation',
          title: 'Intelligent Matching Engine',
          description: 'Matches 500–3,000 transaction rows per run against internal ERP cash ledgers with AI assistance.',
          detail: 'Eliminates 75% of manual financial accounting time, compressing reconciliation from 1 full day down to 2 hours.',
          metric: '1d → 2h',
        },
        {
          step: '05',
          name: 'Audit & Enterprise Export',
          title: 'PostgreSQL + Docker Analytics',
          description: 'Persists verifiable audit trails, real-time AI token telemetry, and multi-format reports for accounting leads.',
          detail: 'Complete admin control portal with role-based export authorization, audit logging, and automated report generation.',
          metric: 'PostgreSQL',
        },
      ],
    },
  ],

  projects: [
    {
      id: 'project-01',
      number: '01',
      title: 'FlexiConnect Web',
      subtitle: 'Enterprise Job Portal & Application Tracking Architecture',
      description: 'End-to-end multi-role recruitment and career platform connecting job seekers, corporate employers, and system administrators with complete application workflows and interactive AI mock interviews.',
      tags: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'ReactJS', 'Tailwind CSS', 'JUnit 5', 'Mockito', 'Render'],
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
        'Robust Backend Architecture: Engineered 78 RESTful APIs across 12 modular controllers in Java & Spring Boot, backed by a 23-table MySQL relational schema and 21 JPA entities.',
        'Data Integrity & Transactions: Applied @Transactional boundaries with atomic rollbacks on financial payments and applicant submissions; added Pageable pagination across all administrative modules.',
        'Security & Payment Gateway: Integrated MoMo payment gateway and Cloudinary CV asset storage; implemented RBAC for 3 distinct user tiers (Admin, Employer, Candidate) using Spring Security & JWT.',
        'Automated Test Harness: Authored comprehensive unit tests with JUnit 5 and Mockito covering service layer invariants and transaction edge cases.',
        'Frontend & Cloud Deployment: Developed the responsive interface with React, Vite, and Tailwind CSS, deployed live on Render.',
      ],
      architectureNotes: [
        'Multi-Tier MVC Architecture with strict separation of Controller, Service, and Repository layers.',
        'WebSocket endpoint for real-time notification dispatch to candidate dashboards.',
        'BCrypt password hashing combined with stateless JWT token authorization.',
      ],
    },
    {
      id: 'project-02',
      number: '02',
      title: 'Saigon Savory App',
      subtitle: 'Mobile Food Delivery & Restaurant Reservation Experience',
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
        'High-Throughput Backend: Built 26 RESTful APIs in Python using Django REST Framework for dish catalogs, comparisons, table bookings, customer orders, and 90-day kitchen revenue metrics.',
        'Dual Payment Gateways: Integrated MoMo and Stripe with 4 secure webhook and redirection endpoints, automating payment confirmation and order state transitions.',
        'Dual-Portal Mobile Client: Built cross-platform client with React Native and Expo, providing dedicated views for diners and restaurant kitchen staff.',
        'Real-Time Communications: Implemented live messaging between diners and restaurant dispatchers powered by Firebase real-time listeners.',
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
    roleDescription: 'Sinh viên năm cuối ngành Khoa học Máy tính chuyên xây dựng các hệ thống full-stack, đường ống tự động hóa tài chính và backend RESTful chịu tải cao. Thành thạo Java, Python, TypeScript, Spring Boot, FastAPI và React.',
    statusText: 'Sẵn sàng cho vị trí Kỹ sư Phần mềm · TP. Hồ Chí Minh',
    location: 'TP. Hồ Chí Minh, Việt Nam (GMT+7)',
    email: 'thinhthai963@gmail.com',
    phone: '(+84) 869 922 096',
    resumeUrl: '',
    avatarUrl: '/images/avatar.webp', // Giữ '/images/avatar.png' nếu chưa chuyển sang WebP
    aboutParagraphs: [
      'Tôi là sinh viên năm cuối chuyên ngành Khoa học Máy tính tại Trường Đại học Mở TP. Hồ Chí Minh. Xuyên suốt quá trình học tập và làm việc thực tế, tôi đã thiết kế và triển khai nhiều hệ thống web và mobile hoàn chỉnh từ thiết kế cơ sở dữ liệu quan hệ, xây dựng REST API hiệu năng cao, phân quyền bảo mật RBAC đến giao diện người dùng mượt mà.',
      'Tại Công ty Cổ phần Phát triển Công nghiệp BW, tôi đảm nhiệm kỹ thuật xây dựng đường ống tự động hóa tài chính và parser bóc tách OCR bằng AI song song, giúp rút ngắn thời gian đối soát sao kê từ 1 ngày làm việc xuống còn 2 giờ. Tôi kết hợp nền tảng kỹ thuật vững vàng với các công cụ AI hiện đại để phát triển phần mềm tin cậy, chuẩn mực và nhanh chóng.',
    ],
    meta: {
      title: 'Thái Đỗ Thịnh — Kỹ sư Phần mềm & Chuyên gia Tự động hóa FinTech',
      description: 'Portfolio kỹ thuật của Thái Đỗ Thịnh. Chuyên sâu tự động hóa tài chính, đường ống đối soát dữ liệu bằng AI, kiến trúc backend hiệu năng cao với FastAPI, Django REST, React và Next.js.',
      keywords: ['Thái Đỗ Thịnh', 'Kỹ sư Phần mềm', 'Tự động hóa FinTech', 'FastAPI', 'Spring Boot', 'Next.js', 'React', 'Lập trình viên Việt Nam'],
    },
  },

  metrics: [
    {
      value: 14,
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
    major: 'Khoa học Máy tính & Kỹ thuật Phần mềm',
    period: 'Tháng 10/2022 — Tháng 12/2026 (Dự kiến)',
    gpa: 'Khá Giỏi',
    status: 'Sinh viên năm cuối',
    coursework: [
      'Kiến trúc Kỹ thuật Phần mềm',
      'Phát triển Hệ thống Web & Microservices',
      'Lập trình Hướng đối tượng (OOP / SOLID)',
      'Cấu trúc Dữ liệu & Giải thuật',
      'Hệ Quản trị Cơ sở Dữ liệu (DBMS / SQL)',
      'Điện toán Đám mây & Hệ phân tán',
      'Công nghệ Lập trình Hiện đại',
    ],
  },

  languages: [
    {
      language: 'Tiếng Việt',
      proficiency: 'Bản ngữ',
      levelPercent: 100,
      description: 'Tiếng mẹ đẻ, tài liệu kỹ thuật chuyên ngành, giao tiếp đội ngũ và đối tác.',
    },
    {
      language: 'Tiếng Anh',
      proficiency: 'Làm việc Chuyên nghiệp',
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
        { name: 'Django REST Framework', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['Django REST Framework'] },
        { name: 'ReactJS', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS.ReactJS },
        { name: 'Next.js', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['Next.js'] },
        { name: 'React Native (Expo)', level: 'Thành thạo', contexts: COMMON_SKILL_CONTEXTS['React Native (Expo)'] },
        { name: 'Spring Security', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Spring Security'] },
        { name: 'Spring Data JPA', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Spring Data JPA'] },
        { name: 'Tailwind CSS', level: 'Nâng cao', contexts: COMMON_SKILL_CONTEXTS['Tailwind CSS'] },
        { name: 'RESTful API', level: 'Chuyên gia', contexts: COMMON_SKILL_CONTEXTS['RESTful API'] },
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
      projectTitle: 'Hệ thống Xử lý Dữ liệu Tài chính & Tự động Đối soát Dòng tiền',
      projectUrl: 'https://bwid-automation.onrender.com/',
      teamSize: '3 Lập trình viên',
      description: 'Hệ thống web nội bộ trọng yếu phục vụ bộ phận Kế toán - Tài chính doanh nghiệp. Tự động hóa quá trình thu thập giao dịch, bóc tách sao kê ngân hàng, đối chiếu công nợ và lập báo cáo dòng tiền đã kiểm toán.',
      highlights: [
        'Bóc tách Sao kê Đa Ngân hàng: Xây dựng bộ parser bất đồng bộ với FastAPI (Python) cho 14 ngân hàng thương mại (VCB, TCB, ACB, BIDV,...), xử lý từng lô 10–50 file PDF/Excel cùng cơ chế OCR dự phòng 3 luồng song song với Gemini AI.',
        'Đường ống Đối soát Tự động: Xây dựng luồng xử lý PostgreSQL tự động khớp 500–3.000 dòng giao dịch mỗi đợt chạy kết hợp AI phân loại, rút ngắn thời gian xử lý cho đội ngũ tài chính từ 1 ngày xuống còn 2 giờ.',
        'Bộ đệm Redis Bất đồng bộ Tốc độ cao: Thiết kế tầng đệm Redis (redis.asyncio) sử dụng mã băm SHA-256 từ nội dung file và cơ chế batching mget cho kết quả OCR/AI, loại bỏ hoàn toàn các lượt gọi API LLM trùng lặp.',
        'Bảo mật Phân quyền Doanh nghiệp: Tích hợp Google OAuth2 SSO giới hạn tên miền doanh nghiệp, cơ chế xoay vòng JWT refresh token và phân quyền RBAC 2 cấp quản lý tới 10 phiên hoạt động đồng thời.',
        'Giao diện Quản trị & Containerization: Xây dựng bảng điều khiển hiện đại bằng React, TypeScript và Tailwind CSS giám sát chi phí token AI theo thời gian thực, đồng thời đóng gói toàn bộ backend với Docker.',
      ],
      technologies: ['FastAPI', 'Python', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker', 'Google OAuth2', 'Gemini AI'],
      pipelineStages: [
        {
          step: '01',
          name: 'Thu thập Đa Ngân hàng',
          title: 'Tiếp nhận 14 Định dạng Ngân hàng',
          description: 'Hỗ trợ xử lý các định dạng phức tạp: PDF bảng biểu, file Excel, CSV và ảnh quét từ 14 ngân hàng thương mại.',
          detail: 'Cổng tải lên tập tin đa luồng tự động định tuyến dữ liệu vào các parser chuyên biệt theo từng ngân hàng.',
          metric: '14 Ngân hàng',
        },
        {
          step: '02',
          name: 'Bóc tách OCR & AI',
          title: 'FastAPI + 3 Luồng OCR Dự phòng',
          description: 'Đường ống bóc tách bất đồng bộ với 3 luồng Gemini AI OCR song song xử lý các file sao kê scan mờ hoặc lỗi font.',
          detail: 'Tự động tái cấu trúc bảng giao dịch, chuẩn hóa cột dữ liệu và cơ chế tự động thử lại (retry) khi gặp lỗi.',
          metric: '3 Luồng',
        },
        {
          step: '03',
          name: 'Chuẩn hóa Dữ liệu',
          title: 'Kiểm thực Nghiêm ngặt với Pydantic',
          description: 'Chuẩn hóa các cấu trúc dữ liệu giao dịch đa dạng về mô hình sổ cái nội bộ thống nhất và minh bạch.',
          detail: 'Mã hóa băm giao dịch chống trùng lặp, chuẩn hóa định dạng tiền tệ và đồng bộ mốc thời gian chuẩn ISO.',
          metric: '100% Chuẩn',
        },
        {
          step: '04',
          name: 'Tự động Đối soát Dòng tiền',
          title: 'Động cơ Đối sánh Thông minh',
          description: 'Tự động đối chiếu 500–3.000 dòng giao dịch mỗi đợt với sổ kế toán dòng tiền nội bộ kết hợp phân loại AI.',
          detail: 'Cắt giảm 75% thời gian thủ công của kế toán, rút ngắn quy trình từ 1 ngày làm việc xuống còn 2 giờ.',
          metric: '1 ngày → 2h',
        },
        {
          step: '05',
          name: 'Kiểm toán & Xuất Dữ liệu',
          title: 'Lưu trữ PostgreSQL & Docker',
          description: 'Lưu vết kiểm toán toàn diện, giám sát lượng tiêu thụ token AI và xuất báo cáo đa định dạng cho kế toán trưởng.',
          detail: 'Bảng quản trị hoàn chỉnh với tính năng phân quyền xuất báo cáo, nhật ký kiểm toán và tự động sinh báo cáo đối soát.',
          metric: 'PostgreSQL',
        },
      ],
    },
  ],

  projects: [
    {
      id: 'project-01',
      number: '01',
      title: 'FlexiConnect Web',
      subtitle: 'Nền tảng Cổng Tuyển dụng & Theo dõi Ứng viên Đa Phân quyền',
      description: 'Hệ thống tuyển dụng toàn diện kết nối người tìm việc, nhà tuyển dụng và quản trị viên với quy trình ứng tuyển khép kín và tính năng mô phỏng phỏng vấn kỹ thuật bằng AI.',
      tags: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'ReactJS', 'Tailwind CSS', 'JUnit 5', 'Mockito', 'Render'],
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
        'Kiến trúc Backend Chắc chắn: Xây dựng 78 RESTful API trên 12 controller bằng Java & Spring Boot, quản lý cơ sở dữ liệu MySQL 23 bảng với 21 thực thể JPA.',
        'Toàn vẹn Giao dịch & Phân trang: Áp dụng phạm vi @Transactional tự động rollback trong quy trình thanh toán và nộp hồ sơ; tối ưu phân trang Pageable tại các mô-đun quản trị.',
        'Bảo mật & Cổng Thanh toán: Tích hợp cổng thanh toán MoMo và lưu trữ CV qua Cloudinary; phân quyền RBAC 3 vai trò (Admin, Doanh nghiệp, Ứng viên) bằng Spring Security & JWT.',
        'Kiểm thử Tự động: Viết bộ unit test toàn diện với JUnit 5 và Mockito kiểm tra logic nghiệp vụ tầng service và các trường hợp ngoại lệ.',
        'Giao diện & Triển khai Cloud: Phát triển giao diện người dùng mượt mà với React, Vite và Tailwind CSS, triển khai trực tiếp trên Render.',
      ],
      architectureNotes: [
        'Mô hình kiến trúc phân tầng MVC tách biệt rõ rệt giữa Controller, Service và Repository.',
        'Endpoint WebSocket thông báo tức thì đến trang cá nhân của ứng viên.',
        'Mã hóa mật khẩu BCrypt kết hợp xác thực phiên phi trạng thái bằng JWT token.',
      ],
    },
    {
      id: 'project-02',
      number: '02',
      title: 'Saigon Savory App',
      subtitle: 'Ứng dụng Giao đồ ăn & Đặt bàn Nhà hàng Di động Đa Cổng',
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
        'Backend Hiệu năng cao: Xây dựng 26 RESTful API bằng Python và Django REST Framework phục vụ thực đơn, so sánh món ăn, đặt bàn, đặt món và thống kê doanh thu 90 ngày cho đầu bếp.',
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
