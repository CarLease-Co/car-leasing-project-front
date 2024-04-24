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
  APPLICATIONS = 'applications',
  APPLICATION_DETAILS_BY_ID = 'applications/application-details/:id',
  APPLICATION_DETAILS = 'applications/application-details',
  NEW_APPLICATION = 'new-application',
}
