import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getCountByDay } from "./helper";

const CustomLineChart = (data: any, eventType: any) => {
  const dayCount = getCountByDay(data.data);
  console.log("dayCount", dayCount);
  if (dayCount.length === 0) {
    return <div>No data</div>;
  }
  return (
    <LineChart
      width={600}
      height={300}
      data={dayCount}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default CustomLineChart;
