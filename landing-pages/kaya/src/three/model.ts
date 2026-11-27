/*
 * Everything built from the one 3D file (public/models/kaya.glb): the sandal itself,
 * the inner layers drawn from the outline of its sole, lights and camera framing.
 * A replacement model must keep: one mesh, toe towards +z, y up, about 1 unit long,
 * footbed near y = -0.105. Otherwise adjust BED below and the focus box in src/renders/main.ts.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** height of the footbed */
export const BED = -0.115;
/** x, z and size of the five pressure sensors: heel, arch, two under the ball, toes */
export const SENSORS: [number, number, number][] = [[0, -0.34, 46], [-0.055, -0.08, 18], [-0.065, 0.2, 38], [0.075, 0.16, 29], [-0.04, 0.37, 23]];

export interface Sandal {
  geometry: THREE.BufferGeometry;
  skin: THREE.Texture;
}

export async function loadSandal(url: string): Promise<Sandal> {
  const gltf = await new GLTFLoader().loadAsync(url);
  let found: THREE.Mesh | undefined;
  gltf.scene.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) found = o as THREE.Mesh;
  });
  if (!found) throw new Error(`no mesh in ${url}`);
  found.geometry.computeVertexNormals(); // the file ships without them
  const skin = (found.material as THREE.MeshStandardMaterial).map!;
  skin.anisotropy = 8;
  return { geometry: found.geometry, skin };
}

export function shoe({ geometry, skin }: Sandal, tint = '#ffffff', planes: THREE.Plane[] = []) {
  const material = new THREE.MeshStandardMaterial({ map: skin, color: tint, roughness: 0.5, metalness: 0, side: THREE.DoubleSide, clippingPlanes: planes });
  return new THREE.Mesh(geometry, material);
}

/** left and right shoe, side by side */
export function pair(sandal: Sandal, tint?: string) {
  const left = shoe(sandal, tint);
  const right = shoe(sandal, tint);
  left.position.set(0.31, 0, 0.04);
  left.rotation.y = 0.14;
  right.scale.x = -1;
  right.position.set(-0.31, 0, -0.04);
  right.rotation.y = -0.14;
  return new THREE.Group().add(left, right);
}

/** outline of the sole seen from above, read from the model: leftmost and rightmost point of each slice */
export function outline({ geometry }: Sandal): [number, number][] {
  const p = geometry.attributes.position;
  const slices = 48;
  const low = Array<number>(slices).fill(9);
  const high = Array<number>(slices).fill(-9);
  let z0 = 9;
  let z1 = -9;
  for (let i = 0; i < p.count; i++) {
    z0 = Math.min(z0, p.getZ(i));
    z1 = Math.max(z1, p.getZ(i));
  }
  for (let i = 0; i < p.count; i++) {
    if (p.getY(i) > -0.09) continue;
    const k = Math.min(slices - 1, Math.floor(((p.getZ(i) - z0) / (z1 - z0)) * slices));
    low[k] = Math.min(low[k], p.getX(i));
    high[k] = Math.max(high[k], p.getX(i));
  }
  const rows = low.map((l, k) => [z0 + ((k + 0.5) / slices) * (z1 - z0), l, high[k]]).filter((r) => r[2] > r[1]);
  const smooth = (j: number) => rows.map((r, k) => (rows[Math.max(0, k - 1)][j] + 2 * r[j] + rows[Math.min(rows.length - 1, k + 1)][j]) / 4);
  const left = smooth(1);
  const right = smooth(2);
  return [
    [0, z0 + 0.012],
    ...rows.map((r, k): [number, number] => [right[k] * 0.94, r[0]]),
    [0, z1 - 0.012],
    ...rows.map((r, k): [number, number] => [left[k] * 0.94, r[0]]).reverse(),
  ];
}

/** a flat layer cut to the outline of the sole */
export function slab(shape: [number, number][], colour: string, thickness: number) {
  const g = new THREE.ExtrudeGeometry(new THREE.Shape(shape.map(([x, z]) => new THREE.Vector2(x, -z))), {
    depth: thickness,
    bevelEnabled: true,
    bevelSize: 0.004,
    bevelThickness: 0.004,
    bevelSegments: 2,
  });
  g.rotateX(-Math.PI / 2);
  return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: colour, roughness: 0.8 }));
}

/** cork: a warm base speckled with grains, always the same */
export function cork(shape: [number, number][], thickness: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const g = canvas.getContext('2d')!;
  g.fillStyle = '#c69a5f';
  g.fillRect(0, 0, 256, 256);
  let seed = 3;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const grains = ['#a97c44', '#d8b27c', '#8f6535', '#e3c597'];
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = grains[(random() * grains.length) | 0];
    g.fillRect(random() * 256, random() * 256, 1 + random() * 3, 1 + random() * 2);
  }
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(4, 4);
  const mesh = slab(shape, '#ffffff', thickness);
  mesh.material.map = map;
  return mesh;
}

/** every vertex of an object in world space, leaving out what its clipping planes hide */
export function points(object: THREE.Object3D) {
  const out: THREE.Vector3[] = [];
  object.updateMatrixWorld(true);
  object.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const p = mesh.geometry.attributes.position;
    const planes = (mesh.material as THREE.Material).clippingPlanes ?? [];
    for (let i = 0; i < p.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(p, i).applyMatrix4(mesh.matrixWorld);
      if (planes.every((plane) => plane.distanceToPoint(v) >= 0)) out.push(v);
    }
  });
  return out;
}

/** a soft contact shadow under an object */
export function shadow(object: THREE.Object3D, strength: number) {
  const box = new THREE.Box3().setFromPoints(points(object));
  const size = box.getSize(new THREE.Vector3());
  const middle = box.getCenter(new THREE.Vector3());
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const g = canvas.getContext('2d')!;
  const fade = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  fade.addColorStop(0, `rgba(60,30,18,${strength})`);
  fade.addColorStop(0.55, `rgba(60,30,18,${strength * 0.45})`);
  fade.addColorStop(1, 'rgba(60,30,18,0)');
  g.fillStyle = fade;
  g.fillRect(0, 0, 256, 256);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size.x * 1.5, size.z * 1.2),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(middle.x, box.min.y - 0.004, middle.z);
  return mesh;
}

export function studio(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: import.meta.env.DEV });
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.localClippingEnabled = true;
  const scene = new THREE.Scene();
  const room = new THREE.PMREMGenerator(renderer);
  scene.environment = room.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.75;
  room.dispose();
  const sun = new THREE.DirectionalLight('#ffeedb', 1.5);
  sun.position.set(1.4, 2.4, 1);
  scene.add(sun);
  const dispose = () => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.dispose();
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.map?.dispose();
      material.dispose();
    });
    scene.environment?.dispose();
    renderer.dispose();
  };
  return { renderer, scene, dispose };
}

/** a camera looking from `direction` whose picture is filled, to the ratio `fit`, by the given points */
export function frame(camera: THREE.PerspectiveCamera, seen: THREE.Vector3[], direction: THREE.Vector3, aspect: number, fit: number) {
  const centre = new THREE.Box3().setFromPoints(seen).getCenter(new THREE.Vector3());
  camera.aspect = aspect;
  camera.position.copy(direction).normalize().multiplyScalar(5).add(centre);
  camera.lookAt(centre);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  const box = new THREE.Box2();
  for (const v of seen) {
    const q = v.clone().project(camera);
    box.expandByPoint(new THREE.Vector2(q.x, q.y));
  }
  const mid = box.getCenter(new THREE.Vector2());
  const size = box.getSize(new THREE.Vector2());
  const k = fit * Math.min(2 / size.x, 2 / size.y);
  camera.projectionMatrix.premultiply(new THREE.Matrix4().set(k, 0, 0, -k * mid.x, 0, k, 0, -k * mid.y, 0, 0, 1, 0, 0, 0, 0, 1));
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}
