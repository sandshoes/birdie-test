import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "../AuthContext";

const useAggregatedEventTypeQuery = (eventType: string, eventDates: any) => {
  const auth = useAuth();
  const accessToken = auth.session?.access_token;
  return useQuery(
    ["event_type", eventType, eventDates],
    async () => {
      const events = await axios.get(
        `${import.meta.env.VITE_API_URL}event/aggregated/${eventType}`,
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

export default useAggregatedEventTypeQuery;
