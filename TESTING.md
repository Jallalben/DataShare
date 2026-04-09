# 🛡️ Garantie Qualité & Fiabilité — DataShare

Pour nous, tester n'est pas une option, c'est l'assurance que DataShare fonctionnera parfaitement, à chaque fois, pour chaque utilisateur.

---

## 🏗️ Notre Pyramide de Confiance

Nous suivons une stratégie de test rigoureuse pour maximiser la couverture sans ralentir le développement.

### 1. Tests Unitaires (La Base - 70%)
Validation de chaque pièce de logique métier. Nous testons nos services NestJS et nos composants React de manière isolée pour garantir leur bon fonctionnement interne.

### 2. Tests d'Intégration (Le Ciment - 20%)
Nous vérifions que les différentes briques communiquent bien entre elles, notamment les appels à la base de données PostgreSQL et les communications JWT.

### 3. Tests de Bout-en-Bout (L'Expérience - 10%)
Simulation réelle du parcours utilisateur. Si un utilisateur peut uploader un fichier protéger par mot de passe et le retélécharger, alors nous avons réussi.

---

## 🧰 Nos Outils d'Excellence

| Type de Test | Outil Choisi | Pourquoi ? |
| :--- | :--- | :--- |
| **Logique (Unit/Int)** | **Jest** | Pour sa rapidité et son intégration parfaite avec TypeScript. |
| **Parcours (E2E)** | **Cypress** | Pour observer l'application "en vrai" dans un navigateur. |
| **Visibilité** | **Istanbul** | Pour mesurer avec précision chaque ligne de code couverte par nos tests. |

---

## 🛣️ Parcours Critiques Surveillés

Rien n'est laissé au hasard sur ces trois flux essentiels :
1. **L'Accès** : Inscription -> Connexion -> Déconnexion.
2. **Le Partage** : Glisser-déposer -> Configuration sécurité -> Génération du lien.
3. **La Réception** : Accès au lien public -> Saisie du secret -> Téléchargement.

---

## 🚀 Commencer à Tester

```bash
# Lancer les tests de la logique métier (Backend)
cd backend && npm run test

# Voir la couverture détaillée du code
cd backend && npm run test:cov

# Lancer les tests de parcours utilisateur (Frontend)
cd frontend && npx cypress open
```

---

*Parce que la confiance se mérite par la preuve, nous testons sans relâche.*
