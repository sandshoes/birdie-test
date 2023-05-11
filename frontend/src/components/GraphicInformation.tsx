import { useState } from "react";
import Chart from "./Chart";
import useAggregatedEventTypeQuery from "../hooks/useAggregatedEventTypeQuery";

const aggregatorMap: any = {
  ["fluid_intake_observation"]: "consumed_volume_ml",
  ["catheter_observation"]: "consumed_volume_ml",
  ["check_in"]: "count",
  ["regular_medication_taken"]: "count",
  ["mood_observation"]: "categorical_mood",
};

const GraphicInformation = () => {
  const [currentType, setCurrentType] = useState("fluid_intake_observation");
  const [currentDate, setCurrentDate] = useState("day");
  const eventTypeQuery = useAggregatedEventTypeQuery(
    currentType,
    aggregatorMap[currentType],
    currentDate
  );


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
            <Chart
              data={eventTypeQuery.data}
              aggregator={aggregatorMap[currentType]}
              timespan="6 months"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphicInformation;
