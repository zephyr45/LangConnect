import { useQuery } from "@tanstack/react-query";
import { getSuggestedMatches } from "../lib/api";

const useSuggestedMatches = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestedMatches"],
    queryFn: getSuggestedMatches,
  });

  return { 
    tier1: data?.tier1 || [],
    tier2: data?.tier2 || [],
    tier3: data?.tier3 || [],
    isLoading,
    error
  };
};

export default useSuggestedMatches;
