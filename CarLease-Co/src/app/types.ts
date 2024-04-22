import {EMPLOYEE_ROLE} from "./enums";

export interface LeaseApplication {
  applicationId: number;
  user: User;
  userName: string;
  userSurname: string;
  monthlyIncome: number;
  financialObligations: number;
  carId: number;
  loanAmount: number;
  loanDurationInMonths: number;
  textExplanation: string;
  submitted: boolean;
  endDate: Date;
  startDate: Date;
  status: string;
}
export type LeaseApplications = LeaseApplication[];
export interface User {
  name: string;
  role: string;
  surname: string;
  userId: number;
}

export interface Employee {
  userId: number;
  name: string;
  surname: string;
  role: EMPLOYEE_ROLE;
  email: string;
  password: string;
}
