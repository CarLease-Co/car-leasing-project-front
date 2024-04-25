export const LOGIN_RESPONSE_KEY = 'loginResponse';
export const BASE_URL = 'https://car-leasing-project-back-sandbox.onrender.com';
export const APPLICATIONS_PATH = '/api/v1/applications';
export const CAR_PATH = '/api/v1/cars';
export const LOGIN_PATH = '/api/v1/users/login';
export const USER_PATH = "api/v1/users";
export const LoanFormConfig = {
  minLoanDuration: 3,
  maxLoanDuration: 120,
  maxCarYear: new Date().getFullYear(),
  minCarYear: new Date().getFullYear() - 30,
  sliderStep: 1,
  maxExplanationLength:420,
  minMonthlyIncome: 0,
  minLoanAmount: 100,
  minFinancialObligations: 0,
};


