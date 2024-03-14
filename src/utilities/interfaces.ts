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

export enum Layout {
  one = "one",
  two = "two",
  three = "three",
  four = "four",
  five = "five",
}

export interface BaseOrganization {
  id: string;
  slug: string;
  title: string;
  logo: {
    id: string;
    url: string;
  } | null;
  banner: {
    id: string;
    url: string;
  } | null;
  headerFont: Font;
  bodyFont: Font;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  layout: Layout;
  description: string | null;
  longDescription: string | null;
  eeocEnabled: boolean;
  veteranEnabled: boolean;
  disabilityEnabled: boolean;
  raceEnabled: boolean;
  genderEnabled: boolean;
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

export enum EmploymentType {
  full_time = "full_time",
  part_time = "part_time",
  seasonal = "seasonal",
  internship = "internship",
  contract = "contract",
  temporary = "temporary",
}

export interface BaseListing {
  id: string;
  published: boolean;
  jobTitle: string;
  location: string | null;
  employmentType: EmploymentType | null;
  salaryRange: string | null;
  jobDescription: string | null;
  shortDescription: string | null;
  jobRequirements: string | null;
  linkedInUrlEnabled: boolean;
  noteEnabled: boolean;
  resumeEnabled: boolean;
  coverLetterEnabled: boolean;
  availableStartDateEnabled: boolean;
  phoneEnabled: boolean;
  addressEnabled: boolean;
  cityEnabled: boolean;
  stateEnabled: boolean;
  zipEnabled: boolean;
  usAuthorizedEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Listing extends BaseListing {}

enum Status {
  new = "new",
  in_review = "in_review",
  rejected = "rejected",
  interview = "interview",
  offer_pending = "offer_pending",
  offer_accepted = "offer_accepted",
  offer_rejected = "offer_rejected",
}

export enum Gender {
  male = "male",
  female = "female",
  prefer_not_to_say = "prefer_not_to_say",
  other = "other",
}

export interface BaseApplication {
  id: string;
  status: Status;
  listingId: string;
  firstName: string;
  lastName: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  note: string | null;
  linkedInUrl: string | null;
  resumeId: string | null;
  coverLetterId: string | null;
  usAuthorized: boolean | null;
  availableStartDate: string | null;
  eeocRace: string | null;
  eeocVeteranStatus: string | null;
  eeocDisabilityStatus: string | null;
  eeocGender: Gender | null;
  createdAt: string;
  updatedAt: string;
}

export interface Application extends BaseApplication {
  resume: BaseFile | null;
  coverLetter: BaseFile | null;
}

enum FileType {
  doc = "doc",
  docx = "docx",
  pdf = "pdf",
  png = "png",
  jpeg = "jpeg",
  pages = "pages",
  unknown = "unknown",
}

export interface BaseFile {
  id: string;
  name: string;
  url: string;
  fileType: FileType;
  createdAt: string;
  updatedAt: string;
}

export interface File extends BaseFile {}

export interface BaseApplicationNote {
  id: string;
  applicationId: string;
  admin: BaseAdmin;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationNote extends BaseApplicationNote {}
