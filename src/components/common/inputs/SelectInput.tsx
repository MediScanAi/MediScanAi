import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import '../../../assets/styles/components/inputs/selectInput.css';

interface CustomSelectInputProps extends SelectProps {
  className?: string;
  popupClassName?: string;
};

const SelectInput: React.FC<CustomSelectInputProps> = ({
  className = '',
  popupClassName = '',
  ...selectProps
}) => (
  <Select
    className={`custom-select-input ${className}`}
    classNames={{
      popup: { root: `custom-select-dropdown ${popupClassName}` },
    }}
    {...selectProps}
  />
);

export default SelectInput;
