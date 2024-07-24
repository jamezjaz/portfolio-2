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
