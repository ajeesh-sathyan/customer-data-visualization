import { ICustomer } from "./CustomerTypes";

export type AppAction =
  | {
      type: "SET_CUSTOMERS";
      payload: ICustomer[];
    }
  | {
      type: "DELETE_CUSTOMERS";
      payload: ICustomer[];
    }
  | {
      type: "ADD_CUSTOMER";
      payload: ICustomer;
    }
  | {
      type: "UPDATE_CUSTOMER";
      payload: ICustomer;
    };
