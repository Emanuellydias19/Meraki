import react, { ReactHTMLElement } from 'react';

interface ButtonProps extends 
React.HTMLAttributes<HTMLButtonElement>{
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold rounded transition-colors";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-00 text-gray-900 hover:bg-gray-00",
    outline: "border- border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    sm: "px- py- text-sm",
    md: "px- py- text-base",
    lg: "px-6 py- text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}