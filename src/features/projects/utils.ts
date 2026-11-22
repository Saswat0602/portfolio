import { userData, type ProjectData } from "@/lib/data";

export function getAllProjects(): ProjectData[] {
  return userData.Projects;
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  const normalized = slug.toLowerCase();
  return userData.Projects.find(
    (p) =>
      p.slug === normalized ||
      p.project_name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized ||
      // Backward-compatible slug aliases
      (normalized === "taskosaur-any" && p.slug === "orbito") ||
      (normalized === "mad-ui" && p.slug === "oryn-ui") ||
      (normalized === "virtual-scholar-academy" && p.slug === "ai-learning-platform") ||
      (normalized === "vsa" && p.slug === "ai-learning-platform") ||
      (normalized === "biometric-attendance-suite" && p.slug === "attendance-app")
  );
}

export function getProjectsByCategory(category: string): ProjectData[] {
  if (!category || category === "all") return userData.Projects;
  return userData.Projects.filter(
    (p) => p.category.toLowerCase().includes(category.toLowerCase())
  );
}
