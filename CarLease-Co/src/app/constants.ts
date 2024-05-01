export const LOGIN_RESPONSE_KEY = 'loginResponse';
export const BASE_URL = 'https://car-leasing-project-back-sandbox.onrender.com';
export const APPLICATIONS_PATH = '/api/v1/applications';
export const CAR_PATH = '/api/v1/cars';
export const CAR_PATCH_PATH = '/api/v1/cars/';
export const LOGIN_PATH = '/api/v1/users/login';
export const USER_PATH = "api/v1/users";
export const AUTOSUGGESTOR_PATH = '/api/v1/interest-rates';
export const PERCENTAGE_PRECISION_VALUE = 4;
export const CONVERT_FROM_PERCENTAGE_VALUE = 100;
export const LoanFormConfig = {
  minLoanDuration: 3,
  maxLoanDuration: 120,
  maxCarYear: new Date().getFullYear(),
  minCarYear: new Date().getFullYear() - 30,
  sliderStep: 1,
  maxExplanationLength: 420,
  minMonthlyIncome: 0,
  minLoanAmount: 100,
  minFinancialObligations: 0,
  minCarPrice: 1,
};
export const AutosuggestorFormConfig = {
  maxCarYear: new Date().getFullYear(),
  minCarYear: new Date().getFullYear() - 30,
  minInterestPercentage: 1,
  maxInterestPercentage: 100,
  minMonthlyExpenses: 1,
};
