# Tests sur DataShare

Pour s'assurer que tout fonctionne comme prévu, j'utilise plusieurs types de tests.

## Ma stratégie de test

L'idée est de tester ce qui est vraiment important pour l'utilisateur :

- **Tests unitaires** : On teste les petites fonctions et services isolés pour être sûr qu'ils donnent le bon résultat.
- **Tests d'intégration** : On vérifie que le code communique bien avec la base de données.
- **Tests de bout-en-bout (E2E)** : On simule un utilisateur réel qui se connecte, envoie un fichier et le télécharge.

## Les outils que j'utilise

- **Jest** : C'est l'outil principal pour tester la logique du code.
- **Cypress** : Utile pour tester le parcours complet dans le navigateur.

## Comment lancer les tests

```bash
# Pour les tests du backend
cd backend && npm run test

# Pour voir si tout le code est bien couvert
cd backend && npm run test:cov

# Pour lancer les tests d'interface (Cypress)
cd frontend && npx cypress open
```

L'objectif est d'avoir l'esprit tranquille à chaque fois qu'on ajoute une nouvelle fonctionnalité. ✅
