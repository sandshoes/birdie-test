import useAlertsQuery from "../hooks/useAlertsQuery";

const Alerts = () => {
  const alerts = useAlertsQuery();
  const tableStyle = {
    maxHeight: "300px",
    overflowY: "auto",
    display: "block",
  };
  return (
    <div>
      <p>Alerts</p>
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
