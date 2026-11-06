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
  name: "Saswat Ranjan Mohanty",
  title: "Saswat Ranjan Mohanty | Software Engineer • Full-Stack & Applied AI",
  role: "Software Engineer • Full-Stack & Applied AI",
  description:
    "Software Engineer with 3+ years of experience specializing in Full-Stack Web, Cross-Platform Mobile, and Applied AI Engineering (AWS Bedrock, pgvector RAG, & Agentic Copilots).",
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
