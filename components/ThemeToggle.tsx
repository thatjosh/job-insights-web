"use client";

// Fixed bottom-right toggle that flips a `.dark` class on <html> and
// persists the choice in localStorage. The inline script in app/layout.tsx
// applies the saved preference before paint to avoid a light-mode flash.

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  // Theme stays null until we've read the class on <html> on mount. If we
  // rendered the button before that sync, the first click could happen
  // while React's state and the DOM disagree, and `classList.add("dark")`
  // on an already-dark <html> would no-op visually — looking like the
  // button is broken on the first click after a dark page load.
  const [theme, setTheme] = useState<Theme | null>(null);

  // The inline pre-paint script in app/layout.tsx has already set `.dark`
  // on <html> by the time we mount; this one-shot sync reads that state
  // into React. useSyncExternalStore would be the rule-friendly form but
  // we'd lose the "wait until mounted to render" gate that prevents the
  // click-race in the comment above.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  // Reserve the slot so layout doesn't shift when the icon appears.
  if (theme === null) {
    return (
      <div aria-hidden className="fixed right-4 bottom-4 z-50 h-10 w-10" />
    );
  }

  const toggle = () => {
    setTheme((current) => {
      // Defensive: derive `next` inside the setter so we never act on a
      // stale closure value if React batches multiple clicks.
      const next: Theme = current === "dark" ? "light" : "dark";
      const root = document.documentElement;
      if (next === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      try {
        localStorage.setItem("theme", next);
      } catch {
        // private browsing or storage disabled — state still lives in memory
      }
      return next;
    });
  };

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="fixed right-4 bottom-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-md dark:hover:bg-neutral-800"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
