"use client";

export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 font-semibold">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border-2 rounded-lg transition-smooth bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          error
            ? "border-rose-300 focus:border-rose-300"
            : "border-purple-200 hover:border-purple-300 focus:border-purple-400"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-rose-600 font-medium">{error}</p>
      )}
    </div>
  );
}
