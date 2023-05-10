import useEventsQuery from "../hooks/useEventsQuery";

const EventsTable = () => {
  const events = useEventsQuery();
  const tableStyle = {
    maxHeight: "300px",
    overflowY: "auto",
    display: "block",
  };
  return (
    <div>
      <p>Events</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {events.isSuccess &&
            events.data.map((event: any) => (
              <tr key={event.id}>
                <td>{event.event_type}</td>
                <td>{event.timestamp}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
