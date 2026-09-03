export type LoaderStyle = "curtain" | "spotlight";

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  defaultLoader: LoaderStyle;
  enableLoaderPreviewSwitcher: boolean;
  navLinks: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "Saswat Ranjan",
  title: "Saswat Ranjan | MERN & React-Native Developer",
  description:
    "Software Development Engineer specializing in React, React Native, and Node.js. Crafting high-performance web and mobile experiences.",
  url: "https://saswat.dev",
  defaultLoader: "spotlight",
  enableLoaderPreviewSwitcher: true,
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "/contact" },
  ],
};
