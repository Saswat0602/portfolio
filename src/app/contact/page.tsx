import type { Metadata } from "next";
import { ContactView } from "@/features/contact/components/ContactView";

export const metadata: Metadata = {
  title: "Contact | Saswat Ranjan Mohanty",
  description:
    "Connect with Saswat Ranjan Mohanty regarding Full-Stack & Applied AI engineering roles, automated video pipelines, or mobile app development.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-theme-base text-theme-primary transition-colors duration-300 max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ContactView />
      </div>
    </main>
  );
}
