import userData, {
  type UserData,
  type ProjectData,
  type ExperienceData,
  type AboutData,
  type FooterData,
} from "./userdata";

export * from "./userdata";
export { userData };

export function getUserData(): UserData {
  return userData;
}

export function getProjects(): ProjectData[] {
  return userData.Projects;
}

export function getExperience(): ExperienceData[] {
  return userData.experience;
}

export function getAbout(): AboutData {
  return userData.about;
}

export function getFooter(): FooterData {
  return userData.footer;
}

export function getSkills(): string[] {
  return userData.about.skills;
}
