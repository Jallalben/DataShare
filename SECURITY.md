# Sécurité — DataShare

Ce document explique concrètement ce qui est en place côté sécurité et pourquoi chaque choix a été fait.

---

## Authentification et mots de passe

Les mots de passe ne sont jamais stockés en clair dans la base de données. J'utilise **bcrypt** avec 12 rounds de hachage. Concrètement, même si quelqu'un accédait directement à la base de données, il ne verrait qu'une chaîne de caractères illisible — jamais le mot de passe original. 12 rounds représente un bon équilibre entre sécurité et performance : suffisamment lent pour décourager les attaques par force brute, suffisamment rapide pour ne pas pénaliser la connexion d'un utilisateur légitime.

Les sessions sont gérées par des **tokens JWT** (JSON Web Token). Chaque token est signé avec une clé secrète définie dans les variables d'environnement et expire automatiquement après 24 heures. Le token est persisté dans le `localStorage` du navigateur et transmis dans l'en-tête `Authorization: Bearer <token>` à chaque requête protégée — jamais dans l'URL.

---

## Partage de fichiers

Chaque lien de partage est un **UUID v4** généré au moment de l'upload. Un UUID v4 contient 122 bits d'aléatoire — il faudrait tester des milliards de milliards de combinaisons pour tomber par hasard sur un lien valide. En pratique, il est impossible à deviner : il faut connaître le lien exact pour accéder au fichier.

---

## Contrôle des fichiers uploadés

J'ai mis en place deux niveaux de validation à l'upload :

Le premier niveau vérifie l'**extension du fichier**. Les extensions exécutables suivantes sont refusées : `.exe`, `.bat`, `.sh`, `.cmd`, `.com`, `.msi`, `.ps1`, `.vbs`. Ce sont les formats les plus courants utilisés pour distribuer des logiciels malveillants.

Le second niveau vérifie le **type MIME déclaré** par le navigateur. Les types suivants sont bloqués : `application/x-msdownload`, `application/x-executable`, `application/x-sh`, `application/x-bat`, `application/x-msdos-program`. Cela évite qu'un fichier malveillant soit uploadé en changeant simplement son extension.

La taille maximale acceptée est de **50 Mo** par fichier, ce qui couvre l'immense majorité des usages sans exposer le serveur à des uploads abusifs.

---

## Expiration et purge automatique

À l'upload, l'utilisateur choisit une durée de vie entre 1 et 7 jours — 7 jours par défaut. Une fois ce délai dépassé, le fichier devient inaccessible. Un **cron job tourne toutes les heures** côté serveur et supprime définitivement les fichiers expirés : d'abord l'enregistrement en base de données, puis le fichier physique sur le disque. Aucune donnée ne s'accumule silencieusement.

---

## Variables d'environnement

Aucun secret n'est stocké dans le code source. La clé JWT, les credentials de base de données et tous les paramètres sensibles sont définis dans un fichier `.env` exclu du dépôt Git. Un fichier `.env.example` documente les variables attendues sans exposer les valeurs réelles.

---

## Vérifier les dépendances

Je vérifie régulièrement les dépendances avec `npm audit` pour détecter les failles connues publiées dans les bases de données CVE :

```bash
cd backend && npm audit
cd frontend && npm audit
```

Pour aller plus loin, Snyk peut scanner les images Docker en plus des bibliothèques npm — utile pour détecter des failles dans les dépendances système embarquées dans Alpine.

---

## Ce qui n'est pas encore en place

Quelques améliorations sont envisageables pour une version production :

- **Rate limiting** sur les endpoints d'authentification pour limiter les tentatives de connexion par force brute.
- **Protection CORS** configurée explicitement plutôt que ouverte à toutes les origines.
- **Headers HTTP de sécurité** (Content-Security-Policy, X-Frame-Options, etc.) via un middleware comme Helmet.
- **Validation du contenu réel du fichier** par analyse de signature binaire (magic bytes), indépendamment de l'extension et du type MIME déclaré.

---

Si vous trouvez une vulnérabilité, ouvrez une issue — je préfère être informé directement.
