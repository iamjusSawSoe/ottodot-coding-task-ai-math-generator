import { useState } from "react";
import { HistoryItem } from "../types";

export function useHistory() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/problemHistory");

      if (!res.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await res.json();
      setHistoryData(data.history || []);
      return { success: true };
    } catch (error) {
      console.error("Error fetching history:", error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { historyData, isLoading, fetchHistory };
}
