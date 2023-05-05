import { useCallback, useEffect, useState } from "react";
import { getDashboardApi } from "../api";
import { IAdminDashboard } from "../constants/types";

export default function useGetDashboardData() {
  const [data, setData] = useState<IAdminDashboard | null>(null);
  const [isLoading, seIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetDashboardData = useCallback(async () => {
    try {
      seIsLoading(true);
      console.log(error);
      const {
        data: { data },
      } = await getDashboardApi();
      console.log(data);
      setData(data);
    } catch (error: any) {
      setError("something went wrong");
    } finally {
      seIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetDashboardData();
  }, [handleGetDashboardData]);

  return { isLoading, error, data, refetch: handleGetDashboardData };
}
