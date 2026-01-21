"use client";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 hover:shadow-lg hover:scale-105 focus:ring-purple-400 active:scale-95",
    success:
      "bg-gradient-to-r from-green-300 to-emerald-300 text-gray-800 hover:shadow-lg hover:scale-105 focus:ring-green-400 active:scale-95",
    danger:
      "bg-gradient-to-r from-rose-300 to-pink-300 text-gray-800 hover:shadow-lg hover:scale-105 focus:ring-rose-400 active:scale-95",
    warning:
      "bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-800 hover:shadow-lg hover:scale-105 focus:ring-yellow-300 active:scale-95",
    ghost:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 border border-gray-200 hover:shadow-soft",
    outline:
      "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 focus:ring-purple-300 hover:shadow-soft",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
