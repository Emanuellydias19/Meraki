interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-gray-200 text-gray-900",
    success: "bg-green-200 text-green-900",
    warning: "bg-yellow-200 text-yellow-900",
    error: "bg-red-200 text-red-900",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
