#!/bin/bash

# Script de preview local pour tester le site en mobile/desktop
# Usage: ./scripts/preview-local.sh [mobile|desktop]

MODE=${1:-mobile}
PORT=${2:-5173}

echo "🚀 Démarrage du serveur de preview..."
echo "📍 Mode: $MODE"
echo "🌐 Port: $PORT"
echo ""

# Aller dans le dossier client
cd "$(dirname "$0")/../client" || exit

# Démarrer le serveur de dev
if [ "$MODE" = "mobile" ]; then
  echo "📱 Mode mobile activé"
  echo "💡 Ouvre http://localhost:$PORT/store dans Chrome"
  echo "💡 Appuie sur F12 → Cmd+Shift+M pour le mode mobile"
  echo ""
  npm run dev -- --port $PORT --host
else
  echo "🖥️  Mode desktop"
  echo "💡 Ouvre http://localhost:$PORT/store dans ton navigateur"
  echo ""
  npm run dev -- --port $PORT --host
fi

