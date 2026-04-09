# 🌱 Guide de Pérennité & Maintenance — DataShare

DataShare est conçu pour durer. Ce document décrit comment entretenir la plateforme pour qu'elle reste performante, sécurisée et à jour au fil du temps.

---

## 📅 Cycle de Vie des Dépendances

Une application en bonne santé est une application dont les fondations sont solides.
- **Audit Hebdomadaire** : Un coup d'œil rapide via `npm audit` permet d'anticiper les vulnérabilités.
- **Mises à jour Mineures** : Nous faisons confiance à l'automatisation (Dependabot) pour garder les bibliothèques à jour.
- **Revue Trimestrielle** : Un moment dédié pour les mises à jour majeures (NestJS, React, TypeORM), garantissant que nous profitons des dernières avancées technologiques.

---

## 🚀 Déploiement & Continuité de Service

La mise à jour de DataShare doit être une expérience transparente pour vos utilisateurs.

### Stratégie Docker
Pour déployer une nouvelle version en minimisant les interruptions :
1. **Récupération** : `docker compose pull`
2. **Relance Ciblée** : `docker compose up -d --build --no-deps backend`

---

## 💾 Assurance Données : Les Backups

Vos données et celles de vos utilisateurs sont précieuses. Nous recommandons une stratégie de sauvegarde à deux niveaux :
- **Base de données** : Snapshot hebdomadaire pour prévenir toute erreur de manipulation.
- **Fichiers Uploadés** : Synchronisation quotidienne vers un stockage distant (S3, Glacier ou serveur de backup).

```bash
# Sauvegarde rapide de la base de données
docker compose exec postgres pg_dump -U datashare datashare > backups/db_$(date +%F).sql
```

---

## 🚨 Plan de Continuité (PRA)

Nous avons anticipé les imprévus pour que vous n'ayez pas à le faire :
- **Persistance Garantie** : Les données PostgreSQL sont stockées dans un volume Docker dédié (`postgres_data`), les protégeant des redémarrages de conteneurs.
- **Gestion de l'Archive** : Pour éviter la saturation du disque, un module spécial (`TasksModule`) surveille la taille du stockage et purge automatiquement les fichiers obsolètes.

---

*Prendre soin du code aujourd'hui, c'est garantir sa fiabilité pour demain.*
