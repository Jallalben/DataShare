# DataShare

**Plateforme de transfert de fichiers sécurisée avec liens temporaires.**

« Nous gardons vos fichiers en toute sécurité »

---

## 1. Contexte du projet (Brief)
DataShare est une application web permettant aux utilisateurs de téléverser des fichiers, de les protéger par mot de passe (optionnel) et de définir une durée d'expiration. Un lien unique et non prédictible est généré pour chaque fichier partagé. L'application inclut également un tableau de bord pour gérer l'historique des fichiers envoyés.

## 2. Architecture Technique

![Architecture Technique](./architecture.png)

## 3. Justification des Choix Techniques

Le projet DataShare a été conçu avec une approche "Product-First", en privilégiant la maintenabilité et la rapidité de mise en production sans sacrifier la rigueur architecturale.

### 3.1 Langage et Frameworks
*   **Back-end : NestJS (TypeScript)**
    *   *Alternatives envisagées :* Spring Boot (Java), Express (JS).
    *   *Justification :* Le choix de NestJS s'est imposé pour sa structure modulaire stricte. Contrairement à Express qui peut vite devenir désordonné, NestJS impose l'utilisation de modules, contrôleurs et services, ce qui facilite la revue de code et les tests. L'utilisation du TypeScript sur l'ensemble de la stack réduit drastiquement les erreurs de typage entre le front et le back.
*   **Front-end : React (TypeScript) + Vite**
    *   *Alternatives envisagées :* Angular, Vue.js.
    *   *Justification :* React a été choisi pour sa flexibilité et son écosystème de hooks, permettant de gérer l'état d'authentification de manière fluide. Vite a été préféré à CRA (Create React App) pour ses performances de build et son rechargement à chaud (HMR) quasi instantané.

### 3.2 Persistance des données
*   **Base de données : PostgreSQL**
    *   *Alternatives envisagées :* MongoDB.
    *   *Justification :* Pour une plateforme gérant des relations utilisateurs/fichiers/tags, une base relationnelle est indispensable pour garantir l'intégrité référentielle. PostgreSQL offre un support natif robuste des UUID, ce qui est crucial pour nos `download_tokens` non prédictibles.

### 3.3 Outillage DevOps
*   **Docker & Docker Compose** : Indispensable pour garantir que "ça marche sur ma machine" fonctionne aussi sur le serveur du jury. L'utilisation de builds multi-stage permet de garder des images de production légères.
*   **Linter & Formatter** : ESLint et Prettier sont configurés avec des règles strictes pour assurer une cohérence stylistique, quel que soit l'outil de génération de code utilisé.

## 4. Sécurité et Gestion des Accès

La sécurité n'est pas une option pour DataShare. Nous avons implémenté plusieurs couches de protection :

*   **Authentification Stateless** : Utilisation de **JWT (JSON Web Tokens)** pour une communication sécurisée entre le client et le serveur.
*   **Chiffrement des données sensibles** : Les mots de passe ne sont jamais stockés en clair. Nous utilisons **bcrypt** avec 10 rounds de salt pour prévenir les attaques par force brute.
*   **Obscurité des liens** : Les fichiers ne sont pas exposés par leur ID séquentiel mais via un `download_token` (UUID v4) unique, rendant toute tentative de deviner un lien statistiquement impossible.
*   **Limites applicatives** : Une taille maximale de 1 Go est imposée côté serveur via Multer pour éviter le déni de service (DoS) par saturation disque.

## 5. Utilisation de l'IA dans le développement

Dans ce projet, l'IA a été traitée comme un **Pair Programmer Senior**.

*   **Posture adoptée** : Un mélange de "Scaffolding" (pour les structures de base) et de "Reviewer" (pour valider la propreté du code).
*   **Tâches confiées** : Scaffolding des modules NestJS, mise en place initiale du design system CSS et rédaction de la documentation technique.
*   **Supervision humaine** : Chaque ligne de code générée a été revue, les types `any` ont été systématiquement remplacés par des interfaces strictes, et les routes de sécurité ont été vérifiées manuellement.
*   **Apport & Limites** : L'IA permet un gain de temps massif sur les tâches répétitives (boilerplate), mais nécessite une vigilance constante sur la gestion des erreurs et la cohérence de l'architecture globale.

## 6. Processus d'Installation et Exécution

### Prérequis
*   **Docker & Docker Compose**
*   **Node.js v20+** (pour le développement local hors conteneur)

### Commandes principales
1.  **Copier l'exemple d'environnement** : `cp .env.example .env`
2.  **Lancer l'application** : `docker compose up --build`
3.  **Accéder au projet** :
    *   Frontend : `http://localhost:3000`
    *   Backend Health : `http://localhost:3001/api/health`
