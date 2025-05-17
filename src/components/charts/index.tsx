import { Line, Pie, Column } from '@ant-design/plots';

interface TrendData {
  date: string;
  value: number;
}

interface PieData {
  type: string;
  value: number;
}

interface BarData {
  type: string;
  value: number;
}

export const LineChart = ({ data }: { data: TrendData[] }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    smooth: true,
    height: 300,
    point: {
      size: 4,
      shape: 'diamond',
    },
  };
  return <Line {...config} />;
};

export const PieChart = ({ data }: { data: PieData[] }) => {
  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name} ({percentage})',
    },
    height: 300,
  };
  return <Pie {...config} />;
};

export const BarChart = ({ data }: { data: BarData[] }) => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    columnWidthRatio: 0.6,
    height: 300,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };
  return <Column {...config} />;
};
