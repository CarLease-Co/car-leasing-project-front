import {EMPLOYEE_ROLE} from "./enums";

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
   userId: number;
   monthlyIncome: number;
   financialObligations: number;
   carMake: string;
   carModel: string;
   manufactureDate: number;
   textExplanation: string;
   loanDuration: number;
   loanAmount: number;
   startDate: Date;

}
