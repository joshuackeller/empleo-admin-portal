export interface BaseSelf {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}
export interface Self extends BaseSelf {}

export interface BaseAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface Admin extends BaseAdmin {}

export interface BaseOrganization {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
export interface Organization extends BaseOrganization {}

export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}
export interface User extends BaseUser {}
