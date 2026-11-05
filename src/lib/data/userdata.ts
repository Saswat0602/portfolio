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
}

export interface UserData {
  name: string;
  location: string;
  title: string;
  role: string;
  experience_years: string;
  introduction: string;
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
  name: "Saswat Ranjan",
  location: "Bhubaneswar, Odisha, India",
  title: "Full Stack & AI Developer",
  role: "Full Stack & AI Developer",
  experience_years: "3+ Years",
  introduction:
    "Full Stack Developer with 3+ years of experience engineering high-performance web applications, cross-platform mobile apps, and modern generative AI architectures with AWS Bedrock, vector search, and agentic workflows.",
  about: {
    current_position: "Software Development Engineer I (SDE 1) at HyScaler",
    years_of_experience: "3+ Years",
    education: {
      postgraduate: "MCA from United School of Business Management, Bhubaneswar",
      undergraduate: "BSc from Utkal University",
    },
    skills: [
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "AWS Bedrock",
      "Agentic AI",
      "RAG Pipelines",
      "Vector Search",
      "LangChain",
      "pgvector",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "WebRTC",
      "Socket.io",
      "Tailwind CSS",
      "Docker",
      "Git",
      "GitHub",
    ],
    skill_categories: [
      {
        id: "ai-rag",
        title: "Modern AI, Bedrock & RAG",
        subtitle: "Generative AI, Agentic Workflows & Embeddings",
        description:
          "Production generative AI implementations leveraging AWS Bedrock foundation models, multi-agent LangGraph workflows, hybrid semantic RAG with pgvector, and automated guardrails.",
        skills: [
          { name: "AWS Bedrock", highlight: "Claude 3.5 Sonnet & Titan integration" },
          { name: "Agentic AI", highlight: "Autonomous multi-agent LangGraph workflows" },
          { name: "RAG Pipelines", highlight: "Contextual retrieval, dynamic chunking & citations" },
          { name: "Vector Search", highlight: "pgvector similarity search & HNSW indexing" },
          { name: "LangChain / LangGraph", highlight: "Tool-calling, chaining & stateful agent graphs" },
          { name: "Guardrails & Safety", highlight: "Prompt safety, PII filtering & hallucination reduction" },
        ],
      },
      {
        id: "fullstack-web",
        title: "Full Stack & Web Engineering",
        subtitle: "Type-Safe, Performant Frontends & Backends",
        description:
          "End-to-end full stack development crafting responsive user interfaces with Next.js and React alongside robust Node.js, Express, and RESTful API backend microservices.",
        skills: [
          { name: "Next.js & React", highlight: "App Router, Server Components & responsive architecture" },
          { name: "TypeScript & JavaScript", highlight: "Strict type safety, modern ESNext design patterns" },
          { name: "Node.js & Express.js", highlight: "Asynchronous backend APIs & microservices" },
          { name: "Tailwind CSS", highlight: "Clean design systems, dark themes & sleek components" },
          { name: "State Architecture", highlight: "Redux Toolkit, Zustand & deterministic caching" },
          { name: "RESTful & Streaming APIs", highlight: "Server-Sent Events (SSE) & resilient REST endpoints" },
        ],
      },
      {
        id: "mobile-realtime",
        title: "Mobile & Real-Time Comms",
        subtitle: "Cross-Platform Apps & Live Streaming",
        description:
          "Building native-feeling mobile applications with React Native and low-latency real-time collaboration platforms utilizing WebRTC and Socket.io.",
        skills: [
          { name: "React Native", highlight: "Cross-platform iOS & Android mobile applications" },
          { name: "WebRTC", highlight: "Peer-to-peer audio, video conferencing & screen sharing" },
          { name: "Socket.io & WebSockets", highlight: "Bidirectional real-time messaging & live sync" },
          { name: "Web Audio API", highlight: "Custom audio DSP nodes & interactive visualizers" },
          { name: "Mobile State & Nav", highlight: "React Navigation, offline caching & mobile gestures" },
          { name: "Payment Gateways", highlight: "Secure mobile checkout & transaction handling" },
        ],
      },
      {
        id: "cloud-databases",
        title: "Databases, Cloud & DevOps",
        subtitle: "Reliable Persistence & Modern Deployment",
        description:
          "Data modeling, indexing, and cloud deployment across relational and document databases, Docker containerization, and automated CI/CD pipelines.",
        skills: [
          { name: "PostgreSQL & pgvector", highlight: "Relational modeling, vector embedding queries & indexing" },
          { name: "MongoDB & Mongoose", highlight: "Document schemas, aggregations & cluster persistence" },
          { name: "Redis Caching", highlight: "Semantic cache-aside, rate limiting & session storage" },
          { name: "Docker", highlight: "Containerized application workflows & minimal runtime images" },
          { name: "AWS Cloud Services", highlight: "Bedrock, S3, ECS & serverless integrations" },
          { name: "Git & GitHub Actions", highlight: "Automated linting, testing, and continuous deployment" },
        ],
      },
    ],
    description:
      "I'm a Full Stack Developer (SDE 1) at HyScaler, specializing in React, React Native, Node.js, and modern AI engineering. With a Master's in Computer Applications (MCA) from United School of Business Management, Bhubaneswar, I build high-performance web platforms, real-time communication systems, and production-ready generative AI solutions.",
    description2:
      "My work bridges scalable backend systems, responsive frontend interfaces, and cutting-edge AI architectures—including enterprise RAG pipelines on AWS Bedrock, vector search indexing, and autonomous agentic workflows.",
    location: "Bhubaneswar, Odisha, India",
    email: "saswatranjan0602@gmail.com",
  },
  Projects: [
    {
      slug: "bedrock-rag-pipeline",
      project_name: "Enterprise Bedrock RAG & Multi-Agent Intelligence Engine",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Enterprise-grade Retrieval-Augmented Generation (RAG) platform powered by AWS Bedrock (Claude 3.5 Sonnet & Titan) and pgvector. Features hybrid keyword + semantic search, automated chunking pipelines, contextual re-ranking, and multi-agent query routing with streaming token outputs.",
      long_description:
        "Designed and implemented an end-to-end enterprise RAG infrastructure capable of processing technical documentation and enterprise knowledge bases. Utilized AWS Bedrock for foundation model inference, combined with pgvector for high-dimensional vector embeddings and Cohere Rerank for contextual precision. Integrated LangGraph for multi-agent query routing, enabling automatic routing between semantic search, live database querying, and external tool execution with sub-150ms retrieval latency.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      category: "AI & RAG",
      technologies: [
        "AWS Bedrock",
        "Claude 3.5 Sonnet",
        "Agentic AI",
        "RAG Pipelines",
        "pgvector",
        "LangChain",
        "Python FastAPI",
        "Next.js",
      ],
      metrics: "Sub-150ms retrieval • 98.4% groundedness score • Hybrid Vector Search",
      architecture: [
        "Hybrid Search: Combines BM25 lexical search with pgvector cosine similarity",
        "Cross-Encoder Re-Ranking: Cohere Rerank filters top-k candidate chunks for higher recall",
        "Guardrails & Safety: Bedrock guardrails filter sensitive content and prompt injections",
        "Streaming Response: Server-Sent Events (SSE) stream tokens directly to Next.js clients",
      ],
      highlights: [
        "Integrated AWS Bedrock foundation models with real-time vector retrieval",
        "Reduced token hallucination rates via citation-verified chunk matching",
        "Engineered semantic caching in Redis to reduce redundant inference calls",
      ],
    },
    {
      slug: "spotify-music-app",
      project_name: "Spotify-Music-App",
      code_link: "https://github.com/Saswat0602/spotify-clone",
      demo_link: "https://spotify-clone-ek3u.vercel.app/",
      description:
        "High-fidelity music streaming application mimicking Spotify's core functionality. The project showcases advanced state management, Web Audio API processing, responsive dark UI, and integration with Supabase.",
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
        "Real-time video conferencing platform that allows users to create and join meetings, chat in real time, and share screens. Showcases WebRTC implementation, Socket.io signaling, and real-time media stream handling.",
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
    {
      slug: "yelp-camp",
      project_name: "Yelp-Camp",
      code_link: "https://github.com/Saswat0602/YELP-CAMP-PROJECT.git",
      description:
        "Comprehensive full stack camping platform built with Node.js, Express, MongoDB, and React/Bootstrap. Features full CRUD workflows, session authentication, cluster mapping, review ratings, and cloud image uploads.",
      long_description:
        "Full-featured web application allowing outdoor enthusiasts to discover, review, and create campgrounds around the world. Demonstrates RESTful API design, database schema modeling with Mongoose, user authorization, Mapbox geocoding and cluster maps, and Cloudinary image storage.",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop",
      category: "Full Stack",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "REST API",
        "Bootstrap",
      ],
      metrics: "Full CRUD Architecture • Authentication & Authorization • Geocoding",
      architecture: [
        "RESTful Routing: Complete resource endpoints for campgrounds, reviews, and users",
        "Session Security: Cookie-based sessions, password hashing, and authorization middleware",
        "Geocoding & Maps: Forward geocoding with interactive cluster visualization",
      ],
      highlights: [
        "Engineered full CRUD operations with client and server-side schema validations",
        "Integrated Mapbox interactive cluster map to display campground locations",
        "Implemented multi-image uploads with Cloudinary cloud storage",
      ],
    },
    {
      slug: "food-ordering-app",
      project_name: "Food-Ordering-App",
      code_link: "https://github.com/Saswat0602/food-website.gethub.io.git",
      description:
        "Mobile food ordering application built with React Native and Firebase. Allows users to browse restaurants, view menus, manage carts, and place orders with integrated payment gateway flows.",
      long_description:
        "Cross-platform mobile application engineered with React Native and Redux for global cart state management. Features Firebase Firestore for real-time menu and order synchronization, user authentication, and payment gateway checkout.",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1200&auto=format&fit=crop",
      category: "Mobile",
      technologies: [
        "React Native",
        "Firebase",
        "Redux",
        "Payment Gateway",
        "JavaScript",
      ],
      metrics: "Cross-Platform Mobile • Real-Time Order Sync • Payment Integration",
      architecture: [
        "Firebase Firestore: Real-time listeners for instant restaurant menu updates",
        "Redux Cart Store: Optimistic cart updates with tax and discount calculation",
        "Payment Gateway Integration: Secure mobile checkout and transaction handling",
      ],
      highlights: [
        "Designed clean mobile navigation with smooth tab and stack transitions",
        "Integrated Firebase Authentication with persistent session management",
        "Real-time order tracking dashboard with status progression",
      ],
    },
    {
      slug: "autonomous-ai-workflow",
      project_name: "Autonomous Agentic AI Workflow Platform",
      code_link: "https://github.com/Saswat0602",
      demo_link: "https://github.com/Saswat0602",
      description:
        "Scalable autonomous multi-agent orchestration engine coordinating tool-using AI agents for multi-step task execution, code validation, and dynamic knowledge synthesis with deterministic guardrails.",
      long_description:
        "Autonomous multi-agent framework built with LangGraph and Python FastAPI. The platform coordinates specialized agents (Planner, Tool Executor, Critic) that iteratively break down complex engineering tasks, invoke external APIs, and synthesize verified solutions.",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
      category: "Agentic AI",
      technologies: [
        "Agentic AI",
        "LangGraph",
        "FastAPI",
        "Python",
        "AWS Bedrock",
        "Docker",
        "TypeScript",
      ],
      metrics: "Multi-Agent Coordination • Tool-Calling Workflows • Deterministic Guardrails",
      architecture: [
        "Cyclic Graph State: Stateful agent workflow orchestration via LangGraph",
        "Dynamic Tool Dispatch: Secure function calling and sandboxed execution",
        "Guardrails & Verification: Output verification loop preventing hallucinations",
      ],
      highlights: [
        "Engineered autonomous query planning and iterative refinement loops",
        "Built telemetry dashboard tracking agent execution steps and token consumption",
        "Implemented structured schema validation on all tool inputs and outputs",
      ],
    },
    {
      slug: "movie-app",
      project_name: "Movie-App",
      code_link: "https://github.com/Saswat0602",
      description:
        "Mobile application providing users with up-to-date movie information, ratings, descriptions, cast details, and trailers. Demonstrates external API integration and mobile UI design principles.",
      long_description:
        "Cross-platform mobile movie discovery application developed with React Native and JavaScript. Connects with movie databases via asynchronous REST endpoints to present trending releases, search filters, and video trailers in an intuitive mobile interface.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
      category: "Mobile",
      technologies: [
        "React Native",
        "JavaScript",
        "API Integration",
        "Mobile UI",
      ],
      metrics: "TMDB API Integration • Fluid Animations • Offline Cache",
      architecture: [
        "Asynchronous Data Fetching: Debounced search queries with cached results",
        "Mobile Layout Optimization: Virtualized list rendering for smooth 60fps scrolling",
        "Media Embedding: Native video player integration for movie trailers",
      ],
      highlights: [
        "Implemented search with instant keyword autocomplete and genre filtering",
        "Designed dark-mode mobile UI optimized for both iOS and Android devices",
        "Handled network states and offline image caching seamlessly",
      ],
    },
    {
      slug: "note-taker",
      project_name: "Note-Taker",
      code_link: "https://github.com/Saswat0602/notebook.git",
      description:
        "Minimalist, responsive web application for creating, organizing, and searching notes. Demonstrates clean JavaScript architecture, local storage persistence, and fast UI interactions.",
      long_description:
        "Client-side productivity note application built with vanilla JavaScript, HTML5, and CSS3. Features instant note creation, tag-based categorization, full-text live search, and persistent browser LocalStorage saving.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
      category: "Web Application",
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "LocalStorage",
      ],
      metrics: "Zero-Dependency Core • Instant Search • Offline Persistence",
      architecture: [
        "Client State Management: Event-driven DOM updates synced with LocalStorage",
        "Fast Text Filtering: Client-side regex indexing for instant note retrieval",
        "Responsive Grid: Clean, distraction-free markdown note editor",
      ],
      highlights: [
        "Built with lightweight modular JavaScript without heavy framework overhead",
        "Instant search filtering notes across titles and body contents in real time",
        "Zero-latency autosave ensuring user notes are never lost",
      ],
    },
  ],
  experience: [
    {
      title: "Software Development Engineer 1",
      company: "HyScaler",
      duration: "Apr 2024 - Present",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Full-time",
      description:
        "Working on Full Stack development, React Native, and architecting scalable web and mobile applications alongside modern Generative AI integrations including AWS Bedrock and enterprise RAG pipelines.",
      responsibilities: [
        "Engineered production full-stack features using React, Next.js, React Native, Node.js, and TypeScript, delivering responsive experiences across web and mobile platforms.",
        "Integrated AWS Bedrock foundation models (Claude & Titan) and pgvector semantic retrieval pipelines, accelerating knowledge discovery and operational efficiency.",
        "Developed and maintained RESTful microservices, WebSocket real-time channels, and PostgreSQL/MongoDB databases with optimized query performance.",
        "Collaborated in agile sprint cycles, performed peer code reviews, and implemented automated CI/CD deployment pipelines on GitHub Actions.",
      ],
      skills: [
        "React",
        "React Native",
        "Next.js",
        "Node.js",
        "AWS Bedrock",
        "RAG Pipelines",
        "TypeScript",
        "PostgreSQL",
        "MongoDB",
        "Socket.io",
      ],
      logo: "/path_to_logo_image",
    },
    {
      title: "Junior Software Developer",
      company: "HyScaler",
      duration: "Apr 2024 - Apr 2024",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Full-time",
      description:
        "Worked on Django REST Framework, React Native, Redux-toolkit, and developing multiple web and mobile application modules.",
      responsibilities: [
        "Built responsive mobile and web user interfaces with React Native, Redux-toolkit, and Tailwind CSS.",
        "Created backend API endpoints with authentication, input validation, and database migrations.",
        "Integrated real-time messaging and event notifications using Socket.io and PostgreSQL.",
      ],
      skills: [
        "Django REST Framework",
        "React Native",
        "Redux-toolkit",
        "Tailwind CSS",
        "Socket.io",
        "PostgreSQL",
        "Sqlite",
      ],
      logo: "/path_to_logo_image",
    },
    {
      title: "Apprentice Trainee",
      company: "HyScaler",
      duration: "Aug 2023 - Mar 2024 (8 mos)",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Trainee",
      description:
        "Gained intensive hands-on experience in React.js, React Native, Node.js, Express.js, MongoDB, payment gateway integration, and other modern web technologies.",
      responsibilities: [
        "Developed full-stack web modules using React.js, Node.js, and Express.js with REST API patterns.",
        "Implemented payment gateway workflows and third-party API integrations.",
        "Practiced clean coding standards, version control branching strategies, and database modeling.",
      ],
      skills: [
        "React.js",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Payment Gateway",
        "Git",
        "JavaScript",
      ],
      logo: "/path_to_logo_image",
    },
  ],
  contact: {
    message:
      "Whether you are looking to hire for Full Stack & AI engineering roles, architect AWS Bedrock & RAG systems, or develop cross-platform mobile apps, let's talk.",
    availability: "Available for Full Stack & AI Engineering roles (Remote, Hybrid, or On-site).",
  },
  footer: {
    title: "Saswat.dev",
    description:
      "Full Stack Developer with 3+ years of experience specializing in React, React Native, Node.js, and modern AI engineering (AWS Bedrock & RAG). Based in Bhubaneswar, Odisha, India.",
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
      phone: "+91 (Available on request)",
      availability: "Available for new opportunities",
    },
    copyright: "© 2025 Saswat Ranjan. All rights reserved.",
  },
};

export default userData;