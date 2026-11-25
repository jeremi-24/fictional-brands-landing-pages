# AUREN — prompts d'images

Prompts en anglais (les générateurs d'images les suivent mieux). Colle le **bloc produit** au début de chaque prompt pour que la bouteille reste identique d'une image à l'autre, puis ajoute le prompt de la scène. Si l'outil accepte une image de référence (Midjourney `--cref`/`--sref`, Flux Kontext, GPT Image, Nano Banana), donne-lui ta meilleure image de la bouteille et ne garde que le prompt de scène.

Format conseillé : exporte en JPG/PNG haute définition, puis je les convertis en AVIF/WebP aux tailles du site.

---

## Bloc produit (à coller à chaque fois)

```
A luxury skincare serum bottle, exact product: a tall straight cylindrical bottle in thick deep oxblood-red glass (dark wine red, almost black in the core, glowing ruby where light passes through), softly rounded shoulders, a heavy flat glass base. On the bottle, the word "AUREN" in a tall, thin, high-contrast Didone serif (Bodoni style), widely letter-spaced, printed in soft champagne-silver, placed in the upper third; below it, two small lines in a thin condensed sans-serif: "CELLULAR RENEWAL" and "SERUM · 30ml". The cap is a solid brushed-platinum metal cylinder with fine horizontal brushed grain, its top cut at a slight angle (bevelled crown, about 17 degrees) and a bevelled lower edge where it meets the glass. Inside the glass, a slim glass pipette with a blush-pink tint, and a translucent rose-amber serum, darker at the bottom, lighter towards the top. Proportions: body about 3.5 times taller than wide, cap about one third of the total height.
```

## Style commun (à ajouter à la fin)

```
High-end beauty campaign photography, shot on medium format, 100mm macro lens, soft directional key light from the upper left with a warm rim light, smoky dusty-rose and deep oxblood backdrop fading to near-black, subtle film grain, rich shadows, restrained, editorial, quiet luxury, no clutter.
```

## Negative prompt (si l'outil le permet)

```
text errors, misspelled logo, extra letters, multiple bottles, dropper bulb, rubber bulb, gold cap, plastic look, clear glass, blue tint, hands, fingers, watermark, busy background, flowers, cartoon, 3D render look, oversaturated, harsh flash
```

---

## 1. Hero — `auren-hero` (1376 × 768, 16:9)

Remplace `public/images/auren-hero-*`.

```
[Bloc produit] The bottle stands alone, slightly right of center, three-quarter view, on a polished dark stone surface that reflects it faintly. Large empty negative space on the left for headline text. A soft halo of rose light behind the cap. [Style commun] --ar 16:9
```

## 2. Philosophy — `auren-splash` (1407 × 767, 16:9)

Remplace `public/images/auren-splash-*`.

```
[Bloc produit] A single silky ribbon of translucent rose-amber serum swirls around the bottle in mid-air, frozen at 1/8000 s, catching the light like liquid silk, fine droplets suspended. The bottle is centered, slightly tilted. Dark smoky rose background. [Style commun] --ar 16:9
```

## 3. The Object — un macro par détail (optionnel, 4:5)

La section 3D n'a pas besoin de photos. Ces quatre macros servent d'image de secours si le WebGL ne charge pas, ou pour les réseaux sociaux / la fiche produit.

**Cap — `auren-cap`**
```
[Bloc produit] Extreme close-up macro of the brushed-platinum cap only: the angled bevelled crown, the fine horizontal brushed grain catching a thin line of light, the seam where metal meets the oxblood glass just visible at the bottom of the frame. Shallow depth of field. [Style commun] --ar 4:5
```

**Glass — `auren-glass`**
```
[Bloc produit] Macro of the oxblood glass wall, backlit so the thick glass glows ruby red at the edges and deep wine in the center, the "AUREN" lettering in sharp focus, light refracting through the curved glass. [Style commun] --ar 4:5
```

**Pipette — `auren-pipette`**
```
The slim blush-pink glass pipette from the AUREN serum, lifted vertically out of the oxblood bottle by an unseen hand, three perfect drops of translucent rose-amber serum forming at its tip, one drop falling. Platinum cap visible blurred in the background. [Style commun] --ar 4:5
```

**Serum — `auren-serum`**
```
Macro texture shot: a single drop of translucent rose-amber serum spread into a thin satin film on a dark glass surface, light passing through it, silky edges, no bubbles. The oxblood AUREN bottle softly out of focus in the background. [Style commun] --ar 4:5
```

## 4. Reserve (achat) — `auren-packshot` (1:1 ou 4:5)

Aujourd'hui la section achat réutilise l'image du hero : une vraie image de packshot la rend plus « boutique ».

```
[Bloc produit] Clean product packshot: the bottle standing upright next to its closed rigid box in matte oxblood paper with "AUREN" embossed tone-on-tone in the same Didone serif. Front view, centered, even soft light, seamless warm blush-beige background (#ecd9d2), soft contact shadow. [Style commun, but lighter and brighter] --ar 4:5
```

## 5. Bonus — rituel (pour remplacer une section texte plus tard)

```
Close-up of a woman's cheek and jawline in soft evening light, eyes closed, three drops of rose-amber serum being pressed — not rubbed — into the skin with the palms. Real skin texture, no retouching, warm dim bedroom light, the oxblood AUREN bottle blurred on a stone nightstand. [Style commun] --ar 4:5
```

## 6. Bannière femmes — `auren-women` (2400 × 1028, 21:9)

Grande bannière pleine largeur, avec de vraies personnes.

```
Wide editorial beauty campaign photograph of six women of different origins standing together in a loose, relaxed row: a West African woman with deep dark skin and short natural coils, an East Asian woman with a sleek low bun, a South Asian woman with long dark waves, a North African woman with curly hair pulled back, a Latina woman with shoulder-length hair, and a Northern European woman with freckles and silver-blonde hair in her fifties. Ages from mid-twenties to mid-fifties. Each wears a fluid, minimal outfit in the AUREN palette: deep oxblood silk slip dress, wine-red satin shirt, dusty-rose cashmere knit, blush-beige draped dress, champagne satin, soft taupe tailoring. Bare shoulders and necklines, minimal brushed-platinum jewelry. Real, glowing skin with natural texture, pores and freckles visible, no heavy makeup, no retouching look. Calm, confident expressions, some looking at the camera, some at each other, one with eyes closed. Soft directional key light from the left, warm rim light, smoky dusty-rose to deep oxblood backdrop fading to near-black at the edges. Subtle film grain, medium format, quiet luxury, cohesive color harmony, empty space above their heads for headline text. --ar 21:9
```

Negative prompt :

```
same face, identical women, plastic skin, airbrushed, heavy makeup, bright colors, blue, green, logos, text, watermark, extra fingers, distorted hands, busy background, fashion runway, nudity
```

Astuces pour cette image :
- Si l'outil fusionne les visages, génère 2 ou 3 femmes par image en 4:5, puis assemble-les côte à côte. Le rendu est souvent plus naturel.
- Recadre en 21:9 en gardant les yeux au tiers supérieur, pour qu'un titre tienne au-dessus.
- Vérifie les mains, c'est là que les IA se trompent le plus.

## 7. Grille bento — avant/après et cas d'usage (4:5)

**Méthode** : génère d'abord l'« après » (une belle peau, c'est ce que l'IA sait faire spontanément). Ensuite, **retouche cette même image** avec un outil d'édition (Nano Banana, GPT Image, Flux Kontext, Photoshop Generative Fill) pour fabriquer l'« avant ». Ne régénère pas une nouvelle image : en édition, le visage, le cadrage et la lumière restent identiques, et seule la peau change.

**Étape 1 — Après — `auren-after`** (génération)
```
Clinical skincare photograph, tight crop of one woman's face from forehead to chin, three-quarter view, woman in her early forties with light-brown mixed-heritage skin, hair pulled back. Neutral relaxed expression, lips closed, not smiling, eyes open looking slightly off camera. Healthy rested skin: even tone, soft natural glow on the cheekbone, visible pores and fine natural texture, no makeup. Flat soft daylight from the left, plain warm grey-beige background, sharp focus, 100mm macro, documentary dermatology style, no retouching. --ar 4:5
```
Negative : `smile, smiling, teeth, makeup, lipstick, airbrushed, plastic skin, beauty filter, glamour, dramatic light`

**Étape 2 — Avant — `auren-before`** (édition de l'image de l'étape 1, pas une nouvelle génération)
```
Edit this photo. Keep the exact same woman, face shape, pose, expression, hair, framing, background and lighting. Change ONLY her skin to show a tired, under-slept complexion: add visible fine lines and crow's feet at the outer corner of the eye, deeper under-eye hollows with grey-violet dark circles, a dull flat tone with no glow, slightly uneven redness around the nose and cheeks, mild dry texture on the cheek. Keep it realistic and subtle, the same pores, no added makeup, still not smiling.
```

**Pourquoi l'IA te sortait deux fois la même image** : les mots « beauty », « editorial » ou « luminous » la poussent toujours vers une peau parfaite. Les défauts restaient trop vagues (« slightly dull », « a little dryness »), alors elle les ignorait. Il faut nommer des défauts visibles (pattes d'oie, cernes gris-violet, rougeurs) et passer par l'édition pour garder le même visage. Le sourire vient d'un biais par défaut des modèles : il faut écrire « lips closed, not smiling » **et** mettre « smile » dans le negative.

**Cas d'usage — le matin — `auren-morning`**
```
A woman in her thirties with deep brown skin, just woken up, sitting on the edge of her bed in soft morning window light, white linen, touching her cheekbone with two fingers and looking at her reflection in a small round mirror. Calm, quiet, focused expression, lips closed, not smiling. Skin visibly rested and luminous, real pores, no makeup. Warm, intimate, editorial, oxblood and blush tones in the room. --ar 4:5
```
Negative : `smile, smiling, teeth, laughing, makeup, airbrushed`

**Cas d'usage — après une nuit courte — `auren-commute`**
```
A woman in her late twenties with East Asian features, on her way to work in the early morning, champagne trench coat, natural fresh skin, confident relaxed expression, soft city light, shallow depth of field, editorial beauty, blush and wine palette. --ar 4:5
```

Avertissement : les avant/après générés par IA ne peuvent pas servir de preuve de résultat pour une vraie marque. Pour un vrai produit, il faut de vraies photos de testeuses, avec leur accord.

---

### Astuces

- Le logo sort souvent mal écrit : génère sans texte (ajoute `blank label` au bloc produit), puis pose « AUREN » toi-même dans Photoshop/Figma avec la police Bodoni Moda.
- Garde la même graine (`--seed`) et la même image de référence pour toute la série.
- Fais d'abord le hero, puis sers-t'en comme référence pour toutes les autres.
