export type StoredUser = {
  email: string;
  agency: string;
};

export type StoredAgency = {
  name: string;
};

export type StoredTopic = {
  id: string;
  name: string;
};

export type StoredSkill = {
  id: string;
  name: string;
};

export type SkillInput = {
  id: string;
  name: string;
  level: number;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  agency: string;
};

export type AppState = {
  user?: User;
  agencies?: string[];
  token?: string;
  initialized: boolean;
};

export type AppStateContext = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};
