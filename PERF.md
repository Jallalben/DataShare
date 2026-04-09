# ⚡ Expérience & Vitesse — Rapport de Performance DataShare

La performance n'est pas qu'une question de chiffres, c'est la politesse que nous devons à nos utilisateurs. Ce document définit nos standards d'excellence pour une expérience fluide.

---

## 🎨 Excellence Interface (Frontend)

Nous visons le score parfait sur Lighthouse pour garantir que DataShare reste accessible et rapide sur tous les appareils.

| Métrique Lighthouse | Objectif | Pourquoi c'est important |
| :--- | :--- | :--- |
| **Performance** | +90 | Pour une réactivité instantanée. |
| **Accessibilité** | 100 | Pour que personne ne soit laissé de côté. |
| **Bonnes Pratiques** | 100 | Pour un Web sain et sécurisé. |
| **SEO** | 100 | Pour une indexation optimale. |

### Seuils de Rétention
- **First Contentful Paint (FCP)** : < 1.0s (L'utilisateur voit que ça charge tout de suite).
- **Largest Contentful Paint (LCP)** : < 2.0s (Le contenu principal est prêt).
- **Total Blocking Time (TBT)** : < 150ms (L'interface répond sans délai).

---

## ⚡ Réactivité Serveur (API)

Notre backend est optimisé pour traiter vos demandes en un clin d'œil :
- **Authentification** : < 200ms (Compromis optimal entre sécurité bcrypt et vitesse).
- **Indexation** : Nous utilisons des index PostgreSQL sur les champs critiques pour des recherches en millisecondes.
- **Capacité d'Upload** : L'architecture NestJS + Multer permet de saturer la bande passante disponible (jusqu'à 1 Gbit/s sur des serveurs dédiés).

---

## 🚀 Optimisations Déjà en Place

Nous n'avons pas seulement des objectifs, nous avons des solutions :
- **Builds Multi-Stage** : Nos images Docker sont passées de 1.2 Go à ~200 Mo, accélérant les déploiements et réduisant l'usage mémoire.
- **Chargement Différé (Lazy Loading)** : Seuls les composants nécessaires à la page actuelle sont chargés par le navigateur.
- **Indexation de Base** : Les recherches par `download_token` sont instantanées, quelle que soit la taille de la base.

---

*La vitesse est la fondation sur laquelle repose le plaisir d'utiliser un outil.*
