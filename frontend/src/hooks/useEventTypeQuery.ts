import axios from "axios";
import { useQuery } from "react-query";

const useEventTypeQuery = (event_type: any, event_dates: any) => {
  return useQuery(
    ["event_type", event_type, event_dates],
    async () => {
      const events = await axios.get(
        `http://localhost:3000/event/${event_type}`,
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
      enabled: !!event_type,
    }
  );
};

export default useEventTypeQuery;
