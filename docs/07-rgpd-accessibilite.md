# C2.5 — RGPD et accessibilité

Ce document décrit l’état actuel de conformité de CareerAI et les actions prévues.  
Il ne remplace pas un audit juridique ou RGAA certifié.

## 1. RGPD

### 1.1 Finalités

| Finalité | Données | Base légale |
|----------|---------|-------------|
| Création de compte | Email, mot de passe (hash Supabase) | Exécution du contrat |
| Assistant IA | Messages chat, contexte CV | Exécution du contrat |
| Campagnes auto | Profil candidat, CV, logs d’envoi | Consentement (`allow_auto_apply`) + contrat |
| Recruteur | CV candidats, quiz, classements | Intérêt légitime B2B |

### 1.2 Données traitées

| Catégorie | Exemples | Emplacement |
|-----------|----------|-------------|
| Identité | Nom, prénom, email, téléphone | `candidate_profiles`, `candidates` |
| Documents | CV PDF/DOCX + texte extrait | Supabase Storage `documents`, `uploaded_documents` |
| Suivi | candidatures envoyées, statuts | `campaign_applications`, `job_applications` |

### 1.3 Sous-traitants

- Supabase (auth, DB, storage)
- Groq (génération IA)
- Resend (emails transactionnels)

### 1.4 Mesures techniques

- HTTPS en transit.
- RLS Supabase activé.
- Secrets côté serveur uniquement (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `GROQ_API_KEY`).
- Middleware d’accès : [middleware.js](../middleware.js).
- Consentement explicite campagne via `allow_auto_apply`.

### 1.5 Droits utilisateurs

| Droit | État actuel |
|-------|-------------|
| Accès / rectification | Possible via interfaces profil / CV |
| Effacement | Suppression utilisateur Supabase (process manuel) |
| Opposition | Pause campagnes, désactivation auto-apply |

Actions à ajouter : bouton « exporter mes données » + « supprimer mon compte » dans Paramètres.

## 2. Accessibilité (RGAA/WCAG)

### 2.1 Écrans audités

- [app/auth/signup/page.js](../app/auth/signup/page.js)
- [app/auth/login/page.js](../app/auth/login/page.js)
- [frontend/components/JobCampaigns.js](../frontend/components/JobCampaigns.js)
- [frontend/components/LanguageSwitcher.js](../frontend/components/LanguageSwitcher.js)

### 2.2 Constat rapide

| Critère | État | Preuve |
|---------|------|--------|
| Langue de page | OK | `<html lang="fr">` dans [app/layout.js](../app/layout.js) |
| Labels formulaires | OK | `label htmlFor` sur signup/login |
| Messages d’erreur texte | OK | erreurs visibles dans formulaires |
| Contraste | Partiel | thèmes `zinc-400/500` à vérifier AA |
| Focus clavier | Partiel | `focus:ring` présent, pas uniforme partout |
| Annonces dynamiques (toasts) | À améliorer | pas de `aria-live` global |

### 2.3 Plan d’amélioration

1. Ajouter une zone `aria-live="polite"` pour toasts globaux.
2. Harmoniser focus visible sur tous les composants interactifs.
3. Audit automatique axe-core sur parcours auth + campagne.
4. Revue contraste WCAG AA sur palette sombre.

