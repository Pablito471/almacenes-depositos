/**
 * Configuración de seguridad de rutas
 * Define qué rutas requieren autenticación y qué rol se necesita
 */

export const ROUTE_CONFIG = {
  // Rutas públicas (sin autenticación requerida)
  public: ["/", "/pages/auth/login"],

  // Rutas protegidas por rol
  protected: {
    cliente: [
      "/cliente",
      "/cliente/productos",
      "/cliente/pedidos",
      "/cliente/perfil",
    ],
    deposito: [
      "/deposito",
      "/deposito/productos",
      "/deposito/pedidos",
      "/deposito/perfil",
    ],
    envios: [
      "/envios",
      "/envios/entregas",
      "/envios/historial",
      "/envios/perfil",
    ],
  },
};

/**
 * Obtiene el rol requerido para una ruta
 * @param {string} pathname - La ruta actual
 * @returns {string|null} El rol requerido o null si es pública
 */
export function getRequiredRole(pathname) {
  for (const [role, routes] of Object.entries(ROUTE_CONFIG.protected)) {
    if (routes.some((route) => pathname.startsWith(route))) {
      return role;
    }
  }
  return null;
}

/**
 * Verifica si una ruta es pública
 * @param {string} pathname - La ruta actual
 * @returns {boolean}
 */
export function isPublicRoute(pathname) {
  return ROUTE_CONFIG.public.includes(pathname);
}

/**
 * Obtiene la ruta de inicio según el rol
 * @param {string} role - El rol del usuario
 * @returns {string} La ruta de inicio
 */
export function getDashboardRoute(role) {
  const routes = {
    cliente: "/cliente/productos",
    deposito: "/deposito/productos",
    envios: "/envios/entregas",
  };
  return routes[role] || "/";
}

/**
 * Validación de permisos
 * @param {string} userRole - El rol del usuario actual
 * @param {string} requiredRole - El rol requerido
 * @returns {boolean}
 */
export function hasPermission(userRole, requiredRole) {
  if (!requiredRole) return true;
  return userRole === requiredRole;
}
