import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';
import '../../../assets/styles/components/inputs/text-input.css';

type TextInputProps = InputProps & {
  className?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  className = '',
  ...inputProps
}) => <Input className={`custom-text-input ${className}`} {...inputProps} />;

export default TextInput;
