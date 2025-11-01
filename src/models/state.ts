export interface UserInfo {
  address: string;
  email: string;
  nas: number;
}

export interface CompletionState {
  orderedPizzas: boolean;
  driversLicense: boolean;
  classChoice: boolean;
}

export interface DangerState {
  fakeEmailChance: number;
}

export interface Email {
  subject: string;
  sender: string;
  date: string;
  read: boolean;
  important: boolean;
  content: string;
}

export interface Tab {
  icon: string;
  title: string;
  url: string;
}

export interface DormState {
  windowOpen: boolean;
}

export interface PageContent {
  title: string;
  mainContent: string;
  image: string;
  action: string;
  footer: string;
}

export interface WebPage {
  domain: string;
  title: string;
  description: string;
  url: string;
}
