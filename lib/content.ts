// Sourced from the CV (Khang-Tran-Business-Analyst-CV.pdf). English is the
// reformulated base; Vietnamese is a direct translation of the same facts.
// The agent workflow describes how Khang's AI agent team supports each
// delivery phase; every "evidence" line is a fact taken from the CV.

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
// `suffix` is rendered after the count-up animation settles (e.g. "+", "%",
// "M+") — kept separate from `value` so the number itself can animate from 0.
export type StatHighlight = { value: string; suffix: string; label: string; sub: string };

export type AgentId = "po" | "ba" | "pm" | "designer" | "dev" | "qa";
export type AgentContent = { id: AgentId; name: string; focus: string };
export type WorkflowPhase = {
  id: string;
  title: string;
  owner: string;
  agents: AgentId[];
  input: string;
  runs: { agent: AgentId; text: string }[];
  outputs: string[];
  gate: string;
  evidence: string;
  // Optional real screenshot, served from public/workflows/ (e.g.
  // "/workflows/analyze.png"). Rendered under the phase when present.
  image?: string;
};

// Version 2 of the agent showcase: one agent team per role (PO / BA / PM),
// drawn as a node graph — trigger → lead agent → specialist sub-agents →
// tools → output → human approval.
export type TeamRoleId = "po" | "ba" | "pm";
// "tracker" = JIRA / ClickUp as one node: in the PM flow they play the same
// role (task tracking), so the graph shows them as interchangeable.
export type TeamToolId = "jira" | "confluence" | "clickup" | "tracker" | "figma" | "drawio";
export type RoleTeam = {
  id: TeamRoleId;
  label: string;
  summary: string;
  trigger: string;
  lead: string;
  agents: { name: string; detail: string; tool: TeamToolId }[];
  tools: TeamToolId[];
  output: string;
  approval: string;
};

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
    differentiatorLabel: string;
    differentiatorTitle: string;
    differentiatorSubtitle: string;
    agentHuman: string;
    agentOrchestrator: string;
    agentOwner: string;
    agentInput: string;
    agentRuns: string;
    agentOutputs: string;
    agentGate: string;
    agentEvidence: string;
    agentPlay: string;
    agentPause: string;
    agentViewRoles: string;
    agentViewLifecycle: string;
    teamTrigger: string;
    teamLead: string;
    teamOutput: string;
    teamApproval: string;
    teamRunning: string;
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
    domainsLabel: string;
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
  // Decorative "design canvas" around the hero headline: collaborator cursors
  // (role labels) that roam like Figma multiplayer and each post one cursor
  // chat (`chats[i]` belongs to `cursors[i]`), plus two chat bubbles showing
  // the AI agents at work.
  hero: {
    cursors: string[];
    chats: string[];
    bubbles: { time: string; text: string }[];
  };
  workedWith: string[];
  statHighlights: StatHighlight[];
  caseStudies: CaseStudyContent[];
  agentWorkflow: { agents: AgentContent[]; phases: WorkflowPhase[] };
  agentTeams: RoleTeam[];
  experience: ExperienceContent[];
  education: EducationContent[];
  certifications: CertificationContent[];
  skills: SkillGroupContent[];
  domains: string[];
};

const en: Content = {
  meta: {
    title: "Khang Tran — AI-Native Business Analyst & Product Owner",
    description:
      "Business Analyst & Project Manager with 4+ years of full-cycle delivery across CRM, ERP, HRM, LMS and AI-powered platforms — working with an AI agent team orchestrated by Claude Code.",
  },
  ui: {
    resume: "Resume",
    navHome: "Home",
    navSkills: "Skills",
    navWork: "Work",
    navAi: "AI agents",
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
    differentiatorLabel: "AI agent team",
    differentiatorTitle: "One BA/PM, six AI agents, the full delivery lifecycle",
    differentiatorSubtitle:
      "I orchestrate specialised agents with Claude Code across discovery, analysis, design, delivery, testing and go-live. Agents draft, analyse and keep JIRA / ClickUp in sync — every phase ends with a human checkpoint where I make the call.",
    agentHuman: "Khang — BA · PM · PO",
    agentOrchestrator: "Claude Code · orchestrator",
    agentOwner: "Led by",
    agentInput: "Input",
    agentRuns: "Agents at work",
    agentOutputs: "Artifacts",
    agentGate: "Human checkpoint",
    agentEvidence: "From my projects",
    agentPlay: "Auto-play",
    agentPause: "Pause",
    agentViewRoles: "Team by role",
    agentViewLifecycle: "Full lifecycle",
    teamTrigger: "Trigger",
    teamLead: "Lead agent · Claude Code",
    teamOutput: "Output",
    teamApproval: "Human approval",
    teamRunning: "Running",
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
    domainsLabel: "Domains",
    contactLabel: "Let's talk",
    contactTitle: "Open to Business Analyst, Project Manager & Product Owner roles",
    contactSubtitle: "Happy to walk through any of the case studies or the agent workflow in more detail.",
    footerBuiltWith: "Built with Next.js & Tailwind",
  },
  profile: {
    name: "Khang Tran",
    title: "AI-Native Business Analyst · Product Owner",
    location: "Ho Chi Minh City, Vietnam",
    email: "tranduykhang.forwork@gmail.com",
    phone: "+84 352 121 181",
    linkedinUrl: "https://linkedin.com/in/tdkhang278",
    exitStory:
      "4+ years of full-cycle software delivery across CRM, ERP, HRM, LMS and AI-powered platforms — from requirement elicitation and FIT/GAP to UAT and go-live for AstraZeneca, Mobifone, De Heus Vietnam and Vietravel. I run Claude Code daily to automate documentation and task tracking.",
  },
  hero: {
    cursors: ["Stakeholder", "Developer", "UX Designer", "QA Lead", "Vendor", "Sponsor"],
    chats: [
      "Can we sync booking data into the CRM?",
      "API contract looks good",
      "Flow updated in Figma",
      "UAT cases ready for review",
      "Estimate for the CR is ready",
      "Approved — let's go",
    ],
    bubbles: [
      {
        time: "just now",
        text: "BA Agent drafted the BRD and user stories — I reviewed and signed off.",
      },
      {
        time: "just now",
        text: "PM Agent synced new tasks to JIRA and ClickUp from Claude Code.",
      },
    ],
  },
  workedWith: ["Vietravel", "AstraZeneca", "Mobifone", "De Heus Vietnam", "KBank Vietnam"],
  statHighlights: [
    { value: "4", suffix: "+", label: "Years of full-cycle delivery", sub: "CRM, ERP, HRM, LMS, AI platforms" },
    { value: "20", suffix: "M+", label: "Customer records handled", sub: "KBank Thưởng Vàng campaign, on schedule" },
    { value: "8", suffix: ",000+", label: "Users on the HRM system I documented", sub: "Requirements for 3 major projects at FPT IS" },
    { value: "100", suffix: "%", label: "Milestones delivered on time", sub: "Agile delivery at DR Digital" },
  ],
  caseStudies: [
    {
      slug: "vietravel-crm",
      client: "Vietravel",
      title: "Enterprise CRM Implementation",
      role: "BA & Project Manager",
      period: "Sep 2025 – Present",
      team: "20+ (10 internal + vendor)",
      heroMetric: "500+ target users across multiple departments",
      problem:
        "Vietravel needed an enterprise-wide CRM to unify customer data, sales pipeline, and multi-channel engagement across three departments that previously worked from disconnected tools.",
      approach:
        "Led end-to-end requirements gathering across Sales, Marketing, and Customer Service and translated findings into functional specs and user stories shared by internal teams and the vendor. Designed the data-mapping and integration plan connecting CRM, the booking platform, and the Customer Data Platform (CDP), and worked with the vendor on solution design, customization, UAT planning, and change management.",
      outcome:
        "Running sprint execution, risk management, and stakeholder reporting for a 20+ person team, and tracking progress toward go-live for 500+ users across multiple business units.",
      aiNote:
        "Adopted Claude Code (CLI) to automate day-to-day BA/PM work: syncing task creation and tracking with JIRA/ClickUp and drafting BRD, SRS, user stories, and stakeholder slides.",
      tags: ["CRM", "Booking Integration", "CDP", "Data Mapping", "UAT"],
      gradient: "linear-gradient(135deg, #0859D4 0%, #0693E3 100%)",
      status: "live",
    },
    {
      slug: "astrazeneca-lms",
      client: "AstraZeneca Vietnam",
      title: "AI-Powered Learning Management System",
      role: "Acting Project Manager · DR Digital",
      period: "May 2025 – Sep 2025",
      team: "7 (1 PM/BA, 2 BE, 2 FE, 1 UI/UX, 1 QA)",
      heroMetric: "MVP in 10 weeks · 92% UAT satisfaction · 300+ employees",
      problem:
        "AstraZeneca Vietnam needed an internal LMS for training, compliance, and onboarding — with personalized learning paths, certification workflows, progress tracking, and AI-assisted learner support — on a tight timeline.",
      approach:
        "Drove requirements across HR, Product, Marketing, and Commex teams; integrated SSO and HR data sync so the LMS plugged directly into existing employee systems. Ran the build as Project Manager with JIRA, Confluence, and Figma, adding an AI chatbot and personalized learning paths to the MVP.",
      outcome:
        "Delivered the MVP in 10 weeks, rolled out to 300+ employees, reached 92% user satisfaction in UAT, and reduced support load through the AI chatbot.",
      tags: ["LMS", "AI Chatbot", "SSO & HR Data Sync", "Pharma"],
      gradient: "linear-gradient(135deg, #1D1D1F 0%, #2B2E3A 55%, #0859D4 100%)",
      status: "shipped",
    },
    {
      slug: "kbank-lucky-draw",
      client: "KBank Vietnam",
      title: `Lucky Draw System — "KBank Thưởng Vàng"`,
      role: "Project Manager · Bliss Digital",
      period: "Sep 2024 – Jan 2025",
      team: "4 (1 PM/BA, 1 BE, 1 FE, 1 UI/UX)",
      heroMetric: "20M+ customer records handled",
      problem:
        "KBank Vietnam needed a transparent, auditable lucky-draw system for a gold reward campaign operating at national scale, with compliance constraints on how customer records were processed.",
      approach:
        "Aligned requirements directly with KBank stakeholders against campaign goals and compliance requirements. Owned the full project lifecycle — planning, team coordination, stakeholder communication — with a lean team of four.",
      outcome:
        "Delivered a transparent lucky-draw system handling 20M+ customer records, meeting both campaign and compliance requirements.",
      tags: ["Banking / B2C", "Compliance", "Stakeholder Management"],
      gradient: "linear-gradient(135deg, #00D084 0%, #0693E3 55%, #0859D4 100%)",
      status: "shipped",
    },
  ],
  agentWorkflow: {
    agents: [
      { id: "po", name: "PO Agent", focus: "Vision, roadmap, backlog priority" },
      { id: "ba", name: "BA Agent", focus: "Elicitation, BRD / SRS, user stories" },
      { id: "pm", name: "PM Agent", focus: "Plans, JIRA / ClickUp sync, status & risk" },
      { id: "designer", name: "Designer Agent", focus: "Flows, wireframes, mockups" },
      { id: "dev", name: "Dev Agent", focus: "API contracts, technical clarifications" },
      { id: "qa", name: "QA Agent", focus: "Test cases, UAT scripts, defect triage" },
    ],
    phases: [
      {
        id: "discover",
        title: "Discovery & vision",
        owner: "PO · BA",
        agents: ["po", "ba"],
        input: "Stakeholder interviews, meeting recordings, current process documents",
        runs: [
          { agent: "ba", text: "Turns workshops into structured meeting minutes and open questions" },
          { agent: "ba", text: "Clusters raw needs by department and business process" },
          { agent: "po", text: "Drafts the product vision, scope and success criteria" },
        ],
        outputs: ["Meeting minutes", "Stakeholder map", "Vision & scope"],
        gate: "I validate scope and priorities with the business owners",
        evidence: "Vietravel CRM — requirements gathered across Sales, Marketing and Customer Service",
      },
      {
        id: "analyze",
        title: "Requirements & analysis",
        owner: "BA",
        agents: ["ba", "po"],
        input: "Validated scope, current-state processes, system constraints",
        runs: [
          { agent: "ba", text: "Runs FIT/GAP against the target platform and flags the gaps" },
          { agent: "ba", text: "Drafts BRD, SRS and user stories with acceptance criteria" },
          { agent: "po", text: "Ranks the backlog by business value and dependency" },
        ],
        outputs: ["FIT/GAP matrix", "BRD / SRS", "User stories + AC"],
        gate: "I review every requirement before stakeholder sign-off",
        evidence: "FPT IS — FIT/GAP analysis with 100% requirement fulfillment accuracy",
      },
      {
        id: "design",
        title: "Solution design",
        owner: "BA · Designer",
        agents: ["ba", "designer", "dev"],
        input: "Signed-off BRD, user stories, integration landscape",
        runs: [
          { agent: "ba", text: "Models to-be processes in BPMN and maps data across systems" },
          { agent: "designer", text: "Turns user stories into flows, wireframes and mockups" },
          { agent: "dev", text: "Checks feasibility and drafts API / JSON contracts" },
        ],
        outputs: ["BPMN flows", "Wireframes", "Data mapping & API spec"],
        gate: "Design review with the vendor and the dev team",
        evidence: "Vietravel — integration plan connecting CRM, the Booking platform and CDP",
      },
      {
        id: "plan",
        title: "Planning & tracking",
        owner: "PM",
        agents: ["pm", "po"],
        input: "Prioritised backlog, team capacity, vendor timeline",
        runs: [
          { agent: "pm", text: "Breaks stories into tasks and syncs them to JIRA / ClickUp" },
          { agent: "pm", text: "Builds the sprint plan and a risk register with owners" },
          { agent: "pm", text: "Generates the weekly status report and stakeholder slides" },
        ],
        outputs: ["JIRA / ClickUp tasks", "Sprint plan", "Weekly report & slides"],
        gate: "I approve the sprint plan and every change request",
        evidence: "DR Digital — Agile delivery with 100% of milestones on time",
      },
      {
        id: "build",
        title: "Build & change control",
        owner: "PM · BA",
        agents: ["dev", "ba", "pm"],
        input: "Sprint backlog, design specs, vendor questions",
        runs: [
          { agent: "dev", text: "Answers spec questions with references back to the SRS" },
          { agent: "ba", text: "Assesses each change request against scope and requirements" },
          { agent: "pm", text: "Updates the timeline, budget and risk impact of the change" },
        ],
        outputs: ["Clarification log", "Change impact assessment", "Updated plan"],
        gate: "Scope changes need stakeholder approval",
        evidence: "Vietravel — vendor collaboration on customization and change management",
      },
      {
        id: "test",
        title: "Testing & UAT",
        owner: "BA · QA",
        agents: ["qa", "ba"],
        input: "Acceptance criteria, build release notes",
        runs: [
          { agent: "qa", text: "Generates test cases and UAT scripts from acceptance criteria" },
          { agent: "qa", text: "Triages defects by severity and traces them to stories" },
          { agent: "ba", text: "Summarises UAT feedback into fixes and enhancements" },
        ],
        outputs: ["Test cases", "UAT scripts", "Defect report"],
        gate: "Business users run UAT and give sign-off",
        evidence: "AstraZeneca LMS — 92% user satisfaction in UAT",
      },
      {
        id: "launch",
        title: "Go-live & adoption",
        owner: "PM · PO",
        agents: ["pm", "po", "qa"],
        input: "UAT sign-off, cut-over plan, training needs",
        runs: [
          { agent: "pm", text: "Runs the go-live readiness checklist across teams" },
          { agent: "po", text: "Writes release notes and training material" },
          { agent: "qa", text: "Prepares the smoke-test checklist and tracks post-release issues" },
        ],
        outputs: ["Go-live checklist", "Training deck", "Release notes"],
        gate: "Go / no-go decision with the business owner",
        evidence: "FPT IS — go-live and training for an HRM system used by 8,000+ people",
      },
    ],
  },
  agentTeams: [
    {
      id: "po",
      label: "Product Owner",
      summary: "Turns business goals and feedback into a prioritised roadmap and backlog.",
      trigger: "Business goals & stakeholder feedback",
      lead: "PO Lead Agent",
      agents: [
        { name: "Research Agent", detail: "Market research, customer personas and competitor notes", tool: "confluence" },
        { name: "Vision Agent", detail: "Product vision, scope and success criteria", tool: "confluence" },
        { name: "Backlog Agent", detail: "Epics broken into user stories, ranked by business value", tool: "jira" },
        { name: "Roadmap Agent", detail: "Release roadmap and release notes", tool: "jira" },
      ],
      tools: ["confluence", "jira"],
      output: "Roadmap & prioritised backlog",
      approval: "I align priorities with stakeholders",
    },
    {
      id: "ba",
      label: "Business Analyst",
      summary: "Turns workshops and process documents into specs teams can build from.",
      trigger: "Workshops & meeting recordings",
      lead: "BA Lead Agent",
      agents: [
        { name: "Elicitation Agent", detail: "Meeting minutes, requirement candidates and open questions", tool: "confluence" },
        { name: "FIT/GAP Agent", detail: "Compares requirements with the target platform", tool: "confluence" },
        { name: "Spec Writer Agent", detail: "BRD, SRS and URD drafts", tool: "confluence" },
        { name: "Story Agent", detail: "User stories with acceptance criteria", tool: "jira" },
        { name: "Modeling Agent", detail: "BPMN flows, wireframes and data mapping", tool: "drawio" },
      ],
      tools: ["confluence", "jira", "drawio"],
      output: "BRD / SRS / user stories",
      approval: "I review every requirement before sign-off",
    },
    {
      id: "pm",
      label: "Project Manager",
      summary: "Keeps the plan, risks and stakeholders in sync every week.",
      trigger: "Backlog, meetings & vendor updates",
      lead: "PM Lead Agent",
      agents: [
        { name: "Minutes Agent", detail: "Meeting minutes with action items and owners", tool: "tracker" },
        { name: "Task Sync Agent", detail: "Creates and tracks tasks in JIRA / ClickUp", tool: "tracker" },
        { name: "Status Report Agent", detail: "Weekly project report and stakeholder slides", tool: "tracker" },
        { name: "Risk Agent", detail: "Risk assessment and risk register updates", tool: "tracker" },
        { name: "Change Request Agent", detail: "Scope, timeline and budget impact of each change", tool: "tracker" },
        { name: "Go-live Agent", detail: "Go-live readiness checklist across teams", tool: "tracker" },
      ],
      tools: ["tracker"],
      output: "Reports, risk & CR log, go-live checklist",
      approval: "I approve plans, change requests and go / no-go",
    },
  ],
  experience: [
    {
      company: "Vietravel Tourism Joint Stock Company",
      logoKey: "vietravel",
      role: "Business Analyst & Project Manager",
      period: "Sep 2025 – Present",
      location: "Ho Chi Minh City, Vietnam",
      startYear: 2025,
      endYear: 2026,
      bullets: [
        "Led the enterprise-wide CRM implementation, coordinating a cross-functional team of 20+ members (10 internal + vendor team).",
        "Ran end-to-end requirements gathering with Sales, Marketing and Customer Service, translated into functional specifications and user stories.",
        "Managed integration between CRM, the Booking platform and CDP for consistent data flow and process alignment.",
        "Oversaw planning, sprint execution, risk management and stakeholder reporting for 500+ target users across departments.",
        "Worked with the vendor on solution design, customization, UAT planning and change management to reduce deployment risk.",
        "Adopted Claude Code (CLI) to automate BA/PM work: syncing tasks with JIRA/ClickUp and drafting BRD, SRS, user stories and stakeholder slides.",
      ],
    },
    {
      company: "DR Digital",
      logoKey: "dr-digital",
      role: "Business Analyst & Project Manager",
      period: "Jul 2024 – Sep 2025",
      startYear: 2024,
      endYear: 2025,
      bullets: [
        "Led requirement gathering and solution design for AstraZeneca, Mobifone and De Heus Vietnam across LMS and AI-driven DMS platforms.",
        "Translated complex business needs into URD, user stories and wireframes in Confluence and Figma, aligning developers and stakeholders.",
        "Managed Agile sprints, backlog grooming and JIRA workflows; monitored budget and scope to deliver 100% of milestones on time.",
        "Facilitated UAT workshops, demos and user training, iterating on features from feedback to improve post-release adoption.",
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
        "Analyzed and documented customer requirements for website and digital product projects, ensuring on-time delivery.",
        "Ran R&D for Odoo ERP, independently developing two functional modules (HRM, CRM) from requirements through implementation.",
        "Conducted market research and built customer personas and business roadmap artifacts to support product strategy.",
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
        "Documented HRM requirements for a large-scale enterprise system adopted by 8,000+ users across multiple departments.",
        "Produced URD, Blueprint and Feature List documentation across 3 major projects as the primary reference for developers.",
        "Performed FIT/GAP analysis as client–development liaison, achieving 100% requirement fulfillment accuracy.",
        "Supported go-live through user training, client presentations and post-deployment support.",
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
      items: [
        "Requirement Elicitation",
        "FIT/GAP Analysis",
        "Solution Design",
        "BRD / SRS / URD",
        "Use Cases & User Stories",
        "Functional & Non-functional Specs",
      ],
    },
    {
      category: "Modeling & Design",
      items: ["BPMN 2.0", "UML", "Activity / Process Flows", "Wireframes", "Mockups"],
    },
    {
      category: "Project Delivery",
      items: [
        "Agile / Scrum",
        "Sprint Planning",
        "Backlog Grooming",
        "UAT",
        "Vendor Coordination",
        "Budget & Risk Management",
        "Stakeholder Management",
      ],
    },
    {
      category: "Technical",
      items: ["SQL Server", "API / JSON", "API Testing (Postman)", "Application Testing", "SDLC", "System Integration"],
    },
    {
      category: "Tools",
      items: ["JIRA", "Confluence", "ClickUp", "Trello", "Figma", "Balsamiq", "Draw.io"],
    },
    {
      category: "AI Tools",
      items: ["Claude Code (CLI)", "AI-assisted BRD / SRS / User Story drafting", "JIRA / ClickUp task automation"],
    },
  ],
  domains: ["CRM", "ERP (Odoo)", "HRM", "LMS", "SaaS", "Travel & Tourism"],
};

const vi: Content = {
  meta: {
    title: "Khang Tran — AI-Native Business Analyst & Product Owner",
    description:
      "Business Analyst & Project Manager với 4+ năm triển khai trọn vòng đời trên các nền tảng CRM, ERP, HRM, LMS và AI — làm việc cùng một đội AI agent điều phối bởi Claude Code.",
  },
  ui: {
    resume: "CV",
    navHome: "Trang chủ",
    navSkills: "Kỹ năng",
    navWork: "Dự án",
    navAi: "AI agent",
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
    differentiatorLabel: "Đội AI agent",
    differentiatorTitle: "Một BA/PM, sáu AI agent, trọn vòng đời triển khai",
    differentiatorSubtitle:
      "Tôi điều phối các agent chuyên trách bằng Claude Code xuyên suốt khảo sát, phân tích, thiết kế, triển khai, kiểm thử và go-live. Agent soạn thảo, phân tích và giữ JIRA / ClickUp luôn đồng bộ — mỗi giai đoạn đều kết thúc bằng một điểm duyệt do tôi quyết định.",
    agentHuman: "Khang — BA · PM · PO",
    agentOrchestrator: "Claude Code · điều phối",
    agentOwner: "Phụ trách",
    agentInput: "Đầu vào",
    agentRuns: "Agent đang làm",
    agentOutputs: "Sản phẩm bàn giao",
    agentGate: "Điểm duyệt của tôi",
    agentEvidence: "Từ dự án thực tế",
    agentPlay: "Tự chạy",
    agentPause: "Tạm dừng",
    agentViewRoles: "Đội theo vai trò",
    agentViewLifecycle: "Trọn vòng đời",
    teamTrigger: "Kích hoạt",
    teamLead: "Agent chính · Claude Code",
    teamOutput: "Đầu ra",
    teamApproval: "Tôi phê duyệt",
    teamRunning: "Đang chạy",
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
    domainsLabel: "Lĩnh vực",
    contactLabel: "Cùng trao đổi",
    contactTitle: "Sẵn sàng cho vị trí Business Analyst, Project Manager & Product Owner",
    contactSubtitle: "Rất sẵn lòng trao đổi chi tiết hơn về các case study hoặc workflow AI agent ở trên.",
    footerBuiltWith: "Xây dựng với Next.js & Tailwind",
  },
  profile: {
    name: "Khang Tran",
    title: "AI-Native Business Analyst · Product Owner",
    location: "TP. Hồ Chí Minh, Việt Nam",
    email: "tranduykhang.forwork@gmail.com",
    phone: "+84 352 121 181",
    linkedinUrl: "https://linkedin.com/in/tdkhang278",
    exitStory:
      "4+ năm triển khai phần mềm trọn vòng đời trên các nền tảng CRM, ERP, HRM, LMS và AI — từ thu thập yêu cầu, phân tích FIT/GAP đến UAT và go-live cho AstraZeneca, Mobifone, De Heus Việt Nam và Vietravel. Tôi dùng Claude Code hằng ngày để tự động hóa tài liệu và theo dõi công việc.",
  },
  hero: {
    cursors: ["Stakeholder", "Developer", "UX Designer", "QA Lead", "Nhà cung cấp", "Nhà tài trợ"],
    chats: [
      "Đồng bộ dữ liệu booking vào CRM được không?",
      "Hợp đồng API ổn rồi nhé",
      "Đã cập nhật flow trên Figma",
      "Test case UAT sẵn sàng để review",
      "Đã có estimate cho CR",
      "Duyệt — triển khai thôi",
    ],
    bubbles: [
      {
        time: "vừa xong",
        text: "BA Agent soạn BRD và user story — tôi rà soát và phê duyệt.",
      },
      {
        time: "vừa xong",
        text: "PM Agent đồng bộ task mới sang JIRA và ClickUp từ Claude Code.",
      },
    ],
  },
  workedWith: ["Vietravel", "AstraZeneca", "Mobifone", "De Heus Vietnam", "KBank Vietnam"],
  statHighlights: [
    { value: "4", suffix: "+", label: "Năm triển khai trọn vòng đời", sub: "CRM, ERP, HRM, LMS, nền tảng AI" },
    { value: "20", suffix: "M+", label: "Hồ sơ khách hàng được xử lý", sub: "Chiến dịch KBank Thưởng Vàng, đúng tiến độ" },
    { value: "8", suffix: ".000+", label: "Người dùng hệ thống HRM tôi phụ trách tài liệu", sub: "Tài liệu yêu cầu cho 3 dự án lớn tại FPT IS" },
    { value: "100", suffix: "%", label: "Milestone hoàn thành đúng hạn", sub: "Triển khai Agile tại DR Digital" },
  ],
  caseStudies: [
    {
      slug: "vietravel-crm",
      client: "Vietravel",
      title: "Triển khai CRM Doanh nghiệp",
      role: "BA & Project Manager",
      period: "09/2025 – Hiện tại",
      team: "20+ (10 nội bộ + đối tác)",
      heroMetric: "500+ người dùng mục tiêu ở nhiều phòng ban",
      problem:
        "Vietravel cần một hệ thống CRM toàn doanh nghiệp để hợp nhất dữ liệu khách hàng, pipeline bán hàng và tương tác đa kênh giữa ba phòng ban vốn đang làm việc trên các công cụ rời rạc.",
      approach:
        "Chủ trì thu thập yêu cầu toàn diện từ Sales, Marketing và Customer Service, chuyển thành đặc tả chức năng và user story dùng chung cho đội nội bộ và nhà cung cấp. Thiết kế kế hoạch ánh xạ dữ liệu và tích hợp giữa CRM, nền tảng đặt chỗ và Customer Data Platform (CDP); phối hợp với nhà cung cấp về thiết kế giải pháp, tùy chỉnh, kế hoạch UAT và quản lý thay đổi.",
      outcome:
        "Đang điều phối sprint, quản lý rủi ro và báo cáo cho các bên liên quan với đội 20+ người, theo dõi tiến độ hướng tới go-live cho 500+ người dùng ở nhiều đơn vị kinh doanh.",
      aiNote:
        "Áp dụng Claude Code (CLI) để tự động hóa công việc BA/PM hằng ngày: đồng bộ tạo và theo dõi task với JIRA/ClickUp, soạn BRD, SRS, user story và slide báo cáo cho các bên liên quan.",
      tags: ["CRM", "Tích hợp Booking", "CDP", "Ánh xạ dữ liệu", "UAT"],
      gradient: "linear-gradient(135deg, #0859D4 0%, #0693E3 100%)",
      status: "live",
    },
    {
      slug: "astrazeneca-lms",
      client: "AstraZeneca Việt Nam",
      title: "Hệ thống Quản lý Học tập tích hợp AI",
      role: "Acting Project Manager · DR Digital",
      period: "05/2025 – 09/2025",
      team: "7 (1 PM/BA, 2 BE, 2 FE, 1 UI/UX, 1 QA)",
      heroMetric: "MVP trong 10 tuần · 92% hài lòng UAT · 300+ nhân viên",
      problem:
        "AstraZeneca Việt Nam cần một LMS nội bộ cho đào tạo, tuân thủ và hội nhập nhân viên mới — với lộ trình học cá nhân hóa, quy trình cấp chứng chỉ, theo dõi tiến độ và hỗ trợ học viên bằng AI — trong một khung thời gian gấp rút.",
      approach:
        "Chủ trì thu thập yêu cầu từ các phòng HR, Product, Marketing và Commex; tích hợp SSO và đồng bộ dữ liệu HR để LMS kết nối trực tiếp với hệ thống nhân sự hiện có. Điều phối quá trình xây dựng với vai trò Project Manager trên JIRA, Confluence và Figma, bổ sung chatbot AI và lộ trình học cá nhân hóa vào MVP.",
      outcome:
        "Bàn giao MVP trong 10 tuần, triển khai cho 300+ nhân viên, đạt 92% mức độ hài lòng trong UAT và giảm tải hỗ trợ nhờ chatbot AI.",
      tags: ["LMS", "AI Chatbot", "SSO & đồng bộ dữ liệu HR", "Dược phẩm"],
      gradient: "linear-gradient(135deg, #1D1D1F 0%, #2B2E3A 55%, #0859D4 100%)",
      status: "shipped",
    },
    {
      slug: "kbank-lucky-draw",
      client: "KBank Việt Nam",
      title: `Hệ thống Quay số trúng thưởng — "KBank Thưởng Vàng"`,
      role: "Project Manager · Bliss Digital",
      period: "09/2024 – 01/2025",
      team: "4 (1 PM/BA, 1 BE, 1 FE, 1 UI/UX)",
      heroMetric: "20M+ hồ sơ khách hàng được xử lý",
      problem:
        "KBank Việt Nam cần một hệ thống quay số trúng thưởng minh bạch, có thể kiểm chứng cho chương trình tri ân bằng vàng vận hành ở quy mô toàn quốc, với ràng buộc tuân thủ về cách xử lý hồ sơ khách hàng.",
      approach:
        "Làm việc trực tiếp với các bên liên quan của KBank để thống nhất yêu cầu theo mục tiêu chiến dịch và yêu cầu tuân thủ. Đảm nhận toàn bộ vòng đời dự án — lập kế hoạch, điều phối đội nhóm, giao tiếp với các bên liên quan — với một đội gọn nhẹ gồm bốn người.",
      outcome:
        "Bàn giao hệ thống quay số trúng thưởng minh bạch, xử lý 20M+ hồ sơ khách hàng, đáp ứng cả yêu cầu chiến dịch lẫn tuân thủ.",
      tags: ["Ngân hàng / B2C", "Tuân thủ", "Quản lý các bên liên quan"],
      gradient: "linear-gradient(135deg, #00D084 0%, #0693E3 55%, #0859D4 100%)",
      status: "shipped",
    },
  ],
  agentWorkflow: {
    agents: [
      { id: "po", name: "PO Agent", focus: "Tầm nhìn, lộ trình, ưu tiên backlog" },
      { id: "ba", name: "BA Agent", focus: "Thu thập yêu cầu, BRD / SRS, user story" },
      { id: "pm", name: "PM Agent", focus: "Kế hoạch, đồng bộ JIRA / ClickUp, báo cáo & rủi ro" },
      { id: "designer", name: "Designer Agent", focus: "Luồng màn hình, wireframe, mockup" },
      { id: "dev", name: "Dev Agent", focus: "Hợp đồng API, làm rõ kỹ thuật" },
      { id: "qa", name: "QA Agent", focus: "Test case, kịch bản UAT, phân loại lỗi" },
    ],
    phases: [
      {
        id: "discover",
        title: "Khảo sát & tầm nhìn",
        owner: "PO · BA",
        agents: ["po", "ba"],
        input: "Phỏng vấn các bên liên quan, ghi âm cuộc họp, tài liệu quy trình hiện tại",
        runs: [
          { agent: "ba", text: "Chuyển workshop thành biên bản họp có cấu trúc và danh sách câu hỏi mở" },
          { agent: "ba", text: "Nhóm các nhu cầu thô theo phòng ban và quy trình nghiệp vụ" },
          { agent: "po", text: "Phác thảo tầm nhìn sản phẩm, phạm vi và tiêu chí thành công" },
        ],
        outputs: ["Biên bản họp", "Bản đồ các bên liên quan", "Tầm nhìn & phạm vi"],
        gate: "Tôi xác nhận phạm vi và mức ưu tiên với chủ sở hữu nghiệp vụ",
        evidence: "CRM Vietravel — thu thập yêu cầu từ Sales, Marketing và Customer Service",
      },
      {
        id: "analyze",
        title: "Phân tích yêu cầu",
        owner: "BA",
        agents: ["ba", "po"],
        input: "Phạm vi đã xác nhận, quy trình hiện tại, ràng buộc hệ thống",
        runs: [
          { agent: "ba", text: "Phân tích FIT/GAP với nền tảng mục tiêu và đánh dấu khoảng trống" },
          { agent: "ba", text: "Soạn BRD, SRS và user story kèm tiêu chí chấp nhận" },
          { agent: "po", text: "Xếp hạng backlog theo giá trị nghiệp vụ và phụ thuộc" },
        ],
        outputs: ["Ma trận FIT/GAP", "BRD / SRS", "User story + AC"],
        gate: "Tôi rà soát từng yêu cầu trước khi các bên ký duyệt",
        evidence: "FPT IS — phân tích FIT/GAP đạt 100% độ chính xác đáp ứng yêu cầu",
      },
      {
        id: "design",
        title: "Thiết kế giải pháp",
        owner: "BA · Designer",
        agents: ["ba", "designer", "dev"],
        input: "BRD đã ký duyệt, user story, bức tranh tích hợp hệ thống",
        runs: [
          { agent: "ba", text: "Mô hình hóa quy trình to-be bằng BPMN và ánh xạ dữ liệu giữa các hệ thống" },
          { agent: "designer", text: "Chuyển user story thành luồng màn hình, wireframe và mockup" },
          { agent: "dev", text: "Kiểm tra tính khả thi và phác thảo hợp đồng API / JSON" },
        ],
        outputs: ["Luồng BPMN", "Wireframe", "Ánh xạ dữ liệu & đặc tả API"],
        gate: "Review thiết kế cùng nhà cung cấp và đội phát triển",
        evidence: "Vietravel — kế hoạch tích hợp CRM, nền tảng Booking và CDP",
      },
      {
        id: "plan",
        title: "Lập kế hoạch & theo dõi",
        owner: "PM",
        agents: ["pm", "po"],
        input: "Backlog đã ưu tiên, năng lực đội, tiến độ nhà cung cấp",
        runs: [
          { agent: "pm", text: "Chia story thành task và đồng bộ sang JIRA / ClickUp" },
          { agent: "pm", text: "Lập kế hoạch sprint và sổ rủi ro có người phụ trách" },
          { agent: "pm", text: "Tạo báo cáo tuần và slide cho các bên liên quan" },
        ],
        outputs: ["Task JIRA / ClickUp", "Kế hoạch sprint", "Báo cáo tuần & slide"],
        gate: "Tôi duyệt kế hoạch sprint và mọi change request",
        evidence: "DR Digital — triển khai Agile, 100% milestone đúng hạn",
      },
      {
        id: "build",
        title: "Phát triển & kiểm soát thay đổi",
        owner: "PM · BA",
        agents: ["dev", "ba", "pm"],
        input: "Backlog sprint, đặc tả thiết kế, câu hỏi từ nhà cung cấp",
        runs: [
          { agent: "dev", text: "Trả lời câu hỏi đặc tả kèm tham chiếu ngược tới SRS" },
          { agent: "ba", text: "Đánh giá từng change request so với phạm vi và yêu cầu" },
          { agent: "pm", text: "Cập nhật ảnh hưởng của thay đổi lên tiến độ, ngân sách và rủi ro" },
        ],
        outputs: ["Nhật ký làm rõ yêu cầu", "Đánh giá ảnh hưởng thay đổi", "Kế hoạch cập nhật"],
        gate: "Thay đổi phạm vi phải được các bên liên quan phê duyệt",
        evidence: "Vietravel — phối hợp nhà cung cấp về tùy chỉnh và quản lý thay đổi",
      },
      {
        id: "test",
        title: "Kiểm thử & UAT",
        owner: "BA · QA",
        agents: ["qa", "ba"],
        input: "Tiêu chí chấp nhận, release note của bản build",
        runs: [
          { agent: "qa", text: "Tạo test case và kịch bản UAT từ tiêu chí chấp nhận" },
          { agent: "qa", text: "Phân loại lỗi theo mức độ và truy vết về user story" },
          { agent: "ba", text: "Tổng hợp phản hồi UAT thành danh sách sửa lỗi và cải tiến" },
        ],
        outputs: ["Test case", "Kịch bản UAT", "Báo cáo lỗi"],
        gate: "Người dùng nghiệp vụ chạy UAT và ký nghiệm thu",
        evidence: "LMS AstraZeneca — 92% người dùng hài lòng trong UAT",
      },
      {
        id: "launch",
        title: "Go-live & đưa vào sử dụng",
        owner: "PM · PO",
        agents: ["pm", "po", "qa"],
        input: "Biên bản nghiệm thu UAT, kế hoạch chuyển đổi, nhu cầu đào tạo",
        runs: [
          { agent: "pm", text: "Chạy checklist sẵn sàng go-live với tất cả các đội" },
          { agent: "po", text: "Soạn release note và tài liệu đào tạo" },
          { agent: "qa", text: "Chuẩn bị checklist smoke test và theo dõi lỗi sau phát hành" },
        ],
        outputs: ["Checklist go-live", "Slide đào tạo", "Release note"],
        gate: "Quyết định go / no-go cùng chủ sở hữu nghiệp vụ",
        evidence: "FPT IS — go-live và đào tạo cho hệ thống HRM 8.000+ người dùng",
      },
    ],
  },
  agentTeams: [
    {
      id: "po",
      label: "Product Owner",
      summary: "Biến mục tiêu kinh doanh và phản hồi thành lộ trình và backlog đã ưu tiên.",
      trigger: "Mục tiêu kinh doanh & phản hồi các bên",
      lead: "PO Lead Agent",
      agents: [
        { name: "Research Agent", detail: "Nghiên cứu thị trường, chân dung khách hàng và đối thủ", tool: "confluence" },
        { name: "Vision Agent", detail: "Tầm nhìn sản phẩm, phạm vi và tiêu chí thành công", tool: "confluence" },
        { name: "Backlog Agent", detail: "Chia epic thành user story, xếp hạng theo giá trị nghiệp vụ", tool: "jira" },
        { name: "Roadmap Agent", detail: "Lộ trình phát hành và release note", tool: "jira" },
      ],
      tools: ["confluence", "jira"],
      output: "Lộ trình & backlog đã ưu tiên",
      approval: "Tôi thống nhất mức ưu tiên với các bên liên quan",
    },
    {
      id: "ba",
      label: "Business Analyst",
      summary: "Biến workshop và tài liệu quy trình thành đặc tả để đội phát triển xây dựng.",
      trigger: "Workshop & ghi âm cuộc họp",
      lead: "BA Lead Agent",
      agents: [
        { name: "Elicitation Agent", detail: "Biên bản họp, yêu cầu ứng viên và câu hỏi mở", tool: "confluence" },
        { name: "FIT/GAP Agent", detail: "So sánh yêu cầu với nền tảng mục tiêu", tool: "confluence" },
        { name: "Spec Writer Agent", detail: "Bản nháp BRD, SRS và URD", tool: "confluence" },
        { name: "Story Agent", detail: "User story kèm tiêu chí chấp nhận", tool: "jira" },
        { name: "Modeling Agent", detail: "Luồng BPMN, wireframe và ánh xạ dữ liệu", tool: "drawio" },
      ],
      tools: ["confluence", "jira", "drawio"],
      output: "BRD / SRS / user story",
      approval: "Tôi rà soát từng yêu cầu trước khi ký duyệt",
    },
    {
      id: "pm",
      label: "Project Manager",
      summary: "Giữ kế hoạch, rủi ro và các bên liên quan luôn đồng bộ mỗi tuần.",
      trigger: "Backlog, cuộc họp & cập nhật từ nhà cung cấp",
      lead: "PM Lead Agent",
      agents: [
        { name: "Minutes Agent", detail: "Biên bản họp kèm hành động và người phụ trách", tool: "tracker" },
        { name: "Task Sync Agent", detail: "Tạo và theo dõi task trên JIRA / ClickUp", tool: "tracker" },
        { name: "Status Report Agent", detail: "Báo cáo tuần dự án và slide cho các bên", tool: "tracker" },
        { name: "Risk Agent", detail: "Đánh giá rủi ro và cập nhật sổ rủi ro", tool: "tracker" },
        { name: "Change Request Agent", detail: "Ảnh hưởng của thay đổi lên phạm vi, tiến độ, ngân sách", tool: "tracker" },
        { name: "Go-live Agent", detail: "Checklist sẵn sàng go-live cho các đội", tool: "tracker" },
      ],
      tools: ["tracker"],
      output: "Báo cáo, sổ rủi ro & CR, checklist go-live",
      approval: "Tôi duyệt kế hoạch, change request và go / no-go",
    },
  ],
  experience: [
    {
      company: "Công ty Cổ phần Du lịch Vietravel",
      logoKey: "vietravel",
      role: "Business Analyst & Project Manager",
      period: "09/2025 – Hiện tại",
      location: "TP. Hồ Chí Minh, Việt Nam",
      startYear: 2025,
      endYear: 2026,
      bullets: [
        "Chủ trì dự án triển khai CRM toàn doanh nghiệp, điều phối đội liên chức năng 20+ thành viên (10 nội bộ + đội nhà cung cấp).",
        "Thu thập và phân tích yêu cầu toàn diện từ Sales, Marketing và Customer Service, chuyển thành đặc tả chức năng và user story.",
        "Quản lý tích hợp giữa CRM, nền tảng Booking và CDP, đảm bảo dữ liệu thông suốt và quy trình đồng nhất.",
        "Phụ trách lập kế hoạch, điều phối sprint, quản lý rủi ro và báo cáo các bên liên quan cho 500+ người dùng mục tiêu ở nhiều phòng ban.",
        "Phối hợp với nhà cung cấp về thiết kế giải pháp, tùy chỉnh, kế hoạch UAT và quản lý thay đổi để giảm rủi ro triển khai.",
        "Áp dụng Claude Code (CLI) để tự động hóa công việc BA/PM: đồng bộ task với JIRA/ClickUp, soạn BRD, SRS, user story và slide báo cáo.",
      ],
    },
    {
      company: "DR Digital",
      logoKey: "dr-digital",
      role: "Business Analyst & Project Manager",
      period: "07/2024 – 09/2025",
      startYear: 2024,
      endYear: 2025,
      bullets: [
        "Chủ trì thu thập yêu cầu và thiết kế giải pháp cho AstraZeneca, Mobifone và De Heus Việt Nam trên nền tảng LMS và DMS tích hợp AI.",
        "Chuyển nhu cầu nghiệp vụ phức tạp thành URD, user story và wireframe trên Confluence và Figma, giúp developer và các bên liên quan có cùng cách hiểu.",
        "Quản lý sprint Agile, backlog grooming và quy trình JIRA; theo dõi ngân sách và phạm vi để hoàn thành 100% milestone đúng hạn.",
        "Điều phối workshop UAT, buổi demo và đào tạo người dùng; cải tiến tính năng từ phản hồi để tăng mức độ sử dụng sau phát hành.",
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
        "Phân tích và tài liệu hóa yêu cầu khách hàng cho các dự án website và sản phẩm số, đảm bảo bàn giao đúng hạn.",
        "Thực hiện R&D cho Odoo ERP, tự phát triển hai module chức năng (HRM, CRM) từ yêu cầu đến triển khai.",
        "Nghiên cứu thị trường, xây dựng chân dung khách hàng và lộ trình kinh doanh để hỗ trợ chiến lược sản phẩm.",
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
        "Tài liệu hóa yêu cầu HRM cho hệ thống doanh nghiệp quy mô lớn với 8.000+ người dùng ở nhiều phòng ban.",
        "Soạn tài liệu URD, Blueprint và Feature List cho 3 dự án lớn, là tài liệu tham chiếu chính cho đội phát triển.",
        "Phân tích FIT/GAP với vai trò cầu nối giữa khách hàng và đội phát triển, đạt 100% độ chính xác đáp ứng yêu cầu.",
        "Hỗ trợ go-live qua đào tạo người dùng, thuyết trình với khách hàng và hỗ trợ sau triển khai.",
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
      items: [
        "Thu thập yêu cầu",
        "Phân tích FIT/GAP",
        "Thiết kế giải pháp",
        "BRD / SRS / URD",
        "Use Case & User Story",
        "Đặc tả chức năng & phi chức năng",
      ],
    },
    {
      category: "Mô hình hóa & Thiết kế",
      items: ["BPMN 2.0", "UML", "Activity / Process Flow", "Wireframe", "Mockup"],
    },
    {
      category: "Triển khai Dự án",
      items: [
        "Agile / Scrum",
        "Lập kế hoạch Sprint",
        "Backlog Grooming",
        "UAT",
        "Điều phối nhà cung cấp",
        "Quản lý ngân sách & rủi ro",
        "Quản lý các bên liên quan",
      ],
    },
    {
      category: "Kỹ thuật",
      items: ["SQL Server", "API / JSON", "API Testing (Postman)", "Kiểm thử ứng dụng", "SDLC", "Tích hợp hệ thống"],
    },
    {
      category: "Công cụ",
      items: ["JIRA", "Confluence", "ClickUp", "Trello", "Figma", "Balsamiq", "Draw.io"],
    },
    {
      category: "Công cụ AI",
      items: ["Claude Code (CLI)", "Soạn BRD / SRS / User Story với AI", "Tự động hóa task JIRA / ClickUp"],
    },
  ],
  domains: ["CRM", "ERP (Odoo)", "HRM", "LMS", "SaaS", "Du lịch & Lữ hành"],
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
