#!/bin/bash

# Script de inicialización rápida del proyecto

echo "📦 Almacenes & Depósitos - Setup Automático"
echo "==========================================="
echo ""

# 1. Crear base de datos
echo "🗄️  Creando base de datos..."
createdb almacenes_depositos 2>/dev/null || echo "⚠️  Base de datos ya existe"
echo "✅ Base de datos lista"
echo ""

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install
echo "✅ Dependencias instaladas"
echo ""

# 3. Info de inicio
echo "🚀 ¡Listo para iniciar!"
echo ""
echo "Comandos disponibles:"
echo "  npm run dev              # Backend + Frontend"
echo "  npm run dev:backend      # Solo Backend"
echo "  npm run dev:frontend     # Solo Frontend"
echo ""
echo "URLs:"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:5000"
echo "  API:       http://localhost:5000/api"
echo ""
echo "Para empezar:"
echo "  npm run dev"
echo ""
