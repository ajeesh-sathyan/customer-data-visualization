import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { IAppState } from "../Types/StateTypes";
import { AppAction } from "../Types/ActionTypes";
import { reducer } from "./Reducer";

const initialState: IAppState = { customers: [] };

export const AppContext = createContext<{
  state: IAppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
