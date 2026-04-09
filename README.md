# DataShare

Un outil simple pour partager des fichiers avec des liens temporaires.

L'idée de DataShare est de pouvoir envoyer un fichier rapidement, en ajoutant un mot de passe si besoin, et en décidant quand le lien doit expirer. Une fois le temps écoulé, le fichier n'est plus accessible.

---

## Pourquoi DataShare ?

On a souvent besoin d'envoyer un document un peu sensible à quelqu'un sans vouloir qu'il reste sur un serveur indéfiniment. Avec ce projet, j'ai voulu créer une interface propre où l'on garde le contrôle sur ce qu'on partage.

---

## Aperçu de l'interface

*Note : Cette section sera complétée avec des captures d'écran du projet.*

### Tableau de bord
![Tableau de bord](./screenshots/dashboard.png)
Un endroit simple pour voir tous les fichiers que vous avez partagés et gérer leurs expirations.

### Envoi de fichiers
![Upload](./screenshots/upload.png)
On glisse son fichier, on règle les options de sécurité, et on récupère le lien.

---

## Architecture technique

![Architecture Technique](./architecture.png)

---

## Côté technique

J'ai choisi des outils modernes pour que le projet soit facile à maintenir et rapide :

- **Backend** : NestJS (TypeScript). C'est très structuré et ça évite de faire n'importe quoi avec le code.
- **Frontend** : React avec Vite. C'est rapide au développement et très fluide à l'usage.
- **Base de données** : PostgreSQL. C'est du solide pour gérer les relations entre les utilisateurs et les fichiers.
- **Docker** : Pour que l'installation soit la même partout, que ce soit en local ou sur un serveur.

---

## Sécurité

La sécurité est importante ici, donc voici ce qui est en place :
- Les mots de passe sont hachés avec **bcrypt**.
- Les liens de partage utilisent des **UUID v4** (des identifiants uniques impossibles à deviner).
- On peut mettre une taille limite (exemple : 1 Go) pour éviter de saturer le serveur.

---

## Installation rapide

### Prérequis
- Avoir Docker et Docker Compose installés.
- Node.js (V20 ou plus) si vous voulez lancer le code en local sans Docker.

### Lancer le projet
1. Préparez votre fichier de config : `cp .env.example .env`
2. Lancez les conteneurs : `docker compose up --build`

Ensuite, vous pouvez accéder à l'app ici :
- Interface : `http://localhost:3000`
- Santé de l'API : `http://localhost:3001/api/health`

---

Fait avec passion pour un partage plus simple. ✌️
