import { fetchDataForChart } from '@/services/patient.services';
import { useEffect, useState } from 'react'

export const useFetchChartData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);
  
          const response = await fetchDataForChart();
          setData(response);
        } catch (err: any) {
          console.error("Error fetching chart data:", err);
          setError(err.message || "An error occurred while fetching chart data.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { data, isLoading, error };
}
