# Maintenance — DataShare

Quelques notes sur comment garder le projet à jour et en bonne santé.

---

## Mettre à jour les dépendances

Je vérifie les dépendances avec `npm audit` régulièrement. Les petites mises à jour se font au fil de l'eau. Tous les trois mois environ, je fais une passe plus complète pour mettre à jour les frameworks principaux (NestJS, React).

---

## Déployer une mise à jour

Avec Docker, c'est assez simple :

```bash
docker compose pull
docker compose up -d --build --no-deps backend
```

---

## Sauvegarder la base de données

À faire avant toute mise à jour importante :

```bash
docker compose exec postgres pg_dump -U datashare datashare > backups/db_$(date +%F).sql
```

Pour les fichiers dans `uploads/`, une copie quotidienne vers un stockage externe suffit.

---

## En cas de problème

Si un service redémarre, les données ne sont pas perdues grâce aux volumes Docker persistants. Si le disque se remplit, vérifier que le cron job de nettoyage tourne correctement avec `docker compose logs backend | grep Purge`. Le job tourne toutes les heures et supprime automatiquement les fichiers dont la date d'expiration est dépassée.
