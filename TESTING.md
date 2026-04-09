# Plan de Tests — DataShare

Ce document détaille la stratégie de test adoptée pour garantir la fiabilité de la plateforme DataShare.

## 1. Stratégie Globale

Nous suivons la pyramide des tests pour optimiser la couverture et la rapidité d'exécution :
- **Tests Unitaires (70%)** : Validation de la logique métier (services NestJS, composants React).
- **Tests d'Intégration (20%)** : Validation des interactions entre les modules et la base de données.
- **Tests End-to-End (10%)** : Validation des parcours utilisateurs critiques.

## 2. Outils de Testing

| Type | Outil | Justification |
| :--- | :--- | :--- |
| **Unit/Integration** | **Jest** | Intégration native NestJS, exécution rapide et mock automatique. |
| **End-to-End** | **Cypress** | Simulation réaliste du navigateur, idéal pour tester l'upload et le download. |
| **Couverture** | **Istanbul (via Jest)** | Fournit des rapports détaillés par fichier. |

## 3. Parcours Utilisateurs Critiques (Cypress)

1. **Authentification** : Inscription -> Connexion -> Déconnexion (Vérification du JWT).
2. **Cycle de vie du fichier** : Sélection -> Upload -> Copie du lien -> Vérification dans le dashboard.
3. **Téléchargement** : Accès au lien public -> Saisie du mot de passe -> Téléchargement effectif.

## 4. Instructions d'exécution

```bash
# Tests Backend (Unit + Integration)
cd backend && npm run test

# Couverture de code
cd backend && npm run test:cov

# Tests Frontend (Cypress)
cd frontend && npx cypress open
```
