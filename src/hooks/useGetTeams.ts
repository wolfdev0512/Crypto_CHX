import { useCallback, useEffect, useState } from "react";
import { getAllTeams } from "../api";
import { ITeams } from "../constants/types";

export default function useGetTeams() {
  const [data, setData] = useState<ITeams[]>([]);
  const [isLoading, seIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetTeamsData = useCallback(async () => {
    try {
      seIsLoading(true);
      const {
        data: { data },
      } = await getAllTeams();
      setData(data);
    } catch (error: any) {
      setError("something went wrong");
    } finally {
      seIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetTeamsData();
  }, [handleGetTeamsData]);

  return { isLoading, error, data, refetch: handleGetTeamsData };
}
