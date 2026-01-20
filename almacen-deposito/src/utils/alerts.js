import Swal from "sweetalert2";

export const alerts = {
  success: (title, message) => {
    Swal.fire({
      icon: "success",
      title,
      text: message,
      confirmButtonColor: "#10b981",
    });
  },

  error: (title, message) => {
    Swal.fire({
      icon: "error",
      title,
      text: message,
      confirmButtonColor: "#ef4444",
    });
  },

  warning: (title, message) => {
    Swal.fire({
      icon: "warning",
      title,
      text: message,
      confirmButtonColor: "#f59e0b",
    });
  },

  info: (title, message) => {
    Swal.fire({
      icon: "info",
      title,
      text: message,
      confirmButtonColor: "#3b82f6",
    });
  },

  confirm: (title, message) => {
    return Swal.fire({
      icon: "question",
      title,
      text: message,
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });
  },

  loading: (title) => {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  close: () => {
    Swal.close();
  },
};
