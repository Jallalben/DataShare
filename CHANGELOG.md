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

## À venir

### [2.0.0] — Phase 2 · Téléversement (US01)
- Upload de fichiers via drag & drop
- Stockage sécurisé avec Multer
- Barre de progression et liste des fichiers dans "Mon espace"
- Tests E2E Cypress pour le parcours d'upload

### [3.0.0] — Phase 3 · Téléchargement & partage (US02)
- Génération de liens UUID v4 temporaires
- Page de téléchargement publique (sans authentification)
- Expiration automatique et suppression des fichiers
