/*
 * Draws the still pictures of the page (renders.html?art=<name>): hero, layers, pair,
 * pair-ivory, pair-terracotta, pair-cocoa, pair-night, bed, dial-wide,
 * walk-en, walk-fr, walk-de, og. The canvas is ready when window.ready is true.
 */
import * as THREE from 'three';
import { SENSORS, V, cork, frame, loadSandal, outline, pair, points, shadow, shoe, slab, studio, type Sandal } from '../three/model';
import { heroScene, layersScene } from '../three/scenes';
import { site } from '../content/site';
import { TINTS } from '../three/sides';

const art = new URLSearchParams(location.search).get('art') ?? 'pair';

function render3d(sandal: Sandal, width: number, height: number) {
  const canvas = document.createElement('canvas');
  const { renderer, scene } = studio(canvas);
  renderer.setSize(width, height, false);
  const camera = new THREE.PerspectiveCamera(20, width / height, 0.05, 40);
  const shoot = (object: THREE.Object3D, seen: THREE.Vector3[], direction: THREE.Vector3, fit: number) => {
    scene.add(object);
    frame(camera, seen, direction, width / height, fit);
    renderer.render(scene, camera);
  };

  if (art === 'hero' || art === 'layers') {
    const view = (art === 'hero' ? heroScene : layersScene)(sandal);
    view.update(0, 1);
    shoot(view.root, view.seen, view.direction, view.fit);
  } else if (art.startsWith('pair')) {
    const two = pair(sandal, TINTS[Math.max(0, ['ivory', 'terracotta', 'cocoa', 'night'].indexOf(art.split('-')[1]))]);
    const seen = points(two);
    two.add(shadow(two, 0.3));
    shoot(two, seen, art === 'pair' ? V(0.75, 0.55, 0.9) : V(0.12, 0.62, 1), 0.94);
  } else if (art === 'bed') {
    const shape = outline(sandal);
    const top = cork(shape, 0.028);
    top.position.y = 0.07;
    const foam = slab(shape, '#cdc2b4', 0.034);
    foam.position.y = -0.06;
    const bed = new THREE.Group().add(foam, top);
    // the soft print of a foot, where the sensors are
    for (const [x, z, r] of SENSORS) {
      for (const [k, opacity] of [[1.25, 0.16], [0.8, 0.22], [0.4, 0.34]]) {
        const print = new THREE.Mesh(new THREE.CircleGeometry(r * 0.0016 * k, 48), new THREE.MeshBasicMaterial({ color: '#5a3a18', transparent: true, opacity, depthWrite: false }));
        print.rotation.x = -Math.PI / 2;
        print.position.set(x, 0.1035 + (1.3 - k) * 0.0004, z);
        bed.add(print);
      }
    }
    const seen = points(foam).concat(points(top));
    bed.add(shadow(foam, 0.24));
    shoot(bed, seen, V(1, 0.85, 0.35), 0.94);
  } else {
    const focus = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.26));
    focus.position.set(0.17, 0.085, -0.066);
    shoot(shoe(sandal), points(focus), V(1, 0.2, 0.34), 0.6);
  }
  return canvas;
}

/** the walk app on a phone: today's steps and where they went. It carries words, so one picture per language */
function drawPhone(lang: string) {
  const words: Record<string, string[]> = {
    en: ['My walk', 'Today · example', '6,240', 'steps', 'Goal: 8,000', '4.2 km · 52 min', 'Share with my physio'],
    fr: ['Ma marche', 'Aujourd’hui · exemple', '6 240', 'pas', 'Objectif : 8 000', '4,2 km · 52 min', 'Partager avec mon kiné'],
    de: ['Mein Gang', 'Heute · Beispiel', '6.240', 'Schritte', 'Ziel: 8.000', '4,2 km · 52 Min.', 'Mit der Physio teilen'],
  };
  const [title, sub, count, unit, goal, trip, button] = words[lang] ?? words.en;
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 1180;
  const g = canvas.getContext('2d')!;
  const box = (x: number, y: number, w: number, h: number, r: number, fill: string) => {
    g.fillStyle = fill;
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    g.fill();
  };
  const disc = (x: number, y: number, r: number, fill: string) => {
    g.fillStyle = fill;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  };
  const text = (value: string, x: number, y: number, font: string, fill: string, align: CanvasTextAlign = 'left') => {
    g.font = font;
    g.fillStyle = fill;
    g.textAlign = align;
    g.fillText(value, x, y, 500);
  };
  box(0, 0, 640, 1180, 104, '#3b1e12');
  box(20, 20, 600, 1140, 86, '#fffdf9');
  box(235, 40, 170, 40, 20, '#3b1e12');
  text(title, 66, 156, '700 54px "Big Shoulders Display"', '#2a160d');
  text(sub, 66, 202, '400 28px DM Sans', '#765b4c');

  // today's count, inside the share of the goal already walked
  const ring = (share: number, colour: string) => {
    g.strokeStyle = colour;
    g.lineWidth = 24;
    g.lineCap = 'round';
    g.beginPath();
    g.arc(320, 362, 126, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * share);
    g.stroke();
  };
  ring(1, '#f1e1cf');
  ring(0.78, '#a8431f');
  text(count, 320, 374, '800 68px "Big Shoulders Display"', '#2a160d', 'center');
  text(unit, 320, 422, '500 30px DM Sans', '#765b4c', 'center');
  text(goal, 320, 542, '500 28px DM Sans', '#765b4c', 'center');

  // the map: blocks and streets of an invented district
  g.save();
  g.beginPath();
  g.roundRect(48, 570, 544, 430, 40);
  g.clip();
  box(48, 570, 544, 430, 0, '#fbf1e4');
  const columns = [48, 150, 268, 366, 478, 592];
  const rows = [570, 648, 752, 846, 922, 1000];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      box(columns[i] + 10, rows[j] + 10, columns[i + 1] - columns[i] - 20, rows[j + 1] - rows[j] - 20, 12, (i * 3 + j * 5) % 7 ? '#ecd8c0' : '#dfbf9c');
    }
  }
  g.strokeStyle = '#fbf1e4';
  g.lineWidth = 34;
  g.beginPath();
  g.moveTo(40, 985);
  g.bezierCurveTo(240, 885, 380, 765, 600, 705);
  g.stroke();

  const route: [number, number][] = [[150, 922], [150, 752], [268, 752], [268, 648], [478, 648], [478, 606]];
  const path = (width: number, colour: string) => {
    g.strokeStyle = colour;
    g.lineWidth = width;
    g.lineCap = g.lineJoin = 'round';
    g.beginPath();
    route.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.stroke();
  };
  path(24, '#fffdf9');
  path(10, '#a8431f');
  // footprints beside the route, left then right
  let step = 0;
  for (let i = 1; i < route.length; i++) {
    const [x0, y0] = route[i - 1];
    const [x1, y1] = route[i];
    const length = Math.hypot(x1 - x0, y1 - y0);
    const angle = Math.atan2(y1 - y0, x1 - x0);
    for (let d = 24; d < length - 8; d += 34, step++) {
      const side = step % 2 ? 1 : -1;
      g.save();
      g.translate(x0 + ((x1 - x0) * d) / length, y0 + ((y1 - y0) * d) / length);
      g.rotate(angle);
      g.fillStyle = '#3b1e12';
      g.beginPath();
      g.ellipse(3, side * 25, 10, 6, 0, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.ellipse(-12, side * 25, 4, 5, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
  }
  disc(150, 922, 17, '#3b1e12');
  disc(150, 922, 7, '#fffdf9');
  g.globalAlpha = 0.22;
  disc(478, 606, 36, '#a8431f');
  g.globalAlpha = 1;
  disc(478, 606, 19, '#fffdf9');
  disc(478, 606, 13, '#a8431f');
  g.font = '600 28px DM Sans';
  const wide = g.measureText(trip).width + 48;
  box(572 - wide, 914, wide, 62, 31, '#fffdf9');
  text(trip, 572 - wide / 2, 955, '600 28px DM Sans', '#2a160d', 'center');
  g.restore();

  box(48, 1028, 544, 96, 40, '#a8431f');
  text(button, 320, 1088, '600 34px DM Sans', '#fff4e8', 'center');
  return canvas;
}

/** the picture shown when the link is shared */
async function drawShare() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const g = canvas.getContext('2d')!;
  g.fillStyle = '#a8431f';
  g.fillRect(0, 0, 1200, 630);
  const load = async (src: string) => {
    const picture = new Image();
    picture.src = src;
    await picture.decode();
    return picture;
  };
  const photo = await load(site.hero.photos[2].src);
  // the photograph in its arch, on the right
  g.save();
  g.beginPath();
  g.roundRect(720, 50, 420, 580, [210, 210, 0, 0]);
  g.clip();
  const h = (photo.height * 420) / photo.width;
  g.drawImage(photo, 720, 50 + (580 - h) * 0.3, 420, h);
  g.restore();
  g.drawImage(await load(site.logo.light.src), 70, 70, 196, 60);
  g.fillStyle = '#fff4e8';
  g.font = '900 118px "Big Shoulders Display"';
  site.hero.title.forEach((line, i) => g.fillText(line.toUpperCase(), 66, 320 + i * 118, 620));
  g.font = '500 28px "DM Sans"';
  g.fillText(site.footer.tagline, 70, 556);
  return canvas;
}

await Promise.all(
  ['800 70px "Big Shoulders Display"', '900 118px "Big Shoulders Display"', '400 28px "DM Sans"', '500 30px "DM Sans"', '600 34px "DM Sans"'].map((f) => document.fonts.load(f)),
);

const sizes: Record<string, [number, number]> = {
  hero: [1320, 840],
  layers: [1400, 1240],
  bed: [900, 600],
  'dial-wide': [1200, 900],
};
const canvas =
  art === 'og' ? await drawShare()
  : art.startsWith('walk') ? drawPhone(art.split('-')[1])
  : render3d(await loadSandal(site.model), ...(sizes[art] ?? [1200, 640]));
canvas.style.maxWidth = '100%';
document.body.appendChild(canvas);
Object.assign(window, { ready: true });
