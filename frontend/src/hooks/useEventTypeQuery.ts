import axios from "axios";
import { useQuery } from "react-query";
import { processUrlFilters } from "../utils/helper";
import { useAuth } from "../AuthContext";

const useEventTypeQuery = (eventType: any, filters: any) => {
  const auth = useAuth();
  const accessToken = auth.session?.access_token;
  const processedFilters = processUrlFilters(filters);
  return useQuery(
    ["event_type", eventType, processedFilters],
    async () => {
      const events = await axios.get(
        `${import.meta.env.VITE_API_URL}event/${eventType}${processedFilters}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return events.data;
    },
    {
      enabled: !!eventType,
    }
  );
};

export default useEventTypeQuery;
