import useAlertsQuery from "../hooks/useAlertsQuery";

const Alerts = () => {
  const alerts = useAlertsQuery();
  const tableStyle = {
    maxHeight: "120px",
    overflowY: "auto",
    display: "block",
  };
  return (
    <div>
      <p>Alerts</p>
      <select>
        <option value="1">Last 6 hours</option>
        <option value="2">Last 24 hours</option>
        <option value="3">Last week</option>
        <option value="4">Last month</option>
        <option value="5">Last 3 months</option>
        <option value="6">All time</option>
      </select>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Alert Severity</th>
          </tr>
        </thead>
        <tbody>
          {alerts.isSuccess &&
            alerts.data.map((alert: any) => (
              <tr key={alert.alert.id}>
                <td>{alert.alert.alert_id}</td>
                <td>
                  {alert.matched ? alert.alert.severity : "Not evaluated"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alerts;
