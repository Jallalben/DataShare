# Performance — DataShare

L'objectif est que l'application soit rapide et fluide à utiliser, sans temps d'attente perceptible. Ce document explique les choix techniques qui contribuent à cet objectif, et ce que je mesure pour m'en assurer.

---

## Côté interface

Je mesure les performances frontend avec **Lighthouse**, l'outil d'audit intégré à Chrome. Les cibles que je vise sont les suivantes : chargement initial de la page sous une seconde sur une connexion standard, interaction visuelle immédiate (pas de blocage au clic), et un bon score SEO pour la page d'accueil publique.

Le bundle JavaScript est produit par **Vite**, qui applique automatiquement le tree-shaking (suppression du code non utilisé) et le code splitting (chargement à la demande). Résultat : le navigateur ne télécharge que ce dont il a besoin au moment où il en a besoin — pas la totalité de l'application d'un coup.

React 19 apporte des optimisations de rendu internes qui réduisent les re-rendus inutiles. Je veille à ne pas passer de fonctions anonymes dans les props des composants fréquemment re-rendus, ce qui forcerait React à recalculer inutilement.

---

## Côté API

Les fichiers ne sont jamais chargés en mémoire lors du téléchargement. Ils sont **streamés directement depuis le disque** vers la réponse HTTP grâce à `res.download()` d'Express. Peu importe la taille du fichier — 1 Mo ou 50 Mo — l'empreinte mémoire du serveur reste constante.

Les deux colonnes les plus sollicitées par les requêtes de recherche sont indexées en base de données : `downloadToken` (utilisé à chaque accès à un lien de partage) et `userId` (utilisé à chaque chargement de Mon espace). Sans ces index, PostgreSQL ferait un scan complet de la table à chaque requête — acceptable avec dix fichiers, problématique avec dix mille.

Les requêtes TypeORM sont écrites pour ne récupérer que les colonnes nécessaires et éviter les jointures inutiles. La liste des fichiers d'un utilisateur, par exemple, ne charge pas le contenu binaire des fichiers — seulement leurs métadonnées.

---

## Côté infrastructure

Les images Docker utilisent **Node 24 Alpine** comme base. Alpine est une distribution Linux minimaliste : l'image finale pèse une fraction d'une image Ubuntu équivalente, ce qui réduit le temps de pull en CI et l'empreinte sur le serveur.

Le **cron job de purge** tourne toutes les heures en arrière-plan via NestJS Schedule. Il s'exécute dans un thread séparé du cycle de traitement des requêtes HTTP — une purge longue n'impacte donc pas les utilisateurs actifs. Les fichiers sont supprimés en séquence (un par un) pour éviter tout pic d'I/O disque en cas de grand nombre de fichiers expirés simultanément.

La base de données PostgreSQL bénéficie d'un **volume Docker persistant** nommé, ce qui garantit que les données survivent aux redémarrages de conteneurs sans copie inutile.

---

## Ce que je surveille en production

Pour un déploiement en conditions réelles, les métriques que je suivrais en priorité sont :

- Le temps de réponse médian et le 95e percentile des endpoints `/upload` et `/download/:token`
- La taille du volume `uploads/` au fil du temps, pour s'assurer que la purge fonctionne correctement
- Le temps d'exécution du cron de purge, visible dans les logs avec `docker compose logs backend | grep Purge`
- L'utilisation mémoire du backend lors d'uploads simultanés de fichiers volumineux
