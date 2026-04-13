# Contribuer à DataShare

Merci de l'intérêt porté à ce projet. Que ce soit pour corriger un bug, proposer une fonctionnalité ou améliorer la documentation, chaque contribution compte.

---

## Avant de commencer

Quelques règles simples pour travailler efficacement ensemble :

- Ouvrir une issue d'abord si la fonctionnalité est importante — ça évite de travailler sur quelque chose qui ne sera pas mergé.
- Une branche = un sujet. Pas de mélanges entre une correction de bug et une nouvelle feature dans la même PR.
- Lire le code existant avant d'écrire le sien. Les patterns utilisés (service/controller NestJS, composants React) ont été choisis intentionnellement.

---

## Workflow Git

```bash
# 1. Forker le dépôt et cloner
git clone https://github.com/TON_USERNAME/DataShare.git

# 2. Créer une branche depuis main
git checkout -b feat/nom-de-ta-feature

# 3. Développer, tester, commiter
git commit -m 'feat: ajouter la zone de dépôt drag and drop'

# 4. Pousser et ouvrir une Pull Request
git push origin feat/nom-de-ta-feature
```

---

## Convention de commits

On utilise les Conventional Commits. Le format est le suivant :

```
<type>(<scope>): description courte
```

Types disponibles :

- `feat` — nouvelle fonctionnalité
- `fix` — correction de bug
- `style` — changements visuels (CSS, UI)
- `refactor` — refactorisation sans changement fonctionnel
- `test` — ajout ou correction de tests
- `docs` — mise à jour de la documentation
- `chore` — tâches techniques (dépendances, config)

Exemples :

```bash
feat(auth): implement JWT login endpoint
fix(upload): handle large file size validation error
style(ui): align login card with Figma spec
test(auth): add integration tests for register endpoint
```

---

## Standards de code

### Backend (NestJS)

- Un module = un dossier (`src/auth/`, `src/files/`...).
- Toujours utiliser des DTOs avec `class-validator` pour valider les entrées.
- Les services contiennent la logique métier, pas les contrôleurs.

### Frontend (React)

- Les composants réutilisables vont dans `src/components/`.
- Les pages vont dans `src/pages/`.
- Tout appel HTTP passe par `apiClient` dans `src/services/api.ts`.

---

## Prérequis

- Node.js v24+
- Docker et Docker Compose

---

## Lancer le projet en local

```bash
# Copier la configuration
cp .env.example .env

# Démarrer tous les services
docker compose up --build

# Application disponible sur http://localhost:3000
```

---

## Lancer les tests

```bash
# Tests unitaires (backend)
cd backend && npm run test

# Tests d'intégration (backend)
cd backend && npm run test:e2e

# Tests unitaires (frontend)
cd frontend && npm run test

# Tests E2E Cypress
npm run cy:run
```

La CI GitHub Actions lance automatiquement tous ces tests à chaque push sur `main`.

---

## Standard de livraison par feature

Avant de soumettre une Pull Request, vérifier que :

- Les tests unitaires correspondants sont écrits
- Tous les tests passent
- Une capture d'écran est ajoutée dans `screenshots/` si c'est une feature visuelle
- Le `CHANGELOG.md` est mis à jour
- Un commit conventionnel est utilisé
