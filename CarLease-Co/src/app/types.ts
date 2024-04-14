export interface LeaseApplication {
  id: number;
  applicantId: number;
  userName: string;
  userSurname: string;
  monthlyIncome: number;
  financialObligations: number;
  carBrand: string;
  carModel: string;
  carYear: number;
  loanAmount: number;
  loanDuration: number;
  freeTextDesc: string;
  isSubmitted: boolean;
}
export type LeaseApplications = LeaseApplication[];
