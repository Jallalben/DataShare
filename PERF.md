# Performance sur DataShare

L'objectif est que l'application soit rapide et agréable à utiliser, sans temps d'attente inutile.

## Objectifs pour l'interface (Frontend)

On utilise Lighthouse pour vérifier que tout tourne bien. Les cibles sont simples :
- Un temps de chargement initial de moins d'une seconde.
- Une interface fluide qui répond immédiatement aux clics.
- Un bon score SEO pour que le projet soit bien indexé.

## Performances du serveur (API)

Le backend est optimisé pour répondre vite :
- Les connexions se font en moins de 200ms.
- Les fichiers sont envoyés le plus vite possible selon votre connexion internet.
- On a ajouté des index dans la base de données pour que les recherches de fichiers soient instantanées.

## Ce qui a été fait pour optimiser

- **Docker** : Les images sont les plus légères possible pour gagner de la place et de la vitesse au démarrage.
- **Code** : On ne charge que les parties de l'application dont l'utilisateur a besoin sur le moment (Lazy Loading).
- **Base de données** : Les requêtes sont optimisées pour éviter de ralentir quand il y a beaucoup de fichiers. ⚡
