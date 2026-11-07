/**
 * Central content configuration for ASTRA.
 * Update this file to change copy, projects, links, skills, and timeline
 * entries without editing UI components.
 *
 * Leave a URL as an empty string to hide that link from the public site.
 * Never invent metrics, testimonials, or contact details here.
 */

export type NavItem = {
  id: string
  label: string
  href: string
}

export type IdentityLabel = {
  label: string
  detail: string
}

export type Project = {
  id: string
  missionId: string
  title: string
  shortDescription: string
  problem: string
  solution: string
  role: string
  featured: boolean
  technologies: string[]
  features: string[]
  repositoryUrl: string
  liveUrl: string
  screenshot: string
  contributions: { label: string; href?: string }[]
  architecture: { label: string; detail: string }[]
  visual: {
    code: string
    caption: string
    accent: 'cyan' | 'violet' | 'aurora'
  }
}

export type TechItem = {
  name: string
  context: string
}

export type TechCategory = {
  id: string
  title: string
  shortTitle: string
  items: TechItem[]
}

export type MilestoneCategory =
  | 'education'
  | 'project'
  | 'opensource'
  | 'hackathon'
  | 'milestone'
  | 'learning'
  | 'future'

export type Milestone = {
  id: string
  period: string
  title: string
  description: string
  category: MilestoneCategory
  href: string
}

export type TrajectoryItem = {
  id: string
  title: string
  shortLabel: string
  description: string
  related?: string
}

export type ContactChannel = {
  id: string
  label: string
  href: string
}

export type Portfolio = {
  brand: string
  motto: string
  mottoLines: [string, string]
  owner: {
    name: string
    shortName: string
    title: string
    greeting: string
    summary: string
    availability: string
    about: string[]
    identityLabels: IdentityLabel[]
  }
  seo: {
    title: string
    description: string
  }
  /** Confirmed production origin used for deployment metadata. */
  now: {
    updated: string
    items: { label: string; detail: string }[]
  }
  siteUrl: string
  resumeUrl: string
  nav: NavItem[]
  projects: Project[]
  tech: TechCategory[]
  journey: Milestone[]
  trajectory: TrajectoryItem[]
  contact: {
    heading: string
    body: string
    channels: ContactChannel[]
  }
  paletteShortcut: string
  terminalShortcut: string
}

export const portfolio: Portfolio = {
  brand: 'ASTRA',
  motto: 'Per Aspera Ad Astra.',
  mottoLines: ['Per Aspera', 'Ad Astra.'],
  owner: {
    name: 'Pawan Kumar G.',
    shortName: 'Pawan',
    title: 'CSE student & developer',
    greeting: "Hi, I'm Pawan Kumar G.",
    summary:
      "I'm a CSE student and developer exploring full-stack engineering, open source, and AI/ML while building useful digital experiences.",
    availability: 'Available for software engineering internships and early-career roles',
    about: [
      'I study computer science engineering and spend most of my time building software that people can actually use — resume tools, academic resource platforms, offline utilities, and interfaces for exploring complex data.',
      'Curiosity is the through-line. I like understanding how a system fits together, then improving the part that is slow, unclear, or unnecessarily complicated. Open source is where that habit meets collaboration: reading other people’s code, shipping a focused contribution, and learning from the review. I also help lead SLUG, Sapthagiri’s libre-software community, where students learn Linux and open-source practice together.',
      'I am still early in the journey. The work here is evidence of practice, not a finished map. Each project is a mission I can point to, defend, and keep iterating on.',
    ],
    identityLabels: [
      {
        label: 'Full-Stack Development',
        detail: 'React, Next.js, and client-side product work',
      },
      {
        label: 'Open Source',
        detail: 'Contributions to DoxDock and public repositories',
      },
      {
        label: 'Community Leadership',
        detail: 'Organization Lead at Sapthagiri Libre-Software Users Group (SLUG)',
      },
      {
        label: 'AI/ML Exploration',
        detail: 'Applied classification and data analysis in AeroInsight',
      },
      {
        label: 'Space Technology',
        detail: 'A long-term interest, not a claimed specialty',
      },
    ],
  },
  now: {
    updated: 'November 2026',
    items: [
      {
        label: 'Structured DSA practice',
        detail: 'Consistent problem solving with a public repository and reviewable notes.',
      },
      {
        label: 'Full-stack product work',
        detail: 'React and Next.js interfaces, FastAPI services, and deployment.',
      },
      {
        label: 'Applied AI/ML',
        detail: 'Evaluation flows, data analysis, and fallbacks that keep products usable.',
      },
      {
        label: 'Open-source collaboration',
        detail: 'Focused contributions, code review, and improvements that ship.',
      },
    ],
  },
  seo: {
    title: 'Pawan Kumar G',
    description:
      'Personal portfolio of Pawan Kumar G., a CSE student building full-stack products, contributing to open source, and exploring AI/ML. Per Aspera Ad Astra.',
  },
  siteUrl: 'https://pawankumarg.vercel.app',
  resumeUrl: '/pawan-kumar-g-resume.pdf',
  nav: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'stack', label: 'Tech Stack', href: '#stack' },
    { id: 'journey', label: 'Journey', href: '#journey' },
    { id: 'trajectory', label: 'Trajectory', href: '#trajectory' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
  projects: [
    {
      id: 'resumint',
      missionId: 'AST-01',
      title: 'ResuMint',
      shortDescription:
        'A privacy-first résumé builder that helps students create ATS-friendly resumes in the browser.',
      problem:
        'Students often need a clean, ATS-readable resume quickly, without creating accounts or uploading personal documents to unknown servers.',
      solution:
        'ResuMint keeps editing, preview, and export on the client. People can build, import, and download a professional resume without login, ads, or watermarks.',
      role: 'Built with Team Udbhav. Work spans product design, the builder experience, and client-side export flows.',
      featured: true,
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'React PDF',
      ],
      features: [
        'ATS-oriented layout and structured resume sections',
        'Client-side PDF and DOCX export',
        'Import from existing resume files in the browser',
        'No login, ads, or remote storage of resume data',
      ],
      repositoryUrl: 'https://github.com/Pawankumar3210/ResuMint',
      liveUrl: 'https://resumintneo.vercel.app/',
      screenshot: '/projects/resumint.jpg',
      architecture: [
        { label: 'Client editor', detail: 'React and Next.js keep the document state in the browser.' },
        { label: 'Template engine', detail: 'ATS-oriented sections render into a live preview.' },
        { label: 'Export layer', detail: 'PDF and DOCX files are generated locally.' },
        { label: 'Download', detail: 'No account, upload, or remote resume storage.' },
      ],
      contributions: [],
      visual: {
        code: 'RESUME.SYS',
        caption: 'Mission poster — not a product screenshot',
        accent: 'cyan',
      },
    },
    {
      id: 'wisdom-vault',
      missionId: 'AST-02',
      title: 'Wisdom Vault',
      shortDescription:
        'A mobile-first academic vault for notes, question banks, and previous-year papers.',
      problem:
        'Course materials for a semester are usually scattered across chats, drives, and unofficial folders, which makes them hard to search and keep current.',
      solution:
        'Wisdom Vault organizes subjects and documents in one interface, with search, in-browser PDF viewing, and an admin workflow for uploads — backed by Supabase.',
      role: 'Built with Team Udbhav. Listed as chief architect on the project README, with focus on structure and the student-facing interface.',
      featured: false,
      technologies: ['React', 'Supabase', 'PostgreSQL', 'Framer Motion', 'Vercel'],
      features: [
        'Search across notes, question banks, and papers',
        'In-app PDF viewing and downloads',
        'Admin dashboard for subject and content management',
        'Dark and light themes for long study sessions',
      ],
      repositoryUrl: 'https://github.com/Pawankumar3210/WisdomVault',
      liveUrl: 'https://wisdomvaultnext.vercel.app',
      screenshot: '/projects/wisdom-vault.jpg',
      architecture: [
        { label: 'React client', detail: 'Mobile-first search and subject browsing.' },
        { label: 'Supabase auth', detail: 'Account access and admin permissions.' },
        { label: 'Postgres vault', detail: 'Subjects, notes, papers, and metadata.' },
        { label: 'PDF delivery', detail: 'In-browser viewing and downloads.' },
      ],
      contributions: [],
      visual: {
        code: 'ARCHIVE.IDX',
        caption: 'Mission poster — not a product screenshot',
        accent: 'violet',
      },
    },
    {
      id: 'doxdock',
      missionId: 'AST-03',
      title: 'DoxDock',
      shortDescription:
        'Open-source, offline-first PDF and image utilities that never upload your files.',
      problem:
        'Everyday document tasks often require sending sensitive files to an unknown converter. That is a poor default for contracts, scans, and personal records.',
      solution:
        'DoxDock runs merge, split, compress, conversion, and related tools entirely in the browser. I contribute focused image and document utilities on top of that privacy-first foundation.',
      role: 'Open-source contributor to DoxDock. Public pull requests added new client-side document and image tools on the privacy-first, in-browser foundation.',
      featured: false,
      technologies: ['JavaScript', 'Browser APIs', 'PWA', 'pdf.js'],
      features: [
        'Client-side document and image processing',
        'No file uploads and no account requirement',
        'Installable web app that can work offline',
      ],
      repositoryUrl: 'https://github.com/mithun-srinivas/DoxDock',
      liveUrl: 'https://doxdock.vercel.app',
      screenshot: '/projects/doxdock.jpg',
      architecture: [
        { label: 'React interface', detail: 'Tool selection and local file handling.' },
        { label: 'Browser engine', detail: 'Image, PDF, OCR, and conversion work runs on-device.' },
        { label: 'Local output', detail: 'Files are processed and downloaded without upload.' },
      ],
      contributions: [
        {
          label: 'QR code reader',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/166',
        },
        {
          label: 'Image splitter',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/175',
        },
        {
          label: 'Color palette extractor',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/183',
        },
        {
          label: 'Image collage',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/184',
        },
        {
          label: 'Offline image OCR',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/192',
        },
        {
          label: 'PowerPoint to PDF converter',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/194',
        },
        {
          label: 'PDF password protection',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/209',
        },
        {
          label: 'PDF password removal',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/210',
        },
        {
          label: 'eBook to PDF converter',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/213',
        },
        {
          label: 'Document scanner',
          href: 'https://github.com/mithun-srinivas/DoxDock/pull/216',
        },
      ],
      visual: {
        code: 'LOCAL.OPS',
        caption: 'Mission poster — not a product screenshot',
        accent: 'aurora',
      },
    },
    {
      id: 'repowarp',
      missionId: 'AST-04',
      title: 'RepoWarp',
      shortDescription:
        'A 3D time-travel workspace for exploring how a GitHub repository evolved, commit by commit.',
      problem:
        'Commit histories and codebase changes are usually flattened into lists and diffs, which makes it difficult to understand what a repository actually looked like at a given moment.',
      solution:
        'RepoWarp turns public GitHub repositories into interactive 3D commit lanes and codebase snapshots. It preserves view, branch, commit, comparison, and file state in deep links, and surfaces incomplete history instead of inventing missing data.',
      role:
        'Built the product end to end, from the GitHub data flow and 3D scenes to exports, responsive theming, and accessible interactions.',
      featured: false,
      technologies: [
        'React',
        'TypeScript',
        'Three.js',
        'React Three Fiber',
        'Zustand',
        'Vite',
      ],
      features: [
        'Traversable 3D commit spine with branches, merges, tags, filters, and playback',
        'Historical codebase city reconstructed at the selected commit',
        'Shareable deep links for view, branch, commit, comparison, and file',
        'JSON, CSV, and composed PNG exports with completeness metadata',
        'Honest loading, truncation, and GitHub rate-limit states',
      ],
      repositoryUrl: 'https://github.com/Pawankumar3210/RepoWarp',
      liveUrl: 'https://repowarp.vercel.app',
      screenshot: '/projects/repowarp.jpg',
      architecture: [
        { label: 'GitHub API', detail: 'Public repository and commit history.' },
        { label: 'Commit graph', detail: 'Branches, merges, tags, and snapshots normalized.' },
        { label: '3D workspace', detail: 'React Three Fiber commit lanes and codebase city.' },
        { label: 'Deep links + exports', detail: 'View state, JSON, CSV, and PNG output.' },
      ],
      contributions: [],
      visual: {
        code: 'COMMIT.DRIVE',
        caption: 'Mission poster — not a product screenshot',
        accent: 'violet',
      },
    },
    {
      id: 'bioscope',
      missionId: 'AST-05',
      title: 'BioScope',
      shortDescription:
        'A cinematic disease-intelligence dashboard for exploring global cases, regional risk, and outbreak scenarios.',
      problem:
        'Disease-surveillance information is often split across static charts and disconnected screens, which makes it harder to see how regions, case counts, and trends relate.',
      solution:
        'BioScope brings the experience into one multi-page React interface: a global summary, statistics, a disease heatmap, trend charts, prediction screens, uploads, reports, and a research view.',
      role:
        'Built the front-end product: dashboard structure, chart components, routing, theming, and the animated visual layer. The public demo uses mock data and presentation-layer prediction flows.',
      featured: false,
      technologies: [
        'React',
        'Vite',
        'Tailwind CSS',
        'Recharts',
        'Framer Motion',
        'React Three Fiber',
      ],
      features: [
        'Dashboard, statistics, prediction, upload, reports, heatmap, and research views',
        'Recharts donut, bar, and time-series visualizations',
        'Regional disease heatmap with interactive detail',
        'Glass UI, particle field, and light/dark theme support',
        'Clearly labelled demo data rather than claimed live surveillance',
      ],
      repositoryUrl: 'https://github.com/Pawankumar3210/BioScope',
      liveUrl: 'https://bioscope-blue.vercel.app',
      screenshot: '/projects/bioscope.jpg',
      architecture: [
        { label: 'Demo dataset', detail: 'Clearly labelled mock surveillance data.' },
        { label: 'Client aggregation', detail: 'Case, region, and trend views derived in React.' },
        { label: 'Visualization layer', detail: 'Recharts charts, heatmap, and scenario screens.' },
      ],
      contributions: [],
      visual: {
        code: 'GLOBAL.SCAN',
        caption: 'Mission poster — not a product screenshot',
        accent: 'cyan',
      },
    },
    {
      id: 'resqchain',
      missionId: 'AST-06',
      title: 'ResQChain',
      shortDescription:
        'An AI-assisted emergency logistics HUD for prioritizing deliveries, routing around disruptions, and predicting supply-chain risk.',
      problem:
        'Emergency responders need to move critical supplies through routes that can fail without warning, while juggling competing priorities and incomplete information.',
      solution:
        'ResQChain ranks urgent deliveries, finds the safest path with Dijkstra routing, detects disruptions, and adds Gemini risk analysis with a rule-based fallback so the console remains useful when AI is unavailable.',
      role:
        'Built with Team Udbhav. Work spans the React operations HUD, FastAPI backend, priority and routing logic, Gemini integration, fallback states, and deployment.',
      featured: false,
      technologies: [
        'React',
        'FastAPI',
        'Python',
        'Google Gemini',
        'Firebase',
        'Dijkstra routing',
        'Vercel',
        'Railway',
      ],
      features: [
        'Delivery-priority engine for urgency and criticality',
        'Dijkstra route selection with rerouting around blocked or risky paths',
        'Gemini risk prediction with a rule-based fallback mode',
        'JARVIS-style operations HUD with live status and an activity log',
      ],
      repositoryUrl: 'https://github.com/Pawankumar3210/ResQChain',
      liveUrl: 'https://resqchain-omega.vercel.app',
      screenshot: '/projects/resqchain.jpg',
      architecture: [
        { label: 'React HUD', detail: 'Delivery priorities, live status, and activity log.' },
        { label: 'FastAPI service', detail: 'Priority and routing endpoints.' },
        { label: 'Dijkstra router', detail: 'Safest path with disruption rerouting.' },
        { label: 'Gemini + fallback', detail: 'Risk analysis with a rule-based backup.' },
        { label: 'Firebase data', detail: 'Shared operational state and deployment.' },
      ],
      contributions: [],
      visual: {
        code: 'EMERGENCY.OPS',
        caption: 'Emergency logistics operations console',
        accent: 'cyan',
      },
    },
    {
      id: 'tendertrace',
      missionId: 'AST-07',
      title: 'TenderTrace AI',
      shortDescription:
        'An explainable AI tender-evaluation platform that extracts eligibility criteria and audits every procurement verdict.',
      problem:
        'Government tender review is document-heavy, repetitive, and difficult to audit when eligibility decisions are buried across tender PDFs and bidder submissions.',
      solution:
        'TenderTrace extracts eligibility criteria, evaluates bidder evidence, labels each verdict with source reasoning and confidence, flags ambiguous cases for human review, and exports an audit-ready report.',
      role:
        'Built with Team Udbhav. Work spans the React interface, FastAPI/Gemini evaluation flow, criteria extraction, explainable verdicts, side-by-side comparison, PDF reports, and fallback handling.',
      featured: false,
      technologies: [
        'React',
        'FastAPI',
        'Python',
        'Google Gemini',
        'PyMuPDF',
        'ReportLab',
        'Vercel',
        'Hugging Face Spaces',
      ],
      features: [
        'Tender-PDF criteria extraction for turnover, certifications, experience, and compliance',
        'Explainable eligible, not-eligible, and needs-review verdicts with source evidence',
        'Mandatory versus optional criteria and side-by-side bidder comparison',
        'Confidence scores, audit trail, and downloadable PDF evaluation reports',
        'Ambiguous and scanned documents are flagged for human review',
      ],
      repositoryUrl: 'https://github.com/Pawankumar3210/TenderTraceAI',
      liveUrl: 'https://tendertrace.vercel.app',
      screenshot: '/projects/tendertrace.jpg',
      architecture: [
        { label: 'React workspace', detail: 'Tender and bidder document intake.' },
        { label: 'FastAPI service', detail: 'Extraction and evaluation orchestration.' },
        { label: 'PyMuPDF', detail: 'Eligibility criteria extracted from tender PDFs.' },
        { label: 'Gemini + evidence', detail: 'Verdicts, source reasoning, confidence, and review flags.' },
        { label: 'ReportLab', detail: 'Audit-ready PDF reports and comparison output.' },
      ],
      contributions: [],
      visual: {
        code: 'TENDER.AUDIT',
        caption: 'Explainable procurement evaluation console',
        accent: 'violet',
      },
    },
  ],
  tech: [
    {
      id: 'languages',
      title: 'Programming Languages',
      shortTitle: 'Languages',
      items: [
        { name: 'JavaScript', context: 'Application logic across ResuMint, Wisdom Vault, DoxDock, and BioScope.' },
        { name: 'TypeScript', context: 'Typed product and data flows in ResuMint, AeroInsight, and RepoWarp.' },
        { name: 'Python', context: 'Data and ML-adjacent work in AeroInsight, plus FastAPI services for ResQChain and TenderTrace AI.' },
        { name: 'HTML & CSS', context: 'Semantic structure and custom visual systems.' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      shortTitle: 'Frontend',
      items: [
        { name: 'React', context: 'Component architecture across ResuMint, Wisdom Vault, RepoWarp, BioScope, ResQChain, and TenderTrace AI.' },
        { name: 'Next.js', context: 'ResuMint app routing, theming, and client workflows.' },
        { name: 'Tailwind CSS', context: 'Design-token-driven layouts and theming.' },
        { name: 'Framer Motion', context: 'Restrained motion in product and portfolio interfaces.' },
        { name: 'Three.js / React Three Fiber', context: '3D commit history in RepoWarp and ambient visuals in BioScope.' },
        { name: 'Recharts', context: 'Dashboard charts and regional trend views in BioScope.' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend and Data',
      shortTitle: 'Backend',
      items: [
        { name: 'Supabase', context: 'Auth-adjacent admin access, Postgres, and file storage for Wisdom Vault.' },
        { name: 'FastAPI', context: 'Python APIs for ResQChain emergency routing and TenderTrace AI evaluation.' },
        { name: 'Google Gemini', context: 'Risk prediction and document evaluation, with rule-based fallbacks when AI is unavailable.' },
        { name: 'PyMuPDF + ReportLab', context: 'Tender document parsing and audit-ready PDF report generation in TenderTrace AI.' },
        { name: 'Apache Spark SQL', context: 'Airline review analytics in AeroInsight.' },
        { name: 'REST APIs', context: 'Integrating data services into frontend applications.' },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      shortTitle: 'Databases',
      items: [
        { name: 'PostgreSQL', context: 'Relational storage via Supabase for academic content.' },
        { name: 'Firebase', context: 'Emergency logistics data for ResQChain.' },
      ],
    },
    {
      id: 'tools',
      title: 'Development Tools',
      shortTitle: 'Tooling',
      items: [
        { name: 'Git & GitHub', context: 'Version control, public repositories, and pull-request based work.' },
        { name: 'Vite', context: 'Fast local development and static builds for ASTRA, RepoWarp, and BioScope.' },
        { name: 'Vercel', context: 'Deployment for ResuMint, Wisdom Vault, RepoWarp, BioScope, ResQChain, and TenderTrace AI.' },
        { name: 'npm', context: 'Package management and project scripts.' },
      ],
    },
    {
      id: 'foundations',
      title: 'Computer Science Foundations',
      shortTitle: 'Foundations',
      items: [
        { name: 'Data structures & algorithms', context: 'Ongoing practice in a public DSA repository.' },
        { name: 'Dijkstra routing', context: 'Graph-based safest-path selection for emergency deliveries in ResQChain.' },
        { name: 'Client-side architecture', context: 'Privacy-preserving apps that run without a custom backend.' },
      ],
    },
    {
      id: 'emerging',
      title: 'Emerging Interests',
      shortTitle: 'Emerging',
      items: [
        { name: 'AI / ML', context: 'Exploring pretrained transformers for review classification in AeroInsight.' },
        { name: 'Data-intensive systems', context: 'Learning how larger datasets are queried and presented.' },
        { name: 'Space technology', context: 'A horizon I want to study, not a completed body of work.' },
      ],
    },
  ],
  journey: [
    {
      id: 'github-start',
      period: '2024',
      title: 'Joined GitHub',
      description:
        'Created a public GitHub profile and started learning in the open, where work can be reviewed and improved.',
      category: 'milestone',
      href: 'https://github.com/Pawankumar3210',
    },
    {
      id: 'wisdom-vault',
      period: 'May 2026 – Oct 2026',
      title: 'Wisdom Vault with Team Udbhav',
      description:
        'Shipped a mobile-first academic resource platform so CSE classmates can find notes, question banks, and papers in one place.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/WisdomVault',
    },
    {
      id: 'resqchain',
      period: 'Apr 2026',
      title: 'ResQChain emergency logistics',
      description:
        'Built with Team Udbhav — an AI-assisted emergency logistics HUD that prioritizes deliveries, routes around disruptions with Dijkstra, and adds Gemini risk analysis with a rule-based fallback.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/ResQChain',
    },
    {
      id: 'bioscope',
      period: 'May 2026',
      title: 'BioScope disease-intelligence dashboard',
      description:
        'Built a cinematic front-end for exploring global disease metrics, regional heatmaps, and prediction scenarios with mock data.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/BioScope',
    },
    {
      id: 'tendertrace',
      period: 'May 2026',
      title: 'TenderTrace AI procurement audit',
      description:
        'Built with Team Udbhav — an explainable tender-evaluation flow that extracts eligibility criteria, evaluates bidders with source evidence and confidence, and exports audit-ready reports.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/TenderTraceAI',
    },
    {
      id: 'doxdock',
      period: 'Aug 2026 – Present',
      title: 'DoxDock open-source contributions',
      description:
        'Contributed client-side image and document utilities to DoxDock, including collage, palette extraction, OCR, converters, and a document scanner.',
      category: 'opensource',
      href: 'https://github.com/mithun-srinivas/DoxDock/pulls?q=is%3Apr+author%3APawankumar3210',
    },
    {
      id: 'resumint',
      period: 'Sep 2026 – Oct 2026',
      title: 'ResuMint résumé builder',
      description:
        'Built an ATS-friendly, privacy-first resume product with Team Udbhav, including in-browser editing and export.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/ResuMint',
    },
    {
      id: 'sih-bis',
      period: 'Oct 2026',
      title: 'SIH-BIS standards assistant',
      description:
        'Contributed to a Smart India Hackathon team build of a BIS standards and compliance assistant, including a multilingual RAG help flow and a containerized stack.',
      category: 'hackathon',
      href: 'https://github.com/Pawankumar3210/SIH-BIS',
    },
    {
      id: 'aeroinsight',
      period: 'Oct 2026',
      title: 'AeroInsight review analysis',
      description:
        'Explored data-intensive analysis of airline passenger reviews using Spark SQL and a pretrained transformer for sentiment labels.',
      category: 'learning',
      href: 'https://github.com/Pawankumar3210/AeroInsight',
    },
    {
      id: 'repowarp',
      period: 'Oct 2026',
      title: 'RepoWarp 3D commit atlas',
      description:
        'Turned public commit histories into traversable 3D lanes and historical codebase snapshots, with deep links and exports.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/RepoWarp',
    },
    {
      id: 'dsa',
      period: 'Present',
      title: 'CSE study and structured DSA practice',
      description:
        'Core computer science study with a public data structures and algorithms repository for consistent problem-solving practice.',
      category: 'education',
      href: 'https://github.com/Pawankumar3210/DSA',
    },
    {
      id: 'slug',
      period: 'May 2026 – Present',
      title: 'Organization Lead, SLUG',
      description:
        'Lead the Sapthagiri Libre-Software Users Group, organizing Linux and open-source workshops, hackathons, and student sessions.',
      category: 'opensource',
      href: 'https://www.linkedin.com/company/sapthagiri-libre-software-users-group',
    },
    {
      id: 'next-orbit',
      period: 'Next',
      title: 'The next orbit',
      description:
        'Stronger software engineering, applied AI/ML, data-intensive systems, deeper open source, and space technology.',
      category: 'future',
      href: '#trajectory',
    },
  ],
  trajectory: [
    {
      id: 'engineering',
      title: 'Advanced software engineering',
      shortLabel: 'Craft',
      description:
        'I want to write software that stays understandable as it grows — clearer architecture, stronger testing habits, and more deliberate APIs.',
      related: 'ResuMint and Wisdom Vault are the current proving ground.',
    },
    {
      id: 'aiml',
      title: 'AI and machine learning',
      shortLabel: 'AI / ML',
      description:
        'I am learning how models can sit beside real products, starting with classification and analysis rather than claiming production ML expertise.',
      related: 'AeroInsight is an early experiment in this direction.',
    },
    {
      id: 'data',
      title: 'Data-intensive systems',
      shortLabel: 'Data',
      description:
        'I want a firmer grasp of how larger datasets are stored, queried, and turned into interfaces people can trust.',
    },
    {
      id: 'oss',
      title: 'Open-source development',
      shortLabel: 'Open source',
      description:
        'I plan to keep contributing focused, reviewable changes — especially tools that protect user data by staying on-device.',
      related: 'DoxDock is the current open-source thread.',
    },
    {
      id: 'space',
      title: 'Space technology and computing',
      shortLabel: 'Space',
      description:
        'Space systems sit at the far edge of this map. I am interested in the computing problems around them and am honest that this is still an interest, not a résumé line.',
    },
  ],
  contact: {
    heading: 'Have an idea worth exploring?',
    body: "I'm always interested in learning, building meaningful projects, and connecting with people who enjoy turning ideas into reality.",
    channels: [
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/Pawankumar3210',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/pawan-kumar-g/',
      },
      {
        id: 'email',
        label: 'Email',
        href: 'mailto:pawankumarg881156@gmail.com',
      },
    ],
  },
  paletteShortcut: 'Ctrl/⌘ + K',
  terminalShortcut: 'Ctrl/⌘ + J',
}

export const publicContact = portfolio.contact.channels.filter(
  (channel) => Boolean(channel.href),
)

export const visibleMilestones = portfolio.journey.filter(
  (item) => item.title.trim() && item.description.trim(),
)
