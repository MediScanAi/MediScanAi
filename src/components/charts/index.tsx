import { Line, Pie, Column } from '@ant-design/plots';

interface TrendData {
  date: string;
  value: number;
}

export const LineChart = ({ data }: { data: TrendData[] }) => (
  <Line data={data} xField="date" yField="value" />
);

export const PieChart = ({ data }: { data: [] }) => (
  <Pie data={data} angleField="value" colorField="type" />
);

export const BarChart = ({ data }: { data: [] }) => (
  <Column data={data} xField="type" yField="value" />
);
