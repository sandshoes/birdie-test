import axios from "axios";
import { useQuery } from "react-query";
import { processUrlFilters } from "../utils/helper";

const BASE_URL = "http://localhost:3000/";

const useEventTypeQuery = (eventType: any, filters: any) => {
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
            Authorization: "Bearer 123456789",
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
