import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme/ThemeContext";

const outfit = Outfit({
  variable: "--font-heading-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
};

const themeInitScript = `
(function() {
  try {
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
      className={`${outfit.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} dark h-full antialiased w-full max-w-full overflow-x-hidden`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-theme-base text-theme-primary transition-colors duration-200 w-full max-w-full overflow-x-hidden">
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16 w-full max-w-full overflow-x-hidden">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
