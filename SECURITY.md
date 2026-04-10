# Sécurité sur DataShare

Ce document explique comment les données sont protégées sur la plateforme.

## Ce qui est mis en place

Pour qu'un partage de fichiers soit sûr, j'ai implémenté plusieurs couches de protection :

- **Chiffrement des mots de passe** : On utilise `bcrypt` avec 12 rounds. Les mots de passe ne sont jamais sauvegardés en clair — même en cas d'accès à la base, ils restent illisibles.
- **Accès sécurisé** : Les échanges entre le front et le back se font via des tokens JWT stockés côté client, qui expirent automatiquement après 24h.
- **Liens de téléchargement** : Chaque lien généré est un UUID v4 unique. Il est impossible à deviner par force brute.
- **Limites d'envoi** : La taille des fichiers est limitée à 50 Mo par défaut. Les fichiers peuvent être supprimés automatiquement après expiration pour ne pas saturer le disque.

## Outils utilisés pour la vérification

Je vérifie régulièrement les dépendances avec des outils standards pour éviter les failles connues :
- `npm audit` pour les bibliothèques.
- Snyk pour scanner le code et les images Docker.

```bash
# Pour vérifier les dépendances
cd backend && npm audit
cd frontend && npm audit
```

La sécurité est une priorité constante pour garantir que vos fichiers restent privés. 🛡️
