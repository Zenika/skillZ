export type StoredUser = {
  email: string;
  agency: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  agency: string;
};

export type AppState = {
  user?: User;
  agencies: string[];
  token?: string;
  initialized: boolean;
};

export type AppStateContext = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};
