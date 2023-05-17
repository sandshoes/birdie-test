import { useState } from "react";
import Chart from "./Chart";
import useAggregatedEventTypeQuery from "../../hooks/useAggregatedEventTypeQuery";
import "./GraphicInformation.css";

const GraphicInformation = () => {
  const [eventType, setEventType] = useState("fluid_intake_observation");
  const [timeframe, setTimeframe] = useState("7d");
  const eventTypeQuery = useAggregatedEventTypeQuery(eventType, timeframe);

  const handleChartChange = (event: any) => {
    event.preventDefault();
    setEventType(event.target.value);
  };

  const handleDateChange = (event: any) => {
    event.preventDefault();
    setTimeframe(event.target.value);
  };

  return (
    <div defaultValue={eventType} className="graphic-information-container">
      <p>Graphic Information</p>
      <div className="graph-selectors">
        <select onChange={handleChartChange}>
          <option value="fluid_intake_observation">Fluid Intake</option>
          <option value="mood_observation">Mood Observation</option>
          <option value="check_in">Visits</option>
          <option value="catheter_observation">Catheter Observation</option>
          <option value="regular_medication_taken">Medication Taken</option>
        </select>

        <select defaultValue={timeframe} onChange={handleDateChange}>
          <option value="24h">Day</option>
          <option value="7d">Week</option>
          <option value="1m">Month</option>
          <option value="6m">Semester</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className="graphic-information">
          {eventTypeQuery.isSuccess && (
            <Chart
              data={eventTypeQuery.data.aggregatedEvents}
              aggregator={eventTypeQuery.data.aggregationType}
            />
          )}
          {eventTypeQuery.isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default GraphicInformation;
