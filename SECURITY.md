# Rapport de Sécurité — DataShare

Ce document répertorie les mesures de sécurité implémentées et l'analyse de risque du projet.

## 1. Analyse de Risques & Réponses

| Risque | Impact | Mesures de mitigation |
| :--- | :--- | :--- |
| **Vol de mot de passe** | Critique | Utilisation de `bcrypt` (10 rounds) pour le hashage. Pas de stockage en clair. |
| **Accès non autorisé** | Élevé | Protection des routes par JWT (stateless) avec expiration de 24h. |
| **Injection de fichiers** | Élevé | Validation stricte du MIME-type et renommage systématique en UUID. |
| **Saturation Disque (DoS)** | Moyen | Limite Multer à 1 Go par fichier et purge automatique par Cron. |

## 2. Standards de Sécurité

- **OWASP Top 10** : Protection contre les injections (via TypeORM), les expositions de données sensibles (via hashage) et les ruptures de contrôle d'accès (via JWT Guards).
- **HTTPS** : Indispensable en production (géré via le reverse-proxy Nginx).
- **CORS** : Configuré strictement pour n'autoriser que le domaine du domaine Frontend.

## 3. Scans de Vulnérabilités

Nous recommandons l'utilisation des outils suivants en phase de maintenance :
- **npm audit** : Détection des dépendances obsolètes ou vulnérables.
- **Snyk** : Analyse statique du code (SAST) et des images Docker.

```bash
# Vérifier les vulnérabilités des dépendances
cd backend && npm audit
cd frontend && npm audit
```
