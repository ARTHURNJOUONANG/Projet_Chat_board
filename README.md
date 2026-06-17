# CareerAI — Assistant carrière propulsé par l’IA

Application full-stack de gestion de carrière : chat IA, CV, campagnes de candidatures automatiques, espace recruteur (analyse CV, quiz, classements).

- **Production :** [www.careerai.live](https://www.careerai.live)
- **Dépôt :** [github.com/ARTHURNJOUONANG/Projet_Chat_board](https://github.com/ARTHURNJOUONANG/Projet_Chat_board)

## Stack

| Couche | Technologies |
|--------|----------------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes (Node.js), services dans `backend/services/` |
| Données | Supabase (PostgreSQL, Auth, Storage, RLS) |
| IA | Groq (llama-3.1-8b-instant) |
| Emails | Resend |
| Mobile | Capacitor (WebView → careerai.live) |

## Démarrage rapide

```bash
git clone https://github.com/ARTHURNJOUONANG/Projet_Chat_board.git
cd Projet_Chat_board
npm install
cp .env.example .env.local
# Renseigner Supabase + GROQ_API_KEY (voir .env.example)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Installation complète (migrations SQL, Docker, production) : **[docs/06-installation-exploitation.md](docs/06-installation-exploitation.md)**.

## Documentation technique (grille RNCP)

Toute la documentation d’architecture, API, tests, RGPD et exploitation est dans **[docs/](docs/README.md)**.

| Document | Contenu |
|----------|---------|
| [docs/README.md](docs/README.md) | Index + matrice critères C1.3 / C2.x |
| [docs/01-architecture-fonctionnelle.md](docs/01-architecture-fonctionnelle.md) | Besoins, BPMN, trade-offs |
| [docs/02-architecture-logicielle.md](docs/02-architecture-logicielle.md) | C4, patterns, séquences |
| [docs/05-api-openapi.yaml](docs/05-api-openapi.yaml) | Spécification OpenAPI |
| [MOBILE-CAPACITOR.md](MOBILE-CAPACITOR.md) | Build APK Android |

## Tests

```bash
npm test              # tests unitaires (Vitest)
npm run test:smoke    # smoke API (serveur local requis)
```

## Contribution

Voir [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

ISC
