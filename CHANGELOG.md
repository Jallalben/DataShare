# Changelog

Ce fichier retrace l'évolution du projet, phase par phase.  
Chaque entrée correspond à un tag Git et à une fonctionnalité livrée.

---

## 1.0.0 — 9 avril 2026 — Authentification

Première version fonctionnelle avec inscription et connexion.

Côté backend, j'ai mis en place l'entité `User`, le hachage des mots de passe avec bcrypt (12 rounds) et la génération de tokens JWT valables 24h. Côté frontend, les pages Login et Register suivent le design Figma avec les cartes blanches et le dégradé Sunset. L'état de connexion est persisté via un `AuthContext` qui recharge la session depuis le localStorage au démarrage.

L'infra Docker est en place avec les trois services, chacun avec son healthcheck.

Correctifs en cours de route : synchronisation du port Vite entre le Dockerfile et docker-compose, résolution d'un problème de types TypeScript sur `JWT_EXPIRATION`, et imports manquants dans AppModule.

Tests : 4 tests unitaires Jest sur `AuthService`, fichier Supertest en place pour les tests d'intégration.

Tag : `v1.0-phase1-done`

---

## 2.0.0 — 10 avril 2026 — Upload de fichiers

Ajout du téléversement de fichiers avec Multer.

Le endpoint `POST /api/files/upload` est protégé par JWT. Les fichiers sont stockés sur disque dans `backend/uploads/` avec un nom UUID pour éviter les collisions. L'entité `File` stocke les métadonnées et un `downloadToken` unique qui servira pour le partage. La taille est limitée à 50 Mo.

Côté frontend, la modal d'upload s'ouvre depuis le portail de la page d'accueil. Elle gère le drag & drop, une barre de progression en temps réel, et affiche le lien de partage copiable une fois l'envoi terminé. Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion.

Correctif : `VITE_API_URL` dans docker-compose ne contenait pas le préfixe `/api`, ce qui causait des 404 sur tous les appels.

Tag : `v1.0-phase2-done`

---

## 3.0.0 — 10 avril 2026 — Téléchargement et partage

Ajout des endpoints publics de téléchargement et de la page de partage.

`GET /api/files/info/:token` retourne les métadonnées du fichier sans authentification. `GET /api/files/download/:token` stream le fichier avec l'en-tête `Content-Disposition: attachment`. Les deux endpoints retournent 404 si le token est inconnu, et 410 si le fichier a expiré.

La page `/download/:token` gère les trois états possibles : fichier disponible avec bouton de téléchargement, lien expiré, fichier introuvable. Aucune authentification requise pour accéder à cette page.

En parallèle, j'ai centralisé tous les appels API dans `frontend/src/services/api.ts` pour ne plus avoir d'URLs hardcodées dispersées dans les composants. Le composant `Home` a aussi été extrait de `App.tsx` vers son propre fichier.

Tag : `v1.0-phase3-done`

---

## À venir

Phase 4 — dashboard "Mon espace" avec la liste des fichiers uploadés par l'utilisateur connecté.

Phase 5 — suppression d'un fichier depuis le dashboard.

Phase 6 — cron job de nettoyage automatique des fichiers expirés.

Phase 7 — tests E2E Cypress et release finale `v1.0.0`.
