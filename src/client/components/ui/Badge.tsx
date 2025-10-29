interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-gray-00 text-gray-900",
    success: "bg-green-00 text-green-900",
    warning: "bg-yellow-00 text-yellow-900",
    error: "bg-red-00 text-red-900",
  };

  return (
    <span
      className={`px- py- rounded-full text-sm font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
