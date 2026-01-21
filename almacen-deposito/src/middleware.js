import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Obtener cookie de autenticación (se establece en localStorage del cliente)
  // Para las validaciones del servidor, usamos el contexto del cliente
  // Este middleware es una capa adicional de protección

  // Rutas que requieren autenticación
  const protectedRoutes = {
    "/cliente": "cliente",
    "/deposito": "deposito",
    "/envios": "envios",
  };

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/pages/auth/login"];

  // Verificar si la ruta actual requiere autenticación
  const requiresAuth = Object.keys(protectedRoutes).some((route) =>
    pathname.startsWith(route),
  );

  // Si es una ruta pública, permitir acceso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Si es una ruta protegida, el cliente-side guard se encargará
  // Este middleware simplemente permite el flujo continuar
  // La validación real ocurre en useProtectedRoute
  if (requiresAuth) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
