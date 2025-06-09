import React from 'react';
import { Button, type ButtonProps } from 'antd';
import '../../../assets/styles/buttons.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

interface SecondaryButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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
      className={`custom-btn secondary-btn ${theme} ${className}`}
      icon={icon}
      size={props.size ?? 'large'}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
