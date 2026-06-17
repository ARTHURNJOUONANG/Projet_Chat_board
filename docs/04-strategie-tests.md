# C2.3 — Stratégie de tests

## 1. État actuel

Le projet dispose historiquement de tests manuels (`scripts/test-saas-api.js`) mais peu de tests automatisés unitaires.

Ce dossier ajoute une base pragmatique :

- `npm test` : tests unitaires Vitest
- `npm run test:coverage` : couverture sur périmètre testé
- `npm run test:smoke` : smoke API (serveur local requis)

## 2. Pyramide de tests

| Niveau | Objectif | Outils |
|--------|----------|--------|
| Unitaires | Vérifier règles métiers pures | Vitest |
| Intégration API | Vérifier endpoints critiques avec session | `scripts/test-saas-api.js` |
| E2E (roadmap) | Parcours utilisateur complets | Playwright (à ajouter) |

## 3. Cas couverts (V1)

### Unitaires

- Détection type de fichier CV (PDF/DOCX/autre)
- Validation simple d’email contact
- Calcul de borne de campagne (`duration_days`, `max_per_day`)

### Smoke intégration

- Création poste recruteur
- Génération quiz
- Liste candidats / classements

## 4. Couverture et justification

La couverture actuelle est **partielle** et centrée sur des fonctions pures.  
C’est volontaire pour lancer une base stable sans mock massif de Supabase/Resend/Groq.

Objectif court terme : couvrir prioritairement

1. `CampaignService` (matching / formatage)
2. validations d’entrée des routes recruteur
3. erreurs métier critiques (doublons, permissions)

## 5. Exécution

```bash
npm test
npm run test:coverage
npm run test:smoke
```

## 6. Roadmap tests

- Ajouter tests d’intégration API avec base de test Supabase dédiée.
- Ajouter tests non-régression front sur pages auth et campagnes.
- Ajouter E2E Playwright sur parcours principal (signup → campagne).

