# 🌐 GUÍA DE DEPLOYMENT EN VERCEL

## ✅ Frontend Ready para Vercel

Tu frontend Next.js está **100% optimizado y listo** para desplegar en Vercel.

---

## 📋 PRE-REQUISITOS

- [ ] Cuenta en [vercel.com](https://vercel.com)
- [ ] Repositorio en GitHub/GitLab/Bitbucket
- [ ] Git configurado localmente
- [ ] Variables de entorno preparadas

---

## 🚀 DEPLOYMENT FRONTEND (RECOMENDADO)

### Paso 1: Preparar Repositorio

```bash
# En la raíz del proyecto
git init
git add .
git commit -m "Initial commit: Full Stack JS App"
git branch -M main
git remote add origin https://github.com/tu-usuario/almacenes-depositos.git
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en **"Add New" → "Project"**
3. Seleccionar tu repositorio
4. En **"Root Directory"** seleccionar: `frontend`
5. Click **"Deploy"**

### Paso 3: Configurar Variables de Entorno

Después del primer deploy:

1. Ir a **Settings → Environment Variables**
2. Agregar:
   ```
   NEXT_PUBLIC_API_URL = https://tu-api.com/api
   ```
3. Hacer push para redeploy

### Resultado Final

```
✅ https://tu-proyecto.vercel.app
✅ Deployments automáticos en cada push a main
✅ Previsiones en cada pull request
```

---

## 🔙 DEPLOYMENT BACKEND

### Opción 1: Render.com (RECOMENDADO)

**Paso 1: Preparar Backend**

```bash
# Verificar que backend/package.json tenga:
"scripts": {
  "start": "node src/index.js",
  "dev": "node --watch src/index.js"
}
```

**Paso 2: Crear Web Service**

1. Ir a [render.com](https://render.com)
2. Click **"New +" → "Web Service"**
3. Conectar repositorio
4. Configurar:
   - Name: `almacenes-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

**Paso 3: Variables de Entorno**

```
DATABASE_URL = postgresql://user:pass@host:port/db
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password
POSTGRES_DB = almacenes_depositos
JWT_SECRET = your_secret_key_change_this
CORS_ORIGIN = https://tu-proyecto.vercel.app
NODE_ENV = production
PORT = 10000
```

**Paso 4: Deploy**

- Render auto-deploya al hacer push
- URL: `https://almacenes-backend.onrender.com`

---

### Opción 2: Railway.app

**Paso 1: Setup Database**

```bash
# Railway maneja PostgreSQL automáticamente
# Solo crear plugin PostgreSQL en dashboard
```

**Paso 2: Deploy Backend**

1. Ir a [railway.app](https://railway.app)
2. **New Project → GitHub Repo**
3. Seleccionar repositorio
4. Railway auto-detecta Node.js
5. Configurar ROOT_DIRECTORY: `backend`

**Paso 3: Environment Variables**

```
DATABASE_URL = (Auto de PostgreSQL plugin)
JWT_SECRET = your_secret
CORS_ORIGIN = https://tu-proyecto.vercel.app
```

**Resultado:**

- URL automática: `https://almacenes-api-prod.railway.app`
- CI/CD automático

---

### Opción 3: Heroku (Alternativa)

> ⚠️ Heroku Dynos ahora son pagos. Usar Render o Railway es mejor.

---

## 🔗 CONECTAR FRONTEND + BACKEND

Después de tener ambos en producción:

### 1. Frontend (.env.production)

```
NEXT_PUBLIC_API_URL=https://tu-api-backend.com/api
```

Redeploy frontend en Vercel

### 2. Backend (CORS)

```
CORS_ORIGIN=https://tu-proyecto.vercel.app
```

Redeploy backend

### 3. Verificar Conexión

```bash
# Terminal
curl https://tu-api-backend.com/api/health

# Debe retornar:
# {"status":"OK","timestamp":"2026-01-19T..."}
```

---

## ✅ CHECKLIST DE DEPLOYMENT

### Frontend Vercel

- [ ] Código en GitHub
- [ ] Vercel proyecto creado
- [ ] Root Directory: `frontend`
- [ ] `NEXT_PUBLIC_API_URL` configurada
- [ ] Build exitoso
- [ ] Deployments automáticos activados
- [ ] URL funcional

### Backend (Render/Railway)

- [ ] Código en GitHub
- [ ] Proyecto creado
- [ ] Root Directory: `backend`
- [ ] PostgreSQL database configurada
- [ ] Variables de entorno completadas
- [ ] Build exitoso
- [ ] Conecta a BD remota
- [ ] URL funcional

### Integración

- [ ] Frontend apunta a API correcta
- [ ] Backend CORS permite frontend
- [ ] Login funciona end-to-end
- [ ] APIs responden en producción
- [ ] Errores manejados correctamente

---

## 🔍 MONITOREO Y MANTENIMIENTO

### Vercel

- Dashboard auto-actualiza en cada push
- Logs en **Deployments → Output**
- Analíticas en **Analytics**

### Render/Railway

- Logs en **Logs** tab
- Metrics en **Metrics**
- Redeploy en **Deploy** tab

### Troubleshooting

**Problema: "Cannot find module"**

```bash
# En Render/Railway
# Verificar: npm install corre automáticamente
```

**Problema: "Database connection refused"**

```bash
# Verificar DATABASE_URL es correcta
# Crear BD si no existe
```

**Problema: "API timeout"**

```bash
# Aumentar timeout en Vercel: 30s default
# Settings → Functions → Max duration
```

---

## 📊 PERFORMANCE

### Frontend (Vercel)

- Core Web Vitals automáticos
- Edge Network para CDN
- Automatic Image Optimization
- Code Splitting default

### Backend (Render)

- Auto-scaling en horarios picos
- Automatic backups
- SSL certificate included
- 99.5% uptime SLA

---

## 💰 COSTOS ESTIMADOS

### Vercel (Frontend)

- **Gratuito**: 12GB bandwidth/mes, unlimited deployments
- **Pro ($20/mes)**: Más features

### Render (Backend)

- **Gratuito**: Deploy básico (duerme inactivo)
- **Starter ($7/mes)**: Siempre activo
- **Plan recomendado**: Starter o Pro ($25/mes)

### PostgreSQL (Database)

- **Render**: $15/mes (Mini DB)
- **Railway**: $5 crédito/mes + pago por uso
- **Alternativa**: Amazon RDS

---

## 🎯 URLS FINALES EJEMPLO

```
Frontend:  https://almacenes-depositos.vercel.app
Backend:   https://almacenes-api.onrender.com
Database:  PostgreSQL en Render

API Endpoints:
GET    https://almacenes-api.onrender.com/api/health
POST   https://almacenes-api.onrender.com/api/auth/login
GET    https://almacenes-api.onrender.com/api/depositos
...
```

---

## 📝 NOTAS IMPORTANTES

1. **Seguridad**
   - Cambiar JWT_SECRET en producción
   - Usar HTTPS en todo
   - Validar CORS_ORIGIN exactamente

2. **Base de Datos**
   - Hacer backups regulares
   - No resetear DB en producción
   - Usar migrations para cambios

3. **Secretos**
   - Nunca commitear .env.local
   - Usar variables de entorno en plataforma
   - Rotarlas periódicamente

4. **Monitoreo**
   - Activar alertas de errors
   - Monitorear response times
   - Revisar logs regularmente

---

## 🚀 RESUMEN FINAL

```bash
# Frontend
git push origin main
# → Vercel auto-deploya a https://almacenes.vercel.app

# Backend
git push origin main
# → Render auto-deploya a https://almacenes-api.onrender.com

# Listo!
# App funcional en producción con CI/CD automático
```

---

## 📞 SOPORTE

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- Next.js: https://nextjs.org/docs
- Express: https://expressjs.com/

---

**¡Estás listo para deployar a producción!** 🎉
