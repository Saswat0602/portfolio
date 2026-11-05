import { userData, type ProjectData } from "@/lib/data";

export function getAllProjects(): ProjectData[] {
  return userData.Projects;
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return userData.Projects.find(
    (p) => p.slug === slug || p.project_name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );
}

export function getProjectsByCategory(category: string): ProjectData[] {
  if (!category || category === "all") return userData.Projects;
  return userData.Projects.filter(
    (p) => p.category.toLowerCase().includes(category.toLowerCase())
  );
}
