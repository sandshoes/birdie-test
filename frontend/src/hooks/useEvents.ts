import useEventsQuery from "./useEventsQuery";
import useEventTypeQuery from "./useEventTypeQuery";

const useEvents = (
  eventType: string,
  filters: Record<string, string | number>
) => {
  if (eventType === "all") {
    return useEventsQuery(filters);
  }
  return useEventTypeQuery(eventType, filters);
};

export default useEvents;
