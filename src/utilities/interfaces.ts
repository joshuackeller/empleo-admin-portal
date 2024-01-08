export interface BaseSelf {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_confirmed: string;
  created_at: string;
  updated_at: string;
}
export interface Self extends BaseSelf {}

export interface BaseAdmin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
export interface Admin extends BaseAdmin {}

export interface BaseOrganization {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}
export interface Organization extends BaseOrganization {}

export interface BaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_confirmed: string;
  created_at: string;
  updated_at: string;
}
export interface User extends BaseUser {}
