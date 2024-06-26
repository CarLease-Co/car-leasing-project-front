import { EMPLOYEE_ROLE } from './enums';

export interface LeaseApplication {
  id: number;
  user: User;
  userName: string;
  userSurname: string;
  monthlyIncome: number;
  financialObligations: number;
  car: Car;
  manufactureDate: number;
  loanAmount: number;
  loanDuration: number;
  textExplanation: string;
  submitted: boolean;
  endDate: Date;
  startDate: Date;
  status: string;
}
export type LeaseApplications = LeaseApplication[];
export interface User {
  userId: number;
  name: string;
  surname: string;
  role: string;
  username: string;
  email: string;
  password: string;
}
export interface LoginResponse {
  userId: number;
  role: string;
}
export interface Car {
  id: number;
  make: string;
  model: string;
  priceFrom: number;
  priceTo: number;
}
export interface Employee {
  userId: number;
  name: string;
  surname: string;
  role: EMPLOYEE_ROLE;
  email: string;
  password: string;
}

export interface LeaseApplicationForm {
  userId: number | null | undefined;
  monthlyIncome: number | null;
  financialObligations: number | null;
  carMake: string | null;
  carModel: string | null;
  manufactureDate: number | null;
  textExplanation: string | null;
  loanDuration: number | null;
  loanAmount: number | null;
  startDate: string | null;
}
export interface Car {
  id: number;
  make: string;
  model: string;
}
