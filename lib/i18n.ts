export type Locale = 'en' | 'vi';

export interface Translations {
  nav: {
    summary: string;
    experience: string;
    works: string;
    skills: string;
    education: string;
    contact: string;
  };
  header: {
    role: string;
    contactBtn: string;
    shareTooltip: string;
    soundOnTooltip: string;
    soundOffTooltip: string;
    lightTooltip: string;
    darkTooltip: string;
    langTooltip: string;
    fullscreenTooltip: string;
    exitFullscreenTooltip: string;
  };
  hero: {
    available: string;
    location: string;
    school: string;
    tagline: string;
    bio: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    tag1: string;
    period1: string;
    periodBadge1: string;
    role1: string;
    company1: string;
    location1: string;
    badge1: string;
    desc1: string;
    deliverablesHeader: string;
    deliverable1Title: string;
    deliverable1Text: string;
    deliverable2Title: string;
    deliverable2Text: string;
    deliverable3Title: string;
    deliverable3Text: string;
    deliverable4Title: string;
    deliverable4Text: string;
    techStackHeader: string;
    eduTag: string;
    eduPeriod: string;
    eduPeriodBadge: string;
    eduDegree: string;
    eduSchool: string;
    eduCourseworkLabel: string;
    eduCourseworkText: string;
    eduCourseworkList: string[];
    eduStatus: string;
    languagesTitle: string;
    nativeLabel: string;
    nativeBadge: string;
    nativeDesc: string;
    englishLabel: string;
    englishBadge: string;
    englishDesc: string;
  };
  works: {
    eyebrow: string;
    title: string;
    techStackLabel: string;
    sourceCodeBtn: string;
    p1Tag: string;
    p1Role: string;
    p1Desc: string;
    p1H1Title: string;
    p1H1Text: string;
    p1H2Title: string;
    p1H2Text: string;
    p1H3Title: string;
    p1H3Text: string;
    p2Tag: string;
    p2Role: string;
    p2Desc: string;
    p2H1Title: string;
    p2H1Text: string;
    p2H2Title: string;
    p2H2Text: string;
    p2H3Title: string;
    p2H3Text: string;
    p3Tag: string;
    p3Role: string;
    p3Desc: string;
    p3H1Title: string;
    p3H1Text: string;
    p3H2Title: string;
    p3H2Text: string;
    p3H3Title: string;
    p3H3Text: string;
    p3LiveBadge: string;
    p3HostingLabel: string;
    p3HostingValue: string;
    p3DeploymentLabel: string;
    p3DeploymentValue: string;
    p3TypeCoverageLabel: string;
    p3TypeCoverageValue: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    catLanguages: string;
    catFrameworks: string;
    catDatabases: string;
    catDevopsAi: string;
    appliedIn: string;
    expBadge: string;
    projectBadge: string;
    usageBadge: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    responseBadge: string;
    copyPrompt: string;
    copiedToast: string;
    phoneLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    cvLabel: string;
    cvAction: string;
    backToTop: string;
    copyright: string;
    versionBadge: string;
    demoBadge: string;
    hostingBadge: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      summary: 'SUMMARY',
      experience: 'WORK HISTORY',
      works: 'SELECTED WORKS',
      skills: 'CAPABILITIES',
      education: 'EDUCATION & LANGS',
      contact: 'CONTACT',
    },
    header: {
      role: 'SOFTWARE ENGINEER',
      contactBtn: 'CONTACT',
      shareTooltip: 'Copy portfolio URL',
      soundOnTooltip: 'Unmute Audio',
      soundOffTooltip: 'Mute Audio',
      lightTooltip: 'Switch to Light mode',
      darkTooltip: 'Switch to Dark mode',
      langTooltip: 'Chuyển sang tiếng Việt (Switch to Vietnamese)',
      fullscreenTooltip: 'Fullscreen',
      exitFullscreenTooltip: 'Exit Fullscreen',
    },
    hero: {
      available: 'AVAILABLE FOR DEVELOPER ROLES',
      location: 'HO CHI MINH CITY, VIET NAM',
      school: 'HCMCOU COMPUTER SCIENCE',
      tagline: 'SOFTWARE ENGINEER · FULL-STACK DEVELOPER',
      bio: 'Final-year Computer Science student at Ho Chi Minh City Open University who has built and deployed several real web products, from database design to frontend and backend. Comfortable with Java, Python, JavaScript, TypeScript, and frameworks like Spring Boot and React. I combine solid fundamental engineering with modern AI-assisted workflows to deliver high quality, reliable software quickly.',
      stat1Label: '14 Banks Integrated (FastAPI & Gemini OCR)',
      stat2Label: 'Cash Reconciliation Cycle (BW Industrial)',
      stat3Label: 'Manual Time Reduction (1 Day → 2h)',
      stat4Label: 'Production Security & Dockerized',
    },
    experience: {
      eyebrow: 'WORK HISTORY',
      title: 'Work History',
      tag1: 'FINTECH AUTOMATION & AI PLATFORM',
      period1: 'OCT 2025 — APR 2026',
      periodBadge1: 'Oct 2025 — Apr 2026',
      role1: 'Finance AI & Automation Intern',
      company1: 'BW INDUSTRIAL DEVELOPMENT JSC',
      location1: 'Ho Chi Minh City, Viet Nam · Finance Data Processing Web (Team: 3)',
      badge1: '6-Month Internship Completed',
      desc1: 'Engineered an internal web application used by the finance and accounting team to process bank statements and generate automated cash reports, handling transaction extraction, classification, and reconciliation.',
      deliverablesHeader: 'CORE DELIVERABLES & IMPACT:',
      deliverable1Title: 'Bank Statement Parsing (14 Banks)',
      deliverable1Text: 'Built FastAPI parsers in Python for 14 banks (10–30 statements/batch, up to 50 files), with 3-stream concurrent Gemini OCR fallback.',
      deliverable2Title: 'Cash Report Automation (1 Day → 2 Hrs)',
      deliverable2Text: 'Built PostgreSQL pipeline reconciling 500–3,000 rows per run using 50-row AI classification batches, cutting processing time from 1 day to 2 hours for 3+ finance users.',
      deliverable3Title: 'Performance & Caching (Redis)',
      deliverable3Text: 'Built an async Redis caching layer (redis.asyncio) with SHA-256 key hashing and pipeline batching (mget) for OCR/AI results, cutting redundant LLM API calls with graceful in-memory fallback.',
      deliverable4Title: 'Security, Auth & DevOps',
      deliverable4Text: 'Secured APIs via domain-restricted Google OAuth2 SSO, JWT refresh rotation, RBAC across 2 roles (10 concurrent sessions), and containerized backend with Docker.',
      techStackHeader: 'TECH STACK:',
      eduTag: 'COMPUTER SCIENCE FOUNDATION',
      eduPeriod: 'OCT 2022 — DEC 2026 (EXPECTED)',
      eduPeriodBadge: 'Oct 2022 — Dec 2026 (Expected)',
      eduDegree: 'Bachelor of Science in Computer Science',
      eduSchool: 'Ho Chi Minh City Open University (HCMCOU)',
      eduCourseworkLabel: 'Core Coursework:',
      eduCourseworkText: 'Software Engineering, Web System Development, Object-Oriented Programming (OOP), Data Structures & Algorithms, Modern Programming Technologies, Database Management Systems, Cloud Computing.',
      eduCourseworkList: [
        'Software Engineering',
        'Web System Development',
        'Object-Oriented Programming (OOP)',
        'Data Structures & Algorithms',
        'Modern Programming Technologies',
        'Database Management Systems',
        'Cloud Computing',
      ],
      eduStatus: 'Undergraduate · Expected Graduation: Dec 2026',
      languagesTitle: 'LANGUAGES',
      nativeLabel: 'Vietnamese',
      nativeBadge: 'NATIVE',
      nativeDesc: 'Native proficiency',
      englishLabel: 'English',
      englishBadge: 'PROFESSIONAL',
      englishDesc: 'Professional working proficiency',
    },
    works: {
      eyebrow: 'SELECTED WORKS',
      title: 'Production Systems',
      techStackLabel: 'TECH STACK:',
      sourceCodeBtn: 'Source Code',
      p1Tag: 'JOB RECRUITMENT PLATFORM',
      p1Role: 'Lead Fullstack Developer · Spring Boot + ReactJS',
      p1Desc: 'Full-featured recruitment platform connecting candidates, employers, and administrators with comprehensive role-based access, job lifecycle management, and application tracking workflows.',
      p1H1Title: 'Backend & DB Architecture:',
      p1H1Text: 'Built 78 RESTful APIs across 12 controllers in Java & Spring Boot on a 23-table MySQL schema (21 JPA entities), plus 1 WebSocket endpoint for live alerts.',
      p1H2Title: 'Data Integrity & Security:',
      p1H2Text: 'Applied @Transactional for automatic rollbacks on payment/application flows, Pageable pagination, MoMo gateway, and 3-role authorization via Spring Security & JWT.',
      p1H3Title: 'Testing & Deployment:',
      p1H3Text: 'Wrote unit tests for service-layer business logic and edge cases using JUnit 5 & Mockito; built React UI with Vite/Tailwind and deployed on Render.',
      p2Tag: 'MOBILE FOOD DELIVERY & BOOKING',
      p2Role: 'Fullstack Mobile Engineer · React Native + Django REST',
      p2Desc: 'Cross-platform mobile application covering customer food delivery ordering, table reservations, restaurant menu management, and dedicated kitchen staff (chef) workflows.',
      p2H1Title: 'Django REST Framework:',
      p2H1Text: 'Built 26 RESTful APIs covering dynamic menus, dish comparisons, table bookings, order workflows, and 90-day chef revenue stats.',
      p2H2Title: 'Payment Gateways & Webhooks:',
      p2H2Text: 'Integrated MoMo and Stripe with 4 webhook and redirect endpoints to automate order payment confirmation and cancellation.',
      p2H3Title: 'React Native & Firebase:',
      p2H3Text: 'Built mobile interfaces with dual-role flows for customers and chefs, plus real-time in-app chat via Firebase.',
      p3Tag: 'TYPOGRAPHIC STATIC ENGINE',
      p3Role: 'Creator & Frontend Architect · Next.js 16 + TypeScript',
      p3Desc: 'Minimalist, high-performance portfolio engine built with Next.js App Router and TypeScript, compiled to static export for zero-latency hosting on GitHub Pages via automated CI/CD.',
      p3H1Title: '100% Static Export (SSG):',
      p3H1Text: 'Automated GitHub Actions pipeline building static assets with sub-50ms TTFB worldwide.',
      p3H2Title: 'Pure 2D Typographic Design:',
      p3H2Text: 'Flat-layered vector design system with zero icon or emoji dependencies.',
      p3H3Title: 'Strict TypeScript Safety:',
      p3H3Text: 'End-to-end typed data contracts ensuring resilience across all component hierarchies.',
      p3LiveBadge: 'You are viewing this site live',
      p3HostingLabel: 'Hosting:',
      p3HostingValue: 'GitHub Pages Edge CDN',
      p3DeploymentLabel: 'Deployment:',
      p3DeploymentValue: 'Automated CI/CD Pipeline',
      p3TypeCoverageLabel: 'Type Coverage:',
      p3TypeCoverageValue: '100% Strict TypeScript',
    },
    capabilities: {
      eyebrow: 'CAPABILITIES',
      title: 'Skills & Tooling',
      subtitle: 'SYSTEM ARCHITECTURE & PRODUCTION ENGINEERING',
      catLanguages: 'LANGUAGES',
      catFrameworks: 'FRAMEWORKS & LIBS',
      catDatabases: 'DATA & DEVOPS',
      catDevopsAi: 'AI TOOLING',
      appliedIn: 'APPLIED IN',
      expBadge: 'EXP',
      projectBadge: 'PROJECT',
      usageBadge: 'USAGE',
    },
    contact: {
      eyebrow: 'DIRECT CONTACT',
      title: "LET'S BUILD TOGETHER.",
      responseBadge: 'Response within 24h',
      copyPrompt: 'CLICK TO COPY EMAIL DIRECTLY',
      copiedToast: 'Copied thinhthai963@gmail.com to clipboard!',
      phoneLabel: 'PHONE / ZALO',
      githubLabel: 'GITHUB PROFILE',
      linkedinLabel: 'LINKEDIN PROFILE',
      cvLabel: 'CURRICULUM VITAE',
      cvAction: 'View Full Profile',
      backToTop: 'Back to top',
      copyright: '© 2026 THAI DO THINH. POWERED BY SOODFOLIO PLATFORM.',
      versionBadge: 'VERSION 3.0',
      demoBadge: 'LIVE DEMO DECK',
      hostingBadge: 'Hosted on GitHub Pages',
    },
  },
  vi: {
    nav: {
      summary: 'TỔNG QUAN',
      experience: 'KINH NGHIỆM',
      works: 'DỰ ÁN TIÊU BIỂU',
      skills: 'KỸ NĂNG',
      education: 'HỌC VẤN & NGÔN NGỮ',
      contact: 'LIÊN HỆ',
    },
    header: {
      role: 'KỸ SƯ PHẦN MỀM',
      contactBtn: 'LIÊN HỆ',
      shareTooltip: 'Sao chép liên kết hồ sơ',
      soundOnTooltip: 'Bật âm thanh',
      soundOffTooltip: 'Tắt âm thanh',
      lightTooltip: 'Chuyển sang giao diện sáng',
      darkTooltip: 'Chuyển sang giao diện tối',
      langTooltip: 'Switch to English (Chuyển sang tiếng Anh)',
      fullscreenTooltip: 'Toàn màn hình',
      exitFullscreenTooltip: 'Thoát toàn màn hình',
    },
    hero: {
      available: 'SẴN SÀNG NHẬN DỰ ÁN MỚI',
      location: 'TP. HỒ CHÍ MINH, VIỆT NAM',
      school: 'KHOA HỌC MÁY TÍNH HCMCOU',
      tagline: 'KỸ SƯ PHẦN MỀM · LẬP TRÌNH FULL-STACK',
      bio: 'Sinh viên năm cuối ngành Khoa học Máy tính tại Trường Đại học Mở TP.HCM, đã trực tiếp xây dựng và triển khai nhiều sản phẩm web thực tế từ thiết kế cơ sở dữ liệu đến frontend và backend. Thành thạo Java, Python, JavaScript, TypeScript cùng các framework Spring Boot và React. Thường xuyên sử dụng công cụ AI hàng ngày để đẩy nhanh tốc độ nhưng luôn tự tay rà soát toàn bộ code. Sẵn sàng nhận vị trí Lập trình viên để tiếp tục xây dựng các sản phẩm thực tế.',
      stat1Label: '14 Ngân hàng tích hợp (FastAPI & Gemini OCR)',
      stat2Label: 'Chu kỳ đối soát tiền mặt (BW Industrial)',
      stat3Label: 'Cắt giảm thời gian thủ công (1 ngày → 2h)',
      stat4Label: 'Bảo mật doanh nghiệp & Container Docker',
    },
    experience: {
      eyebrow: 'LỊCH SỬ LÀM VIỆC',
      title: 'Kinh nghiệm làm việc',
      tag1: 'NỀN TẢNG FINTECH TỰ ĐỘNG HÓA & AI',
      period1: 'THÁNG 10/2025 — THÁNG 04/2026',
      periodBadge1: '10/2025 — 04/2026',
      role1: 'Thực tập sinh Tự động hóa & AI Tài chính',
      company1: 'BW INDUSTRIAL DEVELOPMENT JSC',
      location1: 'TP. Hồ Chí Minh, Việt Nam · Web Xử lý Dữ liệu Tài chính (Nhóm: 3 người)',
      badge1: 'Hoàn thành thực tập 6 tháng',
      desc1: 'Xây dựng ứng dụng web nội bộ phục vụ đội ngũ tài chính và kế toán xử lý sao kê ngân hàng và tạo báo cáo tiền mặt tự động, đảm nhiệm các khâu trích xuất giao dịch, phân loại và đối soát dữ liệu.',
      deliverablesHeader: 'KẾT QUẢ ĐẠT ĐƯỢC & TÁC ĐỘNG:',
      deliverable1Title: 'Phân tích sao kê (14 ngân hàng)',
      deliverable1Text: 'Xây dựng bộ parser FastAPI bằng Python cho 14 ngân hàng (10–30 sao kê/lô, tối đa 50 tệp), kết hợp cơ chế Gemini OCR dự phòng 3 luồng đồng thời.',
      deliverable2Title: 'Tự động hóa báo cáo tiền mặt (1 ngày → 2 giờ)',
      deliverable2Text: 'Xây dựng pipeline PostgreSQL đối soát 500–3.000 dòng/lần chạy với batch phân loại AI 50 dòng, rút ngắn thời gian xử lý cho 3+ nhân viên tài chính từ 1 ngày xuống 2 giờ.',
      deliverable3Title: 'Hiệu năng & Bộ nhớ đệm (Redis)',
      deliverable3Text: 'Phát triển tầng cache Redis bất đồng bộ (redis.asyncio) với mã băm SHA-256 và pipeline batching (mget) cho kết quả OCR/AI, loại bỏ gọi trùng lặp tới LLM với dự phòng in-memory.',
      deliverable4Title: 'Bảo mật, Xác thực & DevOps',
      deliverable4Text: 'Bảo mật API qua Google OAuth2 SSO giới hạn tên miền, cơ chế JWT refresh rotation, phân quyền RBAC 2 vai trò (10 phiên đồng thời), và container hóa backend với Docker.',
      techStackHeader: 'CÔNG NGHỆ:',
      eduTag: 'NỀN TẢNG KHOA HỌC MÁY TÍNH',
      eduPeriod: '10/2022 — 12/2026 (DỰ KIẾN)',
      eduPeriodBadge: '10/2022 — 12/2026 (Dự kiến)',
      eduDegree: 'Cử nhân Khoa học Máy tính',
      eduSchool: 'Trường Đại học Mở TP.HCM (HCMCOU)',
      eduCourseworkLabel: 'Các môn học chuyên ngành:',
      eduCourseworkText: 'Kỹ nghệ phần mềm, Phát triển hệ thống web, Lập trình hướng đối tượng (OOP), Cấu trúc dữ liệu & Giải thuật, Công nghệ lập trình hiện đại, Hệ quản trị cơ sở dữ liệu, Điện toán đám mây.',
      eduCourseworkList: [
        'Kỹ nghệ phần mềm',
        'Phát triển hệ thống web',
        'Lập trình hướng đối tượng (OOP)',
        'Cấu trúc dữ liệu & Giải thuật',
        'Công nghệ lập trình hiện đại',
        'Hệ quản trị cơ sở dữ liệu',
        'Điện toán đám mây',
      ],
      eduStatus: 'Sinh viên đại học · Dự kiến tốt nghiệp: 12/2026',
      languagesTitle: 'NGÔN NGỮ GIAO TIẾP',
      nativeLabel: 'Tiếng Việt',
      nativeBadge: 'BẢN XỨ',
      nativeDesc: 'Tiếng mẹ đẻ',
      englishLabel: 'Tiếng Anh',
      englishBadge: 'CHUYÊN NGHIỆP',
      englishDesc: 'Làm việc & đọc tài liệu kỹ thuật chuyên sâu',
    },
    works: {
      eyebrow: 'DỰ ÁN TIÊU BIỂU',
      title: 'Dự án tiêu biểu',
      techStackLabel: 'CÔNG NGHỆ:',
      sourceCodeBtn: 'Mã nguồn',
      p1Tag: 'NỀN TẢNG TUYỂN DỤNG VIỆC LÀM',
      p1Role: 'Trưởng nhóm Fullstack Developer · Spring Boot + ReactJS',
      p1Desc: 'Nền tảng tuyển dụng toàn diện kết nối ứng viên, nhà tuyển dụng và quản trị viên với phân quyền đa vai trò, quản lý vòng đời tin tuyển dụng và theo dõi hồ sơ ứng tuyển.',
      p1H1Title: 'Kiến trúc Backend & CSDL:',
      p1H1Text: 'Xây dựng 78 RESTful API qua 12 controller bằng Java & Spring Boot trên lược đồ MySQL 23 bảng (21 JPA entity), cùng 1 WebSocket endpoint thông báo tức thì.',
      p1H2Title: 'Toàn vẹn dữ liệu & Bảo mật:',
      p1H2Text: 'Áp dụng @Transactional tự động rollback cho thanh toán/ứng tuyển, phân trang Pageable, cổng MoMo và bảo mật phân quyền 3 vai trò qua Spring Security & JWT.',
      p1H3Title: 'Kiểm thử & Triển khai:',
      p1H3Text: 'Viết kiểm thử unit test cho tầng service bằng JUnit 5 & Mockito; xây dựng giao diện ReactJS với Vite/Tailwind và triển khai toàn bộ hệ thống lên Render.',
      p2Tag: 'ỨNG DỤNG GIAO ĐỒ ĂN & ĐẶT BÀN',
      p2Role: 'Kỹ sư Mobile Fullstack · React Native + Django REST',
      p2Desc: 'Ứng dụng di động đa nền tảng bao gồm đặt đồ ăn giao tận nơi, đặt bàn ăn, quản lý thực đơn và luồng xử lý đơn hàng cho đầu bếp.',
      p2H1Title: 'Django REST Framework:',
      p2H1Text: 'Xây dựng 26 RESTful API bằng Python/Django REST xử lý thực đơn động, so sánh món ăn, đặt bàn, vòng đời đơn hàng và thống kê doanh thu đầu bếp 90 ngày.',
      p2H2Title: 'Cổng thanh toán & Webhook:',
      p2H2Text: 'Tích hợp 2 cổng thanh toán MoMo và Stripe với 4 webhook/redirect endpoint tự động hóa xác nhận và hủy đơn hàng tức thì.',
      p2H3Title: 'React Native & Firebase:',
      p2H3Text: 'Phát triển ứng dụng di động React Native & Expo với luồng riêng biệt cho khách hàng và đầu bếp, kết hợp chat thời gian thực qua Firebase.',
      p3Tag: 'PORTFOLIO KIẾN TRÚC TĨNH TYPOGRAPHY',
      p3Role: 'Tác giả & Kiến trúc sư Frontend · Next.js 16 + TypeScript',
      p3Desc: 'Engine portfolio tối giản hiệu năng cao xây dựng với Next.js App Router và TypeScript, biên dịch tĩnh (SSG) với độ trễ bằng 0 trên GitHub Pages qua CI/CD tự động.',
      p3H1Title: 'Xuất tĩnh 100% (SSG):',
      p3H1Text: 'Pipeline GitHub Actions tự động hóa xây dựng tài nguyên tĩnh với TTFB dưới 50ms trên toàn cầu.',
      p3H2Title: 'Thiết kế Typography 2D thuần túy:',
      p3H2Text: 'Hệ thống thiết kế vector phân lớp phẳng, hoàn toàn không phụ thuộc icon hay emoji.',
      p3H3Title: 'An toàn kiểu dữ liệu với TypeScript:',
      p3H3Text: 'Khế ước dữ liệu định kiểu chặt chẽ toàn diện, đảm bảo tính ổn định trên toàn bộ cấu trúc component.',
      p3LiveBadge: 'Bạn đang xem trực tiếp trang này',
      p3HostingLabel: 'Lưu trữ:',
      p3HostingValue: 'GitHub Pages Edge CDN',
      p3DeploymentLabel: 'Triển khai:',
      p3DeploymentValue: 'Pipeline CI/CD tự động',
      p3TypeCoverageLabel: 'Độ phủ Type:',
      p3TypeCoverageValue: '100% Strict TypeScript',
    },
    capabilities: {
      eyebrow: 'NĂNG LỰC KỸ THUẬT',
      title: 'Kỹ năng chuyên môn',
      subtitle: 'KIẾN TRÚC HỆ THỐNG & KỸ THUẬT PHẦN MỀM',
      catLanguages: 'NGÔN NGỮ LẬP TRÌNH',
      catFrameworks: 'FRAMEWORK & THƯ VIỆN',
      catDatabases: 'CƠ SỞ DỮ LIỆU & DEVOPS',
      catDevopsAi: 'CÔNG CỤ PHÁT TRIỂN AI',
      appliedIn: 'ỨNG DỤNG TRONG',
      expBadge: 'KINH NGHIỆM',
      projectBadge: 'DỰ ÁN',
      usageBadge: 'SỬ DỤNG',
    },
    contact: {
      eyebrow: 'LIÊN HỆ TRỰC TIẾP',
      title: 'KẾT NỐI HỢP TÁC.',
      responseBadge: 'Phản hồi trong 24h',
      copyPrompt: 'BẤM ĐỂ SAO CHÉP EMAIL TRỰC TIẾP',
      copiedToast: 'Đã sao chép thinhthai963@gmail.com vào clipboard!',
      phoneLabel: 'ĐIỆN THOẠI / ZALO',
      githubLabel: 'HỒ SƠ GITHUB',
      linkedinLabel: 'HỒ SƠ LINKEDIN',
      cvLabel: 'HỒ SƠ NĂNG LỰC (CV)',
      cvAction: 'Xem chi tiết hồ sơ',
      backToTop: 'Trở về đầu trang',
      copyright: '© 2026 THÁI ĐỖ THỊNH. PHÁT TRIỂN TRÊN NỀN TẢNG SOODFOLIO.',
      versionBadge: 'PHIÊN BẢN 3.0',
      demoBadge: 'BẢN TRÌNH DIỄN TRỰC TIẾP',
      hostingBadge: 'Lưu trữ trên GitHub Pages',
    },
  },
};
