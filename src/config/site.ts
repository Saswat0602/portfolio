export type LoaderStyle = "spotlight" | "curtain";

export interface SiteConfig {
  name: string;
  title: string;
  role: string;
  description: string;
  url: string;
  defaultLoader: LoaderStyle;
  enableLoaderPreviewSwitcher: boolean;
  navLinks: { label: string; href: string }[];
  socialLinks: { label: string; href: string; icon: string }[];
}

export const siteConfig: SiteConfig = {
  name: "Saswat Ranjan",
  title: "Saswat Ranjan | Full Stack & AI Developer",
  role: "Full Stack & AI Developer",
  description:
    "Full Stack Developer with 3+ years of experience specializing in React, React Native, Node.js, and modern AI engineering including AWS Bedrock, Agentic AI, and RAG pipelines.",
  url: "https://saswat.dev",
  defaultLoader: "spotlight",
  enableLoaderPreviewSwitcher: true,
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Saswat0602", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saswat0602", icon: "linkedin" },
    { label: "Email", href: "mailto:saswatranjan0602@gmail.com", icon: "mail" },
  ],
};
