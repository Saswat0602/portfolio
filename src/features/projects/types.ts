export interface Project {
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
