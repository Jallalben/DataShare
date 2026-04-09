# DataShare

**Plateforme de transfert de fichiers sécurisée avec liens temporaires.**

« Nous gardons vos fichiers en toute sécurité »

---

## 1. Contexte du projet (Brief)
DataShare est une application web permettant aux utilisateurs de téléverser des fichiers, de les protéger par mot de passe (optionnel) et de définir une durée d'expiration. Un lien unique et non prédictible est généré pour chaque fichier partagé. L'application inclut également un tableau de bord pour gérer l'historique des fichiers envoyés.

## 2. Architecture Technique
```
                    ┌──────────────────┐
                    │    Navigateur    │
                    │  (utilisateur)   │
                    └────────┬─────────┘
                             │ HTTP
                    ┌────────▼─────────┐
                    │   React + Vite   │
                    │   Port 3000      │
                    │   (TypeScript)   │
                    └────────┬─────────┘
                             │ REST / JSON
┌────────────────────────────▼──────────────────────────┐
│                    Docker Compose                      │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │              NestJS API — Port 3001               │  │
│  │                                                    │  │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────────┐  │  │
│  │  │ AuthModule │ │FilesModule │ │ TasksModule  │  │  │
│  │  │            │ │            │ │              │  │  │
│  │  │ register   │ │ upload     │ │ cron purge   │  │  │
│  │  │ login      │ │ download   │ │ quotidien    │  │  │
│  │  │ JWT guard  │ │ history    │ │              │  │  │
│  │  │            │ │ delete     │ │              │  │  │
│  │  └────────────┘ └─────┬──┬──┘ └──────────────┘  │  │
│  │                       │  │                        │  │
│  │         ┌─────────────┘  └──────────┐            │  │
│  │         ▼                           ▼            │  │
│  │  ┌─────────────┐          ┌──────────────┐       │  │
│  │  │ PostgreSQL  │          │ Stockage     │       │  │
│  │  │ Port 5432   │          │ local        │       │  │
│  │  │             │          │ ./uploads/   │       │  │
│  │  │ users       │          │ (volume)     │       │  │
│  │  │ files       │          │              │       │  │
│  │  │ tags        │          │              │       │  │
│  │  │ files_tags  │          │              │       │  │
│  │  └─────────────┘          └──────────────┘       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  GET /api/health ← healthcheck backend                 │
│  pg_isready      ← healthcheck PostgreSQL              │
└────────────────────────────────────────────────────────┘
```

## 3. Choix Technologiques
| Brique | Choix | Pourquoi ce choix |
|--------|-------|-------------------|
| Back-end | **NestJS (TypeScript)** | Architecture modulaire, injection de dépendances, base saine pour l'évolutivité. |
| Front-end | **React (TypeScript)** | Ecosystème riche, partage des types avec le back-end. |
| Base de données | **PostgreSQL** | Données relationnelles structurées, intégrité référentielle solide. |
| ORM | **TypeORM** | Intégration native avec NestJS, decorators TypeScript. |
| Auth | **JWT + bcrypt** | Standard de l'industrie pour les API stateless et sécurisation des mots de passe. |
| Conteneurisation | **Docker** | Isolation et reproductibilité garantie sur tous les environnements. |

## 4. Modèle de Données (MCD)
- **USERS**: id (UUID), email (UNIQUE), password (bcrypt), created_at, updated_at
- **FILES**: id (UUID), user_id (FK), original_name, stored_name (UUID), mime_type, size, download_token (UNIQUE), password_hash (NULLABLE), expires_at, created_at
- **TAGS**: id (UUID), name (VARCHAR)
- **FILES_TAGS**: file_id (FK), tag_id (FK)

## 5. Contrat d'Interface API

### Auth
- `POST /api/auth/register` : { email, password } -> 201 { id, email, token }
- `POST /api/auth/login` : { email, password } -> 200 { id, email, token }
- `GET /api/auth/me` : Authorization Header -> 200 { id, email }

### Files
- `POST /api/files/upload` : multipart { file, password?, expiresIn?, tags[]? } -> 201 { ...metadata... }
- `GET /api/files` : Query ?status=... -> 200 List[Files]
- `DELETE /api/files/:id` : 200 message
- `GET /api/files/download/:token` : 200 metadata
- `POST /api/files/download/:token` : { password? } -> 200 binary stream

### Health
- `GET /api/health` : 200 { status: "ok", database: "connected" }

## 6. Installation (Mode Développement)
1. Cloner le repo : `git clone ...`
2. Configurer `.env` à partir de `.env.example`
3. Lancer : `docker compose up --build`
