export type AuthenticationResult = {
  token?: string;
  user?: any;
  error?: Error;
  isLoading: boolean;
};

export type FetchResult<T> = {
  data?: T;
  error?: Error;
  isLoading: Boolean;
};

export type FilterData<T> = { name: string; values: T[]; selected?: T };
