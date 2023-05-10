import axios from "axios";
import { useQuery } from "react-query";

const useAlertsQuery = () => {
  return useQuery("alerts", async () => {
    const raisedAlerts = axios.get("http://localhost:3000/event/alert_raised", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer 123456789",
      },
    });
    const qualifiedAlerts = axios.get(
      "http://localhost:3000/event/alert_qualified",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer 123456789",
        },
      }
    );

    console.log('raisedAlerts', raisedAlerts)
    console.log('qualifiedAlerts', qualifiedAlerts)

    return raisedAlerts;
  });
};

export default useAlertsQuery;
