export interface User {
    id: string;
    email?: string;
    full_name?: string;
    username?: string;
}

export interface GeneratedRoadmap {
  keySkills: {
    category: string;
    skills: string[];
  }[];
  roadmap: {
    step: number;
    duration: string;
    title: string;
    description: string;
  }[];
  projectIdeas: {
    title: string;
    description: string;
  }[];
}
