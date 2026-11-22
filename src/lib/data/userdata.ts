export interface ProjectData {
  slug: string;
  project_name: string;
  code_link?: string;
  demo_link?: string;
  npm_link?: string;
  description: string;
  long_description?: string;
  image: string;
  category: string;
  technologies: string[];
  metrics?: string;
  architecture?: string[];
  highlights?: string[];
}

export interface ExperienceData {
  title: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  responsibilities?: string[];
  skills: string[];
  logo?: string;
}

export interface SocialLink {
  name?: string;
  href: string;
}

export interface QuickLink {
  label: string;
  href?: string;
}

export interface ContactInfo {
  location: string;
  email: string;
  phone: string;
  availability?: string;
}

export interface FooterData {
  title: string;
  description: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  contact: ContactInfo;
  copyright: string;
}

export interface EducationData {
  postgraduate: string;
  undergraduate: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: {
    name: string;
    highlight?: string;
  }[];
}

export interface AboutData {
  current_position: string;
  years_of_experience: string;
  education: EducationData;
  skills: string[];
  skill_categories: SkillCategory[];
  description: string;
  description2: string;
  location: string;
  email: string;
  phone: string;
}

export interface UserData {
  name: string;
  location: string;
  title: string;
  role: string;
  experience_years: string;
  introduction: string;
  metrics: {
    actionSuccess: string;
    p95Latency: string;
    batchTurnaround: string;
    linesOfCode: string;
    yoe: string;
  };
  about: AboutData;
  Projects: ProjectData[];
  experience: ExperienceData[];
  contact: {
    message: string;
    availability: string;
  };
  footer: FooterData;
}

const userData: UserData = {
  name: "Saswat Ranjan Mohanty",
  location: "Bhubaneswar, Odisha, India",
  title: "Software Engineer • Full-Stack & Applied AI",
  role: "Software Engineer • Full-Stack & Applied AI",
  experience_years: "3+ Years",
  introduction:
    "Software Engineer with 3+ years of production experience engineering high-performance web systems, cross-platform mobile apps, and applied AI architectures including automated video generation pipelines, zero-dependency agentic copilot SDKs, and hybrid pgvector RAG.",
  metrics: {
    actionSuccess: "98%",
    p95Latency: "384ms",
    batchTurnaround: "-60%",
    linesOfCode: "190k",
    yoe: "3+",
  },
  about: {
    current_position: "Software Development Engineer (SDE 1) at NetTantra Technologies",
    years_of_experience: "3+ Years",
    education: {
      postgraduate: "Master of Computer Applications (MCA) — United School of Business Management, Bhubaneswar (2021 – 2023)",
      undergraduate: "Bachelor of Science (BSc) — Utkal University, Bhubaneswar",
    },
    skills: [
      "Next.js",
      "React",
      "React 19",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Python",
      "FastAPI",
      "Node.js",
      "Express.js",
      "Claude Code",
      "Multi-Agent Co-work",
      "MCP Integration",
      "AWS Bedrock",
      "Agentic AI",
      "RAG Pipelines",
      "pgvector",
      "WebRTC",
      "FFmpeg",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Tailwind CSS",
      "Docker",
      "Git",
    ],
    skill_categories: [
      {
        id: "ai-rag",
        title: "Applied AI, Agentic Copilots & RAG",
        subtitle: "Enterprise LLMs, Tool-Calling & Vector Retrieval",
        description:
          "Production generative AI implementations leveraging Claude Code agentic workflows, multi-agent co-work systems, AWS Bedrock foundation inference, and hybrid semantic RAG with pgvector.",
        skills: [
          { name: "Claude Code & Agentic CLI", highlight: "Autonomous coding workflows, tool execution, terminal automation & deep codebase refactoring" },
          { name: "Co-work & Multi-Agent Collaboration", highlight: "Collaborative agent loops, asynchronous task dispatch, stateful checkpointers & tool calling" },
          { name: "AWS Bedrock & Anthropic Claude", highlight: "Claude 3.7 / 3.5 Sonnet foundation models, prompt engineering & tool-use" },
          { name: "Agentic Copilots & DOM SDKs", highlight: "Autonomous multi-step execution loops, browser DOM agents & sandboxed execution" },
          { name: "Hybrid RAG & pgvector", highlight: "Semantic + keyword retrieval with vector embeddings in PostgreSQL" },
          { name: "LangGraph Multi-Agent Workflows", highlight: "State graphs, cyclical agent routing & checkpoint recovery" },
        ],
      },
      {
        id: "fullstack-web",
        title: "Full Stack & Web Engineering",
        subtitle: "Type-Safe Architecture, Server Components & Microservices",
        description:
          "End-to-end full stack development crafting high-performance frontends with Next.js 15 and React 19 alongside resilient Node.js, Python FastAPI, and Express backend services.",
        skills: [
          { name: "Next.js 15 & React 19", highlight: "App Router, Server Actions & streaming SSR" },
          { name: "TypeScript & JavaScript", highlight: "Strict type safety, ESNext patterns & zero runtime bugs" },
          { name: "Python FastAPI", highlight: "High-throughput asynchronous AI & microservice endpoints" },
          { name: "Node.js & Express.js", highlight: "Event-driven architecture & resilient REST APIs" },
          { name: "Shadow DOM SDKs", highlight: "Zero-dependency client embeddable copilot widgets" },
          { name: "Tailwind CSS", highlight: "Design systems, dark modes & hardware-accelerated animations" },
        ],
      },
      {
        id: "mobile-realtime",
        title: "Mobile & Real-Time Comms",
        subtitle: "Cross-Platform Apps, WebRTC & WebSockets",
        description:
          "Engineering responsive cross-platform mobile apps with React Native alongside low-latency peer-to-peer WebRTC audio/video and bidirectional WebSocket channels.",
        skills: [
          { name: "React Native", highlight: "Performant iOS & Android cross-platform mobile apps" },
          { name: "WebRTC", highlight: "Peer-to-peer live media mesh, audio DSP & screen sharing" },
          { name: "Socket.io & WebSockets", highlight: "Real-time state sync, telemetry & live dispatch" },
          { name: "Mobile Navigation & Cache", highlight: "Offline persistence, gesture handling & Redux state" },
        ],
      },
      {
        id: "cloud-databases",
        title: "Databases, Cloud & Systems",
        subtitle: "Distributed Persistence, Vector Indices & DevOps",
        description:
          "Relational and vector database modeling, Redis semantic caching, Docker container orchestration, and automated CI/CD continuous deployment.",
        skills: [
          { name: "PostgreSQL & pgvector", highlight: "Relational schemas, vector indexing & migrations" },
          { name: "MongoDB & Mongoose", highlight: "Scalable document schemas & cluster aggregation" },
          { name: "Redis Caching", highlight: "Semantic cache-aside, distributed locks & rate limiting" },
          { name: "Docker & Containers", highlight: "Reproducible container builds & microservice runtimes" },
          { name: "AWS Cloud Services", highlight: "Bedrock, S3 object storage, ECS & CloudWatch" },
          { name: "CI/CD & Git", highlight: "GitHub Actions automated testing, linting & deployment" },
        ],
      },
    ],
    description:
      "I'm a Software Engineer (SDE 1) at NetTantra Technologies in Bhubaneswar, India, specializing in Full-Stack Web, Cross-Platform Mobile, and Applied AI Engineering. With a Master's in Computer Applications (MCA) from United School of Business Management, I build high-performance distributed platforms, real-time communication systems, and production-ready generative AI pipelines.",
    description2:
      "My work bridges scalable backend systems, responsive frontend interfaces, and cutting-edge AI architectures—including automated HeyGen/FFmpeg video generation pipelines, zero-dependency embeddable agentic copilots, live spatial marketplaces, and enterprise RAG engines.",
    location: "Bhubaneswar, Odisha, India",
    email: "saswatranjan0602@gmail.com",
    phone: "+91 91788 42947",
  },
  Projects: [
    {
      slug: "orbito",
      project_name: "Orbito — AI Project & Task Management Platform",
      code_link: "https://github.com/Saswat0602/Orbito",
      demo_link: "https://github.com/Saswat0602/Orbito",
      description:
        "Production-grade enterprise task and project management platform with conversational AI task execution, in-app DOM browser automation, sub-millisecond WebSocket event broadcasting, and multi-view project canvas.",
      long_description:
        "Architected and engineered Orbito, an enterprise project management platform designed with Clean Architecture and Domain-Driven Design (DDD). Combines a minimalist keyboard-first Linear-style UI with real-time WebSocket communication and a conversational AI command runner. Features in-app DOM browser automation (browser-agent) capable of executing multi-step workflows, multi-view canvases (Kanban with LexoRank drag-and-drop, interactive list views, sprint planning, burndown charts, and Gantt timelines), BullMQ distributed background job queues, and AES-256-GCM encrypted credential storage.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      category: "Applied AI & Systems",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Prisma",
        "PostgreSQL",
        "BullMQ",
        "Redis",
        "WebSockets",
        "Docker",
        "Tailwind CSS",
      ],
      metrics: "Clean Architecture & DDD • In-App Browser Automation • Sub-ms WebSocket Broadcast",
      architecture: [
        "Clean Architecture & DDD: Domain entities, application use cases, and infrastructure adapters strictly decoupled",
        "Conversational AI Execution Engine: In-app DOM browser automation translating natural-language intent into multi-step actions",
        "Real-Time Event Broadcasting: Sub-millisecond WebSocket channels across organizations, workspaces, and project rooms",
        "Resilient Job Queues: BullMQ distributed background pipelines with automatic retries and AES-256-GCM encryption",
      ],
      highlights: [
        "Engineered conversational AI task execution directly within the browser interface",
        "Implemented LexoRank drag-and-drop Kanban boards with instant optimistic state synchronization",
        "Built multi-tenant enterprise RBAC with JWT token rotation and secure OIDC integration",
      ],
    },
    {
      slug: "ai-learning-platform",
      project_name: "AI Learning Platform",
      code_link: "",
      demo_link: "",
      description:
        "Institutional AI-powered learning and automated media synthesis platform featuring an automated HeyGen and FFmpeg video generation pipeline, AWS Bedrock curriculum intelligence, dynamic chapter sequencing, and real-time WebRTC interactive guidance.",
      long_description:
        "Architected and engineered an institutional AI learning and automated media synthesis platform. Spearheaded a hybrid AI media processing pipeline using AWS Bedrock (Anthropic Claude), the HeyGen API, and queue-driven FFmpeg worker nodes to generate photorealistic AI video lectures from structured curriculum scripts, cutting batch production turnaround by 60% across 100+ production batches. Integrated real-time WebRTC interactive communication rooms with a pgvector RAG curriculum index, enabling learners to participate in real-time interactive voice/video sessions with synchronized contextual transcripts, automated quiz generation, and verifiable knowledge assessments.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      category: "Applied AI & EdTech",
      technologies: [
        "AWS Bedrock",
        "Anthropic Claude",
        "HeyGen API",
        "FFmpeg",
        "Next.js 15",
        "React 19",
        "Python FastAPI",
        "WebRTC",
        "PostgreSQL",
        "pgvector",
        "Redis",
        "Tailwind CSS",
        "Docker",
      ],
      metrics: "60% Batch Turnaround Cut • 100+ Production Batches • Real-Time WebRTC Media",
      architecture: [
        "Distributed Media Worker Pipeline: Queue-driven FFmpeg and HeyGen API synthesis with chunked rendering",
        "Curriculum Intelligence Engine: AWS Bedrock Claude foundation models automating outline synthesis and assessment scripts",
        "Low-Latency WebRTC Mesh: Peer-to-peer interactive tutoring rooms with echo-cancelled audio and live canvas sync",
        "pgvector Semantic Index: PostgreSQL vector embeddings for instant chapter lookup and contextual retrieval",
      ],
      highlights: [
        "Drove a 60% batch turnaround reduction across 100+ production batches with distributed FFmpeg and HeyGen pipelines",
        "Spearheaded hybrid AI media processing combining AWS Bedrock foundation intelligence with dynamic video synthesis",
        "Engineered real-time interactive learning rooms with low-latency WebRTC audio/video and synchronized transcripts",
        "Architected scalable microservices with Python FastAPI, Next.js 15, PostgreSQL, and Redis caching",
      ],
    },
    {
      slug: "reviewsage-ai",
      project_name: "ReviewSage AI — Autonomous Deep Research Agent",
      code_link: "https://github.com/Saswat0602/research-agent",
      demo_link: "https://github.com/Saswat0602/research-agent",
      description:
        "Enterprise-grade, state-driven multi-agent research platform built with LangGraph.js, Next.js, and Google Gemini. Features autonomous search planning, SSRF-safe hybrid web/RAG search, evidence verification, and durable PostgreSQL checkpoint telemetry.",
      long_description:
        "Engineered ReviewSage AI, an enterprise multi-agent research platform that investigates complex inquiries, gathers live web evidence with SSRF protections, indexes private knowledge bases, and synthesizes cited research reports. Operates as a coordinated state machine built on LangGraph.js, Google Gemini, and Ollama: coordinating Planner, Hybrid Searcher, Reviewer, and Reporter nodes with durable session checkpointing in PostgreSQL and telemetry logging.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      category: "Agentic AI",
      technologies: [
        "LangGraph.js",
        "Next.js",
        "React 19",
        "TypeScript",
        "Google Gemini",
        "Ollama",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "Tailwind CSS",
      ],
      metrics: "Multi-Agent State Machine • Evidence Review Loop • Durable PostgreSQL Checkpoints",
      architecture: [
        "LangGraph State Machine: Coordinated Planner, Hybrid Searcher, Reviewer, and Reporter cyclical execution loop",
        "Evidence Review Engine: State-driven reviewer node validating claims and excerpt containment against evidence",
        "Durable Session Checkpointing: Full state rollback and execution logs persisted directly to PostgreSQL",
        "SSRF-Protected Search: Hybrid live web search combined with private document indexing and relevance scoring",
      ],
      highlights: [
        "Eliminated fabricated links and phantom claims with deterministic citation verification",
        "Built interactive Next.js web command center with live Server-Sent Events (SSE) execution streaming",
        "Executed 33 comprehensive unit tests across 11 test suites with sub-second execution times",
      ],
    },
    {
      slug: "shomes",
      project_name: "Shomes — Spatial Real Estate Marketplace",
      code_link: "https://github.com/Saswat0602/Real-estate-management",
      demo_link: "https://shomes.in",
      description:
        "Live production real estate marketplace featuring high-performance spatial geolocation search, real-time boundary polygon filtering, responsive property tours, and sub-second inquiry dispatch.",
      long_description:
        "Constructed a property listing marketplace with Next.js (App Router), leveraging SSR/ISR to achieve a 45% reduction in page load times. Designed an interactive spatial search engine integrating Geolocation APIs and map overlays, delivering distance-based property queries in sub-second latency. Engineered modular React hooks and optimized media with Next.js Image, propelling Lighthouse performance and SEO scores to 95+.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack & Geospatial",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Zustand",
        "Geolocation API",
        "PostgreSQL",
        "Node.js",
        "Redis",
      ],
      metrics: "Live at shomes.in • 45% Load Time Cut • Sub-Second Spatial Queries • 95+ Lighthouse",
      architecture: [
        "Next.js App Router with SSR/ISR: Instant static rendering with on-demand revalidation for real-time listings",
        "Interactive Spatial Search: Geolocation APIs and spatial bounds delivering distance-based property queries",
        "Optimized Media Pipeline: Responsive Next.js Image optimization with blur placeholders and priority prefetching",
        "State Synchronization: Lightweight Zustand store managing interactive filter drawer and map state",
      ],
      highlights: [
        "Deployed in live production at shomes.in serving thousands of property listings",
        "Achieved 45% reduction in page load times and 95+ Lighthouse performance and SEO scores",
        "Engineered distance-based spatial property queries with sub-second query latency",
      ],
    },
    {
      slug: "oryn-ui",
      project_name: "Oryn UI — Modern Component Library",
      code_link: "https://github.com/Saswat0602/oryn-ui",
      demo_link: "https://oryn-ui.vercel.app",
      npm_link: "https://www.npmjs.com/package/oryn-ui",
      description:
        "A modern component library for building beautiful, accessible interfaces with TypeScript and Tailwind CSS. Features 75+ standalone components, AI primitives, zero external UI runtime dependencies, full keyboard accessibility, and interactive theme builder.",
      long_description:
        "Created Oryn UI (oryn-ui), an open-source React component library and design system published on npm. Features 75+ standalone components and AI primitives built with zero external UI runtime dependencies. Adheres to strict Layer Architecture, full keyboard accessibility, and zero-runtime style recalculation. Includes an interactive live theme builder, CLI component distributor, and comprehensive Vitest test coverage.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      category: "Frontend & Design Systems",
      technologies: [
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Storybook",
        "Vitest",
        "npm",
        "Keyboard Accessibility",
      ],
      metrics: "Published on npm (oryn-ui) • 75+ Primitives • Zero External UI Runtime Dependencies • React 19",
      architecture: [
        "Zero External UI Runtime Dependencies: 100% native React primitives (Slot, Portal, Presence, FocusTrap) and inline SVG icons",
        "Architecture-by-Layer: Strict separation across core tokens, primitive behaviors, and styled compound components",
        "Theme Engine: CSS custom property design tokens enabling seamless dark mode and instant theme switching",
        "Compound Component Pattern: Ergonomic, declarative APIs with flexible child composition and focus trapping",
      ],
      highlights: [
        "Published publicly on npm as oryn-ui with live interactive documentation at oryn-ui.vercel.app",
        "Includes 75+ standalone components and specialized AI interface primitives",
        "Full keyboard navigation and accessible component states with automated Vitest suites",
      ],
    },
    {
      slug: "foodshare-network",
      project_name: "FoodShare Network",
      code_link: "https://github.com/Saswat0602/FoodShare-Network",
      demo_link: "https://github.com/Saswat0602/FoodShare-Network",
      description:
        "A comprehensive food sharing and redistribution platform connecting donors, recipients, and volunteers with smart scheduling, impact analytics, real-time tracking, and role-based route security.",
      long_description:
        "Developed FoodShare Network, a community food donation and redistribution platform connecting donors with local non-profits and volunteer couriers. Built cross-platform mobile interfaces with React Native and an administrative web dashboard with Next.js, coordinating food listings, pickup scheduling, and role-based route security.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      category: "Mobile & Full Stack",
      technologies: [
        "Next.js",
        "React Native",
        "TypeScript",
        "Tailwind CSS",
        "Context API",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      architecture: [
        "Frictionless Donor Workflows: Multi-step contribution intake pipeline with automatic form persistence",
        "Cross-Platform Coordination: Next.js administrative command dashboard paired with React Native mobile client",
        "Role-Based Security: JWT-authenticated route guards distinguishing donors, volunteer couriers, and recipients",
        "State Management: Predictable client state synchronization using React Context API",
      ],
      highlights: [
        "Streamlined donor intake workflows connecting community donors with local distribution centers",
        "Responsive cross-platform interface supporting mobile and desktop users",
        "Coordinated community food redistribution across food banks and volunteer networks",
      ],
    },
    {
      slug: "attendance-app",
      project_name: "Attendance Management App",
      code_link: "https://github.com/Saswat0602/attendance-app",
      demo_link: "https://github.com/Saswat0602/attendance-app",
      description:
        "Full-stack attendance tracking and staff management application featuring a Next.js administrative dashboard, daily check-in workflows, and clean responsive employee rosters.",
      long_description:
        "Engineered an attendance management web application built with Next.js, React, Node.js, and Tailwind CSS. Provides a streamlined administrative command center for tracking staff check-ins, monitoring shift attendance, and reviewing employee records with responsive data tables and secure session management.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack & Web",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Tailwind CSS",
        "PostgreSQL",
      ],
      architecture: [
        "Administrative Dashboard: Next.js App Router for centralized staff and attendance review",
        "Attendance Workflows: Streamlined daily check-in logging and shift state tracking",
        "Responsive Interface: Clean mobile-first layouts styled with Tailwind CSS",
        "Role-Based Security: Secure session management and administrative access controls",
      ],
      highlights: [
        "Built responsive administrative portal with clear employee attendance overviews",
        "Engineered clean daily check-in and shift roster management workflows",
        "Implemented secure session handling and role-based permissions",
      ],
    },
    {
      slug: "spotify-music-app",
      project_name: "Spotify-Music-App",
      code_link: "https://github.com/Saswat0602/spotify-clone",
      demo_link: "https://spotify-clone-ek3u.vercel.app/",
      description:
        "High-fidelity music streaming application with responsive dark UI, dynamic queue management, and Supabase integration.",
      long_description:
        "A production-grade music streaming web application built with Next.js, Redux, and Tailwind CSS. Implemented seamless track transitions, dynamic playlist queues, persistent song caching, and Supabase authentication and database storage.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack",
      technologies: [
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "Supabase",
        "TypeScript",
      ],
      metrics: "Live Production Demo • Supabase Authentication • Responsive UI",
      architecture: [
        "Audio Playback Engine: Seamless track transitions and volume management",
        "Progressive Media Streaming: Progressive chunk buffering for instant track start",
        "Centralized Redux Store: Deterministic playback queue and state synchronization",
      ],
      highlights: [
        "Deployed live on Vercel with responsive mobile and desktop layouts",
        "Implemented user authentication and liked songs persistence in Supabase",
        "Smooth interactive playback bar with live progress seeking",
      ],
    },
    {
      slug: "zoom-clone-app",
      project_name: "Zoom-Clone-App",
      code_link: "https://github.com/Saswat0602/zoom-clone",
      demo_link: "https://zoom-clone-next-ten.vercel.app/",
      description:
        "Real-time video conferencing platform with WebRTC peer-to-peer audio/video mesh, Socket.io signaling, instant in-meeting messaging, and screen sharing.",
      long_description:
        "Full-stack real-time video conferencing application developed with WebRTC, Socket.io, Node.js, and React. Handles peer-to-peer audio/video connections, multi-participant room routing, instant in-meeting messaging, and screen capture streaming.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack & WebRTC",
      technologies: [
        "WebRTC",
        "Socket.io",
        "Node.js",
        "React",
        "Express.js",
        "Tailwind CSS",
      ],
      metrics: "Live Production Demo • WebRTC Audio & Video • Socket.io",
      architecture: [
        "WebRTC PeerConnection: Direct audio/video tracks between meeting peers",
        "Socket.io Signaling: Low-latency exchange of SDP offers, answers, and ICE candidates",
        "Screen Sharing Stream: Dynamic display media capture and track replacement",
      ],
      highlights: [
        "Deployed live on Vercel with real-time multi-peer video rooms",
        "Built-in chat sidebar with live broadcast messaging across participants",
        "Responsive grid layout dynamically resizing based on participant count",
      ],
    },
  ],
  experience: [
    {
      title: "Software Development Engineer (SDE 1)",
      company: "NetTantra Technologies",
      duration: "April 2024 – Present",
      location: "Bhubaneswar, India · On-site",
      type: "Full-time",
      description:
        "Architecting Agentic AI execution engines, enterprise RAG workflows, automated media pipelines, and scalable full-stack applications with React, Next.js, and NestJS.",
      responsibilities: [
        "Architected the execution engine for an Agentic AI platform leveraging RAG, building a WebSocket macro executor that achieved a 98% action success rate and cut task latency by 35%.",
        "Engineered a zero-dependency JavaScript SDK translating natural-language intent into secure DOM actions, resulting in a 45% reduction in background-tab execution latency.",
        "Spearheaded a hybrid AI media processing pipeline using AWS Bedrock, HeyGen, and FFmpeg, driving a 60% turnaround reduction across 100+ production batches.",
        "Delivered a cross-platform construction management app with React.js, React Native, and Three.js, achieving a 40% reduction in API response and data synchronization times.",
        "Instituted automated QA suites using Jest and React Testing Library, boosting code coverage from 60% to 85%+ and cutting production defects by 30%.",
      ],
      skills: [
        "React.js",
        "Next.js",
        "NestJS",
        "React Native",
        "TypeScript",
        "AWS Bedrock",
        "RAG",
        "WebSockets",
        "Jest",
        "FFmpeg",
        "Docker",
      ],
      logo: "/path_to_logo_image",
    },
    {
      title: "Junior Software Developer",
      company: "NetTantra Technologies",
      duration: "August 2023 – March 2024",
      location: "Bhubaneswar, India · On-site",
      type: "Full-time",
      description:
        "Engineered facial recognition mobile systems, standardized frontend component design tokens, and delivered low-latency bidirectional real-time communications.",
      responsibilities: [
        "Engineered a React Native facial recognition attendance application with a Next.js admin portal, processing 1,000+ daily check-ins with 99.2% verification accuracy.",
        "Designed reusable UI component systems using React.js and Tailwind CSS, standardizing design tokens and reducing frontend feature turnaround by 30%.",
        "Implemented bidirectional real-time communication via WebSockets and Socket.io, maintaining sub-100ms sync latency across 500+ concurrent connections.",
      ],
      skills: [
        "React.js",
        "Next.js",
        "React Native",
        "Redux Toolkit",
        "TypeScript",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Socket.io",
        "Tailwind CSS",
      ],
      logo: "/path_to_logo_image",
    },
  ],
  contact: {
    message:
      "Whether you are looking to hire for Full-Stack & Applied AI engineering roles, architect automated video pipelines or agentic copilots, or scale cross-platform mobile apps, let's connect.",
    availability: "Available for Full-Stack & Applied AI Engineering roles (Remote, Hybrid, or On-site).",
  },
  footer: {
    title: "Saswat Ranjan Mohanty",
    description:
      "Software Engineer with 3+ years of experience specializing in Full-Stack Web, Cross-Platform Mobile, and Applied AI Engineering (AWS Bedrock, RAG, & Agentic Copilots). Based in Bhubaneswar, Odisha, India.",
    socialLinks: [
      { name: "GitHub", href: "https://github.com/Saswat0602" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/saswat0602" },
      { name: "Email", href: "mailto:saswatranjan0602@gmail.com" },
    ],
    quickLinks: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Skills", href: "/#skills" },
      { label: "Experience", href: "/#experience" },
      { label: "Contact", href: "/#contact" },
    ],
    contact: {
      location: "Bhubaneswar, Odisha, India",
      email: "saswatranjan0602@gmail.com",
      phone: "+91 91788 42947",
      availability: "Available for new opportunities",
    },
    copyright: "© 2025 Saswat Ranjan Mohanty. All rights reserved.",
  },
};

export default userData;