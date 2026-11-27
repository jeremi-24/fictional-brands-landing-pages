/* The two live scenes. The same code draws their still pictures (src/renders). */
import * as THREE from 'three';
import { BED, SENSORS, V, cork, outline, points, shadow, shoe, slab, type Sandal } from './model';
import { LAYER_SIDES } from './sides';

export interface Scene3D {
  root: THREE.Group;
  /** what the camera must keep in view */
  seen: THREE.Vector3[];
  direction: THREE.Vector3;
  fit: number;
  /** recolours the sandal */
  tint: (colour: string) => void;
  /** moves the scene: `time` in seconds, `progress` from 0 to 1 */
  update: (time: number, progress: number) => void;
  /** turns the sandal by hand; only scenes that have it answer the pointer */
  turn?: (radians: number) => void;
  /** points the labels are pinned to, in world space, once the camera is set */
  anchors: (camera: THREE.Camera) => THREE.Vector3[];
}

/** the sandal swaying gently, until the visitor turns it */
export function heroScene(sandal: Sandal): Scene3D {
  const root = new THREE.Group();
  const mesh = shoe(sandal);
  root.add(mesh, shadow(mesh, 0.34));
  // a few thousand points are enough to frame the shape
  const all = points(mesh);
  const rest = all.filter((_, i) => i % Math.ceil(all.length / 3000) === 0);
  // the angle chosen by hand
  let held: number | undefined;
  return {
    root,
    // framed for every angle it can be turned to
    seen: Array.from({ length: 12 }, (_, i) => rest.map((v) => v.clone().applyAxisAngle(V(0, 1, 0), (i * Math.PI) / 6))).flat(),
    direction: V(0.86, 0.4, 0.52),
    fit: 0.86,
    tint: (colour) => mesh.material.color.set(colour),
    update: (time) => {
      root.rotation.y = held ?? Math.sin(time * 0.5) * 0.22;
    },
    turn: (radians) => {
      held = root.rotation.y += radians;
    },
    anchors: () => [],
  };
}

/** the sandal opening into its seven layers as progress goes from 0 to 1 */
export function layersScene(sandal: Sandal): Scene3D {
  const shape = outline(sandal);
  const root = new THREE.Group();
  const whole = shoe(sandal);
  // the real upper and outsole are the model itself, cut above and below the footbed
  const upperPlane = new THREE.Plane(V(0, 1, 0), 0);
  const solePlane = new THREE.Plane(V(0, -1, 0), 0);
  const upper = shoe(sandal, '#ffffff', [upperPlane]);
  const outsole = shoe(sandal, '#ffffff', [solePlane]);

  const gold = new THREE.MeshStandardMaterial({ color: '#d9b36a', metalness: 0.6, roughness: 0.38 });
  const top = new THREE.Group().add(cork(shape, 0.02));
  const foam = new THREE.Group().add(slab(shape, '#cdc2b4', 0.022));
  const sensors = new THREE.Group().add(slab(shape, '#8d7266', 0.006));
  for (const [x, z, r] of SENSORS) {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.018 + r * 0.0005, 0.018 + r * 0.0005, 0.008, 40), gold);
    disc.position.set(x, 0.013, z);
    const track = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(V(x, 0.008, z), V(0.02, 0.008, -0.18)), 2, 0.0022, 6), gold);
    sensors.add(disc, track);
  }
  const membrane = new THREE.Group().add(slab(shape, '#c2a08c', 0.005));
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.03, 0.15), new THREE.MeshStandardMaterial({ color: '#2b2420', roughness: 0.4 }));
  const lid = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.004, 0.05), new THREE.MeshStandardMaterial({ color: '#cfc9c2', metalness: 0.7, roughness: 0.3 }));
  box.position.z = lid.position.z = -0.3;
  lid.position.y = 0.017;
  const battery = new THREE.Group().add(box, lid);

  // top to bottom: part, resting height, how far it travels when the sandal opens
  const parts: [THREE.Object3D, number, number][] = [
    [upper, 0, 0.74],
    [top, BED + 0.012, 0.508],
    [foam, BED + 0.002, 0.338],
    [sensors, BED - 0.002, 0.172],
    [membrane, BED - 0.006, 0.006],
    [battery, BED - 0.03, -0.11],
    [outsole, 0, -0.38],
  ];
  const pose = (progress: number) => {
    const closed = progress < 0.01;
    whole.visible = closed;
    for (const [part, rest, travel] of parts) {
      part.visible = !closed;
      part.position.y = rest + travel * progress;
    }
    upperPlane.constant = -(-0.083 + upper.position.y);
    solePlane.constant = BED - 0.008 + outsole.position.y;
  };
  pose(1);
  const open = parts.map(([part]) => points(part));
  const ground = shadow(outsole, 0.22);
  root.add(whole, ...parts.map(([part]) => part), ground);

  let edges: THREE.Vector3[] | undefined;
  return {
    root,
    seen: open.flat(),
    direction: V(1, 0.46, 0.36),
    fit: 0.94,
    tint: (colour) => [whole, upper, outsole].forEach((part) => part.material.color.set(colour)),
    update: (_time, progress) => {
      pose(progress);
      ground.position.y = -0.21 + outsole.position.y;
    },
    anchors: (camera) => {
      // each label points at the outermost point of its layer, on its own side
      edges ??= open.map((cloud, i) => {
        const side = LAYER_SIDES[i] ? 1 : -1;
        let best = -Infinity;
        let found = cloud[0];
        for (const v of cloud) {
          const q = v.clone().project(camera);
          // the battery sits just under the membrane: pin its label low so the two stay apart
          const score = q.x * side - (i === 5 ? q.y * 3 : 0);
          if (score > best) [best, found] = [score, v];
        }
        return found.clone().setY(found.y - (parts[i][1] + parts[i][2]));
      });
      return edges.map((v, i) => v.clone().setY(v.y + parts[i][0].position.y));
    },
  };
}
