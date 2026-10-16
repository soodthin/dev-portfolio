export type Locale = 'en' | 'vi';

export interface Translations {
  nav: {
    summary: string;
    experience: string;
    works: string;
    skills: string;
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
  };
  experience: {
    eyebrow: string;
    title: string;
    tag1: string;
    period1: string;
    role1: string;
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
    eduTag: string;
    eduPeriod: string;
    eduDegree: string;
    eduSchool: string;
    eduCourseworkLabel: string;
    eduCourseworkText: string;
    eduStatus: string;
  };
  works: {
    eyebrow: string;
    title: string;
    techStackLabel: string;
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
    p3LiveBadge: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    catLanguages: string;
    catFrameworks: string;
    catDatabases: string;
    catDevopsAi: string;
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
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      summary: 'SUMMARY',
      experience: 'WORK HISTORY',
      works: 'SELECTED WORKS',
      skills: 'CAPABILITIES',
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
    },
    hero: {
      available: 'AVAILABLE FOR DEVELOPER ROLES',
      location: 'HO CHI MINH CITY, VIET NAM',
      school: 'HCMCOU COMPUTER SCIENCE',
      tagline: 'SOFTWARE ENGINEER · FULL-STACK DEVELOPER',
      bio: 'Final-year Computer Science student at Ho Chi Minh City Open University who has built and deployed several real web products, from database design to frontend and backend. Comfortable with Java, Python, JavaScript, TypeScript, C++, and frameworks like React and Spring Boot. I combine solid fundamental engineering with modern AI-assisted workflows to deliver high quality, reliable software quickly.',
      stat1Label: 'Integrated Banking APIs (OCR Pipeline)',
      stat2Label: 'Cash Reconciliation Cycle (BW Industrial)',
      stat3Label: 'Reduction in Manual Processing',
    },
    experience: {
      eyebrow: 'WORK HISTORY',
      title: 'Work History',
      tag1: 'FINTECH AUTOMATION & AI PLATFORM',
      period1: 'OCT 2025 — APR 2026',
      role1: 'Full-stack Software Engineer Intern',
      location1: 'Ho Chi Minh City, Viet Nam · Fintech Automation Web Platform',
      badge1: '6-Month Internship Completed',
      desc1: 'Engineered an internal web application used by the finance and accounting team to process bank statements and generate automated cash reports, handling transaction extraction, classification, and reconciliation.',
      deliverablesHeader: 'CORE DELIVERABLES & IMPACT:',
      deliverable1Title: 'Bank Statement Parsing (10+ Banks):',
      deliverable1Text: 'Built FastAPI REST parsers for Vietcombank, Techcombank, BIDV, ACB, MBBank, with Gemini OCR fallback for scanned receipts.',
      deliverable2Title: 'Cash Report Automation (1 Day → 2 Hrs):',
      deliverable2Text: 'Engineered session-based reconciliation matching multi-file cash reports based on finance rule feedback, cutting processing time by 75%.',
      deliverable3Title: 'Enterprise SSO & Session Tracking:',
      deliverable3Text: 'Implemented domain-locked Google OAuth2 SSO, JWT access tokens with device session tracking via Redis, and granular RBAC.',
      deliverable4Title: 'SSE Real-time Tracker & AI Telemetry:',
      deliverable4Text: 'Built React UI with SSE progress tracking for long-running batch jobs, centralized logging, and internal AI cost usage tracking.',
      eduTag: 'COMPUTER SCIENCE FOUNDATION',
      eduPeriod: 'OCT 2022 — PRESENT',
      eduDegree: 'Bachelor of Science in Computer Science',
      eduSchool: 'Ho Chi Minh City Open University (HCMCOU)',
      eduCourseworkLabel: 'Core Coursework:',
      eduCourseworkText: 'Software Engineering, Web System Development, Object-Oriented Programming (OOP), Data Structures & Algorithms, Modern Programming Technologies, Database Management Systems, Cloud Computing.',
      eduStatus: 'Undergraduate · Expected Graduation: Oct 2026',
    },
    works: {
      eyebrow: 'SELECTED WORKS',
      title: 'Production Systems',
      techStackLabel: 'TECH STACK:',
      p1Tag: 'JOB RECRUITMENT PLATFORM',
      p1Role: 'Lead Fullstack Developer · Spring Boot + ReactJS',
      p1Desc: 'Full-featured recruitment platform connecting candidates, employers, and administrators with comprehensive role-based access, job lifecycle management, and application tracking workflows.',
      p1H1Title: 'Spring Boot REST API:',
      p1H1Text: 'Engineered JPA architecture with MySQL handling multi-role access for candidates, employers, and administrators.',
      p1H2Title: 'Spring Security & JWT:',
      p1H2Text: 'Implemented stateless token authentication, role authorization, and protected API endpoints.',
      p1H3Title: 'ReactJS & Vite:',
      p1H3Text: 'Developed reactive UI with Tailwind CSS and deployed automated build pipeline on Render.',
      p2Tag: 'MOBILE FOOD DELIVERY & BOOKING',
      p2Role: 'Fullstack Mobile Engineer · React Native + Django REST',
      p2Desc: 'Cross-platform mobile application covering customer food delivery ordering, table reservations, restaurant menu management, and dedicated kitchen staff (chef) workflows.',
      p2H1Title: 'Django REST Framework:',
      p2H1Text: 'Built REST APIs covering menus, table reservations, order lifecycle, and customer reviews.',
      p2H2Title: 'Payment Gateways:',
      p2H2Text: 'Integrated MoMo and Stripe for order payments, with webhook listeners verifying instant order confirmation.',
      p2H3Title: 'React Native & Firebase:',
      p2H3Text: 'Built mobile apps for customers and chefs with Firebase real-time in-app customer chat.',
      p3Tag: 'TYPOGRAPHIC SSG PORTFOLIO',
      p3Role: 'Creator & Frontend Architect · Next.js 16 + Tailwind CSS v4',
      p3Desc: 'Minimalist, high-performance portfolio engine built with Next.js App Router and TypeScript, compiled to static export for zero-latency hosting on GitHub Pages via automated CI/CD.',
      p3LiveBadge: 'You are viewing this site live',
    },
    capabilities: {
      eyebrow: 'CAPABILITIES',
      title: 'Technical Capabilities',
      subtitle: 'SYSTEM ARCHITECTURE & PRODUCTION ENGINEERING',
      catLanguages: 'PROGRAMMING LANGUAGES',
      catFrameworks: 'FRAMEWORKS & RUNTIMES',
      catDatabases: 'DATABASES & CACHING',
      catDevopsAi: 'TOOLING & AI-ASSISTED DEVELOPMENT',
    },
    contact: {
      eyebrow: 'DIRECT CONTACT',
      title: "Let's Build Together",
      responseBadge: 'Response within 24h',
      copyPrompt: 'CLICK TO COPY EMAIL DIRECTLY',
      copiedToast: 'Copied thinhthai963@gmail.com to clipboard!',
      phoneLabel: 'PHONE / ZALO',
      githubLabel: 'GITHUB PROFILE',
      linkedinLabel: 'LINKEDIN PROFILE',
      cvLabel: 'CURRICULUM VITAE',
      cvAction: 'View Full Profile',
      backToTop: 'Back to top',
    },
  },
  vi: {
    nav: {
      summary: 'TỔNG QUAN',
      experience: 'KINH NGHIỆM',
      works: 'DỰ ÁN',
      skills: 'KỸ NĂNG',
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
    },
    hero: {
      available: 'SẴN SÀNG NHẬN DỰ ÁN MỚI',
      location: 'TP. HỒ CHÍ MINH, VIỆT NAM',
      school: 'KHOA HỌC MÁY TÍNH HCMCOU',
      tagline: 'KỸ SƯ PHẦN MỀM · LẬP TRÌNH FULL-STACK',
      bio: 'Sinh viên năm cuối ngành Khoa học Máy tính tại Trường Đại học Mở TP.HCM, đã trực tiếp xây dựng và triển khai nhiều sản phẩm web thực tế từ thiết kế cơ sở dữ liệu đến frontend và backend. Thành thạo Java, Python, JavaScript, TypeScript, C++ cùng các framework React và Spring Boot. Kết hợp nền tảng kỹ thuật vững chắc với quy trình tối ưu hỗ trợ bởi AI để phát triển phần mềm chất lượng cao, ổn định và nhanh chóng.',
      stat1Label: 'Ngân hàng tích hợp (OCR Pipeline)',
      stat2Label: 'Đối soát tiền mặt (BW Industrial)',
      stat3Label: 'Cắt giảm thời gian thủ công',
    },
    experience: {
      eyebrow: 'LỊCH SỬ LÀM VIỆC',
      title: 'Kinh nghiệm làm việc',
      tag1: 'NỀN TẢNG FINTECH TỰ ĐỘNG HÓA & AI',
      period1: 'THÁNG 10/2025 — THÁNG 04/2026',
      role1: 'Thực tập sinh Kỹ sư Phần mềm Full-stack',
      location1: 'TP. Hồ Chí Minh, Việt Nam · Nền tảng Web Fintech Tự động hóa',
      badge1: 'Hoàn thành thực tập 6 tháng',
      desc1: 'Xây dựng ứng dụng web nội bộ phục vụ đội ngũ tài chính và kế toán xử lý sao kê ngân hàng và tạo báo cáo tiền mặt tự động, đảm nhiệm các khâu trích xuất giao dịch, phân loại và đối soát dữ liệu.',
      deliverablesHeader: 'KẾT QUẢ ĐẠT ĐƯỢC & TÁC ĐỘNG:',
      deliverable1Title: 'Xử lý sao kê (10+ ngân hàng):',
      deliverable1Text: 'Xây dựng bộ parser REST bằng FastAPI cho Vietcombank, Techcombank, BIDV, ACB, MBBank, kết hợp Gemini OCR dự phòng cho hóa đơn scan.',
      deliverable2Title: 'Tự động hóa báo cáo tiền mặt (1 ngày → 2 giờ):',
      deliverable2Text: 'Thiết kế luồng đối soát theo phiên làm việc khớp báo cáo đa tệp theo luật tài chính, giảm 75% thời gian xử lý thủ công.',
      deliverable3Title: 'Đăng nhập SSO doanh nghiệp & Quản lý phiên:',
      deliverable3Text: 'Tích hợp Google OAuth2 SSO khóa tên miền, token JWT kiểm soát phiên thiết bị qua Redis và phân quyền RBAC chặt chẽ.',
      deliverable4Title: 'Theo dõi thời gian thực qua SSE & Giám sát AI:',
      deliverable4Text: 'Xây dựng giao diện React cập nhật tiến độ batch job qua SSE, ghi log tập trung và đo lường chi phí AI nội bộ.',
      eduTag: 'NỀN TẢNG KHOA HỌC MÁY TÍNH',
      eduPeriod: 'THÁNG 10/2022 — HIỆN TẠI',
      eduDegree: 'Cử nhân Khoa học Máy tính',
      eduSchool: 'Trường Đại học Mở TP.HCM (HCMCOU)',
      eduCourseworkLabel: 'Các môn học chuyên ngành:',
      eduCourseworkText: 'Kỹ nghệ phần mềm, Phát triển hệ thống web, Lập trình hướng đối tượng (OOP), Cấu trúc dữ liệu & Giải thuật, Công nghệ lập trình hiện đại, Hệ quản trị cơ sở dữ liệu, Điện toán đám mây.',
      eduStatus: 'Sinh viên đại học · Dự kiến tốt nghiệp: 10/2026',
    },
    works: {
      eyebrow: 'DỰ ÁN TIÊU BIỂU',
      title: 'Dự án tiêu biểu',
      techStackLabel: 'CÔNG NGHỆ:',
      p1Tag: 'NỀN TẢNG TUYỂN DỤNG VIỆC LÀM',
      p1Role: 'Trưởng nhóm Fullstack Developer · Spring Boot + ReactJS',
      p1Desc: 'Nền tảng tuyển dụng toàn diện kết nối ứng viên, nhà tuyển dụng và quản trị viên với phân quyền đa vai trò, quản lý vòng đời tin tuyển dụng và theo dõi hồ sơ ứng tuyển.',
      p1H1Title: 'Spring Boot REST API:',
      p1H1Text: 'Thiết kế kiến trúc JPA với MySQL xử lý quyền truy cập đa vai trò cho ứng viên, nhà tuyển dụng và quản trị viên.',
      p1H2Title: 'Spring Security & JWT:',
      p1H2Text: 'Triển khai xác thực stateless token, phân quyền vai trò và bảo vệ các API endpoint.',
      p1H3Title: 'ReactJS & Vite:',
      p1H3Text: 'Xây dựng giao diện tương tác với Tailwind CSS và thiết lập pipeline build tự động trên Render.',
      p2Tag: 'ỨNG DỤNG GIAO ĐỒ ĂN & ĐẶT BÀN',
      p2Role: 'Kỹ sư Mobile Fullstack · React Native + Django REST',
      p2Desc: 'Ứng dụng di động đa nền tảng bao gồm đặt đồ ăn giao tận nơi, đặt bàn ăn, quản lý thực đơn và luồng xử lý đơn hàng cho đầu bếp.',
      p2H1Title: 'Django REST Framework:',
      p2H1Text: 'Xây dựng REST API xử lý thực đơn, đặt bàn, vòng đời đơn hàng và đánh giá của khách hàng.',
      p2H2Title: 'Cổng thanh toán:',
      p2H2Text: 'Tích hợp MoMo và Stripe để thanh toán đơn hàng với webhook xác nhận giao dịch tức thì.',
      p2H3Title: 'React Native & Firebase:',
      p2H3Text: 'Phát triển ứng dụng khách hàng và đầu bếp với tính năng chat thời gian thực qua Firebase.',
      p3Tag: 'PORTFOLIO KIẾN TRÚC TĨNH TYPOGRAPHY',
      p3Role: 'Tác giả & Kiến trúc sư Frontend · Next.js 16 + Tailwind CSS v4',
      p3Desc: 'Engine portfolio tối giản hiệu năng cao xây dựng với Next.js App Router và TypeScript, biên dịch tĩnh (SSG) với độ trễ bằng 0 trên GitHub Pages qua CI/CD tự động.',
      p3LiveBadge: 'Bạn đang xem trực tiếp trang này',
    },
    capabilities: {
      eyebrow: 'NĂNG LỰC KỸ THUẬT',
      title: 'Kỹ năng chuyên môn',
      subtitle: 'KIẾN TRÚC HỆ THỐNG & KỸ THUẬT PHẦN MỀM',
      catLanguages: 'NGÔN NGỮ LẬP TRÌNH',
      catFrameworks: 'FRAMEWORK & NỀN TẢNG',
      catDatabases: 'CƠ SỞ DỮ LIỆU & BỘ NHỚ ĐỆM',
      catDevopsAi: 'CÔNG CỤ & QUY TRÌNH HỖ TRỢ BỞI AI',
    },
    contact: {
      eyebrow: 'LIÊN HỆ TRỰC TIẾP',
      title: 'Kết nối hợp tác',
      responseBadge: 'Phản hồi trong 24h',
      copyPrompt: 'BẤM ĐỂ SAO CHÉP EMAIL TRỰC TIẾP',
      copiedToast: 'Đã sao chép thinhthai963@gmail.com vào clipboard!',
      phoneLabel: 'ĐIỆN THOẠI / ZALO',
      githubLabel: 'HỒ SƠ GITHUB',
      linkedinLabel: 'HỒ SƠ LINKEDIN',
      cvLabel: 'HỒ SƠ NĂNG LỰC (CV)',
      cvAction: 'Xem chi tiết hồ sơ',
      backToTop: 'Trở về đầu trang',
    },
  },
};
