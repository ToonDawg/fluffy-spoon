import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch<T>(url: string, debounceTime: number = 1000) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const debounceRef = useRef(0);

  const fetchData = useCallback(async () => {
    if (Date.now() - debounceRef.current < debounceTime) {
      return;
    }
    setLoading(true);
    debounceRef.current = Date.now();
    const response = await fetch(url);
    if (!response.ok) {
      setError(response.status);
    }
    setData(await response.json());
    setLoading(false);
  }, [debounceTime, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refreshData: fetchData,
  };
}
