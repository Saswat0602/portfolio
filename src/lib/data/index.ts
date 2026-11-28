import userData, {
  type UserData,
  type ProjectData,
  type ExperienceData,
  type AboutData,
  type FooterData,
} from "./userdata";

export * from "./userdata";
export * from "./companion";
export { userData };

import {
  CHARACTER_STYLES,
  MOODS,
  SNACKS,
  COMPANION_PORTFOLIO_PROJECTS,
  type CharacterStyleMeta,
  type MoodMeta,
  type SnackMeta,
  type CompanionProjectCard,
} from "./companion";

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

export function getCompanionStyles(): readonly CharacterStyleMeta[] {
  return CHARACTER_STYLES;
}

export function getCompanionMoods(): readonly MoodMeta[] {
  return MOODS;
}

export function getCompanionSnacks(): readonly SnackMeta[] {
  return SNACKS;
}

export function getCompanionPortfolioProjects(): readonly CompanionProjectCard[] {
  return COMPANION_PORTFOLIO_PROJECTS;
}
