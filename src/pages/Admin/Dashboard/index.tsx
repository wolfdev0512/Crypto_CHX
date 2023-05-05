import React from "react";

import "./Dashboard.scss";
import Details from "./Details";
import { IAdminDashboard } from "../../../constants/types";

const Dashboard: React.FC<{
  data: IAdminDashboard;
  refetch: () => Promise<void>;
}> = ({ data, refetch }) => {
  return (
    <div className="dashboard">
      <div className="mx pad">
        <Details data={data} refetch={refetch} />
      </div>
    </div>
  );
};

export default Dashboard;
