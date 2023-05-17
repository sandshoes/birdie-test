import axios from "axios";
import { useQuery } from "react-query";

const useAggregatedEventTypeQuery = (eventType: string, eventDates: any) => {
  return useQuery(
    ["event_type", eventType, eventDates],
    async () => {
      const events = await axios.get(
        `http://localhost:3000/event/aggregated/${eventType}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer 123456789",
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

export default useAggregatedEventTypeQuery;
