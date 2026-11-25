import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { CameraFocus, Theme } from '../content/types';
import { prefersReducedMotion } from '../hooks/usePageMotion';
import { createBackdrop, createBottle, createFloor } from './createBottle';

interface Props {
  name: string;
  theme: Theme;
  /** Scroll progress 0–1, written by the parent without re-rendering. */
  progress: MutableRefObject<number>;
  /** Camera stops, evenly spread across the progress range. */
  stops: CameraFocus[];
  /** Shown if WebGL is unavailable. */
  fallback: ReactNode;
}

const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** Sample the stop list at progress p, dwelling on each stop. */
function sample(stops: CameraFocus[], p: number): CameraFocus {
  const span = stops.length - 1;
  const x = Math.min(span, Math.max(0, p * span));
  const i = Math.min(span - 1, Math.floor(x));
  const t = smoother(x - i);
  const a = stops[i];
  const b = stops[i + 1];
  return {
    y: a.y + (b.y - a.y) * t,
    distance: a.distance + (b.distance - a.distance) * t,
    turn: a.turn + (b.turn - a.turn) * t,
  };
}

/**
 * Renders the procedural AUREN bottle. The camera and the model's turn are
 * driven only by scroll (no orbit controls); the pointer adds a slight tilt.
 */
export function BottleStage({ name, theme, progress, stops, fallback }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      // the label is drawn with the display font
      await document.fonts?.ready;
      if (disposed) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(theme.ink);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 0.55;

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

      const key = new THREE.DirectionalLight('#ffe9e2', 2.2);
      key.position.set(-3, 4, 3);
      const rim = new THREE.PointLight(theme.rose, 18, 10);
      rim.position.set(1.8, 2.2, -2);
      const under = new THREE.PointLight('#ff9a8a', 4, 4);
      under.position.set(0, 0.6, 1.6);
      scene.add(key, rim, under);

      const backdrop = createBackdrop(theme.wine, theme.ink);
      const floor = createFloor(theme.rose);
      const bottle = createBottle(name, {
        glass: theme.wine,
        serum: '#d7897a',
        serumDeep: '#5a1420',
        metal: theme.metal,
        label: theme.blush,
      });
      scene.add(backdrop, floor, bottle.group);

      const reduced = prefersReducedMotion();
      const pointer = { x: 0, y: 0 };
      const cur = { ...sample(stops, progress.current) };
      const lookAt = new THREE.Vector3();
      let visible = false;
      let raf = 0;
      const clock = new THREE.Clock();

      const resize = () => {
        const { width, height } = el.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const frame = () => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        const target = sample(stops, progress.current);
        const k = 1 - Math.exp(-dt * 5);
        cur.y += (target.y - cur.y) * k;
        cur.distance += (target.distance - cur.distance) * k;
        cur.turn += (target.turn - cur.turn) * k;

        // portrait screens need more distance to fit the silhouette
        const fit = camera.aspect < 0.8 ? 1 + (0.8 - camera.aspect) * 0.9 : 1;
        const d = cur.distance * fit;
        camera.position.set(pointer.x * 0.35, cur.y + 0.25 + pointer.y * 0.2, d);
        lookAt.set(0, cur.y, 0);
        camera.lookAt(lookAt);

        bottle.group.rotation.y = cur.turn + (reduced ? 0 : Math.sin(t * 0.4) * 0.05);
        bottle.group.position.y = reduced ? 0 : Math.sin(t * 0.9) * 0.025;
        rim.intensity = 18 + Math.sin(t * 0.7) * 3;
        renderer.render(scene, camera);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) {
          clock.getDelta();
          frame();
        }
      });
      io.observe(el);

      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (e.clientY / window.innerHeight - 0.5) * -2;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      // first frame so the scene is never blank
      renderer.render(scene, camera);
      el.classList.add('is-ready');

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onPointer);
        bottle.dispose();
        for (const m of [backdrop, floor]) {
          m.geometry.dispose();
          const mat = m.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.dispose();
        }
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    start();
    return () => {
      disposed = true;
      cleanup();
    };
  }, [name, theme, progress, stops]);

  return (
    <div className="bottle-stage" ref={host} aria-hidden="true">
      {failed && fallback}
    </div>
  );
}
