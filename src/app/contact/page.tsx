import type { Metadata } from "next";
import { ContactView } from "@/features/contact/components/ContactView";

export const metadata: Metadata = {
  title: "Contact | Saswat Ranjan",
  description:
    "Connect with Saswat Ranjan regarding Full Stack & AI Developer roles, AWS Bedrock & enterprise RAG pipelines, or mobile app development.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen py-16 px-6 sm:px-8 bg-theme-base text-theme-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ContactView />
      </div>
    </main>
  );
}
