import { UserLatestAgency } from "../generated/graphql";

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

export type User = {
  email: string;

  name: string;

  picture: string;

  botNotification: boolean;

  active: boolean;

  last_login: Date;

  current_login: Date;

  userLatestAgency?: UserLatestAgency;
};

export type FilterData<T> = { name: string; values: T[]; selected?: T };

export type FetchedSkill = {
  id?: string;
  name?: string;
  desireLevel?: number;
  skillLevel?: number;
  userCount?: number;
  add?: boolean;
  description?: string;
  verified?: boolean;
  categoryId?: string;
  created_at?: Date;
  SkillTags?: SkillTag[];
  SkillTopics?: SkillTopics[];
};

export type SkillTopics = {
  topicId: number;
  skillId?: any;
};

export type Certification = {
  id: number;
  name: string;
  verified: boolean;
  certBody: string;
  UserCertifications_aggregate?: Partial<{
    aggregate: {
      count: number;
    };
  }>;
};

export type UserCertification = {
  from: string;
  to?: string;
  obtained: boolean;
  url?: string;
  Certification?: Certification;
  User?: User;
};

export type TopicItem = {
  id: string;
  name: string;
};

export type CategoryItem = {
  id: string;
  label: string;
  color?: string | null | undefined;
  x?: string | null | undefined;
  y?: string | null | undefined;
  index?: number | null | undefined;
  description?: string | null;
};

export type Tag = {
  name: string;
  id: any;
};

export type SkillTag = {
  tagId: number;
  skillId?: any;
};

export type Skill = {
  name?: string | null | undefined;
  userCount?: any | null | undefined;
  id?: string;
  skillId?: string;
  skillLevel?: any | null | undefined;
  desireLevel?: any | null | undefined;
  UserSkillDesires?: any | null;
  Category?: CategoryItem | null;
};

export type Notifications = {
  admin_email: string;
  id: string;
  checked: boolean;
  created_at: string;
  skill?: Skill | null | undefined;
};
