import axios from "axios";
import { useQuery } from "react-query";
import { processUrlFilters } from "../utils/helper";

const useEventsQuery = (filters: any) => {
  const processedFilters = processUrlFilters(filters);
  return useQuery(["events", processedFilters], async () => {
    const events = await axios.get(
      `http://localhost:3000/event${processedFilters}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer 123456789",
        },
      }
    );
    return events.data;
  });
};

export default useEventsQuery;
