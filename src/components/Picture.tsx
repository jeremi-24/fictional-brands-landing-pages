import type { ResponsiveImage } from '../content/types';

interface Props {
  image: ResponsiveImage;
  sizes: string;
  className?: string;
  eager?: boolean;
}

const srcSet = (img: ResponsiveImage, ext: string) => img.widths.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ');

/** AVIF with WebP fallback, using the pre-generated widths listed in the config. */
export function Picture({ image, sizes, className, eager }: Props) {
  const largest = image.widths[image.widths.length - 1];
  return (
    <picture className={className}>
      {!image.ext && <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />}
      <img
        src={`${image.base}-${largest}.${image.ext ?? 'webp'}`}
        srcSet={srcSet(image, image.ext ?? 'webp')}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}
