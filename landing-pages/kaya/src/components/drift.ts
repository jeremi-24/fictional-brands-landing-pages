/** A light wandering over an area, positions as fractions of it. */
export interface Lamp {
  x: number;
  y: number;
  /** where it is going, in radians */
  heading: number;
}

/** how far below the area a light may go */
export const FLOOR = 1.1;

/**
 * One step of the same length in any direction: `stepX` and `stepY` are that length
 * as fractions of the width and of the height. `nudge` bends the course; the sides,
 * `ceiling` and FLOOR send the light back.
 */
export function drift(lamp: Lamp, stepX: number, stepY: number, ceiling: number, nudge: number) {
  let heading = lamp.heading + nudge;
  let x = lamp.x + Math.cos(heading) * stepX;
  let y = lamp.y + Math.sin(heading) * stepY;
  if (x < 0 || x > 1) {
    x = x < 0 ? -x : 2 - x;
    heading = Math.PI - heading;
  }
  if (y < ceiling || y > FLOOR) {
    y = 2 * (y < ceiling ? ceiling : FLOOR) - y;
    heading = -heading;
  }
  Object.assign(lamp, { x, y, heading });
}
