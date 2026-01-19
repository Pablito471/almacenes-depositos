export const Alert = ({ type = "info", message, onClose }) => {
  const typeClasses = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${typeClasses[type]}`}>
      <div className="flex justify-between items-center">
        <p>{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};
