import { ReactNode } from 'react';

export interface Action {
  label: string;
  icon?: ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick: () => void;
} 