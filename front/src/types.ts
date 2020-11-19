export type User = {
  firstName: string;
  lastName: string;
  email: string;
  agencyId: string;
};

export type AppState = {
  user?: User;
  agencies: { id: string }[];
};

export type AppStateContext = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};
