import { AppAction } from "../Types/ActionTypes";
import { ICustomer } from "../Types/CustomerTypes";

export const setCustomers = (users: ICustomer[]): AppAction => ({
  type: "SET_CUSTOMERS",
  payload: users,
});

export const deleteCustomers = (users: ICustomer[]): AppAction => ({
  type: "DELETE_CUSTOMERS",
  payload: users,
});

export const addCustomer = (user: ICustomer): AppAction => ({
  type: "ADD_CUSTOMER",
  payload: user,
});
export const updateCustomer = (user: ICustomer): AppAction => ({
  type: "UPDATE_CUSTOMER",
  payload: user,
});
