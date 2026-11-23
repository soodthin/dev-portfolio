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
    dockTitle: string;
    whereAppliedLabel: string;
    projectSingular: string;
    projectPlural: string;
    clearFilter: string;
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
      summary: 'Summary',
      experience: 'Experience',
      works: 'Selected Works',
      skills: 'Capabilities',
      education: 'Education',
      contact: 'Contact',
    },
    header: {
      role: 'Software Engineer',
      contactBtn: 'Contact',
      shareTooltip: 'Copy portfolio link',
      shareCopied: 'Link copied',
      lightTooltip: 'Switch to Light Mode',
      darkTooltip: 'Switch to Dark Mode',
      langTooltip: 'Chuyển sang Tiếng Việt',
      cmdKPrompt: 'Quick jump',
    },
    hero: {
      eyebrow: 'Summary',
      viewWork: 'Selected Works',
      contactMe: 'Get in Touch',
      metricsCaption: 'Engineering Impact',
    },
    experience: {
      eyebrow: 'Work History',
      title: 'BW Industrial Dev JSC',
      subtitle: 'Financial AI Automation & Reconciliation Pipeline',
      companyBadge: 'Production System',
      liveAppBtn: 'Open Live App',
      pipelineTitle: '5-Stage Reconciliation Pipeline',
      pipelineSubtitle: 'Automated Statement Extraction & Ledger Matching',
      deliverablesTitle: 'Key Deliverables',
      techStackTitle: 'Core Stack',
    },
    works: {
      eyebrow: 'Selected Works',
      title: 'Shipped Systems',
      subtitle:
        'Three full-stack production systems built for transaction integrity, clear architecture, and measurable outcomes.',
      sourceCodeBtn: 'Source Code',
      liveDemoBtn: 'Live Site',
      viewGallery: 'Gallery',
      architectureTitle: 'Architecture Highlights',
      specsTitle: 'Technical Stack',
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'Technical Matrix',
      subtitle: '',
      filterAll: 'All',
      filterLanguages: 'Languages',
      filterFrameworks: 'Frameworks & Platforms',
      filterDatabases: 'Databases',
      filterTools: 'Tools & DevOps',
      filterAi: 'AI-Assisted Engineering',
      dockTitle: 'Production Context',
      whereAppliedLabel: 'Applied In',
      projectSingular: 'project',
      projectPlural: 'projects',
      clearFilter: 'Reset',
    },
    education: {
      eyebrow: 'Education',
      title: 'Academic Foundation',
      subtitle:
        'Computer Science fundamentals combined with hands-on systems engineering and bilingual collaboration.',
      degreeTitle: 'Computer Science Curriculum',
      courseworkTitle: 'Core Coursework',
      languagesTitle: 'Languages',
      statusLabel: 'Status',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start a Conversation',
      subtitle:
        'Open to Software Engineering, Backend, and FinTech Automation roles in Ho Chi Minh City or remote.',
      copyEmail: 'Copy',
      emailCopied: 'Copied ✓',
      printResume: 'Print / Save Resume',
      printHint: 'Formatted for clean 2-page PDF export',
      saigonTime: 'Ho Chi Minh City',
      networkTitle: 'Direct Channels',
      backToTop: 'Back to top',
      colophon:
        'Built with Next.js 16, React 19, Motion, and Lenis · Deployed via GitHub Pages.',
    },
    commandPalette: {
      searchPlaceholder: 'Search sections, projects, channels...',
      noResults: 'No matching entries.',
      navigationGroup: 'Sections',
      projectsGroup: 'Projects',
      contactGroup: 'Channels',
      systemGroup: 'Preferences',
      toggleTheme: 'Toggle Light / Dark Mode',
      switchLang: 'Chuyển sang Tiếng Việt',
      escHint: 'ESC close',
      navigateHint: '↑↓ move',
      selectHint: '↵ open',
    },
  },
  vi: {
    nav: {
      summary: 'Tổng quan',
      experience: 'Kinh nghiệm',
      works: 'Dự án',
      skills: 'Năng lực',
      education: 'Học vấn',
      contact: 'Liên hệ',
    },
    header: {
      role: 'Kỹ sư Phần mềm',
      contactBtn: 'Liên hệ',
      shareTooltip: 'Sao chép liên kết',
      shareCopied: 'Đã sao chép',
      lightTooltip: 'Chuyển sang Giao diện Sáng',
      darkTooltip: 'Chuyển sang Giao diện Tối',
      langTooltip: 'Switch to English',
      cmdKPrompt: 'Tìm nhanh',
    },
    hero: {
      eyebrow: 'Tổng quan',
      viewWork: 'Xem Dự án',
      contactMe: 'Trao đổi trực tiếp',
      metricsCaption: 'Chỉ số Kỹ thuật',
    },
    experience: {
      eyebrow: 'Kinh nghiệm',
      title: 'Công ty CP Phát triển Công nghiệp BW',
      subtitle: 'Hệ thống Tự động hóa Tài chính & Đối soát Dòng tiền',
      companyBadge: 'Triển khai Production',
      liveAppBtn: 'Mở Ứng dụng Thực tế',
      pipelineTitle: 'Đường ống Đối soát 5 Giai đoạn',
      pipelineSubtitle: 'Bóc tách Sao kê & Khớp Sổ cái Tự động',
      deliverablesTitle: 'Hạng mục Triển khai',
      techStackTitle: 'Công nghệ Ứng dụng',
    },
    works: {
      eyebrow: 'Dự án Tiêu biểu',
      title: 'Hệ thống Đã Triển khai',
      subtitle:
        'Ba hệ thống full-stack hoàn chỉnh chú trọng tính toàn vẹn giao dịch, kiến trúc rõ ràng và số liệu thực tế.',
      sourceCodeBtn: 'Mã nguồn',
      liveDemoBtn: 'Trang Live',
      viewGallery: 'Xem ảnh',
      architectureTitle: 'Điểm nhấn Kiến trúc',
      specsTitle: 'Thông số Kỹ thuật',
    },
    capabilities: {
      eyebrow: 'Năng lực',
      title: 'Ma trận Công nghệ',
      subtitle: '',
      filterAll: 'Tất cả',
      filterLanguages: 'Ngôn ngữ',
      filterFrameworks: 'Frameworks & Nền tảng',
      filterDatabases: 'Cơ sở Dữ liệu',
      filterTools: 'Công cụ & DevOps',
      filterAi: 'Kỹ thuật Hỗ trợ AI',
      dockTitle: 'Ngữ cảnh Ứng dụng',
      whereAppliedLabel: 'Đã áp dụng tại',
      projectSingular: 'dự án',
      projectPlural: 'dự án',
      clearFilter: 'Đặt lại',
    },
    education: {
      eyebrow: 'Học vấn',
      title: 'Nền tảng Học vấn',
      subtitle:
        'Kiến thức nền tảng Khoa học Máy tính kết hợp kinh nghiệm triển khai hệ thống và làm việc song ngữ.',
      degreeTitle: 'Chương trình Khoa học Máy tính',
      courseworkTitle: 'Môn học Trọng tâm',
      languagesTitle: 'Ngoại ngữ',
      statusLabel: 'Tình trạng',
    },
    contact: {
      eyebrow: 'Liên hệ',
      title: 'Kết nối Trực tiếp',
      subtitle:
        'Sẵn sàng cho các vị trí Kỹ sư Phần mềm, Backend và Tự động hóa FinTech tại TP.HCM hoặc làm việc từ xa.',
      copyEmail: 'Sao chép',
      emailCopied: 'Đã chép ✓',
      printResume: 'In / Lưu CV (PDF)',
      printHint: 'Định dạng sẵn cho bản in 2 trang gọn gàng',
      saigonTime: 'TP. Hồ Chí Minh',
      networkTitle: 'Kênh Liên hệ',
      backToTop: 'Lên đầu trang',
      colophon:
        'Xây dựng với Next.js 16, React 19, Motion và Lenis · Triển khai trên GitHub Pages.',
    },
    commandPalette: {
      searchPlaceholder: 'Tìm mục trang, dự án, kênh liên hệ...',
      noResults: 'Không có kết quả phù hợp.',
      navigationGroup: 'Mục trang',
      projectsGroup: 'Dự án',
      contactGroup: 'Liên hệ',
      systemGroup: 'Tùy chọn',
      toggleTheme: 'Chuyển chế độ Sáng / Tối',
      switchLang: 'Switch to English',
      escHint: 'ESC đóng',
      navigateHint: '↑↓ di chuyển',
      selectHint: '↵ mở',
    },
  },
};
