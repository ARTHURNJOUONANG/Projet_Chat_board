# Application mobile Android — Atelier Capacitor (Keyce)

Ce dépôt suit l’atelier **« Génération d’application mobile avec Capacitor »** (Docker local + GitHub Actions).

## Structure (adaptée à CareerAI)

Next.js est à la **racine** du repo (pas dans un sous-dossier `app/`). Le dossier `app/` est le **App Router** Next.js.

```
Projet chat/
├── app/                    # Routes Next.js
├── capacitor.config.json
├── docker/
│   ├── Dockerfile
│   └── docker-compose.android.yml
├── scripts/
│   ├── build-android.sh
│   ├── docker-entrypoint.sh
│   └── prepare-mobile-webdir.js
├── generated/              # APK + sources (ne pas committer)
│   ├── builds/apk/
│   └── source/android/
└── .github/workflows/build-android.yml
```

## Mode CareerAI (recommandé)

CareerAI utilise des **API Routes**, Supabase et l’IA : un **export statique pur** (`output: 'export'`) ne suffit pas.

L’APK Android est une **WebView** qui ouvre **https://www.careerai.live** (voir `capacitor.config.json` → `server.url`).

## Prérequis

- Node.js 20+
- Docker Desktop (Partie A)
- Compte GitHub (Partie B)

## Installation Capacitor (une fois)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

`capacitor.config.json` est déjà présent (`appId`: `live.careerai.app`).

## Partie A — Build Docker local

1. Copiez `.env.mobile.example` vers `.env` (ou fusionnez les variables).
2. Rendez les scripts exécutables (Git Bash / WSL) :

```bash
chmod +x scripts/build-android.sh scripts/docker-entrypoint.sh
```

3. Lancez :

```bash
./scripts/build-android.sh
```

APK : `generated/builds/apk/app-debug.apk`

Installation USB :

```bash
adb devices
adb install generated/builds/apk/app-debug.apk
```

## Partie B — GitHub Actions

À chaque `push` sur `main` / `develop`, le workflow **Build Android APK** produit un artefact téléchargeable (onglet **Actions**).

Lancement manuel : **Actions** → **Build Android APK** → **Run workflow**.

## Export statique (atelier théorique)

Pour tester l’export comme dans le PDF :

```bash
set CAPACITOR_STATIC_EXPORT=true   # Windows CMD
npm run build:mobile-static
```

Sur CareerAI, ce mode échouera tant que des routes API dynamiques existent — c’est normal.

## Exercice 2 — Version dans l’APK (CI)

Le workflow passe déjà `-PversionCode` et `-PversionName` à Gradle. Pour les appliquer dans `android/app/build.gradle`, ajoutez dans `defaultConfig` :

```gradle
versionCode project.hasProperty('versionCode') ? project.versionCode.toInteger() : 1
versionName project.hasProperty('versionName') ? project.versionName : "1.0.0"
```

(après le premier `npx cap add android`).

## Exercice 3 — Build sur tag `v*`

Ajoutez dans `build-android.yml` :

```yaml
on:
  push:
    tags:
      - 'v*'
```

Puis : `git tag v1.0.0 && git push origin v1.0.0`
