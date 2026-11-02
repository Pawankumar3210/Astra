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
  contributions: string[]
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
  items: TechItem[]
}

export type Milestone = {
  id: string
  period: string
  title: string
  description: string
  category: 'education' | 'project' | 'opensource' | 'learning'
  href: string
}

export type TrajectoryItem = {
  id: string
  title: string
  description: string
  related?: string
}

export type ContactChannel = {
  id: string
  label: string
  href: string
  handle: string
}

export type Portfolio = {
  brand: string
  motto: string
  mottoLines: [string, string]
  owner: {
    name: string
    shortName: string
    title: string
    introLabel: string
    greeting: string
    summary: string
    about: string[]
    identityLabels: IdentityLabel[]
  }
  seo: {
    title: string
    description: string
  }
  /** Leave empty until a production domain is confirmed. */
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
    introLabel: 'Exploring technology · Building the future',
    greeting: "Hi, I'm Pawan Kumar G.",
    summary:
      "I'm a CSE student and developer exploring full-stack engineering, open source, and AI/ML while building useful digital experiences.",
    about: [
      'I study computer science engineering and spend most of my time building software that people can actually use — resume tools, academic resource platforms, and offline utilities that respect privacy.',
      'Curiosity is the through-line. I like understanding how a system fits together, then improving the part that is slow, unclear, or unnecessarily complicated. Open source is where that habit meets collaboration: reading other people’s code, shipping a focused contribution, and learning from the review.',
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
        label: 'AI/ML Exploration',
        detail: 'Applied classification and data analysis in AeroInsight',
      },
      {
        label: 'Space Technology',
        detail: 'A long-term interest, not a claimed specialty',
      },
    ],
  },
  seo: {
    title: 'ASTRA — Pawan Kumar G.',
    description:
      'Personal portfolio of Pawan Kumar G., a CSE student building full-stack products, contributing to open source, and exploring AI/ML. Per Aspera Ad Astra.',
  },
  siteUrl: '',
  resumeUrl: '',
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
      screenshot: '',
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
      screenshot: '',
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
      repositoryUrl: 'https://github.com/Pawankumar3210/DoxDock',
      liveUrl: 'https://doxdock.vercel.app',
      screenshot: '',
      contributions: [
        'QR code reader',
        'Image splitter',
        'Color palette extractor',
        'Image collage',
        'Offline image OCR',
        'PowerPoint to PDF converter',
        'PDF password protection and removal',
        'eBook to PDF converter',
        'Document scanner',
      ],
      visual: {
        code: 'LOCAL.OPS',
        caption: 'Mission poster — not a product screenshot',
        accent: 'aurora',
      },
    },
  ],
  tech: [
    {
      id: 'languages',
      title: 'Programming Languages',
      items: [
        { name: 'JavaScript', context: 'Application logic across ResuMint, Wisdom Vault, and DoxDock.' },
        { name: 'TypeScript', context: 'Typed UI and data flows in ResuMint and AeroInsight.' },
        { name: 'Python', context: 'Data and ML-adjacent work, including AeroInsight analytics.' },
        { name: 'HTML & CSS', context: 'Semantic structure and custom visual systems.' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      items: [
        { name: 'React', context: 'Component architecture for product UIs.' },
        { name: 'Next.js', context: 'ResuMint app routing, theming, and client workflows.' },
        { name: 'Tailwind CSS', context: 'Design-token-driven layouts and theming.' },
        { name: 'Framer Motion', context: 'Restrained motion in product and portfolio interfaces.' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend and Data',
      items: [
        { name: 'Supabase', context: 'Auth-adjacent admin access, Postgres, and file storage for Wisdom Vault.' },
        { name: 'Apache Spark SQL', context: 'Airline review analytics in AeroInsight.' },
        { name: 'REST APIs', context: 'Integrating data services into frontend applications.' },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      items: [
        { name: 'PostgreSQL', context: 'Relational storage via Supabase for academic content.' },
      ],
    },
    {
      id: 'tools',
      title: 'Development Tools',
      items: [
        { name: 'Git & GitHub', context: 'Version control, public repositories, and pull-request based work.' },
        { name: 'Vite', context: 'Fast local development and static production builds.' },
        { name: 'Vercel', context: 'Deployment for ResuMint, Wisdom Vault, and related web apps.' },
        { name: 'npm', context: 'Package management and project scripts.' },
      ],
    },
    {
      id: 'foundations',
      title: 'Computer Science Foundations',
      items: [
        { name: 'Data structures & algorithms', context: 'Ongoing practice in a public DSA repository.' },
        { name: 'Client-side architecture', context: 'Privacy-preserving apps that run without a custom backend.' },
      ],
    },
    {
      id: 'emerging',
      title: 'Emerging Interests',
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
      title: 'Published work on GitHub',
      description:
        'Opened a public GitHub profile and started keeping software work in the open, where it can be reviewed and improved.',
      category: 'learning',
      href: 'https://github.com/Pawankumar3210',
    },
    {
      id: 'wisdom-vault',
      period: '2026',
      title: 'Wisdom Vault with Team Udbhav',
      description:
        'Shipped a mobile-first academic resource platform so CSE classmates can find notes, question banks, and papers in one place.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/WisdomVault',
    },
    {
      id: 'doxdock',
      period: '2026',
      title: 'Open-source tools on DoxDock',
      description:
        'Contributed client-side image and document utilities to DoxDock, including collage, palette extraction, OCR, converters, and a document scanner.',
      category: 'opensource',
      href: 'https://github.com/Pawankumar3210/DoxDock',
    },
    {
      id: 'resumint',
      period: '2026',
      title: 'ResuMint résumé builder',
      description:
        'Built an ATS-friendly, privacy-first resume product with Team Udbhav, including in-browser editing and export.',
      category: 'project',
      href: 'https://github.com/Pawankumar3210/ResuMint',
    },
    {
      id: 'aeroinsight',
      period: '2026',
      title: 'AeroInsight review analysis',
      description:
        'Explored data-intensive analysis of airline passenger reviews using Spark SQL and a pretrained transformer for sentiment labels.',
      category: 'learning',
      href: 'https://github.com/Pawankumar3210/AeroInsight',
    },
    {
      id: 'dsa',
      period: '2026',
      title: 'Structured DSA practice',
      description:
        'Keeping a public repository for data structures and algorithms practice as part of core computer science study.',
      category: 'education',
      href: 'https://github.com/Pawankumar3210/DSA',
    },
  ],
  trajectory: [
    {
      id: 'engineering',
      title: 'Advanced software engineering',
      description:
        'I want to write software that stays understandable as it grows — clearer architecture, stronger testing habits, and more deliberate APIs.',
      related: 'ResuMint and Wisdom Vault are the current proving ground.',
    },
    {
      id: 'aiml',
      title: 'AI and machine learning',
      description:
        'I am learning how models can sit beside real products, starting with classification and analysis rather than claiming production ML expertise.',
      related: 'AeroInsight is an early experiment in this direction.',
    },
    {
      id: 'data',
      title: 'Data-intensive systems',
      description:
        'I want a firmer grasp of how larger datasets are stored, queried, and turned into interfaces people can trust.',
    },
    {
      id: 'oss',
      title: 'Open-source development',
      description:
        'I plan to keep contributing focused, reviewable changes — especially tools that protect user data by staying on-device.',
      related: 'DoxDock is the current open-source thread.',
    },
    {
      id: 'space',
      title: 'Space technology and computing',
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
        handle: '@Pawankumar3210',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/pawan-kumar-g-54530134b',
        handle: 'Pawan Kumar G.',
      },
      {
        id: 'email',
        label: 'Email',
        href: '',
        handle: '',
      },
    ],
  },
  terminalShortcut: 'Ctrl/⌘ + `',
}

export const publicContact = portfolio.contact.channels.filter(
  (channel) => Boolean(channel.href),
)

export const visibleMilestones = portfolio.journey.filter(
  (item) => item.title.trim() && item.description.trim(),
)
