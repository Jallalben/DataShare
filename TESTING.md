# Stratégie de tests — DataShare

Ce document décrit comment les tests sont organisés, ce qu'ils couvrent concrètement, et comment les lancer.

---

## La philosophie

J'ai adopté une approche pyramidale : beaucoup de tests unitaires rapides à la base, quelques tests d'intégration au milieu, et un ensemble de tests E2E navigateur au sommet. Chaque couche joue un rôle différent.

Les **tests unitaires** vérifient la logique métier de manière isolée — sans base de données, sans réseau. Ils sont rapides, fiables, et permettent de valider chaque cas limite (entrée invalide, cas d'erreur, comportement aux bords).

Les **tests d'intégration** vérifient que les endpoints HTTP se comportent correctement avec une vraie base de données PostgreSQL. Ils valident que NestJS, TypeORM et Postgres fonctionnent bien ensemble — pas seulement en théorie.

Les **tests E2E** simulent un utilisateur réel dans un vrai navigateur. Avec Cypress, je navigue dans l'application exactement comme un utilisateur le ferait : je remplis des formulaires, je clique sur des boutons, je vérifie ce qui s'affiche à l'écran.

---

## Les outils

**Jest** couvre les tests unitaires et d'intégration du backend. Les tests unitaires utilisent des mocks pour isoler les services. Les tests d'intégration utilisent Supertest pour envoyer de vraies requêtes HTTP contre une instance NestJS connectée à une base de données de test.

**Vitest** couvre les tests unitaires du frontend. Il est compatible avec l'écosystème Vite et beaucoup plus rapide que Jest pour du code TypeScript/React. Les composants sont testés avec React Testing Library.

**Cypress 15** couvre les tests E2E navigateur depuis la Phase 7. Les tests s'exécutent en mode headless (sans interface graphique) en CI, et en mode interactif pour le développement. Cypress permet d'intercepter les requêtes réseau, d'injecter des tokens d'authentification et de simuler des interactions complexes.

**GitHub Actions** orchestre tout automatiquement à chaque push sur `main` : tests unitaires backend, tests unitaires frontend, et tests E2E Cypress — les trois en parallèle pour minimiser le temps d'attente.

---

## Ce qui est couvert par phase

### Phase 1 — Authentification

**Backend (Jest — unitaires)** : inscription réussie avec hash du mot de passe, email dupliqué retourne 409, connexion avec les bons identifiants retourne un JWT signé, mauvais mot de passe retourne 401.

**Backend (Supertest — intégration)** : `POST /api/auth/register` retourne 201 avec les données de l'utilisateur créé, retourne 409 si l'email existe déjà. `POST /api/auth/login` retourne 200 avec le token JWT, retourne 401 si les identifiants sont incorrects.

**Frontend (Cypress — E2E)** : parcours complet inscription puis connexion avec redirection vers l'espace personnel, affichage d'un message d'erreur explicite quand les identifiants sont incorrects.

---

### Phase 2 — Upload de fichiers

**Backend (Jest — unitaires)** : `saveFile` crée un enregistrement en base avec un `downloadToken` au format UUID v4, calcule correctement `expiresAt`, rejette un fichier sans contenu.

**Backend (Supertest — intégration)** : `POST /api/files/upload` avec un JWT valide retourne 201 avec les métadonnées complètes (nom, taille, type, token, dates). Retourne 401 sans JWT, 400 si aucun fichier n'est fourni.

**Frontend (Cypress — E2E)** : ouverture de la modale d'upload, sélection d'un fichier via `selectFile`, vérification du lien de partage affiché après succès, vérification que le fichier apparaît dans Mon espace.

---

### Phase 3 — Téléchargement via lien

**Backend (Jest — unitaires)** : `findByToken` retourne le fichier si le token est valide, retourne null pour un token inconnu. Un token expiré déclenche une `GoneException` avec le code HTTP 410.

**Backend (Supertest — intégration)** : `GET /api/files/info/:token` retourne 200 avec les métadonnées sans authentification, 404 pour un token inconnu, 410 pour un token expiré. `GET /api/files/download/:token` streame le fichier avec les bons en-têtes HTTP.

**Frontend (Cypress — E2E)** : la page de téléchargement affiche le nom, la taille et la date d'expiration du fichier, le bouton de téléchargement est visible et cliquable, une URL avec un token invalide affiche bien la page 404.

---

### Phase 4 — Historique des fichiers

**Backend (Jest — unitaires)** : `findByUserId` retourne uniquement les fichiers appartenant à l'utilisateur, triés par date décroissante. Un appel sans JWT retourne 401.

**Backend (Supertest — intégration)** : `GET /api/files/my` retourne 200 avec la liste complète des fichiers de l'utilisateur connecté, `expiresAt` est inclus dans chaque entrée.

**Frontend (Cypress — E2E)** : après upload, le fichier apparaît dans Mon espace avec son nom et sa date d'expiration.

---

### Phase 5 — Suppression

**Backend (Jest — unitaires)** : `deleteFile` supprime le fichier et son enregistrement en base si l'utilisateur est propriétaire, lève une `ForbiddenException` 403 si le fichier appartient à un autre utilisateur, lève une `NotFoundException` 404 si le fichier n'existe pas.

**Backend (Supertest — intégration)** : `DELETE /api/files/:id` retourne 204 No Content après suppression réussie, retourne 403 si le fichier appartient à un autre utilisateur, retourne 401 sans JWT.

**Frontend (Cypress — E2E)** : le fichier disparaît de la liste après confirmation de suppression.

---

### Phase 6 — Expiration automatique

**Backend (Jest — unitaires)** : `saveFile` calcule `expiresAt` à 7 jours par défaut si aucune durée n'est précisée, respecte la valeur passée entre 1 et 7 jours, rejette les valeurs en dehors de cette plage. Le cron `purgeExpiredFiles` identifie les fichiers dont `expiresAt < NOW()`, les supprime de la base et du disque, et ne touche pas aux fichiers encore valides.

**Frontend (Cypress — E2E)** : le sélecteur de durée est visible dans la modale d'upload, la valeur par défaut affichée est bien 7 jours, la durée choisie est correctement transmise au backend dans la requête d'upload.

---

## Standard de livraison

Avant chaque tag Git, je vérifie dans l'ordre :

1. Les tests unitaires passent (`cd backend && npm run test` + `cd frontend && npm run test`)
2. Les tests d'intégration passent (`cd backend && npm run test:e2e`)
3. Les tests Cypress passent (`npm run cy:run` ou `make e2e`)
4. Une capture d'écran est ajoutée dans `screenshots/` si la phase a une interface
5. Le `CHANGELOG.md` est mis à jour
6. Un commit conventionnel est créé
7. Le tag Git est créé puis poussé

---

## Commandes rapides

```bash
# Backend — tests unitaires
cd backend && npm run test

# Backend — rapport de couverture
cd backend && npm run test:cov

# Backend — tests d'intégration
cd backend && npm run test:e2e

# Frontend — tests unitaires
cd frontend && npm run test

# E2E Cypress — local (stack déjà démarrée)
npm run cy:run

# E2E Cypress — mode interactif avec interface graphique
npm run cy:open

# E2E Cypress — Docker, stack complète en une commande
make e2e
```

---

## Environnement CI

La CI GitHub Actions lance quatre jobs en parallèle à chaque push sur `main` :

- `backend-unit` — Jest sur le backend seul, sans Docker
- `backend-e2e` — Supertest sur une base de données PostgreSQL temporaire
- `frontend-unit` — Vitest sur le frontend seul
- `cypress-e2e` — Stack complète via Docker Compose, puis Cypress en mode headless

Les artefacts (captures d'écran Cypress en cas d'échec) sont uploadés automatiquement pour faciliter le débogage.
