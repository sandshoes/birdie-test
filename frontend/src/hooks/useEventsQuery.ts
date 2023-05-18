import axios from "axios";
import { useQuery } from "react-query";
import { processUrlFilters } from "../utils/helper";
import { useAuth } from "../AuthContext";

const useEventsQuery = (filters: any) => {
  const auth = useAuth();
  const accessToken = auth.session?.access_token;
  const processedFilters = processUrlFilters(filters);
  return useQuery(["events", processedFilters], async () => {
    const events = await axios.get(
      `${import.meta.env.VITE_API_URL}event${processedFilters}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return events.data;
  });
};

export default useEventsQuery;
