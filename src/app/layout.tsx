import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Saswat Ranjan Mohanty",
    "Software Engineer",
    "Full-Stack Developer",
    "Applied AI",
    "NetTantra Technologies",
    "AWS Bedrock",
    "Agentic AI",
    "RAG Pipelines",
    "pgvector",
    "Next.js",
    "React 19",
    "TypeScript",
    "Python FastAPI",
    "WebRTC",
    "FFmpeg",
  ],
  authors: [{ name: "Saswat Ranjan Mohanty" }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const themeInitScript = `
(function() {
  try {
    sessionStorage.removeItem('portfolio_intro_seen');
    localStorage.removeItem('portfolio_aesthetic');
    document.documentElement.removeAttribute('data-aesthetic');
    var theme = localStorage.getItem('portfolio_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      data-scroll-behavior="smooth"
      className="dark antialiased"
    >
      <head>
        {/* Google Fonts — bypasses next/font/google build-time metadata fetch (broken in Next 16.3.4 on Vercel) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-theme-base text-theme-primary">
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
