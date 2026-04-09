# Guide de Maintenance — DataShare

Ce document décrit les procédures de mise à jour et la stratégie de cycle de vie du projet.

## 1. Cycle de vie des dépendances

- **Audit hebdomadaire** : Lancer `npm audit` sur le frontend et le backend.
- **Mises à jour mineures** : Automatisées via Dependabot (recommandé).
- **Mises à jour majeures** : Revue trimestrielle. Une attention particulière doit être portée sur NestJS et TypeORM.

## 2. Procédures de Mise à Jour (Deploy)

En production, utiliser la stratégie de déploiement Docker :
1. Repull de l'image : `docker compose pull`
2. Redémarrage sans interruption : `docker compose up -d --build --no-deps backend`

## 3. Stratégie de Backup

- **Base de données** : Backup hebdomadaire via `pg_dump`.
- **Fichiers /uploads** : Synchronisation quotidienne vers un stockage froid (ex: S3 Glacier).

```bash
# Exemple de backup rapide de la DB
docker compose exec postgres pg_dump -U datashare datashare > backup_$(date +%F).sql
```

## 4. Risques et Plan de Reprise d'Activité (PRA)

- **Crash du conteneur DB** : Volume persistant `postgres_data` monté localement pour éviter la perte de données.
- **Saturation du stockage** : Monitoring du dossier `/uploads` et ajustement de la fréquence du Cron `TasksModule`.
