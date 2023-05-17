export const eventMapper: Record<string, string> = {
  ["check_in"]: "Check In",
  ["check_out"]: "Check Out",
  ["visit_cancelled"]: "Visit Cancelled",
  ["visit_completed"]: "Visit Completed",
  ["regular_medication_taken"]: "Regular Medication Taken",
  ["regular_medication_partially_taken"]: "Regular Medication Partially Taken",
  ["regular_medication_not_taken"]: "Regular Medication Not Taken",
  ["regular_medication_maybe_taken"]: "Regular Medication Maybe Taken",
  ["no_medication_observation_received"]: "No Medication Observation Received",
  ["alert_raised"]: "Alert Raised",
  ["alert_qualified"]: "Alert Qualified",
  ["medication_schedule_updated"]: "Medication Schedule Updated",
  ["fluid_intake_observation"]: "Fluid Intake Observation",
  ["mood_observation"]: "Mood Observation",
  ["incontinence_pad_observation"]: "Incontinence Pad Observation",
  ["catheter_observation"]: "Catheter Observation",
  ["task_completed"]: "Task Completed",
  ["physical_health_observation"]: "Physical Health Observation",
  ["general_observation"]: "General Observation",
  ["food_intake_observation"]: "Food Intake Observation",
  ["task_completion_reverted"]: "Task Completion Reverted",
  ["mental_health_observation"]: "Mental Health Observation",
  ["medication_schedule_created"]: "Medication Schedule Created",
  ["task_schedule_created"]: "Task Schedule Created",
  ["concern_raised"]: "Concern Raised",
  ["toilet_visit_recorded"]: "Toilet Visit Recorded",
};

export const formatTimestamp = (timestamp: string) => {
  const dateObject = new Date(timestamp);
  const weekday = dateObject.toLocaleDateString("en-US", { weekday: "short" });
  const day = dateObject.toLocaleDateString("en-US", { day: "2-digit" });
  const monthYear = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const time = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${weekday}, ${day} ${monthYear} at ${time}`;
};

export const processUrlFilters = (filters: any): string => {
  const filterTypes = Object.keys(filters);
  if (filterTypes.length === 0) {
    return "";
  }

  const queryList = filterTypes.map((filterType: string) => {
    switch (filterType) {
      case "timeframe":
        const { startDate, endDate } = convertTimeframeToDates(
          filters[filterType]
        );
        return (
          "start_date=" +
          startDate.toISOString() +
          "&end_date=" +
          endDate.toISOString()
        );
      default:
        return filterType + "=" + filters[filterType];
    }
  });

  const filterQueryParam = "?" + queryList.join("&");
  return filterQueryParam;
};

const convertTimeframeToDates = (
  timeframe: string
): { startDate: Date; endDate: Date } => {
  const endDate = new Date("2019-05-15T00:00:00");
  let startDate = new Date(endDate);

  if (timeframe === "all") {
    return { startDate: new Date(0), endDate };
  }

  const unit = timeframe.slice(-1);

  const number = parseInt(timeframe.slice(0, -1));
  if (isNaN(number)) {
    throw new Error("Invalid timeframe");
  }

  switch (unit) {
    case "h":
      startDate.setHours(endDate.getHours() - number);
      break;
    case "d":
      startDate.setDate(endDate.getDate() - number);
      break;
    case "m":
      startDate.setMonth(endDate.getMonth() - number);
      break;
    default:
      throw new Error("Invalid timeframe");
  }

  return { startDate, endDate };
};
