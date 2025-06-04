import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import '../../../assets/styles/components/inputs/numberInput.css';

type CustomNumberInputProps = InputNumberProps & {
  className?: string;
};

const NumberInput: React.FC<CustomNumberInputProps> = ({
  className = '',
  ...inputProps
}) => (
  <InputNumber
    className={`custom-number-input ${className}`}
    onKeyDown={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }}
    {...inputProps}
  />
);

export default NumberInput;
