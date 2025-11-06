#!/bin/bash

# 🔍 SCRIPT DE VÉRIFICATION PRÉ-DÉPLOIEMENT RENDER
# Vérifie que tout est prêt avant de déployer sur Render

echo "╔═══════════════════════════════════════════════════╗"
echo "║  🔍 VÉRIFICATION PRÉ-DÉPLOIEMENT RENDER          ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR" || exit 1

# Compteurs
CHECKS_PASSED=0
CHECKS_FAILED=0
WARNINGS=0

# Fonction pour afficher un succès
success() {
    echo "✅ $1"
    ((CHECKS_PASSED++))
}

# Fonction pour afficher un échec
fail() {
    echo "❌ $1"
    ((CHECKS_FAILED++))
}

# Fonction pour afficher un warning
warn() {
    echo "⚠️  $1"
    ((WARNINGS++))
}

echo "📍 Répertoire: $PROJECT_DIR"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 1. STRUCTURE DU PROJET"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier fichiers essentiels
if [ -f "package.json" ]; then
    success "package.json existe"
else
    fail "package.json manquant"
fi

if [ -f "render.yaml" ]; then
    success "render.yaml existe"
else
    fail "render.yaml manquant"
fi

if [ -d "server" ]; then
    success "Dossier server/ existe"
else
    fail "Dossier server/ manquant"
fi

if [ -f "server/index.ts" ]; then
    success "server/index.ts existe"
else
    fail "server/index.ts manquant"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 2. CONFIGURATION PACKAGE.JSON"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier scripts npm
if grep -q '"build"' package.json; then
    success "Script 'build' défini"
else
    fail "Script 'build' manquant"
fi

if grep -q '"start:render"' package.json; then
    success "Script 'start:render' défini"
else
    warn "Script 'start:render' manquant (recommandé)"
fi

if grep -q '"start:prod"' package.json; then
    success "Script 'start:prod' défini"
else
    warn "Script 'start:prod' manquant"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗂️  3. FICHIERS DE CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f ".env.example" ]; then
    success ".env.example existe (bon pour référence)"
else
    warn ".env.example manquant (recommandé)"
fi

if [ -f ".gitignore" ]; then
    success ".gitignore existe"

    if grep -q ".env" .gitignore; then
        success ".env dans .gitignore (sécurisé)"
    else
        fail ".env PAS dans .gitignore (DANGER!)"
    fi
else
    fail ".gitignore manquant"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 4. CONFIGURATION RENDER.YAML"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if grep -q "buildCommand:" render.yaml; then
    BUILD_CMD=$(grep "buildCommand:" render.yaml | cut -d: -f2-)
    success "buildCommand défini: $BUILD_CMD"
else
    fail "buildCommand manquant dans render.yaml"
fi

if grep -q "startCommand:" render.yaml; then
    START_CMD=$(grep "startCommand:" render.yaml | cut -d: -f2-)
    success "startCommand défini: $START_CMD"
else
    fail "startCommand manquant dans render.yaml"
fi

if grep -q "healthCheckPath:" render.yaml; then
    success "healthCheckPath défini"
else
    warn "healthCheckPath manquant (recommandé)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 5. TEST DE BUILD LOCAL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "⏳ Test du build local..."

if npm install --silent 2>&1 | grep -q "error"; then
    fail "npm install a des erreurs"
else
    success "npm install fonctionne"
fi

if npm run build 2>&1 | grep -q "error"; then
    fail "npm run build a des erreurs"
else
    success "npm run build fonctionne"
fi

# Vérifier que dist/ existe après build
if [ -d "dist" ]; then
    success "Dossier dist/ créé par le build"

    if [ -f "dist/index.js" ]; then
        success "dist/index.js généré"
    else
        fail "dist/index.js manquant après build"
    fi
else
    fail "Dossier dist/ non créé par le build"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 6. SÉCURITÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier qu'il n'y a pas de .env committé
if git ls-files | grep -q "^\.env$"; then
    fail ".env est tracké par Git (DANGER! Retirer immédiatement!)"
else
    success ".env n'est pas tracké par Git (sécurisé)"
fi

# Vérifier qu'il n'y a pas de clés API hardcodées
if grep -r "sk_live_" --include="*.ts" --include="*.js" server/ 2>/dev/null; then
    fail "Clés Stripe trouvées dans le code (DANGER!)"
else
    success "Pas de clés API hardcodées détectées"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 7. CONFIGURATION PRODUCTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier que le serveur utilise process.env.PORT
if grep -q "process.env.PORT" server/index.ts; then
    success "Serveur utilise process.env.PORT (Render compatible)"
else
    warn "Serveur n'utilise peut-être pas process.env.PORT"
fi

# Vérifier écoute sur 0.0.0.0 en production
if grep -q "0.0.0.0" server/index.ts; then
    success "Serveur écoute sur 0.0.0.0 (production)"
else
    warn "Serveur devrait écouter sur 0.0.0.0 en production"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Tests réussis:  $CHECKS_PASSED"
echo "❌ Tests échoués:  $CHECKS_FAILED"
echo "⚠️  Avertissements: $WARNINGS"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo "╔═══════════════════════════════════════════════════╗"
    echo "║  🎉 PRÊT POUR DÉPLOIEMENT RENDER !               ║"
    echo "╚═══════════════════════════════════════════════════╝"
    echo ""
    echo "Prochaines étapes:"
    echo "1. Push vers GitHub: git push origin main"
    echo "2. Render Dashboard: https://dashboard.render.com"
    echo "3. New + → Blueprint → KEREN-Z"
    echo "4. Configurer variables d'environnement"
    echo ""
    echo "📚 Guide complet: RENDER_DEPLOYMENT_COMPLETE.md"
    exit 0
else
    echo "╔═══════════════════════════════════════════════════╗"
    echo "║  ⚠️  PROBLÈMES DÉTECTÉS                          ║"
    echo "╚═══════════════════════════════════════════════════╝"
    echo ""
    echo "Corriger les erreurs ci-dessus avant de déployer."
    echo ""
    exit 1
fi
