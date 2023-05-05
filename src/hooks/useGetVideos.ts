import { useCallback, useEffect, useState } from "react";
import { getAllVideos } from "../api";
import { IVideos } from "../constants/types";

export default function useGetFaqs() {
  const [data, setData] = useState<IVideos[]>([]);
  const [isLoading, seIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetVideosData = useCallback(async () => {
    try {
      seIsLoading(true);
      const {
        data: { data },
      } = await getAllVideos();
      setData(data);
    } catch (error: any) {
      setError("something went wrong");
    } finally {
      seIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetVideosData();
  }, [handleGetVideosData]);

  return { isLoading, error, data, refetch: handleGetVideosData };
}
