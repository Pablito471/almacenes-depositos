# 🚀 Guía de Deployment en Vercel

## Requisitos Previos

- Cuenta en [Vercel](https://vercel.com) (gratuita)
- Repositorio en GitHub, GitLab o Bitbucket
- Git instalado localmente

## Paso 1: Preparar el Repositorio

```bash
# Navega a la carpeta del proyecto
cd almacen-deposito

# Inicializa git si no está inicializado
git init

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit: AlmacenesHub app"

# Conecta con tu repositorio remoto
git remote add origin https://github.com/tu-usuario/almacenes-depositos.git

# Push al repositorio
git branch -M main
git push -u origin main
```

## Paso 2: Deploy en Vercel

### Opción A: Dashboard de Vercel (Recomendado)

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Haz clic en "Deploy"
6. ¡Listo! Tu app estará disponible en una URL de Vercel

### Opción B: Vercel CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Navega a la carpeta del proyecto
cd almacen-deposito

# Deploy
vercel

# Para producción
vercel --prod
```

## Paso 3: Configurar Variables de Entorno (Opcional)

En el dashboard de Vercel:

1. Ve a Settings → Environment Variables
2. Agrega las variables necesarias:
   ```
   NEXT_PUBLIC_API_URL=https://tu-dominio.vercel.app
   ```

## Paso 4: Configurar Dominio Personalizado (Opcional)

1. En el dashboard de Vercel, ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar los DNS

## Verificar Deploy

Después del deploy:

1. Abre tu URL de Vercel
2. Verifica que todas las páginas carguen correctamente
3. Prueba la funcionalidad principal:
   - Login con diferentes roles
   - Crear un pedido (como cliente)
   - Actualizar productos (como depósito)
   - Marcar entregas (como envíos)

## Monitoreo y Logs

En el dashboard de Vercel:

- **Deployments**: Historial de todos los deployments
- **Logs**: Errores y eventos en tiempo real
- **Analytics**: Rendimiento y uso de la aplicación

## Troubleshooting

### Build falla

- Verifica que `npm run build` funcione localmente
- Revisa los logs en el dashboard de Vercel
- Asegúrate de tener node_modules instalados

### Página en blanco

- Abre la consola del navegador (F12) para ver errores
- Verifica que las rutas sean correctas
- Limpia el caché del navegador

### Performance lento

- Usa Lighthouse (F12 → Lighthouse)
- Optimiza imágenes
- Considera usar un CDN para archivos estáticos

## Actualizar la Aplicación

Después de cambios locales:

```bash
git add .
git commit -m "Describe tus cambios"
git push origin main
```

Vercel se desplegará automáticamente cuando hagas push a main.

## Scaling y Mejoras Futuras

Para una aplicación de producción, considera:

- ✅ Backend API (Node.js, Python, etc.)
- ✅ Base de datos (PostgreSQL, MongoDB, etc.)
- ✅ Autenticación real (OAuth, JWT)
- ✅ Almacenamiento de archivos (S3, Cloudinary)
- ✅ Sistema de pagos (Stripe, PayPal)
- ✅ Notificaciones en tiempo real (WebSockets)
- ✅ Sistema de búsqueda (Elasticsearch)

## Recursos Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks Documentation](https://react.dev/reference/react)

---

¡Felicidades! Tu app AlmacenesHub está lista para producción! 🎉
