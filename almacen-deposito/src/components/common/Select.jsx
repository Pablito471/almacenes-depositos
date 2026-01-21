"use client";

export default function Select({
  label,
  options = [],
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 font-semibold">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 border-2 rounded-lg transition-smooth bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          error
            ? "border-rose-300 focus:border-rose-300"
            : "border-purple-200 hover:border-purple-300 focus:border-purple-400"
        } ${className}`}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt.id || opt.value} value={opt.id || opt.value}>
            {opt.nombre || opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-rose-600 font-medium">{error}</p>
      )}
    </div>
  );
}
