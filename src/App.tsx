import React, { useContext, useEffect } from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { AppContext } from "./Context/Context";
import { setCustomers } from "./Context/Actions";
import { getCustomers } from "./Services/CustomerServices";
import { ICustomer } from "./Types/CustomerTypes";
import routes, { RouteConfig } from "./Core/Routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { dispatch } = useContext(AppContext);

  const modifyUserData = (customers: ICustomer[]) => {
    return customers.map((item: ICustomer) => ({
      ...item,
      age: Math.round(item.age),
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getCustomers();
        console.log(
          JSON.stringify(users.filter((item: ICustomer) => item.age > 60))
        );
        dispatch(setCustomers(modifyUserData(users)));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        {routes.map((route: RouteConfig, index: number) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
