# Performance — DataShare

L'objectif est que l'application soit rapide et agréable à utiliser, sans temps d'attente inutile.

---

## Côté interface

On utilise Lighthouse pour vérifier les performances du frontend. Les cibles sont : chargement initial sous une seconde, interface qui répond immédiatement aux interactions, bon score SEO.

---

## Côté API

Les fichiers sont streamés directement depuis le disque. Les colonnes `downloadToken` et `userId` sont indexées pour garder les requêtes rapides quand le volume monte.

---

## Ce qui a été fait

Les images Docker utilisent Node Alpine pour rester légères. Le code frontend ne charge que ce dont l'utilisateur a besoin au moment où il en a besoin. Les requêtes TypeORM sont écrites pour éviter les jointures inutiles.

Le cron de purge tourne toutes les heures en arrière-plan. Il ne bloque aucun thread HTTP — NestJS Schedule l'isole du cycle de traitement des requêtes. Les fichiers expirés sont supprimés en séquence pour éviter tout pic de charge sur le disque.
