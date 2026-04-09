# Maintenance de DataShare

Quelques notes sur comment garder le projet à jour et en bonne santé.

## Mise à jour des dépendances

- On vérifie régulièrement les dépendances avec `npm audit`.
- Les petites mises à jour se font au fil de l'eau.
- Tous les trois mois environ, on fait une revue plus complète pour mettre à jour les gros frameworks (NestJS, React).

## Déploiement

Pour mettre à jour le projet en production avec Docker, c'est assez simple :
1. Récupérer les dernières images : `docker compose pull`
2. Relancer les services : `docker compose up -d --build --no-deps backend`

## Sauvegardes (Backups)

Il est conseillé de sauvegarder la base de données de temps en temps, surtout avant de grosses mises à jour :
```bash
docker compose exec postgres pg_dump -U datashare datashare > backups/db_$(date +%F).sql
```
Pour les fichiers dans `uploads/`, une simple copie sur un autre serveur ou un stockage cloud une fois par jour suffit.

## En cas de problème

- Si la base de données redémarre, les données ne sont pas perdues grâce au volume Docker persistant.
- Si le disque se remplit, vérifiez les tâches automatiques qui purgent les fichiers expirés. 🔧
