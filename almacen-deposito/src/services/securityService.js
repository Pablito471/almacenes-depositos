/**
 * Servicio de seguridad
 * Proporciona funciones para validar autenticación y autorización
 */

/**
 * Valida si el usuario está autenticado
 * @returns {boolean}
 */
export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  return !!user && !!role;
}

/**
 * Obtiene el usuario actual
 * @returns {Object|null}
 */
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * Obtiene el rol del usuario actual
 * @returns {string|null}
 */
export function getCurrentRole() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role");
}

/**
 * Obtiene el perfil del usuario actual
 * @returns {Object|null}
 */
export function getUserProfile() {
  if (typeof window === "undefined") return null;
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
}

/**
 * Valida si el usuario tiene un rol específico
 * @param {string} requiredRole
 * @returns {boolean}
 */
export function hasRole(requiredRole) {
  const currentRole = getCurrentRole();
  return currentRole === requiredRole;
}

/**
 * Valida si el usuario tiene alguno de los roles especificados
 * @param {string[]} roles
 * @returns {boolean}
 */
export function hasAnyRole(roles) {
  const currentRole = getCurrentRole();
  return roles.includes(currentRole);
}

/**
 * Limpia toda la información de autenticación
 */
export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("profile");
  localStorage.removeItem("carrito");
  localStorage.removeItem("almacenSeleccionado");
}

/**
 * Obtiene información de sesión para debugging
 * @returns {Object}
 */
export function getSessionInfo() {
  return {
    isAuthenticated: isAuthenticated(),
    user: getCurrentUser(),
    role: getCurrentRole(),
    profile: getUserProfile(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Valida la integridad de la sesión
 * @returns {Object} { valid: boolean, message: string }
 */
export function validateSession() {
  const user = getCurrentUser();
  const role = getCurrentRole();

  if (!user || !role) {
    return { valid: false, message: "No hay usuario autenticado" };
  }

  if (!user.id || !user.email) {
    return { valid: false, message: "Datos de usuario incompletos" };
  }

  if (!["cliente", "deposito", "envios"].includes(role)) {
    return { valid: false, message: "Rol inválido" };
  }

  return { valid: true, message: "Sesión válida" };
}
