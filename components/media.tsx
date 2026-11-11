import ReactDOM from "react-dom";
import manifest from "@/lib/media-manifest.json";
import { cn } from "@/lib/utils";

type Photo = { width: number; height: number; widths: number[]; color: string; blur: string };
const photos = manifest.photos as Record<string, Photo>;

/** Responsive AVIF/WebP image from the optimised media folder. Falls back to a gradient if the slug has no asset yet.
 *  `priority` preloads the AVIF candidate set with high fetch priority (use for the single LCP image per page). */
export function Media({ slug, alt, className, sizes = "100vw", priority = false, style }: {
  slug: string; alt: string; className?: string; sizes?: string; priority?: boolean; style?: React.CSSProperties;
}) {
  const p = photos[slug];
  if (!p) return <div role="img" aria-label={alt} className={cn("bg-gradient-to-br from-primary/25 to-secondary/25", className)} style={style} />;
  const set = (ext: string) => p.widths.map((w) => `/media/${slug}-${w}.${ext} ${w}w`).join(", ");
  const largest = p.widths[p.widths.length - 1];
  if (priority) {
    ReactDOM.preload(`/media/${slug}-${largest}.avif`, { as: "image", imageSrcSet: set("avif"), imageSizes: sizes, type: "image/avif", fetchPriority: "high" });
  }
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/media/${slug}-${largest}.webp`} alt={alt} width={p.width} height={p.height} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "low"}
        className={className} style={{ backgroundColor: p.color, backgroundImage: `url(${p.blur})`, backgroundSize: "cover", ...style }} />
    </picture>
  );
}

