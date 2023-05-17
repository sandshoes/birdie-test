import axios from "axios";
import { useQuery } from "react-query";
import { processUrlFilters } from "../utils/helper";
import { useAuth } from "../AuthContext";

const BASE_URL = "http://localhost:3000/";

const useEventTypeQuery = (eventType: any, filters: any) => {
  const auth = useAuth();
  const accessToken = auth.session?.access_token;
  const processedFilters = processUrlFilters(filters);
  return useQuery(
    ["event_type", eventType, processedFilters],
    async () => {
      const events = await axios.get(
        `${BASE_URL}event/${eventType}${processedFilters}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (eventType === "check_in") {
        return [];
      }
      return events.data;
    },
    {
      enabled: !!eventType,
    }
  );
};

export default useEventTypeQuery;
