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

export type FetchedSkill = {
  id: string;
  name: string;
  desireLevel?: number;
  skillLevel?: number;
  userCount?: number;
  add?: boolean;
  verified?: boolean;
  categoryId?: string;
};

export type Certification = {
  id: number;
  name: string;
  verified: boolean;
  certBody: string;
};

export type UserCertification = {
  from: string;
  to?: string;
  obtained: boolean;
  url?: string;
  Certification: Certification;
};
