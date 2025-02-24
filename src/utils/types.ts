import { Timestamp } from '@/utils/firebase';

export interface TechStacks {
  name: string;
  logoUrl: string;
};

export interface HomePageData {
  title: string;
  welcomeMessage: string;
  introduction: string;
  heroImage?: string;
  techStacks: TechStacks[];
};

export interface AboutPageData {
  bio: string;
  bioImage: string;
  details: string[];
};

export interface NavItemProps {
  href: string;
  text: string;
  onClick?: () => void;
};

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  position: number;
};

export interface TechArticlesProps {
  title: string;
  description: string;
  image: string;
  date: Timestamp;
  link: string;
};

export interface HandleClickAnalyticsParams {
  buttonName: string;
  screenName: string;
};

export interface HandleFormSubmitAnalyticsParams {
  formName: string;
  pagePath: string;
  success: boolean;
};
