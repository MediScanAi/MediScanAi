import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import '../../../assets/styles/components/inputs/number-input.css';

type CustomNumberInputProps = InputNumberProps & {
  className?: string;
};

const allowedKeys = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Tab',
  'Home',
  'End',
];

const NumberInput: React.FC<CustomNumberInputProps> = ({
  className = '',
  ...inputProps
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <InputNumber
      className={`custom-number-input ${className}`}
      onKeyDown={handleKeyDown}
      {...inputProps}
    />
  );
};

export default NumberInput;
