import React from 'react';
import { Button, type ButtonProps } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

interface PrimaryButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  icon,
  children,
  className = '',
  ...props
}) => {
  const theme = useSelector((state: RootState) =>
    state.theme.isDarkMode ? 'dark' : ''
  );
  return (
    <Button
      className={`custom-btn primary-btn ${theme} ${className}`}
      icon={icon}
      size={props.size ?? 'large'}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
