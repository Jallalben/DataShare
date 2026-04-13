# DataShare — Frontend

Interface utilisateur de DataShare. Développée avec React, Vite et TypeScript, elle couvre l'inscription, la connexion, l'upload de fichiers, le téléchargement via lien et l'espace personnel.

---

## Lancer le frontend seul

Le frontend est conçu pour tourner dans Docker avec l'ensemble de la stack. Pour le développement isolé :

```bash
npm install
npm run dev
```

L'interface est accessible sur `http://localhost:3000`. La variable `VITE_API_URL` doit pointer vers le backend.

---

## Tests

```bash
# Tests unitaires
npm run test
```

---

## Structure

```text
src/
├── components/   Header, Footer, Modal, UploadModal
├── pages/        Home, Login, Register, Download, MySpace
├── context/      AuthContext — gestion du token
└── services/     apiClient — point d'entrée unique vers l'API
```

Pour lancer le projet complet, se référer au README principal à la racine.
