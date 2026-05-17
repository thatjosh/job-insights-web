// Brand mark for a company. By default we hit the simpleicons.org CDN
// (monochrome SVGs keyed by slug), but slugs in LOCAL_LOGOS take a
// bundled file under /public/logos/ — used for companies simpleicons
// doesn't carry (OpenAI requested removal, for example). Icons render
// black and flip to white via `dark:invert` so they stay legible across
// themes; if you bundle a new local SVG, make sure it has no explicit
// `fill` so the default-black rule and the invert filter both work.

// Slug -> bundled SVG path. Add an entry here when simpleicons 404s.
const LOCAL_LOGOS: Record<string, string> = {
  openai: "/logos/openai.svg",
};

function logoSrc(slug: string): string {
  return LOCAL_LOGOS[slug] ?? `https://cdn.simpleicons.org/${slug}/000`;
}

type Props = {
  slug: string;
  name: string;
  size?: number;
  className?: string;
};

export default function CompanyLogo({
  slug,
  name,
  size = 20,
  className,
}: Props) {
  const src = logoSrc(slug);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`shrink-0 dark:invert${className ? " " + className : ""}`}
    />
  );
}
