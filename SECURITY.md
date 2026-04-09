# Sécurité sur DataShare

Ce document explique comment les données sont protégées sur la plateforme.

## Ce qui est mis en place

Pour qu'un partage de fichiers soit sûr, j'ai implémenté plusieurs couches de protection :

- **Chiffrement des mots de passe** : On utilise `bcrypt` avec 10 rounds. Les mots de passe ne sont jamais sauvés en clair, donc même en cas d'accès à la base, ils restent protégés.
- **Accès sécurisé** : Les échanges entre le front et le back se font via des tokens JWT qui expirent après 24h.
- **Liens de téléchargement** : Chaque lien généré est un UUID v4 unique. C'est impossible à deviner en essayant des combinaisons au hasard.
- **Limites d'envoi** : On peut limiter la taille des fichiers (par défaut 1 Go) et les supprimer automatiquement après expiration pour ne pas remplir le disque.

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
