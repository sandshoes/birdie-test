import useEventsQuery from "./useEventsQuery";
import useEventTypeQuery from "./useEventTypeQuery";

const useEvents = (eventType: any, filters: any) => {
  if (eventType === "all") {
    return useEventsQuery(filters);
  }
  return useEventTypeQuery(eventType, filters);
};

export default useEvents;
