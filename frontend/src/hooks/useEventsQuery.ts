import axios from "axios";
import { useQuery } from "react-query";

const useEventsQuery = () => {
  return useQuery("events", async () => {
    const events = await axios.get(
      "http://localhost:3000/event",
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
