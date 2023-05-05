import { useContext } from "react";
import { DashboardContext } from "../store/context/dashboardContext";

export default function useGetAdminData() {
  return useContext(DashboardContext);
}
