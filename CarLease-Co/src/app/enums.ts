export enum EMPLOYEE_ROLE {
  APPLICANT = 'APPLICANT',
  REVIEWER = 'REVIEWER',
  APPROVER = 'APPROVER',
  BUSINESS_ADMIN = 'BUSINESS_ADMIN',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}
export enum APPLICATION_STATUS {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  REVIEW_APPROVED = 'REVIEW_APPROVED',
  REVIEW_DECLINED = 'REVIEW_DECLINED',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}
export enum ROUTES {
  HOME = '',
  LOGIN = 'login',
  SYS_ADMIN_VIEW = 'sysadmin-view',
  AUTOSUGGESTOR_FORM = 'autosuggestor-form',
  CAR_PRICE_MODIFIER = 'car-price-modifier',
  APPLICATIONS = 'applications',
  APPLICATION_DETAILS_BY_ID = 'applications/application-details/:id',
  APPLICATION_DETAILS = 'applications/application-details',
  NEW_APPLICATION = 'new-application',
  NEW_APPLICATION_BY_ID = 'new-application/:id',
  EDIT_APPLICATION = 'applications/application-details/edit',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  EDIT_APPLICATION_BY_ID = 'applications/application-details/edit/:id',
}

export enum USER_PROPERTIES {
  USERNAME = 'username',
  SURNAME = 'surname',
  FULL_NAME = 'fullName',
  USER_ID = 'userId',
  ROLE = 'role',
  EMAIL = 'email',
  PASSWORD = 'password',
}
export enum FORM_FIELDS {
  CAR_MAKE = 'carMake',
  CAR_MODEL = 'carModel',
  LOAN_DURATION = 'loanDuration',
  MANUFACTURE_DATE = 'manufactureDate',
  NOT_SET = 'Not set',
}
export enum CAR_FORM_FIELDS {
  CAR_MAKE = 'make',
  CAR_MODEL = 'model',
}

export enum AUTOSUGGESTOR_VALUES {
  BAD = 'BAD',
  GOOD = 'GOOD',
  MAYBE = 'MAYBE',
}
export enum ERROR_MESSAGES {
  WRONG_CREDENTIALS = 'Wrong username or password. Try again.',
  GENERIC_ERROR = 'Something went wrong. Try again later.',
}
export enum DISPLAY_OPTIONS {
  NONE = 'none',
  BLOCK = 'block',
}
