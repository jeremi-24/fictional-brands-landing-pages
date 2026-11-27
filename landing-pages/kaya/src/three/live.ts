/* Runs one scene in a canvas: sizes it, animates it while it is on screen, tells where the labels go. */
import * as THREE from 'three';
import { frame, loadSandal, studio } from './model';
import { heroScene, layersScene } from './scenes';

export type SceneName = 'hero' | 'layers';

interface Options {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  model: string;
  scene: SceneName;
  /** called after each drawing with the label positions, as fractions of the canvas */
  onDraw: (marks: { x: number; y: number }[], progress: number) => void;
}

export async function mount({ canvas, host, model, scene: name, onDraw }: Options) {
  const sandal = await loadSandal(model);
  const { renderer, scene, dispose } = studio(canvas);
  const view = (name === 'hero' ? heroScene : layersScene)(sandal);
  scene.add(view.root);
  const camera = new THREE.PerspectiveCamera(20, 1, 0.05, 40);
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  /** 0 while the stage is below the fold, 1 once it has reached the upper part of the screen */
  const progress = () => {
    if (name === 'hero' || still.matches) return 1;
    const p = (innerHeight * 0.85 - host.getBoundingClientRect().top) / (innerHeight * 0.7);
    return Math.min(1, Math.max(0, p));
  };

  let frameId = 0;
  let onScreen = false;
  let last = -1;
  // nothing is drawn, and no label placed, before the camera has framed the scene
  let framed = false;
  const draw = (time: number) => {
    if (!framed) return;
    const p = progress();
    // the layers only move with the scroll: do not redraw an unchanged picture
    if (name === 'layers' && p === last) return;
    last = p;
    view.update(still.matches ? 0 : time / 1000, p);
    renderer.render(scene, camera);
    onDraw(
      view.anchors(camera).map((v) => {
        const q = v.project(camera);
        return { x: (q.x + 1) / 2, y: (1 - q.y) / 2 };
      }),
      p,
    );
  };
  const loop = (time: number) => {
    draw(time);
    if (onScreen && !still.matches) frameId = requestAnimationFrame(loop);
  };
  const restart = () => {
    cancelAnimationFrame(frameId);
    last = -1;
    frameId = requestAnimationFrame(loop);
  };

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    view.update(0, 1);
    frame(camera, view.seen, view.direction, w / h, view.fit);
    framed = true;
    restart();
  };
  // turning by hand: drag across the picture, or the arrow keys. The wheel is left to the page.
  const listening = new AbortController();
  if (view.turn) {
    const { signal } = listening;
    const turn = (radians: number) => {
      view.turn!(radians);
      restart();
    };
    let from: number | undefined;
    canvas.addEventListener(
      'pointerdown',
      (e) => {
        from = e.clientX;
        canvas.setPointerCapture(e.pointerId);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointermove',
      (e) => {
        if (from === undefined) return;
        // a drag across the whole picture is one full turn
        turn(((e.clientX - from) / canvas.clientWidth) * Math.PI * 2);
        from = e.clientX;
      },
      { signal },
    );
    // a vertical swipe scrolls the page instead: the browser cancels the pointer
    for (const type of ['pointerup', 'pointercancel'] as const) canvas.addEventListener(type, () => (from = undefined), { signal });
    host.addEventListener(
      'keydown',
      (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        turn(e.key === 'ArrowLeft' ? -0.35 : 0.35);
      },
      { signal },
    );
  }

  const sizes = new ResizeObserver(resize);
  sizes.observe(host);
  const sight = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) restart();
  });
  sight.observe(host);
  still.addEventListener('change', restart);

  return {
    tint: (colour: string) => {
      view.tint(colour);
      restart();
    },
    stop: () => {
      cancelAnimationFrame(frameId);
      listening.abort();
      sizes.disconnect();
      sight.disconnect();
      still.removeEventListener('change', restart);
      dispose();
    },
  };
}
