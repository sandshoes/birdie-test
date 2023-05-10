import axios from "axios";
import { useQuery } from "react-query";

const useAlertsQuery = () => {
  return useQuery("alerts", async () => {
    const raisedAlerts = await axios.get(
      "http://localhost:3000/event/alert_raised",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer 123456789",
        },
      }
    );
    const qualifiedAlerts = await axios.get(
      "http://localhost:3000/event/alert_qualified",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer 123456789",
        },
      }
    );

    if (raisedAlerts.data && qualifiedAlerts.data) {
      const mergedAlerts = raisedAlerts.data.map((alert: any) => {
        const qualifiedAlert = qualifiedAlerts.data.find(
          (qualifiedAlert: any) => qualifiedAlert.alert_id === alert.alert_id
        );
        return {
          alert: qualifiedAlert ? qualifiedAlert : alert,
          matched: qualifiedAlert ? true : false,
        };
      });
      mergedAlerts.sort(
        (a: any, b: any) =>
          new Date(b.alert.timestamp).getTime() -
          new Date(a.alert.timestamp).getTime()
      );
      return mergedAlerts;
    }
    return [];
  });
};

export default useAlertsQuery;
