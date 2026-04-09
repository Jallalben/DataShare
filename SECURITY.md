# 🛡️ Charte de Sécurité & de Confiance — DataShare

Pour DataShare, la sécurité n'est pas une simple couche technique, c'est une promesse faite à nos utilisateurs. Ce document détaille comment nous protégeons l'intégrité de vos données et le respect de votre vie privée.

---

## 🔒 Notre Philosophie de Protection

Nous croyons qu'un partage de fichiers réussi repose sur une confiance aveugle dans l'outil. C'est pourquoi chaque risque identifié a reçu une réponse technologique sans compromis.

### 1. Analyse des Risques & Réponses Humaines

| Risque Identifié | Impact Potentiel | Notre Bouclier |
| :--- | :--- | :--- |
| **Accès aux mots de passe** | Usurpation d'identité | **Cryptographie forte** : Utilisation de `bcrypt` (10 rounds). Même en cas d'accès direct, vos secrets restent illisibles. |
| **Accès non autorisé** | Fuite de données | **Authentification Stateless** : Protection par JWT avec expiration courte. Chaque session est éphémère et sécurisée. |
| **Fichiers malveillants** | Compromission serveur | **Validation stricte** : Filtrage par MIME-type et isolation complète via renommage en UUID. |
| **Déni de Service (DoS)** | Indisponibilité | **Gestion des quotas** : Limites Multer (1 Go) et purges automatiques par tâches planifiées (Cron). |

---

## 🌐 Standards & Conformité

Nous nous appuyons sur les meilleures pratiques de l'industrie pour garantir une robustesse à toute épreuve :
- **OWASP Top 10** : Notre architecture est conçue pour neutraliser les injections (TypeORM), les expositions de données sensibles et les ruptures de contrôle d'accès.
- **Trafic Chiffré** : En production, l'usage du HTTPS via un reverse-proxy est obligatoire pour protéger les données en transit.
- **Politique CORS** : Un cloisonnement strict assure que seul le domaine officiel de DataShare peut interagir avec l'API.

---

## 🛠️ Vigilance & Maintenance

La sécurité est un processus continu. Nous recommandons et utilisons :
- **Audit de dépendances** : Utilisation régulière de `npm audit` pour corriger les vulnérabilités Tierces.
- **Analyse Statique** : Scans via Snyk pour détecter les failles dans le code et les images Docker.

```bash
# Pour vérifier la santé de l'écosystème
cd backend && npm audit
cd frontend && npm audit
```

---

*La sécurité est tout ce qui se dresse entre vos données et le reste du monde. Nous prenons ce rôle très au sérieux.*
