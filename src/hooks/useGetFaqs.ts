import { useCallback, useEffect, useState } from "react";
import { getAllFaqs } from "../api";
import { IFaqs } from "../constants/types";

export default function useGetFaqs() {
  const [data, setData] = useState<IFaqs[]>([]);
  const [isLoading, seIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetFaqsData = useCallback(async () => {
    try {
      seIsLoading(true);
      const {
        data: { data },
      } = await getAllFaqs();
      setData(data);
    } catch (error: any) {
      setError("something went wrong");
    } finally {
      seIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetFaqsData();
  }, [handleGetFaqsData]);

  return { isLoading, error, data, refetch: handleGetFaqsData };
}
