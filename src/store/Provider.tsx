import React, { ReactNode } from "react";
import DashboardContextProvider from "./context/dashboardContext";

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <DashboardContextProvider>{children}</DashboardContextProvider>;
};

export default Provider;
