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

export enum Font {
  inter = "inter",
  notoSerif = "notoSerif",
}

export interface BaseOrganization {
  id: string;
  slug: string;
  title: string;
  logo: {
    id: string;
    url: string;
  } | null;
  headerFont: Font;
  bodyFont: Font;
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

export interface BaseListing {
  id: string;
  published: boolean;
  jobTitle: string;
  location: string | null;
  employmentType: string | null;
  salaryRange: string | null;
  jobDescription: string | null;
  jobRequirements: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Listing extends BaseListing {}
