# C2.5 — Référence API CareerAI

Spécification machine : [05-api-openapi.yaml](05-api-openapi.yaml) (OpenAPI 3.0).

Visualisation : importer le YAML dans [Swagger Editor](https://editor.swagger.io) ou Postman.

---

## Authentification

CareerAI utilise **Supabase Auth**. Après login (`/auth/login`), le navigateur envoie les **cookies de session** sur chaque requête vers `/api/*`.

| Contexte | Mécanisme |
|----------|-----------|
| Navigateur | Cookies automatiques (`credentials: 'include'` dans `frontend/lib/api.js`) |
| API externe / Postman | Non supporté nativement sans cookie de session — tester via l’UI ou scripts authentifiés |
| Cron | `Authorization: Bearer <CRON_SECRET>` sur `/api/cron/*` |
| Quiz candidat | Token dans l’URL `/api/candidate/quiz/{token}` — pas de login |

L’auth signup/login est gérée par **Supabase** (hors OpenAPI CareerAI) : [documentation Supabase Auth](https://supabase.com/docs/guides/auth).

---

## Groupes d’endpoints

### Campagnes (`/api/campaigns*`)

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/campaigns` | Liste campagnes utilisateur |
| POST | `/api/campaigns` | Créer campagne (`kind`: `jobs` \| `kandi`) |
| POST | `/api/campaigns/run-now` | Exécution immédiate |
| GET/POST | `/api/campaigns/profile` | Profil candidat campagne |
| GET | `/api/campaigns/report` | Rapport global |
| GET | `/api/campaigns/last-run` | Dernier run |
| GET/POST/DELETE | `/api/campaigns/{id}` | Détail / mise à jour / suppression |
| GET | `/api/campaigns/{id}/applications` | Candidatures d’une campagne |
| GET/POST/DELETE | `/api/campaigns/kandi-contacts` | Contacts Kandi |

Implémentation : [app/api/campaigns/](../app/api/campaigns/).

### Recruteur (`/api/recruiter/*`)

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET/POST | `/api/recruiter/job-postings` | Postes |
| GET/POST | `/api/recruiter/candidates` | Candidats (POST multipart CV) |
| GET/POST | `/api/recruiter/quizzes` | Quiz |
| POST | `/api/recruiter/quizzes/{id}/send` | Envoi email quiz |
| GET | `/api/recruiter/rankings` | Classements |
| POST | `/api/recruiter/relevance-score` | Score pertinence |

### Quiz candidat (public par token)

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/candidate/quiz/{token}` | Charger quiz |
| POST | `/api/candidate/quiz/{token}/submit` | Soumettre réponses |

### Autres (aperçu)

| Préfixe | Rôle |
|---------|------|
| `/api/chat` | Messages IA |
| `/api/upload` | Documents |
| `/api/analyze` | Analyse CV/offre |
| `/api/applications` | Suivi candidatures |
| `/api/analytics` | Statistiques |
| `/api/export` | Export PDF CV |
| `/api/feedback` | Avis utilisateur |

---

## Codes de réponse courants

| Code | Signification |
|------|----------------|
| 200 | Succès |
| 400 | Données invalides |
| 401 | Non authentifié |
| 404 | Ressource introuvable |
| 409 | Conflit (ex. email candidat dupliqué) |
| 500 | Erreur serveur |

---

## Exemple — Créer une campagne

```http
POST /api/campaigns HTTP/1.1
Host: www.careerai.live
Content-Type: application/json
Cookie: <session Supabase>

{
  "duration_days": 7,
  "max_applications_per_day": 15,
  "kind": "jobs"
}
```

Réponse :

```json
{
  "campaign": {
    "id": "uuid",
    "status": "active",
    "kind": "jobs",
    "ends_at": "2026-05-09T12:00:00.000Z"
  }
}
```

---

## Évolutions

- Couverture OpenAPI complète des 33 routes
- Génération client TypeScript depuis le YAML
- Versioning API (`/api/v1/`) si breaking changes
