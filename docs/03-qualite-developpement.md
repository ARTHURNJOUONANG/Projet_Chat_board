# C2.2 — Qualité de développement

## 1. Principes appliqués

### SOLID (exemples dans CareerAI)

| Principe | Application |
|----------|-------------|
| **S** — Single Responsibility | `CampaignService.js` : logique campagnes uniquement ; routes API = HTTP + auth |
| **O** — Open/Closed | Nouvelles sources d’offres ajoutées via fonctions `fetchJobsFrom*` sans modifier le cœur du matching |
| **L** — Liskov | Services interchangeables derrière interfaces stables (`runCampaignDay`) |
| **I** — Interface Segregation | API découpée par domaine (`/api/campaigns`, `/api/recruiter`) |
| **D** — Dependency Inversion | Routes reçoivent `supabase` client ; services ne dépendent pas de React |

### Design patterns

| Pattern | Usage |
|---------|--------|
| **Service layer** | `backend/services/*.js` |
| **Repository implicite** | Accès Supabase centralisé dans services |
| **Context (React)** | `AuthContext`, `ToastContext`, `LanguageContext` |
| **Route Handler** | Pattern Next.js App Router pour API REST |

---

## 2. Conventions de code

### Frontend

- Composants interactifs : `'use client'` en tête de fichier.
- Styles : Tailwind CSS, classes utilitaires cohérentes.
- Appels API : passer par [frontend/lib/api.js](../frontend/lib/api.js) avec `credentials: 'include'`.
- Textes utilisateur : [frontend/lib/translations.js](../frontend/lib/translations.js) (FR/EN).

### Backend / API

- Routes : `app/api/**/route.js`, exports `GET`, `POST`, `PATCH`, `DELETE`.
- Session : `createRouteHandlerClient({ cookies })`.
- Secrets : uniquement `process.env.*` côté serveur.
- Réponses : `NextResponse.json({ error: '...' }, { status })`.

### Base de données

- Migrations idempotentes dans `supabase-migrations/`.
- RLS activé sur toutes les tables métier.

---

## 3. Gestion de version et revues

Voir [CONTRIBUTING.md](../CONTRIBUTING.md) pour le process complet.

| Branche | Usage |
|---------|--------|
| `main` | Production stable (`careerai.live`) |
| `develop` | Intégration continue |
| `feature/*` | Nouvelles fonctionnalités |
| `fix/*` | Corrections |

Workflow CI : [.github/workflows/build-android.yml](../.github/workflows/build-android.yml) sur `main` / `develop`.

---

## 4. Dette technique connue

| Sujet | Statut |
|-------|--------|
| Couverture tests partielle | Voir [04-strategie-tests.md](04-strategie-tests.md) |
| OpenAPI partielle | Routes principales documentées, extension progressive |

