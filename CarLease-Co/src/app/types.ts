export interface LeaseApplication {
  id: number;
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
  id: number;
  name: string;
  surname: string;
  role: string;
  username: string;
  email: string;
  jwt: string;
  password: string;
}
export interface LoginResponse {
  id: number;
  role: string;
}
