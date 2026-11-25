import * as THREE from 'three';

/**
 * Procedural model of the AUREN bottle, built from lathe profiles so it ships
 * with zero model files. Units: base at y = 0, cap top at y ≈ 2.8.
 *
 * - Glass body: transmissive, tinted by attenuation (refracts what is behind it).
 * - Serum: rendered as the inside of the far wall only (BackSide), so the
 *   pipette stays visible through it from any angle.
 * - Cap: lathe sheared so both its lower seam and its top are bevelled.
 */

export interface BottleColors {
  glass: string;
  serum: string;
  serumDeep: string;
  metal: string;
  label: string;
}

export interface BottleParts {
  group: THREE.Group;
  dispose: () => void;
}

/** Oval footprint: the bottle is wider face-on than side-on. */
const DEPTH = 0.74;
const SEGMENTS = 96;

const v2 = (x: number, y: number) => new THREE.Vector2(x, y);

/** Rounded-corner profile helper: quarter arc from (cx+r, cy) going around a corner. */
function arc(points: THREE.Vector2[], cx: number, cy: number, r: number, from: number, to: number, steps = 10) {
  for (let i = 0; i <= steps; i++) {
    const a = from + ((to - from) * i) / steps;
    points.push(v2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
  }
}

function glassProfile(inset = 0) {
  const p: THREE.Vector2[] = [v2(0, inset)];
  // rounded heel
  arc(p, 0.4 - inset, 0.14 + inset, 0.14, -Math.PI / 2, 0);
  p.push(v2(0.545 - inset, 0.45), v2(0.535 - inset, 0.95), v2(0.505 - inset, 1.45), v2(0.47 - inset, 1.8));
  // shoulder hidden under the cap
  p.push(v2(0.36 - inset, 1.92), v2(0.16, 1.98), v2(0.16, 2.1));
  return p;
}

function serumProfile() {
  const inset = 0.055;
  const p: THREE.Vector2[] = [v2(0.001, 0.07)];
  arc(p, 0.38 - inset, 0.2, 0.12, -Math.PI / 2, 0, 8);
  p.push(v2(0.545 - inset - 0.01, 0.45), v2(0.535 - inset - 0.01, 0.95), v2(0.505 - inset - 0.01, 1.42));
  return p;
}

function capProfile() {
  const p: THREE.Vector2[] = [v2(0.4, 1.62), v2(0.485, 1.62), v2(0.488, 1.7)];
  p.push(v2(0.48, 2.2), v2(0.455, 2.55));
  arc(p, 0.33, 2.58, 0.125, -0.25, Math.PI / 2, 12);
  p.push(v2(0.001, 2.705));
  return p;
}

/** Brushed-metal grain: fine horizontal streaks used as roughness + bump. */
function brushedTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 512;
  const g = c.getContext('2d')!;
  g.fillStyle = '#8a8a8a';
  g.fillRect(0, 0, c.width, c.height);
  for (let y = 0; y < c.height; y++) {
    const v = 110 + Math.random() * 60;
    g.fillStyle = `rgba(${v},${v},${v},${0.35 + Math.random() * 0.4})`;
    g.fillRect(0, y, c.width, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** The printed label, drawn on a canvas and wrapped on a thin lathe skin. */
function labelTexture(name: string, color: string) {
  const c = document.createElement('canvas');
  c.width = 2048;
  c.height = 512;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, c.width, c.height);
  g.fillStyle = color;
  g.textAlign = 'center';
  // the front of the bottle sits at u = 0.5, i.e. canvas centre
  const cx = c.width / 2;
  g.font = '300 118px "Fraunces", "Georgia", serif';
  // manual letter-spacing for wide tracking
  const letters = name.split('');
  const track = 26;
  const widths = letters.map((l) => g.measureText(l).width);
  const total = widths.reduce((a, b) => a + b, 0) + track * (letters.length - 1);
  let x = cx - total / 2;
  g.textAlign = 'left';
  letters.forEach((l, i) => {
    g.fillText(l, x, 190);
    x += widths[i] + track;
  });
  g.font = '400 30px "Figtree", Arial, sans-serif';
  g.textAlign = 'center';
  g.fillText('CELLULAR  RENEWAL', cx, 400);
  g.fillText('SERUM  ·  30ml', cx, 446);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Shears lathe vertices so the cap's seam and crown are bevelled. */
function shearCap(geo: THREE.BufferGeometry) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const y0 = 1.62;
  const y1 = 2.705;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const t = (y - y0) / (y1 - y0);
    // seam rises to the right (+0.11), crown falls to the right (−0.3)
    const k = 0.11 + (-0.3 - 0.11) * Math.pow(Math.max(0, t), 1.6);
    pos.setY(i, y + k * x);
  }
  geo.computeVertexNormals();
}

/** Vertical gradient baked into vertex colours for the serum. */
function paintSerum(geo: THREE.BufferGeometry, deep: string, light: string) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const a = new THREE.Color(deep);
  const b = new THREE.Color(light);
  const tmp = new THREE.Color();
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.smoothstep(pos.getY(i), 0.05, 1.3);
    tmp.copy(a).lerp(b, 0.25 + t * 0.75);
    tmp.toArray(colors, i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

export function createBottle(name: string, colors: BottleColors): BottleParts {
  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  // ----- serum (far wall only) -----
  const serumGeo = track(new THREE.LatheGeometry(serumProfile(), SEGMENTS));
  paintSerum(serumGeo, colors.serumDeep, colors.serum);
  const serum = new THREE.Mesh(
    serumGeo,
    track(
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        side: THREE.BackSide,
        roughness: 0.35,
        metalness: 0,
        emissive: new THREE.Color(colors.serum),
        emissiveIntensity: 0.22,
      }),
    ),
  );

  // serum surface (meniscus)
  const meniscus = new THREE.Mesh(
    track(new THREE.CircleGeometry(0.44, SEGMENTS)),
    track(new THREE.MeshStandardMaterial({ color: colors.serum, roughness: 0.15, emissive: colors.serum, emissiveIntensity: 0.3 })),
  );
  meniscus.rotation.x = -Math.PI / 2;
  meniscus.position.y = 1.42;

  // ----- pipette -----
  const pipetteMat = track(
    new THREE.MeshPhysicalMaterial({
      color: '#f3d2c8',
      roughness: 0.12,
      metalness: 0,
      clearcoat: 1,
      emissive: '#6b2a2a',
      emissiveIntensity: 0.25,
    }),
  );
  const tube = new THREE.Mesh(track(new THREE.CylinderGeometry(0.032, 0.032, 1.55, 24, 1, true)), pipetteMat);
  tube.position.y = 1.08;
  const bulb = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.052, 0.12, 8, 24)), pipetteMat);
  bulb.position.y = 0.3;
  const tip = new THREE.Mesh(track(new THREE.SphereGeometry(0.032, 16, 12)), pipetteMat);
  tip.position.y = 0.2;

  // ----- glass -----
  const glass = new THREE.Mesh(
    track(new THREE.LatheGeometry(glassProfile(), SEGMENTS)),
    track(
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.04,
        metalness: 0,
        transmission: 1,
        thickness: 0.55,
        ior: 1.52,
        attenuationColor: new THREE.Color(colors.glass),
        attenuationDistance: 0.32,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        specularIntensity: 1,
        envMapIntensity: 1.25,
      }),
    ),
  );

  // ----- label skin -----
  const labelPts = glassProfile().filter((p) => p.y >= 0.4 && p.y <= 1.5).map((p) => v2(p.x + 0.004, p.y));
  const label = new THREE.Mesh(
    track(new THREE.LatheGeometry(labelPts, SEGMENTS, Math.PI, Math.PI * 2)),
    track(
      new THREE.MeshStandardMaterial({
        map: track(labelTexture(name, colors.label)),
        transparent: true,
        roughness: 0.4,
        metalness: 0.6,
        depthWrite: false,
      }),
    ),
  );

  // ----- cap -----
  const capGeo = track(new THREE.LatheGeometry(capProfile(), SEGMENTS));
  shearCap(capGeo);
  const brushed = track(brushedTexture());
  const cap = new THREE.Mesh(
    capGeo,
    track(
      new THREE.MeshStandardMaterial({
        color: colors.metal,
        metalness: 1,
        roughness: 0.32,
        roughnessMap: brushed,
        bumpMap: brushed,
        bumpScale: 0.6,
        envMapIntensity: 1.1,
      }),
    ),
  );

  const body = new THREE.Group();
  body.add(serum, meniscus, tube, bulb, tip, glass, label, cap);
  body.scale.z = DEPTH;
  group.add(body);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

/** Soft radial glow / smoke used as the backdrop (also what the glass refracts). */
export function createBackdrop(glow: string, ink: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(256, 230, 10, 256, 256, 256);
  grad.addColorStop(0, glow);
  grad.addColorStop(0.45, `${glow}55`);
  grad.addColorStop(1, ink);
  g.fillStyle = ink;
  g.fillRect(0, 0, 512, 512);
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 512);
  // drifting smoke wisps
  for (let i = 0; i < 40; i++) {
    const x = 80 + Math.random() * 352;
    const y = 60 + Math.random() * 360;
    const r = 30 + Math.random() * 90;
    const s = g.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, 'rgba(255,220,215,0.05)');
    s.addColorStop(1, 'rgba(255,220,215,0)');
    g.fillStyle = s;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({ map: tex, depthWrite: false }));
  mesh.position.set(0, 1.6, -4);
  return mesh;
}

/** Contact shadow + light pool on the "table". */
export function createFloor(glow: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const pool = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  pool.addColorStop(0, `${glow}66`);
  pool.addColorStop(1, `${glow}00`);
  g.fillStyle = pool;
  g.fillRect(0, 0, 256, 256);
  const shadow = g.createRadialGradient(128, 128, 0, 128, 128, 44);
  shadow.addColorStop(0, 'rgba(0,0,0,0.85)');
  shadow.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = shadow;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 4.2),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.002;
  return mesh;
}
