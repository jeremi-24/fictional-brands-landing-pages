import type { CSSProperties } from 'react';

/** Typed helper for inline CSS custom properties. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties;
