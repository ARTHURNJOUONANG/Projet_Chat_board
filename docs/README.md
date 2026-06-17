# Documentation technique CareerAI — Grille C1.3 / C2.x

Dossier de référence pour le projet **CareerAI** ([careerai.live](https://www.careerai.live)), aligné sur la grille d’évaluation RNCP (conception, architecture, développement, tests, documentation).

## Table des matières

| Document | Sujet |
|----------|--------|
| [01-architecture-fonctionnelle.md](01-architecture-fonctionnelle.md) | Besoins métier, BPMN, trade-offs, sécurité by design (**C1.3**) |
| [02-architecture-logicielle.md](02-architecture-logicielle.md) | C4, patterns, séquences, scalabilité (**C2.1**) |
| [03-qualite-developpement.md](03-qualite-developpement.md) | SOLID, conventions, Git, revues (**C2.2**) |
| [04-strategie-tests.md](04-strategie-tests.md) | Pyramide de tests, couverture, smoke (**C2.3**) |
| [05-api-reference.md](05-api-reference.md) | Guide des API REST |
| [05-api-openapi.yaml](05-api-openapi.yaml) | Spécification OpenAPI 3.0 |
| [06-installation-exploitation.md](06-installation-exploitation.md) | Installation, déploiement, cron, dépannage (**C2.5**) |
| [07-rgpd-accessibilite.md](07-rgpd-accessibilite.md) | RGPD, RGAA (**C2.5**) |

Voir aussi : [MOBILE-CAPACITOR.md](../MOBILE-CAPACITOR.md) (APK Android).

---

## Matrice critère → preuve

### C1.3 — Concevoir la solution fonctionnelle et l’architecture informatique

| Critère | Preuve dans le projet |
|---------|------------------------|
| Architecture répond aux besoins | [01-architecture-fonctionnelle.md](01-architecture-fonctionnelle.md) § Besoins et acteurs |
| Trade-offs documentés | [01-architecture-fonctionnelle.md](01-architecture-fonctionnelle.md) § Choix architecturaux |
| Modélisation (BPMN) | [01-architecture-fonctionnelle.md](01-architecture-fonctionnelle.md) § Parcours BPMN |
| Sécurité by design | [01-architecture-fonctionnelle.md](01-architecture-fonctionnelle.md) § Sécurité ; [middleware.js](../middleware.js) ; RLS [supabase-schema-saas.sql](../supabase-schema-saas.sql) |

### C2.1 — Concevoir l’architecture logicielle

| Critère | Preuve |
|---------|--------|
| Patterns justifiés | [02-architecture-logicielle.md](02-architecture-logicielle.md) § Pattern monolithe modulaire |
| Diagrammes C4 / UML | [02-architecture-logicielle.md](02-architecture-logicielle.md) § Diagrammes |
| Interfaces API | [05-api-openapi.yaml](05-api-openapi.yaml), [05-api-reference.md](05-api-reference.md) |
| Sécurité et scalabilité | [02-architecture-logicielle.md](02-architecture-logicielle.md) § Sécurité et scalabilité |

### C2.2 — Développer les composants logiciels

| Critère | Preuve |
|---------|--------|
| SOLID / design patterns | [03-qualite-developpement.md](03-qualite-developpement.md) ; `backend/services/` |
| Code propre et documenté | Conventions dans [03-qualite-developpement.md](03-qualite-developpement.md) |
| Versionnement / branches | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| Revues de code | [CONTRIBUTING.md](../CONTRIBUTING.md) § Pull requests |

### C2.3 — Intégrer et tester

| Critère | Preuve |
|---------|--------|
| Tests unitaires | `npm test` — [backend/lib/fileMime.test.js](../backend/lib/fileMime.test.js), [backend/lib/campaignMath.test.js](../backend/lib/campaignMath.test.js) |
| Tests d’intégration | `npm run test:smoke` — [scripts/test-saas-api.js](../scripts/test-saas-api.js) |
| Couverture mesurée | [04-strategie-tests.md](04-strategie-tests.md) § Couverture |
| Non-régression | CI [.github/workflows/build-android.yml](../.github/workflows/build-android.yml) ; smoke documenté |

### C2.5 — Documenter et maintenabilité

| Critère | Preuve |
|---------|--------|
| Documentation API (OpenAPI) | [05-api-openapi.yaml](05-api-openapi.yaml) |
| Guide installation / exploitation | [06-installation-exploitation.md](06-installation-exploitation.md) |
| RGPD | [07-rgpd-accessibilite.md](07-rgpd-accessibilite.md) § RGPD |
| Accessibilité (RGAA) | [07-rgpd-accessibilite.md](07-rgpd-accessibilite.md) § Accessibilité |

---

## Dépôt et production

- **Code source :** [github.com/ARTHURNJOUONANG/Projet_Chat_board](https://github.com/ARTHURNJOUONANG/Projet_Chat_board)
- **Application :** [www.careerai.live](https://www.careerai.live)
