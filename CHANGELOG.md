# Changelog

Toutes les modifications importantes du projet sont documentées ici.  
Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/) et le versionnement suit [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] — 2026-04-09 · `v1.0-phase1-done`

### ✨ Ajouté
- **Authentification complète (US03/US04)**
  - Inscription avec validation email + mot de passe (8 caractères minimum)
  - Connexion avec génération de token JWT (expiration 24h)
  - Hachage des mots de passe avec bcrypt (12 rounds)
  - Persistance de la session via `AuthContext` côté frontend
- **Interface utilisateur (Figma Path)**
  - Design system global : police Outfit, dégradé Sunset Orange → Coral
  - Page d'accueil minimaliste avec portail de téléversement circulaire
  - Pages Login et Register avec cartes blanches solides
  - Header fixe avec logo noir et bouton contextuel
  - Composants réutilisables : Button (variantes primary/black/secondary), Input, Callout
- **Infrastructure Docker**
  - Conteneur backend NestJS avec healthcheck via curl
  - Conteneur frontend Vite sur le port 3000
  - PostgreSQL 16 Alpine avec volume persistant
- **Documentation**
  - README principal avec screenshots et architecture
  - TESTING.md avec la stratégie de tests par phase
  - SECURITY.md, MAINTENANCE.md, PERF.md
  - `screenshots/README.md` avec les 3 captures de Phase 1

### 🔧 Corrigé
- Synchronisation du port Vite (3000) entre Dockerfile et docker-compose
- Résolution des types TypeScript sur `JWT_EXPIRATION` dans AuthModule
- Correction des imports manquants dans AppModule

### 🧪 Tests
- 4 tests unitaires Jest pour `AuthService` (inscription, connexion, erreurs)
- Fichier `app.e2e-spec.ts` Supertest en place (base à enrichir)

---

## [2.0.0] — 2026-04-10 · `v1.0-phase2-done`

### ✨ Ajouté
- **Téléversement de fichiers (US01)**
  - Endpoint `POST /api/files/upload` protégé par JWT
  - Stockage sur disque via Multer (limite 50 Mo)
  - Entité `File` avec `downloadToken` UUID unique et `expiresAt` pour la future expiration
  - Modal d'upload avec drag & drop, barre de progression et état succès avec lien copiable
  - Redirection vers `/login` si l'utilisateur tente d'uploader sans être connecté

### 🔧 Corrigé
- `VITE_API_URL` dans docker-compose complété avec le préfixe `/api`

---

## [3.0.0] — 2026-04-10 · `v1.0-phase3-done`

### ✨ Ajouté
- **Téléchargement & partage (US02)**
  - Endpoint public `GET /api/files/info/:token` — métadonnées JSON (404/410)
  - Endpoint public `GET /api/files/download/:token` — stream fichier avec `Content-Disposition: attachment`
  - Page `/download/:token` avec états : prêt, introuvable, expiré
  - Couche API centralisée `frontend/src/services/api.ts` — fin des URLs hardcodées

---

## À venir

### [4.0.0] — Phase 4 · Historique (US05)
- Dashboard "Mon espace" avec liste des fichiers uploadés
- Endpoint `GET /api/files/my` protégé par JWT

### [5.0.0] — Phase 5 · Suppression (US06)
- Suppression d'un fichier depuis le dashboard
- Endpoint `DELETE /api/files/:id` protégé par JWT

### [6.0.0] — Phase 6 · Expiration automatique (US10)
- Cron job de nettoyage des fichiers expirés

### [7.0.0] — Phase 7 · Finalisation v1.0.0
- Tests E2E Cypress complets
- Tag de release `v1.0.0`
