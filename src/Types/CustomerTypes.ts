export enum Gender {
  Male = 0,
  Female = 1,
}

export interface ICustomer {
  "customer name": string;
  "customer e-mail": string;
  country: string;
  gender: Gender;
  age: number;
  "annual Salary": number;
  "credit card debt": number;
  "net worth": number;
  "car purchase amount": number;
}
