# Stratégie de Tests — DataShare

Ce document décrit la stratégie de tests appliquée sur l'ensemble du projet DataShare.  
Le même standard est appliqué à chaque phase avant de créer le tag Git et de pousser.

---

## Pyramide de tests

```
          ▲
         /E2E\        Cypress (parcours utilisateur complet)
        /------\
       /  Intég. \    Supertest (API backend avec DB réelle)
      /------------\
     /   Unitaires  \ Jest (backend) + Vitest (frontend)
    /________________\
```

---

## Outils

| Outil | Scope | Commande | Statut |
|:---|:---|:---|:---|
| **Jest** | Backend — Unitaires | `cd backend && npm run test` | ✅ Opérationnel |
| **Jest Coverage** | Backend — Couverture | `cd backend && npm run test:cov` | ✅ Opérationnel |
| **Supertest** | Backend — Intégration E2E | `cd backend && npm run test:e2e` | ⚙️ En place (à enrichir) |
| **Vitest** | Frontend — Unitaires | `cd frontend && npm run test` | ✅ Opérationnel |
| **Cypress** | E2E — Navigateur complet | `npx cypress run` | ❌ À installer |
| **GitHub Actions** | CI/CD — Automatisation | Push sur `main` | ✅ Opérationnel |

---

## Tests par phase

### ✅ Phase 1 — Authentification (US03/US04)

**Backend — Unitaires (Jest)**
- `auth.service.spec.ts` : inscription réussie, email dupliqué → 409, connexion valide → JWT.

**Backend — Intégration (Supertest)**
- `POST /api/auth/register` → 201, 409 si doublon.
- `POST /api/auth/login` → 200 + `access_token`, 401 si mauvais mot de passe.

**Frontend — E2E (Cypress)**  
*(À mettre en place — fichier : `cypress/e2e/auth.cy.ts`)*
- Scénario inscription → redirection login.
- Scénario connexion → redirection "Mon espace".
- Scénario erreur → message d'erreur visible.

---

### ✅ Phase 2 — Téléversement (US01)

**Backend — Unitaires**
- `files.service.spec.ts` : upload valide → fichier créé en DB avec `downloadToken` UUID unique.

**Backend — Intégration**
- `POST /api/files/upload` (avec JWT) → 201 + `{ id, originalName, size, mimetype, downloadToken, createdAt }`.
- `POST /api/files/upload` sans token → 401 Unauthorized.
- `POST /api/files/upload` sans fichier → 400 Bad Request.

**Frontend — E2E (Cypress)**  
- Clic sur le portail sans être connecté → redirection `/login`.
- Clic sur le portail connecté → modal d'upload s'ouvre.
- Drag & drop d'un fichier → nom + poids affichés · bouton "Envoyer" activé.
- Upload → barre de progression → état succès avec lien copiable.

---

### ✅ Phase 3 — Téléchargement & partage (US02)

**Backend — Unitaires**
- `files.service.spec.ts` : `findByToken` valide → retourne le fichier, token inconnu → null.
- Lien expiré → `GoneException` 410.

**Backend — Intégration**
- `GET /api/files/info/:token` → 200 + métadonnées JSON (sans JWT).
- `GET /api/files/info/:token` (token inconnu) → 404.
- `GET /api/files/download/:token` → 200 + stream fichier avec `Content-Disposition: attachment`.
- `GET /api/files/download/:token` (expiré) → 410.

**Frontend — E2E (Cypress)**
- Accès à `/download/:token` valide → nom du fichier + bouton "Télécharger" visible.
- Clic "Télécharger" → téléchargement déclenché sans authentification.
- Token inconnu → état "Fichier introuvable" affiché.
- Token expiré → état "Lien expiré" affiché.

---

## Standard de livraison (toutes phases)

```
1. Développement de la feature
2. Tests unitaires (Jest / Vitest)    → npm run test
3. Tests d'intégration (Supertest)    → npm run test:e2e
4. Tests E2E Cypress                  → npx cypress run
5. Screenshots dans screenshots/README.md
6. Commit conventionnel               → feat/fix/test/docs: ...
7. Tag Git                            → vX.0-phaseX-done
8. Push par l'utilisateur             → git push origin main --tags
```

---

## Commandes utiles

```bash
# Tout d'un coup (backend)
cd backend && npm run test && npm run test:e2e

# Cypress interactif (pour le debug)
npx cypress open

# GitHub Actions — déclenché automatiquement au push sur main
```

---

> Les workflows GitHub Actions seront configurés pour exécuter automatiquement l'ensemble de la pyramide à chaque `push` sur `main`.
