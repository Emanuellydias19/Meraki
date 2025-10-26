import react, { ReactHTMLElement } from 'react';

interface ButtonProps extends 
ReactHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

