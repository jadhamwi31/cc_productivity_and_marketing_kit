import React from 'react';
import { S } from './Button.styled';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = 'primary', ...buttonProps }: Props) => {
  const Component = variant === 'primary' ? S.Primary : S.Secondary;
  return <Component {...buttonProps}>{children}</Component>;
};

export default Button;
