import axios from "axios";
import { useQuery } from "react-query";
import { processUrlFilters } from "../utils/helper";
import { useAuth } from "../AuthContext";

const useAlertsQuery = (filters: any) => {
  const auth = useAuth();
  const accessToken = auth.session?.access_token;
  const processedFilters = processUrlFilters(filters);
  return useQuery(["alerts", processedFilters], async () => {
    const raisedAlerts = await axios.get(
      `${import.meta.env.VITE_API_URL}event/alert_raised${processedFilters}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const qualifiedAlerts = await axios.get(
      `${import.meta.env.VITE_API_URL}event/alert_qualified${processedFilters}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
          caregiver:
            qualifiedAlert && qualifiedAlert.caregivers
              ? qualifiedAlert.caregivers.first_name +
                " " +
                qualifiedAlert.caregivers.last_name
              : null,
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
