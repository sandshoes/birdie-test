import { useEffect, useState } from "react";
import useEventTypeQuery from "../hooks/useEventTypeQuery";
import Chart from "./Chart";

const GraphicInformation = () => {
  const [currentType, setCurrentType] = useState("fluid_intake_observation");
  const [currentDate, setCurrentDate] = useState("day");
  const eventTypeQuery = useEventTypeQuery(currentType, currentDate);

  const handleChartChange = (event: any) => {
    setCurrentType(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setCurrentDate(event.target.value);
  };

  return (
    <div className="graphic-information">
      <select onChange={handleChartChange}>
        <option value="fluid_intake_observation">Fluid Intake</option>
        <option value="mood_observation">Mood Observation</option>
        <option value="check_in">Visits</option>
        <option value="catheter_observation">Catheter Observation</option>
        <option value="regular_medication_taken">Medication Taken</option>
      </select>

      <select onChange={handleDateChange}>
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="semester">Semester</option>
        <option value="all">All</option>
      </select>

      <div className="graphic-information__container">
        <div className="graphic-information__container__title">
          <h1>Graphic Information</h1>
          {eventTypeQuery.isSuccess && (
            <Chart data={eventTypeQuery.data} eventType="6 months" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphicInformation;
