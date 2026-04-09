# Rapport de Performance — DataShare

Ce document définit les objectifs de performance et les budgets de ressources pour DataShare.

## 1. Budgets de Performance (Frontend)

Cibles Lighthouse pour la page d'accueil en production :
- **Performance** : > 90
- **Accessibility** : 100
- **Best Practices** : 100
- **SEO** : 100

| Métrique | Seuil |
| :--- | :--- |
| **First Contentful Paint (FCP)** | < 1.0s |
| **Largest Contentful Paint (LCP)** | < 2.0s |
| **Total Blocking Time (TBT)** | < 150ms |

## 2. Performances Backend (API)

Cibles de temps de réponse pour les endpoints critiques :
- `POST /api/auth/login` : < 200ms (hors hashage bcrypt lent par design).
- `GET /api/files` : < 100ms.
- **Upload Scale** : Capacité à gérer des flux montants jusqu'à 1 Gbit/s selon l'infrastructure.

## 3. Outils de Mesure

- **Lighthouse** : Audit automatique intégré à Chrome DevTools.
- **k6** : Pour le load-testing de l'API d'upload.
- **npx vite preview** : Pour tester le build de production localement.

## 4. Optimisations implémentées

- **Build multi-stage Docker** : Réduction de la taille de l'image de 1.2 Go à ~200 Mo.
- **Lazy Loading** : Les pages du dashboard ne sont chargées que si nécessaire.
- **Indexing DB** : Indexation sur `user_id` et `download_token` pour des requêtes instantanées.
