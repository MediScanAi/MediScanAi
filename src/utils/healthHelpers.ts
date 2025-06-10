import { bmiColors, bodyFatColors } from './healthColors';

export const getBmiStatus = (
  bmi: number | null
): keyof typeof bmiColors | 'default' => {
  if (bmi === null) return 'default';
  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'healthy';
  if (bmi >= 25 && bmi <= 29.9) return 'overweight';
  return 'obese';
};

export const getBmrColor = (bmr: number) => {
  if (bmr < 1200) return '#FFD700';
  if (bmr >= 1200 && bmr <= 1800) return '#52C41A';
  return '#FA8C16';
};

export const getBodyFatStatus = (bodyFat: number): keyof typeof bodyFatColors => {
  if (bodyFat < 10) return 'excellent';
  if (bodyFat >= 10 && bodyFat <= 15) return 'good';
  if (bodyFat > 15 && bodyFat <= 20) return 'average';
  return 'high';
}

export type Metric = {
  type: string;
  value: number | string;
  unit?: string;
  max?: number | string;
};