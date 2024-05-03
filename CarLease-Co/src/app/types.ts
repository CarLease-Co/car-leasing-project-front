import {
  APPLICATION_STATUS,
  AUTOSUGGESTOR_VALUES,
  EMPLOYEE_ROLE,
} from './enums';

export interface LeaseApplication {
  id: number;
  userId: number;
  userName: string;
  userSurname: string;
  monthlyIncome: number;
  financialObligations: number;
  carMake: string;
  carModel: string;
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
  status: APPLICATION_STATUS | null | undefined;
}
export interface Car {
  id: number;
  make: string;
  model: string;
}
export interface Autosuggestion {
  id: number;
  price: number;
  currentYear: number;
  evalStatus: AUTOSUGGESTOR_VALUES;
  application: LeaseApplication;
  evaluation: number;
}
export interface AutosuggestorForm {
  rate?: number;
  interestFrom?: number;
  interestTo?: number;
  yearFrom?: number;
  yearTo?: number;
}
export interface CarPriceForm {
  make?: string | null;
  model?: string | null;
  priceFrom?: number | null;
  priceTo?: number | null;
}
export interface NewUserForm {
  name?: string;
  surname?: string;
  role?: string;
  username?: string;
  email?: string;
  password?: string;
}
export interface LoginBody {
  username: string;
  password: string;
}
