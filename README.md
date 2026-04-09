# 🚀 DataShare

### Le partage de fichiers, la sécurité en plus.

**DataShare** n'est pas qu'un simple outil de transfert. C'est une solution pensée pour ceux qui exigent la simplicité du cloud sans compromis sur la confidentialité. Téléversez, sécurisez, partagez : vos fichiers ne restent en ligne que le temps nécessaire.

---

## 🌟 Vision du Projet

Dans un monde où nos données sont partout, DataShare propose un retour à l'essentiel : **le contrôle**. 
Nous avons conçu cette plateforme pour répondre à un besoin simple : envoyer un document sensible à un collaborateur ou un ami, avec la certitude qu'il sera protégé par un mot de passe et qu'il s'effacera automatiquement une fois sa mission accomplie.

---

## 📸 Visite Guidée (UI/UX)

> [!TIP]
> Cette section sera enrichie de captures d'écran réelles pour illustrer l'expérience utilisateur.

### 1. Le Tableau de Bord
![Dashboard Placeholder](./screenshots/dashboard.png)
*Une interface épurée pour garder un œil sur vos partages actifs et leur date d'expiration.*

### 2. Le Tunnel d'Upload
![Upload Placeholder](./screenshots/upload.png)
*Glissez, déposez, et choisissez vos options de sécurité en un clic. Simple. Rapide. Efficace.*

---

## 🏗️ Philosophie & Choix Techniques

Nous avons privilégié une approche **"Product-First"**. Chaque brique technologique a été sélectionnée pour sa robustesse et sa capacité à offrir une expérience fluide.

### La Stack de Confiance
- **Back-end : NestJS (TypeScript)**
  Nous avons choisi NestJS pour sa rigueur architecturale. Là où d'autres frameworks laissent place à l'improvisation, NestJS nous impose une structure modulaire qui garantit la maintenabilité et la facilité des tests.
- **Front-end : React + Vite**
  Pour une interface réactive et des performances de build instantanées. L'utilisation de TypeScript sur toute la chaîne nous permet de dormir sur nos deux oreilles en évitant les erreurs de typage.
- **Base de données : PostgreSQL**
  Parce que l'intégrité de vos métadonnées est non-négociable. Le support natif des UUID garantit des liens de partage totalement imprévisibles.

---

## 🛡️ La Sécurité au Cœur de l'ADN

Chez DataShare, la sécurité n'est pas une "feature", c'est le fondement de l'application.
- **Confidentialité Totale** : Vos mots de passe sont hachés via **bcrypt** (10 rounds). Même nous ne pouvons pas les lire.
- **Liens Invisibles** : Pas d'IDs séquentiels. Chaque lien est un UUID v4 unique, rendant toute tentative de devinette statistiquement impossible.
- **Infrastructure Robuste** : Dockerisation complète pour un déploiement isolé et sécurisé.

---

## 🤖 Collaboration Homme-IA

Ce projet est le fruit d'une synergie moderne entre l'humain et l'intelligence artificielle.
L'IA a agi comme un **Pair Programmer Senior** :
- **Vitesse** : Pour le scaffolding et les tâches répétitives.
- **Qualité** : Pour suggérer des optimisations de code.
- **Rigueur** : Pour aider à la rédaction de cette documentation.

Cependant, l'humain reste le pilote. Chaque ligne de code a été revue, chaque décision d'architecture a été pesée, et chaque faille de sécurité potentielle a été vérifiée manuellement.

---

## 🛠️ Démarrage Rapide

### Prérequis
- **Docker & Docker Compose**
- **Node.js v20+** (pour le dev local)

### Installation
1.  **Configuration** : `cp .env.example .env`
2.  **Lancement** : `docker compose up --build`
3.  **Accès** :
    - Interface : `http://localhost:3000`
    - API Health : `http://localhost:3001/api/health`

---

*Développé avec ❤️ pour un web plus sûr.*
