import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = ({
  data,
  aggregator,
}: {
  data: Array<any>;
  aggregator: string;
}) => {
  const chartData = Object.entries(data).map(([timestamp, value]) => ({
    timestamp,
    [`${aggregator}`]: value,
  }));

  if (chartData.length === 0) {
    return <div>No data</div>;
  }
  return (
    <LineChart
      width={600}
      height={300}
      data={chartData}
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
        dataKey={aggregator}
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default Chart;
