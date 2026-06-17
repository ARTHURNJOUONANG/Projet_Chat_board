#!/bin/bash
#
# docker-entrypoint.sh — build Android dans le conteneur (atelier Keyce / Capacitor)
#
set -e
set -o pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_step() { echo -e "\n${BLUE}▶ $1${NC}"; }
log_ok()   { echo -e "${GREEN}✓ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
log_err()  { echo -e "${RED}✗ $1${NC}"; exit 1; }

APP_DIR="/workspace/app"
cd "$APP_DIR"

log_step "Installation des dépendances Node.js..."
npm ci --prefer-offline 2>/dev/null || npm install
log_ok "Dépendances installées"

REMOTE_URL="${CAPACITOR_REMOTE_URL:-https://www.careerai.live}"
USE_STATIC="${CAPACITOR_STATIC_EXPORT:-false}"

if [ "$USE_STATIC" = "true" ]; then
  log_step "Build Next.js en mode export statique..."
  export CAPACITOR_STATIC_EXPORT=true
  npm run build || log_err "Export statique échoué (API routes Next.js non supportées en export pur)"
  if [ ! -d "out" ]; then
    log_err "Le dossier out/ n'existe pas. Vérifiez next.config.js (output: export)"
  fi
  log_ok "Build Next.js terminé — dossier out/ généré"
else
  log_step "Mode WebView distante (CareerAI) — préparation de out/..."
  export CAPACITOR_REMOTE_URL="$REMOTE_URL"
  node scripts/prepare-mobile-webdir.js
  log_ok "Dossier out/ prêt (charge $REMOTE_URL)"
fi

log_step "Ajout de la plateforme Android..."
if [ -d "android" ]; then
  log_warn "Ancien dossier android/ détecté, suppression..."
  rm -rf android
fi
npx cap add android
log_ok "Plateforme Android ajoutée"

log_step "Synchronisation des assets web vers Android..."
npx cap sync android
log_ok "Synchronisation terminée"

log_step "Compilation de l'APK Android..."
cd "$APP_DIR/android"
chmod +x gradlew
./gradlew assembleDebug \
  --no-daemon \
  --stacktrace \
  -Dorg.gradle.jvmargs="-Xmx2g"
log_ok "Compilation terminée"

log_step "Déplacement de l'APK..."
APK_SOURCE="$APP_DIR/android/app/build/outputs/apk/debug/app-debug.apk"
APK_DEST="/workspace/generated/builds/apk"
SOURCE_DEST="/workspace/generated/source"
mkdir -p "$APK_DEST"
mkdir -p "$SOURCE_DEST"
cp "$APK_SOURCE" "$APK_DEST/app-debug.apk"
cp -r "$APP_DIR/android" "$SOURCE_DEST/"
log_ok "APK disponible dans : generated/builds/apk/app-debug.apk"

APK_SIZE=$(du -sh "$APK_DEST/app-debug.apk" | cut -f1)
echo ""
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e "${GREEN} BUILD ANDROID TERMINÉ AVEC SUCCÈS${NC}"
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e " APK     : generated/builds/apk/app-debug.apk"
echo -e " Taille  : $APK_SIZE"
echo -e " Source  : generated/source/android/"
echo -e "${GREEN}════════════════════════════════════${NC}"
