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
    shareCopied: string;
    lightTooltip: string;
    darkTooltip: string;
    langTooltip: string;
    cmdKPrompt: string;
  };
  hero: {
    eyebrow: string;
    viewWork: string;
    contactMe: string;
    metricsCaption: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    companyBadge: string;
    liveAppBtn: string;
    pipelineTitle: string;
    pipelineSubtitle: string;
    pipelineClickHint: string;
    deliverablesTitle: string;
    techStackTitle: string;
  };
  works: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sourceCodeBtn: string;
    liveDemoBtn: string;
    viewGallery: string;
    architectureTitle: string;
    specsTitle: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterLanguages: string;
    filterFrameworks: string;
    filterDatabases: string;
    filterTools: string;
    filterAi: string;
    marqueeLeft: string;
    marqueeRight: string;
    dockTitle: string;
    dockEmptyHint: string;
    levelLabel: string;
    whereAppliedLabel: string;
  };
  education: {
    eyebrow: string;
    title: string;
    subtitle: string;
    degreeTitle: string;
    courseworkTitle: string;
    languagesTitle: string;
    statusLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    copyEmail: string;
    emailCopied: string;
    printResume: string;
    printHint: string;
    saigonTime: string;
    networkTitle: string;
    backToTop: string;
    colophon: string;
  };
  commandPalette: {
    searchPlaceholder: string;
    noResults: string;
    navigationGroup: string;
    projectsGroup: string;
    contactGroup: string;
    systemGroup: string;
    toggleTheme: string;
    switchLang: string;
    escHint: string;
    navigateHint: string;
    selectHint: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      summary: '01 // Summary',
      experience: '02 // Experience',
      works: '03 // Works',
      skills: '04 // Capabilities',
      education: '05 // Academic',
      contact: '06 // Contact',
    },
    header: {
      role: 'Software Engineer // FinTech',
      contactBtn: 'Direct Contact',
      shareTooltip: 'Copy portfolio link',
      shareCopied: 'Portfolio link copied ✓',
      lightTooltip: 'Switch to Light Mode',
      darkTooltip: 'Switch to Dark Mode',
      langTooltip: 'Chuyển sang Tiếng Việt',
      cmdKPrompt: 'Quick actions',
    },
    hero: {
      eyebrow: '01 / Executive Summary & Manifesto',
      viewWork: 'Inspect Selected Works',
      contactMe: 'Start Conversation',
      metricsCaption: 'Audited Engineering Impact',
    },
    experience: {
      eyebrow: '02 / Production Work History',
      title: 'BW Industrial Dev JSC',
      subtitle: 'Financial AI Automation & Data Reconciliation Engine',
      companyBadge: 'Production Deployment',
      liveAppBtn: 'Inspect Live App',
      pipelineTitle: '5-Stage FinTech AI Pipeline',
      pipelineSubtitle: 'Interactive Automated Statement Extraction & Reconciliation Lifecycle',
      pipelineClickHint: 'Click any stage to inspect architecture telemetry',
      deliverablesTitle: 'Key Engineering Deliverables',
      techStackTitle: 'Core Stack Applied',
    },
    works: {
      eyebrow: '03 / Selected Production Works',
      title: 'Architectural Systems',
      subtitle: 'Three full-stack production systems engineered with strict performance, transaction safety, and honest metrics.',
      sourceCodeBtn: 'Source Code',
      liveDemoBtn: 'Live Demo',
      viewGallery: 'Open Lightbox (Screenshots)',
      architectureTitle: 'Architectural Invariants',
      specsTitle: 'Engineering Specs',
    },
    capabilities: {
      eyebrow: '04 / Technical Capabilities',
      title: 'Engineering Stack & Tooling',
      subtitle: 'A disciplined, production-tested technical repertoire spanning strongly-typed backends, reactive interfaces, and AI velocity tooling.',
      filterAll: 'All Capabilities',
      filterLanguages: 'Languages',
      filterFrameworks: 'Frameworks & Platforms',
      filterDatabases: 'Databases',
      filterTools: 'Tools & DevOps',
      filterAi: 'AI Tooling',
      marqueeLeft: 'Full-Stack & Systems Core',
      marqueeRight: 'Data, DevOps & AI Tooling',
      dockTitle: 'Context Inspector Dock',
      dockEmptyHint: 'Hover or tap any skill pill above to inspect where and how it was applied across production code.',
      levelLabel: 'Proficiency Tier',
      whereAppliedLabel: 'Production Systems & Workplaces',
    },
    education: {
      eyebrow: '05 / Academic Foundation & Languages',
      title: 'Academic Dossier',
      subtitle: 'Theoretical computer science rigour paired with practical systems implementation and cross-lingual fluency.',
      degreeTitle: 'Computer Science Curriculum',
      courseworkTitle: 'Key Completed Coursework',
      languagesTitle: 'Linguistic Proficiencies',
      statusLabel: 'Degree Status',
    },
    contact: {
      eyebrow: '06 / Direct Contact & Network',
      title: 'Initiate Contact',
      subtitle: 'Open for Software Engineering opportunities, FinTech backend architecture, and high-impact full-stack challenges.',
      copyEmail: 'Click to Copy Email',
      emailCopied: 'Copied to Clipboard ✓',
      printResume: 'Print / Save Resume (CV)',
      printHint: 'Formatted for crisp 2-page print layout',
      saigonTime: 'Saigon, Vietnam (GMT+7)',
      networkTitle: 'Direct Channels',
      backToTop: 'Back to Top ↑',
      colophon: 'Designed in Swiss Editorial style with Next.js 16, React 19, Motion, and Lenis. Hosted on GitHub Pages.',
    },
    commandPalette: {
      searchPlaceholder: 'Search sections, production projects, contact channels...',
      noResults: 'No matching entries found.',
      navigationGroup: 'Section Navigation (01 — 06)',
      projectsGroup: 'Production Projects',
      contactGroup: 'Direct Channels & Socials',
      systemGroup: 'Preferences & Actions',
      toggleTheme: 'Toggle Light / Dark Mode',
      switchLang: 'Chuyển sang Tiếng Việt',
      escHint: 'ESC to close',
      navigateHint: '↑↓ navigate',
      selectHint: '↵ select',
    },
  },
  vi: {
    nav: {
      summary: '01 // Tổng quan',
      experience: '02 // Kinh nghiệm',
      works: '03 // Dự án',
      skills: '04 // Năng lực',
      education: '05 // Học vấn',
      contact: '06 // Liên hệ',
    },
    header: {
      role: 'Kỹ sư Phần mềm // FinTech',
      contactBtn: 'Liên hệ Trực tiếp',
      shareTooltip: 'Sao chép liên kết trang',
      shareCopied: 'Đã sao chép liên kết ✓',
      lightTooltip: 'Chuyển sang Giao diện Sáng',
      darkTooltip: 'Chuyển sang Giao diện Tối',
      langTooltip: 'Switch to English',
      cmdKPrompt: 'Lệnh nhanh',
    },
    hero: {
      eyebrow: '01 / Tổng quan & Tuyên ngôn Kỹ thuật',
      viewWork: 'Xem Dự án Tiêu biểu',
      contactMe: 'Bắt đầu Trao đổi',
      metricsCaption: 'Chỉ số Tác động Kỹ thuật Đã Kiểm toán',
    },
    experience: {
      eyebrow: '02 / Kinh nghiệm Làm việc Production',
      title: 'Công ty CP Phát triển Công nghiệp BW',
      subtitle: 'Hệ thống Tự động hóa Dữ liệu Tài chính & AI Đối soát Dòng tiền',
      companyBadge: 'Triển khai Thực tế',
      liveAppBtn: 'Mở Ứng dụng Thực tế',
      pipelineTitle: 'Đường ống AI FinTech 5 Giai đoạn',
      pipelineSubtitle: 'Quy trình Khép kín Bóc tách Sao kê và Đối soát Kế toán Tự động',
      pipelineClickHint: 'Nhấp vào từng giai đoạn để xem thông số kiến trúc',
      deliverablesTitle: 'Các Hạng mục Kỹ thuật Trọng yếu',
      techStackTitle: 'Công nghệ Ứng dụng',
    },
    works: {
      eyebrow: '03 / Dự án Production Tiêu biểu',
      title: 'Kiến trúc Hệ thống',
      subtitle: 'Ba hệ thống full-stack production hoàn chỉnh với tính toàn vẹn giao dịch cao và số liệu trung thực.',
      sourceCodeBtn: 'Mã nguồn',
      liveDemoBtn: 'Bản Demo',
      viewGallery: 'Mở Lightbox (Ảnh chụp màn hình)',
      architectureTitle: 'Nguyên lý Kiến trúc',
      specsTitle: 'Thông số Kỹ thuật',
    },
    capabilities: {
      eyebrow: '04 / Năng lực & Công nghệ',
      title: 'Bộ Công nghệ Kỹ thuật',
      subtitle: 'Tập hợp kỹ năng thực chiến được kiểm chứng trên các hệ thống backend định kiểu mạnh, giao diện tối ưu và công cụ AI hỗ trợ.',
      filterAll: 'Tất cả Năng lực',
      filterLanguages: 'Ngôn ngữ',
      filterFrameworks: 'Frameworks & Nền tảng',
      filterDatabases: 'Cơ sở Dữ liệu',
      filterTools: 'Công cụ & DevOps',
      filterAi: 'Công cụ AI',
      marqueeLeft: 'Nền tảng Full-Stack & Hệ thống',
      marqueeRight: 'Dữ liệu, DevOps & Công cụ AI',
      dockTitle: 'Khay Kiểm tra Ngữ cảnh',
      dockEmptyHint: 'Di chuột hoặc chạm vào bất kỳ kỹ năng nào ở trên để xem chi tiết dự án thực tế đã ứng dụng.',
      levelLabel: 'Cấp độ Thành thạo',
      whereAppliedLabel: 'Hệ thống & Doanh nghiệp Đã Ứng dụng',
    },
    education: {
      eyebrow: '05 / Nền tảng Học vấn & Ngôn ngữ',
      title: 'Hồ sơ Học vấn',
      subtitle: 'Nền tảng khoa học máy tính hàn lâm kết hợp thực hành hệ thống chuyên sâu và khả năng song ngữ.',
      degreeTitle: 'Chương trình Khoa học Máy tính',
      courseworkTitle: 'Các Môn học Trọng tâm',
      languagesTitle: 'Năng lực Ngoại ngữ',
      statusLabel: 'Tình trạng Tốt nghiệp',
    },
    contact: {
      eyebrow: '06 / Liên hệ Trực tiếp & Mạng lưới',
      title: 'Kết nối Trực tiếp',
      subtitle: 'Sẵn sàng tiếp nhận các cơ hội vị trí Kỹ sư Phần mềm, kiến trúc backend FinTech và các thử thách full-stack giá trị cao.',
      copyEmail: 'Nhấp để Sao chép Email',
      emailCopied: 'Đã sao chép vào bộ nhớ tạm ✓',
      printResume: 'In / Lưu Hồ sơ (CV)',
      printHint: 'Được định dạng tối ưu cho bản in 2 trang sạch đẹp',
      saigonTime: 'Sài Gòn, Việt Nam (GMT+7)',
      networkTitle: 'Kênh Liên hệ Trực tiếp',
      backToTop: 'Lên đầu trang ↑',
      colophon: 'Thiết kế theo phong cách Swiss Editorial trên nền tảng Next.js 16, React 19, Motion và Lenis. Lưu trữ trên GitHub Pages.',
    },
    commandPalette: {
      searchPlaceholder: 'Tìm nhanh mục trang, dự án thực tế, kênh liên hệ...',
      noResults: 'Không tìm thấy kết quả phù hợp.',
      navigationGroup: 'Điều hướng Mục Trang (01 — 06)',
      projectsGroup: 'Dự án Production',
      contactGroup: 'Kênh Liên hệ & Mạng xã hội',
      systemGroup: 'Tùy chọn & Tác vụ',
      toggleTheme: 'Chuyển đổi Chế độ Sáng / Tối',
      switchLang: 'Switch to English',
      escHint: 'ESC đóng',
      navigateHint: '↑↓ di chuyển',
      selectHint: '↵ chọn',
    },
  },
};
