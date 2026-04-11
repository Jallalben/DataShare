# Stratégie de tests — DataShare

Chaque fonctionnalité est couverte avant de créer le tag Git. On part des tests unitaires vers les tests navigateur, dans cet ordre.

---

## La pyramide

Les tests unitaires couvrent la logique métier isolée. Les tests d'intégration vérifient les endpoints avec une vraie base de données. Les tests E2E simulent un utilisateur réel dans le navigateur.

---

## Les outils en place

Jest couvre les tests unitaires et d'intégration du backend. Les tests unitaires se lancent avec `cd backend && npm run test`, les tests d'intégration avec `cd backend && npm run test:e2e`.

Vitest couvre les tests unitaires du frontend. Il se lance avec `cd frontend && npm run test`.

Cypress est prévu pour les tests E2E navigateur en Phase 7. Il n'est pas encore installé.

GitHub Actions exécute Jest et Vitest automatiquement à chaque push sur `main`.

---

## Ce qui est couvert par phase

### Phase 1 — Authentification

Backend (Jest) : inscription réussie, email dupliqué retourne 409, connexion valide retourne un JWT, mauvais mot de passe retourne 401.

Backend (Supertest) : `POST /api/auth/register` retourne 201, 409 en cas de doublon. `POST /api/auth/login` retourne 200 avec le token, 401 si les identifiants sont faux.

Frontend (Cypress, à venir) : parcours inscription puis connexion, affichage des messages d'erreur.

---

### Phase 2 — Upload

Backend (Jest) : upload valide crée un enregistrement en base avec un `downloadToken` UUID. Upload sans fichier retourne 400. Upload sans JWT retourne 401.

Backend (Supertest) : `POST /api/files/upload` avec un JWT valide retourne 201 avec les métadonnées.

Frontend (Cypress, à venir) : clic sur le portail sans être connecté redirige vers login, drag & drop d'un fichier déclenche l'upload, le lien de partage est affiché après succès.

---

### Phase 3 — Téléchargement

Backend (Jest) : `findByToken` retourne le fichier si le token existe, null sinon. Un token expiré lève une `GoneException` 410.

Backend (Supertest) : `GET /api/files/info/:token` retourne 200 sans JWT, 404 si inconnu, 410 si expiré. `GET /api/files/download/:token` stream le fichier.

Frontend (Cypress, à venir) : la page de téléchargement affiche les métadonnées, le bouton déclenche le téléchargement, les états d'erreur sont visibles.

---

## Standard de livraison

Avant chaque tag Git :

1. Les tests unitaires passent
2. Les tests d'intégration passent
3. Une capture d'écran est ajoutée dans `screenshots/`
4. Un commit conventionnel est créé
5. Le tag est créé localement
6. Le push est fait par l'utilisateur

---

## Commandes rapides

```bash
# Backend
cd backend && npm run test
cd backend && npm run test:e2e

# Frontend
cd frontend && npm run test

# Cypress (Phase 7)
npx cypress open
```
