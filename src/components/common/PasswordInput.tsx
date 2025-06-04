import React from 'react';
import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input';
import '../../assets/styles/passwordInput.css';

type CustomPasswordInputProps = PasswordProps & {
  className?: string;
};

const PasswordInput: React.FC<CustomPasswordInputProps> = ({
  className = '',
  ...inputProps
}) => (
  <Input.Password
    className={`custom-password-input ${className}`}
    {...inputProps}
  />
);

export default PasswordInput;
