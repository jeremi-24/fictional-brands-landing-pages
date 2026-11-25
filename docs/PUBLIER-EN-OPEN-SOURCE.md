# Publier une landing page en open source

Ce que font les créateurs de templates open source qui marchent (Astro themes, Vercel templates, shadcn, Magic UI, Aceternity, Cruip, HTML5 UP…), et comment ils montent leur dépôt GitHub.

## 1. Ce qui fait qu'on clique sur le dépôt

- **Une démo en ligne**, en haut du README, avant tout le reste. Personne ne clone pour voir à quoi ça ressemble.
- **Une image ou un GIF** de la page en tête du README (l'effet AURA → AUREN en GIF est le meilleur argument du projet).
- **Une image d'aperçu sociale** (Settings → Social preview, 1280 × 640) : c'est ce qui s'affiche quand le lien est partagé sur X, LinkedIn, Discord.
- **Un bouton « Deploy »** : « Deploy with Vercel » ou « Deploy to Netlify » clone et met en ligne le projet en un clic.
- **Des scores Lighthouse** affichés (performance, accessibilité) : ça rassure sur la qualité.

## 2. Les fichiers qu'on trouve dans presque tous les dépôts

| Fichier | Rôle |
|---|---|
| `README.md` | Démo, capture, fonctionnalités, installation, personnalisation |
| `LICENSE` | **Indispensable** : sans licence, personne n'a légalement le droit de réutiliser le code. Le standard pour les templates est **MIT** |
| `.gitignore` | Exclut `node_modules/`, `dist/`, les fichiers d'environnement |
| `CHANGELOG.md` | Ce qui change à chaque version |
| `CONTRIBUTING.md` | Comment proposer une modification (optionnel au début) |
| `CODE_OF_CONDUCT.md` | Règles de conduite (souvent le Contributor Covenant) |
| `.github/ISSUE_TEMPLATE/` | Formulaires pour signaler un bug ou demander une fonction |
| `.github/workflows/ci.yml` | Vérifie automatiquement que le projet compile à chaque push |
| `.github/dependabot.yml` | Propose les mises à jour de dépendances |

## 3. Les réglages GitHub

- **Template repository** (Settings → General → cocher « Template repository ») : ajoute un bouton vert « Use this template » qui crée une copie propre, sans l'historique.
- **Description + site web + topics** (la roue dentée à droite du dépôt) : `landing-page`, `template`, `react`, `vite`, `threejs`, `skincare`, `typescript`. Les topics servent à être trouvé dans la recherche GitHub.
- **GitHub Pages ou Vercel** pour la démo, branchés sur la branche `main` : chaque push met la démo à jour.
- **Releases** (`v1.0.0`, `v1.1.0`…) avec des notes de version : les gens suivent les nouveautés.
- **Protection de `main`** si d'autres contribuent : les changements passent par des pull requests.

## 4. La CI minimale (GitHub Actions)

Un fichier `.github/workflows/ci.yml` qui lance `npm ci` puis `npm run build` à chaque push et pull request. Si la compilation casse, GitHub l'affiche en rouge avant que ce soit fusionné.

## 5. Les droits à vérifier avant de publier

- **Polices** : Bodoni Moda, Figtree et IBM Plex Mono sont sous licence SIL Open Font License, donc réutilisables.
- **Three.js** : licence MIT.
- **Images générées par IA** : vérifier les conditions de l'outil utilisé (certains interdisent la redistribution ou exigent un abonnement payant pour l'usage commercial). Le dire clairement dans le README.
- **Marque** : AUREN doit rester fictive. Si un vrai produit porte ce nom, en choisir un autre.

## 6. Faire connaître le projet

- Un post avec le GIF sur X, LinkedIn, Reddit (r/webdev, r/reactjs), Product Hunt.
- Une soumission aux galeries : Vercel Templates, Astro Themes, Awwwards et Godly pour l'inspiration, Made with React.
- Une courte explication technique (« comment j'ai fait l'effet AURA → AUREN ») : les articles « making of » ramènent beaucoup de visiteurs vers le dépôt.

## 7. Ordre conseillé pour ce projet

1. `git init`, premier commit.
2. Ajouter `LICENSE` (MIT).
3. Convertir les images en AVIF/WebP (le poids de la démo compte pour Lighthouse).
4. Créer le dépôt GitHub, pousser, cocher « Template repository », ajouter description et topics.
5. Mettre la démo en ligne (Vercel ou GitHub Pages) et mettre le lien en haut du README.
6. Enregistrer un GIF de l'effet AURA → AUREN et du scroll 3D pour le README et l'aperçu social.
7. Ajouter la CI.
8. Publier la release `v1.0.0`, puis faire connaître le projet.
