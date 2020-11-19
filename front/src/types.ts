export type AppState = {
  user: {
    first_name?: string;
    last_name?: string;
    email?: string;
    agency?: string;
  };
  agencies: { id: string; name: string }[];
};

export type AppStateContext = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
};
