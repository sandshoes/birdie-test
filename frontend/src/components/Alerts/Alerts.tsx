import { useState } from "react";
import useAlertsQuery from "../../hooks/useAlertsQuery";
import "./Alerts.css";
import { formatTimestamp } from "../../utils/helper";

const Alerts = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const alerts = useAlertsQuery({ timeframe });

  const updateTimeframe = (event: any) => {
    event.preventDefault();
    setTimeframe(event.target.value);
  };

  const getRowClass = (alert: any) => {
    if (!alert.matched) {
      return "unmatched";
    }
    switch (alert.alert.severity) {
      case "High":
        return "high-severity";
      case "Medium":
        return "medium-severity";
      case "Low":
        return "low-severity";
      default:
        return "";
    }
  };

  return (
    <div className="alerts-container">
      <p>Alerts</p>
      <span>Timeframe: </span>
      <select onChange={updateTimeframe}>
        <option value="6h">Last 6 hours</option>
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last week</option>
        <option value="1m">Last month</option>
        <option value="3m">Last 3 months</option>
        <option value="all">All time</option>
      </select>
      <div className="table-body-container">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Caregiver</th>
              <th>Alert Severity</th>
              <th>Alert Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {alerts.isSuccess &&
              alerts.data.map((alert: any) => (
                <tr key={alert.alert.id} className={getRowClass(alert)}>
                  <td>{alert.alert.caregiver || "Not assigned"}</td>
                  <td>
                    {alert.matched ? alert.alert.severity : "Not evaluated"}
                  </td>
                  <td>{formatTimestamp(alert.alert.timestamp)}</td>
                </tr>
              ))}
            {alerts.isSuccess && alerts.data.length === 0 && (
              <tr>
                <td className="empty-alerts" colSpan={3}>
                  No alerts found
                </td>
              </tr>
            )}
            {alerts.isLoading && (
              <tr>
                <td className="empty-alerts" colSpan={3}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alerts;
