# Screenshots — DataShare Frontend

Captures d'écran de référence prises après finalisation de chaque phase.  
Chaque entrée documente l'URL, l'état visuel attendu, et le tag Git correspondant.

---

## Accueil — `Screenshot_Main_Frame.png`

> Header fixe · Logo DataShare noir · Bouton "Se connecter" pill noir · Question centrale · Portail circulaire Cloud · Fond dégradé Sunset

![Accueil](./Screenshot_Main_Frame.png)

**URL** : `http://localhost:3000/`  
**Design** : Conforme au Figma "Desktop-2" — minimaliste, texte noir sur dégradé orange → coral.

---

## Connexion — `Screenshot_Login.png`

> Carte blanche solide · radius 24px · Inputs Figma · Bouton orange gradient · Lien S'inscrire

![Connexion](./Screenshot_Login.png)

**URL** : `http://localhost:3000/login`  
**Design** : Conforme au Figma "Desktop-6" — card blanche centrée, ombre légère `rgba(0,0,0,0.08)`.

---

## Inscription — `Screenshot_register.png`

> Même structure que la page de connexion · 3 champs (email, mdp, confirmation) · Bouton orange

![Inscription](./Screenshot_register.png)

**URL** : `http://localhost:3000/register`  
**Design** : Conforme au Figma "Desktop-7" — aligné avec la page de connexion.

---

---

## Phase 2 — Téléversement (US01) — `v1.0-phase2-done`

### Fichier envoyé — `Screenshot_Files_Sent.png`

> Icône check vert · Nom du fichier + poids · Lien de partage avec bouton "Copier"

![Fichier envoyé](./Screenshot_Files_Sent.png)

**URL** : `http://localhost:3000/` → connecté → upload réussi  
**État** : succès, lien `{origin}/download/{token}` visible et copiable.

---

## Tokens de design

| Élément | Valeur |
|:---|:---|
| Police | Outfit (Google Fonts) |
| Dégradé fond | `#FF7E5F` → `#FEB47B` (Sunset) |
| Texte principal | `#000000` |
| Bordure carte | `24px` (radius Figma) |
| Phase 1 tag Git | `v1.0-phase1-done` |
| Phase 2 tag Git | `v1.0-phase2-done` |
