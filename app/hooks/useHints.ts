import { useState } from "react";
import { toast } from "react-hot-toast";

export function useHints() {
  const [hintText, setHintText] = useState("");
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const fetchHints = async (sessionId: string) => {
    try {
      setIsLoadingHint(true);

      const res = await fetch("/api/generateHint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) {
        toast.error("Failed to generate hint");
        throw new Error(`Failed to generate hint. (${res.status})`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setHintText(data.hint);
      return { success: true };
    } catch (error) {
      console.error("Generate hint error:", error);
      setHintText("Unable to generate hint at this time. Please try again.");
      return { success: false, error };
    } finally {
      setIsLoadingHint(false);
    }
  };

  const clearHint = () => {
    setHintText("");
  };

  return { hintText, isLoadingHint, fetchHints, clearHint };
}
