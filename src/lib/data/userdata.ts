export interface ProjectData {
  slug: string;
  project_name: string;
  code_link: string;
  demo_link?: string;
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
      postgraduate: "MCA from United School of Business Management, Bhubaneswar",
      undergraduate: "BSc from Utkal University",
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
      "AWS Bedrock",
      "Agentic AI",
      "RAG Pipelines",
      "pgvector",
      "LangChain / LangGraph",
      "WebRTC",
      "FFmpeg",
      "HeyGen API",
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
          "Production generative AI implementations leveraging AWS Bedrock foundation models, multi-agent LangGraph workflows, hybrid semantic RAG with pgvector, and automated video generation pipelines.",
        skills: [
          { name: "AWS Bedrock", highlight: "Claude 3.5 Sonnet & Titan foundation inference" },
          { name: "Agentic Copilots", highlight: "Autonomous multi-step tool calling & sandboxed execution" },
          { name: "Hybrid RAG & pgvector", highlight: "Sub-384ms P95 semantic + lexical retrieval with HNSW" },
          { name: "Video Automation", highlight: "HeyGen API, FFmpeg distributed rendering pipeline" },
          { name: "LangChain / LangGraph", highlight: "Stateful agent graphs & cyclic execution loops" },
          { name: "Guardrails & Safety", highlight: "Deterministic validation, PII scrubbing & citation check" },
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
          { name: "Web Audio API", highlight: "Custom audio nodes, visualizers & streaming playback" },
          { name: "Mobile Navigation & Cache", highlight: "Offline persistence, gesture handling & Redux state" },
          { name: "Hardware Telemetry", highlight: "Biometric sensor listeners & real-time IoT relays" },
        ],
      },
      {
        id: "cloud-databases",
        title: "Databases, Cloud & Systems",
        subtitle: "Distributed Persistence, Vector Indices & DevOps",
        description:
          "Relational and vector database modeling, Redis semantic caching, Docker container orchestration, and automated CI/CD continuous deployment.",
        skills: [
          { name: "PostgreSQL & pgvector", highlight: "High-dimensional vector embeddings, HNSW indexing" },
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
      slug: "virtual-scholar-academy",
      project_name: "Virtual Scholar Academy (VSA)",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Institutional AI-powered Learning Management System featuring automated HeyGen and FFmpeg video generation pipelines, dynamic curriculum sequencing, and real-time WebRTC AI tutoring rooms.",
      long_description:
        "Architected and implemented Virtual Scholar Academy (VSA), an institutional AI LMS that automates course generation and interactive tutoring. Built a distributed media rendering pipeline integrating HeyGen API and FFmpeg to generate photorealistic AI video lectures from markdown lecture scripts, reducing batch turnaround times by 60%. Integrated WebRTC peer mesh with an applied AI reasoning backend, allowing students to receive real-time voice, video, and whiteboard guidance.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      category: "Applied AI & EdTech",
      technologies: [
        "Next.js 15",
        "React 19",
        "WebRTC",
        "HeyGen API",
        "FFmpeg",
        "Python FastAPI",
        "pgvector",
        "Node.js",
        "Redis",
        "Tailwind CSS",
      ],
      metrics: "-60% batch turnaround • Real-time WebRTC AI tutoring • Automated Video Pipeline",
      architecture: [
        "Distributed Media Worker: Queue-driven FFmpeg & HeyGen API synthesis with chunked rendering",
        "WebRTC Mesh Signaling: Low-latency peer exchange with audio DSP echo cancellation",
        "Semantic Curriculum Index: pgvector vector embeddings for instant chapter search",
        "Streaming Client: Next.js Server Components with optimistic lecture progress tracking",
      ],
      highlights: [
        "Cut video lecture rendering turnaround by 60% through parallel chunk processing",
        "Engineered real-time interactive AI tutoring rooms with WebRTC video and live canvas",
        "Built automated quiz and transcript generation synchronized with generated video timestamps",
      ],
    },
    {
      slug: "taskosaur-any",
      project_name: "Taskosaur Any — Agentic AI Copilot",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Agentic AI copilot delivered via a zero-dependency Shadow DOM SDK. Features autonomous tool execution, hybrid pgvector RAG, deterministic guardrails, and streaming multi-step task execution.",
      long_description:
        "Developed Taskosaur Any, an embeddable enterprise agentic AI copilot engineered to execute complex multi-step workflows directly within client applications. Designed a ultra-lightweight zero-dependency Shadow DOM SDK (<15kB gzipped) that isolates styles and scripts from host websites. Built the backend on LangGraph and Python FastAPI, executing hybrid semantic search on pgvector, autonomous tool calling, and deterministic output validation with a 98% action execution success rate and 384ms P95 latency.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      category: "Agentic AI",
      technologies: [
        "Agentic AI",
        "Shadow DOM SDK",
        "LangGraph",
        "AWS Bedrock",
        "pgvector",
        "Python FastAPI",
        "TypeScript",
        "Redis",
      ],
      metrics: "98% action success • 384ms P95 latency • Sub-15kB Shadow DOM SDK",
      architecture: [
        "Zero-Dependency Embed: Native Web Components with Shadow DOM style scoping",
        "Multi-Agent Graph: Cyclic LangGraph state machine coordinating Planner and Executor agents",
        "Hybrid pgvector Search: Combining BM25 keyword matching with cosine vector proximity",
        "Streaming Tool Dispatch: Server-Sent Events (SSE) streaming live execution steps to the client",
      ],
      highlights: [
        "Achieved 98% action execution accuracy across complex multi-step user workflows",
        "Maintained sub-384ms P95 retrieval latency across high-dimensional vector spaces",
        "Zero CSS bleed and zero host-runtime conflict thanks to isolated Shadow DOM encapsulation",
      ],
    },
    {
      slug: "shomes",
      project_name: "Shomes — Real Estate Marketplace (shomes.in)",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://shomes.in",
      description:
        "Live production real estate marketplace featuring high-performance spatial geolocation search, real-time boundary polygon filtering, responsive property tours, and instant inquiry dispatch.",
      long_description:
        "Engineered core frontend and backend subsystems for Shomes (shomes.in), an active real estate portal serving property seekers and agents. Implemented geospatial query pipelines leveraging PostgreSQL and PostGIS to support sub-50ms bounding-box queries, interactive clustering maps, radius filtering, and automated lead routing with instant notifications.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack & Geospatial",
      technologies: [
        "Next.js",
        "React",
        "PostgreSQL",
        "PostGIS",
        "Node.js",
        "Geolocation API",
        "Tailwind CSS",
        "Redis",
      ],
      metrics: "Live Production at shomes.in • Sub-50ms Geolocation Search • 10k+ Listings",
      architecture: [
        "Spatial Query Index: PostGIS R-Tree spatial indexing for instantaneous polygon search",
        "Map Clustering: Client-side vector tile clustering with debounced viewport bounding sync",
        "Lead Routing Pipeline: Asynchronous queue dispatching buyer inquiries to verified agents",
        "Edge Cache: Redis cache-aside layer invalidating stale property availability on write",
      ],
      highlights: [
        "Deployed in live production at shomes.in serving thousands of property listings",
        "Reduced spatial search latency to under 50ms for complex boundary queries",
        "Built responsive mobile-first property viewing interface with image lazy loading",
      ],
    },
    {
      slug: "mad-ui",
      project_name: "Mad-UI Component System",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Accessible, high-performance React 19 UI primitive library and design system built with zero runtime CSS overhead, full keyboard navigation, and strict WAI-ARIA compliance.",
      long_description:
        "Created Mad-UI, a reusable component library engineered for modern web applications. Built on top of accessible primitives and Tailwind CSS, Mad-UI provides 40+ composable components including dialogs, tooltips, data tables, command palettes, and animated feedback states. Tested against WCAG AAA standards with full keyboard focus management and screen-reader announcements.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      category: "Frontend & Design Systems",
      technologies: [
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Radix Primitives",
        "Storybook",
        "Accessibility (WCAG)",
      ],
      metrics: "React 19 Ready • 100% WCAG AAA Compliant • Sub-5kB bundle footprint",
      architecture: [
        "Compound Component API: Clean ergonomic composition patterns for developer ergonomics",
        "Focus Management: Complete roving tabindex and keyboard focus trapping",
        "Zero-Runtime Styles: Pure utility classes with zero runtime style recalculation cost",
      ],
      highlights: [
        "Compatible with React 19 concurrent features and Server Components",
        "100% test pass rate across assistive screen readers and keyboard navigation suites",
        "Published with automated documentation and Storybook component playground",
      ],
    },
    {
      slug: "foodshare-network",
      project_name: "FoodShare Network & Redistribution Platform",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Community food surplus redistribution network connecting commercial kitchens, food banks, and volunteer drivers with real-time route optimization and donation tracking.",
      long_description:
        "Developed FoodShare Network to combat urban food waste by connecting corporate cafeterias and restaurants with local non-profits and volunteer couriers. Built cross-platform mobile apps for couriers with live GPS route calculation and a centralized coordination portal featuring real-time Socket.io dispatch and inventory matching.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      category: "Mobile & Real-Time",
      technologies: [
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Leaflet",
        "Tailwind CSS",
      ],
      metrics: "Real-Time Volunteer Dispatch • 50+ Communities • Zero Food Waste",
      architecture: [
        "Dispatch Engine: Geo-proximity matching assigning nearby volunteer couriers to donors",
        "Real-Time Telemetry: WebSocket channel broadcasting driver coordinates to relief centers",
        "Optimistic Inventory: Atomic MongoDB transactions preventing double-claim of donations",
      ],
      highlights: [
        "Coordinated perishable food distribution across 50+ community non-profit hubs",
        "Live driver turn-by-turn routing with automatic status transitions",
        "Built responsive mobile donor interface with instant expiry logging",
      ],
    },
    {
      slug: "biometric-attendance-suite",
      project_name: "Enterprise Biometric Attendance Suite",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Multi-tenant workplace attendance and personnel verification platform combining facial biometric recognition with hardware IoT terminal telemetry and compliance auditing.",
      long_description:
        "Engineered an enterprise biometric attendance and access management platform. Integrated facial verification inference pipelines with edge camera feeds and biometric terminal hardware. Features multi-tenant enterprise administration, live shift roster management, automated overtime calculations, and encrypted biometric template storage.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack & IoT",
      technologies: [
        "Python",
        "OpenCV",
        "Node.js",
        "React",
        "PostgreSQL",
        "WebSockets",
        "Docker",
      ],
      metrics: "99.4% Face Verification Precision • Real-Time Telemetry • 500+ Active Nodes",
      architecture: [
        "Edge Inference: Localized facial feature vector extraction with 128-d cosine matching",
        "Encrypted Template Vault: One-way cryptographic hashing of biometric markers",
        "High-Throughput Ingestion: WebSocket broker ingesting 1000+ check-in events per second",
      ],
      highlights: [
        "Achieved 99.4% verification precision with anti-spoofing liveness detection",
        "Supported multi-shift automated scheduling with zero manual reconciliation",
        "Containerized with Docker for rapid on-premise edge deployment",
      ],
    },
    {
      slug: "spotify-music-app",
      project_name: "Spotify-Music-App",
      code_link: "https://github.com/Saswat0602/spotify-clone",
      demo_link: "https://spotify-clone-ek3u.vercel.app/",
      description:
        "High-fidelity music streaming application mimicking Spotify's core functionality. Showcases Web Audio API digital signal processing, responsive dark UI, and integration with Supabase.",
      long_description:
        "A production-grade music streaming web application built with Next.js, Redux, and Tailwind CSS. Implemented custom Web Audio API controls, seamless track transitions, dynamic playlist queues, persistent song caching, and Supabase authentication and database storage.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack",
      technologies: [
        "Next.js",
        "Redux",
        "Web Audio API",
        "Tailwind CSS",
        "Supabase",
        "TypeScript",
      ],
      metrics: "Live Production Demo • Sub-10ms Audio Buffering • 60fps Visualizer",
      architecture: [
        "Web Audio DSP: Custom equalizer and volume node management",
        "Range-Header Media Streaming: Progressive chunk buffering for instant track start",
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
        "Real-time video conferencing platform that allows users to create and join meetings, chat in real time, and share screens. Showcases WebRTC implementation, Socket.io signaling, and media streams.",
      long_description:
        "Full-stack real-time video conferencing application developed with WebRTC, Socket.io, Node.js, and React. Handles peer-to-peer audio/video connections, multi-participant room routing, instant in-meeting messaging, and screen capture streaming.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack",
      technologies: [
        "WebRTC",
        "Socket.io",
        "Node.js",
        "React",
        "Express.js",
      ],
      metrics: "Live Production Demo • P2P Mesh Streaming • Sub-100ms Media Latency",
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
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Full-time",
      description:
        "Leading full-stack web and mobile engineering, applied AI initiatives, automated media generation pipelines, agentic copilot SDKs, and enterprise RAG architectures.",
      responsibilities: [
        "Architected and delivered the Virtual Scholar Academy (VSA) automated HeyGen/FFmpeg video generation pipeline, slashing batch turnaround by 60%.",
        "Engineered Taskosaur Any agentic AI copilot with zero-dependency Shadow DOM SDK and hybrid pgvector RAG, achieving 98% action execution success and 384ms P95 latency.",
        "Built scalable full-stack web and mobile microservices using Next.js 15, React 19, TypeScript, Node.js, and Python FastAPI.",
        "Shipped production features for Shomes (shomes.in) spatial real estate marketplace and Mad-UI component system.",
        "Maintained high code quality and test coverage across 190k+ lines of production code with automated CI/CD pipelines.",
      ],
      skills: [
        "Next.js 15",
        "React 19",
        "React Native",
        "TypeScript",
        "AWS Bedrock",
        "Agentic AI",
        "pgvector",
        "LangGraph",
        "Python FastAPI",
        "Node.js",
        "FFmpeg",
        "Docker",
      ],
      logo: "/path_to_logo_image",
    },
    {
      title: "Junior Software Developer",
      company: "NetTantra Technologies",
      duration: "August 2023 – March 2024",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Full-time",
      description:
        "Developed responsive web and mobile application modules with React, React Native, Node.js, Express, and PostgreSQL.",
      responsibilities: [
        "Built responsive mobile and web user interfaces with React Native, Redux Toolkit, and Tailwind CSS.",
        "Created RESTful backend API endpoints with JWT authentication, role-based access control, and database migrations.",
        "Integrated real-time bidirectional messaging and WebRTC video signaling channels with Socket.io.",
        "Collaborated in sprint planning, automated testing, and production deployment cycles.",
      ],
      skills: [
        "React",
        "React Native",
        "Redux Toolkit",
        "TypeScript",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Socket.io",
        "Tailwind CSS",
        "Git",
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
      { label: "Architecture", href: "/#architecture" },
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