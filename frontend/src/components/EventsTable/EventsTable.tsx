import { useState } from "react";
import { eventMapper, formatTimestamp } from "../../utils/helper";
import "./EventsTable.css";
import useEvents from "../../hooks/useEvents";
import { Event } from "../../types";

const EventsTable = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const [eventType, setEventType] = useState("all");
  const filters = {
    timeframe,
  };

  const events = useEvents(eventType, filters);

  const handleUpdateTimeframe = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setTimeframe(event.target.value);
  };

  const handleUpdateEventType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setEventType(event.target.value);
  };

  const tooltipExplanation = (event: Event) => {
    const explanation: any = {};
    if (event.caregivers) {
      explanation.caregiver =
        event.caregivers.first_name + " " + event.caregivers.last_name;
    }
    if (event.payload.note) {
      explanation.note = event.payload.note;
    }
    if (event.payload.task_definition_description) {
      explanation.task_definition_description =
        event.payload.task_definition_description;
    }
    return explanation;
  };

  return (
    <div className="events-container">
      <p>Events</p>
      <div className="events-selectors">
        <span>Timeframe: </span>
        <select defaultValue={"7d"} onChange={handleUpdateTimeframe}>
          <option value="6h">Last 6 hours</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last week</option>
          <option value="1m">Last month</option>
          <option value="3m">Last 3 months</option>
          <option value="all">All time</option>
        </select>
        <span>Event Type: </span>
        <select defaultValue={"all"} onChange={handleUpdateEventType}>
          <option value={"all"}>All</option>
          <option value={"check_in"}>Check in</option>
          <option value={"check_out"}>Check out</option>
          <option value={"regular_medication_taken"}>Medication Taken</option>
        </select>
      </div>
      <div className="events-body-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {events.isSuccess &&
              events.data.map((event: Event) => (
                <tr key={event.id}>
                  <td>
                    <div style={{ position: "relative" }}>
                      {eventMapper[event.event_type]}
                      <span className="tooltip-text">
                        {JSON.stringify(
                          tooltipExplanation(event),
                          null,
                          2
                        ).slice(1, -1)}
                      </span>
                    </div>
                  </td>
                  <td>{formatTimestamp(event.timestamp)}</td>
                </tr>
              ))}
            {events.isSuccess && events.data.length === 0 && (
              <tr>
                <td className="empty-events" colSpan={2}>
                  No events found
                </td>
              </tr>
            )}
            {events.isLoading && (
              <tr>
                <td className="empty-events" colSpan={2}>
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

export default EventsTable;
