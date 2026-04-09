# DataShare

Un outil simple pour partager des fichiers avec des liens temporaires et sécurisés.

L'idée de DataShare est de pouvoir envoyer un fichier rapidement, en ajoutant un mot de passe si besoin, et en décidant quand le lien doit expirer. Une fois le temps écoulé, le fichier n'est plus accessible.

---

## Aperçu de l'interface

### Accueil
![Accueil](./screenshots/Screenshot_Main_Frame.png)

### Connexion
![Connexion](./screenshots/Screenshot_Login.png)

### Inscription
![Inscription](./screenshots/Screenshot_register.png)

---

## Architecture technique

```
datashare/
├── backend/          # API NestJS (TypeScript)
│   ├── src/
│   │   ├── auth/     # Authentification JWT + Bcrypt (US03/US04) ✅
│   │   ├── users/    # Gestion des utilisateurs
│   │   ├── files/    # Upload & partage de fichiers (US01 - en cours)
│   │   └── health/   # Endpoint de santé
│   └── test/         # Tests d'intégration Supertest
├── frontend/         # SPA React + Vite (TypeScript)
│   ├── src/
│   │   ├── components/   # Button, Input, Callout, Header, Footer
│   │   ├── pages/        # Login, Register, MySpace
│   │   └── context/      # AuthContext (JWT persistance)
│   └── cypress/          # Tests E2E (à venir)
├── screenshots/      # Captures d'écran par phase
└── docker-compose.yml
```

---

## Stack technique

| Couche | Technologie | Version |
|:---|:---|:---|
| **Backend** | NestJS + TypeScript | v11 |
| **Frontend** | React + Vite | v19 / v8 |
| **Base de données** | PostgreSQL | v16 Alpine |
| **Auth** | JWT + Bcrypt | - |
| **Tests Unitaires** | Jest (backend) / Vitest (frontend) | - |
| **Tests E2E** | Cypress | - |
| **CI/CD** | GitHub Actions | - |
| **Conteneurs** | Docker + Docker Compose | - |

---

## Sécurité

- 🔒 Mots de passe hachés avec **bcrypt** (12 rounds).
- 🎫 Sessions gérées via **JWT** (token en mémoire, pas de localStorage).
- 🔗 Liens de partage avec **UUID v4** (impossibles à deviner).
- ⏱️ Expiration configurable par fichier.

---

## Installation rapide

### Prérequis
- Docker et Docker Compose installés.
- Node.js v24+ (optionnel, pour le développement local sans Docker).

### Lancer le projet

```bash
# 1. Copier la configuration
cp .env.example .env

# 2. Démarrer tous les services
docker compose up --build
```

L'application est accessible sur :
- **Interface** : `http://localhost:3000`
- **API** : `http://localhost:3001/api`
- **Santé** : `http://localhost:3001/api/health`

---

## Tests

```bash
# Unitaires (backend)
cd backend && npm run test

# Couverture (backend)
cd backend && npm run test:cov

# Intégration E2E (backend)
cd backend && npm run test:e2e

# Unitaires (frontend) — à venir
cd frontend && npm run test

# E2E Cypress — à venir
npx cypress run
```

> Voir [TESTING.md](./TESTING.md) pour la stratégie complète de tests.

---

## Avancement des phases

| Phase | Contenu | Statut | Tag Git |
|:---|:---|:---|:---|
| **Phase 1** | Authentification (US03/US04) + Design Figma | ✅ Terminée | `v1.0-phase1-done` |
| **Phase 2** | Téléversement de fichiers (US01) | 🔄 En cours | - |
| **Phase 3** | Téléchargement & partage (US02) | ⏳ À venir | - |

---

Fait avec passion pour un partage plus simple et plus sûr. ✌️
