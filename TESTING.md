# Stratégie de tests — DataShare

Chaque fonctionnalité est couverte avant de créer le tag Git. On part des tests unitaires vers les tests navigateur, dans cet ordre.

---

## La pyramide

Les tests unitaires couvrent la logique métier isolée. Les tests d'intégration vérifient les endpoints avec une vraie base de données. Les tests E2E simulent un utilisateur réel dans le navigateur.

---

## Les outils en place

Jest couvre les tests unitaires et d'intégration du backend.

Vitest couvre les tests unitaires du frontend.

Cypress 15 couvre les tests E2E navigateur depuis la Phase 7. Trois scénarios sont couverts : inscription et connexion, upload d'un fichier, téléchargement via lien.

GitHub Actions exécute Jest, Vitest et Cypress automatiquement à chaque push sur `main`.

---

## Ce qui est couvert par phase

### Phase 1 — Authentification

Backend (Jest) : inscription réussie, email dupliqué retourne 409, connexion valide retourne un JWT, mauvais mot de passe retourne 401.

Backend (Supertest) : `POST /api/auth/register` retourne 201, 409 en cas de doublon. `POST /api/auth/login` retourne 200 avec le token, 401 si les identifiants sont faux.

Frontend (Cypress) : parcours inscription puis connexion, affichage des messages d'erreur avec des identifiants incorrects.

---

### Phase 2 — Upload

Backend (Jest) : upload valide crée un enregistrement en base avec un `downloadToken` UUID. Upload sans fichier retourne 400. Upload sans JWT retourne 401.

Backend (Supertest) : `POST /api/files/upload` avec un JWT valide retourne 201 avec les métadonnées.

Frontend (Cypress) : upload d'un fichier via `selectFile`, vérification du lien de partage affiché après succès, vérification que le fichier apparaît dans Mon espace.

---

### Phase 3 — Téléchargement

Backend (Jest) : `findByToken` retourne le fichier si le token existe, null sinon. Un token expiré lève une `GoneException` 410.

Backend (Supertest) : `GET /api/files/info/:token` retourne 200 sans JWT, 404 si inconnu, 410 si expiré. `GET /api/files/download/:token` stream le fichier.

Frontend (Cypress) : la page de téléchargement affiche les métadonnées du fichier, le bouton de téléchargement est visible, un token inconnu retourne bien 404.

---

### Phase 4 — Historique

Backend (Jest) : `findByUserId` retourne les fichiers de l'utilisateur triés par date décroissante. Un appel sans JWT retourne 401.

Backend (Supertest) : `GET /api/files/my` retourne 200 avec la liste des fichiers, `expiresAt` inclus dans chaque entrée.

Frontend (Cypress) : les fichiers actifs apparaissent dans la liste, les métadonnées sont affichées correctement.

---

### Phase 5 — Suppression

Backend (Jest) : `deleteFile` supprime le fichier si l'utilisateur est propriétaire, lève `ForbiddenException` sinon.

Backend (Supertest) : `DELETE /api/files/:id` retourne 204 après suppression, 403 si le fichier appartient à un autre utilisateur.

Frontend (Cypress) : le fichier disparaît de la liste après suppression.

---

### Phase 6 — Expiration automatique

Backend (Jest) : `saveFile` calcule `expiresAt` à 7 jours par défaut, respecte la valeur passée entre 1 et 7, rejette les valeurs hors limites.

Le cron `purgeExpiredFiles` supprime les fichiers dont `expiresAt < NOW()` de la base et du disque.

Frontend (Cypress) : le sélecteur de durée est visible dans la modale d'upload, la valeur par défaut est 7 jours, la durée choisie est transmise au backend.

---

## Standard de livraison

Avant chaque tag Git :

1. Les tests unitaires passent
2. Les tests d'intégration passent
3. Les tests Cypress passent
4. Une capture d'écran est ajoutée dans `screenshots/`
5. Un commit conventionnel est créé
6. Le tag est créé localement
7. Le push est fait

---

## Commandes rapides

```bash
# Backend — unitaires
cd backend && npm run test

# Backend — couverture
cd backend && npm run test:cov

# Backend — intégration
cd backend && npm run test:e2e

# Frontend — unitaires
cd frontend && npm run test

# E2E Cypress — local
npm run cy:run

# E2E Cypress — interactif
npm run cy:open

# E2E Cypress — Docker (stack complète en une commande)
make e2e
```
