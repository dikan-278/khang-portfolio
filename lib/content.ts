// Sourced from career-ops/cv.md, config/profile.yml, and article-digest.md.
// English is the reformulated base; Vietnamese is a direct translation of the
// same facts — no new claims introduced in either language.

export type Locale = "en" | "vi";

export type CaseStudyContent = {
  slug: string;
  client: string;
  title: string;
  role: string;
  period: string;
  team: string;
  heroMetric: string;
  problem: string;
  approach: string;
  outcome: string;
  aiNote?: string;
  tags: string[];
  gradient: string;
  // Delivery status is a fact, not a translated string — identical across
  // locales. Drives the stamp badge on the case-study document header.
  status: "live" | "shipped";
};

export type ExperienceContent = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  startYear: number;
  endYear: number;
  // Locale-independent lookup key for the employer's logo (see
  // lib/clientLogos.ts) — the `company` string itself differs by locale
  // (VI carries the full legal name), so it can't double as the key.
  logoKey: string;
};

export type EducationContent = { degree: string; institution: string; period: string };
export type CertificationContent = { name: string; issuer: string };
export type SkillGroupContent = { category: string; items: string[] };
export type ProcessStepContent = { step: string; title: string; detail: string };
export type AiWorkflowItem = { title: string; detail: string };
// `suffix` is rendered after the count-up animation settles (e.g. "+", "%",
// or a range tail like "–40%") — kept separate from `value` so the number
// itself can animate from 0.
export type StatHighlight = { value: string; suffix: string; label: string; sub: string };

export type Content = {
  meta: { title: string; description: string };
  ui: {
    resume: string;
    navHome: string;
    navSkills: string;
    navWork: string;
    navAi: string;
    navCareer: string;
    navContact: string;
    heroStatus: string;
    heroRatingNote: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    heroBasedInLabel: string;
    heroLinkedin: string;
    workedWithLabel: string;
    workSectionLabel: string;
    workTitle: string;
    workSubtitle: string;
    caseStatusLive: string;
    caseStatusShipped: string;
    problemLabel: string;
    approachLabel: string;
    outcomeLabel: string;
    approachSectionTitle: string;
    approachSectionSubtitle: string;
    differentiatorLabel: string;
    differentiatorTitle: string;
    differentiatorSubtitle: string;
    careerLabel: string;
    careerTitle: string;
    careerSubtitle: string;
    educationLabel: string;
    educationTitle: string;
    educationSubtitle: string;
    educationHeading: string;
    certificationsHeading: string;
    toolkitLabel: string;
    toolkitTitle: string;
    contactLabel: string;
    contactTitle: string;
    contactSubtitle: string;
    footerBuiltWith: string;
  };
  profile: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    exitStory: string;
  };
  heroTitleLead: string;
  heroTitleHighlight: string;
  workedWith: string[];
  statHighlights: StatHighlight[];
  process: ProcessStepContent[];
  caseStudies: CaseStudyContent[];
  aiWorkflow: AiWorkflowItem[];
  experience: ExperienceContent[];
  education: EducationContent[];
  certifications: CertificationContent[];
  skills: SkillGroupContent[];
};

const en: Content = {
  meta: {
    title: "Khang Tran — Senior Business Analyst & Project Manager",
    description:
      "BA & Project Manager driving CRM/HRM/LMS delivery with AI-augmented workflows. Case studies: Vietravel CRM, AstraZeneca AI-LMS, KBank Lucky Draw.",
  },
  ui: {
    resume: "Resume",
    navHome: "Home",
    navSkills: "Skills",
    navWork: "Work",
    navAi: "AI",
    navCareer: "Career",
    navContact: "Contact",
    heroStatus: "Open to work",
    heroRatingNote: "4+ years · Vietravel, AstraZeneca, KBank",
    heroCtaPrimary: "View case studies",
    heroCtaSecondary: "Get in touch",
    heroBasedInLabel: "Based in",
    heroLinkedin: "LinkedIn",
    workedWithLabel: "Delivered enterprise projects for",
    workSectionLabel: "Selected work",
    workTitle: "Case studies",
    workSubtitle:
      "Three enterprise delivery engagements spanning CRM, LMS, and campaign platforms — from requirements through go-live.",
    caseStatusLive: "Live",
    caseStatusShipped: "Shipped",
    problemLabel: "Problem",
    approachLabel: "Approach",
    outcomeLabel: "Outcome",
    approachSectionTitle: "My approach",
    approachSectionSubtitle: "A consistent BA/PM workflow across CRM, LMS, and campaign platforms.",
    differentiatorLabel: "Differentiator",
    differentiatorTitle: "An AI-augmented BA practice, not a one-off experiment",
    differentiatorSubtitle:
      "Claude (Cowork, Code) and Model Context Protocol tooling are part of daily BA work — drafting requirements, comparing vendors, and turning meetings into action items. On the current Vietravel engagement, this cuts documentation turnaround by an estimated 30-40%.",
    careerLabel: "Career",
    careerTitle: "My journey through delivery",
    careerSubtitle: "Pick a year to see what I was leading at the time.",
    educationLabel: "Credentials",
    educationTitle: "Education & certifications",
    educationSubtitle: "Formal training behind the delivery work above.",
    educationHeading: "Education",
    certificationsHeading: "Certifications",
    toolkitLabel: "Toolkit",
    toolkitTitle: "Skills & competencies",
    contactLabel: "Let's talk",
    contactTitle: "Open to Senior BA, PM, and Product Owner roles",
    contactSubtitle: "Happy to walk through any of the case studies above in more detail.",
    footerBuiltWith: "Built with Next.js & Tailwind",
  },
  profile: {
    name: "Khang Tran",
    title: "Senior Business Analyst & Project Manager",
    location: "Ho Chi Minh City, Vietnam",
    email: "tranduykhang.forwork@gmail.com",
    phone: "+84 352 121 181",
    linkedinUrl: "https://linkedin.com/in/tdkhang278",
    exitStory:
      "4+ years turning ambiguous enterprise requirements (CRM, HRM, LMS, AI platforms) into shipped solutions for clients like Vietravel, AstraZeneca, Mobifone and KBank — now using Claude/MCP tooling to cut BA documentation time 30-40%.",
  },
  heroTitleLead: "I turn messy requirements into",
  heroTitleHighlight: "shipped systems",
  workedWith: ["Vietravel", "AstraZeneca", "Mobifone", "De Heus Vietnam", "KBank Vietnam"],
  statHighlights: [
    { value: "4", suffix: "+", label: "Years in enterprise delivery", sub: "CRM, HRM, LMS, AI platforms" },
    { value: "20", suffix: "M+", label: "Customer records delivered", sub: "KBank national lucky-draw campaign, on schedule" },
    { value: "30", suffix: "–40%", label: "Faster BA documentation", sub: "Using Claude + MCP tooling on live engagements" },
    { value: "100", suffix: "%", label: "On-time milestone delivery", sub: "Across AstraZeneca and DR Digital engagements" },
  ],
  process: [
    {
      step: "01",
      title: "Discovery & requirements",
      detail:
        "Elicit requirements directly from stakeholders; FIT/GAP analysis to separate must-haves from nice-to-haves.",
    },
    {
      step: "02",
      title: "Solution design",
      detail:
        "Translate findings into BRDs, user stories, and functional specs that developers and vendors can build from.",
    },
    {
      step: "03",
      title: "Agile delivery",
      detail:
        "Run sprint planning, backlog grooming, and vendor coordination; keep risk and budget visible to stakeholders.",
    },
    {
      step: "04",
      title: "UAT & launch",
      detail: "Facilitate UAT workshops, train users, and support go-live through post-deployment adoption.",
    },
  ],
  caseStudies: [
    {
      slug: "vietravel-crm",
      client: "Vietravel",
      title: "Enterprise CRM Implementation",
      role: "BA & Project Manager",
      period: "Sep 2025 – Present",
      team: "20+ (10 internal + vendor)",
      heroMetric: "500+ end users across Sales, Marketing, CS",
      problem:
        "Vietravel needed an enterprise-wide CRM to unify customer data, sales pipeline, and multi-channel engagement across three departments that previously worked from disconnected tools.",
      approach:
        "Led end-to-end requirements gathering across Sales, Marketing, and Customer Service; translated findings into functional specs and user stories shared by internal teams and the vendor. Designed the data-mapping and integration plan connecting CRM, the booking platform, and the Customer Data Platform (CDP). Ran weekly steering meetings with department heads to keep 20+ contributors aligned on scope and risk.",
      outcome:
        "Coordinated system integration and UAT planning for a rollout targeting 500+ end users; managed vendor collaboration on platform customization and risk mitigation through the project lifecycle.",
      aiNote:
        "Used Claude (Cowork, Code) and MCP tooling to draft BRDs, compare vendor proposals, generate test cases, and summarize meeting notes — cutting documentation turnaround time by an estimated 30-40%.",
      tags: ["CRM", "System Integration", "Vendor Management", "Travel & Tourism"],
      gradient: "linear-gradient(135deg, #4433ff 0%, #6c5cff 45%, #9b8fff 100%)",
      status: "live",
    },
    {
      slug: "astrazeneca-lms",
      client: "AstraZeneca Vietnam",
      title: "AI-Powered Learning Management System",
      role: "Acting Project Manager",
      period: "May 2025 – Sep 2025",
      team: "7 (1 PM/BA, 2 BE, 2 FE, 1 UI/UX, 1 QA)",
      heroMetric: "MVP in 10 weeks · 92% UAT satisfaction · 300+ employees",
      problem:
        "AstraZeneca Vietnam needed an internal LMS with personalized learning paths, certification workflows, real-time progress tracking, and AI-assisted learner support — on a tight timeline.",
      approach:
        "Drove requirements across HR, Product, Marketing, and Commex teams; integrated SSO and HR data sync so the LMS plugged directly into existing employee systems. Acted as Project Manager for the build, integrating an LLM-based learning chatbot and personalized learning paths into the MVP.",
      outcome:
        "Delivered the MVP in 10 weeks with 92% user satisfaction in UAT, rolled out to 300+ employees, and reduced support load through the AI chatbot's self-serve learner support.",
      tags: ["LMS", "AI Chatbot", "Pharma", "SSO Integration"],
      gradient: "linear-gradient(135deg, #14151a 0%, #2a2c38 55%, #4433ff 100%)",
      status: "shipped",
    },
    {
      slug: "kbank-lucky-draw",
      client: "KBank Vietnam",
      title: `Lucky Draw System — "KBank Thưởng Vàng"`,
      role: "Project Manager",
      period: "Sep 2024 – Jan 2025",
      team: "4 (1 PM/BA, 1 BE, 1 FE, 1 UI/UX)",
      heroMetric: "20M+ customer records handled",
      problem:
        "KBank Vietnam needed a transparent, auditable lucky-draw system for a gold reward campaign operating at national scale, with compliance constraints on how customer records were processed.",
      approach:
        "Aligned requirements directly with KBank stakeholders against campaign goals and compliance constraints. Owned the full project lifecycle — planning, team coordination, stakeholder communication — with a lean team of four.",
      outcome:
        "Shipped a transparent lucky-draw system handling 20M+ customer records on schedule, meeting both campaign and compliance requirements.",
      tags: ["Banking", "Compliance", "Data at Scale"],
      gradient: "linear-gradient(135deg, #b6ff3c 0%, #7ee0a8 55%, #4433ff 100%)",
      status: "shipped",
    },
  ],
  aiWorkflow: [
    { title: "BRD Drafting", detail: "First-pass business requirement docs from raw stakeholder notes." },
    { title: "Vendor Proposal Comparison", detail: "Structured side-by-side scoring across vendor submissions." },
    { title: "Test Case Generation", detail: "UAT test cases generated from functional specs before QA handoff." },
    { title: "Meeting Summarization", detail: "Steering-meeting notes turned into action items same-day." },
  ],
  experience: [
    {
      company: "Vietravel Tourism Joint Stock Company",
      logoKey: "vietravel",
      role: "BA & Project Manager",
      period: "Sep 2025 – Present",
      location: "Ho Chi Minh City, Vietnam",
      startYear: 2025,
      endYear: 2026,
      bullets: [
        "Led enterprise-wide CRM implementation, coordinating a cross-functional team of 20+ targeting 500+ end users",
        "Owned requirements-to-delivery pipeline: functional specs, user stories, system integration, UAT",
        "Cut BA documentation turnaround 30-40% using Claude + MCP tooling",
      ],
    },
    {
      company: "DR Digital",
      logoKey: "dr-digital",
      role: "BA & Project Manager",
      period: "Jul 2024 – Sep 2025",
      startYear: 2024,
      endYear: 2025,
      bullets: [
        "Led requirement gathering and solution design for AstraZeneca, Mobifone, De Heus Vietnam (LMS, AI-driven DMS)",
        "Acting PM on AstraZeneca's AI-powered LMS — MVP in 10 weeks, 92% UAT satisfaction",
        "Managed Agile sprints and JIRA workflows; delivered 100% of milestones on time",
      ],
    },
    {
      company: "Foolist Creative",
      logoKey: "foolist-creative",
      role: "Business Analyst",
      period: "Apr 2023 – Feb 2024",
      startYear: 2023,
      endYear: 2024,
      bullets: [
        "Analyzed and documented requirements for website and digital product engagements",
        "Independently built two Odoo ERP modules (HRM, CRM) from requirements through implementation",
        "Built customer personas and product roadmaps from market research",
      ],
    },
    {
      company: "FPT Information System Joint Stock Company",
      logoKey: "fpt-is",
      role: "Business Analyst",
      period: "Mar 2022 – Mar 2023",
      startYear: 2022,
      endYear: 2023,
      bullets: [
        "Documented HRM requirements for an enterprise system adopted by 8,000+ users",
        "Performed FIT/GAP analysis as client-development liaison — 100% requirement fulfillment accuracy",
        "Supported go-live with user training and post-deployment support",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Information Systems",
      institution: "University of Information Technology, VNU-HCM",
      period: "2024 – Present",
    },
    {
      degree: "Bachelor of Telecommunications",
      institution: "Posts and Telecommunications Institute of Technology",
      period: "2017 – 2022",
    },
  ],
  certifications: [
    { name: "Advanced Business Analyst & Product Owner", issuer: "TrueSkill Center" },
    { name: "English Proficiency B1 (VSTEP)", issuer: "Posts and Telecommunications Institute of Technology" },
  ],
  skills: [
    {
      category: "Business Analysis",
      items: ["Requirement Elicitation", "FIT/GAP Analysis", "BPMN 2.0 / UML", "Stakeholder Management", "UAT Facilitation"],
    },
    {
      category: "Project Management",
      items: ["Agile / Scrum", "Sprint Planning", "Risk & Budget Tracking", "Vendor Coordination", "Change Management"],
    },
    {
      category: "AI & Automation",
      items: ["Claude (Cowork, Code)", "Model Context Protocol (MCP)", "Prompt Engineering", "AI Chatbot Design", "LLM Evaluation"],
    },
    {
      category: "Documentation",
      items: ["BRD / SRS / URD", "Use Cases & User Stories", "Functional Specs", "Wireframes", "Test Cases"],
    },
    {
      category: "Technical",
      items: ["SQL Server", "REST API / JSON", "System Integration", "Data Mapping", "SDLC"],
    },
    {
      category: "Tools",
      items: ["JIRA", "Confluence", "Figma", "Balsamiq", "Draw.io"],
    },
  ],
};

const vi: Content = {
  meta: {
    title: "Khang Tran — Chuyên viên Phân tích Nghiệp vụ Cấp cao & Quản lý Dự án",
    description:
      "BA & Project Manager triển khai CRM/HRM/LMS với quy trình làm việc tăng tốc bằng AI. Case study: CRM Vietravel, AI-LMS AstraZeneca, Lucky Draw KBank.",
  },
  ui: {
    resume: "CV",
    navHome: "Trang chủ",
    navSkills: "Kỹ năng",
    navWork: "Dự án",
    navAi: "AI",
    navCareer: "Sự nghiệp",
    navContact: "Liên hệ",
    heroStatus: "Sẵn sàng nhận việc",
    heroRatingNote: "4+ năm · Vietravel, AstraZeneca, KBank",
    heroCtaPrimary: "Xem case study",
    heroCtaSecondary: "Liên hệ ngay",
    heroBasedInLabel: "Hiện đang ở",
    heroLinkedin: "LinkedIn",
    workedWithLabel: "Đã triển khai dự án doanh nghiệp cho",
    workSectionLabel: "Dự án nổi bật",
    workTitle: "Case studies",
    workSubtitle:
      "Ba dự án triển khai doanh nghiệp trải dài CRM, LMS và nền tảng chiến dịch — từ thu thập yêu cầu đến go-live.",
    caseStatusLive: "Đang chạy",
    caseStatusShipped: "Đã bàn giao",
    problemLabel: "Vấn đề",
    approachLabel: "Cách tiếp cận",
    outcomeLabel: "Kết quả",
    approachSectionTitle: "Cách tôi làm việc",
    approachSectionSubtitle: "Một quy trình BA/PM nhất quán áp dụng cho CRM, LMS và nền tảng chiến dịch.",
    differentiatorLabel: "Điểm khác biệt",
    differentiatorTitle: "Một quy trình BA tăng tốc bằng AI, không phải thử nghiệm nhất thời",
    differentiatorSubtitle:
      "Claude (Cowork, Code) và công cụ Model Context Protocol là một phần trong công việc BA hằng ngày — soạn thảo yêu cầu, so sánh nhà cung cấp, và biến cuộc họp thành hành động cụ thể. Ở dự án Vietravel hiện tại, việc này giúp rút ngắn thời gian làm tài liệu khoảng 30-40%.",
    careerLabel: "Sự nghiệp",
    careerTitle: "Hành trình sự nghiệp",
    careerSubtitle: "Chọn một năm để xem tôi đang phụ trách dự án nào vào thời điểm đó.",
    educationLabel: "Bằng cấp",
    educationTitle: "Học vấn & chứng chỉ",
    educationSubtitle: "Nền tảng đào tạo phía sau các dự án triển khai ở trên.",
    educationHeading: "Học vấn",
    certificationsHeading: "Chứng chỉ",
    toolkitLabel: "Bộ kỹ năng",
    toolkitTitle: "Kỹ năng & năng lực",
    contactLabel: "Cùng trao đổi",
    contactTitle: "Sẵn sàng cho vị trí Senior BA, PM, hoặc Product Owner",
    contactSubtitle: "Rất sẵn lòng trao đổi chi tiết hơn về bất kỳ case study nào ở trên.",
    footerBuiltWith: "Xây dựng với Next.js & Tailwind",
  },
  profile: {
    name: "Khang Tran",
    title: "Chuyên viên Phân tích Nghiệp vụ Cấp cao & Quản lý Dự án",
    location: "TP. Hồ Chí Minh, Việt Nam",
    email: "tranduykhang.forwork@gmail.com",
    phone: "+84 352 121 181",
    linkedinUrl: "https://linkedin.com/in/tdkhang278",
    exitStory:
      "4+ năm biến các yêu cầu doanh nghiệp còn mơ hồ (CRM, HRM, LMS, nền tảng AI) thành giải pháp đã triển khai thực tế cho các khách hàng như Vietravel, AstraZeneca, Mobifone và KBank — hiện đang dùng công cụ Claude/MCP để rút ngắn 30-40% thời gian làm tài liệu BA.",
  },
  heroTitleLead: "Tôi biến yêu cầu ngổn ngang thành",
  heroTitleHighlight: "hệ thống đã triển khai",
  workedWith: ["Vietravel", "AstraZeneca", "Mobifone", "De Heus Vietnam", "KBank Vietnam"],
  statHighlights: [
    { value: "4", suffix: "+", label: "Năm kinh nghiệm triển khai doanh nghiệp", sub: "CRM, HRM, LMS, nền tảng AI" },
    { value: "20", suffix: "M+", label: "Hồ sơ khách hàng đã xử lý", sub: "Chiến dịch quay số trúng thưởng quốc gia KBank, đúng tiến độ" },
    { value: "30", suffix: "–40%", label: "Rút ngắn thời gian làm tài liệu BA", sub: "Nhờ công cụ Claude + MCP trong các dự án thực tế" },
    { value: "100", suffix: "%", label: "Milestone hoàn thành đúng hạn", sub: "Xuyên suốt các dự án AstraZeneca và DR Digital" },
  ],
  process: [
    {
      step: "01",
      title: "Khảo sát & thu thập yêu cầu",
      detail:
        "Thu thập yêu cầu trực tiếp từ các bên liên quan; phân tích FIT/GAP để tách nhu cầu bắt buộc khỏi mong muốn tùy chọn.",
    },
    {
      step: "02",
      title: "Thiết kế giải pháp",
      detail:
        "Chuyển kết quả khảo sát thành BRD, user story và đặc tả chức năng để developer và nhà cung cấp có thể triển khai.",
    },
    {
      step: "03",
      title: "Triển khai Agile",
      detail:
        "Điều phối sprint planning, backlog grooming và làm việc với nhà cung cấp; luôn minh bạch rủi ro và ngân sách với các bên liên quan.",
    },
    {
      step: "04",
      title: "UAT & go-live",
      detail: "Điều phối buổi UAT, đào tạo người dùng, và hỗ trợ go-live đến khi hệ thống được áp dụng ổn định.",
    },
  ],
  caseStudies: [
    {
      slug: "vietravel-crm",
      client: "Vietravel",
      title: "Triển khai CRM Doanh nghiệp",
      role: "BA & Project Manager",
      period: "09/2025 – Hiện tại",
      team: "20+ (10 nội bộ + đối tác)",
      heroMetric: "500+ người dùng cuối tại Sales, Marketing, CS",
      problem:
        "Vietravel cần một hệ thống CRM toàn doanh nghiệp để hợp nhất dữ liệu khách hàng, pipeline bán hàng và tương tác đa kênh giữa ba phòng ban vốn đang làm việc trên các công cụ rời rạc.",
      approach:
        "Chủ trì thu thập yêu cầu toàn diện từ Sales, Marketing và Customer Service; chuyển kết quả thành đặc tả chức năng và user story dùng chung cho đội nội bộ và nhà cung cấp. Thiết kế kế hoạch ánh xạ dữ liệu và tích hợp giữa CRM, hệ thống đặt chỗ và Customer Data Platform (CDP). Điều phối họp steering hàng tuần với trưởng phòng ban để giữ 20+ thành viên đồng thuận về phạm vi và rủi ro.",
      outcome:
        "Điều phối tích hợp hệ thống và kế hoạch UAT cho đợt triển khai nhắm tới 500+ người dùng cuối; quản lý phối hợp với nhà cung cấp về tùy chỉnh nền tảng và giảm thiểu rủi ro xuyên suốt vòng đời dự án.",
      aiNote:
        "Dùng Claude (Cowork, Code) và công cụ MCP để soạn BRD, so sánh đề xuất nhà cung cấp, tạo test case, và tóm tắt biên bản họp — giúp rút ngắn thời gian làm tài liệu khoảng 30-40%.",
      tags: ["CRM", "Tích hợp hệ thống", "Quản lý nhà cung cấp", "Du lịch & Lữ hành"],
      gradient: "linear-gradient(135deg, #4433ff 0%, #6c5cff 45%, #9b8fff 100%)",
      status: "live",
    },
    {
      slug: "astrazeneca-lms",
      client: "AstraZeneca Việt Nam",
      title: "Hệ thống Quản lý Học tập tích hợp AI",
      role: "Acting Project Manager",
      period: "05/2025 – 09/2025",
      team: "7 (1 PM/BA, 2 BE, 2 FE, 1 UI/UX, 1 QA)",
      heroMetric: "MVP trong 10 tuần · 92% hài lòng UAT · 300+ nhân viên",
      problem:
        "AstraZeneca Việt Nam cần một LMS nội bộ với lộ trình học cá nhân hóa, quy trình cấp chứng chỉ, theo dõi tiến độ theo thời gian thực, và hỗ trợ học viên bằng AI — trong một khung thời gian gấp rút.",
      approach:
        "Chủ trì thu thập yêu cầu từ các phòng HR, Product, Marketing và Commex; tích hợp SSO và đồng bộ dữ liệu HR để LMS kết nối trực tiếp với hệ thống nhân sự hiện có. Đảm nhận vai trò Project Manager cho quá trình xây dựng, tích hợp chatbot học tập dựa trên LLM và lộ trình học cá nhân hóa vào MVP.",
      outcome:
        "Bàn giao MVP trong 10 tuần với 92% mức độ hài lòng trong UAT, triển khai cho 300+ nhân viên, và giảm tải hỗ trợ nhờ chatbot AI phục vụ học viên tự tra cứu.",
      tags: ["LMS", "AI Chatbot", "Dược phẩm", "Tích hợp SSO"],
      gradient: "linear-gradient(135deg, #14151a 0%, #2a2c38 55%, #4433ff 100%)",
      status: "shipped",
    },
    {
      slug: "kbank-lucky-draw",
      client: "KBank Việt Nam",
      title: `Hệ thống Quay số trúng thưởng — "KBank Thưởng Vàng"`,
      role: "Project Manager",
      period: "09/2024 – 01/2025",
      team: "4 (1 PM/BA, 1 BE, 1 FE, 1 UI/UX)",
      heroMetric: "20M+ hồ sơ khách hàng được xử lý",
      problem:
        "KBank Việt Nam cần một hệ thống quay số trúng thưởng minh bạch, có thể kiểm chứng cho chương trình tri ân bằng vàng vận hành ở quy mô toàn quốc, với ràng buộc tuân thủ về cách xử lý hồ sơ khách hàng.",
      approach:
        "Làm việc trực tiếp với các bên liên quan của KBank để thống nhất yêu cầu theo mục tiêu chiến dịch và ràng buộc tuân thủ. Đảm nhận toàn bộ vòng đời dự án — lập kế hoạch, điều phối đội nhóm, giao tiếp với các bên liên quan — với một đội gọn nhẹ gồm bốn người.",
      outcome:
        "Triển khai thành công hệ thống quay số trúng thưởng minh bạch, xử lý 20M+ hồ sơ khách hàng đúng tiến độ, đáp ứng cả yêu cầu chiến dịch lẫn tuân thủ.",
      tags: ["Ngân hàng", "Tuân thủ", "Dữ liệu quy mô lớn"],
      gradient: "linear-gradient(135deg, #b6ff3c 0%, #7ee0a8 55%, #4433ff 100%)",
      status: "shipped",
    },
  ],
  aiWorkflow: [
    { title: "Soạn BRD", detail: "Bản nháp đầu tiên của tài liệu yêu cầu nghiệp vụ từ ghi chú thô của các bên liên quan." },
    { title: "So sánh đề xuất nhà cung cấp", detail: "Chấm điểm so sánh có cấu trúc giữa các đề xuất nhà cung cấp." },
    { title: "Tạo Test Case", detail: "Test case UAT được tạo từ đặc tả chức năng trước khi bàn giao cho QA." },
    { title: "Tóm tắt cuộc họp", detail: "Biên bản họp steering được chuyển thành hành động cụ thể ngay trong ngày." },
  ],
  experience: [
    {
      company: "Công ty Cổ phần Du lịch Vietravel",
      logoKey: "vietravel",
      role: "BA & Project Manager",
      period: "09/2025 – Hiện tại",
      location: "TP. Hồ Chí Minh, Việt Nam",
      startYear: 2025,
      endYear: 2026,
      bullets: [
        "Chủ trì triển khai CRM toàn doanh nghiệp, điều phối đội liên chức năng 20+ người nhắm tới 500+ người dùng cuối",
        "Phụ trách toàn bộ chuỗi từ yêu cầu đến triển khai: đặc tả chức năng, user story, tích hợp hệ thống, UAT",
        "Rút ngắn 30-40% thời gian làm tài liệu BA nhờ công cụ Claude + MCP",
      ],
    },
    {
      company: "DR Digital",
      logoKey: "dr-digital",
      role: "BA & Project Manager",
      period: "07/2024 – 09/2025",
      startYear: 2024,
      endYear: 2025,
      bullets: [
        "Chủ trì thu thập yêu cầu và thiết kế giải pháp cho AstraZeneca, Mobifone, De Heus Việt Nam (LMS, DMS tích hợp AI)",
        "Acting PM cho LMS tích hợp AI của AstraZeneca — MVP trong 10 tuần, 92% hài lòng UAT",
        "Quản lý sprint Agile và quy trình JIRA; hoàn thành 100% milestone đúng hạn",
      ],
    },
    {
      company: "Foolist Creative",
      logoKey: "foolist-creative",
      role: "Business Analyst",
      period: "04/2023 – 02/2024",
      startYear: 2023,
      endYear: 2024,
      bullets: [
        "Phân tích và tài liệu hóa yêu cầu cho các dự án website và sản phẩm số",
        "Tự xây dựng hai module Odoo ERP (HRM, CRM) từ yêu cầu đến triển khai",
        "Xây dựng chân dung khách hàng và lộ trình sản phẩm từ nghiên cứu thị trường",
      ],
    },
    {
      company: "Công ty Cổ phần Hệ thống Thông tin FPT",
      logoKey: "fpt-is",
      role: "Business Analyst",
      period: "03/2022 – 03/2023",
      startYear: 2022,
      endYear: 2023,
      bullets: [
        "Tài liệu hóa yêu cầu HRM cho hệ thống doanh nghiệp có 8.000+ người dùng",
        "Thực hiện phân tích FIT/GAP với vai trò cầu nối giữa khách hàng và đội phát triển — độ chính xác đáp ứng yêu cầu đạt 100%",
        "Hỗ trợ go-live với đào tạo người dùng và hỗ trợ sau triển khai",
      ],
    },
  ],
  education: [
    {
      degree: "Thạc sĩ Hệ thống Thông tin",
      institution: "Trường Đại học Công nghệ Thông tin, ĐHQG-HCM",
      period: "2024 – Hiện tại",
    },
    {
      degree: "Cử nhân Viễn thông",
      institution: "Học viện Công nghệ Bưu chính Viễn thông",
      period: "2017 – 2022",
    },
  ],
  certifications: [
    { name: "Advanced Business Analyst & Product Owner", issuer: "TrueSkill Center" },
    { name: "Chứng chỉ Tiếng Anh B1 (VSTEP)", issuer: "Học viện Công nghệ Bưu chính Viễn thông" },
  ],
  skills: [
    {
      category: "Phân tích Nghiệp vụ",
      items: ["Thu thập yêu cầu", "Phân tích FIT/GAP", "BPMN 2.0 / UML", "Quản lý bên liên quan", "Điều phối UAT"],
    },
    {
      category: "Quản lý Dự án",
      items: ["Agile / Scrum", "Lập kế hoạch Sprint", "Theo dõi rủi ro & ngân sách", "Điều phối nhà cung cấp", "Quản lý thay đổi"],
    },
    {
      category: "AI & Tự động hóa",
      items: ["Claude (Cowork, Code)", "Model Context Protocol (MCP)", "Prompt Engineering", "Thiết kế AI Chatbot", "Đánh giá LLM"],
    },
    {
      category: "Tài liệu",
      items: ["BRD / SRS / URD", "Use Case & User Story", "Đặc tả chức năng", "Wireframe", "Test Case"],
    },
    {
      category: "Kỹ thuật",
      items: ["SQL Server", "REST API / JSON", "Tích hợp hệ thống", "Ánh xạ dữ liệu", "SDLC"],
    },
    {
      category: "Công cụ",
      items: ["JIRA", "Confluence", "Figma", "Balsamiq", "Draw.io"],
    },
  ],
};

export const content: Record<Locale, Content> = { en, vi };

// Year range is a fact, not a translated string — identical across locales,
// exposed separately so consumers don't need to recompute it on locale switch.
export const experienceYears: number[] = (() => {
  const min = Math.min(...en.experience.map((e) => e.startYear));
  const max = Math.max(...en.experience.map((e) => e.endYear));
  const list: number[] = [];
  for (let y = max; y >= min; y--) list.push(y);
  return list;
})();
