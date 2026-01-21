"use client";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-soft-lg p-6 border border-purple-100 hover-lift ${className}`}
    >
      {children}
    </div>
  );
}
