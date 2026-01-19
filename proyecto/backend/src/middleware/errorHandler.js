const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  let statusCode = 500;
  let message = "Error interno del servidor";

  if (err.message.includes("validation")) {
    statusCode = 400;
    message = "Datos inválidos";
  } else if (err.message.includes("not found")) {
    statusCode = 404;
    message = "Recurso no encontrado";
  } else if (err.message.includes("unique")) {
    statusCode = 409;
    message = "El recurso ya existe";
  }

  res.status(statusCode).json({
    error: message,
    details: err.message,
  });
};

module.exports = errorHandler;
