# Sécurité — DataShare

Ce document explique comment les données sont protégées sur la plateforme.

---

## Ce qui est en place

Les mots de passe ne sont jamais stockés en clair. J'utilise bcrypt avec 12 rounds — même en cas d'accès direct à la base de données, les mots de passe restent illisibles.

Les sessions sont gérées par des tokens JWT qui expirent après 24h. Le token est stocké côté client et envoyé dans l'en-tête `Authorization` à chaque requête protégée.

Chaque lien de partage est un UUID v4 généré à l'upload. Il est statistiquement impossible à deviner — il faut connaître le lien exact pour accéder au fichier.

La taille des fichiers est limitée à 50 Mo par défaut. Les fichiers peuvent être supprimés automatiquement après leur date d'expiration pour éviter d'accumuler des données inutiles.

---

## Vérifier les dépendances

Je vérifie régulièrement les dépendances avec `npm audit` pour détecter les failles connues :

```bash
cd backend && npm audit
cd frontend && npm audit
```

Snyk peut aussi être utilisé pour scanner les images Docker en plus des bibliothèques.

---

Si vous trouvez une vulnérabilité, ouvrez une issue — je préfère le savoir.
