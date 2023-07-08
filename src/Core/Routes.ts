import { ComponentType } from "react";
import CustomerContainer from "../Modules/Customer/CustomerContainer";
import DashboardContainer from "../Modules/Dashboard/DashboardContainer";

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
}

const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    component: DashboardContainer,
  },
  {
    path: "/customers",
    component: CustomerContainer,
  },
];

export default routes;
