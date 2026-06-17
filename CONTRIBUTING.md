# Contribuer à CareerAI

Merci de contribuer au projet.

## Branches

- `main` : stable / production
- `develop` : intégration
- `feature/<sujet>` : nouvelle fonctionnalité
- `fix/<sujet>` : correction

## Workflow conseillé

1. Créer une branche depuis `develop`
2. Implémenter + tests (`npm test`)
3. Mettre à jour la documentation (`docs/` si impact API/archi)
4. Ouvrir une Pull Request vers `develop`

## Convention de commit

Format recommandé :

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`

Exemple : `feat: add kandi contacts API endpoints`

## Checklist PR

- [ ] Build local OK (`npm run build`)
- [ ] Tests OK (`npm test`)
- [ ] Pas de secrets commités (`.env*`, clés API)
- [ ] Migrations SQL ajoutées si schéma changé
- [ ] Docs mises à jour (OpenAPI, installation, etc.)

## Revue de code

- Une PR doit être revue avant merge.
- Favoriser les diffs petits et ciblés.
- Expliquer le **pourquoi** dans la description PR.

