# AUREN — landing page

Landing page d'un sérum de nuit haut de gamme (marque AUREN), pensée comme un **modèle réutilisable** : tout le texte, les images, les couleurs et les polices se changent dans la config, sans toucher aux composants.

**Stack** : Vite + React 19 + TypeScript + Three.js (pour la bouteille 3D). Aucune autre dépendance.

---

## Lancer le projet

```powershell
npm install
```

```powershell
npm run dev
```

Puis ouvrir http://localhost:5173.

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement instantané |
| `npm run build` | Vérifie les types puis produit le site final dans `dist/` |
| `npm run preview` | Sert `dist/` pour tester la version finale |
| `npm run typecheck` | Vérifie seulement le TypeScript |

Ajouter `?lang=fr` (ou `en`, `de`) à l'URL force une langue.

---

## Le parcours de la page

| # | Section | Fichier | Ce qu'elle fait |
|---|---|---|---|
| — | Nav | `src/sections/Nav.tsx` | Barre fixe toujours visible, liens, sélecteur EN/FR/DE, panier |
| — | Hero | `src/sections/Hero.tsx` | Photo des femmes en plein écran, titre, promesse, 2 boutons |
| 01 | Aura | `src/sections/Aura.tsx` | Scène au scroll : « AURA RENEWED » se réduit à **AUREN**, puis une aura de lumière révèle la bouteille |
| 02 | Le sérum (3D) | `src/sections/Showcase.tsx` | Bouteille 3D fixe, la caméra passe sur 4 détails pendant le scroll |
| 03 | Bienfaits | `src/sections/Benefits.tsx` | Grille bento : comparateur avant/après, photos, bienfaits courts, promesse |
| 04 | Achat | `src/sections/Purchase.tsx` | Packshot, format, achat unique ou abonnement, quantité, panier |
| — | Footer | `src/sections/Footer.tsx` | Newsletter, liens |

L'ordre se change dans `src/App.tsx` : chaque section est une ligne.

---

## Où est quoi

```
src/
  content/
    site.ts       ← TOUT le contenu en anglais : textes, images, couleurs, polices
    i18n.ts       ← traductions FR et DE (seulement les mots qui changent)
    types.ts      ← la forme exacte de la config (TypeScript signale les oublis)
  sections/       ← une section = un .tsx + son .css
  components/     ← petites briques réutilisées (titre animé, image, lien flèche, lueur du curseur)
  hooks/
    usePageMotion.ts     ← apparitions au scroll ([data-reveal]) et parallaxe
    useScrollProgress.ts ← progression 0 → 1 d'une section collante (pilote la 3D et l'Aura)
  three/
    createBottle.ts      ← la bouteille 3D, entièrement dessinée en code (aucun fichier 3D)
    BottleStage.tsx      ← la scène, la lumière, la caméra
  styles/base.css ← variables, typo, grilles, animations communes
public/images/    ← les photos (format : nom-LARGEUR.jpg, ex. auren-bottle-1376.jpg)
IMAGE_PROMPTS.md  ← les prompts utilisés pour générer chaque image
```

---

## Comment ça marche (les idées clés)

**1. Tout part de la config.** `site.ts` décrit la page. Chaque section reçoit sa partie (`config.hero`, `config.benefits`…) et ne contient aucun texte écrit en dur. Changer de marque = changer `site.ts` et les images.

**2. Les traductions se superposent.** `i18n.ts` contient seulement les textes FR et DE. Au chargement, `localize()` fusionne la langue choisie par-dessus l'anglais. Les listes se correspondent **par position** : la 3e tuile en FR traduit la 3e tuile en anglais (`{}` = rien à traduire, par exemple une photo sans texte). La langue est choisie dans cet ordre : `?lang=` dans l'URL, puis le dernier choix du visiteur, puis la langue du navigateur, sinon l'anglais.

**3. Les sections « collantes ».** L'Aura et la 3D sont des sections hautes dont le contenu reste fixé à l'écran (`position: sticky`). `useScrollProgress` mesure où l'on en est (0 au début, 1 à la fin) :
- pour l'**Aura**, cette valeur est écrite dans la variable CSS `--p`, et tout le reste est du CSS pur (`--k` pour la fusion des lettres, `--r` pour l'aura, `--c` pour la légende) ;
- pour la **3D**, elle déplace la caméra d'un point de vue à l'autre.

**4. AURA RENEWED → AUREN.** `lettersToKeep()` (dans `Aura.tsx`) trouve automatiquement les lettres de la phrase qui épellent la marque, dans l'ordre. Les autres se dissolvent. Ça marche dans toutes les langues tant que la phrase contient A-U-R-E-N dans l'ordre (« Aura renouvelée », « Aura erneuert »).

**5. La bouteille 3D est du code.** `createBottle.ts` fabrique le verre, le sérum, la pipette, le bouchon brossé et l'étiquette à partir de formes de révolution et de textures dessinées en canvas. Three.js n'est téléchargé que quand on approche de la section. Si le WebGL n'est pas disponible, une photo du produit s'affiche à la place.

**6. Accessibilité.** Animations réduites si le visiteur l'a demandé dans son système, comparateur avant/après utilisable au clavier (c'est un vrai curseur `<input type="range">`), textes alternatifs sur les images, attribut `lang` de la page mis à jour.

---

## Personnaliser

**Changer de marque**
1. Remplacer les images dans `public/images/` (garder la convention `nom-LARGEUR.jpg`).
2. Dans `src/content/site.ts` : nom, couleurs (`theme`), polices, tous les textes, prix.
3. Mettre à jour les traductions dans `src/content/i18n.ts`.
4. Polices : changer le lien Google Fonts dans `index.html` et `fontDisplay` / `fontBody` dans `site.ts`.
5. Couleurs de la bouteille 3D : elles suivent le thème (`src/three/BottleStage.tsx`).

**Ajouter une langue** (exemple : espagnol)
1. Dans `i18n.ts`, ajouter `{ code: 'es', label: 'ES', name: 'Español' }` à `LANGS`.
2. Écrire un objet `es` sur le modèle de `fr`, et l'ajouter à `TRANSLATIONS`.
3. Vérifier que la phrase de l'Aura contient A-U-R-E-N dans l'ordre.

**Ajouter une tuile dans la grille bento** : une entrée dans `benefits.tiles` (`site.ts`) avec une taille `large` (2×2), `tall` (1×2), `wide` (2×1) ou `small` (1×1). Penser à la traduire à la même position dans `i18n.ts`. Les photos produit restent sans texte par-dessus : ne pas leur donner de `title`.

**Ajouter une section** : créer `MaSection.tsx` + `MaSection.css` dans `src/sections/`, ajouter son type dans `types.ts`, son contenu dans `site.ts`, puis une ligne dans `App.tsx`.

---

## Points à connaître

- **Images en JPG** (450 à 660 Ko chacune). Pour la mise en ligne, les convertir en AVIF/WebP en divise le poids par 3 ou 4. Le composant `Picture` le gère déjà : il suffit de retirer `ext: 'jpg'` dans `site.ts` et de fournir `nom-LARGEUR.avif` + `nom-LARGEUR.webp`.
- **Textes alternatifs** des images : seulement en anglais pour l'instant.
- **Le panier** est une démo : il compte les articles mais n'est relié à aucun paiement.
- **Images générées par IA** : les avant/après ne prouvent aucun résultat réel. Pour une vraie marque, il faut de vraies photos, avec l'accord des personnes.
