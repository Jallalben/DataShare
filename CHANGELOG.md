# Changelog

Ce fichier retrace l'évolution du projet, phase par phase.
Chaque entrée correspond à un tag Git et à une fonctionnalité livrée.

---

## Phase 1 — Authentification — `v1.0-phase1-done`

Première version fonctionnelle avec inscription et connexion.

Côté backend, mise en place de l'entité `User`, du hachage des mots de passe avec bcrypt (12 rounds) et de la génération de tokens JWT valables 24h. Côté frontend, les pages Login et Register suivent le design Figma avec les cartes blanches et le dégradé Sunset. L'état de connexion est géré via un `AuthContext` qui maintient le token en mémoire.

L'infra Docker est en place avec les trois services (PostgreSQL, backend NestJS, frontend React), chacun avec son healthcheck et ses dépendances déclarées.

Tests : 4 tests unitaires Jest sur `AuthService`, tests d'intégration Supertest sur les endpoints d'authentification.

---

## Phase 2 — Upload de fichiers — `v1.0-phase2-done`

Ajout du téléversement de fichiers avec Multer.

L'endpoint `POST /api/files/upload` est protégé par JWT. Les fichiers sont stockés sur disque dans `uploads/` avec un nom UUID pour éviter les collisions. L'entité `File` stocke les métadonnées et un `downloadToken` unique pour le partage. La taille est limitée à 50 Mo.

Côté frontend, la modale d'upload s'ouvre depuis le portail de la page d'accueil. Elle gère le drag & drop, une barre de progression en temps réel, et affiche le lien de partage copiable une fois l'envoi terminé.

Correctif : `VITE_API_URL` dans docker-compose ne contenait pas le préfixe `/api`, ce qui causait des 404 sur tous les appels.

---

## Phase 3 — Téléchargement et partage — `v1.0-phase3-done`

Ajout des endpoints publics de téléchargement et de la page de partage.

`GET /api/files/info/:token` retourne les métadonnées du fichier sans authentification. `GET /api/files/download/:token` stream le fichier avec l'en-tête `Content-Disposition: attachment`. Les deux endpoints retournent 404 si le token est inconnu, 410 si le fichier a expiré.

La page `/download/:token` gère les trois états : fichier disponible, lien expiré, fichier introuvable.

Tous les appels API ont été centralisés dans `frontend/src/services/api.ts` pour éliminer les URLs hardcodées dispersées dans les composants.

---

## Phase 4 — Historique des fichiers — `v1.0-phase4-done`

Ajout du dashboard Mon espace avec la liste des fichiers de l'utilisateur connecté.

L'endpoint `GET /api/files/my` retourne les fichiers triés par date décroissante, avec `expiresAt` inclus. La page `/myspace` a son propre layout (sans Header/Footer global) avec une sidebar, deux tabs Actifs/Expirés, et un bouton "Accéder" qui copie le lien dans le presse-papier.

---

## Phase 5 — Suppression — `v1.0-phase5-done`

Ajout de la suppression de fichiers depuis Mon espace.

L'endpoint `DELETE /api/files/:id` vérifie l'appartenance du fichier avant de le supprimer de la base et du disque. Une confirmation native du navigateur est demandée avant chaque suppression. Le fichier disparaît de la liste sans rechargement de page.

---

## Phase 6 — Expiration automatique — `v1.0-phase6-done`

Ajout du cron de purge et de la durée d'expiration configurable à l'upload.

`@nestjs/schedule` installé, un `TasksService` avec un `@Cron` qui tourne toutes les heures. Il récupère en base tous les fichiers dont `expiresAt < NOW()` et les supprime un par un (base + disque). La durée d'expiration est configurable de 1 à 7 jours dans la modale d'upload, avec 7 jours par défaut.

---

## Phase 7 — Tests E2E Cypress — en cours

Cypress 15 installé à la racine du projet avec TypeScript. Trois scénarios couverts : inscription et connexion, upload d'un fichier, téléchargement via lien. Le job Cypress est intégré dans la CI GitHub Actions et se lance après les tests unitaires.
