# Contribuer à DataShare

Merci de l'intérêt que tu portes à ce projet ! Que ce soit pour corriger un bug, proposer une fonctionnalité ou améliorer la documentation, chaque contribution compte.

---

## Avant de commencer

Quelques règles simples pour qu'on travaille efficacement ensemble :

- **Ouvre une issue d'abord** si tu veux ajouter une fonctionnalité importante. Ça évite de travailler sur quelque chose qui ne sera pas mergé.
- **Une branche = un sujet.** Pas de mélanges entre une correction de bug et une nouvelle feature dans la même PR.
- **Lis le code existant** avant d'écrire le tien. Les patterns utilisés (service/controller NestJS, composants React) ont été choisis intentionnellement.

---

## Workflow Git

```bash
# 1. Forke le dépôt et clone ta copie
git clone https://github.com/TON_USERNAME/DataShare.git

# 2. Crée une branche depuis main
git checkout -b feat/nom-de-ta-feature

# 3. Développe, teste, commite
git commit -m "feat: [US01] ajouter la zone de dépôt drag & drop"

# 4. Pousse et ouvre une Pull Request
git push origin feat/nom-de-ta-feature
```

---

## Convention de commits

On utilise les **Conventional Commits**. Le format est le suivant :

```
<type>(<scope>): [USxx] description courte
```

| Type | Quand l'utiliser |
|:---|:---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `style` | Changements visuels (CSS, UI) |
| `refactor` | Refactorisation sans changement fonctionnel |
| `test` | Ajout ou correction de tests |
| `docs` | Mise à jour de la documentation |
| `chore` | Tâches techniques (dépendances, config) |

**Exemples concrets :**
```bash
feat(auth): [US03] implement JWT login endpoint
fix(upload): [US01] handle large file size validation error
style(ui): [UI] align login card with Figma spec
test(auth): [US03] add integration tests for register endpoint
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
- On évite le CSS inline. Tout passe par les classes CSS du design system (`index.css`).

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

# Tests E2E (Cypress)
npx cypress run
```

> La CI GitHub Actions lance automatiquement tous ces tests à chaque push sur `main`.

---

## Standard de livraison par feature

Avant de soumettre une Pull Request, vérifie que tu as bien :

- [ ] Écrit les tests unitaires correspondants
- [ ] Vérifié que tous les tests passent (`npm run test`)
- [ ] Ajouté une capture d'écran dans `screenshots/` si c'est une feature visuelle
- [ ] Mis à jour le `CHANGELOG.md`
- [ ] Utilisé un commit conventionnel avec la référence à l'US

---

Merci encore pour ta contribution. N'hésite pas à ouvrir une issue si tu as des questions. 🙌
