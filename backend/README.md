# DataShare — Backend

Moteur de l'application DataShare. Développé avec NestJS et TypeScript, il gère l'authentification, l'upload de fichiers, le téléchargement via lien, l'historique, la suppression et la purge automatique des fichiers expirés.

---

## Lancer le backend seul

Le backend est conçu pour tourner dans Docker avec l'ensemble de la stack. Pour le développement isolé :

```bash
npm install
npm run start:dev
```

L'API répond sur `http://localhost:3001/api`. La documentation interactive Swagger est disponible sur `http://localhost:3001/api/docs` — elle liste tous les endpoints et permet de les tester directement depuis le navigateur.

---

## Tests

```bash
# Tests unitaires
npm run test

# Rapport de couverture
npm run test:cov

# Tests d'intégration
npm run test:e2e
```

---

## Structure

```text
src/
├── auth/       Inscription, connexion, stratégie JWT
├── users/      Entité utilisateur
├── files/      Upload, download, historique, suppression
├── tasks/      Cron de purge automatique
├── health/     Endpoint de santé
└── config/     Configuration base de données
```

Pour lancer le projet complet, se référer au README principal à la racine.
