export type AppState = {
    first_name?: string;
    last_name?: string;
    email?: string;
    agency?: string; 
}

export type AppStateContext = {
    appState: AppState;
    readonly appSnapshot: AppState;
}