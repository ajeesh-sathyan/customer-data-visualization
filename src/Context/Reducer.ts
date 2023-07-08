import { AppAction } from "../Types/ActionTypes";
import { IAppState } from "../Types/StateTypes";
import { ICustomer } from "../Types/CustomerTypes";

export const reducer = (state: IAppState, action: AppAction): IAppState => {
  debugger;
  switch (action.type) {
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };
    case "DELETE_CUSTOMERS":
      return {
        ...state,
        customers: state.customers.filter(
          (item: ICustomer) =>
            !action.payload
              .map((subItem: ICustomer) => subItem["customer e-mail"])
              .includes(item["customer e-mail"])
        ),
      };
    case "ADD_CUSTOMER":
      return { ...state, customers: [action.payload, ...state.customers] };
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((item: ICustomer) =>
          item["customer e-mail"] === action.payload["customer e-mail"]
            ? action.payload
            : item
        ),
      };
    default:
      return state;
  }
};
